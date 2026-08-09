# OT-CODEMAP-002 — Cierre técnico

## Resultado

Se mejoró HF-CODEMAP para detectar props, callbacks React y flujos de estado asociados a onContextoComparador.

## Limitación corregida

En HF-CODEMAP v1.0.0, la consulta:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs variable onContextoComparador

respondía que la variable no existía.

En HF-CODEMAP v1.1.0, onContextoComparador se detecta como prop/callback React.

## Resultado del indexador

- Versión: 1.1.0
- Archivos escaneados: 260
- Símbolos detectados: 5101
- Referencias cruzadas: 40931
- Guards detectados: 48
- React flows: 284
- Props flows: 2618
- State links: 88
- Flujos de dominio: 8
- Document flows: 1
- Impact entries: 3752

## Consultas validadas

- resumen
- variable onContextoComparador
- prop onContextoComparador
- callback onContextoComparador
- state-flow contextoComparador
- react-flow onContextoComparador
- buscar actualizarContextoComparador

## Hallazgos útiles inmediatos

- onContextoComparador se detecta como callback_prop.
- HidroFlowLayout pasa onContextoComparador a HidroFlow.
- onContextoComparador se relaciona con actualizarContextoComparador.
- contextoComparador se detecta como state con setter setContextoComparador.
- actualizarContextoComparador envuelve setContextoComparador.
- ComparadorMultiMetodo recibe contexto desde contextoComparador.

## Observación

La consulta react-flow onContextoComparador aún separa react flows clásicos de props/callbacks relacionados.
Esta mejora semántica queda recomendada para OT-CODEMAP-003.

## Regla operativa

Antes de tocar un flujo React crítico, consultar:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs prop <nombre>
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs callback <nombre>
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs state-flow <nombre>

## Estado

OT-CODEMAP-002 queda lista para commit selectivo.
