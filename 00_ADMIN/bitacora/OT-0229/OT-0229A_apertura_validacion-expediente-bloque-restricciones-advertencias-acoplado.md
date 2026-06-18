# OT-0229A — Validación expediente con bloque restricciones y advertencias generales acoplado

## Objetivo

Validar que el expediente hidrológico mínimo conserva estructura, secciones obligatorias, ausencia de tokens inválidos y acople único del bloque de restricciones y advertencias generales, sin modificar código funcional.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js salvo hallazgo bloqueante.
- No modificar el helper.
- No modificar validadores existentes.
- No automatizar commits.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0230 — Decisión sobre estabilización del bloque restricciones y advertencias generales
