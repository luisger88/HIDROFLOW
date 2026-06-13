# OT-0074D — Helper puro de resumen estructural de hidrogramas runtime

Fecha: 2026-06-12 21:05:12

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- OT-0074A cerrada en commit eb8f82b.
- OT-0074B cerrada en commit caa8bfd.
- OT-0074C cerrada en commit 4e7ac9a.
- Alcance: crear helper puro aislado y validación local.
- Working tree previo: limpio.

## Objetivo

Crear un helper puro resumirEstructuraHidrogramas.js para inspeccionar estructura de hidrogramas en runtime sin imprimir series completas, sin recalcular hidrogramas, sin tocar el motor y sin alterar Qp, Tp, Volumen ni Q(t).

## Archivos previstos

- 01_APP/HIDROFLOW/src/services/hidrogramas/resumirEstructuraHidrogramas.js
- 01_APP/HIDROFLOW/scripts/validarResumenEstructuraHidrogramasOt0074d.mjs

## Función esperada

El helper debe recibir hidrogramas y devolver un resumen estructural:

- tipoEntrada.
- totalCandidatos.
- candidatos.
- claves principales por candidato.
- presencia de qSeries, series, serie, data o points.
- longitud de posibles series.
- claves del primer punto.
- presencia de Qpico, tPico y volTotal o aliases.
- conteos agregados.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No imprimir qSeries completa.
- No imprimir arrays largos.
- No calcular De, W50, W25, pendientes ni asimetría.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0074D queda completa cuando exista helper puro versionado, validación local aprobada y working tree limpio tras commit/push.
