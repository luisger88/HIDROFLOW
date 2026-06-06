# OT-0036C — Cierre tabla Q-5 en expediente hidrológico mínimo

## Objetivo

Cerrar la OT-0036 consolidando la incorporación de una tabla Q-5 auditada dentro del expediente hidrológico mínimo copiado desde HidroFlow.

## Resultado práctico

El expediente hidrológico mínimo ahora incluye una tabla Q-5 resumida por método con:

- Método.
- Qp.
- Tp.
- Volumen.
- Estado temporal.
- Dictamen técnico.

## Decisión técnica

La tabla es informativa y reproducible.

No se modifica el motor.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

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

## Validación

El cambio fue aplicado sobre ComparadorMultiMetodo.jsx.

El build fue aprobado antes del commit funcional.

El working tree quedó limpio después del push.

La tabla Q-5 queda incorporada al expediente mínimo copiable.

## Dictamen

OT-0036 mejora el expediente hidrológico mínimo al incluir una tabla técnica Q-5 auditada por método, fortaleciendo la trazabilidad y utilidad del expediente como salida reproducible.

## Estado

OT-0036 lista para PR.
