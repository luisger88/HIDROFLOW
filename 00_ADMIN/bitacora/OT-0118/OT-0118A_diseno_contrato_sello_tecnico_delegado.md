\# OT-0118A — Diseño contractual del sello técnico delegado



\## Contexto



OT-0118 se abre después del cierre de OT-0117, donde se validó reforzadamente el sello técnico auxiliar delegado al helper del expediente.



La cadena previa dejó consolidado que:



\- OT-0115 permitió que el helper aportara una línea auxiliar de metadata.

\- OT-0116 permitió que el helper construyera un bloque auxiliar del sello técnico.

\- OT-0117 validó reforzadamente que ese bloque está completo, presente y libre de tokens inválidos.



\## Objetivo



Formalizar el contrato documental del sello técnico delegado antes de ampliar la delegación a otras secciones del expediente.



\## Bloque contractual



El contrato aplica exclusivamente al bloque auxiliar generado por:



```js

construirLineasSelloTecnicoAuxiliarExpediente(...)

