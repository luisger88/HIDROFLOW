# OT-0022D — Cierre auditoría conservación de masa Q(t)

## Objetivo

Cerrar la OT-0022 consolidando la auditoría y corrección de conservación de masa en los hidrogramas Q(t) usados por el bloque Q-5.

## Evidencia

La prueba interna de control con área de 1 km² y lluvia efectiva de 1 mm demostró inflación de masa en los hidrogramas unitarios.

Resultados preliminares antes de la corrección:

- SCS: aproximadamente 8.09x.
- SCS Mod.: aproximadamente 8.09x.
- Snyder: aproximadamente 432.98x.
- Williams & Hann: aproximadamente 10.58x.
- Clark IUH: aproximadamente 12.73x.

## Causa raíz

Los hidrogramas unitarios no estaban normalizados numéricamente para conservar el volumen físico asociado a 1 mm de lluvia efectiva sobre el área de cuenca.

## Corrección aplicada

Se incorporó una normalización de hidrograma unitario para que el volumen integrado del HU corresponda al volumen objetivo:

Área(km²) × 1000 m³ por cada 1 mm de lluvia efectiva.

La corrección conserva la forma relativa del hidrograma y ajusta la escala de masa antes de la convolución.

## Resultado práctico

Después de la corrección, el bloque Q-5 muestra volúmenes alineados con la referencia física de volumen esperado.

La UI muestra relaciones de escala cercanas a 1.0x para los métodos normalizados.

## Restricciones respetadas

- No se usaron caudales externos como fundamento de corrección.
- No se usó SIATA para justificar caudales.
- No se modificó la lluvia efectiva como calibración artificial.
- No se alteró el principio físico de conservación de masa.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Validación

El cambio fue validado visualmente en Q-5.

El build fue aprobado.

El working tree quedó limpio después del commit funcional.

## Dictamen

OT-0022 corrige una falla interna crítica de conservación de masa en los hidrogramas Q(t).

Q-5 pasa de mostrar volúmenes fuera de escala a mostrar volúmenes físicamente consistentes con Pe(mm) × Área(km²) × 1000.

## Estado

OT-0022 lista para PR.
