# OT-0169A — Apertura validación post-adopción Escenario Q-Tr activo

## Objetivo

Validar que, después de OT-0168, el expediente operativo mantiene correctamente adoptado el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` desde el helper delegado.

## Antecedente

OT-0168 sustituyó parcialmente las líneas manuales del bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` dentro de `textoExpediente` por:

```javascript
...construirLineasEscenarioQTrActivoExpediente({
  estadoQTrActivoExpediente,
  qTrActivoExpediente,
  faltantesQTrActivoExpediente,
  formatearValorQTrExpediente
}),
```

## Alcance

Esta OT solo valida post-adopción.

No sustituye nuevos bloques.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `textoExpediente`.

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
