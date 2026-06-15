# OT-0158C — Cierre sustitución parcial Volumen de referencia

## Resultado

Se sustituyó parcialmente el bloque `## 4. Volumen de referencia` dentro de `textoExpediente` por el helper delegado.

## Cambio aplicado

Las líneas manuales del bloque fueron reemplazadas por:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm,
  volumenEsperadoM3
}),
```

## Validaciones aprobadas

- `VALIDACION_OT_0158_SUSTITUCION_VOLUMEN_REFERENCIA_OK`;
- `VALIDACION_OT_0156_DIAGNOSTICA_VOLUMEN_REFERENCIA_OK`;
- `VALIDACION_OT_0155_HELPER_VOLUMEN_REFERENCIA_REFORZADA_OK`;
- `VALIDACION_OT_0154_HELPER_VOLUMEN_REFERENCIA_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
- bloque `## 3. Tiempo de concentración y roles Tc`;
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

El bloque Volumen de referencia queda adoptado parcialmente desde el helper delegado, manteniendo el resto del expediente operativo sin sustituciones adicionales.
