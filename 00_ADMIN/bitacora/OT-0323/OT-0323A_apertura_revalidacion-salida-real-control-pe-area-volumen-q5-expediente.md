# OT-0323A — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5

## Objetivo

Revalidar la salida real/exportable del expediente hidrológico mínimo para el bloque Control de consistencia cruzada Pe–Área–Volumen/Q-5, comprobando que el bloque existe, aparece una sola vez, queda después del bloque Contraste Q-5 vs Método Racional, queda antes del Diagnóstico temporal Q(t), expone la lectura de control interno preliminar, no contiene tokens inválidos, no recalcula volumen, no recalcula Q-5, no modifica motor, no modifica UI, no modifica ComparadorMultiMetodo.jsx y no altera otros bloques del expediente.

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
- No corregir código funcional en esta OT.
- Crear únicamente documentación OT-0323 y reporte de revalidación.
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

OT-0324 — Corrección salida real Control Pe–Área–Volumen/Q-5 si aplica
