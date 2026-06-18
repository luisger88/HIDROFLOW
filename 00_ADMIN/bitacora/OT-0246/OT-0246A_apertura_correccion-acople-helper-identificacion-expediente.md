# OT-0246A — Corrección acople helper Identificación del expediente

## Objetivo

Corregir el acople del helper construirBloqueIdentificacionExpedienteMinimo para que la salida real del constructor principal construirExpedienteHidrologicoMinimo use el bloque delegado de Identificación, sin modificar helper, comparador, motor ni bloques hidrológicos sensibles.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- Modificar únicamente construirExpedienteHidrologicoMinimo.js como archivo funcional.
- No modificar construirBloqueIdentificacionExpedienteMinimo.js.
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0247 — Revalidación acople helper Identificación del expediente
