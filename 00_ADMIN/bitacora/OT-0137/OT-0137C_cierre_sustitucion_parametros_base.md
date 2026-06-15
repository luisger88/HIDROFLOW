# OT-0137C — Cierre sustitución parcial Parámetros hidrológicos base

## Resultado

Se sustituyó parcialmente el bloque `## 2. Parámetros hidrológicos base` dentro de `textoExpediente` por el helper delegado.

## Cambio aplicado

Las líneas manuales de `CN`, `CN base`, `CN efectivo` y `AMC` fueron reemplazadas por:

```javascript
...construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase
}),
```

## Validaciones aprobadas

- `VALIDACION_OT_0137_SUSTITUCION_PARAMETROS_BASE_OK`;
- `COMPARACION_OT_0136_PARAMETROS_BASE_OK`;
- `VALIDACION_OT_0135_DIAGNOSTICA_PARAMETROS_BASE_OK`;
- `VALIDACION_OT_0134_HELPER_PARAMETROS_BASE_REFORZADA_OK`;
- `VALIDACION_OT_0133_HELPER_PARAMETROS_BASE_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- bloque `## 1. Identificación`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Verificaciones clave

`areaTexto.value = textoExpediente` sigue intacto.

`window.prompt(..., textoExpediente)` sigue intacto.

No se introdujo `navigator.clipboard` ni `writeText`.

## Conclusión

El bloque Parámetros hidrológicos base queda adoptado parcialmente desde el helper delegado, manteniendo el resto del expediente operativo sin sustituciones adicionales.
