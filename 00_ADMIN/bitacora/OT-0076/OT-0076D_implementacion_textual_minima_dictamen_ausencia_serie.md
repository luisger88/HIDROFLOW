# OT-0076D — Implementación textual mínima del dictamen de ausencia de serie temporal

Fecha: 2026-06-12 22:18:54

## Estado base

- Rama: ot-0076-dictamen-ausencia-serie-temporal-hidrogramas.
- OT-0076A cerrada en commit 80dffdc.
- OT-0076B cerrada en commit 4638eb0.
- OT-0076C cerrada en commit e1507b6.
- Alcance: inserción textual mínima dentro del bloque Resumen estructural de hidrogramas.

## Objetivo

Incorporar el dictamen de ausencia de serie temporal publicada dentro del bloque Resumen estructural de hidrogramas existente, sin crear panel adicional y sin modificar cálculos hidrológicos.

## Texto incorporado

Dictamen de serie temporal: el objeto hidrogramas contiene resultados resumen para los 5 métodos evaluados, incluyendo Qpico, tPico y volTotal, pero no publica una serie temporal Q(t) reconocible. No procede calcular métricas morfológicas de forma hasta disponer de qSeries reales o normalizadas por método.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No mostrar puntos tiempo-caudal.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0076D queda completa cuando el dictamen de ausencia de serie temporal aparezca dentro del bloque Resumen estructural de hidrogramas, el build Vite apruebe y no se hayan alterado motor, tabla Q-5 ni resultados hidrológicos.
