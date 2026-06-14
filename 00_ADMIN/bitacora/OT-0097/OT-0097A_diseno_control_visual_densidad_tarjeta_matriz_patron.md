\# OT-0097A — Diseño de control visual de densidad y jerarquía de tarjeta matriz patrón



\## Contexto



OT-0097 se abre después del cierre de OT-0096, donde se validó la consistencia visual/textual de la tarjeta matriz patrón La Iguaná PC\_80 y se ajustó la concordancia gramatical de la lectura comparativa automática.



La tarjeta matriz patrón integra actualmente:



\- datos compactos de cuenca,

\- gráfica Qp–tPico,

\- gráfica de velocidad efectiva y plausibilidad temporal,

\- lectura comparativa automática,

\- resumen de riesgo alto / medio,

\- salida hidráulica futura,

\- advertencia no adoptiva.



\## Problema potencial



La tarjeta ya concentra varias capas de lectura técnica.



Aunque cada bloque aporta valor, la acumulación puede generar densidad visual, fatiga de lectura o pérdida de jerarquía entre información principal, gráfica, síntesis y advertencias.



\## Objetivo



Diseñar una validación de densidad visual y jerarquía de la tarjeta matriz patrón.



El propósito no es agregar nueva funcionalidad, sino revisar si la tarjeta debe:



\- mantenerse como bloque único,

\- compactarse visualmente,

\- separar lectura primaria y secundaria,

\- preparar subbloques colapsables,

\- reducir redundancia de advertencias,

\- mejorar jerarquía entre datos, gráficas y síntesis.



\## Criterios de revisión



La validación debe revisar:



\- orden de los bloques,

\- densidad vertical,

\- repetición de textos no adoptivos,

\- legibilidad de gráficas,

\- jerarquía entre datos, gráficos y lectura textual,

\- claridad de la salida hidráulica futura,

\- necesidad o no de colapsar secciones,

\- preservación del carácter diagnóstico y no adoptivo.



\## Alcance



OT-0097 debe limitarse a control visual y de jerarquía.



Puede derivar en un ajuste mínimo de UI si se detecta una mejora clara y de bajo riesgo.



\## Fuera de alcance



Durante OT-0097 no se debe:



\- modificar `hidroEngine.js`,

\- modificar `calcHidroCompleto`,

\- recalcular hidrogramas,

\- recalcular métricas,

\- modificar Q(t),

\- modificar la matriz patrón,

\- modificar el expediente,

\- adoptar métodos,

\- descartar métodos automáticamente,

\- levantar el estado global No coherente,

\- generalizar la matriz a otras cuencas,

\- implementar hidráulica.



\## Criterio de aceptación



OT-0097A se considera válida si define una revisión concreta de densidad visual y jerarquía de la tarjeta matriz patrón sin ampliar el alcance funcional.



\## Dictamen inicial



OT-0097 debe actuar como control de madurez visual: evitar que una tarjeta técnicamente valiosa se vuelva demasiado densa o difícil de leer.

