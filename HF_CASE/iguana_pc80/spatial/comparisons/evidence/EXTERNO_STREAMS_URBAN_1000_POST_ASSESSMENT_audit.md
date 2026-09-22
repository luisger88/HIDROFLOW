# Auditoría de comparación espacial — EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT

- motor: HF_SPATIAL_COMPARE_RUNNER v1.0.0
- perfil: COMPARE_D03_CANDIDATES_V1
- clasificación: TERRITORIAL_CONTRAST_AUDIT
- case: iguana_pc80
- comparison_run_id: 278e9713f3816073
- output_hash: 9c248553bf90aa63d96c207559eea706b85b705cc3149cd97650e9aff2193ed7
- resultados: INSUFFICIENT_EVIDENCE (confianza BAJA)
- state_change: False · professional_decision: None

## Fuentes

- Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams) — evaluada [streams_urban_1000_medellin_assessed] hash=3b2b91cf02cb1dcc crs=EPSG:9377

## Transformación

- EPSG:9377 -> EPSG:32618 (pyproj 3.7.2, always_xy=True)

## Gobernanza

- autoridad_source: None
- bloqueos_source: ['licencia UNKNOWN', 'autoridad no declarada']
- bloqueos_target: []
- clase_source: B_COMPUTACIONAL
- crs_source: EPSG:9377
- estado_registro_source: CONDITIONALLY_APT_FOR_COMPARISON
- fuente_apta_para_metricas: False
- licencia_source: UNKNOWN
- nota: post-assessment: 'CRS ausente' resuelto por assessment; licencia UNKNOWN limita el contraste a PARTIALLY_COMPARABLE
- target_apta_para_metricas: True

## Supuestos y limitaciones

- supuesto: post-assessment re-emite la aptitud de la fuente: condicional
- supuesto: sin métricas geométricas en este run (reservadas a futuros runs de GATE 3)
- limitación: licencia UNKNOWN y autoridad no declarada bloquean métricas plenas

## Divergencias y correspondencias


## Interpretaciones

- permitida: PARTIALLY_COMPARABLE: solapamiento parcial y métricas restringidas por licencia UNKNOWN
- prohibida: TRUE_NETWORK
- prohibida: CORRECT_CHANNEL
- prohibida: ADOPTED_SEGMENT
- prohibida: TERRITORIALLY_COMPETENT
- prohibida: ADOPTED_CELL
