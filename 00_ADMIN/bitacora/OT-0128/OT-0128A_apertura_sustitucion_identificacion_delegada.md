# OT-0128A — Apertura de sustitución parcial controlada Identificación delegada

## Objetivo

Sustituir únicamente las 7 líneas operativas del bloque `## 1. Identificación` dentro de `textoExpediente` por el resultado de la función delegada:

`construirLineasIdentificacionExpediente(...)`

## Antecedente

OT-0124 validó aisladamente la función pura.

OT-0125 integró la función como diagnóstico no invasivo.

OT-0126 comparó el bloque delegado frente al operativo.

OT-0127 ajustó el formato con unidades hasta lograr coincidencia estricta:

- 7 líneas delegadas;
- 7 líneas operativas;
- 7 coincidencias estrictas;
- 0 diferencias estrictas;
- 0 diferencias textuales fuertes.

## Alcance

Esta OT sustituye solo el bloque `## 1. Identificación` dentro del arreglo `textoExpediente`.

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

OT-0128 se considera válida si:

- `textoExpediente` sigue existiendo;
- el bloque Identificación se arma mediante `construirLineasIdentificacionExpediente(...)`;
- `areaTexto.value = textoExpediente` sigue intacto;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no aparece `navigator.clipboard`;
- no aparece `writeText`;
- validaciones OT-0124, OT-0126 y OT-0127 pasan;
- build Vite pasa.
