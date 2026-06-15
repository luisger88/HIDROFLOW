# OT-0145C — Cierre ajuste fallback Tc vacío/null

## Resultado

Se corrigió el fallback de `Tc_final` vacío o nulo en `construirLineasTiempoConcentracionRolesTcExpediente(...)`.

## Validación aprobada

`VALIDACION_OT_0145_FALLBACK_TC_VACIO_NULL_OK`

También se mantuvo aprobada:

`VALIDACION_OT_0143_HELPER_TIEMPO_CONCENTRACION_OK`

## Comportamiento final

```text
Tc_final: 0        → 0.0 min
Tc_final: "114.23" → 114.2 min
Tc_final: NaN      → —
Tc_final: ""       → —
Tc_final: "   "    → —
Tc_final: null     → —
Tc_final: undefined → —
```

## Build

Build Vite aprobado.

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

El helper de Tiempo de concentración queda más seguro para valores vacíos/nulos antes de cualquier integración diagnóstica.
