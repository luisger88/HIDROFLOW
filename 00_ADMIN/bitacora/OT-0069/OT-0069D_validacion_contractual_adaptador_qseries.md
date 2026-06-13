# OT-0069D — Validación contractual extendida del adaptador qSeries

Fecha: 2026-06-12 19:10:53

## Estado base

- Rama: ot-0069-adaptador-no-invasivo-publicacion-qseries.
- OT-0069A cerrada: diseño del adaptador no invasivo qSeries.
- OT-0069B cerrada: auditoría del punto de integración.
- OT-0069C cerrada: servicio puro adaptarQSeriesHidrogramas.js y validación mínima.
- Alcance: validación contractual extendida del adaptador puro.
- Working tree previo: limpio.

## Objetivo

Validar contractualmente el servicio puro adaptarQSeriesHidrogramas.js con casos extendidos, sin modificar el servicio salvo que la validación detecte un bug real.

## Casos a validar

- Entrada como arreglo directo.
- Entrada como objeto con metodos.
- Entrada como objeto con resultados.
- qSeries con objetos { tiempoMin, caudalM3s }.
- qSeries con arreglos [t, q].
- qSeries corta con menos de tres puntos.
- qSeries desordenada en tiempo.
- qSeries con caudal negativo.
- Método sin serie temporal.
- Inconsistencia entre Qpico y máximo de qSeries.
- Inconsistencia entre tPico y tiempo del máximo.
- dtMin reportado.
- dtMin inferido.

## Restricciones

- No modificar hidroEngine.js.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular todavía De, W50, W25, pendientes ni asimetría.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0069D queda completa cuando exista una validación contractual extendida ejecutable del adaptador qSeries, con resultados esperados aprobados y sin cambios funcionales sobre UI, motor o cálculos hidrológicos.
