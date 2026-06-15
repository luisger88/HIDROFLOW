# OT-0138A — Apertura validación post-adopción Parámetros hidrológicos base

## Objetivo

Validar que, después de OT-0137, el expediente operativo mantiene correctamente adoptado el bloque `## 2. Parámetros hidrológicos base` desde el helper delegado.

## Antecedente

OT-0137 sustituyó parcialmente las líneas manuales de `CN`, `CN base`, `CN efectivo` y `AMC` dentro de `textoExpediente` por:

```javascript
...construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase
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

## Criterio de cierre

OT-0138 se considera válida si:

- `textoExpediente` sigue existiendo;
- el bloque Parámetros base se arma mediante `construirLineasParametrosHidrologicosBaseExpediente(...)`;
- no reaparecen las líneas manuales antiguas de `CN`, `CN base`, `CN efectivo` y `AMC`;
- el bloque `## 1. Identificación` sigue presente;
- el bloque `## 3. Tiempo de concentración` sigue presente;
- `areaTexto.value = textoExpediente` sigue intacto;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no se introduce `navigator.clipboard`;
- no se introduce `writeText`;
- validaciones encadenadas pasan;
- build Vite pasa.
