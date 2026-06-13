# OT-0073C — Diseño quirúrgico del texto de dictamen operativo qSeries

Fecha: 2026-06-12 20:23:46

## Estado base

- Rama: ot-0073-dictamen-operativo-estado-qseries.
- OT-0073A cerrada en commit 429e500.
- OT-0073B cerrada en commit 86c0b42.
- Alcance: diseño textual, sin cambios funcionales.

## Objetivo

Definir el texto exacto del dictamen operativo qSeries que podrá incorporarse dentro del panel qSeries existente, sin crear un panel adicional, sin mostrar qSeries cruda y sin calcular métricas morfológicas.

## Estado operativo observado

- Estado qSeries: No disponible.
- Total de métodos evaluados: 5.
- Publicados: 0.
- Parciales: 0.
- No disponibles: 5.
- Inconsistentes: 0.

## Texto de dictamen propuesto

Dictamen operativo: las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por método.

## Texto de soporte propuesto

Lectura no adoptiva: el panel informa disponibilidad de qSeries; no valida forma Q(t), no muestra puntos tiempo-caudal y no modifica Qp, Tp, Volumen ni Q(t).

## Ubicación propuesta

El texto debe incorporarse dentro del panel qSeries existente, después de los contadores agregados y antes de la nota final que indica que el panel no muestra qSeries cruda.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar puntos tiempo-caudal.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes.
- No calcular asimetría.
- No inferir forma Q(t) sin serie temporal publicada.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0073C.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.

## Criterio de salida

OT-0073C queda completa cuando exista diseño versionado del texto de dictamen operativo qSeries, sin cambios funcionales sobre la aplicación.
