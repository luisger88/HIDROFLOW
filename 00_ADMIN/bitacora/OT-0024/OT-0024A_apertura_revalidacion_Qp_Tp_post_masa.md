# OT-0024A — Apertura revalidación Qp–Tp post normalización de masa

## Objetivo

Abrir la revalidación de Qp y Tp en el bloque Q-5 después de la corrección de conservación de masa aplicada en OT-0022 y la reclasificación metodológica aplicada en OT-0023.

## Problema

Los volúmenes Q-5 ya quedaron alineados con la referencia física Pe(mm) × Área(km²) × 1000, pero persisten alertas Tc/Tp y diferencias relevantes en Qp y Tp entre métodos.

## Tesis

Después de corregir la masa, la siguiente validación debe enfocarse en la coherencia temporal y la forma del hidrograma, no en volver a modificar el volumen.

## Alcance inicial

- Revisar Qp post-normalización.
- Revisar Tp post-normalización.
- Revisar alertas Tc/Tp persistentes.
- Verificar qué métodos quedan como candidatos, variantes o comparativos.
- No modificar el motor en esta fase.

## Restricciones

- No usar caudales externos como fundamento de corrección.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
