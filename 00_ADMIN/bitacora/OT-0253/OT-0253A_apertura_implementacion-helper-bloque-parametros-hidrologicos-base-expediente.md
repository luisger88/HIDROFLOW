# OT-0253A — Implementación helper bloque Parámetros hidrológicos base del expediente

## Objetivo

Implementar el helper puro construirBloqueParametrosHidrologicosBaseExpediente para representar documentalmente CN, CN base, CN efectivo y AMC, sin acoplarlo todavía al constructor principal ni modificar código funcional existente.

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
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- Crear únicamente el helper puro nuevo.
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

## Próximo frente recomendado

OT-0254 — Validación aislada helper Parámetros hidrológicos base del expediente
