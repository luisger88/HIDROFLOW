# spatial/comparisons — Evidencia de comparación espacial (HF-SPATIAL-COMPARE V1)

Directorio gobernado por `hf.spatial-comparison.result.v1@1.0` y la
OT-HF-SPATIAL-COMPARE-001. Regenerable íntegramente por el motor
`02_CORE/spatial_compare` (runner/cli) sin tocar estado ni decisiones.

## Contenido

- `comparison-ledger.jsonl` — registro serial de cada run (único por
  `comparison_run_id`, appends con hash de resultado).
- `runs/` — resultado canónico completo por pregunta (`.json`).
- `evidence/` — refs de fuentes y transformación (`*_sources.json`) y auditoría
  legible (`*_audit.md`).
- `profiles/` — catálogo declarativo de los seis perfiles V1.

## Garantías

- `state_change=false` y `professional_decision=null` en todo resultado.
- Ningún resultado adopta segmentos/celdas ni demuestra competencia territorial.
- La comparación es determinista (JSON canónico; `comparison_run_id` =
  SHA-256 del material estable) y no modifica ninguna fuente espacial
  (transformaciones solo en memoria, EPSG:32618).
- `evidence/` y `runs/` están cubiertos por `evidence_hash` del caso portable
  (véase `integrity.json`); regenerar tras cada escritura con
  `spatial_compare.runner.regenerar_integridad`.

## Pilotajes registrados

| ledger | pregunta | perfil | resultado | clasificación |
|---|---|---|---|---|
| 1 | `INTERNO_RED_VS_SEGMENTO_24` | COMPARE_SEGMENT_CORRESPONDENCE_V1 | CANDIDATE_WITH_EVIDENCE | COMPUTATIONAL_INTERNAL_COMPARISON |
| 2 | `EXTERNO_STREAMS_URBAN_1000_AUDIT` | COMPARE_VECTOR_NETWORKS_V1 | INSUFFICIENT_EVIDENCE | TERRITORIAL_CONTRAST_AUDIT |

La fuente externa `streams_urban_1000_medellin` está registrada como
SIN_GOBERNANZA en `spatial-data-registry.json`; no produce métricas.