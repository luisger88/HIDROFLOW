# OT-0255A — Decisión integración helper Parámetros hidrológicos base del expediente

## Objetivo

Decidir la integración futura del helper construirBloqueParametrosHidrologicosBaseExpediente dentro del expediente hidrológico mínimo, con base en la validación aislada aprobada OT-0254, sin acoplar todavía ni modificar código funcional.

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
- Crear únicamente documentación OT-0255.

## Próximo frente recomendado

OT-0256 — Diseño punto acople helper Parámetros hidrológicos base del expediente
