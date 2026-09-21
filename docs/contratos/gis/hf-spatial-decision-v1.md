# Contrato de Decisión Espacial HidroFlow — hf.spatial-decision.v1

- **Esquema:** `hf.spatial-decision.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Formalizar el **circuito de decisión espacial**: cómo un punto contractual se
convierte en celda/outlet adoptada, quién propone, quién valida, quién decide y
quién persiste. Garantiza que **la ausencia de decisión nunca equivalga a
aceptación** y que ningún valor se rellene por inferencia.

## 2. Schema id

- `schema`: `hf.spatial-decision.v1`
- `schema_version`: `1.0`

## 3. Circuito de decisión

```
project_location
  → acquisition_aoi
  → professional_click
  → proposed_cell
  → evidence_review
  → professional_confirmation
  → adopted_cell
  → state_transition
```

| Etapa | Responsable | Contenido |
|---|---|---|
| `project_location` | Caso (HF-CORE) | punto contractual ratificado (D-03) |
| `acquisition_aoi` | Profesional | área de interés de adquisición (null si no existe) |
| `professional_click` | Profesional | clic real sobre el territorio (null si no existe) |
| `proposed_cell` | HF | celda propuesta por el motor (PROPUESTA) |
| `evidence_review` | HF-GEO-QA | revisión de evidencia (imagen, contraste, continuidad) |
| `professional_confirmation` | Profesional | confirmación explícita con acta |
| `adopted_cell` | Profesional + HF-CORE | celda adoptada (null hasta confirmación) |
| `state_transition` | HF-CORE | transición de estado persistida en gates y decision-log |

**HF propone. HF-GEO-QA valida. El profesional decide. HF-CORE persiste.**

## 4. Reglas

1. `adopted_cell` solo se llena con confirmación profesional explícita.
2. Valores ausentes se registran como `null` explícito; nunca por inferencia.
3. `proposed_cell` no alimenta el watershed canónico.
4. La revisión de evidencia no es una confirmación.
5. La transición de estado exige persistencia en `state/gates.jsonl` y
   `decision-log.jsonl`.

## 5. Estados

- `PENDING_PROFESSIONAL_DECISION` — circuito detenido esperando al profesional.
- `PROPOSED` — celda propuesta no adoptada.
- `CONFIRMED` — celda confirmada con acta (no aplica a esta OT).
- `REJECTED` — propuesta rechazada formalmente.

## 6. Salidas

- `decision/spatial-decision.json` (vigente, sin cambios en esta OT).
- `state/gates.jsonl` y `decision-log.jsonl` (persistencia de transiciones).
- Lectura del circuito para validadores SIG y HF-GEO-QA.

## 7. Evidencia

- `geometry/project-location.geojson` (punto D-03 ratificado).
- `geometry/proposed-cell.geojson` (celda propuesta).
- `gate02_d03/punto_snap_D03.geojson` y `punto_original_D03.geojson`.
- `snap_registro_D03.json` y `contraste_snap_D03.json`.
- `verificacion_D03.png` (evidencia, FAIL_ORIENTATION, revisada mas no confirmante).

## 8. Validaciones

1. `adopted_cell` null; `acquisition_aoi` null; `professional_click` null.
2. `proposed_cell` con fila/columna/segmento/distancia/acumulación registrados.
3. `verdict == PENDING_PROFESSIONAL_DECISION`.
4. `snap_distance.estado == NO_ACEPTADA`.
5. El circuito actual no contiene ninguna celda adoptada.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Circuito completo hasta `proposed_cell` + evidencia; decisión pendiente | **CONDICIONAL** |
| Confirmación profesional + acta + persistencia | **PASS (transición ejecutada)** |
| Celda "adoptada" sin acta / inferida | **FAIL** |
| `adopted_cell` no null sin transición persistida | **FAIL** |

## 10. Bloqueos

- GATE 3 permanece BLOQUEADO mientras `decision_profesional` sea null.
- No se delimita cuenca canónica ni se calculan parámetros definitivos.
- No se ejecuta watershed sobre `proposed_cell`.

## 11. Responsabilidades profesionales

- Emitir (o no) la confirmación con acta.
- Revisar la evidencia y el dictamen de HF-GEO-QA antes de decidir.
- Explicitar alternativas descartadas.

## 12. Consumidores

- HF-CORE (persiste estado y gates).
- HF-GEO-QA (valida propuestas y evidencia).
- `hf.network.v1` y `hf.terrain-chain.v1` (habilitan la propuesta).
- HF-CARTO (render de decisión adoptada cuando exista).

## 13. Responsabilidades prohibidas

- Adoptar celdas automáticamente.
- Dar por aceptada una distancia PF-02 sin acta.
- Reutilizar `verificacion_D03.png` (FAIL_ORIENTATION) como confirmación.
- Crear `geometry/adopted-cell.geojson` para iguana_pc80 en esta OT.

## 14. Relación con hf.case.v1

`hf.spatial-decision.v1` es el contrato de decisión de `hf.case.v1`: el caso
persiste `adopted_cell: null`, `GATE_2 CONDICIONAL` con `decision_profesional:
null` y `GATE_3 BLOQUEADO`. Esta OT **no cambia** `spatial-decision.json`
vigente ni ninguna decisión.

## 15. Ejemplo del caso iguana_pc80

- `project_location`: D-03 ratificado (6.271785, -75.594088, 1511.36 msnm).
- `proposed_cell`: fila 1028, col 946, segmento 24, 32.307 m, acumulación 55024
  (`CANDIDATO_NO_DEMOSTRADO`).
- `evidence_review`: E2 del GATE 2 (continuidad 2078 celdas; divisoria sin cruce).
- `adopted_cell`: null. `acquisition_aoi`: null. `professional_click`: null.
- `verdict`: `PENDING_PROFESSIONAL_DECISION`.