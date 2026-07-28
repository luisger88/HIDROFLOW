# OT-CODEMAP-003 — Cierre técnico

## Resultado

Se implementó grafo React semántico en HF-CODEMAP para reconstruir rutas productor, callback, state, prop, consumidor, guard y salida documental.

## Limitación corregida

En HF-CODEMAP v1.1.0 se detectaban props y callbacks React, pero no se reconstruía una ruta semántica completa.

En HF-CODEMAP v1.2.0 se agregó semantic-flow.

## Resultado del indexador

- Versión: 1.2.0
- Archivos escaneados: 260
- Símbolos detectados: 5146
- Referencias cruzadas: 41190
- Guards detectados: 48
- React flows: 284
- Props flows: 2618
- State links: 88
- Semantic flows: 96
- Flujos de dominio: 8
- Document flows: 1
- Impact entries: 3781

## Consultas validadas

- resumen
- semantic-flow onContextoComparador
- semantic-flow contextoComparador
- semantic-flow Q5
- react-flow onContextoComparador
- guard tieneQ5Publicado

## Hallazgos útiles inmediatos

- onContextoComparador ya aparece en una ruta semántica con prop_pass, wrapper, state_setter, state, callback_receive y guards.
- actualizarContextoComparador se detecta como wrapper useCallback asociado a setContextoComparador.
- contextoComparador se detecta como state usado para pasar contexto a ComparadorMultiMetodo.
- ComparadorMultiMetodo se vincula con contexto recibido y guards Q-5.
- tieneQ5Publicado y tieneHidrogramasPublicados quedan asociados al flujo semántico.

## Observación

semantic-flow Q5 aún muestra ruido de archivos backup, copias y sub_flow. Esta depuración queda recomendada para OT-CODEMAP-004.

## Regla operativa

Antes de corregir flujos React críticos, consultar:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow <nombre>

Ejemplos:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow onContextoComparador
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow contextoComparador
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow Q5

## Estado

OT-CODEMAP-003 queda lista para commit selectivo.
