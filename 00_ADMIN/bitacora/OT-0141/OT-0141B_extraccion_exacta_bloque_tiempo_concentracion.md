# OT-0141B — Extracción exacta del bloque Tiempo de concentración operativo

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2060,
  "lineaFinAntesDeBloque4": 2070,
  "lineasExtraidas": 11,
  "comparadorModificado": false,
  "textoExpedienteSustituido": false,
  "requiereContratoEspecificoPosterior": true
}
```

## Bloque operativo extraído

```jsx
 2060 |             "## 3. Tiempo de concentración y roles Tc",
 2061 |             `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
 2062 |             `Tr global activo: ${trDisenoActivoExpediente} años`,
 2063 |             "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
 2064 |             "Roles Tc:",
 2065 |             "- Tc global Índice: referencia hidrológica general.",
 2066 |             "- Tc operativo Q(t): ruta interna del hidrograma.",
 2067 |             "- Duración evento: 3 h para almacenamiento/regulación.",
 2068 |             "- Lag / forma SCS: parámetro derivado para forma temporal.",
 2069 |             "- Tc comparador: referencia especializada para coherencia Q-5.",
 2070 |             "",
```

## Lectura técnica

- El bloque `## 3. Tiempo de concentración y roles Tc` fue extraído desde `ComparadorMultiMetodo.jsx` sin modificar el archivo.
- La extracción conserva la forma operativa real del bloque, incluyendo el orden y las expresiones actuales.
- Esta evidencia debe usarse antes de diseñar cualquier helper futuro.

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

La siguiente OT debe convertir esta extracción exacta en un contrato funcional específico para la función futura.

## Próxima OT recomendada

`OT-0142 — Diseño de función pura Tiempo de concentración y roles Tc`
