# OT-0313A — Revalidación salida real helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Revalidar la salida real/exportable del expediente hidrológico mínimo tras la integración y validación del acople del helper construirBloqueResumenQ5AuditadoExpediente, comprobando presencia única del bloque Resumen Q-5 auditado, contenido documental esperado, ausencia de tokens inválidos, ausencia de duplicidades, estabilidad del constructor, ausencia de modificación funcional, sin recalcular Q-5 ni reinterpretar resultados Q-5.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirExpedienteHidrologicoMinimo.js.
- No modificar construirBloqueResumenQ5AuditadoExpediente.js.
- No modificar helpers existentes.
- No crear helper funcional nuevo.
- No modificar validadores existentes.
- Crear únicamente documentación OT-0313 y script de revalidación OT-0313.
- No automatizar commits.
- No corregir código funcional en esta OT.
- No acoplar otros helpers en esta OT.
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

## Próximo frente recomendado

OT-0314 — Decisión siguiente bloque delegable del expediente hidrológico mínimo
