# OT-0272A — Corrección acople salida real helper Tiempo de concentración y roles Tc del expediente

## Objetivo

Corregir la salida real del constructor principal para que el bloque Tiempo de concentración y roles Tc use la función auxiliar delegada al helper construirBloqueTiempoConcentracionRolesTcExpediente, sustituyendo únicamente el bloque inline ## 3 dentro del arreglo principal texto.

## Alcance

Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.

No implementa cambios funcionales por sí misma.

## Restricciones

- No modificar motor.
- No modificar UI.
- No modificar textoExpediente fuera del bloque Tc roles.
- No modificar ComparadorMultiMetodo.jsx.
- Modificar únicamente construirExpedienteHidrologicoMinimo.js como archivo funcional.
- No modificar construirBloqueIdentificacionExpedienteMinimo.js.
- No modificar construirBloqueParametrosHidrologicosBaseExpediente.js.
- No modificar construirBloqueTiempoConcentracionRolesTcExpediente.js.
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- Sustituir únicamente el bloque inline ## 3 Tiempo de concentración y roles Tc dentro del arreglo principal texto.
- No modificar la función auxiliar construirLineasTiempoConcentracionRolesTcExpediente.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No validar valores hidrológicos.
- No recalcular Tc.
- No modificar Tc_final.
- No seleccionar Tc adoptado.
- No decidir competencia hidrológica de Tc.
- No emitir dictamen de suficiencia hidrológica.
- No recalcular CN.
- No recalcular CN base.
- No recalcular CN efectivo.
- No recalcular AMC.
- No tocar Volumen.
- No tocar Q-Tr.
- No tocar Q-5.
- No tocar Método Racional.
- No tocar diagnóstico Q(t).

## Próximo frente recomendado

OT-0273 — Revalidación acople helper Tiempo de concentración y roles Tc del expediente
