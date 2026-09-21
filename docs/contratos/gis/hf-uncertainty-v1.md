# Contrato de Incertidumbre Espacial HidroFlow — hf.uncertainty.v1

- **Esquema:** `hf.uncertainty.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Registrar y transportar la **incertidumbre** de cada decisión espacial:
resolución, distancias, tolerancias, celdas, acumulación, dirección, segmento,
alternativas, calidad del MDT, correspondencia externa, sensibilidad al umbral,
limitaciones y excepciones. La incertidumbre nunca se elimina por redondeo ni se
oculta: se declara y se traduce en decisión profesional documentada.

## 2. Schema id

- `schema`: `hf.uncertainty.v1`
- `schema_version`: `1.0`

## 3. Campos obligatorios

| Campo | Descripción | Ejemplo iguana_pc80 |
|---|---|---|
| `resolucion` | resolución operativa del análisis | `30 m` |
| `distancia_snap` | distancia del snap al punto contractual | `32.307 m` |
| `tolerancia` | tolerancia primaria y excepción | `30 m` / `136 m` (con acta) |
| `celda` | fila/columna de la celda | `1028 / 946` |
| `acumulacion` | celdas de aporte | `55024` |
| `direccion` | convención de flujo | `WhiteboxTools D8 (d8_pointer)` |
| `segmento` | segmento candidato | `24` |
| `alternativas` | candidatos descartados y razones | fila 1027, col 945 (19.82 m) rechazado |
| `calidad_mdt` | calidad declarada del MDT | `GLO30; resolución original; sin precisión certificada` |
| `correspondencia_externa` | resultado del contraste externo | visual (prohibida adopción) |
| `sensibilidad_umbral` | efecto de variar el umbral de red | no recalculada en esta OT |
| `limitaciones` | límites del análisis | red sin competencia territorial demostrada |
| `excepcion` | excepción profesional (con acta o sin acta) | `PF-02` pendiente de acta |
| `decision_profesional` | voto final del profesional | `null` (pendiente) |

## 4. Reglas

1. **PF-01 / PF-02 / PF-03 son antecedentes contractuales, no decisiones
   adoptadas.** Su aplicación genera una clasificación; la adopción es acto
   profesional separado.
2. Incertidumbre conocida no se presenta como valor exacto certificado.
3. La ausencia de acta profesional mantiene la incertidumbre sin resolver.
4. La distancia del snap no se presenta como "distancia aceptada" sin acto.
5. El candidato más cercano puede descartarse si su cuenca no contiene el punto.

## 5. Estados

- `DECLARADA` — incertidumbre registrada sin resolver.
- `ACOTADA` — límites conocidos y documentados (rango, tolerancia).
- `RESUELTA` — resuelta por decisión profesional con acta (no en esta OT).
- `ARRASTRADA` — permanece abierta y se transporta a productos posteriores.

## 6. Salidas

- Bloque de incertidumbre en cada decisión espacial y en el inventario.
- Aportes a la evidencia de `hf.geo-qa.v1` y a los dictámenes de gates.

## 7. Evidencia

- `snap_registro_D03.json` (distancia, candidatos, continuidad, divisoria).
- `contrato_snap_D03.json` (PF-01/02/03, tolerancias 30/136 m, umbral 500).
- `state/gates.jsonl` (GATE 2 CONDICIONAL, PF-02 aplicado).
- `HF-CASE-STATE-001A_GATE02_*` (justificación de la excepción PF-02).

## 8. Validaciones

1. `distancia_snap`, `tolerancia`, `celda`, `acumulacion`, `segmento` presentes.
2. `excepcion` declarada con acta (o explícitamente pendiente).
3. `decision_profesional` null se registra como null explícito.
4. No se afirma exactitud no demostrada.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Incertidumbre registrada con límites y excepción clara | **PASS CONDICIONAL** |
| Distancia dentro de tolerancia primaria sin acta | **PASS** |
| Distancia en excepción sin acta profesional | **FAIL (bloqueo de adopción)** |
| Incertidumbre omitida u ocultada | **FAIL** |

## 10. Bloqueos

- Distancia en PF-02 sin acta bloquea la adopción de la celda.
- Incertidumbre no declarada bloquea el dictamen.
- `decision_profesional` null mantiene el GATE 3 bloqueado.

## 11. Responsabilidades profesionales

- Emitir (o no) la acta que resuelve la excepción.
- Autorizar la distancia máxima aceptable según el contrato.
- Registrar alternativas y razones de descarte.

## 12. Consumidores

- `hf.spatial-decision.v1` (input de la decisión).
- `hf.geo-qa.v1` (check sensibilidad y desplazamiento).
- `hf.comparison.v1` (correspondencia externa).
- Dictámenes y expedientes del caso.

## 13. Responsabilidades prohibidas

- Ocultar la distancia real o el estado pendiente del acta.
- Tratar `PF-02` como sinónimo de "aceptado".
- Redondear la incertidumbre hasta hacerla invisible.

## 14. Relación con hf.case.v1

`hf.case.v1` persiste `GATE_2.condicion` ("Acta profesional explícita requerida
para adoptar el snap de D-03"), `snap_distance.estado: NO_ACEPTADA` y
`adopted_cell: null`. `hf.uncertainty.v1` formaliza el paquete de valores que
fundamenta esa condición.

## 15. Ejemplo del caso iguana_pc80

- resolución 30 m; distancia snap 32.307 m; tolerancia primaria 30 m; excepción
  máxima 136 m con acta.
- celda (1028, 946); acumulación 55024; segmento 24; dirección D8 WBT.
- alternativa rechazada: (1027, 945) a 19.82 m porque su cuenca de aporte no
  contiene el punto D-03.
- PF-02 aplicado como antecedente contractual; acta profesional pendiente;
  `decision_profesional: null`.