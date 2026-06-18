# OT-0282A — Corrección helper bloque Volumen de referencia del expediente

## Objetivo

Corregir únicamente la referencia textual prohibida detectada por OT-0281 en la fuente del helper construirBloqueVolumenReferenciaExpediente, sin cambiar comportamiento funcional, sin acoplar el helper, sin modificar constructor, comparador ni motor, y sin recalcular volumen.

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
- Modificar únicamente comentarios en construirBloqueVolumenReferenciaExpediente.js.
- No modificar la lógica del helper.
- No modificar exportaciones del helper.
- No modificar formateadores del helper.
- No modificar validadores existentes.
- No modificar el acople de restricciones y advertencias.
- No automatizar commits.
- No corregir otros códigos funcionales en esta OT.
- No tocar directamente el arreglo principal texto.
- No modificar bloque Identificación.
- No modificar bloque Parámetros hidrológicos base.
- No modificar bloque Tiempo de concentración y roles Tc.
- No modificar bloque Volumen de referencia en el constructor.
- No acoplar el helper al constructor principal.
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

OT-0283 — Revalidación aislada helper bloque Volumen de referencia del expediente
