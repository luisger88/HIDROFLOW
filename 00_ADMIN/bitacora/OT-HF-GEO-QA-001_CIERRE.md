# OT-HF-GEO-QA-001 · CIERRE — Puerta Operativa de Calidad Espacial HF-GEO-QA V1

- **Fecha:** 2026-09-20
- **Rama:** `ot-hf-geo-qa-001-puerta-calidad-espacial`
- **Caso de referencia:** `iguana_pc80`
- **Autoridad:** Ingeniero Digital (Big Pickle) — Perfil Profesional 2/3
- **Estado:** CIERRE

## 1. Objetivo

Materializar la puerta operativa de calidad espacial HF-GEO-QA V1 como módulo
aislado, determinista y sin autoridad decisional. El módulo evalúa productos
espaciales contra los contratos SIG antes de su consumo por HF-CARTO,
HF-HYDRO, watershed, expediente y decisiones profesionales.

## 2. Corrección previa aplicada (t=0 → t=1)

El ledger QA del caso presentaba un defecto de serialización sin cambio
semántico:

1. Línea 21: escape JSON inválido (`[A-Za-z]:\ y` → `[A-Za-z]:\\ y`).
2. Línea 22: dos objetos JSON concatenados en una sola línea.

Se enmendó el archivo conservando la numeración 1..23, sin renumerar, sin
cambio de contenido y con `state_change=false`. Se regeneró la integridad
del caso:

- `state_hash` invariante: `5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d`
- `package_hash` y `evidence_hash` actualizados conforme a la reconciliación.
- `P1-P5 PASS` y `S1-S12 con I1-I8 PASS` después de la corrección.

## 3. Resultado del build

Módulo entregado en `02_CORE/geo_qa/`:

- `models.py` — vocabulario canónico (PASS/CONDICIONAL/FAIL/FAIL_ORIENTATION/
  INTERNALLY_VALIDATED/INTERNALLY_VALIDATED_WITH_RESTRICTIONS; INFO/WARNING/
  ERROR/CRITICAL) y `QaResult`.
- `result.py` — JSON canónico determinista, `qa_run_id`, `output_hash` e
  invariantes (`state_change=false`, `professional_decision=null`).
- `profiles.py` + `registry.py` — catálogo declarativo de los seis perfiles y
  registro con validación Q1.
- `checks/` — checks puros por dominio (sin imports de portability/resolver):
  `spatial_reference`, `raster_georef`, `cartographic_evidence`,
  `vector_geometry`, `network_internal`, `gate02_diagnostic`.
- `runner.py` — orquestador determinista y registro en el ledger QA.
- `cli.py` — `profiles`, `verify`, `run-all`, `pilot <A|B|C|D>`.
- `deps.py` — paths de importación de portability bajo demanda.
- `tests/run_geo_qa_tests.py` — Q1-Q16 (todos PASS).
- `README.md` — documento de operación del módulo.

## 4. Resultado Q1-Q16

```
RESULTADO_Q1_Q16: PASS
```

Se confirman los 16 criterios contractuales, incluidos:

- Q5 — norte invertido ⇒ `FAIL_ORIENTATION` CRITICAL bloqueando
  SNAP_DECISION/PF02_ADOPTION/GATE_3/CANONICAL_WATERSHED/CARTOGRAPHIC_REPORT
  y permitiendo HISTORICAL_AUDIT/DIAGNOSTIC/COMPARISON/RUPTURE_EVIDENCE.
- Q7 — red interna con máximo `INTERNALLY_VALIDATED` y restricción
  `TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED`; red desconectada (modo único) = ERROR.
- Q8/Q9 — celda propuesta NO ADOPTADA bloquea CANONICAL_WATERSHED; `adopted_cell null`
  bloquea HYDRO_CONSUMPTION.
- Q11 — copia portable del caso reproduce firmas idénticas.
- Q13/Q16 — firewall de checks y ausencia de rutas absolutas literales.

## 5. Pilotos controlados (A-D) registrados en el ledger QA

Registros `1..23` preexistentes conservados; ejecuciones añadidas 24..27 en
`HF_CASE/iguana_pc80/spatial/qa/qa-ledger.jsonl`:

| # | perfil | activo | resultado | qa_run_id |
|---|---|---|---|---|
| 24 | spatial_reference | project-location | PASS | `0ae528ca17f5e20a` |
| 25 | cartographic_evidence | manifiesto_gate02 | FAIL_ORIENTATION | `5b815fead5dd4482` |
| 26 | network_internal | red_hf_gate02_d03 | INTERNALLY_VALIDATED | `ce180bdc730417d7` |
| 27 | gate02_diagnostic | caso_iguana_pc80 | INTERNALLY_VALIDATED | `ff513bddd84df23b` |

Cada piloto regeneró la integridad del caso con `state_hash` invariante
(`5f9bf470...`). Verificación posterior: `P1-P5 PASS`, `S1-S12 e I1-I8 PASS`.

## 6. Hallazgos QA materializados en el caso `iguana_pc80`

- **Orientación (piloto B):** la evidencia cartográfica del manifiesto GATE 2
  no está apta para decisión (FAIL_ORIENTATION): el norte marcado no coincide
  con el norte del mapa. GATE 3 permanece BLOQUEADO.
- **Red (piloto C):** validada internamente; la vectorización expone 297
  tramos sin nodos compartidos exactos y sin campo de acumulación; la
  continuidad raster consta en el registro (179231 celdas, 92 segmentos); la
  monotonicidad NO se afirma. Registro declara EPSG:32618 mientras el archivo
  declara EPSG:4326 (WARNING, se requiere reproyección explícita). Competencia
  territorial NO demostrada.
- **Puerta 2 (piloto D):** estado integral válido: GATE_1=PASS,
  GATE_2=CONDICIONAL, GATE_3=BLOQUEADO; celda propuesta (1028, 946, segmento
  24, 32.307 m) NO adoptada; `adopted_cell null`; sin adopción de decisión.
- **Registro espacial (piloto A):** `project-location` RATIFICADO con CRS
  EPSG:4326 y datum WGS84 coherente.

## 7. Condiciones de consumo declaradas a partir de la V1

- La consumición decisional por HF-CARTO, HF-HYDRO, watershed, expediente y
  decisiones profesionales queda bloqueada mientras:
  - la orientación cartográfica no esté verificada (FAIL_ORIENTATION),
  - la celda propuesta no esté adoptada y persistida (`adopted_cell null`),
  - la competencia territorial de la red no esté demostrada,
  - GATE_3 permanezca BLOQUEADO.
- No se emitieron decisiones ni se modificaron gates, estado, el MDT ni los
  motores productivos (`hf_geo`, proxy, React, `hidroflow_cli`).

## 8. Entregables

1. Módulo `02_CORE/geo_qa/` + `README.md`.
2. Suite `tests/run_geo_qa_tests.py` (Q1-Q16, PASS).
3. Ledger QA enmendado y extendido (27 objetos JSON válidos).
4. Integridad regenerada con `state_hash` invariante, `P1-P5 PASS`,
   `S1-S12/I1-I8 PASS`.
5. Bitácora de cierre (este documento).

## 9. Verificación final

- `RESULTADO_P1_P5: PASS`
- `RESULTADO_S1_S12_I1_I8: PASS`
- `RESULTADO_Q1_Q16: PASS`
- `state_hash` = `5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d`
  (invariante durante toda la OT)
- Sin rutas absolutas nuevas en el código del módulo.