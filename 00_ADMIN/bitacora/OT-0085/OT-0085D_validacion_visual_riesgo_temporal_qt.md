\# OT-0085D — Validación visual de riesgo temporal Q(t)



\## Contexto



Después de OT-0085C, se validó visualmente la integración del bloque de riesgo temporal Q(t) en el Panel diagnóstico qSeries.



El riesgo temporal se deriva de las métricas morfológicas y del dictamen de forma Q(t), mediante el helper puro `evaluarRiesgoTemporalQt`.



\## Evidencia visual



El Panel diagnóstico qSeries muestra:



\- Tabla diagnóstica morfológica Q(t).

\- Dictamen diagnóstico de forma Q(t).

\- Riesgo temporal Q(t).

\- Resumen estructural de hidrogramas.



La tabla de riesgo temporal presenta las columnas:



\- Método.

\- Riesgo.

\- Nivel.

\- Factor dominante.



Los métodos aparecen con la siguiente lectura:



\- SCS: persistencia temporal significativa; nivel medio; factor dominante: anchos W50/W25 relevantes.

\- SCS Mod.: persistencia temporal significativa; nivel medio; factor dominante: anchos W50/W25 relevantes.

\- Snyder: recesión prolongada dominante; nivel alto; factor dominante: duración efectiva alta y receso dominante.

\- Williams \& Hann: asimetría extrema con concentración abrupta; nivel alto; factor dominante: receso extremo y ascenso abrupto.

\- Clark IUH: recesión prolongada dominante; nivel alto; factor dominante: duración efectiva alta y receso dominante.



\## Restricciones verificadas



Durante la validación visual:



\- No se seleccionó automáticamente ningún método.

\- No se levantó el estado global `No coherente`.

\- No se modificaron caudales.

\- No se reconstruyó Q(t).

\- No se interpolaron series.

\- No se modificó el motor hidrológico.

\- No se reemplazó la revisión hidrológica profesional.

\- No se mostraron arrays crudos ni puntos tiempo-caudal masivos.



\## Dictamen



OT-0085C queda visualmente validada.



La lectura de riesgo temporal Q(t) queda integrada como diagnóstico comparativo no adoptivo.

