\# OT-0114A — Diseño de comparación runtime helper vs textoExpediente operativo



\## Contexto



OT-0114 se abre después del cierre de OT-0113, donde se integró el helper puro del expediente hidrológico mínimo dentro de `ComparadorMultiMetodo.jsx` como diagnóstico interno/no operativo.



OT-0113 ejecuta el helper en el contexto real del comparador, pero aún no compara su texto contra el `textoExpediente` operativo que se copia actualmente al portapapeles.



\## Objetivo



Diseñar una comparación runtime, diagnóstica y no invasiva entre:



```js

diagnosticoHelperExpediente.texto

