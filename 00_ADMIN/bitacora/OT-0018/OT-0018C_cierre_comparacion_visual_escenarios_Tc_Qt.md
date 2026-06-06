# OT-0018C — Cierre comparación visual de escenarios Tc para Q(t)

## Objetivo

Cerrar la OT-0018 consolidando la estructura visual inicial para comparar escenarios Tc en el módulo Hidrogramas.

## Resultado práctico

Se agregó un bloque visual en Hidrogramas que muestra escenarios Tc para Q(t):

- Operativo Q(t): activo.
- Índice global: referencia.
- Comparador: referencia especializada pendiente.

## Decisión técnica

No se recalculan hidrogramas en esta fase.

No se fuerza el Tc global sobre Hidrogramas.

No se modifica la física del módulo Q(t).

La comparación matemática real queda para una OT posterior, donde se podrán calcular Qp, Tp, Volumen y forma Q(t) bajo escenarios controlados.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Validación

El bloque visual fue validado en navegador dentro del módulo Hidrogramas.

El cambio funcional fue confirmado en la rama OT-0018 con build previo aprobado y working tree limpio.

## Dictamen

OT-0018 entrega una mejora práctica de lectura técnica: los escenarios Tc quedan estructurados visualmente sin intervenir el cálculo operativo.

## Estado

OT-0018 lista para PR.
