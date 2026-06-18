# OT-0309A — Decisión integración helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Documentar la decisión de integrar posteriormente el helper puro construirBloqueResumenQ5AuditadoExpediente al expediente hidrológico mínimo, con base en el contrato, diseño, implementación aislada y validación aislada con criterio ajustado, sin acoplar todavía el helper ni modificar código funcional.

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
- No modificar construirBloqueEscenarioQTrActivoExpediente.js.
- No modificar construirBloqueResumenQ5AuditadoExpediente.js.
- No modificar helpers existentes.
- No crear helper en esta OT.
- No crear archivo funcional nuevo en esta OT.
- No modificar validadores existentes.
- No automatizar commits.
- No corregir código funcional en esta OT.
- No implementar acople al constructor principal.
- No acoplar nuevos helpers en esta OT.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No modificar bloque Escenario Q-Tr activo.
- No modificar bloque Resumen Q-5 auditado.
- No validar formalmente valores hidrológicos.
- No recalcular Tc.
- No modificar Tc_final.
- No seleccionar Tc adoptado.
- No recalcular Q-Tr.
- No seleccionar periodo de retorno adoptado.
- No recalcular Q-5.
- No reinterpretar resultados Q-5.
- No recalcular hidrogramas.
- No seleccionar método Q-5 adoptado.
- No seleccionar caudal Q-5 adoptado.
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
- No tocar Q-5 funcionalmente.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).
- Crear únicamente documentación OT-0309.

## Próximo frente recomendado

OT-0310 — Diseño punto acople helper bloque Resumen Q-5 auditado del expediente
