# OT-0176A — Apertura comparación helper Resumen Q-5 auditado vs operativo

## Objetivo

Comparar de forma controlada el bloque `## 6. Resumen Q-5 auditado` generado por el helper `construirLineasResumenQ5AuditadoExpediente(...)` frente a la forma operativa extraída.

## Antecedente

OT-0172 extrajo la forma exacta operativa del bloque.

OT-0173 diseñó la función pura futura.

OT-0174 implementó el helper puro.

OT-0175 reforzó la validación aislada del helper.

## Alcance

Esta OT solo compara helper vs referencia operativa controlada.

No integra el helper en `ComparadorMultiMetodo.jsx`.

No sustituye `textoExpediente`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de cierre

OT-0176 se considera válida si:

- el bloque delegado retorna líneas en arreglo;
- el encabezado coincide;
- los textos fijos coinciden;
- la línea vacía interna se preserva;
- `Tabla Q-5 auditada:` coincide;
- `tablaQ5Markdown` se expande correctamente;
- las dos líneas vacías finales se preservan;
- no hay residuos técnicos;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
