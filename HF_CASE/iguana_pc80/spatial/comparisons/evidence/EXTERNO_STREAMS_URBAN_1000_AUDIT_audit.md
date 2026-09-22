# Auditoría de comparación espacial — EXTERNO_STREAMS_URBAN_1000_AUDIT

- motor: HF_SPATIAL_COMPARE_RUNNER v1.0.0
- perfil: COMPARE_VECTOR_NETWORKS_V1
- clasificación: TERRITORIAL_CONTRAST_AUDIT
- case: caso_iguana_pc80
- comparison_run_id: 3b432d589d2f5813
- output_hash: 9c0ce9bad4ed5250a953261163703d6426647381253efd4790b23fab48b4aee9
- resultados: INSUFFICIENT_EVIDENCE (confianza BAJA)
- state_change: False · professional_decision: None

## Fuentes

- Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams) [streams_urban_1000_medellin] hash=3b2b91cf02cb1dcc crs=None

## Transformación

- n/a -> EPSG:32618 (n/a , always_xy=True)

## Gobernanza

- autoridad_source: None
- bloqueos_source: ['CRS ausente', 'autoridad no declarada', 'axis_order no declarado', 'datum no declarado', "estado bloqueante para métricas: 'SIN_GOBERNANZA'", 'licencia UNKNOWN: procedencia no gobernada']
- bloqueos_target: []
- clase_source: B_COMPUTACIONAL
- crs_source: None
- estado_registro_source: SIN_GOBERNANZA
- fuente_apta_para_metricas: False
- licencia_source: UNKNOWN
- nota: sin métricas; auditoría de gobernanza persistida
- target_apta_para_metricas: True

## Supuestos y limitaciones

- supuesto: sin métricas: la comparación se restringe a la auditoría de gobernanza de la fuente
- limitación: no hay evidencia geométrica suficiente

## Divergencias y correspondencias


## Interpretaciones

- prohibida: TRUE_NETWORK
- prohibida: CORRECT_CHANNEL
- prohibida: ADOPTED_CELL
- prohibida: TERRITORIALLY_COMPETENT
- prohibida: ADOPTED_SEGMENT
