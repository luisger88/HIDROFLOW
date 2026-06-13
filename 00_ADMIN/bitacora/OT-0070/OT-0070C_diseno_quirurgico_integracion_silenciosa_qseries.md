# OT-0070C — Diseño quirúrgico de integración silenciosa qSeries

Fecha: 2026-06-12 19:31:08

## Estado base

- Rama: ot-0070-integracion-no-invasiva-adaptador-qseries.
- OT-0070A cerrada en commit 09e84f0.
- OT-0070B cerrada en commit 37da422.
- Servicio disponible: adaptarQSeriesHidrogramas.js.
- Alcance: diseño de patch, sin cambios funcionales.

## Objetivo

Diseñar la integración silenciosa del adaptador qSeries en ComparadorMultiMetodo.jsx, sin modificar la lectura actual de Qp, Tp, Volumen ni Q(t).

## Patch funcional futuro permitido

- Importar adaptarQSeriesHidrogramas desde services/hidrogramas.
- Crear un useMemo diagnóstico sobre contextoBase?.hidrogramas.
- Leer solo resultado.resumen.
- No reemplazar obtenerResultadoQMetodo.
- No calcular métricas de forma.
- No alterar UI principal salvo fase posterior explícita.

## Punto conceptual

El diagnóstico debe derivarse de contextoBase?.hidrogramas mediante useMemo y quedar disponible como diagnosticoQSeries, sin intervenir la tabla Q-5 ni el expediente.

## Restricciones

- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.
- No reemplazar obtenerResultadoQMetodo.
- No modificar flujo de copiado.

## Criterio de salida

OT-0070C queda completa cuando exista diseño versionado del patch de integración silenciosa qSeries, sin cambios funcionales.
