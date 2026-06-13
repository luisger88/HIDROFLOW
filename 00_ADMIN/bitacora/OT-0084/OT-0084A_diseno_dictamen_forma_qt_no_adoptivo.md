\# OT-0084A — Diseño de dictamen técnico de forma Q(t) no adoptivo



\## Contexto



OT-0084 se abre después del cierre de OT-0083, donde se implementó la exposición controlada de métricas morfológicas Q(t) en el Panel diagnóstico qSeries.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó la ausencia de qSeries publicada.

\- OT-0079 auditó `uh` y descartó tratarlo como qSeries.

\- OT-0080 preparó la publicación controlada de qSeries.

\- OT-0081 activó y validó qSeries reales.

\- OT-0082 implementó validación y diagnóstico morfológico agregado.

\- OT-0083 expuso una tabla compacta no adoptiva de métricas morfológicas Q(t).



Al cierre de OT-0083, el comparador muestra métricas por método:



\- Qp.

\- tPico.

\- De.

\- Tiempo de ascenso.

\- Tiempo de receso.

\- W50.

\- W25.

\- Asimetría.



\## Tesis técnica



La disponibilidad de métricas morfológicas permite interpretar la forma temporal de los hidrogramas, pero no implica adopción hidrológica.



OT-0084 debe producir un dictamen técnico de forma Q(t) de carácter diagnóstico, sin modificar resultados, sin recalcular caudales y sin levantar el estado global `No coherente`.



\## Objetivo



Diseñar un criterio de clasificación no adoptivo para la forma temporal de cada método Q(t), usando únicamente las métricas morfológicas ya calculadas desde qSeries reales validadas.



\## Variables de lectura



Las variables principales para el dictamen son:



\- Duración efectiva `De`.

\- Tiempo de ascenso.

\- Tiempo de receso.

\- Relación receso/ascenso o asimetría.

\- W50.

\- W25.

\- tPico.

\- Qp.



\## Clasificaciones candidatas



Las formas candidatas preliminares son:



\- Forma concentrada.

\- Forma prolongada.

\- Forma recesiva.

\- Forma altamente asimétrica.

\- Forma abrupta.

\- Forma temporalmente sensible.

\- Forma moderada o equilibrada.



\## Criterios cualitativos iniciales



La clasificación deberá ser conservadora y diagnóstica.



Ejemplos de lectura preliminar:



\- Asimetría alta puede indicar recesión dominante.

\- Ascenso muy corto frente al receso puede indicar respuesta abrupta y altamente asimétrica.

\- Duración efectiva muy larga puede indicar hidrograma prolongado.

\- W50 y W25 amplios pueden indicar persistencia de caudales significativos.

\- tPico temprano con Qp alto puede indicar forma temporal crítica.



Estos criterios no equivalen a adopción del método.



\## Restricciones



Durante OT-0084:



\- No se modifica `calcHidroCompleto`.

\- No se modifica `uh`.

\- No se modifica `hidroEngine.js`.

\- No se reconstruye Q(t).

\- No se interpola.

\- No se modifican métricas.

\- No se recalculan caudales.

\- No se adopta automáticamente ningún método.

\- No se levanta el estado global `No coherente`.

\- No se reemplaza el dictamen técnico del expediente.

\- No se usa el dictamen de forma como decisión hidráulica final.



\## Alcance visual propuesto



La primera exposición visual deberá ser compacta.



Se propone agregar una columna o bloque diagnóstico con:



\- Método.

\- Forma temporal preliminar.

\- Alerta de forma.

\- Comentario técnico breve.



El dictamen debe quedar explícitamente marcado como:



> Diagnóstico no adoptivo.



\## Criterio de aceptación de diseño



OT-0084A se considera válida si deja definido:



\- Que el dictamen proviene solo de métricas ya calculadas desde qSeries.

\- Que la clasificación es diagnóstica.

\- Que no modifica cálculos.

\- Que no adopta métodos.

\- Que no levanta `No coherente`.

\- Que la interpretación hidrológica final queda diferida a una OT posterior.



\## Dictamen inicial



OT-0084 no es una OT de adopción.



OT-0084 es una OT de interpretación diagnóstica de forma temporal Q(t), basada en métricas morfológicas expuestas en OT-0083.

