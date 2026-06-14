\# OT-0096A — Diseño de validación de consistencia visual de tarjeta matriz patrón



\## Contexto



OT-0096 se abre después del cierre de OT-0095, donde se integró una lectura comparativa textual automática desde la matriz patrón La Iguaná PC\_80.



La tarjeta de matriz patrón ya contiene:



\- datos compactos de cuenca,

\- gráfica Qp–tPico,

\- gráfica de velocidad efectiva,

\- lectura comparativa automática,

\- resumen de riesgo alto / medio,

\- salida hidráulica futura,

\- advertencia no adoptiva.



\## Objetivo



Validar la consistencia visual y textual de la tarjeta de matriz patrón.



El objetivo no es agregar nueva funcionalidad, sino revisar que la lectura integrada sea clara, ordenada, compacta y técnicamente coherente.



\## Criterios de revisión



La validación debe revisar:



\- orden de los bloques visuales,

\- legibilidad de la tarjeta,

\- coherencia entre gráficas y lectura textual,

\- gramática singular/plural,

\- repetición innecesaria de advertencias,

\- consistencia de mensajes no adoptivos,

\- ausencia de afirmaciones de adopción o descarte automático,

\- claridad de la salida hidráulica futura.



\## Alcance



OT-0096 debe limitarse a control de calidad visual/textual.



Puede derivar en ajustes mínimos de redacción si se detectan frases gramaticalmente débiles o redundantes.



\## Fuera de alcance



Durante OT-0096 no se debe:



\- modificar `hidroEngine.js`,

\- modificar `calcHidroCompleto`,

\- recalcular hidrogramas,

\- recalcular métricas,

\- modificar Q(t),

\- modificar el expediente,

\- adoptar métodos,

\- descartar métodos automáticamente,

\- levantar el estado global No coherente,

\- generalizar la matriz a otras cuencas,

\- implementar hidráulica.



\## Criterio de aceptación



OT-0096A se considera válida si define una revisión concreta de consistencia visual/textual de la tarjeta de matriz patrón, sin ampliar el alcance funcional.



\## Dictamen inicial



OT-0096 debe actuar como control de calidad de la tarjeta integrada, evitando que HidroFlow acumule visualizaciones útiles pero textualmente confusas.

