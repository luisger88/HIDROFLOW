# OT-0033C — Cierre expediente hidrológico mínimo de cuenca activa

## Objetivo

Cerrar la OT-0033 consolidando la primera salida de expediente hidrológico mínimo de cuenca activa en HidroFlow.

## Resultado práctico

Se incorporó un botón para copiar el expediente hidrológico mínimo desde el Comparador Hidrológico Multi-Método.

El expediente consolida:

- identificación de la cuenca activa;
- área de cuenca;
- fuente de contexto;
- CN, CN base, CN efectivo y AMC;
- Tc del comparador;
- roles Tc;
- lluvia efectiva total;
- volumen esperado;
- resumen Q-5 auditado;
- restricciones técnicas respetadas.

## Botones disponibles

El bloque Q-5 ahora cuenta con dos salidas reproducibles:

- Copiar resumen técnico Q-5.
- Copiar expediente hidrológico mínimo.

## Decisión técnica

La salida es informativa y reproducible.

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

El botón Copiar expediente hidrológico mínimo fue validado visualmente en el Comparador Q-5.

El working tree quedó limpio después del push.

## Dictamen

OT-0033 convierte la lectura hidrológica auditada en un expediente mínimo copiable, acercando HidroFlow a la visión de producto: cuenca activa, parámetros hidrológicos, roles Tc, volumen esperado, Q-5 auditado y restricciones técnicas en una salida reproducible.

## Estado

OT-0033 lista para PR.
