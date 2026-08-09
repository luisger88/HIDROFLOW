# OT-0046G2B2 — Auditoría hidrológica de lluvia efectiva cero

## Estado previo

OT-0046G2B diagnosticó que el primer cero hidrológico real nace en la lluvia efectiva.

Commit:
5d84218 docs(expediente): diagnostica estado fuente de ceros hidrologicos

OT-0046G2B1 corrigió la verdad documental para que null o undefined no se disfracen como cero.

Commit:
474dbc0 fix(expediente): evita convertir null en cero

## Problema actual

El Expediente Inteligente sigue mostrando valores hidrológicos dinámicos en cero cuando el estado fuente no produce lluvia efectiva positiva.

Valores afectados:

- Pe total: 0 mm
- Q-Tr: 0 m³/s
- Qp Q-5: 0 m³/s
- Tp Q-5: 0 min
- Volumen Q-5: 0 m³
- Diagnóstico Q(t): 0 filas

## Hipótesis

La lluvia efectiva es cero porque la precipitación acumulada P no supera la abstracción inicial Ia en el método SCS-CN:

- S = 25400 / CN - 254
- Ia = 0.2 * S
- Pe = P > Ia ? (P - Ia)^2 / (P - Ia + S) : 0

Si P <= Ia en todas las filas, entonces:

- Pe = 0
- PeIncrem = 0
- qSeries.Q = 0
- Qpico = 0
- tPico = 0
- volTotal = 0

## Objetivo

Auditar numéricamente la cadena:

hietograma -> CNact -> S -> Ia -> Pe -> PeIncrem -> qSeries -> Qpico/tPico/volTotal

## Restricciones

No modificar fórmulas hidrológicas.
No recalcular Q-5.
No cambiar CN.
No cambiar AMC.
No cambiar IDF.
No modificar motor.
No relajar guards.
No agregar logs permanentes.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Criterio de éxito

La OT debe producir evidencia numérica que responda:

1. cuál es CNact;
2. cuál es S;
3. cuál es Ia;
4. cuál es P total del hietograma;
5. cuál es P máxima acumulada;
6. si P máxima supera Ia;
7. si PeIncrem tiene algún valor positivo;
8. si el cero de Q(t) es consecuencia directa de PeIncrem = 0.

## Resultado esperado

Diagnóstico documentado sin cambiar código productivo.
