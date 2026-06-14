\# OT-0109A — Diseño de helper puro para expediente hidrológico mínimo



\## Contexto



OT-0109 se abre después del cierre de OT-0108, donde se confirmó que el expediente hidrológico mínimo ya existe como salida funcional robusta dentro de `ComparadorMultiMetodo.jsx`.



OT-0108 identificó que el expediente no debe crearse desde cero, sino fortalecerse como producto exportable principal mediante desacoplamiento arquitectónico, separación de plantilla/datos/salida y futura preparación para exportación formal.



\## Objetivo



Diseñar un helper puro para construir el expediente hidrológico mínimo fuera del componente visual.



El objetivo es preparar una futura extracción controlada de `textoExpediente` desde:



```js

src/components/ComparadorMultiMetodo.jsx

