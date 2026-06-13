# OT-0070D — Integración interna silenciosa del diagnóstico qSeries

Fecha: 2026-06-12 19:32:46

## Estado base

- Rama: ot-0070-integracion-no-invasiva-adaptador-qseries.
- OT-0070A cerrada en commit 09e84f0.
- OT-0070B cerrada en commit 37da422.
- OT-0070C cerrada en commit 8ee179d.
- Servicio disponible: adaptarQSeriesHidrogramas.js.
- Working tree previo: limpio.

## Objetivo

Integrar internamente y de forma silenciosa el diagnóstico qSeries en ComparadorMultiMetodo.jsx, usando el adaptador puro sobre contextoBase?.hidrogramas, sin modificar UI ni cálculos existentes.

## Intervención autorizada

- Agregar import de adaptarQSeriesHidrogramas.
- Crear diagnosticoQSeries con useMemo.
- Ejecutar adaptador sobre contextoBase?.hidrogramas.
- Mantener integración silenciosa y no bloqueante.

## Restricciones

- No reemplazar obtenerResultadoQMetodo.
- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.
- No crear UI visible en esta fase.

## Criterio de salida

OT-0070D queda completa cuando el diagnóstico qSeries esté integrado internamente, el build Vite apruebe y no se hayan modificado motor, UI ni resultados hidrológicos.
