# OT-0045A — Apertura sello técnico del expediente hidrológico

## Objetivo

Abrir el frente para incorporar un sello técnico de generación al expediente hidrológico mínimo de HidroFlow.

## Problema

OT-0044 confirmó que el expediente hidrológico mínimo tiene plausibilidad hidrológica interna preliminar. Sin embargo, la salida copiada todavía no incluye una sección final explícita de trazabilidad de generación.

## Tesis

Un expediente técnico reproducible debe indicar claramente:

- herramienta que lo generó;
- tipo de salida;
- cuenca activa;
- fecha y hora de generación;
- estado técnico del expediente;
- validaciones superadas;
- alcance no adoptivo sin revisión técnica.

## Alcance

- Agregar sección Sello técnico de generación al expediente copiado.
- No modificar cálculos.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar resultados racionales.

## Restricciones

- No usar caudales externos como fundamento.
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
