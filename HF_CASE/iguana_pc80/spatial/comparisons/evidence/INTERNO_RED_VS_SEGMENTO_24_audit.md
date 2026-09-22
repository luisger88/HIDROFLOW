# Auditoría de comparación espacial — INTERNO_RED_VS_SEGMENTO_24

- motor: HF_SPATIAL_COMPARE_RUNNER v1.0.0
- perfil: COMPARE_SEGMENT_CORRESPONDENCE_V1
- clasificación: COMPUTATIONAL_INTERNAL_COMPARISON
- case: caso_iguana_pc80
- comparison_run_id: 20ac484efa14a2f6
- output_hash: e973a11214e4a6af03958e9485e741a4467a5708a00a3f8a9fa8bebcdf04a55d
- resultados: CANDIDATE_WITH_EVIDENCE (confianza MEDIA)
- state_change: False · professional_decision: None

## Fuentes

- Red hidrológica HF — GATE 2 E2 (D-03) [red_hf_gate02_d03] hash=ce398aef4d6e1d41 crs=EPSG:32618
- Segmento candidato D-03 (segmento 24) [segmento_candidato_d03] hash=5fcce071ce8ce642 crs=EPSG:32618

## Transformación

- EPSG:4326 -> EPSG:32618 (pyproj 3.7.2, always_xy=True)

## Gobernanza

- bloqueos_source: []
- bloqueos_target: []
- fuente_apta_para_metricas: True
- nota: fuentes B_COMPUTACIONAL internas; sin licencia UNKNOWN
- target_apta_para_metricas: True

## Métricas

| métrica | unidad | valor |
|---|---|---|
| cobertura_comun | m2/fraccion | {'iou_envolventes': 0.481, 'pct_cobertura_b_en_a': 100.0, 'pct_cobertura_a_en_b': 48.096} |
| continuidad_target | n | 270 |
| hausdorff | m | 8640.052 |
| hausdorff_dirigido_A_B | m | 4030.397 |
| hausdorff_dirigido_B_A | m | 8640.052 |
| longitud_coincidente | m | 493522.08 |
| longitud_fuente | m | 512456.772 |
| longitud_target | m | 582771.725 |
| n_divergentes | n | 23 |
| nodos_cercanos | % | 96.263 |
| orientacion_local_mediana | deg | 0.0 |
| orientacion_local_p90 | deg | 0.0 |
| pct_dentro_corredor | % | 96.305 |

## Supuestos y limitaciones

- supuesto: selección de target: {"tipo": "segmento_elegido", "segmento": 24, "ventana": "interseccion_con_envelope_de_la_fuente", "features_originales": 757, "features_seleccionadas": 270}
- supuesto: comparison_crs=EPSG:32618; transformación en memoria; archivos fuente intactos
- supuesto: clasificación COMPUTATIONAL_INTERNAL_COMPARISON: evidencia interna sin autoridad territorial
- supuesto: los buffers 30/60/90/136 m son tolerancias de análisis, no verdades
- limitación: la comparación interna no demuestra competencia territorial
- limitación: discrepancia registrada entre CRS operativo del inventario (EPSG:32618) y CRS declarado del archivo (EPSG:4326); transformación explícita
- limitación: longitud y Hausdorff dependen de la precisión posicional de las fuentes (celdas de 30 m)

## Divergencias y correspondencias

- divergencia: 23 features del target sin homólogo visible en la fuente
- divergencia: sensibilidad de corredores plana: el radio no altera el % dentro del corredor
- correspondencia: alta correspondencia local: 84.998% del target dentro de 30m de la fuente
- correspondencia: el segmento candidato presenta correspondencia fuerte con la red; permanece CANDIDATO_NO_DEMOSTRADO
- sin homólogo: sin homólogo: 23 features del target

## Interpretaciones

- permitida: CANDIDATE_WITH_EVIDENCE
- prohibida: TRUE_NETWORK
- prohibida: CORRECT_CHANNEL
- prohibida: ADOPTED_SEGMENT
- prohibida: ADOPTED_CELL
- prohibida: TERRITORIALLY_COMPETENT
