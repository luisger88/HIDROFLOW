# OT-0070A — Diseño de integración no invasiva del adaptador qSeries

Fecha: 2026-06-12 19:26:19

## Estado base

- Rama: ot-0070-integracion-no-invasiva-adaptador-qseries.
- Rama creada desde main limpio post OT-0069.
- Main base: 7173ee7, merge post PR #99.
- OT-0069 dejó creado y validado el servicio puro adaptarQSeriesHidrogramas.js.
- Working tree inicial limpio.

## Objetivo

Diseñar la integración no invasiva del adaptador qSeries en el comparador o contexto exportable, sin alterar la lectura existente de Qp, Tp, Volumen ni Q(t), y sin calcular todavía métricas de forma.

## Fuente técnica heredada

- OT-0068 definió contrato qSeries para métricas de forma Q(t).
- OT-0069 creó el servicio puro adaptarQSeriesHidrogramas.js.
- OT-0069C incorporó validación mínima.
- OT-0069D incorporó validación contractual extendida.
- OT-0069E cerró el adaptador como servicio aislado sin integración UI.

## Servicio candidato

Ruta existente:

01_APP/HIDROFLOW/src/services/hidrogramas/adaptarQSeriesHidrogramas.js

Función:

adaptarQSeriesHidrogramas(hidrogramas, opciones)

## Punto conceptual de integración

El punto candidato futuro debe estar cerca del consumo actual de contextoBase?.hidrogramas en ComparadorMultiMetodo.jsx, como diagnóstico auxiliar de disponibilidad qSeries.

La integración futura debe ejecutar el adaptador sobre contextoBase?.hidrogramas y exponer solo un resumen de disponibilidad, por ejemplo:

- total.
- publicados.
- parciales.
- noDisponibles.
- inconsistentes.

## Comportamiento permitido en fase funcional posterior

- Importar adaptarQSeriesHidrogramas.
- Ejecutarlo sobre contextoBase?.hidrogramas.
- Mostrar estado de disponibilidad qSeries.
- No usar el resultado para recalcular hidrogramas.
- No usar el resultado para modificar Qp, Tp, Volumen ni Q(t).
- No calcular todavía De, W50, W25, pendientes ni asimetría.

## Comportamiento prohibido

- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No generar PDF, Word ni mapas.
- No usar SIATA para forzar caudales.

## Decisión técnica

OT-0070A no implementa integración funcional. Solo diseña la integración no invasiva. La primera integración funcional mínima queda reservada para una fase posterior de OT-0070.

## Criterio de salida

OT-0070A queda completa cuando exista el diseño versionado de integración no invasiva del adaptador qSeries, sin cambios funcionales sobre la aplicación.
