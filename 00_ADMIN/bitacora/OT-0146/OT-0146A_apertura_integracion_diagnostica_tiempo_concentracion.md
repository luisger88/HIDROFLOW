# OT-0146A — Apertura integración diagnóstica Tiempo de concentración y roles Tc

## Objetivo

Integrar de forma diagnóstica y no invasiva el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

## Antecedente

OT-0143 implementó el helper puro representacional.

OT-0144 reforzó su validación aislada.

OT-0145 corrigió el fallback de `Tc_final` vacío/null antes de cualquier integración.

## Alcance

Esta OT solo ejecuta el helper como diagnóstico interno.

No sustituye el bloque operativo `## 3. Tiempo de concentración y roles Tc`.

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
