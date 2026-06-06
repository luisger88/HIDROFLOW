# OT-0033A — Apertura expediente hidrológico mínimo de cuenca activa

## Objetivo

Abrir el frente de expediente hidrológico mínimo de cuenca activa, orientado a consolidar en una salida reproducible la lectura hidrológica principal de HidroFlow.

## Visión

El usuario debe poder aportar coordenadas o seleccionar una cuenca activa, y recibir no solo números, sino una lectura hidrológica trazable, defendible y exportable.

## Alcance inicial

- Auditar datos disponibles de cuenca activa.
- Auditar datos disponibles del Índice Hidrológico.
- Auditar datos disponibles de roles Tc.
- Auditar datos disponibles del resumen Q-5 auditado.
- Preparar una salida mínima tipo expediente técnico.
- No modificar motor.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).

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
