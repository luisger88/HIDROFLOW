# OT-0160B — Auditoría del bloque Escenario Q-Tr activo

## Resumen

`json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2072,
  "lineaFinAntesDeSiguienteBloque": 2088,
  "lineasAuditadas": 17,
  "totalEncabezados": 1,
  "totalDocumentales": 1,
  "totalSensiblesODependientesEstado": 15,
  "totalSeparadores": 0,
  "comparadorModificado": false,
  "decisionPreliminar": "No delegar todavía. Conviene definir contrato documental separando texto fijo, estado publicado/no publicado, Tr activo, fuente y valores dependientes de estado."
}
`",
  ",
  

`jsx
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
`",
  ",
  

| Tipo | Cantidad |
|---|---:|
| Encabezados documentales | 1 |
| Líneas documentales / contextuales | 1 |
| Líneas técnicamente sensibles / dependientes de estado | 15 |
| Separadores | 0 |

## Lectura técnica

- El bloque contiene trazabilidad operativa del escenario Q-Tr activo.
- No conviene delegar el bloque completo sin contrato documental previo.
- Deben separarse campos fijos, campos dependientes de estado y valores hidrológicos representados.

## Decisión preliminar

No delegar todavía. Conviene definir contrato documental separando texto fijo, estado publicado/no publicado, Tr activo, fuente y valores dependientes de estado.

## Restricciones mantenidas

- No se modificó ComparadorMultiMetodo.jsx.
- No se sustituyó 	extoExpediente.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocaron validadores finales.
- No se tocó motor hidrológico.

## Siguiente paso recomendado

Abrir una OT posterior para definir el contrato documental del bloque ## 5. Escenario Q-Tr activo — control de trazabilidad.
