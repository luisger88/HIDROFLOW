# OT-0156A — Apertura integración diagnóstica Volumen de referencia

## Objetivo

Integrar de forma diagnóstica y no invasiva el helper `construirLineasVolumenReferenciaExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

## Antecedente

OT-0154 implementó el helper puro `construirLineasVolumenReferenciaExpediente(...)`.

OT-0155 reforzó su validación aislada frente a casos borde.

## Alcance

Esta OT solo ejecuta el helper como diagnóstico interno.

No sustituye el bloque operativo `## 4. Volumen de referencia`.

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
