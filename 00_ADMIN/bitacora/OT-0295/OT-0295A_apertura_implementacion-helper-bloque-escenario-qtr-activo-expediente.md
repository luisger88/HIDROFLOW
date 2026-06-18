# OT-0295A — Implementación helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Implementar de forma aislada el helper puro documental construirBloqueEscenarioQTrActivoExpediente para el bloque Escenario Q-Tr activo — control de trazabilidad del expediente hidrológico mínimo, sin acoplarlo al constructor principal, sin modificar comparador ni motor, y sin recalcular Q-Tr.

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
- No modificar construirBloqueTiempoConcentracionRolesTcExpediente.js.
- No modificar construirBloqueVolumenReferenciaExpediente.js.
- Crear únicamente el helper construirBloqueEscenarioQTrActivoExpediente.js como archivo funcional nuevo.
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir código funcional existente en esta OT.
- No implementar acople al constructor principal.
- No acoplar nuevos helpers en esta OT.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No validar formalmente valores hidrológicos.
- No recalcular Tc.
- No modificar Tc_final.
- No seleccionar Tc adoptado.
- No recalcular Q-Tr.
- No seleccionar periodo de retorno adoptado.
- No emitir dictamen de suficiencia hidrológica.
- No recalcular CN.
- No recalcular CN base.
- No recalcular CN efectivo.
- No recalcular AMC.
- No recalcular volumen.
- No modificar Pe.
- No modificar área.
- No modificar fórmula de volumen.
- No tocar Q-Tr funcionalmente.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0296 — Validación aislada helper bloque Escenario Q-Tr activo del expediente
