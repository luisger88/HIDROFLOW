# OT-0230B — Ajuste criterio validación tokens inválidos expediente acoplado

## Objetivo

Ajustar el criterio del validador OT-0229 para que los tokens inválidos se evalúen sobre la salida documental generada del expediente, no sobre el código fuente completo.

## Antecedente

OT-0229 validó el expediente con el bloque de restricciones y advertencias generales acoplado.

La validación encontró dos fallos:

```text
token_undefined → 12 ocurrencias
token_null      → 21 ocurrencias
```

## Lectura del hallazgo

El hallazgo corresponde al criterio del validador, porque `undefined` y `null` aparecen legítimamente en guards, defaults y funciones internas del código fuente.

La validación documental debe revisar la salida exportable generada, no todo el código fuente.

## Ajuste aplicado

Se modificó únicamente el validador:

```text
07_TOOLBOX/validaciones/validar_ot0229_expediente_restricciones_advertencias_acoplado.mjs
```

Cambio de criterio:

- se conservan controles estructurales sobre el código fuente;
- se genera una salida documental llamando a `construirExpedienteHidrologicoMinimo`;
- se buscan `undefined`, `null`, `NaN` y `[object Object]` solo sobre esa salida documental;
- se mantiene el build Vite como control.

## Alcance mantenido

No se modificó el acople.

No se modificó el helper.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se tocó motor.

## Decisión

El validador queda ajustado para una nueva revalidación del expediente acoplado.

## Próximo frente recomendado

`OT-0231 — Revalidación expediente con criterio ajustado de tokens inválidos`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se modificó el acople.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
