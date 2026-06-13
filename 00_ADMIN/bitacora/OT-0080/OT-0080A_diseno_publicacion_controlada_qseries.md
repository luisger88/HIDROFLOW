\# OT-0080A — Publicación controlada de qSeries real



\## Contexto



Las OT-0078 y OT-0079 demostraron que:



\- El motor hidrológico sí genera qSeries real mediante calcHidroCompleto.

\- qSeries contiene pares {t, Q} con unidades coherentes.

\- Se calculan Qpico, tPico y volTotal a partir de qSeries.

\- Sin embargo, qSeries no es publicado aguas arriba en contextoBase.hidrogramas.



Esto genera una situación donde el sistema:



\- Sí calcula la serie completa Q(t),

\- Pero solo expone valores resumen.



\## Hallazgo técnico



Función auditada:



calcHidroCompleto(lluvRows, uh\_struct, dt\_min)



Salida real:



{

&#x20; qSeries,

&#x20; Qpico,

&#x20; tPico,

&#x20; volTotal,

&#x20; metodo,

&#x20; color

}



Conclusión:



\- qSeries existe, es físico y consistente.

\- La no publicación es una decisión de arquitectura, no un error del motor.



\## Problema



El objeto publicado en contextoBase.hidrogramas:



\- Incluye Qpico, tPico, volTotal

\- NO incluye qSeries



Esto impide:



\- análisis temporal

\- auditoría morfológica

\- trazabilidad del hidrograma



\## Objetivo de OT-0080



Definir y ejecutar una publicación controlada de qSeries que:



\- No modifique el motor

\- No recalcula hidrogramas

\- No reconstruya Q(t)

\- Sea explícita y opcional



\## Propuesta de contrato



Estructura esperada:



{

&#x20; qSeries,

&#x20; Qpico,

&#x20; tPico,

&#x20; volTotal,

&#x20; metodo,

&#x20; color

}



\## Control de publicación



Incluir bandera de control:



publicarQSeries: false (por defecto)



Comportamiento:



\- false → solo resumen (estado actual)

\- true → incluye qSeries



\## Restricciones



\- No modificar hidroEngine.js

\- No modificar fórmulas

\- No recalcular hidrogramas

\- No construir Q(t) desde resúmenes

\- No usar uh como qSeries

\- No calcular métricas morfológicas aún



\## Dictamen



La publicación de qSeries es:



\- Técnicamente válida ✅

\- Hidrológicamente consistente ✅

\- Arquitectónicamente viable ✅



La siguiente fase debe implementar la publicación mínima controlada.

