\# OT-0115D — Cierre técnico de sustitución parcial controlada con metadata auxiliar del helper



\## Contexto



OT-0115 se abrió después del cierre de OT-0114, donde el helper puro del expediente hidrológico mínimo fue comparado en runtime contra `textoExpediente` operativo.



La cadena previa dejó al helper en estado maduro para una primera sustitución parcial:



\- OT-0109: diseño del helper.

\- OT-0110: helper puro inicial creado.

\- OT-0111: helper validado aislado.

\- OT-0112: helper comparado contra expediente operativo.

\- OT-0113: helper ejecutado en runtime como diagnóstico no invasivo.

\- OT-0114: helper comparado en runtime contra `textoExpediente`.



\## Objetivo de OT-0115



Realizar una sustitución parcial, controlada y reversible del armado documental auxiliar del expediente hidrológico mínimo.



La sustitución no debía reemplazar `textoExpediente` completo.



\## Secuencia ejecutada



\### OT-0115A — Diseño documental



Se documentó que la sustitución parcial inicial debía concentrarse en un bloque de bajo riesgo:



```text

metadata / versión / sello auxiliar del expediente

