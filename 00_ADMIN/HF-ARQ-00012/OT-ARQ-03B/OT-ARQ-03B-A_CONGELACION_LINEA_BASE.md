\# OT‑ARQ‑03B‑A — Congelación de Línea Base



\## Fecha



2026-07-07



\## Rama



ot-arq-03b-alineacion-cn-fuv



\## Objetivo



Congelar el estado del sistema previo a la alineación institucional del CN mediante Fuente Única de Verdad.



\## Observación origen



OBS‑ARQ‑0001



Se detectó divergencia entre:



\- Índice Hidrológico

\- Expediente Hidrológico Exportable



\## Evidencia observada



Antes de la intervención:



Índice:



CN efectivo = 88



Expediente:



CN efectivo = 94



\## Fuente institucional identificada



obtenerTrazabilidadCN()



\## Punto de intervención identificado



HidroFlow.jsx



contextoComparador



\## Estado inicial de la rama



Archivos modificados detectados:



\- HidroFlow.jsx

\- ComparadorMultiMetodo.jsx

\- cuencasCatalogo.js

\- HidroFlowLayout.jsx

\- construirPayloadExpedienteDesdeEstado.js

\- construirMarkdownExpedienteDesdePayload.js

\- construirBloqueVolumenReferenciaExpediente.js

\- generarNarrativaIDF.js

\- construirQTrMultiEscenario.js

\- expediente.js



\## Decisión



Se autoriza iniciar OT‑ARQ‑03B exclusivamente sobre la publicación institucional de:



\- CN\_base

\- CN\_ajustado

\- CN\_efectivo



preservando la trazabilidad mediante esta congelación de línea base.

