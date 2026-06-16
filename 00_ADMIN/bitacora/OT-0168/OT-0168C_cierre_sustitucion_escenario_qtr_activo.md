# OT-0168C — Cierre sustitución parcial Escenario Q-Tr activo

## Resultado

Se sustituyó parcialmente el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` dentro de `textoExpediente` por el helper delegado.

## Cambio aplicado

Las líneas manuales del bloque fueron reemplazadas por:

```javascript
...construirLineasEscenarioQTrActivoExpediente({
  estadoQTrActivoExpediente,
  qTrActivoExpediente,
  faltantesQTrActivoExpediente,
  formatearValorQTrExpediente
}),
```

## Validaciones aprobadas

- `VALIDACION_OT_0168_SUSTITUCION_ESCENARIO_QTR_ACTIVO_OK`;
- `COMPARACION_OT_0167_ESCENARIO_QTR_ACTIVO_OK`;
- `VALIDACION_OT_0166_DIAGNOSTICA_ESCENARIO_QTR_ACTIVO_OK`;
- `VALIDACION_OT_0165_HELPER_ESCENARIO_QTR_ACTIVO_REFORZADA_OK`;
- `VALIDACION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
- bloque `## 3. Tiempo de concentración y roles Tc`;
- bloque `## 4. Volumen de referencia`;
- bloques posteriores;
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

El bloque Escenario Q-Tr activo queda adoptado parcialmente desde el helper delegado, manteniendo el resto del expediente operativo sin sustituciones adicionales.
