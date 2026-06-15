# OT-0152B — Extracción exacta del bloque Volumen de referencia operativo

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2066,
  "lineaFinAntesDeSiguienteBloque": 2070,
  "lineasExtraidas": 5,
  "comparadorModificado": false,
  "textoExpedienteSustituido": false,
  "requiereDisenoHelperPosterior": true
}
```

## Bloque operativo extraído

```jsx
 2066 |             "## 4. Volumen de referencia",
 2067 |             `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
 2068 |             `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
 2069 |             "Fórmula: Pe(mm) × Área(km²) × 1000.",
 2070 |             "",
```

## Lectura técnica

- El bloque `## 4. Volumen de referencia` fue extraído desde `ComparadorMultiMetodo.jsx` sin modificar el archivo.
- La extracción conserva la forma operativa real del bloque, incluyendo orden, expresiones, unidades y fallback actual.
- Esta evidencia debe usarse antes de diseñar cualquier helper futuro.

## Reglas preservadas

- No se calculó volumen.
- No se recalculó Pe.
- No se recalculó área.
- No se infirió masa.
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

`OT-0153 — Diseño de función pura Volumen de referencia`
