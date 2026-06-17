# OT-0192A — Apertura validación aislada helper Parámetros hidrológicos base

## Objetivo

Validar en aislamiento el helper `construirLineasParametrosHidrologicosBaseExpediente(...)`, ya usado dentro de `textoExpediente` para el bloque `## 2. Parámetros hidrológicos base`.

## Antecedente

OT-0191 auditó y trazó la composición real del bloque `## 2. Parámetros hidrológicos base`.

La auditoría confirmó que el bloque se compone mediante el helper `construirLineasParametrosHidrologicosBaseExpediente(...)`, recibiendo `contextoBase` desde la ruta operativa.

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
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Criterios de validación

El helper debe:

- exportarse correctamente;
- retornar un arreglo de líneas;
- generar el encabezado `## 2. Parámetros hidrológicos base`;
- incluir las etiquetas `CN:`, `CN base:`, `CN efectivo:` y `AMC:`;
- no emitir `undefined`, `null`, `NaN` ni `[object Object]`;
- conservar salida textual apta para expediente.
