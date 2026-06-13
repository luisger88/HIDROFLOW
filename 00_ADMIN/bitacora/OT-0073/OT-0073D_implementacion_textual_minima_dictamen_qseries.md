# OT-0073D — Implementación textual mínima del dictamen qSeries

Fecha: 2026-06-12 20:26:32

## Estado base

- Rama: ot-0073-dictamen-operativo-estado-qseries.
- OT-0073A cerrada en commit 429e500.
- OT-0073B cerrada en commit 86c0b42.
- OT-0073C cerrada en commit 4b151a2.
- Alcance: inserción textual mínima en panel existente.

## Objetivo

Incorporar el dictamen operativo qSeries dentro del panel qSeries existente, sin crear un panel adicional, sin mostrar qSeries cruda y sin calcular métricas morfológicas.

## Texto incorporado

Dictamen operativo: las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por método.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0073D queda completa cuando el dictamen operativo qSeries aparezca dentro del panel existente, el build Vite apruebe y no se hayan alterado motor, tabla Q-5 ni resultados hidrológicos.
