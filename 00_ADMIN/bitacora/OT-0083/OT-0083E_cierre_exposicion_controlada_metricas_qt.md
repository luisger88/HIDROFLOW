\# OT-0083E — Cierre técnico de exposición controlada de métricas Q(t)



\## Contexto



OT-0083 se desarrolló después del cierre de OT-0082, donde se implementó una ruta segura para diagnóstico morfológico preliminar sobre qSeries reales publicadas.



El propósito de OT-0083 fue avanzar desde el diagnóstico agregado hacia una exposición controlada y compacta de métricas morfológicas Q(t), manteniendo separación estricta entre diagnóstico, decisión técnica y adopción hidrológica.



\## Secuencia ejecutada



\### OT-0083A — Diseño documental



Se documentó el diseño de exposición controlada de métricas morfológicas Q(t), estableciendo que la exposición sería diagnóstica y no adoptiva.



\### OT-0083B — Preparación de filas tabulares



Se preparó la estructura `filasMorfologiaQt` a partir de las evaluaciones generadas por el diagnóstico morfológico Q(t).



Las filas incluyen únicamente valores derivados del helper puro validado:



\- método,

\- estado,

\- Qp,

\- tPico,

\- duración efectiva,

\- tiempo de ascenso,

\- tiempo de receso,

\- W50,

\- W25,

\- asimetría.



\### OT-0083C — Tabla compacta no adoptiva



Se incorporó una tabla compacta dentro del Panel diagnóstico qSeries.



La tabla muestra métricas morfológicas Q(t) por método, pero no adopta resultados ni modifica el estado global del modelo.



\### OT-0083D — Validación visual



Se validó visualmente que la tabla quedó ubicada en el Panel diagnóstico qSeries, con los cinco métodos listados y estado Apta para las cinco series.



\## Resultado visual validado



La UI muestra:



\- Diagnóstico morfológico Q(t): series aptas 5/5.

\- No aptas: 0.

\- Tabla diagnóstica morfológica Q(t).

\- Métodos listados: SCS, SCS Mod., Snyder, Williams \& Hann y Clark IUH.

\- Columnas visibles: Método, Estado, Qp, tPico, De, Ascenso, Receso, W50, W25 y Asim.

\- Estado global del modelo: No coherente.



\## Restricciones mantenidas



Durante OT-0083:



\- No se modificó `calcHidroCompleto`.

\- No se modificó `uh`.

\- No se modificó `hidroEngine.js`.

\- No se reconstruyó Q(t).

\- No se interpolaron series.

\- No se usaron Qpico, tPico ni volTotal como sustitutos de qSeries.

\- No se mostraron arrays crudos.

\- No se listaron puntos tiempo-caudal de forma masiva.

\- No se adoptó automáticamente ningún método.

\- No se levantó el estado global `No coherente`.

\- No se reemplazó el dictamen técnico del expediente.



\## Validación



Build aprobado con Vite:



```text

✓ 854 modules transformed.

✓ built

