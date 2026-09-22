# spatial_compare — HF-SPATIAL-COMPARE V1

Motor aislado determinista de comparación espacial (OT-HF-SPATIAL-COMPARE-001).
Contrato normativo: `docs/contratos/gis/hf-spatial-comparison-result-v1.md`
(`hf.spatial-comparison.result.v1@1.0`).

## Principios

- **Sin autoridad**: todo resultado lleva `state_change=false` y
  `professional_decision=null`. Nunca emite `TRUE_NETWORK`, `CORRECT_CHANNEL`,
  `ADOPTED_SEGMENT`, `ADOPTED_CELL` ni `TERRITORIALLY_COMPETENT`, y bloquea a
  los consumidores adoptivos/decisionales (`PF02_ADOPTION`, `GATE_3`,
  `CANONICAL_WATERSHED`, `DECISION_PROFESIONAL`, `EXPEDIENTE`,
  `TERRITORIAL_COMPETENCE`).
- **Determinista**: JSON canónico, `comparison_run_id = sha256(material)[:16]`,
  `output_hash = sha256(material + run_id)`; el timestamp se excluye del
  material. Sin rutas absolutas en la salida.
- **No intrusivo**: ninguna fuente se modifica; las transformaciones son
  estrictamente en memoria (`EPSG:32618`, pyproj `always_xy=True`).
- **Gobernanza de fuentes**: los activos se leen del inventario del caso
  (`spatial/spatial-data-registry.json`); clase visual/evidencia, licencia
  `UNKNOWN`, autoridad ausente, estado bloqueante o CRS no gobernado producen
  auditoría sin métricas (`INSUFFICIENT_EVIDENCE` / `REFERENCE_UNAVAILABLE`).

## Perfiles

| id | tipo | resultado máximo |
|---|---|---|
| COMPARE_VECTOR_NETWORKS_V1 | network_network | — |
| COMPARE_POINT_TO_NETWORKS_V1 | point_network | — |
| COMPARE_SEGMENT_CORRESPONDENCE_V1 | segment_correspondence | CANDIDATE_WITH_EVIDENCE |
| COMPARE_NETWORK_TO_TERRAIN_V1 | terrain | INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE |
| REGISTER_VISUAL_REFERENCE_V1 | visual_reference | — (solo INSUFFICIENT_EVIDENCE / REFERENCE_UNAVAILABLE) |
| COMPARE_D03_CANDIDATES_V1 | candidates | — |

Reglas de cobertura C1 validadas por `registry.validar_registry`.

## Contraste limitado post-assessment (OT-HF-SPATIAL-COMPARE-002)

`COMPARE_LIMITED_EXTERNAL_V1` es un perfil **fuera del catálogo V1** (no se
declara en el registry; vive en `spatial/comparisons/profiles/`) que permite el
contraste territorial de una fuente externa **únicamente después** de un
assessment válido (`hf.spatial-source-assessment.v1`) y solo hasta
`PARTIALLY_COMPARABLE`. Nunca emite resultados adoptivos y bloquea además
`CARTOGRAPHIC_REPORT` y `HYDRO_CONSUMPTION`.

Puerta: `governance.cumplimiento_metricas_limitadas(entrada, assessment)`
exige como mínimo: `estado=CONDITIONALLY_APT_FOR_COMPARISON`,
`aptitud.apto_para_comparacion=true`, `apto_para_metricas_plenas=false`,
quorum QA sin FAIL, escalón CRS formalizado `PASS`, `crs=EPSG:9377`
(`always_xy`), cobertura de ventana positiva y restricciones no vacías.

Lectura de la fuente (GeoPackage, read-only, sin copias):

- Conexión `sqlite3` en modo `ro` + `PRAGMA query_only=ON`.
- Preselección por el **índice rtree nativo del archivo**
  (`rtree_<capa>_<col>`) vía SQL puro (fiona/GDAL ignora el filtro `bbox`
  cuando el srs_id interno no es map-compatible).
- Lectura con `pyogrio.read_dataframe(sql="SELECT fid, geom … ORDER BY fid")`.
- Reducción `reducir_xyz_xy` (Z→XY), `bounds_en_crs` y `transformar_lineas`
  EPSG:9377→EPSG:32618, todo en memoria.

Punto de entrada:

```powershell
$env:PYTHONPATH = "02_CORE"
python -m spatial_compare.cli run-limited HF_CASE/iguana_pc80
```

Persiste `runs/`, `evidence/`, el perfil limitado y el ledger (línea nueva),
inventariando en `manifest.json` los cuatro artefactos con fuente
`OT-HF-SPATIAL-COMPARE-002` y regenerando la integridad con `state_hash`
invariante.

Regla de resultado (en `limited._clasificar_limitado`): pct del target dentro
del corredor de 30 m respecto a la fuente ≥ 40 → `PARTIALLY_COMPARABLE`;
20–40 → `CORRESPONDENCE_OBSERVED`; 0–20 → `DIVERGENCE_OBSERVED` (salvo sin
segmentos sin homólogo); 0 → `NOT_COMPARABLE`; sin fuentes → 
`INSUFFICIENT_EVIDENCE`.

## Uso

```powershell
$env:PYTHONPATH = "02_CORE"
python -m spatial_compare.cli profiles
python -m spatial_compare.cli run COMPARE_POINT_TO_NETWORKS_V1 HF_CASE/iguana_pc80 DIAG_PROJECT_LOCATION_VS_RED project-location red_hf_gate02_d03
python -m spatial_compare.cli pilot-interno HF_CASE/iguana_pc80
python -m spatial_compare.cli pilot-territorial HF_CASE/iguana_pc80
```

`registar_piloto` persiste `runs/`, `evidence/`, el ledger y regenera la
integridad del caso verificando que `state_hash` queda invariante.

## Persistencia en el caso portable

`HF_CASE/<caso>/spatial/comparisons/`: `comparison-ledger.jsonl`, `runs/`,
`evidence/`, `profiles/`. Los archivos de esa carpeta están cubiertos por
`evidence_hash` y deben quedar inventariados en `manifest.json`
(100% inventario del caso). Tras cada run: regenerar integridad.

## Pruebas

```powershell
$env:PYTHONPATH = "02_CORE"
python -X utf8 02_CORE/spatial_compare/tests/run_spatial_compare_tests.py
python -X utf8 02_CORE/spatial_compare/tests/run_spatial_compare_limited_tests.py
```

C1-C20 + E1-E6; C18 re-ejecuta Q1-Q16, P1-P5 y S1-S12/I1-I8.
T1-T20 + B1-B12 cubren la vía limitada post-assessment (T15 re-ejecuta el run
completo y verifica determinismo; `HF_SKIP_T15=1` omite esa re-ejecución).