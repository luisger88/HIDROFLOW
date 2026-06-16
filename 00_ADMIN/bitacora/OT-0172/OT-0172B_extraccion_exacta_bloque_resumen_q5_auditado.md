# OT-0172B — Extracción exacta del bloque Resumen Q-5 auditado operativo

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2080,
  "lineaFinAntesDeSiguienteBloque": 2091,
  "lineasExtraidas": 12,
  "contieneTablaQ5Markdown": true,
  "comparadorModificado": false,
  "textoExpedienteSustituido": false,
  "requiereDisenoFuncionPosterior": true
}
```

## Bloque operativo extraído

```jsx
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
```

## Lectura técnica

- El bloque `## 6. Resumen Q-5 auditado` fue extraído desde `ComparadorMultiMetodo.jsx` sin modificar el archivo.
- La extracción conserva la forma operativa real del bloque, incluyendo orden, líneas fijas, línea vacía interna, encabezado de tabla, expansión `...tablaQ5Markdown` y líneas vacías finales.
- Esta evidencia debe usarse antes de diseñar cualquier función pura futura.

## Reglas preservadas

- No se recalculó Q-5.
- No se modificó Qp.
- No se modificó Tp.
- No se modificó volumen.
- No se modificaron hidrogramas.
- No se consultó motor hidrológico.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se sustituyó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocaron validadores finales.
- No se tocó motor hidrológico.

## Decisión

No implementar helper todavía.

La siguiente OT debe convertir esta extracción exacta en un diseño funcional específico para la función futura.

## Próxima OT recomendada

`OT-0173 — Diseño de función pura Resumen Q-5 auditado`
