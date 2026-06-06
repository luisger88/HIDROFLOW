# OT-0036A — Apertura tabla Q-5 en expediente hidrológico mínimo

## Objetivo

Abrir el frente para incorporar una tabla Q-5 resumida dentro del expediente hidrológico mínimo copiado desde HidroFlow.

## Problema

OT-0035 validó que el expediente hidrológico mínimo se copia correctamente y contiene campos críticos completos. Sin embargo, el expediente todavía resume Q-5 de forma textual y no incluye una tabla compacta por método.

## Objetivo práctico

Agregar al expediente copiado una tabla resumida Q-5 con:

- método;
- Qp;
- Tp;
- Volumen;
- estado temporal;
- dictamen técnico.

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
