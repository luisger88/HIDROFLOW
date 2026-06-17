# OT-0188A — Apertura comparación helper Identificación vs ruta operativa

## Objetivo

Comparar de forma controlada el helper saneado `construirLineasIdentificacionExpediente(...)` contra la ruta operativa de composición del bloque `## 1. Identificación` dentro de `textoExpediente`.

## Antecedente

OT-0184 confirmó que la Identificación aparece dentro de `textoExpediente` mediante expansión del helper.

OT-0186 detectó el residuo `[object Object]` en validación aislada.

OT-0187 saneó el helper contra conversión implícita de objetos a `[object Object]` y la validación aislada post-saneamiento quedó aprobada.

## Alcance

Esta OT solo compara y documenta.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Criterios de comparación

La comparación debe confirmar:

- que `textoExpediente` existe;
- que la ruta operativa usa `...construirLineasIdentificacionExpediente(...)`;
- que la invocación operativa pasa `contextoBase`;
- que la invocación operativa conserva `fuenteFallback: "HidroFlow"`;
- que la invocación operativa conserva `estacionIdfFallback: estacionIdfExpediente`;
- que el helper saneado no emite `[object Object]` en caso controlado con cuenca objeto.
