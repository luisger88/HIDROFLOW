\# OT-0114D — Cierre técnico de comparación runtime helper vs textoExpediente operativo



\## Contexto



OT-0114 se abrió después del cierre de OT-0113, donde el helper puro del expediente hidrológico mínimo fue integrado dentro de `ComparadorMultiMetodo.jsx` como diagnóstico interno/no operativo.



OT-0113 ejecutaba el helper en el contexto real del comparador, pero aún no comparaba su texto contra el `textoExpediente` operativo construido en el mismo flujo.



\## Objetivo de OT-0114



Agregar una comparación runtime no invasiva entre:



```js

diagnosticoHelperExpediente.texto

