# OT-0173B — Diseño de función pura Resumen Q-5 auditado

## Nombre propuesto

`construirLineasResumenQ5AuditadoExpediente(...)`

## Ubicación futura propuesta

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Firma conceptual

```javascript
function construirLineasResumenQ5AuditadoExpediente(entrada = {})
```

## Entrada esperada

```javascript
{
  tablaQ5Markdown
}
```

## Salida esperada

Debe retornar un arreglo equivalente al bloque operativo actual:

```javascript
[
  "## 6. Resumen Q-5 auditado",
  "Estado general: diagnóstico no adoptivo.",
  "SCS Unit Hydrograph: candidato principal de referencia.",
  "SCS Mod.: variante ajustable.",
  "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  "Masa y volumen: controlados frente a referencia física.",
  "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  "",
  "Tabla Q-5 auditada:",
  ...tablaQ5Markdown,
  "",
  ""
]
```

## Orden obligatorio

1. Encabezado `## 6. Resumen Q-5 auditado`;
2. `Estado general: diagnóstico no adoptivo.`;
3. `SCS Unit Hydrograph: candidato principal de referencia.`;
4. `SCS Mod.: variante ajustable.`;
5. `Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.`;
6. `Masa y volumen: controlados frente a referencia física.`;
7. `Qp y Tp: sujetos a revisión temporal antes de adopción técnica.`;
8. línea vacía interna;
9. `Tabla Q-5 auditada:`;
10. expansión de `tablaQ5Markdown`;
11. línea vacía final 1;
12. línea vacía final 2.

## Fuentes contractuales

| Línea / elemento | Fuente esperada | Fallback | Regla |
|---|---|---|---|
| Encabezado | texto fijo | texto fijo | No modificar. |
| Estado general | texto fijo | texto fijo | No modificar. |
| SCS Unit Hydrograph | texto fijo | texto fijo | No modificar. |
| SCS Mod. | texto fijo | texto fijo | No modificar. |
| Snyder/Williams & Hann/Clark IUH | texto fijo | texto fijo | No modificar. |
| Masa y volumen | texto fijo | texto fijo | No modificar. |
| Qp y Tp | texto fijo | texto fijo | No modificar. |
| Línea vacía interna | texto fijo | texto fijo | Preservar. |
| Tabla Q-5 auditada | texto fijo | texto fijo | No modificar. |
| `tablaQ5Markdown` | `tablaQ5Markdown` ya existente | `sin tabla Q-5 disponible` | Representar únicamente si ya existe. |
| Líneas vacías finales | texto fijo | texto fijo | Preservar. |

## Reglas funcionales

- La función debe ser pura.
- No debe modificar estado.
- No debe consultar motor.
- No debe leer DOM.
- No debe usar portapapeles.
- No debe emitir alertas.
- No debe recalcular Q-5.
- No debe modificar Qp.
- No debe modificar Tp.
- No debe modificar volumen.
- No debe modificar hidrogramas.
- Solo debe representar texto fijo y `tablaQ5Markdown` ya existente.

## Tratamiento de `tablaQ5Markdown`

- Si `tablaQ5Markdown` es un arreglo, la función futura debe expandir sus líneas.
- Si `tablaQ5Markdown` no es arreglo o está vacío, la función futura debe representar un fallback documental seguro.
- Fallback recomendado: `sin tabla Q-5 disponible`.

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Criterio de validación futura

- retorno tipo arreglo;
- encabezado exacto;
- textos fijos exactos;
- línea vacía interna preservada;
- encabezado `Tabla Q-5 auditada:` preservado;
- expansión de `tablaQ5Markdown` cuando exista;
- fallback documental seguro cuando no exista;
- dos líneas vacías finales preservadas;
- ausencia de residuos técnicos;
- ausencia de cálculo, recálculo, inferencia o consulta al motor.

## Decisión de diseño

La función puede avanzar a implementación en una OT posterior como helper puro estrictamente representacional.

## Próxima OT recomendada

`OT-0174 — Implementación de función pura Resumen Q-5 auditado en helper`
