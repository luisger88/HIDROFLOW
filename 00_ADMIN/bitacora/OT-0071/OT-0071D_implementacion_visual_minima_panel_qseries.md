# OT-0071D — Implementación visual mínima del panel qSeries

Fecha: 2026-06-12 19:52:39

## Estado base

- Rama: ot-0071-panel-diagnostico-qseries-no-invasivo.
- OT-0071A cerrada en commit ff31cc8.
- OT-0071B cerrada en commit 2560838.
- OT-0071C cerrada en commit 4aa7058.
- diagnosticoQSeries ya existe internamente desde OT-0070.
- Alcance: panel visual mínimo no invasivo.

## Objetivo

Implementar un panel visual mínimo qSeries, ubicado antes del Bloque Q-5, usando únicamente diagnosticoQSeries.resumen, sin exponer series crudas ni calcular métricas morfológicas.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0071D queda completa cuando el panel qSeries mínimo renderice, el build Vite apruebe y no se hayan alterado motor, Qp, Tp, Volumen ni Q(t).
