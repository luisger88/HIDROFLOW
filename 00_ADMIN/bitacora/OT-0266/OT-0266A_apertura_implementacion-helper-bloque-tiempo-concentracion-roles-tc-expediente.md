# OT-0266A — Implementación helper bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Implementar el helper puro documental construirBloqueTiempoConcentracionRolesTcExpediente para el bloque Tiempo de concentración y roles Tc del expediente hidrológico mínimo, sin acoplarlo al constructor principal, sin modificar comparador, motor ni bloques existentes.

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
- No modificar helpers existentes.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- Crear únicamente el archivo funcional del helper Tc roles.
- No acoplar ningún helper en esta OT.
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

OT-0267 — Validación aislada helper bloque Tiempo de concentración y roles Tc del expediente
