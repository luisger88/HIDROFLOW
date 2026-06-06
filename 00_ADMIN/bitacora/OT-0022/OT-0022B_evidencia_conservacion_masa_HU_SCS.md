# OT-0022B — Evidencia preliminar conservación de masa HU SCS

## Objetivo

Documentar la primera evidencia interna de conservación de masa para el hidrograma unitario SCS usado por Q(t).

## Prueba de control

Se ejecutó una prueba sintética de primeros principios:

- Área = 1 km²
- Lluvia efectiva = 1 mm
- Volumen esperado = 1.000 m³

## Resultado observado

El HU SCS produjo:

- Volumen integrado ≈ 8.087,57 m³
- Volumen esperado = 1.000 m³
- Relación ≈ 8,09x

## Dictamen

El resultado confirma una inflación de masa en el hidrograma unitario SCS.

La integración final de volumen Q(t) no parece ser la causa principal, porque usa Q × Δt(min) × 60, dimensionalmente correcto si Q está en m³/s y t en minutos.

La causa raíz preliminar está en la generación del hidrograma unitario, específicamente en la escala de sus ordenadas y en la ausencia de normalización numérica a volumen unitario.

## Implicación

Los volúmenes y caudales Q-5 no deben considerarse adoptivos hasta corregir o normalizar los hidrogramas unitarios.

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).

## Siguiente paso

Ejecutar la misma prueba 1 km² / 1 mm sobre SCS Mod, Snyder, Williams & Hann y Clark IUH para estimar el factor de inflación por método.

## Estado

Auditoría documental. Sin cambios funcionales.
