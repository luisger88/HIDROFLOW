# OT-0233A — Ajuste normalizador salida documental expediente mínimo

## Objetivo

Ajustar los scripts de validación/revalidación para extraer correctamente la salida documental desde salida.texto, con base en la auditoría OT-0232, sin modificar expediente, helper, acople ni archivos críticos.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js.
- No modificar el helper.
- No modificar el acople.
- No automatizar commits.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).
- Modificar únicamente scripts de validación/revalidación y bitácora documental de OT-0233.

## Próximo frente recomendado

OT-0234 — Revalidación expediente con normalizador corregido
