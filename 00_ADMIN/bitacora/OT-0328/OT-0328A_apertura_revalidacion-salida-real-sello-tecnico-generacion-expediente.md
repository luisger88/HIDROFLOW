# OT-0328A — Revalidación salida real Sello técnico de generación

## Objetivo

Revalidar desde main la salida real/exportable del bloque Sello técnico de generación del expediente hidrológico mínimo, comprobando que el bloque existe, aparece una sola vez, queda después de la Validación interna del expediente exportado, queda antes de Restricciones y advertencias técnicas, expone autor, fecha de generación, versión del expediente y tipo auxiliar, no recalcula resultados, no modifica motor, no modifica UI, no modifica ComparadorMultiMetodo.jsx y no altera otros bloques del expediente.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js.
- No modificar construirBloqueEscenarioQTrActivoExpediente.js.
- No modificar construirBloqueResumenQ5AuditadoExpediente.js.
- No modificar helpers existentes.
- No crear helper funcional nuevo.
- No crear validador permanente nuevo salvo necesidad estricta.
- No corregir código funcional en esta OT.
- Crear únicamente documentación OT-0328 y reporte de revalidación.
- No automatizar commits.
- No acoplar otros helpers en esta OT.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No modificar bloque Escenario Q-Tr activo.
- No modificar bloque Resumen Q-5 auditado.
- No modificar bloque Método Racional.
- No modificar bloque Contraste Q-5 vs Método Racional.
- No modificar bloque Control de consistencia cruzada Pe–Área–Volumen/Q-5.
- No modificar bloque Diagnóstico temporal Q(t).
- No modificar bloque Validación interna del expediente exportado.
- No modificar bloque Sello técnico de generación.
- No modificar bloque Restricciones y advertencias técnicas.
- No validar formalmente valores hidrológicos.
- No recalcular Tc.
- No modificar Tc_final.
- No seleccionar Tc adoptado.
- No recalcular Q-Tr.
- No seleccionar periodo de retorno adoptado.
- No recalcular Q-5.
- No reinterpretar resultados Q-5.
- No recalcular Método Racional.
- No seleccionar Método Racional como adoptado.
- No seleccionar caudal racional adoptado.
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
- No tocar Método Racional funcionalmente.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0329 — Revalidación salida real Restricciones y advertencias técnicas
