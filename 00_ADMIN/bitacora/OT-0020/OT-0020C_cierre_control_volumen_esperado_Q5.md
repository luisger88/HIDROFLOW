# OT-0020C — Cierre control volumen esperado Q-5

## Objetivo

Cerrar la OT-0020 consolidando el control preliminar de volumen esperado frente a los volúmenes mostrados en el bloque Q-5.

## Resultado práctico

Se agregó una referencia de escala basada en:

Pe(mm) × Área(km²) × 1000

para comparar preliminarmente el volumen esperado de lluvia efectiva contra los volúmenes reportados por los métodos Q-5.

## Corrección aplicada

Se corrigió la escala de Pe para evitar sumar una serie acumulada como si fuera lluvia incremental.

La referencia usa un valor representativo de lluvia efectiva total y evita inflar artificialmente el volumen esperado.

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

El build fue aprobado.

La referencia de volumen esperado fue validada visualmente en el bloque Q-5.

## Dictamen

OT-0020 entrega un control físico preliminar de escala para interpretar los volúmenes Q-5 como resultados no adoptivos hasta auditoría formal.

## Estado

OT-0020 lista para PR.
