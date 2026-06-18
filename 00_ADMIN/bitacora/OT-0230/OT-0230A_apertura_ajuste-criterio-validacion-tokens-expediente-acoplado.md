# OT-0230A — Ajuste criterio validación tokens inválidos expediente acoplado

## Objetivo

Ajustar el criterio del validador OT-0229 para que la detección de tokens inválidos se aplique sobre la salida documental generada del expediente y no sobre todo el código fuente, sin modificar el acople ni archivos funcionales.

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
- Modificar únicamente el validador OT-0229 y la bitácora documental de OT-0230.

## Próximo frente recomendado

OT-0231 — Revalidación expediente con bloque restricciones y advertencias generales acoplado
