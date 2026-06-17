# OT-0201B — Auditoría/trazabilidad bloque Tiempo de concentración y roles Tc

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "rutaOperativaLocalizada": true,
  "rutaOperativaUsaHelperTiempoConcentracionRolesTc": true,
  "rutaOperativaUsaTcFinal": true,
  "rutaOperativaUsaTrDisenoActivo": true,
  "helperExportadoEnModulo": true,
  "helperImportable": true,
  "lineasSalidaControlada": 10,
  "residuos": [],
  "errorHelper": "",
  "decisionPreliminar": "candidato apto para validación aislada posterior"
}
```

## Ruta operativa detectada en textoExpediente

```javascript
            ...construirLineasTiempoConcentracionRolesTcExpediente({
              Tc_final,
              trDisenoActivoExpediente
            }),
```

## Salida controlada del helper

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

- La ruta operativa de `textoExpediente` usa el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)`.
- La ruta operativa pasa `Tc_final` al helper.
- La ruta operativa pasa `trDisenoActivoExpediente` al helper.
- El helper se importa correctamente como función.
- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada.
- No se registró error al ejecutar el helper en escenario controlado.

## Decisión preliminar

candidato apto para validación aislada posterior

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