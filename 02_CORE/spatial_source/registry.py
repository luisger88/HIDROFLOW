# -*- coding: utf-8 -*-
"""
registry — lectura y actualización del inventario espacial gobernado.

El inventario (spatial/spatial-data-registry.json, hf.spatial-data.v1) es el
contrato de registro de activos espaciales. La evaluación NO edita la entrada
histórica `streams_urban_1000_medellin` (estado SIN_GOBERNANZA): añade una
entrada nueva `streams_urban_1000_medellin_assessed` que materializa la
aptitud condicional sin tocar el registro histórico (C7/C17 lo exigen).
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

_REGISTRO = "spatial/spatial-data-registry.json"

CAMPOS_OBLIGATORIOS = [
    "id", "nombre", "clase", "formato", "fuente", "autoridad",
    "cobertura", "fecha", "vigencia", "licencia", "crs", "datum",
    "axis_order", "resolucion", "escala", "extension", "nodata",
    "precision_conocida", "tamano", "sha256", "procedencia",
    "transformaciones", "regenerabilidad", "portabilidad",
    "restricciones", "estado",
]


def leer_registro(caso_raiz: Path) -> dict[str, Any]:
    import json  # noqa: PLC0415

    ruta = Path(caso_raiz) / "spatial" / "spatial-data-registry.json"
    with open(ruta, "r", encoding="utf-8") as fh:
        return json.load(fh)


def _escribir_registro(caso_raiz: Path, reg: dict[str, Any]) -> None:
    import json  # noqa: PLC0415

    ruta = Path(caso_raiz) / "spatial" / "spatial-data-registry.json"
    ruta.write_text(
        json.dumps(reg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def buscar_activo(caso_raiz: Path, asset_id: str) -> dict[str, Any] | None:
    reg = leer_registro(caso_raiz)
    return next((a for a in reg.get("activos", []) if a.get("id") == asset_id), None)


def validar_campos_obligatorios(entrada: dict[str, Any]) -> list[str]:
    return [c for c in CAMPOS_OBLIGATORIOS if c not in entrada]


def error_campos(entrada: dict[str, Any]) -> str | None:
    faltan = validar_campos_obligatorios(entrada)
    if faltan:
        return f"entrada sin campos obligatorios: {', '.join(faltan)}"
    return None


def insertar_activo(caso_raiz: Path, entrada: dict[str, Any]) -> str:
    """Inserta la entrada evaluada sin modificar las existentes."""
    err = error_campos(entrada)
    if err:
        raise ValueError(err)
    reg = leer_registro(caso_raiz)
    activos = reg.setdefault("activos", [])
    for a in activos:
        if a.get("id") == entrada["id"]:
            raise ValueError(f"id duplicado en registro: {entrada['id']!r}")
    activos.append(entrada)
    reg["activos"] = activos
    _escribir_registro(caso_raiz, reg)
    return activos.index(entrada)


def entrada_assessed(res: Any, total_checks: dict) -> dict[str, Any]:
    """Construye la entrada `streams_urban_1000_medellin_assessed` del registro."""
    cov = res.cobertura
    extension = {
        "minx": round(cov["extension_nativa"]["minx"], 3),
        "miny": round(cov["extension_nativa"]["miny"], 3),
        "maxx": round(cov["extension_nativa"]["maxx"], 3),
        "maxy": round(cov["extension_nativa"]["maxy"], 3),
    }
    transformaciones = list(res.crs.get("transformaciones") or [])
    if not transformaciones:
        transformaciones = ["sin transformación autorizada"]
    qa_resumen = " | ".join(
        f"{p['perfil']}={p['resultado_global']}"
        for p in res.qa.get("perfiles", [])
    )
    return {
        "id": "streams_urban_1000_medellin_assessed",
        "nombre": "Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams) — evaluada",
        "clase": "B_COMPUTACIONAL",
        "formato": res.identificacion["formato"],
        "ruta_relativa_repo": res.identificacion["source_path_reference"],
        "fuente": "externa (Distrito de Medellín)",
        "autoridad": None,
        "cobertura": "zona urbana y rural verificada del Distrito de Medellín",
        "fecha": None,
        "vigencia": "no_definida",
        "licencia": res.licenciamiento.get("license") or "UNKNOWN",
        "crs": res.crs["crs_declarado"],
        "datum": (res.crs.get("datum") or {}).get("nombre"),
        "axis_order": res.crs.get("axis_order"),
        "resolucion": None,
        "escala": res.identificacion["escala"],
        "extension": extension,
        "nodata": None,
        "precision_conocida": (
            f"capa 'Channel Network'; {res.metadata_tecnica['geometry_type_name']} "
            f"{res.hashes['z']}D; srs_id interno 100000 con params EPSG:9377; "
            f"assessment {res.assessment_id}; formalización externa pyproj "
            f"autoridad {res.crs.get('pyproj_autoridad')} (parámetros idénticos a EPSG:9377)"
        ),
        "tamano": res.hashes["tamano_bytes"],
        "sha256": res.hashes["sha256"],
        "procedencia": (
            "assessment OT-HF-SPATIAL-SOURCE-001 "
            "(EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT)"
        ),
        "transformaciones": transformaciones,
        "regenerabilidad": "no_regenerable",
        "portabilidad": "no_portable_datos_privados",
        "restricciones": [
            "uso condicional para contraste; máx. PARTIALLY_COMPARABLE",
            "licencia UNKNOWN: sin métricas territoriales plenas",
            "state_change=false; sin autoridad territorial; sin adopción",
            f"QA: {qa_resumen}",
        ],
        "estado": res.aptitud["resultado"],
        "assessment_id": res.assessment_id,
        "assessment_ref": "spatial/sources/assessments/streams_urban_1000_medellin_assessed.json",
    }


def resumen_checks(res: Any) -> dict[str, int]:
    return dict(res.qa.get("quorum") or {})


__all__ = [
    "leer_registro",
    "buscar_activo",
    "validar_campos_obligatorios",
    "error_campos",
    "insertar_activo",
    "entrada_assessed",
    "resumen_checks",
    "CAMPOS_OBLIGATORIOS",
]