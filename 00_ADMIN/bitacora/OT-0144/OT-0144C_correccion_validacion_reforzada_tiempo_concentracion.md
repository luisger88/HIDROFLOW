# OT-0144C — Corrección y cierre validación reforzada helper Tiempo de concentración

## Hallazgo

La primera versión del script `validar_ot0144_helper_tiempo_concentracion_reforzada.mjs` quedó corrupta por corte de pegado y produjo error de sintaxis.

## Corrección aplicada

Se reescribió el validador reforzado con una matriz completa de casos borde.

## Casos validados

- `Tc_final: 0`;
- `Tc_final: ""`;
- `Tc_final: NaN`;
- `Tc_final: null`;
- `Tc_final: "114.23"`;
- `trDisenoActivoExpediente: ""`;
- `trDisenoActivoExpediente: null`;
- `trDisenoActivoExpediente: object`;
- entrada vacía.

## Validaciones aprobadas

- `VALIDACION_OT_0144_HELPER_TIEMPO_CONCENTRACION_REFORZADA_OK`;
- `VALIDACION_OT_0143_HELPER_TIEMPO_CONCENTRACION_OK`;
- Build Vite aprobado.

## Nota técnica

`Tc_final: ""` y `Tc_final: null` se representan como `0.0 min` con la función actual, porque `Number("")` y `Number(null)` producen `0` en JavaScript.

Esta OT documenta el comportamiento existente sin modificar el helper.

Si posteriormente se decide que ese comportamiento debe cambiar a fallback `—`, deberá abrirse una OT específica de ajuste funcional.

## Restricciones mantenidas

No se modificó:

- helper documental;
- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Conclusión

El helper de Tiempo de concentración y roles Tc queda validado frente a casos borde, manteniendo el comportamiento representacional existente.
