# OT-0254A — Validación aislada helper Parámetros hidrológicos base del expediente

## Objetivo

Validar de forma aislada el helper puro construirBloqueParametrosHidrologicosBaseExpediente, comprobando salida string[], título opcional, campos mínimos, normalización documental, ausencia de tokens inválidos, ausencia de términos prohibidos, determinismo, no mutación y build, sin acoplarlo al constructor principal.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js.
- No modificar construirBloqueIdentificacionExpedienteMinimo.js.
- No modificar construirBloqueParametrosHidrologicosBaseExpediente.js.
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No acoplar el helper al constructor principal.
- No modificar bloque Identificación.
- No validar valores hidrológicos.
- No recalcular CN.
- No recalcular CN base.
- No recalcular CN efectivo.
- No recalcular AMC.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).
- Crear únicamente documentación y script de validación OT-0254.

## Próximo frente recomendado

OT-0255 — Decisión integración helper Parámetros hidrológicos base del expediente
