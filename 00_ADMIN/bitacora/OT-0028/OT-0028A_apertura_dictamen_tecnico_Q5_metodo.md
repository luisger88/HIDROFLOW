# OT-0028A — Apertura dictamen técnico Q-5 por método

## Objetivo

Abrir el frente de dictamen técnico automático por método Q-5, usando la información ya disponible en el Comparador Hidrológico Multi-Método.

## Problema

Después de OT-0020 a OT-0027, Q-5 ya muestra referencia de volumen esperado, semáforo de escala, jerarquía metodológica, métricas temporales y clasificación temporal. Sin embargo, el usuario todavía debe integrar manualmente esa información para interpretar cada método.

## Tesis

Cada método Q-5 debe mostrar una síntesis ejecutiva que traduzca métricas y estados técnicos en una lectura directa y defendible.

## Alcance

- Generar dictamen textual por método.
- Usar rol metodológico, escala de volumen y estado temporal.
- No recalcular hidrogramas.
- No modificar Qp, Tp, Volumen ni Q(t).
- No modificar motor hidrológico.

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
