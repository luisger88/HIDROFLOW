# spatial_source — HF-SPATIAL-SOURCE V1

Motor aislado determinista de evaluación de fuentes espaciales externas
(OT-HF-SPATIAL-SOURCE-001). Contrato normativo:
`docs/contratos/gis/hf-spatial-source-assessment-v1.md`
(`hf.spatial-source-assessment.v1@1.0`).

## Principios

- **No intrusivo**: la fuente externa **nunca se copia ni se modifica**. Se
  referencia (`activos_referenciados_pesados`), se verifica por SHA-256 y se
  guarda `capa_h1` (hash de contenido con blob geométrico) para detectar drift.
- **No inventa**: licencia y autoridad ausentes quedan `LICENSE_UNKNOWN` /
  `autoridad no declarada`; prohibido afirmar significado hidrológico ausente.
- **Sin autoridad**: `state_change=false`, `professional_decision=null`;
  `resultado_emitible_max = PARTIALLY_COMPARABLE`; prohibidos
  `TRUE_NETWORK`, `CORRECT_CHANNEL`, `ADOPTED_SEGMENT`,
  `TERRITORIALLY_COMPETENT`, `ADOPTED_CELL`.
- **Determinista**: JSON canónico (`sort_keys`, `ensure_ascii=False`,
  separadores compactos); `assessment_id = sha256(material_stable)[:16]`,
  `output_hash = sha256(material + assessment_id)`; se excluyen `fecha_utc`,
  `assessment_id`, `evidencia` y `firmas` del material estable. Sin rutas
  absolutas en la salida (S11/C19).
- **Monotónica**: máquina `READABLE -> GEOMETRIES_VALID -> CRS_VERIFIED ->
  COVERAGE_VERIFIED -> COVERAGE_PARTIAL -> PROVENANCE_PARTIAL ->
  LICENSE_UNKNOWN`; cualquier FAIL ⇒ `NOT_APT_FOR_COMPARISON`.

## Máquina de aptitud

| Escalón | Regla |
|---|---|
| READABLE | capa con ≥ 1 feature |
| GEOMETRIES_VALID | sin geometrías nulas ni vacías |
| CRS_VERIFIED | `CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION` (pyproj vs EPSG oficial) |
| COVERAGE_VERIFIED | no `COBERTURA_INSUFICIENTE_DE_VENTANA` |
| COVERAGE_PARTIAL | cobertura parcial/completa de la ventana D-03 (radio 1 000 m) |
| PROVENANCE_PARTIAL | procedencia declarada |
| LICENSE_UNKNOWN | licencia no inventada |

Resultado: `NOT_APT_FOR_COMPARISON` o `CONDITIONALLY_APT_FOR_COMPARISON`
(vínculo al run post-assessment `EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT`,
`INSUFFICIENT_EVIDENCE`, `BAJA`, `TERRITORIAL_CONTRAST_AUDIT`).

## QA por perfiles

`QA_SPATIAL_REFERENCE_V1`, `QA_VECTOR_GEOMETRY_V1`, `QA_NETWORK_INTERNAL_V1`
(checks de `02_CORE/geo_qa`). Adaptación: `autointersecciones_ausentes` FAIL se
recalifica a CONDICIONAL/WARNING (limitación declarada del contraste territorial,
no bloquea consumidores); `tipos_permitidos = {MultiLineString, LineString}`.

## Uso

```powershell
$env:PYTHONPATH = "02_CORE"
python -m spatial_source.cli evaluar   --fuente 01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg --root HF_CASE/iguana_pc80 --json
python -m spatial_source.cli registrar --fuente 01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg --root HF_CASE/iguana_pc80 --json
```

`registrar` evalúa, persiste el documento + ledger, sincroniza el registro
(entrada `streams_urban_1000_medellin_assessed`), emite el run post-assessment y
regenera la integridad serialmente (manifest → checksums → integrity).

## Persistencia en el caso portable

`HF_CASE/<caso>/spatial/sources/assessments/`
(`streams_urban_1000_medellin_assessed.json` + ledger append-only idempotente),
`spatial/comparisons/` (run/fuentes/auditoría del post-assessment) y el
inventario `spatial/spatial-data-registry.json`. Todo queda inventariado en
`manifest.json` y cubierto por `evidence_hash`. Tras emitir: regenerar
integridad.

## Pruebas

```powershell
python 02_CORE/spatial_source/tests/run_spatial_source_tests.py
```

R1-R20 + A1-A12 (contrato, lector, hashes, CRS, cobertura, QA, máquina,
persistencia, registro, integridad, run post-assessment, S11/C19, variantes
adversas). Regresión: Q1-Q16, P1-P5, C1-C20+E1-E6, S1-S12+I1-I8.