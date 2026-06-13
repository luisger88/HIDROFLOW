# OT-0072A — Auditoría visual y técnica del panel qSeries

Fecha: 2026-06-12 20:03:44

## Estado base

- Rama: ot-0072-validacion-visual-tecnica-panel-qseries.
- Rama creada desde main limpio post OT-0071.
- Main base: 4a478a1, merge post PR #101.
- OT-0071 dejó implementado el panel diagnóstico qSeries no invasivo.
- Working tree inicial limpio.

## Objetivo

Validar visual y técnicamente el panel diagnóstico qSeries en navegador, confirmando que aparece como lectura no invasiva antes del Bloque Q-5 y que no altera el flujo hidrológico existente.

## Elementos a validar en navegador

- El panel diagnóstico qSeries aparece visible.
- El panel se ubica antes del Bloque Q-5.
- El panel muestra estado de disponibilidad qSeries.
- El panel muestra total de métodos evaluados.
- El panel muestra publicados.
- El panel muestra parciales.
- El panel muestra no disponibles.
- El panel muestra inconsistentes.
- El Bloque Q-5 sigue visible e intacto.
- No se muestra qSeries cruda.
- No se muestran puntos tiempo-caudal.
- No aparecen métricas De, W50, W25, pendientes ni asimetría.
- No cambia el flujo de copiado del expediente.

## Validación técnica de código

Se validará que el panel usa diagnosticoQSeries.resumen y que no se introducen cálculos morfológicos ni modificaciones al motor.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0072A.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0072A queda completa cuando exista auditoría versionada de validación visual y técnica del panel qSeries, sin cambios funcionales sobre la aplicación.

## Resultado de validación

- Panel diagnóstico qSeries visible en navegador.
- Panel ubicado como lectura auxiliar antes del Bloque Q-5.
- Bloque Q-5 permanece visible e intacto.
- No se observó qSeries cruda.
- No se observaron métricas De, W50, W25, pendientes ni asimetría.
- Build Vite aprobado.
- No se modificó código funcional en esta OT.
