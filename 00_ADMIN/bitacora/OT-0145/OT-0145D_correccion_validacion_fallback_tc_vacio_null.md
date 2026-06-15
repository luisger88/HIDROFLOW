# OT-0145D — Corrección y cierre validación fallback Tc vacío/null

## Hallazgo

La primera versión del script `validar_ot0145_fallback_tc_vacio_null.mjs` quedó corrupta por corte de pegado y produjo error de sintaxis.

## Corrección aplicada

Se reescribió el validador con matriz completa de casos para confirmar el ajuste de fallback de `Tc_final` vacío, nulo, indefinido y no finito.

## Validaciones aprobadas

- `VALIDACION_OT_0145_FALLBACK_TC_VACIO_NULL_OK`;
- `VALIDACION_OT_0143_HELPER_TIEMPO_CONCENTRACION_OK`;
- Build Vite aprobado.

## Comportamiento final confirmado

```text
Tc_final: 0         → 0.0 min
Tc_final: "114.23"  → 114.2 min
Tc_final: NaN       → —
Tc_final: ""        → —
Tc_final: "   "     → —
Tc_final: null      → —
Tc_final: undefined → —
```

## Restricciones mantenidas

No se modificó:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Conclusión

OT-0145 queda corregida y validada. El helper de Tiempo de concentración ya no publica `Tc_final` vacío o nulo como `0.0 min`.
