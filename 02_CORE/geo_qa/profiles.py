# -*- coding: utf-8 -*-
"""
profiles — catálogo declarativo de los seis perfiles QA de HF-GEO-QA V1.

Los perfiles solo declaran QUÉ se evalúa y CÓMO se resume; la ejecución corre
en runner.py contra checks puros. Este catálogo es la fuente del registry.
"""

from __future__ import annotations

from .models import (
    CALIDAD_SPATIAL,
    CANONICAL_WATERSHED,
    CARTOGRAPHIC_REPORT,
    COMPARISON,
    CRITICAL,
    DECISION_PROFESIONAL,
    DEM,
    DIAGNOSTIC,
    ERROR,
    EXPEDIENTE,
    GATE_3,
    HIDROGRAFIA,
    HISTORICAL_AUDIT,
    HYDRO_CONSUMPTION,
    INFO,
    PF02_ADOPTION,
    RUPTURE_EVIDENCE,
    SNAP_DECISION,
    TERRITORIAL_COMPETENCE,
    WARNING,
)

_PAS = [INFO, WARNING, ERROR, CRITICAL]

PERFILES = {
    "spatial_reference": {
        "id": "spatial_reference",
        "nombre": "Registro de referencia espacial",
        "version": "1.0",
        "objetivo": "Valida que el activo declara un sistema de referencia espacial legible, "
        "con datum, unidades, orden de ejes implícito (always_xy) y transformación coherente.",
        "activos_aplicables": ["raster_coberturas", "vectors", "feature-collections", "puntos"],
        "grupos": ["referencia_espacial"],
        "checks_obligatorios": [
            "crs_presente",
            "crs_legible",
            "datum_consistente",
            "unidades_declaradas",
            "axis_order_implicito",
            "always_xy_consistente",
            "transformacion_registrada",
            "coordenadas_finitas",
            "inclusion_extension_declarada",
        ],
        "checks_opcionales": [],
        "resultado_maximo": "PASS",
        "forma_global": "simple",
        "consumidores_permitidos": [],
        "consumidores_bloqueados": [],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": "Cualquier check FAIL con severidad ERROR o CRITICAL derriba el perfil.",
    },
    "raster_georef": {
        "id": "raster_georef",
        "nombre": "Georeferenciación de ráster",
        "version": "1.0",
        "objetivo": "Valida metadata de georeferenciación de un ráster derivado "
        "(affine, orientación, resolución, dimensiones, extensión, alineación, inclusión del punto contractual).",
        "activos_aplicables": ["raster_coberturas", "DTM", "DEM"],
        "grupos": ["georeferenciacion"],
        "checks_obligatorios": [
            "affine_presente",
            "affine_a_positivo_oriente_este",
            "affine_e_negativo_north_up",
            "rotacion_ausente",
            "resolucion_congruente",
            "dimensiones_registradas",
            "extension_registrada",
            "nodata_declarado",
            "alineamiento_grilla",
            "inclusion_punto_contractual",
            "hash_registrado",
        ],
        "checks_opcionales": [],
        "resultado_maximo": "PASS",
        "forma_global": "simple",
        "consumidores_permitidos": [],
        "consumidores_bloqueados": [],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": "Affine espejada, sin north-up o inconsistente = CRITICAL e impide el perfil.",
    },
    "cartographic_evidence": {
        "id": "cartographic_evidence",
        "nombre": "Evidencia cartográfica (entrada declarativa)",
        "version": "1.0",
        "objetivo": "Evalúa por declaración del productor (sin visión artificial) los elementos "
        "cartográficos requeridos para decisiones: flecha norte, escala, CRS, coordenadas, leyenda, "
        "fuente, autoridad y limitaciones.",
        "activos_aplicables": ["mapa", "representacion", "cartographic-reference", "vista"],
        "grupos": ["orientacion", "representacion"],
        "checks_obligatorios": [
            "orientacion_norte",
            "escala_presente",
            "crs_visible",
            "coordenadas_visibles",
            "leyenda_presente",
            "fuente_presente",
            "autoridad_presente",
            "limitaciones_presentes",
            "evidencia_historica_gobernada",
        ],
        "checks_opcionales": [],
        "resultado_maximo": "PASS",
        "forma_global": "carto",
        "consumidores_permitidos": [HISTORICAL_AUDIT, DIAGNOSTIC, COMPARISON, RUPTURE_EVIDENCE],
        "consumidores_bloqueados": [
            SNAP_DECISION,
            PF02_ADOPTION,
            GATE_3,
            CANONICAL_WATERSHED,
            CARTOGRAPHIC_REPORT,
        ],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": (
            "north_arrow_present y (north_arrow_verified=false o north_arrow_direction != "
            "map_north_direction) implica FAIL_ORIENTATION CRITICAL bloqueando la columna "
            "SNAP_DECISION/PF02_ADOPTION/GATE_3/CANONICAL_WATERSHED/CARTOGRAPHIC_REPORT."
        ),
    },
    "vector_geometry": {
        "id": "vector_geometry",
        "nombre": "Geometría vectorial",
        "version": "1.0",
        "objetivo": "Valida geometría vectorial (FeatureCollection): tipos permitidos, validez OGC, "
        "coordenadas finitas, CRS declarado, duplicados y topología mínima.",
        "activos_aplicables": ["vectors", "feature-collections", "red", "puntos", "poligonos"],
        "grupos": ["geometria"],
        "checks_obligatorios": [
            "geojson_valido",
            "feature_collection_valida",
            "geometrias_no_vacias",
            "tipos_permitidos",
            "coordenadas_finitas",
            "geometrias_validas",
            "autointersecciones_ausentes",
            "duplicados_geometricos",
            "crs_declarado",
            "bounds_finitos",
        ],
        "checks_opcionales": ["topologia_minima_coincidente"],
        "resultado_maximo": "PASS",
        "forma_global": "simple",
        "consumidores_permitidos": [],
        "consumidores_bloqueados": [],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": "Geometría inválida o CRS ausente = ERROR; geometría vacía = CRITICAL.",
    },
    "network_internal": {
        "id": "network_internal",
        "nombre": "Validez interna de la red HF",
        "version": "1.0",
        "objetivo": "Valida internamente la red derivada (gate02) frente a su registro: continuidad "
        "declarada, segmentos, correspondencia con el registro de red y del caso, y RESTRICCIÓN "
        "TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED. Nunca declara competencia territorial.",
        "activos_aplicables": ["red_gate02"],
        "grupos": ["red_interna"],
        "checks_obligatorios": [
            "feature_collection_valida",
            "geometrias_lineales",
            "continuidad_topologica_declarada",
            "segmentos_registrados",
            "duplicados_geometricos",
            "desconexiones_declaradas",
            "direccion_declarada",
            "coherencia_d8_registrada",
            "monotonicidad_acumulacion_evidencia",
            "correspondencia_registro",
            "umbral_declarado",
            "hash_registrado",
            "procedencia_registrada",
            "crs_declarado_consistente",
        ],
        "checks_opcionales": ["coincidencia_segmento_candidato"],
        "resultado_maximo": "INTERNALLY_VALIDATED",
        "forma_global": "red",
        "consumidores_permitidos": [DIAGNOSTIC, COMPARISON, HISTORICAL_AUDIT],
        "consumidores_bloqueados": [
            EXPEDIENTE,
            DECISION_PROFESIONAL,
            CANONICAL_WATERSHED,
            TERRITORIAL_COMPETENCE,
        ],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": "Red desconectada = ERROR; monotonicidad nunca afirmable; "
        "resultado máximo INTERNALLY_VALIDATED.",
    },
    "gate02_diagnostic": {
        "id": "gate02_diagnostic",
        "nombre": "Diagnóstico integral de la puerta 2",
        "version": "1.0",
        "objetivo": "Cross-checks integrales del estado espacial de un caso (registry, referencia "
        "de red/MDT, contraste, decisión espacial, gates) sin modificar decisiones. Entrega "
        "dianóstico INTERNALLY_VALIDATED_WITH_RESTRICTIONS validando que la salida de GATE_2 está "
        "descrita y no es consumible para denominación de competencia.",
        "activos_aplicables": ["caso_build", "snapshot_build"],
        "grupos": ["integridad_repositorio", "correspondencia_materializada", "gobernanza_decision"],
        "checks_obligatorios": [
            "hash_mdt_registrado",
            "hash_red_registrado",
            "umbral_red_registrado",
            "conjuntos_coherentes",
            "inclusion_punto_contractual",
            "contraste_existente",
            "registro_espacial_coherente",
            "correspondencia_proposed_cell",
            "decision_no_adoptada",
            "gate2_condicional",
            "cell_propuesta_no_adoptada",
            "gates_preservados",
        ],
        "checks_opcionales": [],
        "resultado_maximo": "INTERNALLY_VALIDATED",
        "forma_global": "diagnostico",
        "consumidores_permitidos": [DIAGNOSTIC, HISTORICAL_AUDIT, COMPARISON],
        "consumidores_bloqueados": [
            DECISION_PROFESIONAL,
            GATE_3,
            CANONICAL_WATERSHED,
            TERRITORIAL_COMPETENCE,
            HYDRO_CONSUMPTION,
        ],
        "severidad_cierre": ["ERROR", "CRITICAL"],
        "reglas_globales": "Resultado INTERNALLY_VALIDATED (o INTERNALLY_VALIDATED_WITH_RESTRICTIONS) "
        "sin FAIL; las restricciones declaran qué queda sin demostrar (competencia, orientación, "
        "adopción de celda, GATE_3).",
    },
}

# Sinónimos normativos usados por consumidores (para trazabilidad en registry).
ACTIVOS_NORMATIVOS = {
    "DEM": DEM,
    "HIDROGRAFIA": HIDROGRAFIA,
    "CALIDAD_SPATIAL": CALIDAD_SPATIAL,
    "red_gate02": "red_gate02_D03",
    "caso_build": "caso_iguana_pc80",
    "cartographic-reference": "manifiesto_gate02",
    "mapa": "manifiesto_gate02",
}


__all__ = ["PERFILES", "ACTIVOS_NORMATIVOS"]