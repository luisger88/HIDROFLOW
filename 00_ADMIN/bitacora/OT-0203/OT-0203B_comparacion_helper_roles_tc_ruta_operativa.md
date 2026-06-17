# OT-0203B — Comparación helper roles Tc vs ruta operativa

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "rutaOperativaUsaHelperRolesTc": true,
  "rutaOperativaPasaTcFinal": true,
  "rutaOperativaPasaTrDisenoActivo": true,
  "helperExportado": true,
  "lineasHelper": 10,
  "etiquetasFaltantes": [],
  "residuos": [],
  "comparacionControladaAprobada": true
}
```

## Ruta operativa detectada en textoExpediente

```javascript
            ...construirLineasTiempoConcentracionRolesTcExpediente({
              Tc_final,
              trDisenoActivoExpediente
            }),
```

## Salida controlada del helper validado

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: 114.2 min
Tr global activo: 100 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Lectura técnica

- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasTiempoConcentracionRolesTcExpediente(...)`.
- La ruta operativa pasa `Tc_final` al helper.
- La ruta operativa pasa `trDisenoActivoExpediente` al helper.
- El helper conserva el encabezado `## 3. Tiempo de concentración y roles Tc` y las etiquetas mínimas esperadas.
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