# OT-0129A — Apertura de validación post-adopción Identificación delegada

## Objetivo

Validar que, después de OT-0128, el expediente operativo mantiene correctamente el bloque `## 1. Identificación` adoptado desde el helper delegado.

## Antecedente

OT-0128 sustituyó únicamente las 7 líneas manuales del bloque Identificación dentro de `textoExpediente` por:

```javascript
...construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpediente
}),
```

## Alcance

Esta OT valida la adopción parcial ya aplicada. No sustituye nuevos bloques.

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

## Criterio de cierre

OT-0129 se considera válida si:

- `textoExpediente` sigue existiendo;
- el bloque Identificación está delegado;
- las líneas manuales antiguas no reaparecen;
- `areaTexto.value = textoExpediente` sigue intacto;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no aparece `navigator.clipboard`;
- no aparece `writeText`;
- validaciones OT-0128, OT-0124 y OT-0127 pasan;
- build Vite pasa;
- `ComparadorMultiMetodo.jsx` no se modifica en esta OT.
