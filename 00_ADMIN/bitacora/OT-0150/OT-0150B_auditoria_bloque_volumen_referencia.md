# OT-0150B — Auditoría del bloque Volumen de referencia

## Resumen

`json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2066,
  "lineaFinAntesDeSiguienteBloque": 2070,
  "lineasAuditadas": 5,
  "totalEncabezados": 1,
  "totalDocumentales": 1,
  "totalSensibles": 3,
  "totalSeparadores": 0,
  "comparadorModificado": false,
  "decisionPreliminar": "No delegar completo todavía. Conviene definir contrato documental y separar magnitudes hidrológicas sensibles antes de implementar helper."
}
`",
  ",
  

`jsx
 2066 |             "## 4. Volumen de referencia",
 2067 |             `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
 2068 |             `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
 2069 |             "Fórmula: Pe(mm) × Área(km²) × 1000.",
 2070 |             "",
`",
  ",
  

| Tipo | Cantidad |
|---|---:|
| Encabezados documentales | 1 |
| Líneas documentales / contextuales | 1 |
| Líneas técnicamente sensibles | 3 |
| Separadores | 0 |

## Lectura técnica

- El bloque contiene magnitudes hidrológicas sensibles asociadas a volumen, lluvia efectiva, área, Q-5 o consistencia de masa.
- No conviene delegar el bloque completo sin contrato documental previo.

## Decisión preliminar

No delegar completo todavía. Conviene definir contrato documental y separar magnitudes hidrológicas sensibles antes de implementar helper.

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

Abrir una OT posterior para definir el contrato documental del bloque ## 4. Volumen de referencia, separando líneas puramente documentales de magnitudes hidrológicas sensibles.
