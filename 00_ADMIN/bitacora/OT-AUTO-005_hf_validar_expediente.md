# OT-AUTO-005

## Objetivo

Crear un comando único de validación del expediente hidrológico mínimo.

## Alcance

El comando debe ejecutar:

- HF-TestExpediente MultiTr.
- HF-TestExpedienteReporte.
- npm run build.
- Resumen final PASS/FAIL.

## Resultado esperado

Reducir la validación post-cambio del expediente a una sola instrucción operativa.

## Estado

Abierta.
## Radar arquitectónico no negociable

HidroFlow no debe evolucionar como una calculadora aislada, sino como un expediente técnico-científico automatizable, portable y defendible.

Toda variable o resultado técnico relevante del expediente deberá poder acompañarse de:

- fórmula matemática utilizada,
- definición de variables,
- unidades,
- valores aplicados,
- resultado obtenido,
- fuente computacional,
- trazabilidad dentro del flujo HidroFlow.

Frente futuro recomendado:

OT-EXP-FORM-001 — Fórmulas matemáticas trazables del expediente hidrológico.

Este frente deberá incorporar explícitamente al expediente las expresiones matemáticas que dan lugar a resultados como CN, S, Ia, Pe, IDF, Tc, Q-Tr, Qp, volumen, ratio de consistencia y Método Racional.
