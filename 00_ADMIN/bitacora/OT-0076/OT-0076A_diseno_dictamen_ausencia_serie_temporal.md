# OT-0076A — Diseño del dictamen de ausencia de serie temporal publicada

Fecha: 2026-06-12 22:14:03

## Estado base

- Rama: ot-0076-dictamen-ausencia-serie-temporal-hidrogramas.
- Rama creada desde main limpio post OT-0075.
- Main base: eebad90, merge post PR #105.
- OT-0075 dejó expuesto y validado el resumen estructural de hidrogramas.
- Working tree inicial limpio.

## Objetivo

Diseñar un dictamen técnico explícito sobre la ausencia de serie temporal publicada en los hidrogramas disponibles para el comparador, sin modificar código funcional y sin calcular métricas morfológicas.

## Evidencia heredada de OT-0075

- Tipo entrada: object.
- Contenedor: resultados.
- Candidatos: 5.
- Con serie: 0.
- Sin serie: 5.
- Con Qpico: 5.
- Con tPico: 5.
- Con volTotal: 5.

## Lectura técnica

El objeto hidrogramas llega al comparador como contenedor de resultados con 5 candidatos. Los 5 candidatos contienen Qpico, tPico y volTotal, pero ninguno expone serie temporal reconocida por el helper estructural.

Esto confirma que el comparador dispone de resultados resumen por método, pero no de una serie temporal Q(t) publicada bajo una estructura reconocible como qSeries, series, serie, data o points.

## Dictamen propuesto

Dictamen de ausencia de serie temporal: los hidrogramas disponibles en el comparador contienen Qpico, tPico y volTotal para los 5 métodos evaluados, pero no publican una serie temporal Q(t) reconocible. En consecuencia, no procede calcular métricas morfológicas de forma como De, W50, W25, pendientes relativas o asimetría subida/recesión.

## Implicación técnica

La ausencia de serie temporal publicada impide evaluar la forma Q(t) con métricas morfológicas, aunque sí permite auditar valores resumen como Qpico, tPico y volTotal.

## Información permitida en una fase funcional posterior

- Dictamen textual de ausencia de serie temporal.
- Evidencia agregada del resumen estructural.
- Recomendación de publicar qSeries reales o normalizadas.
- Advertencia de no cálculo morfológico.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No mostrar puntos tiempo-caudal.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes relativas.
- No calcular asimetría subida/recesión.
- No inferir forma Q(t) desde Qpico, tPico o volTotal.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0076A.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Decisión técnica

OT-0076A no implementa cambios funcionales. Solo diseña el dictamen técnico de ausencia de serie temporal publicada.

## Criterio de salida

OT-0076A queda completa cuando exista diseño versionado del dictamen de ausencia de serie temporal publicada, sin cambios funcionales sobre la aplicación.
