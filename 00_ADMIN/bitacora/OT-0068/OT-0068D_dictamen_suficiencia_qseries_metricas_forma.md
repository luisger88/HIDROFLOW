# OT-0068D — Dictamen de suficiencia de qSeries para métricas de forma Q(t)

Fecha: 2026-06-12 18:27:45

## Estado base

- Rama: ot-0068-coherencia-fisica-forma-qt.
- OT-0068A cerrada en commit 71dbbdb.
- OT-0068B cerrada en commit 4e29219.
- OT-0068C cerrada en commit 9114f81.
- Working tree previo al dictamen: limpio.

## Objetivo

Emitir un dictamen técnico sobre la suficiencia de qSeries y de la estructura temporal disponible para calcular métricas de forma Q(t), incluyendo duración efectiva De, W50, W25, pendientes relativas y asimetría subida/recesión.

## Evidencia consolidada de OT-0068B/C

- El comparador consume contextoBase?.hidrogramas.
- La extracción funcional actualmente usada en ComparadorMultiMetodo.jsx obtiene valores resumen de Qp, Tp y volumen.
- Los alias confirmados para Qp incluyen Qp, qp, Qpico, qPico, q_pico, caudalPico y caudal_pico.
- Los alias confirmados para Tp incluyen Tp, tp, tPico, TPico, t_pico, tiempoPico y tiempo_pico.
- Los alias confirmados para volumen incluyen volumen, V, vol, volume, volTotal, vol_total y volumenTotal.
- La auditoría focal no confirmó todavía una publicación normalizada y consumida por el comparador de qSeries con pares tiempo–caudal por método.

## Dictamen técnico

Con la evidencia disponible en OT-0068B y OT-0068C, la estructura actualmente consumida por el comparador es suficiente para auditar Qp, Tp y volumen, pero no queda suficientemente demostrada para calcular de forma robusta métricas morfológicas completas de Q(t).

Por tanto, no se debe calcular todavía De, W50, W25, pendientes relativas ni asimetría como métricas operativas en UI hasta confirmar o publicar una estructura qSeries normalizada por método.

## Requisito mínimo para calcular métricas de forma

Cada método de hidrograma debe exponer una serie temporal ordenada con, como mínimo:

- Identificador del método.
- qSeries como arreglo.
- Campo temporal por punto: t, tiempo, min, minuto, tMin o equivalente normalizado.
- Campo de caudal por punto: q, Q, caudal, y, valor o equivalente normalizado.
- Longitud suficiente de la serie para detectar cruce de umbrales 25%, 50% y 10% de Qp.
- Orden temporal ascendente.
- Consistencia entre Qp reportado y máximo de la serie.
- Consistencia entre Tp reportado y tiempo del máximo de la serie.

## Métricas diferidas

- Duración efectiva De.
- W50.
- W25.
- Relación W50/Tp.
- Relación W25/Tp.
- Asimetría subida/recesión.
- Pendiente relativa de subida.
- Pendiente relativa de recesión.

## Decisión técnica

OT-0068D no autoriza todavía el cálculo de métricas de forma Q(t) en UI. La ruta correcta es abrir una fase posterior para definir un contrato de publicación de qSeries o un adaptador no invasivo que exponga la serie temporal completa desde los hidrogramas existentes.

## Restricciones cumplidas

- No se modificó ComparadorMultiMetodo.jsx.
- No se modificó HidroFlow.jsx.
- No se modificó hidroEngine.js.
- No se recalcularon hidrogramas.
- No se alteraron Qp, Tp, Volumen ni Q(t).
- No se generó PDF, Word ni mapas.

## Siguiente fase recomendada

OT-0068E — Contrato de publicación de qSeries para métricas de forma Q(t).

Objetivo de OT-0068E: definir una estructura mínima, normalizada y no invasiva para publicar qSeries por método sin recalcular hidrogramas ni modificar el motor.

## Criterio de cierre

OT-0068D queda completa cuando exista un dictamen versionado que indique si qSeries es suficiente para métricas de forma o si debe definirse primero un contrato de publicación temporal.
