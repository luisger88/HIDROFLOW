# OT-0151B — Contrato documental del bloque Volumen de referencia

## Bloque contractual

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor | —>
Volumen esperado: <valor | —>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Naturaleza del bloque

Este bloque es documental en su salida, pero contiene magnitudes hidrológicas sensibles.

Magnitudes sensibles identificadas:

- lluvia efectiva total;
- volumen esperado;
- fórmula Pe(mm) × Área(km²) × 1000;
- consistencia Pe–Área–Volumen.

## Orden obligatorio

1. Encabezado `## 4. Volumen de referencia`;
2. `Lluvia efectiva total`;
3. `Volumen esperado`;
4. `Fórmula: Pe(mm) × Área(km²) × 1000.`

## Campos contractuales preliminares

| Campo | Fuente esperada | Fallback | Calcular | Recalcular | Inferir | Consultar motor | Observación |
|---|---|---|---|---|---|---|---|
| `Lluvia efectiva total` | `peTotalMm` ya existente | `—` | No | No | No | No | Representar solo si es finito. |
| `Volumen esperado` | `volumenEsperadoM3` ya existente | `—` | No | No | No | No | Representar solo valor ya disponible. |
| `Fórmula` | texto operativo fijo | texto fijo | No | No | No | No | No ejecutar fórmula en helper futuro. |

## Reglas de representación

- Si `peTotalMm` existe y es finito, se representa con dos decimales y unidad `mm`.
- Si `peTotalMm` no existe o no es finito, se representa `—`.
- Si `volumenEsperadoM3` existe, se representa con separador local y unidad `m³`.
- Si `volumenEsperadoM3` no existe, se representa `—`.
- La fórmula se representa como texto fijo.
- No se debe ejecutar la fórmula dentro del helper futuro.
- No se debe recalcular volumen desde Pe y área.
- No se debe recalcular Pe.
- No se debe recalcular área.
- No se debe consultar motor hidrológico.
- No se debe modificar estado.

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Ejemplo con contexto completo

```text
## 4. Volumen de referencia
Lluvia efectiva total: 56.65 mm
Volumen esperado: 2.654.251 m³
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Ejemplo con fallback

```text
## 4. Volumen de referencia
Lluvia efectiva total: —
Volumen esperado: —
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Criterio de validación futura

- retorno tipo arreglo;
- 4 líneas;
- encabezado exacto;
- lluvia efectiva con `mm` si existe y es finita;
- fallback `—` para lluvia efectiva no finita;
- volumen esperado con `m³` si existe;
- fallback `—` para volumen esperado ausente;
- fórmula conservada literal;
- ausencia de residuos técnicos;
- ausencia de cálculo, recálculo, inferencia o consulta al motor.

## Decisión contractual

El bloque puede avanzar a una OT posterior de extracción exacta de forma operativa antes del diseño de helper puro.

## Próxima OT recomendada

`OT-0152 — Extracción exacta del bloque Volumen de referencia operativo`
