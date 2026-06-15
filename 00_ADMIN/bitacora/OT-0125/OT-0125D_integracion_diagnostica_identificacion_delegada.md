# OT-0125D — Integración diagnóstica no invasiva de Identificación delegada

## Objetivo

Integrar de forma mínima y no adoptiva la función pura:

`construirLineasIdentificacionExpediente(...)`

dentro de `ComparadorMultiMetodo.jsx`, únicamente como diagnóstico interno.

## Antecedentes

OT-0125A abrió el frente de integración diagnóstica no invasiva.

OT-0125B auditó anclajes y confirmó:

- `ComparadorMultiMetodo.jsx` existe;
- el helper documental existe;
- `textoExpediente` existe;
- el bloque operativo `## 1. Identificación` existe una sola vez;
- la función delegada aún no estaba importada;
- el helper exporta `construirLineasIdentificacionExpediente(...)`.

OT-0125C extrajo contexto real y ubicó el bloque operativo `## 1. Identificación` dentro de `textoExpediente`, además de confirmar la zona de comparación runtime no invasiva posterior.

## Cambio aplicado

Se agregó el import nombrado:

`construirLineasIdentificacionExpediente`

desde:

`../services/documentos/construirExpedienteHidrologicoMinimo`

Se agregó un bloque diagnóstico no invasivo después de construir `textoExpediente` y antes de la comparación runtime existente OT-0114B.

## Naturaleza del diagnóstico

El bloque delegado:

- construye líneas de Identificación mediante el helper;
- une las líneas en texto diagnóstico;
- verifica que haya 7 líneas;
- verifica encabezado delegado `## 1. Identificación`;
- verifica presencia de encabezado operativo;
- verifica presencia de línea `Cuenca:` en delegado y operativo;
- solo emite `console.warn` si encuentra brechas.

## Restricciones mantenidas

No se reemplazó:

- `textoExpediente`.

No se modificó:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de validación

La integración se considera válida si:

- el build Vite pasa;
- `areaTexto.value` sigue usando `textoExpediente`;
- `window.prompt` sigue usando `textoExpediente`;
- no aparece `navigator.clipboard`;
- no aparece `writeText`;
- no se introduce uso adoptivo del texto delegado;
- el diagnóstico queda limitado a comparación interna no invasiva.
