# OT-0171B — Contrato documental del bloque Resumen Q-5 auditado

## Bloque contractual

```text
## 6. Resumen Q-5 auditado
Estado general: diagnóstico no adoptivo.
SCS Unit Hydrograph: candidato principal de referencia.
SCS Mod.: variante ajustable.
Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
Masa y volumen: controlados frente a referencia física.
Qp y Tp: sujetos a revisión temporal antes de adopción técnica.

Tabla Q-5 auditada:
<tablaQ5Markdown | sin tabla Q-5 disponible>
```

## Naturaleza del bloque

Este bloque es documental en su salida, pero incluye una sección sensible derivada de resultados Q-5 ya generados o ya disponibles.

No debe usarse para recalcular Q-5 ni para adoptar técnicamente resultados sin validación hidrológica posterior.

## Familias contractuales

### 1. Texto fijo

- Encabezado `## 6. Resumen Q-5 auditado`.
- `Estado general: diagnóstico no adoptivo.`
- `SCS Unit Hydrograph: candidato principal de referencia.`
- `SCS Mod.: variante ajustable.`
- `Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.`
- `Masa y volumen: controlados frente a referencia física.`
- `Qp y Tp: sujetos a revisión temporal antes de adopción técnica.`
- `Tabla Q-5 auditada:`

### 2. Resultado delegado / sensible

- `tablaQ5Markdown`.

### 3. Restricciones técnicas

- No recalcular Q-5.
- No modificar Qp.
- No modificar Tp.
- No modificar volumen.
- No modificar hidrogramas.
- No consultar motor.
- No adoptar técnicamente resultados por el solo hecho de representarlos.

### 4. Fallbacks documentales futuros

- `sin tabla Q-5 disponible`;
- `sin resultados Q-5 válidos`;
- `—`.

## Campos contractuales preliminares

| Elemento | Fuente esperada | Fallback | Calcular | Recalcular | Inferir | Consultar motor |
|---|---|---|---|---|---|---|
| Encabezado | texto fijo | texto fijo | No | No | No | No |
| Estado general | texto fijo | texto fijo | No | No | No | No |
| SCS Unit Hydrograph | texto fijo | texto fijo | No | No | No | No |
| SCS Mod. | texto fijo | texto fijo | No | No | No | No |
| Snyder/Williams & Hann/Clark IUH | texto fijo | texto fijo | No | No | No | No |
| Masa y volumen | texto fijo | texto fijo | No | No | No | No |
| Qp y Tp | texto fijo | texto fijo | No | No | No | No |
| Tabla Q-5 auditada | texto fijo | texto fijo | No | No | No | No |
| `tablaQ5Markdown` | `tablaQ5Markdown` ya existente | `sin tabla Q-5 disponible` | No | No | No | No |

## Reglas de representación

- La tabla solo debe representarse si ya existe como `tablaQ5Markdown`.
- El contrato no autoriza a recalcular Q-5.
- El contrato no autoriza a modificar Qp, Tp ni volumen.
- El contrato no autoriza a modificar hidrogramas.
- El contrato no autoriza a consultar motor hidrológico.
- La presencia de la tabla no implica adopción técnica automática.

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Decisión contractual

El bloque puede avanzar a una OT posterior de extracción exacta operativa antes del diseño de función pura.

## Próxima OT recomendada

`OT-0172 — Extracción exacta del bloque Resumen Q-5 auditado operativo`
