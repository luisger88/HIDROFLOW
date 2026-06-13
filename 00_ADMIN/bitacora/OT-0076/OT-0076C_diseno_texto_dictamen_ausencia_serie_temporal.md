# OT-0076C — Diseño del texto del dictamen de ausencia de serie temporal

Fecha: 2026-06-12 22:17:32

## Estado base

- Rama: ot-0076-dictamen-ausencia-serie-temporal-hidrogramas.
- OT-0076A cerrada en commit 80dffdc.
- OT-0076B cerrada en commit 4638eb0.
- Alcance: diseño textual, sin cambios funcionales.

## Objetivo

Definir el texto exacto del dictamen de ausencia de serie temporal publicada que podrá incorporarse dentro del bloque Resumen estructural de hidrogramas existente, sin crear un panel adicional.

## Evidencia operativa

- Tipo entrada: object.
- Contenedor: resultados.
- Candidatos: 5.
- Con serie: 0.
- Sin serie: 5.
- Con Qpico: 5.
- Con tPico: 5.
- Con volTotal: 5.

## Texto de dictamen propuesto

Dictamen de serie temporal: el objeto hidrogramas contiene resultados resumen para los 5 métodos evaluados, incluyendo Qpico, tPico y volTotal, pero no publica una serie temporal Q(t) reconocible. No procede calcular métricas morfológicas de forma hasta disponer de qSeries reales o normalizadas por método.

## Texto de soporte propuesto

Lectura no adoptiva: este dictamen confirma ausencia de serie temporal publicada; no reconstruye puntos tiempo-caudal, no interpola hidrogramas y no modifica Qp, Tp, Volumen ni Q(t).

## Ubicación propuesta

El texto debe incorporarse dentro del bloque Resumen estructural de hidrogramas existente, después de los conteos agregados y antes de la nota final que indica que el bloque no muestra series crudas.

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

- No modificar ComparadorMultiMetodo.jsx en OT-0076C.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.

## Criterio de salida

OT-0076C queda completa cuando exista diseño versionado del texto de dictamen de ausencia de serie temporal, sin cambios funcionales sobre la aplicación.
