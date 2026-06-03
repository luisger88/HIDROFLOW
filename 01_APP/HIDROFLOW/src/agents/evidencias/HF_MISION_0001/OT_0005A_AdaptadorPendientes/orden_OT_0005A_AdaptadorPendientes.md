# Orden OT-0005-A — Adaptador de pendientes

## Objetivo

Diseñar una capa de normalización de pendientes previa al uso en hidroEngine.js.

## Contexto

OT-0005 definió tipos de pendientes (Sc, Scp, So, Sp).

Problema:

El motor actual recibe pendiente_cuenca sin validar unidad ni tipo.

## Mandato cerrado

- Diseñar función adaptadora de pendientes.
- Estandarizar unidades antes del motor.
- Evitar modificaciones directas al hidroEngine.

## Principio

Input → Adaptador → Motor

## Reglas

- Nunca pasar pendientes sin unidad explícita.
- Cada método debe recibir pendiente en formato correcto.

## Resultado esperado

Un sistema donde todas las pendientes llegan normalizadas al motor.
