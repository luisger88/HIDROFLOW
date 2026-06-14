\# OT-0109C — Diseño de interfaz mínima del helper puro del expediente



\## Contexto



OT-0109 busca preparar la extracción controlada de `textoExpediente` desde `ComparadorMultiMetodo.jsx` hacia un helper puro documental.



Después de OT-0109B, se confirmó que `textoExpediente` depende de múltiples datos, funciones locales, tablas derivadas, validadores y controles de salida.



Por tanto, antes de implementar código, se define la interfaz mínima del helper.



\## Objetivo



Diseñar la interfaz mínima del futuro helper puro:



```js

construirExpedienteHidrologicoMinimo(...)

