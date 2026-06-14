\# OT-0113A — Diseño de integración diagnóstica no invasiva del helper del expediente



\## Contexto



OT-0113 se abre después del cierre de OT-0112, donde se comparó de forma controlada el helper puro inicial del expediente hidrológico mínimo contra el expediente operativo actual.



OT-0112 confirmó que el helper y el expediente operativo comparten la estructura documental mínima esperada, con brechas estructurales igual a cero.



\## Objetivo



Integrar el helper puro del expediente dentro de `ComparadorMultiMetodo.jsx` únicamente como diagnóstico interno/no operativo.



La integración no debe reemplazar `textoExpediente`, no debe modificar el botón de copiado y no debe cambiar el comportamiento del portapapeles.



\## Archivo objetivo



```js

src/components/ComparadorMultiMetodo.jsx

