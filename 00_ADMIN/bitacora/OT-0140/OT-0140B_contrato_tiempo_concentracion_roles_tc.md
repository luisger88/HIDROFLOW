# OT-0140B — Contrato documental del bloque Tiempo de concentración y roles Tc

## Bloque contractual

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: <valor | —>
Tc sugerido: <valor | —>
Rango competente Tc: <valor | —>
Rol Tc: <valor | —>
Advertencia Tc: <valor | —>
```

## Naturaleza del bloque

Este bloque es documental en su salida, pero contiene campos hidrológicamente sensibles.

Por tanto, cualquier helper futuro debe ser estrictamente representacional.

## Campos contractuales preliminares

| Campo | Fuente esperada | Fallback | Recalcular | Inferir | Derivar | Reinterpretar |
|---|---|---|---|---|---|---|
| `Tc comparador` | contexto operativo existente | `—` | No | No | No | No |
| `Tc sugerido` | contexto operativo existente | `—` | No | No | No | No |
| `Rango competente Tc` | contexto operativo existente | `—` | No | No | No | No |
| `Rol Tc` | contexto operativo existente | `—` | No | No | No | No |
| `Advertencia Tc` | texto operativo existente | `—` | No | No | No | No |

## Reglas de representación

- Si el valor existe en el contexto operativo, se representa literalmente.
- Si el valor no existe, se representa `—`.
- No se deben convertir unidades.
- No se deben aplicar redondeos nuevos.
- No se deben calcular valores faltantes.
- No se deben completar valores por defecto técnico.
- No se deben usar valores de otros módulos como sustitutos.
- No se debe consultar el motor hidrológico.
- No se debe modificar estado.
- No se deben generar advertencias nuevas.

## Residuos prohibidos

El bloque no debe emitir:

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Decisión contractual

El bloque no debe avanzar directamente a helper.

Primero debe abrirse una OT posterior para extraer la forma exacta del bloque operativo línea por línea desde `ComparadorMultiMetodo.jsx`.

## Próxima OT recomendada

`OT-0141 — Extracción exacta del bloque Tiempo de concentración operativo`
