# OT-0021C — Cierre semáforo escala Volumen Q-5

## Objetivo

Cerrar la OT-0021 consolidando la clasificación visual de escala para los volúmenes mostrados en el bloque Q-5 del Comparador Hidrológico Multi-Método.

## Resultado práctico

Se agregó un semáforo visual junto al Volumen de cada método Q-5, comparando el volumen calculado contra el volumen esperado incorporado en OT-0020.

La relación usada es:

Volumen método / Volumen esperado

## Criterio aplicado

- Relación <= 2: escala razonable.
- 2 < Relación <= 10: revisar escala.
- Relación > 10: fuera de escala.

## Decisión técnica

El semáforo es informativo y no modifica resultados.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

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

El cambio fue validado visualmente en el bloque Q-5.

El build fue aprobado después de sincronizar la rama con main.

## Dictamen

OT-0021 entrega una capa práctica de lectura técnica: cada volumen Q-5 queda clasificado frente a una referencia física preliminar de escala.

La explicación matemática de las desviaciones queda para OT-0022, enfocada en conservación de masa de Q(t).

## Estado

OT-0021 lista para PR.
