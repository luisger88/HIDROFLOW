# OT-0186A — Apertura validación aislada helper Identificación existente

## Objetivo

Validar en aislamiento el helper existente `construirLineasIdentificacionExpediente(...)`, ya adoptado dentro de `textoExpediente` para el bloque `## 1. Identificación`.

## Antecedente

OT-0184 confirmó que el bloque `## 1. Identificación` aparece dentro de `textoExpediente` mediante expansión del helper `construirLineasIdentificacionExpediente(...)`.

OT-0185 registró formalmente esa adopción existente.

## Alcance

Esta OT solo valida el helper en aislamiento.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico;
- helper documental existente.

## Criterios de validación

El helper debe:

- exportarse correctamente;
- retornar un arreglo de líneas;
- generar el encabezado `## 1. Identificación`;
- incluir información de cuenca;
- no emitir `undefined`, `null`, `NaN` ni `[object Object]`;
- conservar salida textual apta para expediente.
