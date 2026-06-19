# OT-0330A — Revalidación salida real Sello técnico de generación corregido

## Objetivo

Revalidar desde main que la corrección aplicada en OT-0329 mantiene la salida real/exportable del bloque Sello técnico de generación, comprobando que expone herramienta, autor técnico, tipo de salida, tipo auxiliar, versión del expediente, fecha de generación y alcance, sin recalcular resultados, sin modificar motor, sin modificar UI, sin modificar ComparadorMultiMetodo.jsx y sin alterar otros bloques del expediente.

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
- Crear únicamente documentación OT-0330 y reporte de revalidación.
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
- No recalcular resultados.
- No recalcular hidrogramas.
- No emitir dictamen de suficiencia hidrológica.

## Próximo frente recomendado

OT-0331 — Revalidación salida real Restricciones y advertencias técnicas
