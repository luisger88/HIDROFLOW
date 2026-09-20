# HF-CASE-STATE-001A — GATE 2 — DECISIÓN PROFESIONAL PENDIENTE (E2)

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E2
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a`
- **Estado:** **PENDIENTE** — la ejecución del GATE 3 queda bloqueada hasta resolver este punto.

---

## 1. Qué se decide

Adoptar (o no) el snap de D-03 ubicado a **32.307 m** del punto original,
clasificado bajo la excepción profesional **PF-02** del contrato C-03
(30 m < distancia ≤ 136 m con acta profesional documentada).

## 2. Hechos que sustentan la recomendación favorable

1. La célula snap (fila 1028, col 946) es la **primera célula de la red** que
   recibe el flujo real del punto D-03 (traza D8 sobre `flowdir`: mismo cauce,
   sin salto lateral ni cruce de divisoria).
2. La cuenca de aporte del snap (55 024 celdas) **contiene** el punto original.
3. El candidato espacialmente más cercano (19.82 m) fue descartado por evidencia
   (su cuenca no contiene el punto); elegirlo habría cambiado el drenaje.
4. Continuidad aguas abajo íntegra (2078 celdas, 0 fuera de red).
5. Outlet retenido = D-03; elevación a 30 m: 1518.77 → 1517.12 msnm (Δ ~1.65 m, propio de la resolución).

## 3. Opciones

| Opción | Efecto |
|---|---|
| **A. Adoptar snap a 32.307 m (acta PF-02)** | GATE 2 = PASS_CONDICIONAL; autoriza ejecución de GATE 3 con la célula (1028, 946) como pour point. |
| **B. No adoptar / solicitar MDT de mayor resolución** | Cadena detenida; el snap queda documentado como no adoptado; GATE 3 permanece bloqueado. |
| **C. Revisar tolerancia primaria (30 m)** | Requiere acta de cambio de contrato; fuera del alcance de este incremento. |

## 4. Contenido mínimo del acta profesional (cuando se emita)

- OT / caso / incremento, fecha y responsable.
- Referencia al dictamen `GATE02_DICTAMEN` y a la regla PF-02.
- Distancia adoptada (32.307 m), célula (1028, 946) y confirmación `outlet_retenido: true`.
- Sustento técnico (traza D8, divisoria, continuidad) firmado.
- Registro del resultado en `REGISTRO_HISTORICOS.json` y desbloqueo condicionado del GATE 3.

## 5. Bloqueo vigente

Mientras esta decisión no se formalice: **no ejecutar GATE 3, no delimitar cuenca
canónica, no calcular parámetros geomorfológicos/hidrológicos y no modificar el
estado del caso.**

---

Firma: Agente Build (Big Pickle). Decisión profesional pendiente; cadena detenida en GATE 2.