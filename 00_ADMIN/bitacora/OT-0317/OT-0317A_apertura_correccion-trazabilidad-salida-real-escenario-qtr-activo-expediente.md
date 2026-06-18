# OT-0317A — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente

## Objetivo

Corregir de forma mínima y controlada la trazabilidad de la salida real/exportable del bloque Escenario Q-Tr activo del expediente hidrológico mínimo, para que exponga explícitamente el periodo de retorno activo y el Q-Tr activo disponibles desde el contexto de cuenca, sin recalcular Q-Tr, sin seleccionar periodo de retorno adoptado, sin modificar motor, sin modificar UI, sin modificar ComparadorMultiMetodo.jsx y sin alterar otros bloques del expediente.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar construirBloqueResumenQ5AuditadoExpediente.js.
- No modificar helpers no relacionados con Q-Tr.
- No crear helper funcional nuevo.
- No acoplar otros helpers en esta OT.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No modificar bloque Resumen Q-5 auditado.
- No modificar bloque Método Racional.
- No modificar bloque Contraste Q-5 vs Método Racional.
- No modificar bloque Control de consistencia cruzada Pe–Área–Volumen/Q-5.
- Modificar únicamente lo estrictamente necesario para que el bloque Escenario Q-Tr activo exponga periodo de retorno activo y Q-Tr activo desde contexto.
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
- No tocar Método Racional funcionalmente.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0318 — Revalidación salida real Escenario Q-Tr activo corregido del expediente
