# OT-0170B — Auditoría del bloque Resumen Q-5 auditado

## Resumen

`json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2080,
  "lineaFinAntesDeSiguienteBloque": 2091,
  "lineasAuditadas": 12,
  "totalEncabezados": 1,
  "totalDocumentales": 3,
  "totalSensiblesODependientesQ5": 8,
  "totalSeparadores": 0,
  "comparadorModificado": false,
  "decisionPreliminar": "No delegar todavía. Conviene definir contrato documental separando texto fijo, resultados Q-5, Qp/Tp/Volumen, restricciones y lectura técnica."
}
`",
  ",
  

`jsx
 2080 |             "## 6. Resumen Q-5 auditado",
 2081 |             "Estado general: diagnóstico no adoptivo.",
 2082 |             "SCS Unit Hydrograph: candidato principal de referencia.",
 2083 |             "SCS Mod.: variante ajustable.",
 2084 |             "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
 2085 |             "Masa y volumen: controlados frente a referencia física.",
 2086 |             "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
 2087 |             "",
 2088 |             "Tabla Q-5 auditada:",
 2089 |             ...tablaQ5Markdown,
 2090 |             "",
 2091 |             "",
`",
  ",
  

| Tipo | Cantidad |
|---|---:|
| Encabezados documentales | 1 |
| Líneas documentales / contextuales | 3 |
| Líneas técnicamente sensibles / dependientes de Q-5 | 8 |
| Separadores | 0 |

## Lectura técnica

- El bloque contiene o puede contener resultados derivados del análisis Q-5.
- No conviene delegar el bloque completo sin contrato documental previo.
- Deben separarse texto fijo, resultados hidrológicos, restricciones y lectura técnica.

## Decisión preliminar

No delegar todavía. Conviene definir contrato documental separando texto fijo, resultados Q-5, Qp/Tp/Volumen, restricciones y lectura técnica.

## Restricciones mantenidas

- No se modificó ComparadorMultiMetodo.jsx.
- No se sustituyó 	extoExpediente.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocaron validadores finales.
- No se tocó motor hidrológico.

## Siguiente paso recomendado

Abrir una OT posterior para definir el contrato documental del bloque ## 6. Resumen Q-5 auditado.
