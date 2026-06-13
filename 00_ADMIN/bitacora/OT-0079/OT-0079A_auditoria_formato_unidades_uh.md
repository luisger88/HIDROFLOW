\# OT-0079A — Auditoría focal del formato y unidades de `uh`



\## Contexto



OT-0079 se abre después de OT-0078, donde se identificó evidencia aguas arriba de una estructura interna `uh` en `HidroFlow.jsx`.



La cadena técnica previa dejó establecido que:



\- El comparador recibe `contextoBase?.hidrogramas` como contenedor `resultados`.

\- El resumen estructural visible reporta cinco candidatos con Qpico, tPico y volTotal, pero cero candidatos con serie temporal publicada.

\- El panel diagnóstico qSeries sigue indicando ausencia de qSeries publicadas.

\- No existe todavía serie Q(t) cruda expuesta al comparador.

\- No se deben calcular métricas morfológicas sin qSeries real.

\- No se debe reconstruir Q(t) desde Qpico, tPico o volTotal.



\## Hallazgo base



En `HidroFlow.jsx` se identificó evidencia de una estructura interna `uh`, asociada a:



\- `const uh = Array.from({ length:n }, (\_, i)=> { ... })`

\- variable temporal `t`

\- relación con `dt\_min`

\- relación con `tp`

\- normalización mediante `normalizarHuAM`

\- retorno de estructuras con `tp`, `qp` y `uh`



\## Hipótesis técnica



`uh` parece representar una estructura temporal interna, posiblemente un hidrograma unitario normalizado o una forma temporal base de hidrograma.



Sin embargo, no se puede asumir que `uh` sea equivalente a qSeries publicable hasta auditar:



1\. formato de cada punto,

2\. unidad temporal,

3\. unidad de la ordenada,

4\. relación con volumen/masa,

5\. trazabilidad con Qpico, tPico y volTotal,

6\. competencia técnica para publicación.



\## Restricciones



Durante esta auditoría:



\- No se modifica `HidroFlow.jsx`.

\- No se modifica `hidroEngine.js`.

\- No se modifica `ComparadorMultiMetodo.jsx`.

\- No se publica `uh` como `qSeries`.

\- No se reconstruye Q(t) desde Qpico, tPico o volTotal.

\- No se calculan métricas morfológicas de hidrogramas.

\- No se interpolan series sin serie real.



\## Objetivo



Determinar si `uh` puede ser tratado como:



1\. qSeries física publicable,

2\. serie normalizada publicable con etiqueta explícita,

3\. estructura auxiliar interna no publicable,

4\. o insumo candidato que requiere adaptador técnico posterior.

