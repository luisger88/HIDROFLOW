# OT-0162B — Extracción exacta del bloque Escenario Q-Tr activo operativo

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2072,
  "lineaFinAntesDeSiguienteBloque": 2088,
  "lineasExtraidas": 17,
  "comparadorModificado": false,
  "textoExpedienteSustituido": false,
  "requiereDisenoFuncionPosterior": true
}
```

## Bloque operativo extraído

```jsx
 2072 |                 "## 5. Escenario Q-Tr activo — control de trazabilidad",
 2073 |                 `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
 2074 |                 `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,
 2075 |                 `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,
 2076 |                 `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,
 2077 |                 `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,
 2078 |                 `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,
 2079 |                 `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,
 2080 |                 `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,
 2081 |                 `Ia: ${formatearValorQTrExpediente(qTrActivoExpediente.ia_mm, " mm", 2)}`,
 2082 |                 `Impermeabilidad: ${formatearValorQTrExpediente(qTrActivoExpediente.porcentaje_impermeable, " %", 2)}`,
 2083 |                 `Tc: ${formatearValorQTrExpediente(qTrActivoExpediente.tc_min, " min", 4)}`,
 2084 |                 `Pe total: ${formatearValorQTrExpediente(qTrActivoExpediente.lluvia_efectiva_total_mm, " mm", 4)}`,
 2085 |                 `Campos mínimos: ${faltantesQTrActivoExpediente.length > 0 ? "faltantes — " + faltantesQTrActivoExpediente.join(", ") : "completos"}`,
 2086 |                 `Fuente: ${estadoQTrActivoExpediente?.fuente ?? "—"}`,
 2087 |                 "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",
 2088 |                 "",
```

## Lectura técnica

- El bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` fue extraído desde `ComparadorMultiMetodo.jsx` sin modificar el archivo.
- La extracción conserva la forma operativa real del bloque, incluyendo orden, expresiones, unidades, fallbacks y lectura técnica.
- Esta evidencia debe usarse antes de diseñar cualquier función pura futura.

## Reglas preservadas

- No se recalculó Q.
- No se infirió Tr.
- No se modificó `estadoQTrActivoExpediente`.
- No se modificó `qTrActivoExpediente`.
- No se consultó motor hidrológico.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se sustituyó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocaron validadores finales.
- No se tocó motor hidrológico.

## Decisión

No implementar helper todavía.

La siguiente OT debe convertir esta extracción exacta en un diseño funcional específico para la función futura.

## Próxima OT recomendada

`OT-0163 — Diseño de función pura Escenario Q-Tr activo`
