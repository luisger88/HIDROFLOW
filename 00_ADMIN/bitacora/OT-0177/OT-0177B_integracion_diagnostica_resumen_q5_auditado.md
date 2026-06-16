# OT-0177B — Integración diagnóstica Resumen Q-5 auditado

## Cambio aplicado

Se importó y ejecutó el helper `construirLineasResumenQ5AuditadoExpediente(...)` dentro de `ComparadorMultiMetodo.jsx` solo como diagnóstico interno.

## Comportamiento

Se compara:

- bloque delegado generado por el helper;
- bloque operativo actual armado con `tablaQ5Markdown`.

Si hay diferencias, se emite:

```javascript
console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", ...)
```

## Alcance del cambio

No se sustituyó el bloque operativo.

No se modificó `textoExpediente` como fuente del copiado.

No se modificó botón ni portapapeles.

## Restricciones mantenidas

No se modificó:

- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
