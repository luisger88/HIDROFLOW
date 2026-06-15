# OT-0148C — Cierre sustitución parcial Tiempo de concentración y roles Tc

## Resultado

Se sustituyó parcialmente el bloque `## 3. Tiempo de concentración y roles Tc` dentro de `textoExpediente` por el helper delegado.

## Cambio aplicado

Las líneas manuales del bloque fueron reemplazadas por:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Validaciones aprobadas

- `VALIDACION_OT_0148_SUSTITUCION_TIEMPO_CONCENTRACION_OK`;
- `COMPARACION_OT_0147_TIEMPO_CONCENTRACION_OK`;
- `VALIDACION_OT_0146_DIAGNOSTICA_TIEMPO_CONCENTRACION_OK`;
- `VALIDACION_OT_0145_FALLBACK_TC_VACIO_NULL_OK`;
- `VALIDACION_OT_0143_HELPER_TIEMPO_CONCENTRACION_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
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

El bloque Tiempo de concentración y roles Tc queda adoptado parcialmente desde el helper delegado, manteniendo el resto del expediente operativo sin sustituciones adicionales.
