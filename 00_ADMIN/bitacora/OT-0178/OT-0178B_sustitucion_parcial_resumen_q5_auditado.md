# OT-0178B — Sustitución parcial Resumen Q-5 auditado

## Cambio aplicado

Se sustituyó dentro de `textoExpediente` el bloque manual `## 6. Resumen Q-5 auditado` por:

```javascript
...construirLineasResumenQ5AuditadoExpediente({
  tablaQ5Markdown
}),
```

## Alcance

La sustitución fue parcial y limitada al bloque `## 6`.

## Restricciones mantenidas

No se modificó:

- bloques `## 1` a `## 5`;
- bloques posteriores;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Regla conservada

`textoExpediente` sigue siendo la fuente del copiado.
