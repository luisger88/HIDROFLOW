# OT-0223A — Validación aislada helper restricciones y advertencias generales del expediente

## Objetivo

Validar de forma aislada el helper puro construirBloqueRestriccionesAdvertenciasGeneralesExpediente, comprobando salida determinística, filtrado de términos sensibles, manejo de entradas vacías y ausencia de tokens inválidos, sin integrarlo al expediente operativo.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js.
- No modificar helper salvo hallazgo bloqueante.
- No modificar validadores existentes.
- No automatizar commits.
- No integrar todavía.
- No consolidar todavía.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0224 — Decisión de integración del helper restricciones y advertencias generales al expediente
