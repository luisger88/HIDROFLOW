# Contrato de la Red Hídrica HidroFlow — hf.network.v1

- **Esquema:** `hf.network.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Gobernar el ciclo de vida de la **red hídrica** desde su generación
computacional hasta su competencia territorial demostrada. Una red solo se usa
como base territorial cuando su competencia está demostrada con contraste
externo y validación profesional. La competencia territorial **no se presume**:
se demuestra.

## 2. Schema id

- `schema`: `hf.network.v1`
- `schema_version`: `1.0`

## 3. Estados de la red

| Estado | Significado |
|---|---|
| `GENERATED` | Red producida por la cadena de terreno (umbral, CRS, hash registrados) |
| `INTERNALLY_VALIDATED` | Validación interna satisfecha (continuidad D8, topología, acumulación monótona) |
| `EXTERNALLY_CONTRASTED` | Contraste externo ejecutado contra referencias (MapGIS, ortofoto, red institucional) con métricas registradas |
| `TERRITORIALLY_COMPETENT` | Competencia territorial demostrada con evidencia y decisión profesional |
| `RESTRICTED` | Red apta solo para usos restringidos (generación de candidatos, contexto) |
| `REJECTED` | Red descartada; no apta para ningún uso decisional |

## 4. Reglas de transición

- `GENERATED → INTERNALLY_VALIDATED`: requiere continuidad D8, todas las celdas
  de traza en red, topología sin cruces y acumulación monótona.
- `INTERNALLY_VALIDATED → EXTERNALLY_CONTRASTED`: requiere métricas de
  comparación registradas conforme a `hf.comparison.v1`.
- `EXTERNALLY_CONTRASTED → TERRITORIALLY_COMPETENT`: requiere acta profesional
  y registro en `hf.spatial-decision.v1`.
- **QA interno no sustituye contraste externo** (regla 4 de `hf-geo-qa.v1`).
- **Una red sin contraste no es territorialmente competente** (regla 2).

## 5. Campos obligatorios de la red

- `id`, `clase` (`B_COMPUTACIONAL`), `formato`, `nombre`.
- `umbral_celdas`, `celdas_red_autorizada`, `num_segmentos`.
- `convencion_flujo` (`WhiteboxTools D8 (d8_pointer)`).
- `crs`, `hash`, `competencia_territorial`.
- `estado` (uno de la tabla anterior).
- `restricciones`.

## 6. Segmentos

Cada segmento registra: `id_segmento`, `fila/columna` de inicio, `acumulacion`,
`estado`. Estado del segmento:

- `CANDIDATO_NO_DEMOSTRADO` — propuesto, sin demostración de competencia.
- `CANDIDATO_DEMOSTRADO` — demostrado con contraste y decisión.
- `DESCARTADO` — rechazado formalmente.

## 7. Salidas

- Referencia de red en el caso (`network/hf-network-reference.json`).
- Entradas del inventario espacial (`spatial-data-registry.json`).
- Estado por segmento para `hf.spatial-decision.v1`.

## 8. Evidencias

- `red_gate02_D03.geojson` (hash `ce398aef...`) y `segmento_candidato_D03.geojson`
  (hash `5fcce071...`) en `gate02_d03/`.
- `snap_registro_D03.json` (continuidad: 2078 celdas, todas en red;
  longitud 71.99 km; acumulación mínima de traza 55024).
- `contraste_snap_D03.json` (contraste del snap contra la referencia disponible).
- `REGISTRO_HASHES_GATE02.json`.

## 9. Validaciones

1. `competencia_territorial` explícita; nunca vacía.
2. Los estados transicionan en orden; ninguna transición se salta.
3. `TERRITORIALLY_COMPETENT` exige hash de contraste externo + acta profesional.
4. Segmento con estado `CANDIDATO_NO_DEMOSTRADO` no alimenta watershed canónico.

## 10. Veredictos

| Estado de la red | Aptitud decisional |
|---|---|
| `GENERATED` | solo inspección y candidatos |
| `INTERNALLY_VALIDATED` | candidatos y contexto; **NO competencia territorial** |
| `EXTERNALLY_CONTRASTED` | candidatos contrastados; decisión aún pendiente |
| `TERRITORIALLY_COMPETENT` | base territorial apta |
| `RESTRICTED` / `REJECTED` | sin uso decisional (parcial o total) |

## 11. Responsabilidades profesionales

- Declarar el estado real de la red; no sobredeclarar competencia.
- Ejecutar y registrar el contraste externo antes de toda afirmación territorial.
- Autorizar con acta el ascenso a competente.

## 12. Consumidores

- `hf.spatial-decision.v1` (proposed_cell y candidatos sobre segmentos).
- `hf.comparison.v1` (métricas de contraste).
- `hf.geo-qa.v1` (checks dirección, acumulación, topología, continuidad).
- Aplicación React / proxy (render de red sin atributos de competencia falsos).
- HF-CARTO (render con autoridad solo si competente).

## 13. Responsabilidades prohibidas

- Presentar la red HF como territorialmente competente.
- Adoptar el segmento 24 sin decisión profesional.
- Usar QA interno como equivalente a contraste externo.
- Renderizar la red con jerarquía canónica no demostrada.

## 14. Relación con hf.case.v1

`hf.case.v1` persiste `network_competence: NOT_DEMONSTRATED` y el estado del
segmento en `hf.spatial-decision.v1`. Una red competente requiere actualizar
esos contratos mediante decisión profesional registrada en `decision-log.jsonl`
y `state/gates.jsonl`; **eso no ocurre en esta OT**.

## 15. Ejemplo del caso iguana_pc80

La red de La Iguaná permanece:

- `estado`: `INTERNALLY_VALIDATED`
- `competencia_territorial`: `TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED`
- `umbral`: 500 celdas · `celdas_red_autorizada`: 179231 · `num_segmentos`: 92
- `crs`: `EPSG:32618` · `convencion_flujo`: `WhiteboxTools D8 (d8_pointer)`
- Segmento 24: `CANDIDATO_NO_DEMOSTRADO`.

No se ejecutó contraste externo nuevo; no se abrió GATE 3.