# OT-0193A — Apertura comparación helper Parámetros base vs ruta operativa

## Objetivo

Comparar de forma controlada el helper validado `construirLineasParametrosHidrologicosBaseExpediente(...)` contra su ruta operativa de composición dentro de `textoExpediente`.

## Antecedente

OT-0191 auditó y trazó la composición real del bloque `## 2. Parámetros hidrológicos base`.

OT-0192 validó en aislamiento el helper `construirLineasParametrosHidrologicosBaseExpediente(...)` y obtuvo `VALIDACION_OT_0192_HELPER_PARAMETROS_BASE_AISLADA_OK`.

## Alcance

Esta OT solo compara y documenta.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica botón ni portapapeles.

No modifica validadores existentes.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Criterios de comparación

La comparación debe confirmar:

- que `textoExpediente` existe;
- que la ruta operativa usa `...construirLineasParametrosHidrologicosBaseExpediente(...)`;
- que la invocación operativa pasa `contextoBase`;
- que el helper retorna encabezado `## 2. Parámetros hidrológicos base`;
- que el helper conserva etiquetas `CN:`, `CN base:`, `CN efectivo:` y `AMC:`;
- que la salida controlada no emite `undefined`, `null`, `NaN` ni `[object Object]`.
