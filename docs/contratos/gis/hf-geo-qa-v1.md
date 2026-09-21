# Contrato de QA Espacial HidroFlow — hf.geo-qa.v1

- **Esquema:** `hf.geo-qa.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20
- **Cláusula de ejecución:** este contrato es **diseño**; HF-GEO-QA **no ejecuta
  operativamente** durante OT-HF-SIG-002 (ver README, sección 5).

---

## 1. Misión

Definir el **aseguramiento de calidad espacial** que gobierna cómo se aprueba,
rechaza o condiciona cada activo espacial antes de entrar a decisión. Aplica
checks de CRS, axis order, transformación, affine, orientación, norte,
resolución, NoData, extensión, alineamiento, geometría, topología, continuidad,
dirección, acumulación, desplazamiento, correspondencia territorial, hashes y
versiones.

## 2. Schema id

- `schema`: `hf.geo-qa.v1`
- `schema_version`: `1.0`

## 3. Grupos de checks

| Grupo | Checks | Umbral / criterio |
|---|---|---|
| CRS | CRS presente, datum, axis order, transformación, `always_xy` | CRS ausente → FAIL |
| Calidad raster | resolución, NoData (nodata real), extensión, alineamiento, pixelación, orientación, affine | resolución declarada vs real |
| Geometría vectorial | geometría válida, topología, cruce, continuidad, dirección, acumulación | topología rota → FAIL |
| Red | correspondencia territorial, desplazamiento, acumulación, segmento, competencia | regla 2 |
| Evidencia | orientación, norte, flecha norte | regla 1 |
| Adquisición | transformación de proyección D-03, método de escala, pixelación, lat/lon vs UTM | método de escala exigido |
| Ortofoto | MDT vs IDW (interpolación), tendencia, georreferenciación | georreferenciación obligatoria |
| Gobernanza | hashes, versiones, ledger QA | hash faltante → FAIL |

## 4. Reglas fundamentales

1. **Norte incorrecto bloquea PASS cartográfico.** Incluye evidencia
   `FAIL_ORIENTATION`; el producto completo queda marcado y no apto para decisión.
2. **Una red sin contraste no es territorialmente competente.** QA interno no
   sustituye el contraste externo (regla 4).
3. **`proposed_cell` no alimenta el watershed.** Solo decisión adoptada habilita
   cuencas canónicas.
4. **El QA interno no sustituye el contraste externo.**
5. **Un FAIL crítico bloquea consumidores.** Un FAIL_ORIENTATION bloquea el
   consumidor cartográfico y de comparación; un FAIL de topología bloquea la
   red aguas abajo.

## 5. Bitácora de QA (ledger)

Cada check registra: `id_activo`, `grupo`, `check`, `resultado`
(`PASS`/`CONDICIONAL`/`FAIL`/`FAIL_ORIENTATION`), `detalle`, `hash`, `fecha`,
`método`, `evidencia`. Ledger vigente: `HF_CASE/iguana_pc80/spatial/qa/qa-ledger.jsonl`.

## 6. Estados de QA

- `VALIDADO` — todos los checks del grupo PASS.
- `VALIDADO_CONDICIONAL` — PASS con condición documentada.
- `FALLIDO` — algún FAIL (bloquea consumidores).
- `NO_EJECUTADO` — grupo sin ejecutar en la versión actual (loop de diseño).

## 7. Salidas

- Entradas QA por activo con veredicto por grupo.
- Ledger persistente (`qa-ledger.jsonl`) legible por los validadores S1-S12.
- Dictámenes para gates y decisión.

## 8. Evidencias

- `REGISTRO_HASHES_GATE02.json`, `snap_registro_D03.json`,
  `manifiesto_gate02.json`, `verificacion_D03.png`.
- Bitácoras `HF-GEO-DIAG-*` (CRS/axis/orden de ejes) preservadas del GATE 2.

## 9. Veredictos por grupo

| Grupo | Condición | Veredicto |
|---|---|---|
| CRS | CRS + datum + axis + transformación | `PASS` |
| Calidad raster | resolución/NoData/extensión conformes | `PASS` |
| Vector | topología y geometría válidas | `PASS` |
| Red | QA interno: continuidad + acumulación | `VALIDADO_INTERNO` (no competencia) |
| Evidencia | orientación incorrecta | `FAIL_ORIENTATION` |
| Adquisición | método de escala declarado | `PASS CONDICIONAL` |
| Gobernanza | hash + versiones presentes | `PASS` |

## 10. Bloqueos

- `FAIL_ORIENTATION` bloquea PASS cartográfico y toda comparación.
- FAIL de topología bloquea la red.
- Insuficiencia de evidencia bloquea la decisión (GATE 3).

## 11. Responsabilidades profesionales

- Definir umbrales por activo y decisión (ej. tolerancia de snap 30/136 m).
- Emitir actas de excepción y dictámenes profesionales.
- Registrar los resultados de QA sin reescribir resultados históricos.

## 12. Consumidores

- HF-GEO-QA operativo (futuro).
- `hf.spatial-decision.v1` (dictámenes de QA al circuito).
- `hf.network.v1`, `hf.comparison.v1`, `hf.terrain-chain.v1`.
- Validadores SIG (S1-S12) y portabilidad (P1-P5).

## 13. Responsabilidades prohibidas

- Marcar `VALIDADO` un activo con FAIL_ORIENTATION.
- Usar QA interno para afirmar competencia territorial.
- Reescribir resultados QA ya emitidos (históricos se preservan).

## 14. Relación con hf.case.v1

Los dictámenes de QA complementan `hf.case.v1` y su `spatial-decision.v1`,
persistiendo veredictos por requerimiento y aportando al expediente del caso y a
la transición de gates. En esta versión, el ledger piloto registra entradas
PASS con las restricciones declaradas; HF-GEO-QA completo queda **pendiente de
apertura operativa**.

## 15. Ejemplo del caso iguana_pc80

Estado de QA piloto (ledger `spatial/qa/qa-ledger.jsonl`):

- proyecto y celda propuesta: CRS correcto (EPSG:4326 entregado; UTM operativo),
  PASS.
- mapgis: clase C; veredicto `CONDICIONAL` (CRS institucional, uso visual).
- ortofoto: clase C; veredicto `CONDICIONAL` (georreferenciación).
- MDT: extensión/NoData/resolución conformes; `PASS`.
- red HF: `VALIDADO_INTERNO`; competencia territorial **no** demostrada.
- segmento 24: `CANDIDATO_NO_DEMOSTRADO`.
- `verificacion_D03.png`: `FAIL_ORIENTATION`, `decision_use NOT_SUITABLE`; se
  preserva como histórica, no se corrige.
- `contrato_snap_D03.json`: `PASS` hash y vigencia (inmutable).

Este ledger es **línea base de diseño**, no una ejecución operativa de HF-GEO-QA.