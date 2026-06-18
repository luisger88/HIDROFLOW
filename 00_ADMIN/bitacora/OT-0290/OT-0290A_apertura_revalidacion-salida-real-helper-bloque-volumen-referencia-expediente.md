# OT-0290A — Revalidación salida real helper bloque Volumen de referencia del expediente

## Objetivo

Revalidar la salida real/exportable del bloque Volumen de referencia después del acople y revalidación OT-0289, comprobando que el expediente generado contiene exactamente el bloque esperado, con valores documentales, orden correcto, ausencia de tokens inválidos y build aprobado, sin corregir código funcional.

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
- No modificar construirBloqueVolumenReferenciaExpediente.js.
- No modificar helpers existentes.
- No crear helper en esta OT.
- No crear archivo funcional nuevo en esta OT.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir código funcional en esta OT.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia.
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
- Crear únicamente documentación y script de revalidación OT-0290.

## Próximo frente recomendado

OT-0291 — Decisión estabilización bloque Volumen de referencia del expediente
