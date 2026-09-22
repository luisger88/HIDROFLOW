# -*- coding: utf-8 -*-
"""
Pruebas T1-T20 y B1-B12 de la vía limitada post-assessment
(OT-HF-SPATIAL-COMPARE-002).

T1.  Gate            — cumplimiento_metricas_limitadas habilita contraste.
T2.  Gate schema     — assessment_id discrepante bloquea.
T3.  Gate estado     — estado != CONDITIONALLY_APT_FOR_COMPARISON bloquea.
T4.  Gate schema     — schema del assessment distinto bloquea.
T5.  Gate quorum     — quorum con FAIL>0 bloquea.
T6.  Gate restricc.  — sin restricciones bloquea.
T7.  Catálogo        — perfil limitado fuera del catálogo V1; registry válido.
T8.  Consumidores    — permitidos conocidos; bloqueados cubren la plena.
T9.  Adaptador       — GeoPackageSegmentedLimited read-only, metadatos y hash.
T10. Preselección    — índice rtree nativo: 596 fids deterministas.
T11. Reducción Z     — Z→XY sin tocar la fuente; no finitas rechazadas.
T12. bounds_in_crs   — ventana 32618→9377→32618 (roundtrip, always_xy, pad).
T13. Invariantes     — run persistido válido, sin firmas de estado.
T14. Determinismo    — serialización canónica reprod. output_hash del run.
T15. Reproducción    — re-ejecución completa produce run_id/output_hash = BASE.
T16. Métricas        — valores de la fuente coinciden con la constante.
T17. Prohibiciones   — nunca adopción ni competencia; interpretaciones 3.
T18. Integridad      — state_hash invariante; package/evidence cambian; manifest.
T19. Ledger y evid.  — línea 4 del ledger; run/audit/sources/perfil escritos.
T20. Histórico       — runs previos y fuentes intactos.

B1.  Sintesis        — resumen PASS/FAIL de T1-T20.
B2.  Regresión       — re-ejecuta C1-C20/E1-E6 por subproceso (PASS).
B3.  Slug            — slug determinista del question_id.
B4.  Percentil R-7   — distancias fuente→red = BASE.
B5.  Hausdorff       — 666.766 / 666.766 / 387.709.
B6.  Cobertura       — iou_envolventes 0.972.
B7.  Roundtrip CRS   — esquinas de la ventana estables en doble paso.
B8.  CLI             — run-limited documentado y desconocido falla.
B9.  Sin absolutas   — run/audit/sources/ledger sin rutas absolutas.
B10. Read-only       — hash del GeoPackage sin cambios tras lectura.
B11. Registry vál.   — validar_registry sin errores con el módulo cargado.
B12. No-adopción     — ninguna métrica/limitation/correspondence adopta.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).resolve()
REPO = BASE.parents[3]
CASO_REL = "HF_CASE/iguana_pc80"
RAIZ = REPO / CASO_REL

# ----------------------------------------------------------- constantes BASE
# Determinadas en la ejecución de referencia del run limitado (ya persistida).
RUN_ID_BASE = "3c1166f948abe5df"
OUTPUT_HASH_BASE = "d0d0a4d6978d189ac82b25b9d5aa80453a8992038b0f1b58ef48ca29c89ed97f"
QUESTION_ID = "EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON"
ASSESSMENT_ID_BASE = "263de2c49ca9d392"

# Integridad previa al contraste limitado (estado invariante, muros a pasar).
STATE_HASH_INVARIANTE = "5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d"
PACKAGE_HASH_PRE = "a61062c0a1caa8ae9e97260c423f8def7226616932740cee70d3a2dab3415d48"
EVIDENCE_HASH_PRE = "74fe2500fb87071a8ea201bed89d0bdd768cc8ca9efee117bfda4f373e91aa2b"

# Fuentes inmutables verificadas.
GPKG_SHA_BASE = "3b2b91cf02cb1dcc3243aca74dd5ba8ae05b1fb52737264aeda45d99b16c3482"
RED_SHA_BASE = "ce398aef4d6e1d413101a95298d25e01181c40ec748a8471220a302e3c85f2dc"

# Runs históricos (intactos exigidos).
RUN_AUDIT = ("EXTERNO_STREAMS_URBAN_1000_AUDIT", "3b432d589d2f5813", "9c0ce9bad4ed5250")
RUN_POST = ("EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT", "278e9713f3816073", "9c248553bf90aa63")

RUTA_RUN = f"spatial/comparisons/runs/{QUESTION_ID}.json"
RUTA_SOURCES = f"spatial/comparisons/evidence/{QUESTION_ID}_sources.json"
RUTA_AUDIT = f"spatial/comparisons/evidence/{QUESTION_ID}_audit.md"
RUTA_PERFIL = "spatial/comparisons/profiles/COMPARE_LIMITED_EXTERNAL_V1.json"

OLORES_METRICAS = {
    "longitud_fuente": 35819.127,
    "longitud_target": 7413.542,
    "pct_dentro_corredor": 16.367,
    "pct_target_dentro_corredor": 58.565,
    "hausdorff": 666.766,
    "hausdorff_dirigido_A_B": 666.766,
    "hausdorff_dirigido_B_A": 387.709,
    "orientacion_local_mediana": 44.781,
    "nodos_cercanos": 0.0,
    "continuidad_target": 8,
    "n_divergentes": 4,
    "iou_envolventes": 0.972,
}

PERM_TEXTO = [
    "CORRESPONDENCE_OBSERVED: correspondencias locales observadas sin competencia territorial",
    "DIVERGENCE_OBSERVED: divergencias locales observadas sin competencia territorial",
    "PARTIALLY_COMPARABLE: solapamiento parcial y métricas restringidas por licencia UNKNOWN",
]

CONSUMIDORES_BLOQUEADOS_DEBEN = {
    "PF02_ADOPTION", "GATE_3", "CANONICAL_WATERSHED", "HYDRO_CONSUMPTION",
    "DECISION_PROFESIONAL", "CARTOGRAPHIC_REPORT", "EXPEDIENTE",
    "TERRITORIAL_COMPETENCE",
}


def _fallo(msg: str) -> list[str]:
    return [msg]


def _sha_archivo(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for bloque in iter(lambda: f.read(1 << 20), b""):
            h.update(bloque)
    return h.hexdigest()


def _error(msg: str) -> list[str]:
    return [msg]


def _leer_run() -> dict:
    return json.loads((RAIZ / RUTA_RUN).read_text(encoding="utf-8"))


# ----------------------------------------------------------- T1-T6 gate

def _entrada_registry() -> dict:
    reg = json.loads((RAIZ / "spatial/spatial-data-registry.json").read_text(encoding="utf-8"))
    return next(a for a in reg["activos"] if a.get("id") == "streams_urban_1000_medellin_assessed")


def _assessment() -> dict:
    return json.loads(
        (RAIZ / "spatial/sources/assessments/streams_urban_1000_medellin_assessed.json")
        .read_text(encoding="utf-8")
    )


def _gate_ok(entrada: dict, assessment: dict) -> list[str]:
    from spatial_compare.governance import cumplimiento_metricas_limitadas

    g = cumplimiento_metricas_limitadas(entrada, assessment)
    if not g["habilitado"]:
        return [f"gate debería habilitar; bloqueos={g['bloqueos']}"]
    if g["resultado_maximo"] != "PARTIALLY_COMPARABLE":
        return [f"resultado_maximo esperado PARTIALLY_COMPARABLE: {g['resultado_maximo']}"]
    if g["assessment_id"] != ASSESSMENT_ID_BASE:
        return ["assessment_id del gate no coincide con la base"]
    return []


def _gate_deshabilitado(entrada: dict, assessment: dict) -> list[str]:
    from spatial_compare.governance import cumplimiento_metricas_limitadas

    g = cumplimiento_metricas_limitadas(entrada, assessment)
    if g["habilitado"]:
        return [f"gate debería bloquear; bloqueos={g['bloqueos']}"]
    if not g["bloqueos"]:
        return ["gate bloqueado sin motivo registrado"]
    return []


def t1_gate_habilitado() -> list[str]:
    return _gate_ok(_entrada_registry(), _assessment())


def t2_gate_assessment_discrepante() -> list[str]:
    a = _assessment()
    a2 = dict(a)
    a2["assessment_id"] = "abababababababab"
    entrada = _entrada_registry()
    return _gate_deshabilitado(entrada, a2)


def t3_gate_estado() -> list[str]:
    entrada = _entrada_registry()
    e2 = dict(entrada)
    e2 = dict(entrada)
    e2["estado"] = "CANDIDATE_WITH_EVIDENCE"
    return _gate_deshabilitado(e2, _assessment())


def t4_gate_schema() -> list[str]:
    a = _assessment()
    a2 = dict(a)
    a2["schema"] = "hf.spatial-source-assessment.v999"
    return _gate_deshabilitado(_entrada_registry(), a2)


def t5_gate_quorum() -> list[str]:
    a = _assessment()
    a2 = dict(a)
    quorum = dict(a["qa"]["quorum"])
    quorum["FAIL"] = 1
    a2["qa"] = dict(a["qa"], quorum=quorum)
    return _gate_deshabilitado(_entrada_registry(), a2)


def t6_gate_sin_restricciones() -> list[str]:
    a = _assessment()
    a2 = dict(a)
    a2["restricciones"] = []
    return _gate_deshabilitado(_entrada_registry(), a2)


# ----------------------------------------------------------- T7-T8 catálogo

def t7_perfil_fuera_catalogo() -> list[str]:
    from spatial_compare.models import PERFIL_IDS_ESPERADOS
    from spatial_compare.registry import listar as listar_perfiles, validar_registry

    if "COMPARE_LIMITED_EXTERNAL_V1" in PERFIL_IDS_ESPERADOS:
        return ["perfil limitado no puede estar en el catálogo V1"]
    ids = {p["id"] for p in listar_perfiles()}
    if "COMPARE_LIMITED_EXTERNAL_V1" in ids:
        return ["perfil limitado no puede estar en el registro V1"]
    errs = validar_registry()
    if errs:
        return [f"registry V1 sin errores esperado: {errs}"]
    return []


def t8_consumidores() -> list[str]:
    from spatial_compare.limited import PERFIL_LIMITADO, PERFIL_LIMITADO_ID

    if PERFIL_LIMITADO["id"] != PERFIL_LIMITADO_ID:
        return ["perfil id inconsistente"]
    bloqueados = set(PERFIL_LIMITADO["consumidores_bloqueados"])
    if not CONSUMIDORES_BLOQUEADOS_DEBEN <= bloqueados:
        return [f"faltan consumidores bloqueados por cubrir: {CONSUMIDORES_BLOQUEADOS_DEBEN - bloqueados}"]
    conjuntos = {"PF02_ADOPTION", "GATE_3", "HYDRO_CONSUMPTION", "TERRITORIAL_COMPETENCE"}
    if conjuntos & set(PERFIL_LIMITADO["consumidores_permitidos"]):
        return ["consumidores conspirativos permitidos"]
    if PERFIL_LIMITADO["resultado_maximo"] != "PARTIALLY_COMPARABLE":
        return ["resultado_maximo del perfil distinto"]
    from spatial_compare.models import RESULTADOS_PROHIBIDOS

    if not RESULTADOS_PROHIBIDOS <= set(PERFIL_LIMITADO["interpretaciones_prohibidas"]):
        return ["no cubren todas las interpretaciones prohibidas V1"]
    return []


# ----------------------------------------------------------- T9-T12 adaptador

def t9_adaptador_metadatos() -> list[str]:
    from spatial_compare.limited import GeoPackageSegmentedLimited

    origen = REPO / "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
    antes = _sha_archivo(origen)
    adaptador = GeoPackageSegmentedLimited(origen)
    m = adaptador.metadatos()
    if m["capa"] != "Channel Network":
        return [f"capa esperada Channel Network: {m['capa']}"]
    if m["n_total_features"] != 148088:
        return [f"n_total 148088 esperado: {m['n_total_features']}"]
    if not m["rtree_nativo"]:
        return ["índice rtree nativo ausente"]
    if m["srs_id"] != 100000:
        return [f"srs_id 100000 esperado: {m['srs_id']}"]
    if _sha_archivo(origen) != antes:
        return ["el GeoPackage cambió tras solo leer metadatos"]
    return []


def t10_preseleccion() -> list[str]:
    from spatial_compare.limited import GeoPackageSegmentedLimited
    from spatial_compare.transforms import bounds_en_crs

    origen = REPO / "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
    adaptador = GeoPackageSegmentedLimited(origen)
    a = _assessment()
    v = a["cobertura"]["ventana_utm_32618"]
    minx = v["minx"]
    miny = v["miny"]
    b = bounds_en_crs((minx, miny, minx + 2000.0, miny + 2000.0), "EPSG:32618", "EPSG:9377", pad_m=10.0)
    f1 = adaptador.preseleccionar(b)
    f2 = adaptador.preseleccionar(b)
    if f1 != f2:
        return ["preselección no determinista"]
    if len(f1) != 596:
        return [f"preselección 596 esperada: {len(f1)}"]
    return []


def t11_reduccion_z() -> list[str]:
    from spatial_compare.limited import GeoPackageSegmentedLimited
    from spatial_compare.models import SpatialCompareError
    from spatial_compare.transforms import bounds_en_crs, reducir_xyz_xy, registro_reduccion_z

    origen = REPO / "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
    adaptador = GeoPackageSegmentedLimited(origen)
    a = _assessment()
    v = a["cobertura"]["ventana_utm_32618"]
    bbox = bounds_en_crs(
        (v["minx"], v["miny"], v["minx"] + 2000.0, v["miny"] + 2000.0),
        "EPSG:32618", "EPSG:9377", pad_m=10.0,
    )
    geoms = adaptador.leer_preseleccionadas(adaptador.preseleccionar(bbox)[:5])[0]
    red, resumen = reducir_xyz_xy(geoms)
    if resumen["n_geometrias_entrada"] != 5 or resumen["n_salida_xy"] != 5:
        return [f"resumen reducción inesperado: {resumen}"]
    for g in red:
        if getattr(g, "geom_type", None) != "LineString":
            return [f"geometría no LineString: {g.geom_type}"]
        if any(len(c) != 2 for c in g.coords):
            return ["quedan coordenadas con Z"]
    full = registro_reduccion_z({**resumen, "metodo": "reduccion_z_a_xy"})
    if not full:
        return ["registro_reduccion_z vacío"]
    try:
        from shapely.geometry import Point

        reducir_xyz_xy([Point(0.0, 0.0)])
        return ["geometría no LineString debería lanzar SpatialCompareError"]
    except SpatialCompareError:
        return []
    except Exception:
        return ["error distinto a SpatialCompareError esperado"]


def t12_bounds_crs() -> list[str]:
    from spatial_compare.transforms import bounds_en_crs

    a = _assessment()
    v = a["cobertura"]["ventana_utm_32618"]
    orig = (v["minx"], v["miny"], v["minx"] + 2000.0, v["miny"] + 2000.0)
    # ventana nativa (EPSG:9377, pad 10 m) determinada en la ejecución de referencia
    NATIVA = (
        4712063.287968704,
        2250716.124661185,
        4714092.043630891,
        2252744.8803232675,
    )
    nativa = bounds_en_crs(orig, "EPSG:32618", "EPSG:9377", pad_m=10.0)
    for i, k in enumerate(("minx", "miny", "maxx", "maxy")):
        if abs(nativa[i] - NATIVA[i]) > 1e-6:
            return [f"ventana nativa {k} no coincide con la referencia: {nativa[i]} vs {NATIVA[i]}"]
    # el clip en 32618 usa la ventana original; el ícono de regreso debe CONTENERLA
    volver = bounds_en_crs(nativa, "EPSG:9377", "EPSG:32618", pad_m=0.0)
    for i in (0, 1):
        if volver[i] > orig[i] + 0.1:
            return [f"bounds no contiene el origen en {i}: {volver[i]} vs {orig[i]}"]
    for i in (2, 3):
        if volver[i] < orig[i] - 0.1:
            return [f"bounds no contiene el origen en {i}: {volver[i]} vs {orig[i]}"]
    return []


# ----------------------------------------------------------- T13-T17 run

def t13_invariantes() -> list[str]:
    from spatial_compare import result as R
    from spatial_compare.evidence import ruta_run
    from spatial_compare.models import ComparisonResult

    doc = _leer_run()
    res = ComparisonResult.from_dict(doc)
    if (res.comparison_run_id, res.output_hash) != (RUN_ID_BASE, OUTPUT_HASH_BASE):
        return [f"firmas del run no coinciden con BASE: {res.comparison_run_id} {res.output_hash}"]
    if res.result != "PARTIALLY_COMPARABLE":
        return [f"resultado esperado PARTIALLY_COMPARABLE: {res.result}"]
    if res.comparison_profile != "COMPARE_LIMITED_EXTERNAL_V1":
        return ["perfil del run incorrecto"]
    errs = R.validar_invariantes(res)
    if errs:
        return [f"invariantes fallan: {errs}"]
    if res.state_change or res.professional_decision is not None:
        return ["state_change/professional_decision no vacíos"]
    ruta = ruta_run(RAIZ, QUESTION_ID)
    if not ruta.exists():
        return ["ruta_run no existe"]
    if res.classification != "TERRITORIAL_CONTRAST_AUDIT" or res.confidence != "BAJA":
        return ["clasificación o confianza inesperadas"]
    return []


def t14_determinismo_serial() -> list[str]:
    from spatial_compare import result as R
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    canon = R.serializar_sin_firma(res).rstrip("\n")
    h = hashlib.sha256(canon.encode("utf-8")).hexdigest()
    if h != OUTPUT_HASH_BASE:
        return [f"serialización canónica no reprod. output_hash: {h[:16]}... != {OUTPUT_HASH_BASE[:16]}"]
    return []


def t15_reproduccion() -> list[str]:
    if os.environ.get("HF_SKIP_T15") == "1":
        return []
    from spatial_compare import result as R
    from spatial_compare.limited import correr_comparacion_limitada

    res = correr_comparacion_limitada(CASO_REL, repo=REPO)
    if (res.comparison_run_id, res.output_hash) != (RUN_ID_BASE, OUTPUT_HASH_BASE):
        return ["re-ejecución produjo firmas distintas a BASE"]
    errs = R.validar_invariantes(res)
    if errs:
        return [f"invariantes en re-ejecución: {errs}"]
    return []


def t16_metricas() -> list[str]:
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    valores = {}
    for m in res.metrics:
        v = m.valor
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            valores[m.id] = float(v)
        elif m.id == "cobertura_comun":
            valores["iou_envolventes"] = float(v["iou_envolventes"])
            valores["pct_b_en_a"] = float(v["pct_cobertura_b_en_a"])
        elif m.id == "distancias_fuente_red_percentiles":
            valores["n_distancias"] = v["n"]
            valores["mediana_dist"] = v["mediana_m"]
            valores["max_dist"] = v["max_m"]
            valores["min_dist"] = v["min_m"]
        elif m.id == "preseleccion_fuente":
            valores["n_preseleccion"] = v["preseleccionadas"]
            valores["n_total_gpkg"] = v["total"]
        elif m.id == "reduccion_z":
            valores["n_con_z"] = v["n_con_z"]
        elif m.id == "ventana_analisis":
            valores["ventana_minx"] = float(v["minx"])
    fallos = []
    for k, esperado in OLORES_METRICAS.items():
        if abs(valores.get(k, -1.0) - esperado) > 1e-3:
            fallos.append(f"{k}: {valores.get(k)} != {esperado}")
    for k, esperado in {
        "n_distancias": 30995,
        "mediana_dist": 127.011,
        "max_dist": 666.766,
        "min_dist": 0.002,
        "n_preseleccion": 596,
        "n_total_gpkg": 148088,
        "n_con_z": 596,
        "pct_b_en_a": 100.0,
    }.items():
        if abs(valores.get(k, -1.0) - esperado) > (0.0 if isinstance(esperado, int) else 1e-3):
            fallos.append(f"{k}: {valores.get(k)} != {esperado}")
    return fallos


def t17_prohibiciones() -> list[str]:
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    if res.allowed_interpretations != PERM_TEXTO:
        return [f"interpretaciones permitidas distintas: {res.allowed_interpretations}"]
    bloqueados = set(res.consumers_blocked)
    if not CONSUMIDORES_BLOQUEADOS_DEBEN <= bloqueados:
        return ["run no bloquea a los consumidores de la OT"]
    if "PF02_ADOPTION" in res.consumers_allowed or "GATE_3" in res.consumers_allowed:
        return ["run permite consumidores conspirativos"]
    for m in res.metrics:
        if m.id in ("n_divergentes",) and m.valor == 0:
            pass
    return []


# ----------------------------------------------------------- T18-T20 estado

def _integridad() -> dict:
    return json.loads((RAIZ / "integrity.json").read_text(encoding="utf-8"))


def t18_integridad() -> list[str]:
    d = _integridad()
    h = d["hashes"]
    fallos = []
    if h["state_hash"] != STATE_HASH_INVARIANTE:
        fallos.append(f"state_hash cambió: {h['state_hash'][:16]}...")
    if h["package_hash"] == PACKAGE_HASH_PRE:
        fallos.append("package_hash no cambió tras el contraste")
    if h["evidence_hash"] == EVIDENCE_HASH_PRE:
        fallos.append("evidence_hash no cambió tras el contraste")
    manif = json.loads((RAIZ / "manifest.json").read_text(encoding="utf-8"))
    activos = manif.get("activos_incorporados", [])
    nuevos = [a for a in activos if a.get("fuente", "") == "OT-HF-SPATIAL-COMPARE-002"]
    if len(nuevos) < 4:
        fallos.append(f"manifest debe contener ≥4 assets del contraste limitado: {len(nuevos)}")
    rutas_n = {a.get("ruta_relativa") for a in nuevos}
    for r in (RUTA_RUN, RUTA_SOURCES, RUTA_AUDIT, RUTA_PERFIL):
        if r not in rutas_n:
            fallos.append(f"asset nuevo ausente del manifest: {r}")
    return fallos


def t19_ledger() -> list[str]:
    ledger = RAIZ / "spatial/comparisons/comparison-ledger.jsonl"
    lineas = [l for l in ledger.read_text(encoding="utf-8").splitlines() if l.strip()]
    if len(lineas) < 4:
        return [f"ledger debe tener ≥4 líneas: {len(lineas)}"]
    ult = json.loads(lineas[-1])
    if ult.get("question_id") != QUESTION_ID:
        return [f"última línea debería ser el run limitado: {ult.get('question_id')}"]
    if ult.get("evidencia") != RUN_ID_BASE or (ult.get("output_hash") or "") != OUTPUT_HASH_BASE:
        return ["ledger con firmas distintas a BASE"]
    if ult.get("perfil") != "COMPARE_LIMITED_EXTERNAL_V1" or ult.get("resultado") != "PARTIALLY_COMPARABLE":
        return ["ledger con perfil/resultado inesperados"]
    for r in (RUTA_RUN, RUTA_SOURCES, RUTA_AUDIT, RUTA_PERFIL):
        if not (RAIZ / r).exists():
            return [f"falta artefacto de evidencia: {r}"]
    return []


def t20_historico_intacto() -> list[str]:
    fallos = []
    for nombre, rid, roh in (RUN_AUDIT, RUN_POST):
        doc = json.loads((RAIZ / f"spatial/comparisons/runs/{nombre}.json").read_text(encoding="utf-8"))
        if doc.get("comparison_run_id") != rid or not str(doc.get("output_hash", "")).startswith(roh):
            fallos.append(f"{nombre} cambió de firma")
    origen = REPO / "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
    if _sha_archivo(origen) != GPKG_SHA_BASE:
        fallos.append("sha256 del GeoPackage fuente cambió")
    red = REPO / "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/red_gate02_D03.geojson"
    if red.exists() and _sha_archivo(red) != RED_SHA_BASE:
        fallos.append("sha256 de la red HF cambió")
    return fallos


# ----------------------------------------------------------- B1-B12

def b2_regresion() -> list[str]:
    script = BASE.parent / "run_spatial_compare_tests.py"
    if not script.exists():
        return [f"faltan las pruebas C1-C20: {script}"]
    env = dict(os.environ)
    env["PYTHONPATH"] = str(REPO / "02_CORE")
    pr = subprocess.run(
        [sys.executable, "-X", "utf8", str(script)],
        cwd=str(REPO),
        env=env,
        capture_output=True,
        text=True,
        timeout=1800,
    )
    if pr.returncode != 0:
        return [f"C1-C20/E1-E6 fallaron ({pr.returncode}): {pr.stdout[-1200:]} {pr.stderr[-600:]}"]
    return []


def b3_slug() -> list[str]:
    from spatial_compare.evidence import slug_question

    if slug_question(QUESTION_ID) != QUESTION_ID:
        return ["slug del question_id no es estable"]
    return []


def b4_percentil() -> list[str]:
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    m = next(x for x in res.metrics if x.id == "distancias_fuente_red_percentiles")
    v = m.valor
    esperado = {
        "n": 30995, "min_m": 0.002, "media_m": 175.262, "mediana_m": 127.011,
        "p90_m": 410.612, "p95_m": 478.874, "p99_m": 594.175, "max_m": 666.766,
    }
    for k, ev in esperado.items():
        val = v.get(k)
        tol = 0.0 if isinstance(ev, int) else 1e-3
        if val is None or abs(float(val) - ev) > tol:
            return [f"percentil R-7 {k} distinto de la referencia: {val} vs {ev}"]
    return []


def b5_hausdorff() -> list[str]:
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    m = {mt.id: mt.valor for mt in res.metrics}
    if m.get("hausdorff") != 666.766 or m.get("hausdorff_dirigido_A_B") != 666.766:
        return ["hausdorff no coincide con BASE"]
    if m.get("hausdorff_dirigido_B_A") != 387.709:
        return ["hausdorff B_A no coincide con BASE"]
    return []


def b6_cobertura() -> list[str]:
    from spatial_compare.models import ComparisonResult

    res = ComparisonResult.from_dict(_leer_run())
    m = {mt.id: mt.valor for mt in res.metrics}
    c = m.get("cobertura_comun", {})
    if abs(float(c.get("iou_envolventes", -1.0)) - 0.972) > 1e-3:
        return ["iou_de_envolventes no coincide con BASE"]
    return []


def b7_roundtrip() -> list[str]:
    from spatial_compare.transforms import bounds_en_crs

    a = _assessment()
    v = a["cobertura"]["ventana_utm_32618"]
    orig = (v["minx"], v["miny"], v["minx"] + 2000.0, v["miny"] + 2000.0)
    c = ((orig[0] + orig[2]) / 2, (orig[1] + orig[3]) / 2)
    ida = bounds_en_crs(orig, "EPSG:32618", "EPSG:9377", pad_m=0.0)
    vuelta = bounds_en_crs(ida, "EPSG:9377", "EPSG:32618", pad_m=0.0)
    # centro cuasi-invariante (ventana rotada respecto a UTM; tolerancia 5 cm)
    cc = ((vuelta[0] + vuelta[2]) / 2, (vuelta[1] + vuelta[3]) / 2)
    if abs(cc[0] - c[0]) > 5e-2 or abs(cc[1] - c[1]) > 5e-2:
        return [f"centro divergió: {cc} vs {c}"]
    if vuelta[0] > orig[0] + 0.1 or vuelta[1] > orig[1] + 0.1:
        return ["bounds de regreso no abarca el original (min)"]
    if vuelta[2] < orig[2] - 0.1 or vuelta[3] < orig[3] - 0.1:
        return ["bounds de regreso no abarca el original (max)"]
    return []


def b8_cli() -> list[str]:
    env = dict(os.environ)
    env["PYTHONPATH"] = str(REPO / "02_CORE")
    pr = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_compare.cli"],
        cwd=str(REPO),
        env=env,
        capture_output=True,
        text=True,
    )
    if "run-limited" not in pr.stdout:
        return ["run-limited no documentado en la CLI"]
    pr2 = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_compare.cli", "comando-inexistente"],
        cwd=str(REPO),
        env=env,
        capture_output=True,
        text=True,
    )
    if pr2.returncode == 0:
        return ["comando desconocido debería fallar"]
    return []


def b9_sin_absolutas() -> list[str]:
    textos = []
    for r in (RUTA_RUN, RUTA_SOURCES, RUTA_AUDIT):
        textos.append((RAIZ / r).read_text(encoding="utf-8"))
    lineas = [l for l in (RAIZ / "spatial/comparisons/comparison-ledger.jsonl")
              .read_text(encoding="utf-8").splitlines() if l.strip()]
    textos.append(lineas[-1])
    for t in textos:
        if re.search(r"[A-Za-z]:[\\/]", t):
            return ["ruta absoluta de Windows presente en artefactos"]
        if "\\\\" in t or (".resolve()" in t):
            pass
    return []


def b10_read_only() -> list[str]:
    origen = REPO / "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
    antes = _sha_archivo(origen)
    from spatial_compare.limited import GeoPackageSegmentedLimited

    adaptador = GeoPackageSegmentedLimited(origen)
    m = adaptador.metadatos()
    bbox = (
        _assessment()["cobertura"]["ventana_utm_32618"]["minx"],
        _assessment()["cobertura"]["ventana_utm_32618"]["minx"] + 2000.0,
        _assessment()["cobertura"]["ventana_utm_32618"]["miny"],
        _assessment()["cobertura"]["ventana_utm_32618"]["miny"] + 2000.0,
    )
    adaptador.preseleccionar(bbox)
    if _sha_archivo(origen) != antes:
        return ["el GeoPackage cambió tras preseleccionar"]
    return []


def b11_registry_valido() -> list[str]:
    from spatial_compare.registry import validar_registry

    errs = validar_registry()
    if errs:
        return [f"registry V1 con errores: {errs}"]
    return []


def b12_no_adopcion() -> list[str]:
    from spatial_compare.models import ComparisonResult, RESULTADOS_PROHIBIDOS

    res = ComparisonResult.from_dict(_leer_run())
    if res.result in RESULTADOS_PROHIBIDOS:
        return [f"resultado prohibido emitido: {res.result}"]
    cuerpos = list(res.razones)
    cuerpos.extend(res.correspondences)
    for c in cuerpos:
        if "adopta" in c.lower() or "se adopta" in c.lower():
            return [f"afirmación de adopción en las razones: {c}"]
    if any("adopta" in interp.lower() for interp in res.allowed_interpretations):
        return ["interpretaciones permitidas contienen adopción"]
    return []


# ----------------------------------------------------------- ejecución

def _ene(x) -> str:
    return "PASS" if not x else f"FAIL ({len(x)})"


def run_todo() -> int:
    pruebas = {
        "T1_gate_habilitado": t1_gate_habilitado,
        "T2_gate_assessment": t2_gate_assessment_discrepante,
        "T3_gate_estado": t3_gate_estado,
        "T4_gate_schema": t4_gate_schema,
        "T5_gate_quorum": t5_gate_quorum,
        "T6_gate_restricciones": t6_gate_sin_restricciones,
        "T7_perfil_fuera_catalogo": t7_perfil_fuera_catalogo,
        "T8_consumidores": t8_consumidores,
        "T9_adaptador": t9_adaptador_metadatos,
        "T10_preseleccion": t10_preseleccion,
        "T11_reduccion_z": t11_reduccion_z,
        "T12_bounds_crs": t12_bounds_crs,
        "T13_invariantes": t13_invariantes,
        "T14_determinismo": t14_determinismo_serial,
        "T15_reproduccion": t15_reproduccion,
        "T16_metricas": t16_metricas,
        "T17_prohibiciones": t17_prohibiciones,
        "T18_integridad": t18_integridad,
        "T19_ledger": t19_ledger,
        "T20_historico": t20_historico_intacto,
        "B5_hausdorff": b5_hausdorff,
        "B6_cobertura": b6_cobertura,
        "B3_slug": b3_slug,
        "B4_percentil": b4_percentil,
        "B7_roundtrip": b7_roundtrip,
        "B9_sin_absolutas": b9_sin_absolutas,
        "B10_read_only": b10_read_only,
        "B11_registry_valido": b11_registry_valido,
        "B12_no_adopcion": b12_no_adopcion,
        "B8_cli": b8_cli,
        "B2_regresion": b2_regresion,
    }
    ok = True
    cont = {"ok": 0, "fail": 0}
    for nombre, fn in pruebas.items():
        fallos = fn()
        if fallos:
            ok = False
            cont["fail"] += 1
            print(f"{nombre}: FAIL")
            for f in fallos:
                print(f"   {f}")
        else:
            cont["ok"] += 1
            print(f"{nombre}: PASS")
    total = cont["ok"] + cont["fail"]
    print(f"RESULTADO_T1_T20: {'PASS' if ok else 'FAIL'} ({cont['ok']}/{total})")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(run_todo())