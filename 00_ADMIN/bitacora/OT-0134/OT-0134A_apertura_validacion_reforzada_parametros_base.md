# OT-0134A — Apertura de validación reforzada helper Parámetros hidrológicos base

## Objetivo

Validar de forma aislada y reforzada el helper puro `construirLineasParametrosHidrologicosBaseExpediente(...)` antes de cualquier integración diagnóstica o sustitución.

## Antecedente

OT-0133 implementó el helper puro representacional para el bloque `## 2. Parámetros hidrológicos base`.

La validación inicial confirmó contexto completo, fallback y contexto directo.

## Alcance

Esta OT solo refuerza la validación aislada.

No modifica el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Casos borde a validar

- `CN: 0`;
- `CN: ""`;
- `CN: NaN`;
- `CN_base: null`;
- `CN_efectivo: object`;
- `AMC: ""`;
- `AMC: "III"`;
- `contextoBase` ausente;
- contexto directo.

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
