# Cierre de la OT-HF-SPATIAL-COMPARE-001 — Motor aislado de comparación espacial v1

- **OT:** OT-HF-SPATIAL-COMPARE-001 — Motor aislado de comparación espacial
- **Rama:** `ot-hf-spatial-compare-001-contraste-territorial`
- **HEAD base:** `a7aabe723f1bda2eeebe9bbe91ea8575c674e683`
- **Caso piloto:** `HF_CASE/iguana_pc80`
- **Fecha UTC:** 2026-09-21
- **Idioma del cierre:** es-CO

---

## 1. Veredicto

**PASS.** Motor aislado determinista entregado con contrato v1, seis perfiles,
dos pilotajes registrados, pruebas C1-C20 (+E1-E6) en verde y `state_hash`
invariante. Ningún resultado adoptó segmentos/celdas ni demostró competencia
territorial.

## 2. Entregables

| Entregable | Ubicación |
|---|---|
| Contrato `hf.spatial-comparison.result.v1@1.0` | `docs/contratos/gis/hf-spatial-comparison-result-v1.md` |
| Motor `HF_SPATIAL_COMPARE_RUNNER` v1.0.0 | `02_CORE/spatial_compare/` (models, result, profiles, registry, transforms, metrics, corridors, governance, evidence, deps, runner, cli) |
| Pruebas C1-C20 + E1-E6 | `02_CORE/spatial_compare/tests/run_spatial_compare_tests.py` |
| Inventario: fuente externa gobernada-excluida | `HF_CASE/iguana_pc80/spatial/spatial-data-registry.json` |
| Pilotajes, ledger, catálogo y evidencia | `HF_CASE/iguana_pc80/spatial/comparisons/` |
| Manifest 100% inventario (14 entradas nuevas) | `HF_CASE/iguana_pc80/manifest.json` |

Esquema definido: `hf.spatial-comparison.result.v1`. Resultados emitibles
(10) y prohibidos (5); clasificaciones `COMPUTATIONAL_INTERNAL_COMPARISON`,
`TERRITORIAL_CONTRAST_AUDIT`, `DIAGNOSTIC_COMPARISON`.

## 3. Pilotajes registrados en `comparison-ledger.jsonl`

| línea | pregunta | perfil | resultado | classification | run_id | output_hash |
|---|---|---|---|---|---|---|
| 1 | INTERNO_RED_VS_SEGMENTO_24 | COMPARE_SEGMENT_CORRESPONDENCE_V1 | CANDIDATE_WITH_EVIDENCE | COMPUTATIONAL_INTERNAL_COMPARISON | `20ac484efa14a2f6` | `e973a112…` |
| 2 | EXTERNO_STREAMS_URBAN_1000_AUDIT | COMPARE_VECTOR_NETWORKS_V1 | INSUFFICIENT_EVIDENCE | TERRITORIAL_CONTRAST_AUDIT | `3b432d589d2f5813` | `9c0ce9ba…` |

### Interno (red HF vs segmento 24, ventana envelope fuente)

Selección determinista: `tipo=segmento_elegido, segmento=24` → 270/755 features.
Métricas clave (EPSG:32618, en memoria):

- longitud fuente 512 456.772 m · longitud target 582 771.725 m
- % fuente dentro de corredor 30 m: 96.305 % · target dentro: 84.998 %
- Hausdorff máximo 8640.052 m (dirigido B→A) · vértices soportados 96.263 %
- features del target sin homólogo a ≤30 m: 23 · corredor IoU 0.822 (30 m)

El resultado permanece `CANDIDATE_WITH_EVIDENCE` (interpretación permitida),
jamás adopción.

### Territorial (streams_urban_1000_medellin)

Fuente registrada `SIN_GOBERNANZA`: licencia UNKNOWN, autoridad no declarada,
CRS ausente (SRID 100000 params EPSG:9377 organization NONE), estado bloqueante.
Resultado `INSUFFICIENT_EVIDENCE`, confianza BAJA, 0 métricas; la auditoría de
gobernanza se persiste en `evidence/*_audit.md`.

## 4. Integridad del caso

Triple hash base (sección previa a la OT):

- state `5f9bf470…e8853d` · package `a122fb19…0aa04db` · evidence `86373bef…d8045d`

Post-pilotos comprobado por `C20_integridad`:

- state `5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d` **(invariante)**
- package `9aff727c5c8a0b1a7def97c521e43d775219cad432d973224ee62352b07160ca` (cambió)
- evidence `6c50479a9ed475f3f4e1a3a1821911ba20ddc4c740ffb6d2c23c720a0852bff7` (cambió;
  `spatial/comparisons/**` cubierto por `evidence_hash`)

Manifest pasó de 36 a 50 activos (14 de `spatial/comparisons/**`) para cumplir
el inventario 100% de `validar_manifest`; hashes reconciliados por el generador
de integridad. `checksums.sha256` regenerado.

## 5. Resultados de validación

- **C1-C20 + E1-E6: PASS (26/26)**. Incluye C5 determinismo (mismo run_id en
  re-ejecución), C9 fuentes no modificadas, C14 rechazo de run_id duplicado,
  C19 ausencia de rutas absolutas y C20 invariante de estado.
- **C18 re-ejecuta baselines: PASS** — Q1-Q16, P1-P5 y S1-S12/I1-I8 sin regresión.

## 6. Notas de arquitectura

- `comparison_run_id = sha256(material estable)[:16]`; `output_hash =
  sha256(material + run_id)`; timestamp excluido del material (sin ciclos).
- `crs_epsg_gobernado` valida el código contra pyproj: un EPSG inexistente o un
  SRID sin organización formal no pasa el gate.
- Hausdorff dirigido se aproxima con muestreo determinista de vértices (tope
  200 000; todos los vértices en datos del caso).
- Evidencia con slug por pregunta (`runs/<pregunta>.json`); el ledger rechaza
  `comparison_run_id` duplicado.
- El gate institucional "No ejecutar comparaciones espaciales"
  (`docs/contratos/gis/README.md`) queda **levantado por esta OT** para el
  motor aislado `02_CORE/spatial_compare`; el README institucional no se
  modifica (sección 23 del firewall).

## 7. Compromisos

1. `docs(spatial-compare): define contrato y fuentes gobernadas`
2. `feat(spatial-compare): implementa perfiles, CRS y métricas V1`
3. `feat(spatial-compare): agrega runner, ledger y pilotos`
4. `test(spatial-compare): valida C1-C20 e integridad`
5. `docs(spatial-compare): cierra OT-HF-SPATIAL-COMPARE-001`

Sin push ni PR. Decisión profesional queda para GATE 3 / PF-02 (fuera del motor).