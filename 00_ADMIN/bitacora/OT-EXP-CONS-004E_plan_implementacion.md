# OT-EXP-CONS-004E

## Fuente aprobada

q_tr_multiescenario

## Fuente actual usada por expediente

contextoBase.hidrogramas.resultados

## Cambio requerido

La selección del hidrograma principal del expediente no se realizará por:

- primer método encontrado,
- primer SCS encontrado.

La selección se realizará por:

1. Tr activo.
2. Escenario correspondiente en q_tr_multiescenario.
3. Método adoptado (SCS Unit Hydrograph).
4. Qp/Tp/Volumen del mismo escenario.

## Estado

Listo para implementación.