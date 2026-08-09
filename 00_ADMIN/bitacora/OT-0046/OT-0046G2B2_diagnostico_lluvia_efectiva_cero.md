# OT-0046G2B2 — Auditoría hidrológica de lluvia efectiva cero

## Estado previo

OT-0046G2B diagnosticó que el primer cero hidrológico real aparece en la cadena de lluvia efectiva e hidrogramas.

Commit:
5d84218 docs(expediente): diagnostica estado fuente de ceros hidrologicos

OT-0046G2B1 corrigió la verdad documental para evitar que null o undefined se exporten como cero.

Commit:
474dbc0 fix(expediente): evita convertir null en cero

## Objetivo

Auditar si la lluvia efectiva cero se explica por la condición SCS-CN:

Pe = P > Ia ? (P - Ia)^2 / (P - Ia + S) : 0

## Supuestos auditados

- Estación: SAN CRISTOBAL
- Tr: 25 años
- Duración: 3 h
- dt: 5 min
- Distribución: EPM_Q1
- AMC: II
- pctImp: 60
- cnBase: 75
- Área esperada: 46,85 km²
- Tc aproximado: 2 h

## Mapa de variables

| Variable | Fórmula / fuente | Valor estimado |
|---|---|---:|
| CNact | mezcla impermeable 75 x 0,4 + 98 x 0,6 | 88,8 |
| S | 25400 / CNact - 254 | 32,04 mm |
| Ia | 0,2 x S | 6,41 mm |
| Intensidad IDF | 78,7968 / (0,4 + 3)^0,9556 | 24,47 mm/h |
| Ptotal | intensidad x 3 h | 73,41 mm |
| P primer bloque 5 % | distPolyQ1(5) x Ptotal | 11,13 mm |
| Pe primer bloque | (11,13 - 6,41)^2 / (11,13 - 6,41 + 32,04) | 0,61 mm |
| Pe total | (73,41 - 6,41)^2 / (73,41 - 6,41 + 32,04) | 45,33 mm |

## Diagnóstico P vs Ia

| Condición | P | Ia | Cumple P > Ia |
|---|---:|---:|---|
| P final | 73,41 mm | 6,41 mm | Sí |
| P primer bloque | 11,13 mm | 6,41 mm | Sí |

## Dictamen

Con los parámetros auditados, la condición P <= Ia no explica la lluvia efectiva cero.

La cadena teórica debería producir:

- PeIncrem positivo;
- Pe total mayor que cero;
- qSeries con Q mayor que cero;
- Qpico mayor que cero;
- volumen integrado mayor que cero.

## Hipótesis pendientes

### Hipótesis A — params.area en cero o undefined

Aunque contextoBase muestra área real, ModHidrogramas usa params.area para construir los hidrogramas unitarios.

Si params.area es 0 o undefined, las ordenadas HU pueden quedar en cero y la convolución produce Q(t) = 0.

### Hipótesis B — ModHidrogramas no ejecutado o contexto no refrescado

Si ModHidrogramas no está montado o no refresca onContextoComparador, el contexto puede conservar valores incompletos.

Esta hipótesis queda parcialmente tensionada porque OT-0046F observó metodosQ5Payload con varios métodos.

### Hipótesis C — estación IDF no inicializada en runtime

Si est está undefined o incompleta, idfI puede producir Ptotal cero o inválido.

## Decisión

OT-0046G2B2 se cierra como diagnóstico hidrológico preliminar.

No se modifica código productivo.

## Siguiente sub-OT recomendada

OT-0046G2B2A — Instrumentación temporal no invasiva P-Ia/área/estación/hidros.

Objetivo:
medir en runtime, sin alterar fórmulas, los valores reales de:

- CNact
- S
- Ia
- Ptotal
- Pe_rows
- Pe_total
- params.area
- estación IDF activa
- Qpico
- tPico
- volTotal
- qSeries.length

## Criterio de cierre

G2B2 demuestra que, bajo parámetros esperados, la lluvia efectiva no debería ser cero. El siguiente paso debe medir el runtime real antes de cualquier corrección.
