# OT-0145B — Ajuste fallback Tc vacío/null en helper Tiempo de concentración

## Cambio aplicado

Se ajustó `formatearTc(...)` dentro de `construirLineasTiempoConcentracionRolesTcExpediente(...)`.

## Comportamiento corregido

```text
Tc_final: ""   → —
Tc_final: null → —
```

## Comportamiento conservado

```text
Tc_final: 0        → 0.0 min
Tc_final: "114.23" → 114.2 min
Tc_final: NaN      → —
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
