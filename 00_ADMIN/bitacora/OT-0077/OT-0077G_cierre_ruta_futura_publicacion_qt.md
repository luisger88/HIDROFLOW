# OT-0077G — Cierre de ruta futura de publicación Q(t)

Fecha: 2026-06-12 23:04:06

## Estado base

- Rama: ot-0077-ruta-publicacion-futura-series-qt.
- OT-0077A cerrada en commit 4a15a9c.
- OT-0077B cerrada en commit b7f231c.
- OT-0077C cerrada en commit c86350f.
- OT-0077D cerrada en commit d3b88d4.
- OT-0077E cerrada en commit c1d6eb2.
- OT-0077F cerrada en commit 54a6a79.
- Working tree previo al cierre: limpio.

## Resultado de OT-0077

- Se diseñó la ruta futura para publicación de series Q(t).
- Se auditaron rutas candidatas de publicación Q(t).
- Se dictaminó que no existe ruta viable inmediata desde el comparador.
- Se diseñó la auditoría focal del punto de generación o pérdida de Q(t).
- Se auditó en código el punto de generación o pérdida de Q(t).
- Se dictaminó que la pérdida/no publicación ocurre antes de la llegada al comparador.

## Evidencia consolidada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- El adaptador qSeries reporta estado No disponible.

## Decisión técnica

OT-0077 cierra que la publicación real de Q(t) no debe hacerse desde el comparador con los objetos actuales. La ruta viable debe ubicarse aguas arriba, en el punto de generación, retención o publicación al contexto.

## Restricciones cumplidas

- No se modificó ComparadorMultiMetodo.jsx.
- No se modificó HidroFlow.jsx.
- No se modificó hidroEngine.js.
- No se recalcularon hidrogramas.
- No se reconstruyó qSeries desde valores resumen.
- No se inventaron puntos tiempo-caudal.
- No se interpoló sin serie real.
- No se calcularon métricas morfológicas.

## Siguiente fase recomendada

OT-0078 — Auditoría aguas arriba del cálculo/resumen de hidrogramas.

## Criterio de cierre

OT-0077 queda lista para Pull Request hacia main como ruta futura de publicación de series Q(t).
