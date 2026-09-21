# Cierre de la OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1

- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Rama:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **HEAD base:** `53a2747df83bc0588e5214fb858cac9de3e79528`
- **Caso piloto:** `HF_CASE/iguana_pc80`
- **Fecha UTC:** 2026-09-20
- **Idioma del cierre:** es-CO

---

## 1. Veredicto

**PASS CON RESTRICCIONES.**

La OT entregó contratos transversales SIG v1, inventario espacial gobernado y
validadores S1-S12. Todas las validaciones S1-S12 pasan. La única desviación
frente a P1-P5 es el drift documentado del `estado_hash` (P2), gestionado
conforme a la sección 11 de la OT-HF-SIG-002 sin modificar `case.json`.

## 2. Entregables

| Entregable | Ubicación |
|---|---|
| 9 contratos SIG v1 + README | `docs/contratos/gis/` |
| Inventario espacial gobernado | `HF_CASE/iguana_pc80/spatial/` |
| Ledger de QA piloto | `HF_CASE/iguana_pc80/spatial/qa/qa-ledger.jsonl` |
| Registro en manifiesto y checksums | `HF_CASE/iguana_pc80/manifest.json` y `HF_CASE/iguana_pc80/checksums.sha256` |
| Validadores y pruebas S1-S12 | `02_CORE/sig_engineering/` |

Esquemas definidos: `hf.spatial-data.v1`, `hf.spatial-reference.v1`,
`hf.terrain-chain.v1`, `hf.network.v1`, `hf.comparison.v1`, `hf.uncertainty.v1`,
`hf.spatial-decision.v1`, `hf.interoperability.v1`, `hf.geo-qa.v1`.

## 3. Resultados de validación

- S1-S12: **PASS** (`RESULTADO_S1_S12: PASS`).
- P1-P5: P1, P3, P4, P5 **PASS**; P2 **FAIL solo por drift de estado_hash**
  (verificado: `d753dd56c09e2014ed450d0442979f01e7bba4568ca9bf1e312b474f8868009d`
  registrado vs `82534f833dd13d272f01382de5fbbbd9a8c4ff52e2dcf0cd3fc9e665a5a62892`
  calculado). El `verificar_hashes` interno de P2 pasa: todos los checksums
  coinciden.
- Inmutables y motores: hashes baseline conservados (S10 y S12 PASS).

## 4. Conflicto administrado (sección 11 de la OT)

Registrar `spatial/*` en `manifest.json` y `checksums.sha256` incorpora cuatro
archivos al paquete portable. El resolver de portabilidad
(`02_CORE/portability/resolver.py`) calcula `estado_hash` sobre todos los
archivos del paquete excepto `case.json`, `manifest.json`, `checksums.sha256`,
`cache/` y `exports/`. Por ello el valor calculado ahora difiere del registrado
en `case.json` (inmutable). Decisión:

- `case.json` **no se modifica** (contrato inmutable).
- `manifest.json` y `checksums.sha256` **sí se actualizaron** para mantener el
  inventario al 100 % y la verificabilidad por hash.
- El conflicto queda **documentado** en la entrada 18 del ledger
  (`spatial/qa/qa-ledger.jsonl`) y en este cierre.
- Veredicto resultante: **PASS CON RESTRICCIONES**.

## 5. Restricciones respetadas

- No se ejecutó HF-GEO-QA operativo (contrato es diseño).
- No se ejecutaron comparaciones espaciales nuevas.
- No se corrigió la red HF.
- No se abrió HF-CARTO.
- No se ejecutó GATE 2 ni GATE 3.
- No se adoptó la celda (1028, 946); `adopted_cell` sigue null.
- No se creó `geometry/adopted-cell.geojson`.
- `spatial-decision.json`, `decision-log.jsonl`, `state/gates.jsonl`,
  `project-location.geojson` y `proposed-cell.geojson` intactos.
- `verificacion_D03.png` preservada como histórica
  (`FAIL_ORIENTATION`, `NOT_SUITABLE`; sin corrección).
- Ningún motor productivo modificado (canales hf_geo, CLI, proxy, React).
- Cero rutas absolutas nuevas en archivos creados por la OT.
- Sin push y sin PR.

## 6. Estado conservado del caso iguana_pc80

- GATE 1 PASS · GATE 2 CONDICIONAL (PF-02, 32.307 m, acta pendiente) · GATE 3 BLOQUEADO.
- Red `INTERNALLY_VALIDATED` con `TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED`.
- Segmento 24 `CANDIDATO_NO_DEMOSTRADO`.
- Veredicto espacial `PENDING_PROFESSIONAL_DECISION`.

## 7. Condiciones para abrir HF-GEO-QA operativo

1. Nueve contratos v1 vigentes y autoconsistentes con `hf.case.v1`.
2. Inventario espacial del caso validado (registro + ledger).
3. S1-S12 en PASS o desviaciones documentadas como restricción.
4. P1-P5 con el conflicto de estado_hash administrado (este cierre).
5. Sin modificaciones de motores productivos y sin comparaciones pendientes.

## 8. Condiciones para abrir HF-CARTO-001

1. Caso portable validado con estados persistidos.
2. Geometrías y clasificación A/B/C/D gobernadas.
3. Orientación/norte con calidad cartográfica (sin `FAIL_ORIENTATION` en el
   circuito de decisión).
4. Red hídrica competente solo si la competencia territorial fue demostrada.
5. Decisión espacial persistida y gates coherentes.

## 9. Recomendaciones de continuación

- Resolver la acta profesional PF-02 para desbloquear la línea de decisión.
- Habilitar el contraste externo (hf.comparison.v1) como paso previo a
  competencia territorial y apertura de HF-GEO-QA y HF-CARTO-001.
- Inventariar con los mismos esquemas los próximos casos portables.