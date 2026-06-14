\# OT-0085A — Diseño de criterio comparativo de riesgo temporal Q(t) no adoptivo



\## Contexto



OT-0085 se abre después del cierre de OT-0084, donde se implementó un dictamen diagnóstico de forma temporal Q(t) no adoptivo.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó ausencia de qSeries publicada.

\- OT-0079 auditó `uh` y descartó tratarlo como qSeries.

\- OT-0080 preparó la publicación controlada de qSeries reales.

\- OT-0081 activó y validó qSeries reales en el comparador.

\- OT-0082 implementó validación, métricas morfológicas y diagnóstico agregado.

\- OT-0083 expuso métricas morfológicas compactas y no adoptivas.

\- OT-0084 clasificó la forma Q(t) por método mediante un dictamen diagnóstico no adoptivo.



Al cierre de OT-0084, el Panel diagnóstico qSeries muestra una clasificación de forma temporal para cada método, incluyendo forma, alerta y severidad.



\## Tesis técnica



La clasificación de forma Q(t) permite construir una lectura comparativa de riesgo temporal, pero dicha lectura no equivale a adopción hidrológica.



OT-0085 debe convertir la clasificación de forma en un criterio diagnóstico de riesgo temporal, sin seleccionar método, sin modificar resultados y sin levantar el estado global `No coherente`.



\## Objetivo



Diseñar un criterio comparativo de riesgo temporal Q(t) basado en las métricas morfológicas y la clasificación de forma ya generadas.



El criterio debe servir para orientar la lectura técnica de la respuesta temporal de cada método, manteniendo carácter diagnóstico y no adoptivo.



\## Riesgos temporales candidatos



Los riesgos temporales preliminares son:



\- Riesgo por pico temprano.

\- Riesgo por ascenso abrupto.

\- Riesgo por recesión prolongada.

\- Riesgo por asimetría extrema.

\- Riesgo por persistencia temporal.

\- Riesgo por núcleo ancho.

\- Riesgo por duración efectiva prolongada.



\## Fuentes permitidas



El criterio de riesgo temporal solo puede usar:



\- Métricas morfológicas ya calculadas desde qSeries reales.

\- Clasificación generada por `clasificarFormaQt`.

\- Banderas diagnósticas devueltas por el helper de clasificación.

\- Severidad ya calculada como parte del dictamen de forma.



No se permite usar qSeries cruda directamente en esta OT.



\## Variables candidatas



Las variables candidatas son:



\- forma.

\- alerta.

\- severidad.

\- banderas.

\- duración efectiva.

\- tiempo de ascenso.

\- tiempo de receso.

\- W50.

\- W25.

\- asimetría.

\- Qp.

\- tPico.



\## Restricciones



Durante OT-0085:



\- No se modifica `calcHidroCompleto`.

\- No se modifica `uh`.

\- No se modifica `hidroEngine.js`.

\- No se reconstruye Q(t).

\- No se interpola.

\- No se recalculan métricas morfológicas.

\- No se recalculan caudales.

\- No se modifica la tabla Q-5.

\- No se adopta automáticamente ningún método.

\- No se levanta el estado global `No coherente`.

\- No se reemplaza revisión hidrológica profesional.

\- No se convierte el riesgo temporal en decisión hidráulica final.



\## Alcance visual propuesto



La exposición visual debe ser compacta y diagnóstica.



Se propone agregar un bloque o tabla con:



\- Método.

\- Riesgo temporal principal.

\- Nivel de riesgo.

\- Factor dominante.

\- Comentario breve no adoptivo.



El bloque debe indicar explícitamente:



> Diagnóstico comparativo no adoptivo.



\## Criterio de aceptación de diseño



OT-0085A se considera válida si deja definido:



\- Qué significa riesgo temporal Q(t).

\- Qué fuentes puede usar.

\- Qué fuentes no puede usar.

\- Qué riesgos temporales se pueden clasificar.

\- Que el riesgo temporal no adopta método.

\- Que el riesgo temporal no levanta `No coherente`.



\## Dictamen inicial



OT-0085 no es una OT de adopción.



OT-0085 es una OT de lectura comparativa de riesgo temporal Q(t), basada en métricas y dictámenes previos, con carácter diagnóstico y no adoptivo.

