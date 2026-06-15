\# OT-0115A — Diseño de sustitución parcial controlada del armado documental auxiliar



\## Contexto



OT-0115 se abre después del cierre de OT-0114, donde el helper puro del expediente hidrológico mínimo fue comparado en runtime contra `textoExpediente` operativo.



La cadena previa dejó el helper en estado maduro para una primera sustitución parcial:



\- OT-0109: diseño del helper.

\- OT-0110: helper puro inicial creado.

\- OT-0111: helper validado aislado.

\- OT-0112: helper comparado contra expediente operativo.

\- OT-0113: helper ejecutado en runtime como diagnóstico no invasivo.

\- OT-0114: helper comparado en runtime contra `textoExpediente`.



\## Objetivo



Diseñar una sustitución parcial, controlada y reversible del armado documental auxiliar del expediente hidrológico mínimo.



La sustitución no debe reemplazar `textoExpediente` completo.



\## Tesis técnica



El primer uso operativo parcial del helper debe limitarse a un bloque auxiliar de bajo riesgo.



No se recomienda iniciar por:



\- Q-5,

\- Método Racional,

\- diagnóstico Q(t),

\- control Pe–Área–Volumen,

\- validaciones finales,

\- portapapeles.



La sustitución inicial más segura es usar metadata o sello documental auxiliar generado por el helper.



\## Bloque candidato



El bloque candidato para sustitución parcial es:



```text

metadata / versión / sello auxiliar del expediente

