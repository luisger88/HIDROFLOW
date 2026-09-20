# HF-CASE-STATE-001A — GATE 2 — DICTAMEN DEL SNAP D-03 (E2)

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E2
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a` (`3886ccf4547972b42d8ac052b14e2f9d60a4ee99`)

---

## VEREDICTO: **B. GATE 2 CONDICIONAL — decisión profesional requerida, cadena detenida.**

| ID | Regla (PF) | Resultado | Veredicto |
|---|---|---|---|
| PF-01 | `0 ≤ distancia ≤ 30 m` | 32.307 m > 30 m | no aplica |
| **PF-02** | `30 m < distancia ≤ 136 m` con acta profesional | 32.307 m ∈ (30, 136] | **CONDICIONAL** |
| PF-03 | `distancia > 136 m` o sin acta | no aplica | no aplica |

## 1. Hechos

- Snap de D-03 sobre la red (umbral 500) = célula (1028, 946), distancia **32.307 m**.
- Mismo cauce que drena al punto (traza D8, sin salto lateral); cuenca del snap contiene el punto.
- El candidato espacialmente más cercano (19.82 m) fue **rechazado por evidenía**: su cuenca no contiene D-03.
- MDT, CRS, umbral y contratos validados; inmutables sin cambio; más detalles en `GATE02_EJECUCION` y `GATE02_EVIDENCIA`.

## 2. Clasificación contractual

- Con acta profesional documentada: **PASS_CONDICIONAL** (`clasificacion_contrato_con_acta`).
- Sin acta: la distancia queda fuera de la tolerancia primaria; el contrato exige la excepción documentada antes de adoptar el snap.
- Por ello el GATE 2 se dictamina como **CONDICIONAL** y la cadena **se detiene**.

## 3. Decisión profesional requerida (pendiente)

Se requiere acta profesional explícita que confirme la adopción del snap a 32.3 m
(cumpliendo PF-02), con constancia de los criterios (trazabilidad del cauce,
continuidad y divisoria) que sustentan que no se cambia el outlet D-03 ni la
unidad hidrográfica. Ver `GATE02_DECISION_PROFESIONAL_PENDIENTE`.

## 4. Efectos

- **GATE 3 NO se ejecuta** hasta que exista la decisión profesional/acta que resuelva el CONDICIONAL.
- No se modifica el estado del caso; no se abre `HF-CONVERSE`.
- El snap queda disponible como artefacto (célula 1028, 946; 32.307 m; segmento 24; acc 55 024).

## 5. Firma

Agente Build (Big Pickle). Dictamen GATE 2 emitido conforme a C-03 y PF-01/02/03.