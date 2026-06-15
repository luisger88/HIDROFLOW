# OT-0137A — Apertura sustitución parcial Parámetros hidrológicos base

## Objetivo

Sustituir únicamente el bloque operativo `## 2. Parámetros hidrológicos base` dentro de `textoExpediente` por el helper delegado `construirLineasParametrosHidrologicosBaseExpediente(...)`.

## Antecedente

OT-0133 implementó el helper puro.

OT-0134 reforzó la validación aislada.

OT-0135 integró el helper como diagnóstico no invasivo.

OT-0136 confirmó coincidencia textual estricta 5/5 entre delegado y referencia operativa.

## Alcance

Esta OT sustituye solo el bloque `## 2. Parámetros hidrológicos base`.

No modifica el bloque `## 1. Identificación`.

No modifica otros bloques del expediente.

## Restricciones

No se modifica:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de cierre

OT-0137 se considera válida si:

- el bloque Parámetros base se arma con `construirLineasParametrosHidrologicosBaseExpediente(...)`;
- las líneas manuales antiguas de CN, CN base, CN efectivo y AMC no reaparecen;
- `areaTexto.value = textoExpediente` sigue intacto;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no se introduce `navigator.clipboard`;
- no se introduce `writeText`;
- validaciones OT-0137, OT-0136, OT-0135, OT-0134 y OT-0133 pasan;
- build Vite pasa.
