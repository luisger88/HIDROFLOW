# OT-0188B — Comparación helper Identificación vs ruta operativa

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "rutaOperativaUsaHelperIdentificacion": true,
  "rutaOperativaPasaContextoBase": true,
  "rutaOperativaConservaFuenteFallback": true,
  "rutaOperativaConservaEstacionIdfFallback": true,
  "helperExportado": true,
  "lineasHelper": 7,
  "helperContieneEncabezado": true,
  "helperContieneCuencaObjetoSaneada": true,
  "residuos": [],
  "comparacionControladaAprobada": true
}
```

## Ruta operativa detectada en textoExpediente

```javascript
            ...construirLineasIdentificacionExpediente({
              contextoBase,
              fuenteFallback: "HidroFlow",
              estacionIdfFallback: estacionIdfExpediente
            }),
```

## Salida controlada del helper saneado

```text
## 1. Identificación
Cuenca: La Iguaná PC_80
Área: —
Fuente de contexto: Control OT-0188
Estación IDF: IDF_CONTROL
Pendiente media: —
Longitud cauce principal: —
```

## Lectura técnica

- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasIdentificacionExpediente(...)`.
- La ruta operativa conserva `contextoBase`, `fuenteFallback: "HidroFlow"` y `estacionIdfFallback: estacionIdfExpediente`.
- El helper saneado resuelve `contextoBase.cuenca` como objeto usando una representación textual competente.
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