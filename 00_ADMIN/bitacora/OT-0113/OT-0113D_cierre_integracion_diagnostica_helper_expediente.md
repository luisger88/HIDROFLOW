\# OT-0113D — Cierre técnico de integración diagnóstica no invasiva del helper del expediente



\## Contexto



OT-0113 se abrió después del cierre de OT-0112, donde se comparó de forma controlada el helper puro inicial del expediente hidrológico mínimo contra el expediente operativo actual.



OT-0112 confirmó que el helper y el expediente operativo compartían la estructura documental mínima esperada, con brechas estructurales igual a cero.



\## Objetivo de OT-0113



Integrar el helper puro del expediente dentro de `ComparadorMultiMetodo.jsx` únicamente como diagnóstico interno/no operativo.



La integración no debía reemplazar `textoExpediente`, no debía modificar el botón de copiado y no debía cambiar el comportamiento del portapapeles.



\## Secuencia ejecutada



\### OT-0113A — Diseño documental



Se documentó el diseño de integración diagnóstica no invasiva del helper del expediente.



El enfoque definido fue:



\- importar el helper,

\- ejecutarlo de forma controlada,

\- capturar su resultado como diagnóstico interno,

\- registrar advertencias en consola solo si falla,

\- no mostrar bloque visual nuevo,

\- no cambiar el texto copiado,

\- no cambiar portapapeles.



\### OT-0113B — Integración diagnóstica mínima



Se modificó:



```js

src/components/ComparadorMultiMetodo.jsx

