# OT-0025C — Cierre diagnóstico forma temporal Q(t)

## Objetivo

Cerrar la OT-0025 consolidando el diagnóstico analítico de la forma temporal de los hidrogramas Q(t) después de la corrección de conservación de masa.

## Resultado

Se confirmó que, después de OT-0022, la masa y el volumen de los hidrogramas Q-5 quedaron controlados frente a la referencia física.

Las alertas Tc/Tp persistentes se interpretan ahora como advertencias de forma temporal, no como falla de conservación de masa.

## Diagnóstico

La relación Tp/Tc sigue siendo el control visual principal para advertir que un hidrograma puede tener una forma temporal no conciliada con el Tc de referencia.

La forma temporal debe evaluarse por método antes de cualquier adopción técnica.

## Decisión técnica

No se modifica el motor en esta OT.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

La evaluación detallada de métricas temporales queda para una OT posterior.

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Dictamen

OT-0025 separa claramente la falla ya corregida de masa de la revisión pendiente de forma temporal.

El siguiente frente recomendado es calcular métricas temporales por método: Tp/Tc, duración equivalente, Qp/Volumen y ancho efectivo del hidrograma.

## Estado

OT-0025 lista para PR.
