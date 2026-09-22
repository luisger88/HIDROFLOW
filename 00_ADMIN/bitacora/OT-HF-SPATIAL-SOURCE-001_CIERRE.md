# Cierre de la OT-HF-SPATIAL-SOURCE-001 — Evaluación de fuente espacial externa v1

- **OT:** OT-HF-SPATIAL-SOURCE-001 — Evaluación y gobernanza de fuente espacial externa
- **Rama:** `ot-hf-spatial-source-001-evaluacion-fuente`
- **HEAD base:** `61802df5e8c1e1b1bb427b961eb47e89dbe4e3b5` (cierre OT-HF-SPATIAL-COMPARE-001)
- **Caso piloto:** `HF_CASE/iguana_pc80`
- **Fecha UTC:** 2026-09-21
- **Idioma del cierre:** es-CO

---

## 1. Veredicto

**PASS.** Motor aislado determinista de evaluación de fuentes espaciales
externas entregado con contrato `hf.spatial-source-assessment.v1`, máquina de
aptitud (7 escalones), evaluación gobernada de `streams_urban_1000_medellin`
(aptitud `CONDITIONALLY_APT_FOR_COMPARISON`), run post-assessment emitido,
pruebas R1-R20 + A1-A12 en verde (32/32), regresiones C/Q/P/S en verde y
`state_hash` invariante. Ningún resultado otorgó competencia ni adoptó
segmentos/celdas; la entrada histórica `streams_urban_1000_medellin`
(SIN_GOBERNANZA) no se modificó.

## 2. Entregables

| Entregable | Ubicación |
|---|---|
| Contrato `hf.spatial-source-assessment.v1@1.0` | `docs/contratos/gis/hf-spatial-source-assessment-v1.md` |
| Motor `HF_SPATIAL_SOURCE_RUNNER` v1.0.0 | `02_CORE/spatial_source/` (models, geopackage, crs, coverage, metadata, provenance, licensing, qa, registry, assessment, result, evidence, deps, runner, cli) |
| Pruebas R1-R20 + A1-A12 | `02_CORE/spatial_source/tests/run_spatial_source_tests.py` |
| Entrada `streams_urban_1000_medellin_assessed` | `HF_CASE/iguana_pc80/spatial/spatial-data-registry.json` |
| Assessment firmado + ledger | `HF_CASE/iguana_pc80/spatial/sources/assessments/` |
| Run post-assessment y evidencia | `HF_CASE/iguana_pc80/spatial/comparisons/{runs,evidence}/EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT_*` |
| Manifest 100% inventario (5 entradas nuevas) | `HF_CASE/iguana_pc80/manifest.json` |

## 3. Resultado del assessment (`streams_urban_1000_medellin_assessed`)

- `assessment_id` `263de2c49ca9d392` · `output_hash` `6d3ff5c1…641`
- Aptitud: `CONDITIONALLY_APT_FOR_COMPARISON` (`apto_para_comparacion: true`)
- CRS: `EPSG:9377` → `CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION`
- Cobertura: `COBERTURA_PARCIAL_DE_VENTANA` (fs. `pct_*` del D-03)
- Licencia: `LICENSE_UNKNOWN` (prohibido inventar) · Procedencia: `PROVENANCE_PARTIAL`
- QA: perfiles PASS (`QA_SPATIAL_REFERENCE_V1`, `QA_VECTOR_GEOMETRY_V1`,
  `QA_NETWORK_INTERNAL_V1`), quorum `{PASS:24, CONDICIONAL:6, FAIL:0,
  FAIL_ORIENTATION:0}`, `ok:true`
- `state_change=false` · `professional_decision=null`
- `resolucion.resultado_emitible_max = PARTIALLY_COMPARABLE`;
  prohibidos `TRUE_NETWORK`, `CORRECT_CHANNEL`, `ADOPTED_SEGMENT`,
  `TERRITORIALLY_COMPETENT`, `ADOPTED_CELL`.

Extensión verificada: `sha256` de 189 460 480 B, `capa_h1` por contenido
geométrico (`06b0f55a…602e`, blob), `n_features=148088` en capa
`Channel Network`, geometry `MULTILINESTRING` (fids de fiona como strings).

## 4. Run post-assessment

`EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT` (contrato
`hf.spatial-comparison.result.v1`): `result=INSUFFICIENT_EVIDENCE`,
`confidence=BAJA`, `classification=TERRITORIAL_CONTRAST_AUDIT`, `run_id
278e9713f3816073`, `state_change=false`. Persistido en `runs/` + `evidence/`
(`*_sources.json`, `*_audit.md`) y registrado en `comparison-ledger.jsonl`
sin duplicados (idempotencia por `comparison_run_id`).

## 5. Integridad del caso

Triple hash base (heredado de OT-HF-SPATIAL-COMPARE-001):

- state `5f9bf470…e8853d` · package `9aff727c…60ca` · evidence `6c50479a…7ff`

Post-assessment verificado por `validar_integridad` y P1-P5:

- state `5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d` **(invariante)**
- package `a61062c0a1caa8ae9e97260c423f8def7226616932740cee70d3a2dab3415d48` (cambió)
- evidence `74fe2500fb87071a8ea201bed89d0bdd768cc8ca9efee117bfda4f373e91aa2b` (cambió;
  cubre `spatial/comparisons/**`)

Manifest pasó a 55 activos (5 de la OT: assessment, ledger, run,
sources/audit) para cumplir inventario 100% de `validar_manifest`;
`checksums.sha256` regenerado. `validar_integridad` (portability) = OK;
P1-P5 = PASS estrictos, sin excepciones.

## 6. Resultados de validación

- **R1-R20 + A1-A12: PASS (32/32)**, incluye A4/A5 adversos (capa vacía,
  geometrías nulas, CRS_UNDECLARED), A8 firmas deterministas, A11 ledger único
  e idempotente, invariantes C19/S11 (cero rutas absolutas).
- **C18 re-ejecuta baselines: PASS** — Q1-Q16, P1-P5, C1-C20 + E1-E6 y
  S1-S12/I1-I8 sin regresión tras los parches de robustez.

## 7. Notas de arquitectura

- `_archivos_evidencia` de portability sigue cubriendo `spatial/comparisons/**`;
  los artefactos de `spatial/sources/assessments/` quedan gobernados por
  `package_hash` vía inventario 100% en manifest (no se modifica resolver.py).
- Robustez añadida: CRS_UNDECLARED tolerado en assessment/registry/evidence;
  `cobertura_ventana` devuelve `COBERTURA_INSUFICIENTE_DE_VENTANA` con CRS
  ilegible o capa sin datos; `_build_fc` omite geometrías None (gobiernan
  `n_geom_nulas` + escalón GEOMETRIES_VALIDAS).
- La autointersección detectada se recalifica CONDICIONAL/WARNING (limitación
  declarada del contraste territorial, sin bloquear consumidores).
- El gate institucional "No ejecutar comparaciones espaciales" fue levantado
  para `spatial_compare` en la OT previa; esta OT **no** ejecuta comparaciones
  nuevas más allá del run de auditoría post-assessment ya legítimo.

## 8. Compromisos

1. `docs(spatial-source): define contrato de evaluación de fuente v1`
2. `feat(spatial-source): implementa lectura, CRS, cobertura y QA V1`
3. `feat(spatial-source): agrega assessment, registro y post-assessment`
4. `test(spatial-source): valida R1-R20 y A1-A12 e integridad`
5. `docs(spatial-source): cierra OT-HF-SPATIAL-SOURCE-001`

Sin push ni PR. La fuente externa permanece NO copiada (referenciada por hash) y
sin competencia territorial; decisión profesional queda para GATE 3 / PF-02.