# OT-0329A — Corrección salida real Sello técnico de generación

## Objetivo

Corregir de forma mínima y controlada la salida real/exportable del bloque Sello técnico de generación del expediente hidrológico mínimo, para que exponga autor técnico y tipo auxiliar cuando existan datos disponibles en contexto, conservando herramienta, tipo de salida, versión del expediente, fecha de generación y alcance, sin recalcular resultados, sin modificar motor, sin modificar UI, sin modificar ComparadorMultiMetodo.jsx y sin alterar otros bloques del expediente.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirBloqueEscenarioQTrActivoExpediente.js.
- No modificar construirBloqueResumenQ5AuditadoExpediente.js.
- No modificar helpers no relacionados con Sello técnico de generación.
- No crear helper funcional nuevo.
- No crear validador permanente nuevo.
- No acoplar otros helpers en esta OT.
- Modificar únicamente lo estrictamente necesario para que el bloque Sello técnico de generación exponga autor técnico y tipo auxiliar.
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

OT-0330 — Revalidación salida real Sello técnico de generación corregido
