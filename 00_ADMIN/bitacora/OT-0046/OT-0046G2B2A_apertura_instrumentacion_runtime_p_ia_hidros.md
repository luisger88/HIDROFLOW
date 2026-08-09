# OT-0046G2B2A — Instrumentación temporal no invasiva P-Ia/área/estación/hidros

## Estado previo

OT-0046G2B2 cerró el diagnóstico hidrológico preliminar de lluvia efectiva cero.

Commit:
4c71eff docs(expediente): diagnostica lluvia efectiva cero

## Hallazgo principal

Bajo parámetros esperados:

- CNact aproximado: 88,8
- Ia aproximada: 6,41 mm
- Ptotal aproximado: 73,41 mm
- P primer bloque aproximado: 11,13 mm

La condición P > Ia sí se cumple, por lo que la lluvia efectiva no debería ser cero si los valores de runtime coinciden con los supuestos auditados.

## Problema pendiente

El expediente sigue exportando valores hidrológicos dinámicos en cero.

Esto sugiere que el problema puede estar en el estado real de ejecución:

- params.area
- estación IDF activa
- Ptotal real
- CNact real
- lluvEfect real
- hidros real
- qSeries real

## Objetivo

Agregar instrumentación temporal no invasiva para medir el estado real en runtime, sin modificar fórmulas ni alterar resultados.

## Restricciones

No cambiar fórmulas hidrológicas.
No recalcular Q-5.
No modificar CN.
No modificar AMC.
No modificar IDF.
No modificar guards.
No maquillar ceros.
No dejar instrumentación permanente.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Criterio de éxito

Obtener en consola del navegador una lectura verificable de:

- CNact
- S
- Ia
- Ptotal
- Pe_rows
- Pe_total
- params.area
- estación IDF activa
- Qpico
- tPico
- volTotal
- qSeries.length

## Decisión

Esta OT autoriza únicamente instrumentación temporal controlada para diagnóstico.
