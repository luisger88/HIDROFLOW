# OT-0257A — Implementación acople mínimo helper Parámetros hidrológicos base del expediente

## Objetivo

Implementar el acople mínimo del helper construirBloqueParametrosHidrologicosBaseExpediente dentro de la función auxiliar construirLineasParametrosHidrologicosBaseExpediente, sin modificar el helper validado, sin tocar el constructor principal directamente y sin modificar motor, comparador ni bloques hidrológicos sensibles.

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
- No modificar construirBloqueParametrosHidrologicosBaseExpediente.js.
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No intervenir directamente el arreglo principal texto del constructor.
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

OT-0258 — Validación acople helper Parámetros hidrológicos base del expediente
