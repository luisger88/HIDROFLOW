# OT-0132B — Diseño de función pura Parámetros hidrológicos base

## Nombre propuesto

`construirLineasParametrosHidrologicosBaseExpediente(...)`

## Ubicación futura propuesta

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Firma conceptual

```javascript
function construirLineasParametrosHidrologicosBaseExpediente(entrada = {})
```

## Entrada esperada

La función debe aceptar `contextoBase` con los campos:

- `CN`;
- `CN_base`;
- `CN_efectivo`;
- `AMC`.

Debe poder operar con contexto completo o fallback.

## Salida esperada

Debe retornar un arreglo de 5 líneas:

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
5. `AMC`.

## Fuentes contractuales

| Línea | Fuente | Fallback |
|---|---|---|
| `CN` | `contextoBase.CN` | `—` |
| `CN base` | `contextoBase.CN_base` | `—` |
| `CN efectivo` | `contextoBase.CN_efectivo` | `—` |
| `AMC` | `contextoBase.AMC` | `—` |

## Reglas funcionales

- La función debe ser pura.
- No debe modificar estado.
- No debe consultar motor.
- No debe leer DOM.
- No debe usar portapapeles.
- No debe emitir alertas.
- No debe recalcular `CN`.
- No debe derivar `CN base`.
- No debe derivar `CN efectivo`.
- No debe inferir `AMC`.
- No debe completar valores con supuestos técnicos.
- Solo debe representar valores presentes o fallback `—`.

## Residuos prohibidos

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

## Criterio de validación futura

- Retorno tipo arreglo.
- 5 líneas.
- Encabezado exacto.
- Líneas `CN`, `CN base`, `CN efectivo` y `AMC`.
- Contexto completo.
- Contexto fallback.
- Ausencia de residuos técnicos.
- Ausencia de recálculo, inferencia o derivación.

## Decisión de diseño

La función puede avanzar a implementación en una OT posterior como helper puro estrictamente representacional.

## Próxima OT recomendada

`OT-0133 — Implementación de función pura Parámetros hidrológicos base en helper`
