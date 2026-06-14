\# OT-0086A — Diseño de síntesis ejecutiva temporal Q(t) no adoptiva



\## Contexto



OT-0086 se abre después del cierre de OT-0085, donde se implementó una lectura comparativa de riesgo temporal Q(t) no adoptiva.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó ausencia de qSeries publicada.

\- OT-0079 auditó `uh` y descartó tratarlo como qSeries.

\- OT-0080 preparó la publicación controlada de qSeries reales.

\- OT-0081 activó y validó qSeries reales en el comparador.

\- OT-0082 implementó validación, métricas morfológicas y diagnóstico agregado.

\- OT-0083 expuso métricas morfológicas compactas y no adoptivas.

\- OT-0084 clasificó la forma Q(t) por método mediante un dictamen diagnóstico no adoptivo.

\- OT-0085 tradujo la forma Q(t) a una lectura comparativa de riesgo temporal no adoptiva.



Al cierre de OT-0085, el Panel diagnóstico qSeries permite identificar riesgos temporales por método, incluyendo nivel y factor dominante.



\## Tesis técnica



La lectura de riesgo temporal puede resumirse en una síntesis ejecutiva para facilitar interpretación técnica, pero dicha síntesis no equivale a adopción hidrológica.



OT-0086 debe agrupar hallazgos temporales relevantes sin seleccionar método, sin modificar resultados y sin levantar el estado global `No coherente`.



\## Objetivo



Diseñar una síntesis ejecutiva temporal Q(t) basada en los riesgos temporales ya calculados y visualizados.



La síntesis debe presentar hallazgos agrupados, breves y trazables, manteniendo carácter diagnóstico y no adoptivo.



\## Hallazgos ejecutivos candidatos



La síntesis podrá agrupar información como:



\- Métodos con riesgo alto por recesión prolongada.

\- Método con riesgo alto por asimetría extrema o concentración abrupta.

\- Métodos con persistencia temporal significativa de nivel medio.

\- Métodos con factor dominante asociado a W50/W25.

\- Métodos con duración efectiva alta y receso dominante.



\## Fuentes permitidas



La síntesis ejecutiva solo puede usar:



\- Resultados del helper `evaluarRiesgoTemporalQt`.

\- Filas de riesgo temporal ya generadas.

\- Dictamen de forma Q(t) ya calculado.

\- Métricas morfológicas ya calculadas desde qSeries reales.



No se permite usar qSeries cruda directamente en esta OT.



\## Fuentes no permitidas



Durante OT-0086 no se permite:



\- Leer qSeries cruda para producir la síntesis.

\- Reconstruir Q(t).

\- Interpolar.

\- Recalcular métricas.

\- Recalcular caudales.

\- Usar Qpico, tPico o volTotal como sustitutos de qSeries.

\- Seleccionar automáticamente un método.

\- Levantar el estado global `No coherente`.



\## Alcance visual propuesto



La exposición visual debe ser breve y ejecutiva.



Se propone agregar un bloque dentro del Panel diagnóstico qSeries con:



\- Síntesis ejecutiva temporal Q(t).

\- Grupos de hallazgos por nivel de riesgo.

\- Factores dominantes principales.

\- Advertencia explícita de no adopción.



El bloque debe indicar explícitamente:



> Síntesis diagnóstica no adoptiva.



\## Restricciones



Durante OT-0086:



\- No se modifica `calcHidroCompleto`.

\- No se modifica `uh`.

\- No se modifica `hidroEngine.js`.

\- No se reconstruye Q(t).

\- No se interpola.

\- No se recalculan métricas morfológicas.

\- No se recalculan caudales.

\- No se modifica la tabla Q-5.

\- No se selecciona automáticamente ningún método.

\- No se levanta el estado global `No coherente`.

\- No se reemplaza revisión hidrológica profesional.

\- No se convierte la síntesis ejecutiva en decisión hidráulica final.



\## Criterio de aceptación de diseño



OT-0086A se considera válida si deja definido:



\- Qué significa síntesis ejecutiva temporal Q(t).

\- Qué fuentes puede usar.

\- Qué fuentes no puede usar.

\- Qué hallazgos puede agrupar.

\- Que la síntesis no adopta método.

\- Que la síntesis no levanta `No coherente`.

\- Que la síntesis es diagnóstica y no decisoria.



\## Dictamen inicial



OT-0086 no es una OT de adopción.



OT-0086 es una OT de síntesis ejecutiva diagnóstica de riesgo temporal Q(t), basada en métricas, forma y riesgo temporal previamente calculados.

