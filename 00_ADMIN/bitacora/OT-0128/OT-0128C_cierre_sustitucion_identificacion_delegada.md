# OT-0128C — Validación y cierre de sustitución parcial Identificación

## Resultado

Se sustituyó parcialmente el bloque `## 1. Identificación` dentro de `textoExpediente` por el bloque delegado generado con `construirLineasIdentificacionExpediente(...)`.

## Cambio aplicado

Las 7 líneas manuales del bloque Identificación fueron reemplazadas por:

```javascript
...construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpediente
}),
```

## Validaciones aprobadas

- `VALIDACION_OT_0128_SUSTITUCION_IDENTIFICACION_OK`;
- `VALIDACION_OT_0124_IDENTIFICACION_OK`;
- `VALIDACION_OT_0127_UNIDADES_IDENTIFICACION_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

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

El bloque Identificación queda adoptado parcialmente desde el helper delegado, manteniendo el resto del expediente operativo sin sustituciones adicionales.
