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
```

C1-C20 + E1-E6; C18 re-ejecuta Q1-Q16, P1-P5 y S1-S12/I1-I8.