# OT-0193B — Comparación helper Parámetros base vs ruta operativa

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "rutaOperativaUsaHelperParametrosBase": true,
  "rutaOperativaPasaContextoBase": true,
  "helperExportado": true,
  "lineasHelper": 5,
  "etiquetasFaltantes": [],
  "residuos": [],
  "comparacionControladaAprobada": true
}
```

## Ruta operativa detectada en textoExpediente

```javascript
            ...construirLineasParametrosHidrologicosBaseExpediente({
              contextoBase
            }),
```

## Salida controlada del helper validado

```text
## 2. Parámetros hidrológicos base
CN: 83
CN base: —
CN efectivo: —
AMC: III
```

## Lectura técnica

- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasParametrosHidrologicosBaseExpediente(...)`.
- La ruta operativa pasa `contextoBase` al helper.
- El helper conserva el encabezado `## 2. Parámetros hidrológicos base` y las etiquetas mínimas esperadas.
- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `textoExpediente`.
- No se modificó botón de copiado.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.