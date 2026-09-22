# Contrato de Resultado de Comparación Espacial HidroFlow — hf.spatial-comparison.result.v1

- **Esquema:** `hf.spatial-comparison.result.v1` (schema_version 1.0)
- **OT:** OT-HF-SPATIAL-COMPARE-001 — Contraste territorial aislado determinista
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-spatial-compare-001-contraste-territorial`
- **Fecha UTC:** 2026-09-21

Este contrato describe el **resultado** de una comparación espacial HidroFlow
ejecutada por el motor aislado `02_CORE/spatial_compare` (HF_SPATIAL_COMPARE).
No modifica ni redefine `hf.comparison.v1`; lo materializa como registro
gobernado y **sin autoridad decisional**: una comparación espacial nunca puede
demostrar competencia territorial, adoptar segmentos ni celdas, ni abrir GATE 3.

---

## 1. Misión

Gobernar la declaración, el cálculo y la persistencia de toda comparación
espacial en HidroFlow: qué se compara, contra qué, bajo qué referencia espacial,
con qué métricas y tolerancias, con qué QA previo, y qué **no** puede concluir.
Garantiza que todo resultado sea determinista, auditable y reproducible, y que
ninguna comparación sustituya una decisión profesional.

## 2. Schema id

- `schema`: `hf.spatial-comparison.result.v1`
- `schema_version`: `1.0`
- `motor`: `HF_SPATIAL_COMPARE_RUNNER`
- `version`: versión del paquete `02_CORE/spatial_compare`

## 3. Campos gobernados del resultado

| Campo | Descripción | Regla |
|---|---|---|
| `comparison_run_id` | `SHORT(sha256(material_stable))` 16 hex | igual para entradas idénticas |
| `question_id` | pregunta/comparación analizada | obligatorio, único por run |
| `comparison_profile` | id canónico del perfil | solo perfiles del catálogo |
| `classification` | `COMPUTATIONAL_INTERNAL_COMPARISON`, `TERRITORIAL_CONTRAST_AUDIT`, `DIAGNOSTIC_COMPARISON` | obligatorio |
| `source` / `target` | activo gobernado: `asset_id`, clase, ruta relativa, `hash_sha256`, CRS | registro obligatorio |
| `comparison_crs` | CRS de comparación (ej. `EPSG:32618`) | UTM métrico |
| `transformation_record` | motor, versión, `always_xy`, origen/destino, datum, método | obligatorio |
| `qa_prereq` | QA previo y estado gobernado de las fuentes | obligatorio |
| `overlap_extent` | cobertura común de las fuentes | obligatorio |
| `tolerances` | PF-01/PF-02/PF-03 y radios de corredor | obligatorio |
| `metrics` | métricas puras con `unidad`, `valor`, `limitaciones` | solo fuentes gobernadas |
| `corridors` | análisis multibuffer 30/60/90/136 m | radios fijos |
| `assumptions` / `limitations` | supuestos y limitaciones | obligatorio |
| `divergences` / `correspondences` / `unmatched_segments` | divergencias y correspondencias observadas | obligatorio |
| `evidence_refs` | rutas relativas de evidencia | no vacía |
| `result` | veredicto (apéndice A) | nunca prohibido (apéndice B) |
| `confidence` | `ALTA` / `MEDIA` / `BAJA` | declarada |
| `state_change` | booleano | **siempre false** |
| `professional_decision` | decisión profesional | **siempre null** |
| `input_hashes` / `output_hash` | firmas de entrada/salida | deterministas |

## 4. Reglas obligatorias

1. **Ninguna comparación espacial demuestra competencia territorial.** Queda
   prohibido emitir `TERRITORIALLY_COMPETENT`, `TRUE_NETWORK`,
   `CORRECT_CHANNEL`, `ADOPTED_SEGMENT` o `ADOPTED_CELL`.
2. **El segmento 24 no se adopta.** Su resultado máximo posible es
   `CANDIDATE_WITH_EVIDENCE`; `professional_decision=null`, `state_change=false`.
3. **Solo se comparan fuentes gobernadas.** Fuente sin registro, con CRS
   ausente/desconocido, licencia `UNKNOWN`, autoridad no declarada, clase visual
   (`C_REFERENCIAL_VISUAL`) o evidencia `FAIL_ORIENTATION` **no produce métricas**:
   se registra `INSUFFICIENT_EVIDENCE`, `REFERENCE_UNAVAILABLE` o `NOT_COMPARABLE`.
4. **La transformación es siempre en memoria y registrada.** Nunca se altera el
   archivo fuente; se documenta motor, versión y `always_xy` (regla de
   `hf.spatial-reference.v1`). SRID desconocido (ej. vínculo interno sin
   organización formal) bloquea la comparación métrica.
5. **Métricas en unidades métricas.** Se rechazan grados como metros y fuentes
   visuales para métricas. Valores no finitos bloquean la métrica.
6. **Determinismo.** JSON canónico (`sort_keys`, `ensure_ascii=False`,
   separadores compactos, UTF-8, salto final); `comparison_run_id` y
   `output_hash` excluyen `timestamp`, `comparison_run_id` y `output_hash` del
   material; entradas idénticas ⇒ firmas idénticas.
7. **Tolerancias de análisis, no verdades.** Los buffers 30/60/90/136 m son
   tolerancias; se ejecutan todas; prohibido elegir solo el radio favorable.
8. **Clasificación obligatoria del piloto interno:** `COMPUTATIONAL_INTERNAL_COMPARISON`.
9. **Cero rutas absolutas** nuevas en contratos, motor, evidencias y pruebas.
10. **Sin decisiones.** El resultado nunca abre GATE 3, no cambia `adopted_cell`,
    no reemplaza el veredicto del QA ni la decisión profesional persistida.

## 5. Vocabulario de resultados

### A. Resultados emitibles

| Resultado | Significado | Máximo de perfil |
|---|---|---|
| `COMPARABLE` | fuentes comparadas con trazado coherente | — |
| `PARTIALLY_COMPARABLE` | parcialmente comparable | — |
| `NOT_COMPARABLE` | fuentes no comparables | — |
| `CORRESPONDENCE_OBSERVED` / `DIVERGENCE_OBSERVED` | correspondencia o divergencia local observada | — |
| `INSUFFICIENT_EVIDENCE` | no hay evidencia gobernada suficiente | — |
| `REFERENCE_UNAVAILABLE` | fuente inexistente o no gobernada | — |
| `TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED` | competencia territorial no demostrada | — |
| `CANDIDATE_WITH_EVIDENCE` | candidato con evidencia interna (segmento 24) | **máximo para segmento 24** |
| `INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE` | validación interna con evidencia de terreno | **máximo perfil terreno** |

### B. Resultados prohibidos (jamás emitidos)

`TRUE_NETWORK`, `CORRECT_CHANNEL`, `ADOPTED_SEGMENT`, `ADOPTED_CELL`,
`TERRITORIALLY_COMPETENT`.

## 6. Perfiles de comparación

| Id | Fuentes | Máximo | Métricas clave |
|---|---|---|---|
| `COMPARE_VECTOR_NETWORKS_V1` | red vs red | según reglas | longitudes, coincidencia, Hausdorff, corredores |
| `COMPARE_POINT_TO_NETWORKS_V1` | punto(s) vs red | sin adopción | distancia punto-red, percentiles |
| `COMPARE_SEGMENT_CORRESPONDENCE_V1` | red vs segmento candidato | `CANDIDATE_WITH_EVIDENCE` | cobertura, orientación local, correspondencia |
| `COMPARE_NETWORK_TO_TERRAIN_V1` | red vs MDT/terreno | `INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE` | alineación con terreno, sin competencia |
| `REGISTER_VISUAL_REFERENCE_V1` | referencia visual | sin métricas | registro de referencia, génesis auditada |
| `COMPARE_D03_CANDIDATES_V1` | candidatos D-03 vs red | sin adopción | distancias a candidatos, cobertura de restricción |

QA previo exigido por perfil (de `hf.geo-qa.v1`): `QA_VECTOR_GEOMETRY_V1`,
`QA_NETWORK_INTERNAL_V1`, `QA_RASTER_GEOREFERENCE_V1`,
`QA_SPATIAL_REFERENCE_V1`, `QA_CARTOGRAPHIC_EVIDENCE_V1`.

## 7. Métricas puras permitidas

Distancia mínima punto-red; distancia mínima entre redes; Hausdorff dirigido y
máximo; distancia media/media/percentiles mediante muestreo determinista;
longitud coincidente dentro de casualidad; % de longitud dentro de corredor;
orientación local (diferencia angular) y su mediana/percentiles; cobertura común
(bbox e intersección); IoU de corredores; nodos cercanos; continuidad de la red;
divergencias y segmentos sin homólogo. Fréchet solo con soporte competente y
declarado. Cada métrica registra `unidad`, fuente y limitaciones.

## 8. Estados

- `REGISTRADO` — resultado firmado y persistido en el caso.
- `LEDGER_ADJUDICADO` — registrado en `comparison-ledger.jsonl` sin duplicados.
- `INTEGRIDAD_REVALIDADA` — integridad regenerada con `state_hash` invariante.

La comparación **no** crea estados decisionales: `state_change=false` siempre.

## 9. Salidas

- `HF_CASE/<caso_id>/spatial/comparisons/runs/*.json` (resultado canónico).
- `HF_CASE/<caso_id>/spatial/comparisons/evidence/*_audit.md` y `*_sources.json`.
- `HF_CASE/<caso_id>/spatial/comparisons/profiles/*.json` (catálogo de perfiles).
- `HF_CASE/<caso_id>/spatial/comparisons/comparison-ledger.jsonl` (append serial).
- Actualización de `manifest.json`, `checksums.sha256` e `integrity.json`.

## 10. Evidencias de referencia

- `spatial/spatial-data-registry.json`, `spatial/qa/qa-ledger.jsonl`.
- `network/hf-network-reference.json`, `decision/spatial-decision.json`,
  `state/gates.jsonl`, `terrain/mdt-reference.json`.
- Archivos de entrada de los activos comparados (ruta relativa + `hash_sha256`).

## 11. Validaciones

1. Todo resultado tiene `schema`, `schema_version`, `comparison_run_id`,
   `output_hash`, `source`, `target`, `transformation_record`, `qa_prereq`,
   `overlap_extent`, `tolerances`, `metrics`, `assumptions`, `limitations`,
   `evidence_refs`, `result`, `state_change=false` y `professional_decision=null`.
2. `comparison_run_id` y `output_hash` recalculados sobre el material coinciden.
3. `result` nunca está en el vocabulario prohibido.
4. El `comparison_run_id` es único en el ledger; un duplicado no se re-agrega.
5. Cero rutas absolutas en el material persistido.
6. Fuentes de clase visual o evidencia desorientada no producen métricas.
7. Los cuatro radios 30/60/90/136 m figuran en `corridors`.

## 12. Bloqueos

- CRS ausente/desconocido o vínculo SRID interno sin organización: bloquea
  métricas → `INSUFFICIENT_EVIDENCE`/`REFERENCE_UNAVAILABLE`.
- Licencia `UNKNOWN` y/o autoridad no declarada: idem.
- `FAIL_ORIENTATION` o clase visual: bloquea métricas.
- Estado que no autoriza el consumo métrico del activo: idem.
- `state_hash` que cambia tras regenerar integridad: no se persiste.

## 13. Responsabilidades profesionales

- Declarar el par de referencia y registrar la transformación en memoria.
- No interpretar grados como metros ni métricas sobre capas visuales.
- Registrar supuestos, limitaciones, divergencias y correspondencias.
- Preservar `state_change=false` y `professional_decision=null`.

## 14. Consumidores

Permitidos: `HF_CARTO` (diagnóstico), `HF_GEO_QA`, `HF_UNCERTAINTY`,
`CALIDAD_SPATIAL`, `DIAGNOSTIC`, `HISTORICAL_AUDIT`, `COMPARISON`,
`TERRITORIAL_CONTRAST_AUDIT`.

Bloqueados: `PF02_ADOPTION`, `GATE_3`, `CANONICAL_WATERSHED`,
`HYDRO_CONSUMPTION`, `DECISION_PROFESIONAL`, `EXPEDIENTE`,
`TERRITORIAL_COMPETENCE`, `HF_CARTO` (adoptivo).

## 15. Responsabilidades prohibidas

- Emitir resultados del vocabulario prohibido o abrir GATE 3 / PF02_ADOPTION.
- Transformar, corregir o recortar evidencia `FAIL_ORIENTATION`.
- Elegir el radio de corredor favorable; ejecutar métricas sobre fuente
  no gobernada; sobreescribir o quitar entradas del ledger.
- Modificar motores productivos (`07_TOOLBOX/hf_geo`, proxy, `01_APP`), el estado
  de la red, `adopted_cell` o la decisión profesional.

## 16. Relación con hf.case.v1

El resultado es una **evidencia** del caso portable: se persiste bajo
`spatial/comparisons/`, se registra en el ledger de evidencia y se refleja en
`manifest.json`, `checksums.sha256` e `integrity.json` mediante el generador de
integridad. El `state_hash` permanece invariante; cambian `package_hash` y
`evidence_hash` (nueva evidencia). No crea estados profesionales.

## 17. Ejemplo del caso iguana_pc80

- **Piloto interno:** red HF (`red_hf_gate02_d03`, clase B_COMPUTACIONAL) vs
  `segmento_candidato_d03` (segmento 24, `CANDIDATO_NO_DEMOSTRADO`),
  `comparison_crs=EPSG:32618`, clasificación `COMPUTATIONAL_INTERNAL_COMPARISON`,
  resultado máximo `CANDIDATE_WITH_EVIDENCE`, corredores 30/60/90/136 m.
- **Piloto territorial:** `streams_urban_1000_medellin.gpkg` (licencia
  `UNKNOWN`, autoridad no declarada, vínculo SRID interno sin organización
  formal) → `INSUFFICIENT_EVIDENCE`, sin métricas, auditoría de gobernanza
  persistida.
- **Candidatos D-03:** diagnóstico de distancias de candidatos vs red, sin
  adopción.