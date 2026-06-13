\# OT-0082A — Diseño de métricas morfológicas preliminares de Q(t)



\## Contexto



OT-0082 se abre después del cierre de OT-0081, donde se activó y validó la publicación auditada de qSeries reales.



La cadena técnica previa dejó establecido que:



\- OT-0078 identificó ausencia de qSeries publicadas.

\- OT-0079 auditó `uh` y determinó que no debe confundirse con qSeries.

\- OT-0080 preparó la publicación controlada de qSeries reales.

\- OT-0081 activó `publicarQSeries = true`, validó la publicación estructural y corrigió el dictamen textual del comparador.



Al cierre de OT-0081, el panel diagnóstico qSeries reportó:



\- Estado: Disponible

\- Total: 5

\- Publicados: 5

\- Parciales: 0

\- No disponibles: 0

\- Inconsistentes: 0



El resumen estructural reportó:



\- Candidatos: 5

\- Con serie: 5

\- Sin serie: 0

\- Con Qpico: 5

\- Con tPico: 5

\- Con volTotal: 5



\## Tesis técnica



Las métricas morfológicas de Q(t) solo pueden calcularse si existe qSeries real, reconocida estructuralmente, no parcial y consistente.



No se permite calcular métricas desde Qpico, tPico o volTotal aislados.



No se permite reconstruir Q(t).



No se permite interpolar sin justificación técnica posterior.



\## Objetivo



Diseñar un conjunto mínimo de métricas morfológicas preliminares sobre qSeries reales publicadas, manteniendo bloqueo de adopción hidrológica y sin alterar el motor.



\## Métricas candidatas



Las métricas preliminares candidatas son:



\- Duración efectiva del hidrograma.

\- Tiempo de ascenso.

\- Tiempo de receso.

\- Ancho temporal al 50 % de Qp.

\- Ancho temporal al 25 % de Qp.

\- Pendiente media de ascenso.

\- Pendiente media de receso.

\- Asimetría temporal ascenso/receso.



\## Condiciones mínimas de cálculo



Antes de calcular cualquier métrica, cada qSeries debe cumplir:



\- Ser un array.

\- Tener longitud mayor que cero.

\- Contener puntos con tiempo y caudal numéricos.

\- Tener valores `t` crecientes o no decrecientes.

\- Tener valores `Q` finitos.

\- Tener Qp mayor que cero.

\- No contener `undefined`, `null`, `NaN` ni objetos inválidos.

\- No estar marcada como parcial o inconsistente por el diagnóstico estructural.



\## Restricciones



Durante OT-0082:



\- No se modifica `calcHidroCompleto`.

\- No se modifica `uh`.

\- No se modifica `hidroEngine.js`.

\- No se reconstruye Q(t).

\- No se interpola la serie.

\- No se calculan métricas si qSeries no existe.

\- No se calculan métricas si la serie es parcial.

\- No se adopta automáticamente ningún método.

\- No se levanta el bloqueo global de coherencia física.

\- No se cambia el Bloque Q-5 salvo para mostrar diagnóstico controlado si procede.



\## Criterio de aceptación de diseño



OT-0082A se considera válida si deja documentado:



\- Qué métricas pueden calcularse.

\- Qué condiciones deben cumplirse antes del cálculo.

\- Qué restricciones impiden el cálculo.

\- Que qSeries es la única fuente válida para métricas morfológicas.

\- Que la disponibilidad de qSeries no implica adopción hidrológica.



\## Dictamen inicial



OT-0082 no es una OT de adopción.



OT-0082 inicia como una OT de diseño y control de elegibilidad para métricas morfológicas preliminares de Q(t).

