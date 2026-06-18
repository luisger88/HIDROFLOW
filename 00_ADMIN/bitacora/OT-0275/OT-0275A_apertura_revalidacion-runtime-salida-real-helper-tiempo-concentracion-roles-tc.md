# OT-0275A — Revalidación runtime salida real helper Tiempo de concentración y roles Tc

## Objetivo

Revalidar que la corrección OT-0274 eliminó el error runtime trDisenoActivoExpediente is not defined y que la salida real del constructor principal usa correctamente el helper construirBloqueTiempoConcentracionRolesTcExpediente, sin corregir código funcional.

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
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir código funcional en esta OT.
- No tocar directamente el arreglo principal texto.
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
- Crear únicamente documentación y script de validación OT-0275.

## Próximo frente recomendado

OT-0276 — Decisión estabilización bloque Tiempo de concentración y roles Tc del expediente
