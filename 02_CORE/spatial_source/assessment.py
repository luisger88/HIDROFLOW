# -*- coding: utf-8 -*-
"""
assessment — máquina de aptitud y ensamblaje del hf.spatial-source-assessment.v1.

Máquina: READABLE -> GEOMETRIES_VALID -> CRS_VERIFIED -> COVERAGE_VERIFIED ->
COVERAGE_PARTIAL -> PROVENANCE_PARTIAL -> LICENSE_UNKNOWN con contracción
monótona: si un escalón falla o el quorum QA declina, el resultado es
NOT_APT_FOR_COMPARISON.

La licencia UNKNOWN (hecho) impide la aptitud territorial plena; con el resto
de escalones OK y quorum sin FAIL, la fuente queda
CONDITIONALLY_APT_FOR_COMPARISON.
"""

from __future__ import annotations

import sys
from pathlib import Path

from . import coverage as COV_MOD
from . import crs as CRS_MOD
from . import licensing as LIC_MOD
from . import metadata as META_MOD
from . import provenance as PROV_MOD
from . import qa as QA_MOD
from .geopackage import GeoPackageSource
from .models import (
    APTITUD_CONDITIONALLY_APT,
    APTITUD_COBERTURA_PARCIAL,
    APTITUD_COBERTURA_VERIFICADA,
    APTITUD_CRS_VERIFICADO,
    APTITUD_GEOMETRIAS_VALIDAS,
    APTITUD_LICENSE_UNKNOWN,
    APTITUD_NOT_APT,
    APTITUD_PROVENANCE_PARCIAL,
    APTITUD_READABLE,
    CLASIFICACION_POST_ASSESSMENT,
    CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION,
    D03_VENTANA_RADIO_M,
    INTERPRETACIONES_PERMITIDAS_POST_ASSESSMENT,
    LICENSE_STATUS_UNKNOWN,
    RESULTADO_MAXIMO_EMISIBLE,
    SOURCE_ESCALA,
    SOURCE_FORMATO,
    SOURCE_ID,
    SOURCE_LAYER,
    SOURCE_PATH_REFERENCE,
    SOURCE_TITULO,
    sha256_archivo,
)
from .result import (
    AssessmentResult,
    calcular_assessment_id,
    calcular_output_hash,
    validar_invariantes,
)


def _escalon(estado, veredicto, nota=""):
    return {"estado": estado, "veredicto": veredicto, "nota": nota}


def _motores() -> dict:
    import fiona  # noqa: PLC0415
    import geopandas
    import numpy
    import pyproj
    import shapely

    return {
        "python": sys.version.split()[0],
        "geopandas": geopandas.__version__,
        "fiona": fiona.__version__,
        "shapely": shapely.__version__,
        "pyproj": pyproj.__version__,
        "numpy": numpy.__version__,
        "modulo": "spatial_source",
    }


def _ubicar_fuente(ruta_fuente, caso_raiz: Path | None) -> Path:
    """Resuelve la fuente: absoluta directa o relativa al repo del caso."""
    p = Path(ruta_fuente)
    if not p.is_absolute():
        if caso_raiz is None:
            raise ValueError("ruta_fuente relativa requiere caso_raiz")
        repo = Path(caso_raiz).parents[1]
        p = repo / p
    return p.resolve()


def correr_assessment(ruta_fuente=None, caso_raiz=None, parsear_invariantes=True) -> AssessmentResult:
    """Ensambla el resultado de evaluación de la fuente (puro: no persiste)."""
    caso_raiz = Path(caso_raiz) if caso_raiz else None
    ruta_f = _ubicar_fuente(ruta_fuente or SOURCE_PATH_REFERENCE, caso_raiz)
    if not ruta_f.is_file():
        raise FileNotFoundError(f"fuente no encontrada: {ruta_f}")

    sha = sha256_archivo(ruta_f)
    tamanyo = ruta_f.stat().st_size
    with GeoPackageSource(ruta_f) as gpkg:
        capa_h1 = gpkg.capa_h1()
        stats = gpkg.estadisticas_capa()
        meta = META_MOD.metadata_tecnica(gpkg)
        crs_info = CRS_MOD.analizar_crs(gpkg)
        rt = crs_info.get("roundtrip") or {}
        d03_nativo = (
            (rt.get("d03_nativo") or {}).get("x", 0.0),
            (rt.get("d03_nativo") or {}).get("y", 0.0),
        )
        d03_utm = (
            (rt.get("d03_utm_32618") or {}).get("x", 0.0),
            (rt.get("d03_utm_32618") or {}).get("y", 0.0),
        )
        cov = COV_MOD.cobertura_ventana(gpkg, d03_utm, D03_VENTANA_RADIO_M)
        provs = PROV_MOD.proveniencia()
        lic = LIC_MOD.licenciamiento()
        qa_run = QA_MOD.ejecutar_qa(gpkg, crs_info, cov, stats, sha, capa_h1, d03_nativo)

    # ----------------------------------------------------------------- máquina
    leible = stats["conteo"] > 0
    geom_ok = stats["n_geom_nulas"] == 0 and stats["n_geom_vacias"] == 0
    crs_ok = crs_info["resultado"] == CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION
    cov_ok = cov["resultado"] not in ("COBERTURA_INSUFICIENTE_DE_VENTANA",)
    qa_ok = qa_run["qa"]["ok"]

    escalones = [
        _escalon(APTITUD_READABLE, "PASS" if leible else "FAIL",
                 f"capa '{SOURCE_LAYER}' con {stats['conteo']} feature(s)"),
        _escalon(APTITUD_GEOMETRIAS_VALIDAS, "PASS" if geom_ok else "FAIL",
                 "sin geometrías nulas ni vacías" if geom_ok else "geometrías nulas o vacías"),
        _escalon(APTITUD_CRS_VERIFICADO, "PASS" if crs_ok else "FAIL",
                 crs_info["detalle"] if not crs_ok else
                 f"CRS {crs_info['crs_declarado']} formalizado externamente"),
        _escalon(APTITUD_COBERTURA_VERIFICADA, "PASS" if cov_ok else "FAIL",
                 cov["nota"]),
        _escalon(APTITUD_COBERTURA_PARCIAL, "PASS" if cov_ok else "FAIL",
                 f"{cov['pct_lineas_ventana_buffer1m']:.4f} de línea efectiva en la ventana"),
        _escalon(APTITUD_PROVENANCE_PARCIAL, "PASS", provs["procedencia"]),
        _escalon(APTITUD_LICENSE_UNKNOWN, "PASS", lic["nota"]),
    ]

    bloqueado = any(esc["veredicto"] == "FAIL" for esc in escalones) or not qa_ok
    final = APTITUD_NOT_APT if bloqueado else APTITUD_CONDITIONALLY_APT

    res = AssessmentResult()
    res.caso_id = "iguana_pc80"
    res.identificacion = {
        "source_id": SOURCE_ID,
        "source_path_reference": SOURCE_PATH_REFERENCE,
        "formato": SOURCE_FORMATO,
        "titulo": SOURCE_TITULO,
        "escala": SOURCE_ESCALA,
        "producer": None,
        "authority": None,
        "downloader": None,
        "acquisition_date": None,
        "copia_local": True,
    }
    res.hashes = {
        "sha256": sha,
        "tamano_bytes": tamanyo,
        "capa": SOURCE_LAYER,
        "capa_h1": capa_h1,
        "capa_n_features": stats["conteo"],
        "geometry_type": meta["geometry_type_name"],
        "z": meta["dimensiones"]["z"],
        "m": meta["dimensiones"]["m"],
    }
    res.metadata_tecnica = meta
    res.crs = crs_info
    res.cobertura = cov
    res.proveniencia = provs
    res.licenciamiento = lic
    res.qa = qa_run["qa"]
    res.estadisticas = stats  # auxiliar en memoria (no se persiste en el contrato)
    res.restricciones = _restricciones(res, lic, provs)
    res.aptitud = {
        "estado_previo": "SIN_GOBERNANZA",
        "escalones": escalones,
        "resultado": final,
        "apto_para_metricas_plenas": False,
        "apto_para_comparacion": final == APTITUD_CONDITIONALLY_APT,
        "redimido_via": "assessment persistido" if final == APTITUD_CONDITIONALLY_APT else None,
        "razon": (
            "licencia UNKNOWN y autoridad no declarada impiden aptitud territorial plena; "
            "con el quorum de calidad OK la fuente queda condicionalmente apta para contraste"
            if final == APTITUD_CONDITIONALLY_APT
            else "quorum o escalón de calidad fallido"
        ),
    }
    res.resolucion = {
        "state_change": False,
        "professional_decision": None,
        "adopted_segment": None,
        "adopted_cell": None,
        "resultado_emitible_max": RESULTADO_MAXIMO_EMISIBLE,
        "interpretaciones_permitidas": INTERPRETACIONES_PERMITIDAS_POST_ASSESSMENT,
        "clasificacion": CLASIFICACION_POST_ASSESSMENT,
    }
    res.motores = _motores()

    res.assessment_id = calcular_assessment_id(res)
    res.firmas = {"output_hash": calcular_output_hash(res)}
    if parsear_invariantes:
        errores = validar_invariantes(res)
        if errores:
            raise AssertionError("; ".join(errores))
    return res


def _restricciones(res: AssessmentResult, lic, provs) -> list[str]:
    restricciones = [
        f"LICENSE_UNKNOWN: {lic['nota']}",
        "autoridad de la fuente no declarada: aptitud condicional, sin competencia territorial",
        "fuente externa NO copiada: referenciada y verificada por hash",
        "contraste post-assessment máximo PARTIALLY_COMPARABLE; prohibidos TRUE_NETWORK / "
        "CORRECT_CHANNEL / ADOPTED_SEGMENT / TERRITORIALLY_COMPETENT / ADOPTED_CELL",
    ]
    for perfil in res.qa.get("perfiles", []):
        if perfil.get("resultado_global") == "FAIL":
            restricciones.append(f"QA {perfil['perfil']}: FAIL en checks")
    if res.cobertura.get("resultado") != "COBERTURA_COMPLETA_DE_VENTANA":
        restricciones.append("cobertura de ventana no completa: no se generaliza fuera del área cubierta")
    return restricciones


__all__ = ["correr_assessment", "_restricciones", "validar_invariantes"]