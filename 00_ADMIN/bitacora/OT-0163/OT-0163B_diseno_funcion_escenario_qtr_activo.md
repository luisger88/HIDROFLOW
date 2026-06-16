# OT-0163B — Diseño de función pura Escenario Q-Tr activo

## Nombre propuesto

`construirLineasEscenarioQTrActivoExpediente(...)`

## Ubicación futura propuesta

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Firma conceptual

```javascript
function construirLineasEscenarioQTrActivoExpediente(entrada = {})
```

## Entrada esperada

```javascript
{
  estadoQTrActivoExpediente,
  qTrActivoExpediente,
  faltantesQTrActivoExpediente,
  formatearValorQTrExpediente
}
```

## Salida esperada

Debe retornar un arreglo equivalente al bloque operativo actual:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: <estado | no_publicado>
Tr activo: <valor | —> años
Estación IDF: <valor | —>
Método IDF: <valor | —>
Distribución temporal: <valor | —>
Área: <valor | —> km²
CN efectivo: <valor | —>
S: <valor | —> mm
Ia: <valor | —> mm
Impermeabilidad: <valor | —> %
Tc: <valor | —> min
Pe total: <valor | —> mm
Campos mínimos: <completos | faltantes — lista>
Fuente: <fuente | —>
Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.
```

## Orden obligatorio

1. Encabezado `## 5. Escenario Q-Tr activo — control de trazabilidad`;
2. `Estado`;
3. `Tr activo`;
4. `Estación IDF`;
5. `Método IDF`;
6. `Distribución temporal`;
7. `Área`;
8. `CN efectivo`;
9. `S`;
10. `Ia`;
11. `Impermeabilidad`;
12. `Tc`;
13. `Pe total`;
14. `Campos mínimos`;
15. `Fuente`;
16. `Lectura técnica`.

## Fuentes contractuales

| Línea | Fuente esperada | Fallback | Regla |
|---|---|---|---|
| `Estado` | `estadoQTrActivoExpediente?.estado` | `no_publicado` | Representar texto existente. |
| `Tr activo` | `qTrActivoExpediente.tr_activo` | `—` | Formatear con `formatearValorQTrExpediente(..., " años", 2)`. |
| `Estación IDF` | `qTrActivoExpediente.estacion_idf` | `—` | Formatear con `formatearValorQTrExpediente(...)`. |
| `Método IDF` | `qTrActivoExpediente.metodo_idf` | `—` | Formatear con `formatearValorQTrExpediente(...)`. |
| `Distribución temporal` | `qTrActivoExpediente.distribucion_temporal` | `—` | Formatear con `formatearValorQTrExpediente(...)`. |
| `Área` | `qTrActivoExpediente.area_km2` | `—` | Formatear con `formatearValorQTrExpediente(..., " km²", 4)`. |
| `CN efectivo` | `qTrActivoExpediente.cn_efectivo` | `—` | Formatear con `formatearValorQTrExpediente(..., "", 2)`. |
| `S` | `qTrActivoExpediente.s_mm` | `—` | Formatear con `formatearValorQTrExpediente(..., " mm", 2)`. |
| `Ia` | `qTrActivoExpediente.ia_mm` | `—` | Formatear con `formatearValorQTrExpediente(..., " mm", 2)`. |
| `Impermeabilidad` | `qTrActivoExpediente.porcentaje_impermeable` | `—` | Formatear con `formatearValorQTrExpediente(..., " %", 2)`. |
| `Tc` | `qTrActivoExpediente.tc_min` | `—` | Formatear con `formatearValorQTrExpediente(..., " min", 4)`. |
| `Pe total` | `qTrActivoExpediente.lluvia_efectiva_total_mm` | `—` | Formatear con `formatearValorQTrExpediente(..., " mm", 4)`. |
| `Campos mínimos` | `faltantesQTrActivoExpediente` | `completos` | Si hay faltantes: `faltantes — lista`; si no: `completos`. |
| `Fuente` | `estadoQTrActivoExpediente?.fuente` | `—` | Representar texto existente. |
| `Lectura técnica` | texto fijo | texto fijo | No modificar. |

## Reglas funcionales

- La función debe ser pura.
- No debe modificar estado.
- No debe consultar motor.
- No debe leer DOM.
- No debe usar portapapeles.
- No debe emitir alertas.
- No debe recalcular Q.
- No debe inferir Tr.
- No debe recalcular área.
- No debe recalcular CN.
- No debe recalcular S ni Ia.
- No debe recalcular Pe.
- No debe modificar `estadoQTrActivoExpediente`.
- No debe modificar `qTrActivoExpediente`.
- Solo debe representar valores presentes o fallback documental.

## Dependencia funcional permitida

La función futura puede recibir `formatearValorQTrExpediente` como dependencia de entrada para conservar el formato operativo actual sin duplicar lógica.

Si `formatearValorQTrExpediente` no está disponible o no es función, el diseño debe exigir fallback seguro antes de implementación.

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Criterio de validación futura

- retorno tipo arreglo;
- 16 líneas;
- encabezado exacto;
- lectura técnica literal;
- estado con fallback `no_publicado`;
- fuente con fallback `—`;
- campos mínimos con `completos` o `faltantes — lista`;
- ausencia de residuos técnicos;
- ausencia de cálculo, recálculo, inferencia o consulta al motor.

## Decisión de diseño

La función puede avanzar a implementación en una OT posterior como helper puro estrictamente representacional y dependiente solo de valores ya existentes.

## Próxima OT recomendada

`OT-0164 — Implementación de función pura Escenario Q-Tr activo en helper`
