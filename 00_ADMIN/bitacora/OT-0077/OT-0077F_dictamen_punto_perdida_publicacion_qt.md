# OT-0077F — Dictamen del punto de pérdida/publicación de Q(t)

Fecha: 2026-06-12 23:02:31

## Estado base

- Rama: ot-0077-ruta-publicacion-futura-series-qt.
- OT-0077A cerrada en commit 4a15a9c.
- OT-0077B cerrada en commit b7f231c.
- OT-0077C cerrada en commit c86350f.
- OT-0077D cerrada en commit d3b88d4.
- OT-0077E cerrada en commit c1d6eb2.
- Alcance: dictamen técnico documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico sobre el punto probable de pérdida o no publicación de la serie temporal Q(t), a partir de la auditoría focal de código, sin modificar el motor hidrológico ni recalcular hidrogramas.

## Evidencia consolidada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- El adaptador qSeries reporta estado No disponible para los métodos evaluados.
- El panel qSeries y el resumen estructural confirman ausencia de serie temporal publicada.

## Dictamen técnico

El punto operativo de pérdida o no publicación de Q(t) ocurre antes de la llegada al comparador. El comparador recibe objetos de resultados con Qpico, tPico y volTotal, pero no recibe arreglos temporales reconocibles como qSeries, series, serie, data o points.

Por tanto, no es técnicamente válido intentar publicar qSeries desde el comparador con los objetos actuales, porque implicaría reconstruir o inferir una serie temporal ausente.

## Ruta viable

La ruta viable debe enfocarse aguas arriba del comparador, en el punto donde el hidrograma se calcula o se resume. Debe identificarse si la serie Q(t) se genera y luego se descarta, o si nunca se conserva como estructura persistente.

Si la serie ya existe en origen, debe publicarse al contexto sin modificar fórmulas ni resultados. Si la serie no existe como objeto persistente, debe diseñarse una retención futura de Q(t) al momento de cálculo.

## Rutas no viables actualmente

- Adaptar qSeries desde los objetos actuales del comparador.
- Reconstruir puntos tiempo-caudal a partir de Qpico y tPico.
- Interpolar forma Q(t) desde valores resumen.
- Calcular métricas morfológicas sin serie temporal real.

## Decisión técnica

OT-0077F no autoriza cambios funcionales. La siguiente fase debe diseñar una auditoría o intervención aguas arriba para localizar el punto de cálculo/resumen del hidrograma antes de publicar qSeries.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No reconstruir qSeries desde valores resumen.
- No inventar puntos tiempo-caudal.
- No calcular métricas morfológicas.

## Criterio de salida

OT-0077F queda completa cuando exista dictamen versionado sobre el punto probable de pérdida o no publicación de Q(t), sin cambios funcionales sobre la aplicación.
