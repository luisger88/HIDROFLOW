# Contrato de Evaluación de Fuente Espacial HidroFlow — hf.spatial-source-assessment.v1

- **Esquema:** `hf.spatial-source-assessment.v1` (schema_version 1.0)
- **Contrato emitido:** `contract_hf.spatial-source-assessment.v1`
- **OT:** OT-HF-SPATIAL-SOURCE-001 — Gobernanza y evaluación de fuente externa
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Fecha UTC:** 2026-09-21

Este contrato describe la **evaluación de aptitud de una fuente espacial
externa** emitida por el motor aislado `02_CORE/spatial_source`
(HF_SPATIAL_SOURCE). La evaluación **gobierna** una fuente referenciada
(`referenciado_pesado`, no copiada) antes de que pueda usarse como insumo de
contraste territorial. No adopta, no redime autoridad territorial y nunca
fabrica información ausente (licencia, autoridad o significado).

---

## 1. Misión

Determinar, de forma determinista y auditable, si y con qué restricciones una
fuente espacial externa puede participar en contraste territorial, emitiendo:

1. **Identificación y metadatos** técnicos y de proveniencia de la fuente.
2. **Firmas físicas** (`sha256`, tamaño, `capa_h1` de contenido) verificables.
3. **CRS formalizado externamente** (parámetros coincidentes con un código
   EPSG verificable vía pyproj), con roundtrip D-03.
4. **Cobertura** de la fuente sobre la ventana D-03 (radio 1 000 m).
5. **QA por perfiles** (referencia espacial, geometría vectorial, red interna).
6. **Aptitud** (máquina de escalones) y **resolución** (resultado máximo
   emitible), con restricciones explícitas.

Una evaluación **nunca** emite criterio territorial: su límite es
`PARTIALLY_COMPARABLE`.

## 2. Schema id

- `schema`: `hf.spatial-source-assessment.v1`
- `schema_version`: `1.0`
- `contract`: `contract_hf.spatial-source-assessment.v1`
- `motor`: `HF_SPATIAL_SOURCE`
- `version`: versión del paquete `02_CORE/spatial_source`
- `ot`: `OT-HF-SPATIAL-SOURCE-001`
- `assessment_type`: `SOURCE_EXTERNAL_ASSESSMENT`

## 3. Campos gobernados del documento

| Campo | Descripción | Regla |
|---|---|---|
| `assessment_id` | `SHORT(sha256(material_stable))` 16 hex | igual para entradas idénticas |
| `output_hash` | SHA-256 del documento canónico firmado | determinista (sin fecha) |
| `state_change` | booleano | **siempre false** |
| `professional_decision` | decisión profesional | **siempre null** |
| `identificacion` | `source_id`, `source_path_reference`, formato, escala, productor | obligatorio |
| `hashes` | `sha256`, `tamano_bytes`, `capa_h1`, nº features, tipo, dimensiones z/m | obligatorio |
| `metadata_tecnica` | `geometry_type_name`, `dimensiones` z/m | obligatorio |
| `crs` | `crs_declarado`, `resultado`, `pyproj_autoridad`, `datum`, `axis_order`, `roundtrip` | formalización externa |
| `cobertura` | `extension_nativa`, `ventana_utm_32618`, `pct_extension_sobre_ventana`, `pct_lineas_ventana_buffer1m`, `iou_extension` | obligatorio |
| `proveniencia` | `procedencia` textual | no fabricada |
| `licenciamiento` | `license_status` = `LICENSE_UNKNOWN` | hecho, no inventado |
| `qa` | 3 perfiles con `checks`, `resumen`, `quorum` | obligatorio |
| `restricciones` | lista textual de restricciones | obligatorio |
| `aptitud` | escalones, `resultado`, `apto_para_comparacion` | solo vocabulario del apéndice A |
| `resolucion` | `resultado_emitible_max`, `interpretaciones_permitidas`, clasificación | solo vocabulario del apéndice B |
| `motores` | versiones python/fiona/shapely/pyproj/geopandas/numpy | registro |

## 4. Reglas obligatorias

1. **Licencia y autoridad no se inventan.** Una fuente sin licencia declarada
   queda `LICENSE_UNKNOWN`; sin autoridad declarada queda sin competencia.
   Prohibido afirmar autoridad, licencia o significado hidrológico ausentes.
2. **Nunca se copia ni altera la fuente.** Se referencia
   (`activos_referenciados_pesados`), se verifica por SHA-256 y se guarda
   `capa_h1` para detectar drift de contenido. Prohibido escribir en el archivo
   fuente.
3. **Máquina de aptitud monótona.** Escalones `READABLE -> GEOMETRIES_VALID ->
   CRS_VERIFIED -> COVERAGE_VERIFIED -> COVERAGE_PARTIAL -> PROVENANCE_PARTIAL
   -> LICENSE_UNKNOWN`; si un escalón falla o el quorum QA decae, el resultado
   es `NOT_APT_FOR_COMPARISON`.
4. **QA por perfil.** `QA_SPATIAL_REFERENCE_V1`, `QA_VECTOR_GEOMETRY_V1`,
   `QA_NETWORK_INTERNAL_V1`. `autointersecciones_ausentes` FAIL se recalifica a
   CONDICIONAL/WARNING (limitación declarada del contraste territorial), sin
   bloquear consumidores.
5. **Resultado máximo emitible.** `PARTIALLY_COMPARABLE`. Prohibido
   `TRUE_NETWORK`, `CORRECT_CHANNEL`, `ADOPTED_SEGMENT`,
   `TERRITORIALLY_COMPETENT`, `ADOPTED_CELL`.
6. **Determinismo.** JSON canónico (`sort_keys`, `ensure_ascii=False`,
   separadores compactos, UTF-8, salto final); `assessment_id` y `output_hash`
   excluyen `fecha_utc`, `assessment_id`, `evidencia` y `firmas` del material
   estable; entradas idénticas ⇒ firmas idénticas.
7. **Persistence gobernada.** El documento firmado se persiste en
   `spatial/sources/assessments/streams_urban_1000_medellin_assessed.json`, el
   ledger `spatial/sources/assessments/spatial-source-assessment-ledger.jsonl`
   es append-only e idempotente por `assessment_id`, y la entrada del registro
   es `streams_urban_1000_medellin_assessed` (nueva; el histórico
   `streams_urban_1000_medellin` SIN_GOBERNANZA no se edita).
8. **Run post-assessment.** Se materializa un run
   `EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT` (contrato
   `hf.spatial-comparison.result.v1`) con `result=INSUFFICIENT_EVIDENCE`,
   `confidence=BAJA`, `classification=TERRITORIAL_CONTRAST_AUDIT`.
9. **Sin rutas absolutas.** Todos los artefactos escritos usan rutas relativas
   internas (regla S11/C19).
10. **Caso D-03.** La ventana de contraste (`D03_VENTANA_RADIO_M = 1000`) se
    re-proyecta a UTM 32618 con `always_xy` y se compara contra la extensión de
    la fuente (pct de extensión y pct de línea efectiva).

## 5. Vocabulario del resultado (apéndice A)

| Escalón | Veredicto |
|---|---|
| `READABLE` | capa con ≥ 1 feature |
| `GEOMETRIES_VALID` | sin geometrías nulas ni vacías |
| `CRS_VERIFIED` | `CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION` |
| `COVERAGE_VERIFIED` | no `COBERTURA_INSUFICIENTE_DE_VENTANA` |
| `COVERAGE_PARTIAL` | cobertura parcial/completa de ventana |
| `PROVENANCE_PARTIAL` | procedencia declarada |
| `LICENSE_UNKNOWN` | licencia no inventada |

- `APTITUD_READABLE`: `READMEABLE` → `CRS_VERIFIED` → `COVERAGE_VERIFIED` →
  `COVERAGE_PARTIAL` → `PROVENANCE_PARTIAL` → `LICENSE_UNKNOWN`
- Resultado final: `NOT_APT_FOR_COMPARISON` o `CONDITIONALLY_APT_FOR_COMPARISON`.

## 6. Vocabulario de resolución (apéndice B)

- `resultado_emitible_max`: `PARTIALLY_COMPARABLE`
- `interpretaciones_permitidas`: `PARTIALLY_COMPARABLE` (solapamiento parcial;
  métricas restringidas por licencia UNKNOWN)
- `clasificacion`: `TERRITORIAL_CONTRAST_AUDIT`
- Prohibidas: `TRUE_NETWORK`, `CORRECT_CHANNEL`, `ADOPTED_SEGMENT`,
  `TERRITORIALLY_COMPETENT`, `ADOPTED_CELL`.

## 7. Fuentes y pruebas

- Motor: `02_CORE/spatial_source/` (`geopackage.py`, `crs.py`, `coverage.py`,
  `metadata.py`, `provenance.py`, `licensing.py`, `qa.py`, `result.py`,
  `models.py`, `assessment.py`, `evidence.py`, `registry.py`, `runner.py`,
  `cli.py`).
- Pruebas: `02_CORE/spatial_source/tests/run_spatial_source_tests.py`
  (R1-R20 + A1-A12, todas PASS).
- Regresiones: `Q1-Q16` (geo_qa), `P1-P5` (portability), `C1-C20` +
  E1-E6 (spatial_compare), `S1-S12` + I1-I8 (sig_engineering) — PASS.