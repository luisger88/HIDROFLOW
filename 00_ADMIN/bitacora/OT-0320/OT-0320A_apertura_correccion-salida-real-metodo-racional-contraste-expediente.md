# OT-0320A — Corrección salida real Método Racional como contraste global independiente

## Objetivo

Corregir de forma mínima y controlada la salida real/exportable del bloque Método Racional como contraste global independiente del expediente hidrológico mínimo, para que explicite su carácter no adoptivo principal y exponga tabla racional cuando existan resultados disponibles en contexto, sin recalcular Método Racional, sin seleccionarlo como adoptado, sin seleccionar caudal racional adoptado, sin modificar motor, sin modificar UI, sin modificar ComparadorMultiMetodo.jsx y sin mezclarlo con el bloque Q-5.

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
- No modificar helpers no relacionados con Método Racional.
- No crear helper funcional nuevo.
- No acoplar otros helpers en esta OT.
- Modificar únicamente lo estrictamente necesario para que el bloque Método Racional exponga carácter no adoptivo y tabla racional desde contexto.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No modificar bloque Escenario Q-Tr activo.
- No modificar bloque Resumen Q-5 auditado.
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

OT-0321 — Revalidación salida real Método Racional corregido como contraste global independiente
