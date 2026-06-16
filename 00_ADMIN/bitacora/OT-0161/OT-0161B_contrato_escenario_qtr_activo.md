# OT-0161B — Contrato documental del bloque Escenario Q-Tr activo

## Bloque contractual

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

## Naturaleza del bloque

Este bloque es documental en su salida, pero depende de estado operativo y de valores hidrológicos ya calculados o ya publicados.

No debe usarse para recalcular ni adoptar caudales.

## Familias contractuales

### 1. Texto fijo

- Encabezado `## 5. Escenario Q-Tr activo — control de trazabilidad`.
- Lectura técnica final.

### 2. Campos dependientes de estado

- `Estado` desde `estadoQTrActivoExpediente?.estado` con fallback `no_publicado`.
- `Fuente` desde `estadoQTrActivoExpediente?.fuente` con fallback `—`.
- `Campos mínimos` desde `faltantesQTrActivoExpediente`.

### 3. Valores hidrológicos representados

- `Tr activo` desde `qTrActivoExpediente.tr_activo`.
- `Estación IDF` desde `qTrActivoExpediente.estacion_idf`.
- `Método IDF` desde `qTrActivoExpediente.metodo_idf`.
- `Distribución temporal` desde `qTrActivoExpediente.distribucion_temporal`.
- `Área` desde `qTrActivoExpediente.area_km2`.
- `CN efectivo` desde `qTrActivoExpediente.cn_efectivo`.
- `S` desde `qTrActivoExpediente.s_mm`.
- `Ia` desde `qTrActivoExpediente.ia_mm`.
- `Impermeabilidad` desde `qTrActivoExpediente.porcentaje_impermeable`.
- `Tc` desde `qTrActivoExpediente.tc_min`.
- `Pe total` desde `qTrActivoExpediente.lluvia_efectiva_total_mm`.

## Campos contractuales preliminares

| Campo | Fuente esperada | Fallback | Formato | Calcular | Recalcular | Inferir | Consultar motor |
|---|---|---|---|---|---|---|---|
| `Estado` | `estadoQTrActivoExpediente?.estado` | `no_publicado` | texto | No | No | No | No |
| `Tr activo` | `qTrActivoExpediente.tr_activo` | `—` | años, 2 decimales | No | No | No | No |
| `Estación IDF` | `qTrActivoExpediente.estacion_idf` | `—` | texto | No | No | No | No |
| `Método IDF` | `qTrActivoExpediente.metodo_idf` | `—` | texto | No | No | No | No |
| `Distribución temporal` | `qTrActivoExpediente.distribucion_temporal` | `—` | texto | No | No | No | No |
| `Área` | `qTrActivoExpediente.area_km2` | `—` | km², 4 decimales | No | No | No | No |
| `CN efectivo` | `qTrActivoExpediente.cn_efectivo` | `—` | 2 decimales | No | No | No | No |
| `S` | `qTrActivoExpediente.s_mm` | `—` | mm, 2 decimales | No | No | No | No |
| `Ia` | `qTrActivoExpediente.ia_mm` | `—` | mm, 2 decimales | No | No | No | No |
| `Impermeabilidad` | `qTrActivoExpediente.porcentaje_impermeable` | `—` | %, 2 decimales | No | No | No | No |
| `Tc` | `qTrActivoExpediente.tc_min` | `—` | min, 4 decimales | No | No | No | No |
| `Pe total` | `qTrActivoExpediente.lluvia_efectiva_total_mm` | `—` | mm, 4 decimales | No | No | No | No |
| `Campos mínimos` | `faltantesQTrActivoExpediente` | `completos` o `faltantes — lista` | texto | No | No | No | No |
| `Fuente` | `estadoQTrActivoExpediente?.fuente` | `—` | texto | No | No | No | No |
| `Lectura técnica` | texto fijo | texto fijo | texto | No | No | No | No |

## Reglas de representación

- Los valores se representan únicamente si ya existen.
- Los campos numéricos deben usar el formato ya existente mediante `formatearValorQTrExpediente(...)`.
- El contrato no autoriza a recalcular ningún valor.
- El contrato no autoriza a modificar `estadoQTrActivoExpediente`.
- El contrato no autoriza a modificar `qTrActivoExpediente`.
- El contrato no autoriza a cambiar la lógica de campos mínimos.
- El contrato no autoriza a tocar Q-5 ni el motor.

## Residuos prohibidos

- `undefined`;
- `null`;
- `NaN`;
- `[object Object]`.

## Decisión contractual

El bloque puede avanzar a una OT posterior de extracción exacta operativa antes del diseño de función pura.

## Próxima OT recomendada

`OT-0162 — Extracción exacta del bloque Escenario Q-Tr activo operativo`
