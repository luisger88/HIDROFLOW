# OT-0278A — Contrato bloque Volumen de referencia del expediente

## Objetivo

Definir el contrato documental del bloque Volumen de referencia del expediente hidrológico mínimo, estableciendo título, líneas mínimas, campos permitidos, fallbacks, tokens prohibidos y restricciones de frontera, sin modificar código funcional ni recalcular volumen.

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
- No modificar helpers existentes.
- No crear helper en esta OT.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir código funcional en esta OT.
- No tocar directamente el arreglo principal texto.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
- No validar valores hidrológicos.
- No recalcular Tc.
- No modificar Tc_final.
- No seleccionar Tc adoptado.
- No emitir dictamen de suficiencia hidrológica.
- No recalcular CN.
- No recalcular CN base.
- No recalcular CN efectivo.
- No recalcular AMC.
- No recalcular volumen.
- No modificar Pe.
- No modificar área.
- No modificar fórmula de volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).
- Crear únicamente documentación OT-0278.

## Próximo frente recomendado

OT-0279 — Diseño helper bloque Volumen de referencia del expediente
