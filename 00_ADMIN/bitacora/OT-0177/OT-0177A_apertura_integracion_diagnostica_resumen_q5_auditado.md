# OT-0177A — Apertura integración diagnóstica Resumen Q-5 auditado

## Objetivo

Integrar de forma diagnóstica no invasiva el helper `construirLineasResumenQ5AuditadoExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`, sin sustituir el bloque operativo.

## Antecedente

OT-0174 implementó el helper puro.

OT-0175 reforzó su validación aislada.

OT-0176 confirmó coincidencia textual estricta 14/14 entre helper y referencia operativa controlada.

## Alcance

Esta OT solo importa y ejecuta el helper como diagnóstico interno.

No sustituye `textoExpediente`.

No modifica el botón de copiado.

No modifica portapapeles.

## Restricciones

No se modifica:

- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica

- El helper se ejecuta solo como comparación diagnóstica.
- Si hay brecha, se emite `console.warn`.
- Si no hay brecha, no se altera el comportamiento operativo.
- El bloque `## 6. Resumen Q-5 auditado` sigue armado operativamente como antes.
