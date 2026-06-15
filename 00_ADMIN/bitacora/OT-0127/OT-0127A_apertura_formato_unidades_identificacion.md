# OT-0127A — Apertura de formato con unidades en Identificación delegada

## Objetivo

Ajustar la función delegada:

`construirLineasIdentificacionExpediente(...)`

para que las líneas numéricas del bloque `## 1. Identificación` emitan unidades compatibles con el bloque operativo actual.

## Antecedente

OT-0126 comparó el bloque delegado frente al bloque operativo y confirmó:

- 7 líneas delegadas;
- 7 líneas operativas;
- 4 coincidencias estrictas;
- 3 diferencias estrictas;
- 0 diferencias textuales fuertes;
- sin residuos técnicos;
- `textoExpediente` no sustituido;
- portapapeles y fallback manual siguen usando `textoExpediente`.

Las 3 diferencias corresponden exclusivamente a unidades/formato:

- Área: falta `km²`;
- Pendiente media: falta `%`;
- Longitud cauce principal: falta `km`.

## Alcance

Modificar únicamente el helper documental:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

para que emita:

- `Área: 46.8516 km²`;
- `Pendiente media: 8.43 %`;
- `Longitud cauce principal: 15.524 km`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de cierre

OT-0127 se considera válida si:

- la validación aislada OT-0124 sigue pasando;
- la comparación OT-0126 pasa con coincidencia estricta completa;
- el build Vite pasa;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
