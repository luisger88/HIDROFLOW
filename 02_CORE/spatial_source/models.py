# -*- coding: utf-8 -*-
"""
models — vocabulario del motor spatial_source (OT-HF-SPATIAL-SOURCE-001).

Define los estados de la máquina de evaluación de fuentes territoriales
externas, el vocabulario de aptitud, los perfiles QA y las constantes del
registro. El contrato de los materiales resultantes es
`hf.spatial-source-assessment.v1` (ver docs/contratos/gis/hf-spatial-source-assessment-v1.md).

Este módulo es puro: no importa portability ni escribe nada.
"""

from __future__ import annotations

import hashlib
import json

SCHEMA = "hf.spatial-source-assessment.v1"
SCHEMA_VERSION = "1.0"
MOTOR = "spatial_source"
MOTOR_VERSION = "1.0.0"
OT = "OT-HF-SPATIAL-SOURCE-001"
ASSESSMENT_TYPE = "SPATIAL_SOURCE_ASSESSMENT"
CONTRACT_VERSION = "contract_hf.spatial-source-assessment.v1"

# ----------------------------------------------------------------------------
# Fuente objetivo (histórica y evaluada usan la misma referencia física).
# ----------------------------------------------------------------------------
SOURCE_ID = "streams_urban_1000_medellin"
SOURCE_ID_ASESADO = "streams_urban_1000_medellin_assessed"
SOURCE_PATH_REFERENCE = "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"
SOURCE_FORMATO = "GeoPackage"
SOURCE_LAYER = "Channel Network"
SOURCE_SHA256_EXPECTED = "3B2B91CF02CB1DCC3243ACA74DD5BA8AE05B1FB52737264AEDA45D99B16C3482"
SOURCE_TITULO = "Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams)"
SOURCE_ESCALA = "1:1000"

# ----------------------------------------------------------------------------
# Resultados de CRS.
# ----------------------------------------------------------------------------
CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION = "CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION"
CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION = "CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION"
CRS_UNDECLARED = "CRS_UNDECLARED"
CRS_EPSG_GOBERNADOS = ("EPSG:9377",)  # catalogados para la fuente evaluada

# ----------------------------------------------------------------------------
# Resultados de cobertura / procedencia / licencia.
# ----------------------------------------------------------------------------
COBER_COMPLETA = "COBERTURA_COMPLETA_DE_VENTANA"
COBER_PARCIAL = "COBERTURA_PARCIAL_DE_VENTANA"
COBER_INSUFICIENTE = "COBERTURA_INSUFICIENTE_DE_VENTANA"

PROV_PARTIAL = "PROVENANCE_PARTIAL"
PROV_UNDECLARED = "PROVENANCE_UNDECLARED"

LICENSE_UNKNOWN_RESTRICTS_USE = "LICENSE_UNKNOWN_RESTRICTS_USE"
LICENSE_GOBERNADA = "LICENSE_GOBERNADA"

# ----------------------------------------------------------------------------
# Máquina de aptitud (contracción monótona hacia la aptitud territorial).
# ----------------------------------------------------------------------------
APTITUD_NO_EVALUADA = "NO_EVALUADA"
APTITUD_READABLE = "READABLE"
APTITUD_GEOMETRIAS_VALIDAS = "GEOMETRIES_VALID"
APTITUD_CRS_VERIFICADO = "CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION"
APTITUD_COBERTURA_VERIFICADA = "COVERAGE_VERIFIED"
APTITUD_COBERTURA_PARCIAL = "COVERAGE_PARTIAL"
APTITUD_PROVENANCE_PARCIAL = "PROVENANCE_PARTIAL"
APTITUD_LICENSE_UNKNOWN = "LICENSE_UNKNOWN"

APTITUD_NOT_APT = "NOT_APT_FOR_COMPARISON"
APTITUD_CONDITIONALLY_APT = "CONDITIONALLY_APT_FOR_COMPARISON"
APTITUD_APT_TERRITORIAL = "APT_FOR_TERRITORIAL_COMPARISON"

MACHINA_ESCALONES = [
    APTITUD_NO_EVALUADA,
    APTITUD_READABLE,
    APTITUD_GEOMETRIAS_VALIDAS,
    APTITUD_CRS_VERIFICADO,
    APTITUD_COBERTURA_VERIFICADA,
    APTITUD_COBERTURA_PARCIAL,
    APTITUD_PROVENANCE_PARCIAL,
    APTITUD_LICENSE_UNKNOWN,
]

APTITUD_RESOLUTIVOS = {
    APTITUD_NOT_APT,
    APTITUD_CONDITIONALLY_APT,
    APTITUD_APT_TERRITORIAL,
}

ESTADOS_BLOQUEANTES_REGISTRO = {"SIN_GOBERNANZA", "BLOQUEADO", "DESCARTADO", "RECHAZADO"}

# ----------------------------------------------------------------------------
# Perfiles QA (adaptación de HF-GEO-QA V1 a fuente externa).
# ----------------------------------------------------------------------------

QA_SPATIAL_REFERENCE_V1 = "QA_SPATIAL_REFERENCE_V1"
QA_VECTOR_GEOMETRY_V1 = "QA_VECTOR_GEOMETRY_V1"
QA_NETWORK_INTERNAL_V1 = "QA_NETWORK_INTERNAL_V1"

QA_PROFILES = (QA_SPATIAL_REFERENCE_V1, QA_VECTOR_GEOMETRY_V1, QA_NETWORK_INTERNAL_V1)

PERFIL_SOURCE_IDS = {"QA_SPATIAL_REFERENCE_V1": "spatial_reference",
                     "QA_VECTOR_GEOMETRY_V1": "vector_geometry",
                     "QA_NETWORK_INTERNAL_V1": "network_internal"}

# Resultados de check (semántica hf.geo-qa.v1).
PASS = "PASS"
FAIL = "FAIL"
CONDICIONAL = "CONDICIONAL"
SKIP = "SKIP"
INFO = "INFO"
ERROR_RES = "ERROR_RES"
CRITICAL_S = "CRITICAL_S"
RESULTADOS_CHECK_POSITIVOS = {PASS, INFO, CONDICIONAL, SKIP}

# ----------------------------------------------------------------------------
# Ventana de interés del caso para cobertura.
# ----------------------------------------------------------------------------
D03_VENTANA_RADIO_M = 1000.0   # semi-ancho en metros (excluye nanómetros)
CORREDOR_REF = "D-03"

# ----------------------------------------------------------------------------
# Autoridad/procedencia/licencia: NUNCA se inventan.
# ----------------------------------------------------------------------------
CUSTODIAN = "HidroFlow, copia local referenciada"
LICENSE_UNKNOWN = "UNKNOWN"
LICENSE_STATUS_UNKNOWN = "LICENSE_UNKNOWN"
PROCEDENCIA_NO_GOBERNADA = "copia local referenciada por hash; procedencia externa no gobernada"

# ----------------------------------------------------------------------------
# Contraste post-assesment.
# ----------------------------------------------------------------------------
QUESTION_POST_ASSESSMENT = "EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT"
CLASIFICACION_POST_ASSESSMENT = "TERRITORIAL_CONTRAST_AUDIT"

# Resultado máximo emitible: PARTIALLY_COMPARABLE (nunca competencia territorial).
RESULTADO_MAXIMO_EMISIBLE = "PARTIALLY_COMPARABLE"
INTERPRETACIONES_PERMITIDAS_POST_ASSESSMENT = [
    "PARTIALLY_COMPARABLE: solapamiento parcial y métricas restringidas por licencia UNKNOWN",
    "CORRESPONDENCE_OBSERVED: correspondencias locales observadas sin competencia territorial",
    "DIVERGENCE_OBSERVED: divergencias locales observadas sin competencia territorial",
]

ANALIZAR = "CONDITIONALLY_APT_FOR_COMPARISON"
NO_ANALIZAR = "NOT_APT_FOR_COMPARISON"


def sha256_texto(texto: str) -> str:
    """SHA-256 hexadecimal de un texto UTF-8."""
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def sha256_archivo(path) -> str:
    """SHA-256 de un archivo en bloques (evita cargar grandes fuentes)."""
    h = hashlib.sha256()
    with open(str(path), "rb") as fh:
        for bloque in iter(lambda: fh.read(1048576), b""):
            h.update(bloque)
    return h.hexdigest()


def canonical_json(doc) -> str:
    """Serialización canónica determinista: sort_keys, UTF-8, separadores
    compactos y salto de línea final."""
    return (
        json.dumps(doc, ensure_ascii=False, sort_keys=True, separators=(",", ":"))
        + "\n"
    )


__all__ = [
    "SCHEMA", "SCHEMA_VERSION", "MOTOR", "MOTOR_VERSION", "OT",
    "SOURCE_ID", "SOURCE_ID_ASESADO", "SOURCE_PATH_REFERENCE",
    "SOURCE_FORMATO", "SOURCE_LAYER", "SOURCE_SHA256_EXPECTED",
    "SOURCE_TITULO", "SOURCE_ESCALA",
    "CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION",
    "CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION", "CRS_UNDECLARED",
    "CRS_EPSG_GOBERNADOS",
    "COBER_COMPLETA", "COBER_PARCIAL", "COBER_INSUFICIENTE",
    "PROV_PARTIAL", "PROV_UNDECLARED", "LICENSE_UNKNOWN_RESTRICTS_USE",
    "LICENSE_GOBERNADA",
    "APTITUD_NO_EVALUADA", "APTITUD_READABLE", "APTITUD_GEOMETRIAS_VALIDAS",
    "APTITUD_CRS_VERIFICADO", "APTITUD_COBERTURA_VERIFICADA",
    "APTITUD_COBERTURA_PARCIAL", "APTITUD_PROVENANCE_PARCIAL",
    "APTITUD_LICENSE_UNKNOWN",
    "APTITUD_NOT_APT", "APTITUD_CONDITIONALLY_APT",
    "APTITUD_APT_TERRITORIAL", "MACHINA_ESCALONES", "APTITUD_RESOLUTIVOS",
    "ESTADOS_BLOQUEANTES_REGISTRO",
    "QA_SPATIAL_REFERENCE_V1", "QA_VECTOR_GEOMETRY_V1",
    "QA_NETWORK_INTERNAL_V1", "QA_PROFILES", "PERFIL_SOURCE_IDS",
    "PASS", "FAIL", "CONDICIONAL", "SKIP", "INFO",
    "D03_VENTANA_RADIO_M", "CUSTODIAN", "LICENSE_UNKNOWN",
    "LICENSE_STATUS_UNKNOWN", "PROCEDENCIA_NO_GOBERNADA",
    "QUESTION_POST_ASSESSMENT", "CLASIFICACION_POST_ASSESSMENT",
    "RESULTADO_MAXIMO_EMISIBLE",
    "INTERPRETACIONES_PERMITIDAS_POST_ASSESSMENT",
    "sha256_texto", "sha256_archivo", "canonical_json",
]