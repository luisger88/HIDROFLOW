# OT-0073A — Diseño del dictamen operativo del estado qSeries

Fecha: 2026-06-12 20:20:11

## Estado base

- Rama: ot-0073-dictamen-operativo-estado-qseries.
- Rama creada desde main limpio post OT-0072.
- Main base: 9b73d9e, merge post PR #102.
- OT-0072 validó visual y técnicamente el panel qSeries.
- Working tree inicial limpio.

## Objetivo

Diseñar el dictamen operativo del estado qSeries para convertir los contadores del panel en una lectura técnica no adoptiva, sin calcular métricas morfológicas y sin modificar el motor hidrológico.

## Estado observado heredado de OT-0072

- Estado del panel qSeries: No disponible.
- Total de métodos evaluados: 5.
- qSeries publicados: 0.
- qSeries parciales: 0.
- qSeries no disponibles: 5.
- qSeries inconsistentes: 0.

## Lectura técnica preliminar

El panel qSeries evidencia que los métodos de hidrograma evaluados no exponen todavía series Q(t) normalizadas bajo el contrato definido en OT-0068E.

Por tanto, aunque el comparador puede mostrar Qp, Tp y Volumen, no existe base suficiente para calcular métricas de forma Q(t) como De, W50, W25, pendientes relativas o asimetría subida/recesión.

## Dictamen operativo propuesto

Estado operativo qSeries: No disponible.

Dictamen: las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma ni usar análisis de forma temporal hasta publicar qSeries reales o normalizadas por método.

## Información permitida en una fase funcional posterior

- Estado operativo qSeries.
- Dictamen textual no adoptivo.
- Recomendación técnica asociada.
- Advertencia de no cálculo morfológico.

## Información prohibida

- No mostrar qSeries cruda.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes relativas.
- No calcular asimetría subida/recesión.
- No inferir forma Q(t) sin serie temporal publicada.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0073A.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Decisión técnica

OT-0073A no implementa cambios funcionales. Solo diseña el dictamen operativo que podrá exponerse posteriormente como lectura textual del estado qSeries.

## Criterio de salida

OT-0073A queda completa cuando exista diseño versionado del dictamen operativo qSeries, sin cambios funcionales sobre la aplicación.
