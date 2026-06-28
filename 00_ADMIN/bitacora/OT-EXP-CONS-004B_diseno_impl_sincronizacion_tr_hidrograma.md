# OT-EXP-CONS-004B

## Objetivo

Diseñar la implementación de sincronización:

Tr activo
↓
Q diseño
↓
Hidrograma principal
↓
Qp/Tp/Volumen

## Regla adoptada

El hidrograma principal publicado debe pertenecer al mismo escenario del Tr activo.

## Estado

Abierta.

## Hallazgo arquitectónico

Se confirma que:

- hidrogramas.resultados y q_tr_multiescenario se publican como estructuras independientes desde ModHidrogramas.
- El expediente consume Q-5 desde contextoBase.hidrogramas.resultados.
- El expediente consume Q-Tr desde q_tr_multiescenario.
- Actualmente no existe vínculo explícito entre ambas estructuras.

## Consecuencia

Es posible publicar:

Tr activo = 100 años

y simultáneamente:

Qp perteneciente a otro escenario.

## Implementación requerida

Agregar una capa de selección por Tr activo antes de publicar el hidrograma principal del expediente.
