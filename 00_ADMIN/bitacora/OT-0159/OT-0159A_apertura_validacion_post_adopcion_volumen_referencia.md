# OT-0159A — Apertura validación post-adopción Volumen de referencia

## Objetivo

Validar que, después de OT-0158, el expediente operativo mantiene correctamente adoptado el bloque `## 4. Volumen de referencia` desde el helper delegado.

## Antecedente

OT-0158 sustituyó parcialmente las líneas manuales del bloque `## 4. Volumen de referencia` dentro de `textoExpediente` por:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm,
  volumenEsperadoM3
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
