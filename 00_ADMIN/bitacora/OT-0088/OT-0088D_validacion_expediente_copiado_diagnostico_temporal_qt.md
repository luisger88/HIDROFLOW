\# OT-0088D — Validación del expediente copiado con diagnóstico temporal Q(t)



\## Contexto



Después de OT-0088C, se validó funcionalmente el flujo de copiado del expediente hidrológico mínimo con la validación textual estricta de la sección Diagnóstico temporal Q(t) no adoptivo.



La validación se ejecuta antes de enviar el texto final al portapapeles mediante el helper puro:



```js

validarSeccionDiagnosticoTemporalQt(textoExpediente)

