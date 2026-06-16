# OT-0175A — Apertura validación reforzada helper Resumen Q-5 auditado

## Objetivo

Validar de forma aislada y reforzada el helper puro `construirLineasResumenQ5AuditadoExpediente(...)` antes de cualquier integración diagnóstica o sustitución.

## Antecedente

OT-0174 implementó el helper puro representacional para el bloque `## 6. Resumen Q-5 auditado`.

La validación inicial confirmó tabla completa, sin entrada, entrada `null`, tabla vacía, tabla con residuos, estructura básica y ausencia de residuos técnicos.

## Alcance

Esta OT solo refuerza la validación aislada.

No modifica el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Casos borde a validar

- entrada `string`;
- entrada `array`;
- `tablaQ5Markdown` como string;
- `tablaQ5Markdown` como objeto;
- `tablaQ5Markdown` con números;
- `tablaQ5Markdown` con booleanos;
- `tablaQ5Markdown` con objetos;
- `tablaQ5Markdown` con strings vacíos;
- `tablaQ5Markdown` con `NaN`;
- `tablaQ5Markdown` con mezcla de filas válidas e inválidas;
- preservación de dos líneas vacías finales;
- ausencia de residuos técnicos.

## Restricciones

No se modifica:

- helper documental;
- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
