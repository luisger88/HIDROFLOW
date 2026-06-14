\# OT-0087A — Diseño de diagnóstico temporal Q(t) para expediente no adoptivo



\## Contexto



OT-0087 se abre después del cierre de OT-0086, donde se implementó una síntesis ejecutiva temporal Q(t) no adoptiva.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó ausencia de qSeries publicada.

\- OT-0079 auditó `uh` y descartó tratarlo como qSeries.

\- OT-0080 preparó la publicación controlada de qSeries reales.

\- OT-0081 activó y validó qSeries reales en el comparador.

\- OT-0082 implementó validación, métricas morfológicas y diagnóstico agregado.

\- OT-0083 expuso métricas morfológicas compactas y no adoptivas.

\- OT-0084 clasificó la forma Q(t) por método mediante dictamen no adoptivo.

\- OT-0085 tradujo la forma Q(t) a riesgo temporal comparativo no adoptivo.

\- OT-0086 sintetizó ejecutivamente los hallazgos temporales dominantes.



Al cierre de OT-0086, el Panel diagnóstico qSeries contiene una lectura completa de métricas, forma, riesgo y síntesis temporal.



\## Tesis técnica



La cadena de diagnóstico temporal Q(t) puede consolidarse en el expediente como sección técnica exportable, siempre que se mantenga el carácter no adoptivo.



La incorporación al expediente no debe seleccionar método, no debe modificar caudales, no debe levantar el estado global `No coherente` y no debe reemplazar revisión hidrológica profesional.



\## Objetivo



Diseñar una sección exportable para el expediente hidrológico mínimo que consolide:



\- métricas morfológicas Q(t),

\- dictamen de forma Q(t),

\- riesgo temporal Q(t),

\- síntesis ejecutiva temporal Q(t),



manteniendo advertencia explícita de diagnóstico no adoptivo.



\## Alcance propuesto



La sección exportable deberá contener:



1\. Título de sección:

&#x20;  - Diagnóstico temporal Q(t) no adoptivo.



2\. Fuente de datos:

&#x20;  - qSeries reales publicadas y validadas.

&#x20;  - Métricas morfológicas calculadas desde qSeries.

&#x20;  - Dictamen de forma Q(t).

&#x20;  - Riesgo temporal Q(t).

&#x20;  - Síntesis ejecutiva temporal Q(t).



3\. Resumen ejecutivo:

&#x20;  - Riesgo alto.

&#x20;  - Riesgo medio.

&#x20;  - Riesgo bajo.

&#x20;  - No determinado.

&#x20;  - Lectura agrupada de hallazgos temporales.



4\. Tabla o listado por método:

&#x20;  - Método.

&#x20;  - Forma.

&#x20;  - Riesgo temporal.

&#x20;  - Nivel.

&#x20;  - Factor dominante.



5\. Advertencia técnica:

&#x20;  - Diagnóstico no adoptivo.

&#x20;  - No selecciona método.

&#x20;  - No levanta `No coherente`.

&#x20;  - No reemplaza revisión hidrológica profesional.



\## Fuentes permitidas



La sección del expediente solo puede usar:



\- `filasMorfologiaQt`.

\- `filasDictamenFormaQt`.

\- `filasRiesgoTemporalQt`.

\- `sintesisRiesgoTemporalQt`.

\- Resultados derivados de helpers puros ya integrados.



No se permite leer qSeries cruda directamente en la generación del texto del expediente.



\## Fuentes no permitidas



Durante OT-0087 no se permite:



\- Reconstruir Q(t).

\- Interpolar series.

\- Recalcular métricas morfológicas.

\- Recalcular riesgos fuera de los helpers existentes.

\- Recalcular caudales.

\- Usar `uh` como qSeries.

\- Usar Qpico, tPico o volTotal como sustitutos de qSeries.

\- Seleccionar automáticamente un método.

\- Levantar el estado global `No coherente`.



\## Restricciones



Durante OT-0087:



\- No se modifica `calcHidroCompleto`.

\- No se modifica `uh`.

\- No se modifica `hidroEngine.js`.

\- No se modifica la lógica de convolución.

\- No se alteran Qp, Tp, Volumen ni Q(t).

\- No se modifica la tabla Q-5.

\- No se adopta automáticamente ningún método.

\- No se convierte el diagnóstico temporal en decisión hidráulica final.



\## Alcance visual/exportable propuesto



La primera integración debe ser textual y controlada dentro del expediente copiado.



No debe incluir arrays crudos ni puntos tiempo-caudal completos.



Debe ser una sección breve, trazable y defendible, por ejemplo:



\- `## Diagnóstico temporal Q(t) no adoptivo`

\- `### Síntesis ejecutiva temporal`

\- `### Lectura por método`

\- `### Restricciones de interpretación`



\## Criterio de aceptación de diseño



OT-0087A se considera válida si deja definido:



\- Qué información temporal puede exportarse.

\- Qué fuentes puede usar.

\- Qué fuentes no puede usar.

\- Qué advertencias deben acompañar la sección.

\- Que la sección no adopta método.

\- Que la sección no levanta `No coherente`.

\- Que la sección no reemplaza revisión hidrológica profesional.



\## Dictamen inicial



OT-0087 no es una OT de adopción.



OT-0087 es una OT de consolidación exportable del diagnóstico temporal Q(t), con carácter no adoptivo y trazabilidad explícita hacia métricas, forma, riesgo y síntesis ejecutiva.

