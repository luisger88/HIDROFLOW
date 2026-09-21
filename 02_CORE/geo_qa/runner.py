# -*- coding: utf-8 -*-
"""
runner — orquestador determinista de HF-GEO-QA V1.

Responsabilidades:
- Resolver el repositorio y la raíz del caso por convención portable.
- Construir el contexto de cada perfil leyendo SOLO el caso (registros,
  referencias y metadata de archivos; nunca escribe el MDT).
- Ejecutar checks puros, resumir el resultado global y armar el QaResult
  (firmado por qa_run_id/output_hash).
- Registrar evidencia en el ledger QA del caso (append serial) y regenerar la
  integridad, siempre SIN tocar decisiones ni estado profesional.
"""

from __future__ import annotations

import json
from datetime import date, datetime, timezone
from pathlib import Path

from . import result as R
from . import __version__
from .checks import IMPL_POR_CHECK
from .deps import importar_generador, importar_resolver
from .models import (
    CONDICIONAL,
    FAIL,
    FAIL_ORIENTATION,
    INTERNALLY_VALIDATED,
    INTERNALLY_VALIDATED_WITH_RESTRICTIONS,
    PASS,
    RESTRICCION_TERRITORIAL,
    CheckResult,
    QaResult,
)
from .registry import obtener

_FECHA = lambda: date.today().isoformat()  # noqa: E731
_UTC = lambda: datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")  # noqa: E731

# Activos internos del caso (no referenciados por ruta en el registro espacial)
_UBICACION_INTERNA = {
    "project-location": "geometry/project-location.geojson",
    "proposed-cell": "geometry/proposed-cell.geojson",
}

_RUTA_EXTERNA_FIJA = {
    "red": "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/red_gate02_D03.geojson",
    "contraste": "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/contraste_snap_D03.json",
    "mdt": "01_DEM_HIDRO/00_BASE/DEM_Copernicus_GLO30_Aburra.tif",
}

_EVIDENCIAS_BASE = {
    "spatial_reference": ["spatial/spatial-data-registry.json"],
    "raster_georef": ["terrain/mdt-reference.json", "spatial/spatial-data-registry.json"],
    "cartographic_evidence": [
        "spatial/spatial-data-registry.json",
        "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/manifiesto_gate02.json",
    ],
    "vector_geometry": ["spatial/spatial-data-registry.json"],
    "network_internal": [
        "spatial/spatial-data-registry.json",
        "network/hf-network-reference.json",
        "decision/spatial-decision.json",
    ],
    "gate02_diagnostic": [
        "spatial/spatial-data-registry.json",
        "network/hf-network-reference.json",
        "terrain/mdt-reference.json",
        "decision/spatial-decision.json",
        "state/gates.jsonl",
        "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/contraste_snap_D03.json",
    ],
}


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def aport(raiz_o_case: Path, relativa: str) -> Path:
    return raiz_o_case / relativa


def _raiz_absoluta(case_root, repo: Path) -> Path:
    p = Path(case_root)
    return p.resolve() if p.is_absolute() else (repo / p).resolve()


# ------------------------------------------------------------- helpers de lectura

def _leer_json(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _leer_jsonl(path: Path) -> list[dict]:
    out = []
    if not path.exists():
        return out
    for linea in path.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if not linea:
            continue
        out.append(json.loads(linea))
    return out


def _sha_archivo(path: Path) -> str:
    resolver = importar_resolver()
    return resolver.sha256_archivo(path)


def _meta_raster(path: Path) -> dict | None:
    if not path.exists():
        return None
    import rasterio  # noqa: PLC0415

    with rasterio.open(str(path)) as src:
        t = src.transform
        return {
            "shape": list(src.shape),
            "bounds": [
                float(src.bounds.left),
                float(src.bounds.bottom),
                float(src.bounds.right),
                float(src.bounds.top),
            ],
            "nodata": src.nodata,
            "crs": str(src.crs) if src.crs else None,
            "affine": (t.a, t.b, t.c, t.d, t.e, t.f),
        }


def _activo_registry(raiz: Path, activo_id: str) -> dict:
    reg = _leer_json(raiz / "spatial/spatial-data-registry.json")
    for a in reg.get("activos", []):
        if a.get("id") == activo_id:
            return a
    return {}


def _ruta_activo(raiz: Path, repo: Path, activo_id: str) -> Path | None:
    registro = _activo_registry(raiz, activo_id)
    ruta_repo = registro.get("ruta_relativa_repo")
    if ruta_repo:
        return (repo / ruta_repo).resolve()
    interno = _UBICACION_INTERNA.get(activo_id)
    if interno:
        return (raiz / interno).resolve()
    return None


def _fc_geojson(path: Path) -> dict | None:
    if not path.exists():
        return None
    data = _leer_json(path)
    if data.get("type") != "FeatureCollection":
        return None
    return data


# ------------------------------------------------------------- constructores de contexto

def _ctx_spatial_reference(raiz: Path, repo: Path, asset_id: str) -> dict:
    registro = _activo_registry(raiz, asset_id)
    coords = []
    path = _ruta_activo(raiz, repo, asset_id)
    if path is not None and path.exists() and path.suffix.lower() in (".geojson", ".json"):
        data = _leer_json(path)
        fc = data if data.get("type") == "FeatureCollection" else None
        if fc:
            for feat in fc.get("features", []):
                geom = feat.get("geometry") or {}
                if geom.get("type") == "Point" and geom.get("coordinates"):
                    coords.append(tuple(geom["coordinates"][:2]))
    elif registro.get("coordenadas_geodesicas"):
        c = registro["coordenadas_geodesicas"]
        coords.append((c.get("longitud"), c.get("latitud")))
    return {
        "registro": registro,
        "coords": coords,
        "requires_transformacion": bool(registro.get("transformaciones")),
    }


def _ctx_raster_georef(raiz: Path, repo: Path) -> dict:
    mdt_ref = _leer_json(raiz / "terrain/mdt-reference.json")
    tecnica = mdt_ref.get("tecnica", {})
    ruta = repo / mdt_ref.get("localizacion", {}).get("ruta_relativa_repo", "")
    meta = _meta_raster(ruta)
    esperado = {
        "res": (tecnica.get("resolucion_m") or 30, tecnica.get("resolucion_m") or 30),
        "shape": list(tecnica.get("shape") or []),
        "bounds": list(tecnica.get("bounds_m") or []),
        "nodata": None,
    }
    p_utm = {"x": 434284.806, "y": 693285.656}
    if meta and meta.get("affine"):
        a, b, c0, d, e, f = meta["affine"]
        fila = int((p_utm["y"] - f) // e)
        col = int((p_utm["x"] - c0) // a)
        esperado["punto_rowcol"] = (fila, col)
    return {
        "meta": meta or {},
        "affine": meta.get("affine") if meta else None,
        "esperado": esperado,
        "hash_real": _sha_archivo(ruta) if ruta.exists() else None,
        "hash_esperado": mdt_ref.get("identificador", {}).get("sha256"),
    }


def _ctx_cartografico(raiz: Path, decl: dict) -> dict:
    activo = _activo_registry(raiz, "manifiesto_gate02")
    return {
        "decl": decl,
        "registro": activo,
    }


def _ctx_vector(raiz: Path, repo: Path, asset_id: str) -> dict:
    registro = _activo_registry(raiz, asset_id)
    ruta = (repo / registro.get("ruta_relativa_repo", "")).resolve() if registro.get("ruta_relativa_repo") else None
    fc = _fc_geojson(ruta) if ruta else None
    crs_archivo = None
    if fc:
        crs_props = (fc.get("crs") or {}).get("properties") or {}
        nombre = crs_props.get("name")
        if nombre:
            crs_archivo = str(nombre)
    return {
        "fc": fc,
        "registro": registro,
        "consumo": "red" if asset_id.startswith("red_") else None,
        "tipos_permitidos": ["LineString"],
        "hash_real": _sha_archivo(ruta) if ruta and ruta.exists() else None,
        "hash_esperado": registro.get("sha256"),
        "crs_registro": registro.get("crs"),
        "crs_archivo": crs_archivo,
    }


def _ctx_network(raiz: Path, repo: Path) -> dict:
    ctx = _ctx_vector(raiz, repo, "red_hf_gate02_d03")
    net_ref = _leer_json(raiz / "network/hf-network-reference.json")
    espec = net_ref.get("especificacion", {})
    decision = _leer_json(raiz / "decision/spatial-decision.json")
    proposed = decision.get("proposed_cell") or {}
    ctx.update(
        {
            "modo": "subred",
            "umbral_esperado": espec.get("umbral_red_celdas"),
            "num_segmentos_esperado": espec.get("num_segmentos"),
            "celdas_esperado": espec.get("celdas_red_autorizada"),
            "proposed_cell": proposed,
            "net_ref": net_ref,
            "registro_red": espec,
        }
    )
    return ctx


def _ctx_diagnostico(raiz: Path, repo: Path) -> dict:
    decision = _leer_json(raiz / "decision/spatial-decision.json")
    gates_lista = _leer_jsonl(raiz / "state/gates.jsonl")
    gates = {}
    for g in gates_lista:
        gates[g.get("gate_id")] = g.get("veredicto")
    net_ref = _leer_json(raiz / "network/hf-network-reference.json")
    espec = net_ref.get("especificacion", {})
    mdt_ref = _leer_json(raiz / "terrain/mdt-reference.json")
    ruta_mdt = repo / mdt_ref.get("localizacion", {}).get("ruta_relativa_repo", "")
    ruta_red = repo / _RUTA_EXTERNA_FIJA["red"]
    ruta_cont = repo / _RUTA_EXTERNA_FIJA["contraste"]
    meta = _meta_raster(ruta_mdt)
    p_utm = {"x": 434284.806, "y": 693285.656}
    punto = None
    if meta and meta.get("affine"):
        a, b, c0, d, e, f = meta["affine"]
        fila = int((p_utm["y"] - f) // e)
        col = int((p_utm["x"] - c0) // a)
        punto = (fila, col)
    activos = {
        a.get("id"): a
        for a in _leer_json(raiz / "spatial/spatial-data-registry.json").get("activos", [])
    }
    activos_para_ctx = {
        "DEM": activos.get("mdt_copernicus_glo30_aburra"),
        "HIDROGRAFIA": activos.get("red_hf_gate02_d03"),
        "CALIDAD_SPATIAL": activos.get("manifiesto_gate02"),
        "red_gate02_D03": activos.get("red_hf_gate02_d03"),
        "project-location": activos.get("project-location"),
        "proposed-cell": activos.get("proposed-cell"),
        "manifiesto_gate02": activos.get("manifiesto_gate02"),
        "contraste_snap_D03": activos.get("contrato_snap_D03"),
    }
    return {
        "registry": {
            "activos": activos_para_ctx,
            "crs": "EPSG:32618",
            "umbral_red_celdas": espec.get("umbral_red_celdas"),
        },
        "net_ref": espec,
        "hash_mdt_real": _sha_archivo(ruta_mdt) if ruta_mdt.exists() else None,
        "hash_mdt_esperado": mdt_ref.get("identificador", {}).get("sha256"),
        "hash_red_real": _sha_archivo(ruta_red) if ruta_red.exists() else None,
        "hash_red_esperado": activos.get("red_hf_gate02_d03", {}).get("sha256"),
        "umbral_red": espec.get("umbral_red_celdas"),
        "umbral_red_esperado": 500,
        "shape_mdt": list((mdt_ref.get("tecnica") or {}).get("shape") or []),
        "punto_contractual": punto,
        "contraste_presente": ruta_cont.exists(),
        "spatial_decision": decision,
        "proposed_cell": decision.get("proposed_cell"),
        "gates": gates,
    }


# ------------------------------------------------------------- ejecución de checks

def _ejecutar_checks(perfil_id: str, ctx: dict) -> list[CheckResult]:
    perfil = obtener(perfil_id)
    checks: list[CheckResult] = []
    for cid in perfil["checks_obligatorios"] + perfil["checks_opcionales"]:
        func = IMPL_POR_CHECK[(perfil_id, cid)]
        checks.append(func(ctx))
    return checks


def _severidad_global(checks: list[CheckResult]) -> str:
    for s in ("CRITICAL", "ERROR", "WARNING", "INFO"):
        if any(c.severidad == s for c in checks):
            return s
    return "INFO"


def _resumir(perfil: dict, checks: list[CheckResult]) -> dict:
    forma = perfil["forma_global"]
    if forma == "carto":
        fo = [c for c in checks if c.resultado == FAIL_ORIENTATION]
        if fo:
            bloqueados = list(perfil["consumidores_bloqueados"])
            permitidos = list(perfil["consumidores_permitidos"])
            return {
                "resultado": FAIL_ORIENTATION,
                "severidad": "CRITICAL",
                "razones": [c.razon or c.detalle for c in fo],
                "restricciones": [],
                "bloqueados": bloqueados,
                "permitidos": permitidos,
            }
    fallos = [c for c in checks if c.resultado == FAIL and c.severidad in ("ERROR", "CRITICAL")]
    condicionales = [c for c in checks if c.resultado == CONDICIONAL]
    raz_fallo = [c.razon or c.detalle for c in fallos]

    def base_bloqueados():
        vueltos = set()
        for c in fallos:
            vueltos |= set(c.consumers_blocked)
        return sorted(vueltos | set(perfil["consumidores_bloqueados"]))

    if forma == "red":
        if fallos:
            return {
                "resultado": FAIL,
                "severidad": _severidad_global(checks),
                "razones": raz_fallo,
                "restricciones": [],
                "bloqueados": list(perfil["consumidores_bloqueados"]),
                "permitidos": list(perfil["consumidores_permitidos"]),
            }
        return {
            "resultado": INTERNALLY_VALIDATED,
            "severidad": "WARNING" if condicionales else "INFO",
            "razones": [c.razon or c.detalle for c in condicionales],
            "restricciones": [RESTRICCION_TERRITORIAL],
            "bloqueados": list(perfil["consumidores_bloqueados"]),
            "permitidos": list(perfil["consumidores_permitidos"]),
        }
    if forma == "diagnostico":
        restricciones = [RESTRICCION_TERRITORIAL, "ADOPTED_CELL_NULL", "GATE_3_BLOCKED"]
        bloqueados = list(perfil["consumidores_bloqueados"])
        permitidos = list(perfil["consumidores_permitidos"])
        if fallos:
            return {
                "resultado": FAIL,
                "severidad": _severidad_global(checks),
                "razones": raz_fallo,
                "restricciones": [],
                "bloqueados": bloqueados,
                "permitidos": permitidos,
            }
        if condicionales:
            return {
                "resultado": INTERNALLY_VALIDATED_WITH_RESTRICTIONS,
                "severidad": "WARNING",
                "razones": [c.razon or c.detalle for c in condicionales],
                "restricciones": restricciones,
                "bloqueados": bloqueados,
                "permitidos": permitidos,
            }
        return {
            "resultado": INTERNALLY_VALIDATED,
            "severidad": "INFO",
            "razones": [],
            "restricciones": restricciones,
            "bloqueados": bloqueados,
            "permitidos": permitidos,
        }
    # forma: simple
    if fallos:
        return {
            "resultado": FAIL,
            "severidad": _severidad_global(checks),
            "razones": raz_fallo,
            "restricciones": [],
            "bloqueados": base_bloqueados(),
            "permitidos": [],
        }
    if condicionales:
        return {
            "resultado": CONDICIONAL,
            "severidad": "WARNING",
            "razones": [c.razon or c.detalle for c in condicionales],
            "restricciones": [],
            "bloqueados": [],
            "permitidos": [],
        }
    return {
        "resultado": PASS,
        "severidad": "INFO",
        "razones": [],
        "restricciones": [],
        "bloqueados": [],
        "permitidos": [],
    }


def _evidencias(checks: list[CheckResult], perfil_id: str) -> list[str]:
    refs: set[str] = set(_EVIDENCIAS_BASE.get(perfil_id, []))
    for c in checks:
        refs |= set(c.evidence_refs)
    return sorted(refs)


# ------------------------------------------------------------- perfil principal

def correr_perfil(
    perfil_id: str,
    case_root,
    asset_id: str,
    repo: Path | None = None,
    decl: dict | None = None,
) -> QaResult:
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    perfil = obtener(perfil_id)

    ctx_builders = {
        "spatial_reference": lambda: _ctx_spatial_reference(raiz, repo, asset_id),
        "raster_georef": lambda: _ctx_raster_georef(raiz, repo),
        "cartographic_evidence": lambda: _ctx_cartografico(raiz, decl or {}),
        "vector_geometry": lambda: _ctx_vector(raiz, repo, asset_id),
        "network_internal": lambda: _ctx_network(raiz, repo),
        "gate02_diagnostic": lambda: _ctx_diagnostico(raiz, repo),
    }
    ctx = ctx_builders[perfil_id]()

    checks = _ejecutar_checks(perfil_id, ctx)
    resumen = _resumir(perfil, checks)

    case_id = f"caso_{Path(case_root).name}"
    asset = asset_id or case_id
    asset_hash = _hash_activo(raiz, repo, perfil_id, asset_id, ctx)
    input_hashes = _input_hashes(raiz, repo, perfil_id, ctx)

    qa = QaResult(
        case_id=case_id,
        asset_id=asset,
        asset_hash=asset_hash,
        qa_profile=perfil_id,
        checks=checks,
        resultado=resumen["resultado"],
        severidad=resumen["severidad"],
        razones=resumen["razones"],
        evidencia=_evidencias(checks, perfil_id),
        restricciones=resumen["restricciones"],
        consumidores_permitidos=resumen["permitidos"],
        consumidores_bloqueados=resumen["bloqueados"],
        version=__version__,
        input_hashes=input_hashes,
        timestamp=_UTC(),
        state_change=False,
        professional_decision=None,
    )
    qa.qa_run_id = R.calcular_qa_run_id(qa)
    qa.output_hash = R.calcular_output_hash(qa)
    return qa


def _hash_activo(raiz: Path, repo: Path, perfil_id: str, asset_id: str, ctx: dict) -> str:
    resolver = importar_resolver()
    if perfil_id == "gate02_diagnostic":
        return resolver.state_hash_paquete(raiz)
    path = None
    if perfil_id == "raster_georef":
        ruta = _RUTA_EXTERNA_FIJA["mdt"]
        return _sha_archivo(repo / ruta) if (repo / ruta).exists() else "n/a"
    if asset_id:
        path = _ruta_activo(raiz, repo, asset_id)
    if path is not None and path.exists():
        return _sha_archivo(path)
    return resolver.sha256_texto(json.dumps(ctx.get("registro") or {}, sort_keys=True))


def _input_hashes(raiz: Path, repo: Path, perfil_id: str, ctx: dict) -> dict:
    resolver = importar_resolver()
    salida: dict[str, str] = {}
    if perfil_id == "raster_georef":
        ruta = repo / _RUTA_EXTERNA_FIJA["mdt"]
        salida["mdt_file"] = _sha_archivo(ruta) if ruta.exists() else "n/a"
        salida["mdt_reference"] = resolver.sha256_texto(
            json.dumps(_leer_json(raiz / "terrain/mdt-reference.json"), sort_keys=True)
        )
    if perfil_id in ("vector_geometry", "network_internal"):
        salida["registry"] = resolver.sha256_texto(
            json.dumps(_leer_json(raiz / "spatial/spatial-data-registry.json"), sort_keys=True)
        )
    if perfil_id in ("network_internal", "gate02_diagnostic"):
        salida["network_reference"] = resolver.sha256_texto(
            json.dumps(_leer_json(raiz / "network/hf-network-reference.json"), sort_keys=True)
        )
    if perfil_id == "gate02_diagnostic":
        salida["spatial_decision"] = resolver.sha256_texto(
            json.dumps(_leer_json(raiz / "decision/spatial-decision.json"), sort_keys=True)
        )
        salida["gates"] = resolver.sha256_texto(
            json.dumps(_leer_jsonl(raiz / "state/gates.jsonl"), sort_keys=True)
        )
    return salida


# ------------------------------------------------------------- registro en ledger

def _construir_entrada_ledger(qa: QaResult, numero_linea: int, metodo_aditivo: str) -> dict:
    raz = " | ".join(qa.razones) if qa.razones else qa.resultado
    return {
        "linea": numero_linea,
        "id_activo": qa.asset_id,
        "grupo": "qa",
        "check": "hf_geo_qa_run",
        "resultado": qa.resultado,
        "detalle": raz,
        "fecha": _FECHA(),
        "metodo": metodo_aditivo,
        "evidencia": qa.qa_run_id,
        "qa_profile": qa.qa_profile,
        "asset_hash": qa.asset_hash,
        "output_hash": qa.output_hash,
        "state_change": False,
    }


def _append_ledger(raiz: Path, qa: QaResult) -> int:
    ledger = raiz / "spatial/qa/qa-ledger.jsonl"
    lineas = _leer_jsonl(ledger)
    run_ids = [e.get("evidencia") for e in lineas if e.get("check") == "hf_geo_qa_run"]
    if qa.qa_run_id in run_ids:
        raise RuntimeError(f"qa_run_id duplicado en ledger: {qa.qa_run_id!r}")
    numero = max((e.get("linea") or 0) for e in lineas) + 1 if lineas else 1
    entrada = _construir_entrada_ledger(qa, numero, f"HF_GEO_QA_RUNNER v{__version__}")
    with open(ledger, "a", encoding="utf-8") as f:
        f.write(json.dumps(entrada, ensure_ascii=False) + "\n")
    return numero


def regenerar_integridad(raiz: Path) -> dict:
    """Refresca package/evidence tras registro; verifica state_hash invariante."""
    resolver = importar_resolver()
    antes = resolver.estado_hash_paquete(raiz)
    generar = importar_generador()
    generar.main([str(raiz)])
    despues = resolver.estado_hash_paquete(raiz)
    if despues != antes:
        raise RuntimeError(f"state_hash cambió ({antes} -> {despues}); no se persiste")
    return resolver.generar_integridad(raiz)


def registar_piloto(
    perfil_id: str,
    case_root,
    asset_id: str,
    repo: Path | None = None,
    decl: dict | None = None,
) -> dict:
    """Ejecuta el perfil, lo registra en el ledger WA y regenera integridad."""
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    qa = correr_perfil(perfil_id, case_root, asset_id, repo=repo, decl=decl)
    errores = R.validar_invariantes(qa)
    if errores:
        raise RuntimeError(f"QA con invariantes rotas: {errores}")
    numero = _append_ledger(raiz, qa)
    regenerar_integridad(raiz)
    return {
        "linea": numero,
        "qa_run_id": qa.qa_run_id,
        "resultado": qa.resultado,
        "asset_id": qa.asset_id,
        "output_hash": qa.output_hash,
    }


__all__ = [
    "repo_root",
    "correr_perfil",
    "registar_piloto",
    "regenerar_integridad",
]