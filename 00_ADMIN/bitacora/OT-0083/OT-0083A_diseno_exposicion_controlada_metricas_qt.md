\# OT-0083A — Diseño de exposición controlada de métricas morfológicas Q(t)



\## Contexto



OT-0083 se abre después del cierre de OT-0082, donde se implementó una ruta segura para diagnóstico morfológico preliminar sobre qSeries reales publicadas.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó la ausencia de qSeries publicada.

\- OT-0079 auditó `uh` y descartó tratarlo como qSeries.

\- OT-0080 preparó la publicación controlada de qSeries.

\- OT-0081 activó y validó qSeries reales en el comparador.

\- OT-0082 creó un validador puro de qSeries, un helper puro de métricas morfológicas y un diagnóstico agregado que reporta series aptas y no aptas.



Al cierre de OT-0082, el Panel diagnóstico qSeries muestra un diagnóstico agregado equivalente a:



\- Series aptas: 5/5.

\- No aptas: 0.

\- No se muestran métricas detalladas.

\- No se adopta ningún método.



\## Tesis técnica



La disponibilidad de qSeries y de métricas morfológicas preliminares no implica adopción hidrológica.



OT-0083 solo puede exponer métricas detalladas como diagnóstico técnico de forma temporal.



La exposición debe preservar el estado global `No coherente` mientras no exista una OT posterior específica de dictamen hidrológico de forma y adopción.



\## Objetivo



Diseñar una exposición controlada de métricas morfológicas Q(t) en el comparador, usando únicamente resultados del helper puro:



```js

calcularMetricasMorfologiaQt(qSeries)

