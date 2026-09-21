# Contratos Transversales de Ingeniería SIG — v1

- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **HEAD base:** `53a2747df83bc0588e5214fb858cac9de3e79528`
- **Fecha UTC:** 2026-09-20

---

## 1. Propósito

Definir los contratos transversales que gobiernan cómo HidroFlow declara, manipula,
valida, compara y decide sobre datos espaciales. Son contratos **transversales**
porque aplican a cualquier caso portable (`HF_CASE/<caso_id>`), motor de terreno
(`07_TOOLBOX/hf_geo`), aplicación de consumo (`01_APP/HIDROFLOW`) y exportación,
independientemente del caso concreto.

Esta versión **no ejecuta HF-GEO-QA operativo**, **no ejecuta comparaciones
espaciales**, **no corrige la red HF**, **no abre HF-CARTO** y **no ejecuta
GATE 2 ni GATE 3**.

## 2. Inventario de contratos

| Archivo | Schema | Ámbito |
|---|---|---|
| `hf-spatial-data-v1.md` | `hf.spatial-data.v1` | Registro del dato espacial (declaración, clase, procedencia, hash) |
| `hf-spatial-reference-v1.md` | `hf.spatial-reference.v1` | Referencia espacial, CRS, datum, orientación, alineamiento |
| `hf-terrain-chain-v1.md` | `hf.terrain-chain.v1` | Cadena de terreno MDT → QA → alineamiento → acondicionamiento → flujo → red → segmentación |
| `hf-network-v1.md` | `hf.network.v1` | Estados de la red hídrica y la competencia territorial |
| `hf-comparison-v1.md` | `hf.comparison.v1` | Comparación espacial y métricas permitidas |
| `hf-uncertainty-v1.md` | `hf.uncertainty.v1` | Registro de incertidumbre y excepciones |
| `hf-spatial-decision-v1.md` | `hf.spatial-decision.v1` | Decisión espacial profesional y persistencia |
| `hf-interoperability-v1.md` | `hf.interoperability.v1` | Formatos abiertos e interoperabilidad |
| `hf-geo-qa-v1.md` | `hf.geo-qa.v1` | Diseño del aseguramiento de calidad espacial (sin ejecución) |

## 3. Relación con hf.case.v1

Los contratos SIG v1 respetan `hf.case.v1` (caso portable) y sus esquemas
materializados (`hf.case.v1`, `hf.manifest.v1`, `hf.decision-log.v1`,
`hf.spatial-decision.v1`, `hf.reference.v1`, `hf.provenance.v1`,
`hf.hashes.v1`, `hf.source-manifest.v1`, `hf.catalog.v1`, `hf.exports.v1`).

Reglas transversales preservadas:

- `adopted_cell` sigue null mientras no exista decisión profesional explícita.
- La red HF conserva `competencia territorial NO demostrada`.
- El segmento 24 continúa `CANDIDATO_NO_DEMOSTRADO`.
- `verificacion_D03.png` permanece histórico `FAIL_ORIENTATION` / `NOT_SUITABLE`.
- GATE 1 PASS · GATE 2 CONDICIONAL · GATE 3 BLOQUEADO.
- Reinventario espacial gobernado: `HF_CASE/iguana_pc80/spatial/`.
- Cero rutas absolutas nuevas en contratos, inventario, validadores y pruebas.

## 4. Gradación de veredictos

Los contratos usan de forma normalizada:

- **PASS** — cumple, apto para el uso declarado.
- **CONDICIONAL** — cumple con condición profesional explícita y registrada.
- **FAIL** — no cumple; bloquea el consumidor afectado.
- **FAIL_ORIENTATION** — evidencia con orientación/norte incorrecto; nunca apta
  para decisión cartográfica.

## 5. Condición exacta para abrir HF-GEO-QA operativo

HF-GEO-QA (diseñado en `hf-geo-qa-v1.md`) podrá abrirse operativamente solo cuando:

1. Los nueve contratos v1 estén vigentes y autoconsistentes con `hf.case.v1`.
2. El inventario espacial del caso piloto valide (registro y ledger).
3. Los validadores `02_CORE/sig_engineering` pasen en su totalidad (S1-S12) o sus
   desviaciones queden documentadas como restricción explícita.
4. P1-P5 de portabilidad sigan PASS (con el conflicto documentado de `estado_hash`
   conforme a la sección 11 de la OT-HF-SIG-002 si aplica).
5. No se modifiquen los motores productivos ni se ejecuten comparaciones espaciales
   antes de esta apertura.

## 6. Condición exacta para abrir HF-CARTO-001

HF-CARTO-001 podrá abrirse solo cuando:

1. Exista al menos un caso portable validado (P1-P5) con estado de gates persistido.
2. La capa de geometrías (`geometry/`) y la clasificación A/B/C/D estén gobernadas.
3. La orientación y el norte estén verificados con calidad cartográfica (regla 1 de
   `hf.geo-qa.v1`), sin evidencia `FAIL_ORIENTATION` en el circuito de decisión.
4. La red hídrica, si se renderiza como competente, haya demostrado competencia
   territorial (regla 2 de `hf.geo-qa.v1`).
5. Se respete la decisión espacial persistida y el estado de gates del caso.

## 7. Bloqueos en esta versión

- No ejecutar HF-GEO-QA operativo.
- No ejecutar comparaciones espaciales.
- No corregir la red HF.
- No abrir HF-CARTO.
- No ejecutar GATE 2 ni GATE 3.
- No adoptar la celda (1028, 946).
- No modificar motores productivos.