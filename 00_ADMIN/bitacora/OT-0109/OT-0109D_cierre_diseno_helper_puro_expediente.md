\# OT-0109D — Cierre técnico del diseño de helper puro para expediente hidrológico mínimo



\## Contexto



OT-0109 se abrió después del cierre de OT-0108, donde se confirmó que el expediente hidrológico mínimo ya existe como salida funcional robusta dentro de `ComparadorMultiMetodo.jsx`.



OT-0108 concluyó que el expediente no debe crearse desde cero, sino fortalecerse como producto exportable principal mediante desacoplamiento arquitectónico, separación de plantilla/datos/salida y futura preparación para exportación formal.



\## Secuencia ejecutada



\### OT-0109A — Diseño documental del helper puro



Se documentó la necesidad de preparar un helper puro para construir el expediente hidrológico mínimo fuera del componente visual.



La ubicación futura propuesta fue:



```js

src/services/documentos/construirExpedienteHidrologicoMinimo.js

