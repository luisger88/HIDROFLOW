\# OT-0119A — Selección del siguiente bloque documental no crítico



\## Contexto



OT-0119 se abre después del cierre de OT-0118, donde se consolidó y congeló el contrato documental del sello técnico delegado al helper del expediente hidrológico mínimo.



La cadena previa dejó un patrón seguro:



\- OT-0115: el helper aportó una línea auxiliar.

\- OT-0116: el helper construyó un bloque auxiliar del sello técnico.

\- OT-0117: el sello técnico delegado fue validado reforzadamente.

\- OT-0118: el contrato del sello técnico delegado quedó congelado.



\## Objetivo



Seleccionar el siguiente bloque documental no crítico que podría ser delegado parcialmente al helper en una OT futura.



Esta OT no implementa código funcional.



\## Criterios de selección



El bloque candidato debe cumplir:



\- ser documental,

\- ser de bajo riesgo,

\- no tocar cálculos hidrológicos,

\- no tocar caudales,

\- no tocar hidrogramas,

\- no tocar validadores finales,

\- no modificar portapapeles,

\- no reemplazar `textoExpediente`,

\- permitir contrato verificable.



\## Bloques candidatos



\### 1. Identificación



Incluye datos como:



\- cuenca,

\- área,

\- fuente de contexto,

\- estación IDF,

\- pendiente,

\- longitud de cauce principal.



Riesgo: bajo.



\### 2. Parámetros hidrológicos base



Incluye:



\- CN,

\- CN base,

\- CN efectivo,

\- AMC.



Riesgo: medio-bajo, porque aunque son datos descriptivos, se relacionan con cálculo hidrológico.



\### 3. Volumen de referencia



Incluye:



\- lluvia efectiva total,

\- volumen esperado,

\- fórmula Pe × Área × 1000.



Riesgo: medio, porque toca una referencia física de masa/volumen.



\## Bloques descartados por ahora



No se deben seleccionar todavía:



\- Q-5 auditado,

\- Método Racional,

\- contraste Q-5 vs Método Racional,

\- control Pe–Área–Volumen/Q-5,

\- diagnóstico temporal Q(t),

\- validación interna final,

\- restricciones técnicas finales,

\- portapapeles.



\## Selección recomendada



El bloque recomendado para futura delegación parcial es:



```text

\## 1. Identificación

