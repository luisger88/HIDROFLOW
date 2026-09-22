# Auditoría de comparación espacial — EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON

- motor: HF_SPATIAL_COMPARE_RUNNER v1.0.0
- perfil: COMPARE_LIMITED_EXTERNAL_V1
- clasificación: TERRITORIAL_CONTRAST_AUDIT
- case: caso_iguana_pc80
- comparison_run_id: 3c1166f948abe5df
- output_hash: d0d0a4d6978d189ac82b25b9d5aa80453a8992038b0f1b58ef48ca29c89ed97f
- resultados: PARTIALLY_COMPARABLE (confianza BAJA)
- state_change: False · professional_decision: None

## Fuentes

- Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams) — evaluada [streams_urban_1000_medellin_assessed] hash=3b2b91cf02cb1dcc crs=EPSG:9377
- Red hidrológica HF — GATE 2 E2 (D-03) [red_hf_gate02_d03] hash=ce398aef4d6e1d41 crs=EPSG:32618

## Transformación

- EPSG:9377 -> EPSG:32618 (pyproj 3.7.2, always_xy=True)

## Gobernanza

- assessment_id: 263de2c49ca9d392
- assessment_output_hash: 6d3ff5c1b58ac79c69f34bb98a3a277b86c5eaee322c71f8dd6dcc8cd1667641
- assessment_ref: spatial/sources/assessments/streams_urban_1000_medellin_assessed.json
- bloqueos_metricas_plenas: ['autoridad no declarada', 'licencia UNKNOWN: procedencia no gobernada']
- cantidad_en_ventana_fuente: 805
- cantidad_en_ventana_target: 8
- cantidad_preseleccionada: 596
- fuente_apta_para_metricas_plenas: False
- fuente_habilitada_contraste_limitado: True
- n_restricciones: 5
- nota: contraste limitado habilitado por assessment; nunca adopción ni competencia
- quorum: {'PASS': 24, 'CONDICIONAL': 6, 'FAIL': 0, 'FAIL_ORIENTATION': 0}
- resultado_maximo: PARTIALLY_COMPARABLE

## Métricas

| métrica | unidad | valor |
|---|---|---|
| cobertura_comun | m2/fraccion | {'iou_envolventes': 0.972, 'pct_cobertura_b_en_a': 100.0, 'pct_cobertura_a_en_b': 97.218} |
| continuidad_target | n | 8 |
| distancias_fuente_red_percentiles | m | {'n': 30995, 'min_m': 0.002, 'media_m': 175.262, 'mediana_m': 127.011, 'p90_m': 410.612, 'p95_m': 478.874, 'p99_m': 594.175, 'max_m': 666.766} |
| hausdorff | m | 666.766 |
| hausdorff_dirigido_A_B | m | 666.766 |
| hausdorff_dirigido_B_A | m | 387.709 |
| longitud_coincidente | m | 5862.424 |
| longitud_fuente | m | 35819.127 |
| longitud_target | m | 7413.542 |
| n_divergentes | n | 4 |
| nodos_cercanos | % | 0.0 |
| orientacion_local_mediana | deg | 44.781 |
| orientacion_local_p90 | deg | 89.781 |
| pct_dentro_corredor | % | 16.367 |
| pct_target_dentro_corredor | % | 58.565 |
| preseleccion_fuente | n | {'preseleccionadas': 596, 'total': 148088} |
| reduccion_z | n | {'transformacion': 'reduccion_z_a_xy', 'origen': 'dimensionalidad nativa del archivo (posible Z)', 'destino': 'LineString XY en el CRS nativo', 'en_memoria': True, 'n_geometrias_entrada': 596, 'n_con_z': 596, 'n_vertices': 34381, 'n_salida_xy': 596, 'unidad': 'n'} |
| ventana_analisis | m | {'minx': 433284.806, 'miny': 692285.656, 'maxx': 435284.806, 'maxy': 694285.656} |

## Supuestos y limitaciones

- supuesto: perfil COMPARE_LIMITED_EXTERNAL_V1: contraste post-assessment limitado
- supuesto: assessment_id 263de2c49ca9d392; schema hf.spatial-source-assessment.v1
- supuesto: ventana de análisis (cuadro D-03 ±1000 m en EPSG:32618): [433284.806, 692285.656, 435284.806, 694285.656]
- supuesto: preselección por el índice rtree nativo del GeoPackage en modo read-only (fuente no copiada)
- supuesto: reducción Z->XY y reproyección en memoria; archivos fuente y target intactos
- supuesto: métricas limitadas: máx PARTIALLY_COMPARABLE; sin TRUE_NETWORK/CORRECT_CHANNEL/ADOPTED_SEGMENT/TERRITORIALLY_COMPETENT/ADOPTED_CELL
- supuesto: los buffers 30/60/90/136 m son tolerancias de análisis, no verdades
- limitación: la comparación no demuestra competencia territorial
- limitación: licencia UNKNOWN: métricas restringidas a contraste y auditoría (fuente externa NO copiada)
- limitación: longitud y Hausdorff dependen de la precisión posicional de las fuentes (celdas de 30 m)
- limitación: la ventana del assessment no cubre el territorio completo de la fuente

## Divergencias y correspondencias

- divergencia: 4 features del target sin homólogo visible en la fuente
- correspondencia: correspondencia local observada: 58.565% del target dentro de 30 m de la fuente
- sin homólogo: sin homólogo: 4 features del target

## Interpretaciones

- permitida: PARTIALLY_COMPARABLE: solapamiento parcial y métricas restringidas por licencia UNKNOWN
- permitida: CORRESPONDENCE_OBSERVED: correspondencias locales observadas sin competencia territorial
- permitida: DIVERGENCE_OBSERVED: divergencias locales observadas sin competencia territorial
- prohibida: TRUE_NETWORK
- prohibida: CORRECT_CHANNEL
- prohibida: ADOPTED_SEGMENT
- prohibida: ADOPTED_CELL
- prohibida: TERRITORIALLY_COMPETENT
