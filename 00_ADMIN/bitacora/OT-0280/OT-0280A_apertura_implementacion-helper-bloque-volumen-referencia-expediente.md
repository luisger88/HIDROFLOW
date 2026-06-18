# OT-0280A — Implementación helper bloque Volumen de referencia del expediente

## Objetivo

Implementar el helper puro documental construirBloqueVolumenReferenciaExpediente para el bloque Volumen de referencia del expediente hidrológico mínimo, sin acoplarlo al constructor principal, sin modificar comparador, sin tocar motor y sin recalcular volumen.

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
- Crear únicamente el helper construirBloqueVolumenReferenciaExpediente.js como archivo funcional nuevo.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir código funcional existente en esta OT.
- No tocar directamente el arreglo principal texto.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No acoplar el bloque Volumen de referencia al constructor principal.
- No validar formalmente valores hidrológicos.
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

## Próximo frente recomendado

OT-0281 — Validación aislada helper bloque Volumen de referencia del expediente
