# OT-0142B — Diseño de función pura Tiempo de concentración y roles Tc

## Nombre propuesto

`construirLineasTiempoConcentracionRolesTcExpediente(...)`

## Ubicación futura propuesta

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Firma conceptual

```javascript
function construirLineasTiempoConcentracionRolesTcExpediente(entrada = {})
```

## Entrada esperada

La función debe aceptar un objeto de entrada con valores ya calculados o textos operativos ya definidos:

```javascript
{
  Tc_final,
  trDisenoActivoExpediente
}
```

## Salida esperada

Debe retornar un arreglo equivalente al bloque operativo actual:

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: <valor | —>
Tr global activo: <valor | —> años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Orden obligatorio

1. Encabezado `## 3. Tiempo de concentración y roles Tc`;
2. `Tc comparador`;
3. `Tr global activo`;
4. `Nota Tr`;
5. `Roles Tc:`;
6. `Tc global Índice`;
7. `Tc operativo Q(t)`;
8. `Duración evento`;
9. `Lag / forma SCS`;
10. `Tc comparador` como referencia Q-5.

## Fuentes contractuales

| Línea | Fuente esperada | Fallback | Regla |
|---|---|---|---|
| `Tc comparador` | `Tc_final` ya existente | `—` | Formatear solo si es finito. |
| `Tr global activo` | `trDisenoActivoExpediente` ya existente | `—` | No recalcular Tr. |
| `Nota Tr` | texto operativo fijo vigente | texto fijo vigente | No generar nota nueva. |
| `Roles Tc` | textos operativos fijos vigentes | textos fijos vigentes | No reinterpretar roles. |

## Reglas funcionales

- La función debe ser pura.
- No debe modificar estado.
- No debe consultar motor.
- No debe leer DOM.
- No debe usar portapapeles.
- No debe emitir alertas.
- No debe recalcular `Tc_final`.
- No debe inferir `Tc_final`.
- No debe recalcular `trDisenoActivoExpediente`.
- No debe reinterpretar roles Tc.
- No debe generar advertencias nuevas.
- Solo debe representar valores presentes o fallback documental.

## Regla de formato Tc

Si `Tc_final` es finito, se representa como:

```text
Number(Tc_final).toFixed(1) + " min"
```

Si no existe o no es finito, se representa:

```text
—
```

## Regla de formato Tr

Si `trDisenoActivoExpediente` existe, se representa literalmente seguido de `años`.

Si no existe, se representa:

```text
Tr global activo: — años
```

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Ejemplo con contexto completo

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: 114.2 min
Tr global activo: 100 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Ejemplo con fallback

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: —
Tr global activo: — años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Criterio de validación futura

- retorno tipo arreglo;
- 10 líneas;
- encabezado exacto;
- Tc finito formateado con una cifra decimal y `min`;
- fallback `—` para Tc no finito;
- Tr representado sin recalcular;
- roles operativos conservados literalmente;
- ausencia de residuos técnicos;
- ausencia de recálculo, inferencia, derivación o reinterpretación.

## Decisión de diseño

La función puede avanzar a implementación en una OT posterior como helper puro estrictamente representacional.

## Próxima OT recomendada

`OT-0143 — Implementación de función pura Tiempo de concentración y roles Tc en helper`
