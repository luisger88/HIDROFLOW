# OT-0017C — Cierre escenarios hidrológicos Tc para Q(t)

## Objetivo

Cerrar la OT-0017 consolidando la exposición explícita de escenarios Tc en el módulo Hidrogramas, sin alterar el cálculo operativo Q(t).

## Resultado práctico

Se agregó en Hidrogramas un bloque visual de escenarios Tc que muestra:

- Tc operativo Q(t).
- Tc global del Índice Hidrológico.
- Tc especializado del Comparador como pendiente.

El bloque permite entender que el hidrograma se calcula con una ruta operativa interna y que los demás Tc son referencias o escenarios de comparación.

## Decisión técnica

No se implementa un toggle para forzar el Tc global sobre Hidrogramas.

No se modifica la física del módulo Q(t).

No se recalculan Qp, Tp, Volumen ni la forma del hidrograma.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se forzó Tc global sobre Hidrogramas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Dictamen

OT-0017 entrega un resultado práctico: los escenarios Tc quedan visibles en Hidrogramas sin romper el cálculo operativo.

La comparación matemática entre escenarios queda para una OT posterior, donde se podrá evaluar Qp, Tp, Volumen y forma Q(t) bajo escenarios controlados.

## Estado

OT-0017 lista para PR.
