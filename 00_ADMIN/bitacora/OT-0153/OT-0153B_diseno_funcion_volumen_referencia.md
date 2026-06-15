# OT-0153B — Diseño de función pura Volumen de referencia

## Nombre propuesto

`construirLineasVolumenReferenciaExpediente(...)`

## Ubicación futura propuesta

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Firma conceptual

```javascript
function construirLineasVolumenReferenciaExpediente(entrada = {})
```

## Entrada esperada

```javascript
{
  peTotalMm,
  volumenEsperadoM3
}
```

## Salida esperada

Debe retornar un arreglo equivalente al bloque operativo actual:

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor | —>
Volumen esperado: <valor | —>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Orden obligatorio

1. Encabezado `## 4. Volumen de referencia`;
2. `Lluvia efectiva total`;
3. `Volumen esperado`;
4. `Fórmula: Pe(mm) × Área(km²) × 1000.`

## Fuentes contractuales

| Línea | Fuente esperada | Fallback | Regla |
|---|---|---|---|
| `Lluvia efectiva total` | `peTotalMm` ya existente | `—` | Formatear solo si es finito. |
| `Volumen esperado` | `volumenEsperadoM3` ya existente | `—` | Representar solo valor disponible. |
| `Fórmula` | texto fijo vigente | texto fijo vigente | No ejecutar fórmula. |

## Reglas funcionales

- La función debe ser pura.
- No debe modificar estado.
- No debe consultar motor.
- No debe leer DOM.
- No debe usar portapapeles.
- No debe emitir alertas.
- No debe recalcular `peTotalMm`.
- No debe recalcular `volumenEsperadoM3`.
- No debe calcular volumen desde Pe y área.
- No debe inferir área.
- No debe inferir masa.
- Solo debe representar valores presentes o fallback documental.

## Regla de formato lluvia efectiva

Si `peTotalMm` es finito, se representa como:

```text
Number(peTotalMm).toFixed(2) + " mm"
```

Si no existe o no es finito, se representa:

```text
—
```

## Regla de formato volumen esperado

Si `volumenEsperadoM3` existe y es representable, se conserva el formato operativo:

```javascript
volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³"
```

Si no existe, se representa:

```text
—
```

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
- lluvia efectiva con dos decimales y `mm` si es finita;
- fallback `—` para lluvia efectiva no finita;
- volumen esperado con separador local y `m³` si existe;
- fallback `—` para volumen esperado ausente;
- fórmula conservada literal;
- ausencia de residuos técnicos;
- ausencia de cálculo, recálculo, inferencia o consulta al motor.

## Decisión de diseño

La función puede avanzar a implementación en una OT posterior como helper puro estrictamente representacional.

## Próxima OT recomendada

`OT-0154 — Implementación de función pura Volumen de referencia en helper`
