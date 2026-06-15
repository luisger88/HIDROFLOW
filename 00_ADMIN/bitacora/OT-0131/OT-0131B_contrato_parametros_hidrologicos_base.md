# OT-0131B — Contrato documental del bloque Parámetros hidrológicos base

## Bloque contractual

```text
## 2. Parámetros hidrológicos base
CN: <valor | —>
CN base: <valor | —>
CN efectivo: <valor | —>
AMC: <valor | —>
```

## Orden obligatorio

1. Encabezado `## 2. Parámetros hidrológicos base`;
2. `CN`;
3. `CN base`;
4. `CN efectivo`;
5. `AMC`;
6. línea separadora posterior.

## Campos contractuales

| Campo | Fuente esperada | Fallback | Recalcular | Inferir | Derivar | Formato |
|---|---|---|---|---|---|---|
| `CN` | `contextoBase.CN` | `—` | No | No | No | Literal |
| `CN base` | `contextoBase.CN_base` | `—` | No | No | No | Literal |
| `CN efectivo` | `contextoBase.CN_efectivo` | `—` | No | No | No | Literal |
| `AMC` | `contextoBase.AMC` | `—` | No | No | No | Literal |

## Reglas de representación

- Si el valor existe en `contextoBase`, se representa literalmente.
- Si el valor no existe, se representa `—`.
- No se deben convertir unidades.
- No se deben aplicar redondeos nuevos.
- No se deben calcular valores faltantes.
- No se deben completar valores por defecto técnico.
- No se deben usar valores de otros módulos como sustitutos.
- No se debe consultar el motor hidrológico.
- No se debe modificar estado.

## Residuos prohibidos

El bloque no debe emitir:

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Ejemplo con contexto completo

```text
## 2. Parámetros hidrológicos base
CN: 88
CN base: 82
CN efectivo: 88
AMC: II
```

## Ejemplo con contexto fallback

```text
## 2. Parámetros hidrológicos base
CN: —
CN base: —
CN efectivo: —
AMC: —
```

## Decisión contractual

El bloque puede avanzar a diseño de helper puro en una OT posterior, siempre que el helper sea estrictamente representacional.

## Próxima OT recomendada

`OT-0132 — Diseño de función pura Parámetros hidrológicos base`
