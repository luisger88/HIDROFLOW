# OT-0125A — Apertura de integración diagnóstica no invasiva Identificación delegada

## Objetivo

Preparar la integración diagnóstica no invasiva del bloque documental `## 1. Identificación` delegado al helper:

`construirLineasIdentificacionExpediente(...)`

ubicado en:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Antecedente

OT-0124 validó aisladamente la función pura `construirLineasIdentificacionExpediente(...)` para:

- contexto completo;
- contexto fallback;
- 7 líneas documentales;
- encabezado `## 1. Identificación`;
- ausencia de residuos técnicos;
- fallbacks contractuales.

La validación confirmó:

`VALIDACION_OT_0124_IDENTIFICACION_OK`

## Alcance de OT-0125

Integrar la función dentro de `ComparadorMultiMetodo.jsx` únicamente como diagnóstico interno o comparación controlada, sin reemplazar todavía el armado operativo de `textoExpediente`.

## Reglas estrictas

No reemplazar todavía:

- `textoExpediente`.

No modificar:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Estrategia

Antes de modificar `ComparadorMultiMetodo.jsx`, se auditan anclajes reales:

- imports actuales;
- existencia de `textoExpediente`;
- ubicación del bloque operativo `## 1. Identificación`;
- posibles puntos de inserción diagnóstica;
- ausencia o presencia previa de `construirLineasIdentificacionExpediente`.

## Criterio de avance

Solo se autoriza una integración mínima si el archivo ofrece anclajes claros y verificables.

La integración debe ser:

- mínima;
- reversible;
- no adoptiva;
- sin reemplazo operativo;
- comprobable por diff;
- validable por build.
