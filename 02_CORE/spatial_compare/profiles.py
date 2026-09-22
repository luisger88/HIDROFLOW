# -*- coding: utf-8 -*-
"""
profiles — catálogo declarativo de perfiles de comparación V1.

Los perfiles declaran objetivo, fuentes esperadas, QA previo, métricas
obligatorias, tolerancias por defecto, resultado máximo, clasificaciones
permitidas, consumidores e interpretaciones permitidas/prohibidas. El registry
valida el catálogo; los perfiles nunca ejecutan lógica.
"""

from __future__ import annotations

from .models import (
    ALTA,
    BAJA,
    CANDIDATE_WITH_EVIDENCE,
    COMPARE_D03_CANDIDATES_V1,
    COMPARE_NETWORK_TO_TERRAIN_V1,
    COMPARE_POINT_TO_NETWORKS_V1,
    COMPARE_SEGMENT_CORRESPONDENCE_V1,
    COMPARE_VECTOR_NETWORKS_V1,
    COMPUTATIONAL_INTERNAL_COMPARISON,
    DIAGNOSTIC_COMPARISON,
    HF_CARTO,
    INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE,
    INSUFFICIENT_EVIDENCE,
    MEDIA,
    QA_CARTOGRAPHIC_EVIDENCE_V1,
    QA_NETWORK_INTERNAL_V1,
    QA_RASTER_GEOREFERENCE_V1,
    QA_SPATIAL_REFERENCE_V1,
    QA_VECTOR_GEOMETRY_V1,
    REFERENCE_UNAVAILABLE,
    REGISTER_VISUAL_REFERENCE_V1,
    TERRITORIAL_CONTRAST_AUDIT,
    TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED,
)

_QA_VECTOR = QA_VECTOR_GEOMETRY_V1
_QA_RED = QA_NETWORK_INTERNAL_V1
_QA_RASTER = QA_RASTER_GEOREFERENCE_V1
_QA_REF = QA_SPATIAL_REFERENCE_V1
_QA_CARTO = QA_CARTOGRAPHIC_EVIDENCE_V1

_TOLERANCIAS_NETWORK = [{"pf": "PF-01", "rango_m": "0-30"}, {"pf": "PF-02", "rango_m": "30-136", "exige_acta": True}, {"pf": "PF-03", "rango_m": ">136", "exige_acta": True}]

_PERMITIDOS = (
    "HF_CARTO", "HF_GEO_QA", "HF_UNCERTAINTY", "CALIDAD_SPATIAL", "DIAGNOSTIC",
    "HISTORICAL_AUDIT", "COMPARISON", "TERRITORIAL_CONTRAST_AUDIT",
)
_BLOQUEADOS = (
    "PF02_ADOPTION", "GATE_3", "CANONICAL_WATERSHED", "HYDRO_CONSUMPTION",
    "DECISION_PROFESIONAL", "EXPEDIENTE", "TERRITORIAL_COMPETENCE",
)

PERFILES: dict[str, dict] = {
    COMPARE_VECTOR_NETWORKS_V1: {
        "id": COMPARE_VECTOR_NETWORKS_V1,
        "nombre": "Comparación de redes vectoriales",
        "version": "1.0",
        "objetivo": "Comparar redes vectoriales en CRS métrico gobernado: longitudes, corredores, coincidencia, Hausdorff y divergencias. Sin adopciones.",
        "tipo": "network_network",
        "fuentes": {"source": "red vectorial", "target": "red vectorial"},
        "qa_previo": [_QA_REF, _QA_VECTOR, _QA_RED],
        "metricas_obligatorias": [
            "longitud_fuente", "longitud_target", "cobertura_comun", "longitud_coincidente",
            "pct_dentro_corredor", "hausdorff", "divergencias",
        ],
        "tolerancias_default": _TOLERANCIAS_NETWORK,
        "resultado_maximo": None,
        "clasificaciones_permitidas": [COMPUTATIONAL_INTERNAL_COMPARISON, TERRITORIAL_CONTRAST_AUDIT, DIAGNOSTIC_COMPARISON],
        "confianza_default": MEDIA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_CELL", "TERRITORIALLY_COMPETENT", "ADOPTED_SEGMENT"],
        "reglas": ["corredores 30/60/90/136 siempre; nunca elegir radio favorable"],
    },
    COMPARE_POINT_TO_NETWORKS_V1: {
        "id": COMPARE_POINT_TO_NETWORKS_V1,
        "nombre": "Comparación punto-red",
        "version": "1.0",
        "objetivo": "Distancia y percentiles de puntos contractuales/candidatos frente a una red gobernada. Diagnóstico; nunca adopción.",
        "tipo": "point_network",
        "fuentes": {"source": "punto(s)", "target": "red vectorial"},
        "qa_previo": [_QA_REF, _QA_VECTOR],
        "metricas_obligatorias": ["distancia_punto_red_min", "distancia_punto_red_percentiles"],
        "tolerancias_default": _TOLERANCIAS_NETWORK,
        "resultado_maximo": None,
        "clasificaciones_permitidas": [COMPUTATIONAL_INTERNAL_COMPARISON, DIAGNOSTIC_COMPARISON],
        "confianza_default": ALTA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["ADOPTED_CELL", "ADOPTED_SEGMENT", "PROPOSED_CELL_SELECTION", "TERRITORIALLY_COMPETENT"],
        "reglas": ["la distancia no selecciona celdas; es diagnóstico"],
    },
    COMPARE_SEGMENT_CORRESPONDENCE_V1: {
        "id": COMPARE_SEGMENT_CORRESPONDENCE_V1,
        "nombre": "Correspondencia red vs segmento candidato",
        "version": "1.0",
        "objetivo": "Correspondencia espacial de una red frente a un segmento candidato (ej. segmento 24) dentro de la ventana portable. Máximo CANDIDATE_WITH_EVIDENCE.",
        "tipo": "segment_correspondence",
        "fuentes": {"source": "red vectorial", "target": "segmento candidato"},
        "qa_previo": [_QA_REF, _QA_VECTOR, _QA_RED],
        "metricas_obligatorias": [
            "longitud_fuente", "longitud_target", "cobertura_comun", "longitud_coincidente",
            "pct_dentro_corredor", "hausdorff", "orientacion_local", "divergencias",
            "segmentos_sin_homologo",
        ],
        "tolerancias_default": _TOLERANCIAS_NETWORK,
        "resultado_maximo": CANDIDATE_WITH_EVIDENCE,
        "clasificaciones_permitidas": [COMPUTATIONAL_INTERNAL_COMPARISON, DIAGNOSTIC_COMPARISON],
        "confianza_default": MEDIA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_SEGMENT", "ADOPTED_CELL", "TERRITORIALLY_COMPETENT"],
        "reglas": ["el segmento 24 permanece CANDIDATO_NO_DEMOSTRADO; no se adopta"],
    },
    COMPARE_NETWORK_TO_TERRAIN_V1: {
        "id": COMPARE_NETWORK_TO_TERRAIN_V1,
        "nombre": "Comparación red-terreno",
        "version": "1.0",
        "objetivo": "Alineación de la red con el terreno (MDT gobernado): descenso altimétrico y georreferencia. Máximo INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE; jamás competencia territorial.",
        "tipo": "terrain",
        "fuentes": {"source": "red vectorial", "target": "raster MDT"},
        "qa_previo": [_QA_REF, _QA_VECTOR, _QA_RED, _QA_RASTER],
        "metricas_obligatorias": ["elevacion_red", "fraccion_descenso", "cobertura_mdt"],
        "tolerancias_default": _TOLERANCIAS_NETWORK,
        "resultado_maximo": INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE,
        "clasificaciones_permitidas": [COMPUTATIONAL_INTERNAL_COMPARISON, DIAGNOSTIC_COMPARISON],
        "confianza_default": MEDIA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["TERRITORIALLY_COMPETENT", "TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_CELL"],
        "reglas": ["evidencia de terreno no acredita competencia territorial"],
    },
    REGISTER_VISUAL_REFERENCE_V1: {
        "id": REGISTER_VISUAL_REFERENCE_V1,
        "nombre": "Registro de referencia visual",
        "version": "1.0",
        "objetivo": "Auditar y registrar una referencia visual (mapa, ortofoto, imagen) gobernada. No produce métricas geométricas; documenta génesis y bloqueos.",
        "tipo": "visual_reference",
        "fuentes": {"source": "referencia visual", "target": None},
        "qa_previo": [_QA_REF, _QA_CARTO],
        "metricas_obligatorias": [],
        "tolerancias_default": [],
        "resultado_maximo": None,
        "clasificaciones_permitidas": [DIAGNOSTIC_COMPARISON, TERRITORIAL_CONTRAST_AUDIT],
        "confianza_default": BAJA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_CELL", "TERRITORIALLY_COMPETENT", "ADOPTED_SEGMENT", "CORRESPONDENCE_OBSERVED"],
        "reglas": ["las referencias visuales jamás emiten métricas precisas"],
    },
    COMPARE_D03_CANDIDATES_V1: {
        "id": COMPARE_D03_CANDIDATES_V1,
        "nombre": "Comparación de candidatos D-03",
        "version": "1.0",
        "objetivo": "Diagnóstico de distancias y cobertura de restricción de los candidatos D-03 frente a la red y la celda propuesta. Nunca adopta.",
        "tipo": "candidates",
        "fuentes": {"source": "candidatos D-03", "target": "red vectorial"},
        "qa_previo": [_QA_REF, _QA_VECTOR, _QA_RED],
        "metricas_obligatorias": ["distancia_candidatos", "cobertura_restriccion", "distancia_punto_red_min"],
        "tolerancias_default": _TOLERANCIAS_NETWORK,
        "resultado_maximo": None,
        "clasificaciones_permitidas": [DIAGNOSTIC_COMPARISON, COMPUTATIONAL_INTERNAL_COMPARISON],
        "confianza_default": MEDIA,
        "consumidores_permitidos": _PERMITIDOS,
        "consumidores_bloqueados": _BLOQUEADOS,
        "interpretaciones_prohibidas": ["ADOPTED_CELL", "ADOPTED_SEGMENT", "PROPOSED_CELL_SELECTION", "TERRITORIALLY_COMPETENT"],
        "reglas": ["los candidatos no se adoptan (PROPUESTA_NO_ADOPTADA)"],
    },
}

# Perfiles con ejecutor concreto (registry valida el catálogo con IMPL).
IMPL_POR_PERFIL: frozenset[str] = frozenset(PERFILES)


__all__ = ["PERFILES", "IMPL_POR_PERFIL"]