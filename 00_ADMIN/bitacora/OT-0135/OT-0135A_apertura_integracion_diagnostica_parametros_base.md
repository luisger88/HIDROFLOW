# OT-0135A — Apertura de integración diagnóstica Parámetros hidrológicos base

## Objetivo

Integrar de forma diagnóstica y no invasiva el helper `construirLineasParametrosHidrologicosBaseExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

## Antecedente

OT-0133 implementó el helper puro representacional.

OT-0134 reforzó su validación aislada con casos borde.

## Alcance

Esta OT solo ejecuta el helper como diagnóstico interno.

No sustituye el bloque operativo `## 2. Parámetros hidrológicos base`.

No cambia `textoExpediente`.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- bloque operativo de `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de validación

La integración es válida si:

- el helper queda importado;
- el diagnóstico queda presente;
- el bloque operativo sigue presente;
- `areaTexto.value = textoExpediente` sigue intacto;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no aparece `navigator.clipboard`;
- no aparece `writeText`;
- build Vite pasa.
