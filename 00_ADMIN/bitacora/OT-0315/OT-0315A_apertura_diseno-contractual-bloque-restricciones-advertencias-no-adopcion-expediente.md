# OT-0315A — Diseño contractual del bloque Restricciones, advertencias y no adopción automática del expediente

## Objetivo

Definir documentalmente el contrato del futuro helper puro para el bloque Restricciones, advertencias y no adopción automática del expediente hidrológico mínimo, estableciendo nombre candidato, entradas esperadas, salida documental esperada, líneas mínimas obligatorias, restricciones de no adopción, advertencias institucionales, tokens prohibidos y criterios de validación futura, sin crear helper, sin modificar código funcional, sin acoplar nuevos bloques, sin recalcular variables hidrológicas y sin emitir dictamen de suficiencia hidrológica.

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
- No crear helper funcional nuevo en esta OT.
- No crear archivo funcional nuevo en esta OT.
- No modificar validadores existentes.
- Crear únicamente documentación OT-0315.
- No crear script de validación en esta OT.
- No automatizar commits.
- No corregir código funcional en esta OT.
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
- No modificar bloque Restricciones, advertencias y no adopción automática.
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

OT-0316 — Helper puro bloque Restricciones, advertencias y no adopción automática del expediente
