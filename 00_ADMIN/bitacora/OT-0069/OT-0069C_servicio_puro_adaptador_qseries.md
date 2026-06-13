# OT-0069C — Servicio puro adaptador qSeries

Fecha: 2026-06-12 19:06:14

## Estado base

- Rama: ot-0069-adaptador-no-invasivo-publicacion-qseries.
- OT-0069A diseñó el adaptador no invasivo qSeries.
- OT-0069B auditó el punto de integración.
- Alcance: crear servicio puro aislado y validación mínima.

## Objetivo

Crear un servicio puro adaptarQSeriesHidrogramas.js que reciba hidrogramas existentes y publique qSeries normalizada según el contrato OT-0068E, sin recalcular hidrogramas, sin modificar el motor y sin tocar UI.

## Archivos previstos

- 01_APP/HIDROFLOW/src/services/hidrogramas/adaptarQSeriesHidrogramas.js
- 01_APP/HIDROFLOW/scripts/validarAdaptadorQSeriesOt0069c.mjs

## Restricciones

- No modificar hidroEngine.js.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular todavía De, W50, W25, pendientes ni asimetría.

## Criterio de salida

OT-0069C queda completa cuando exista el servicio puro versionado, una validación mínima ejecutable y working tree limpio tras commit/push.
