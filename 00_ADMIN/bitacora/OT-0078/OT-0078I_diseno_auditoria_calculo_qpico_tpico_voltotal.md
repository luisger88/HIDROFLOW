# OT-0078I — Diseño de auditoría focal del cálculo de Qpico, tPico y volTotal

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078A cerrada en commit 36ad49c.
- OT-0078B cerrada en commit 8dce21d.
- OT-0078C cerrada en commit 677cafc.
- OT-0078D cerrada en commit 78d865d.
- OT-0078E cerrada en commit 6439b4c.
- OT-0078F cerrada en commit ee9300b.
- OT-0078G cerrada en commit 4236bdc.
- OT-0078H cerrada en commit db871ba.
- Alcance: diseño documental corto, sin cambios funcionales.

## Objetivo

Diseñar una auditoría focal para ubicar dónde se calculan o derivan Qpico, tPico y volTotal dentro del flujo de hidrogramas, y determinar si estos valores provienen de una serie temporal Q(t) existente o de una estructura que no conserva la serie.

## Pregunta técnica central

Determinar si Qpico, tPico y volTotal se calculan a partir de una serie temporal Q(t) disponible antes del resumen, o si el flujo actual genera directamente valores resumen sin conservar la serie.

## Preguntas de auditoría

- Dónde se calcula Qpico.
- Dónde se calcula tPico.
- Dónde se calcula volTotal.
- Si Qpico se obtiene como máximo de una serie temporal.
- Si tPico se obtiene como tiempo asociado al máximo de una serie.
- Si volTotal se integra a partir de una serie temporal.
- Si la serie temporal existe justo antes del cálculo de estos resúmenes.
- Si la serie se descarta después de obtener Qpico, tPico y volTotal.

## Archivos candidatos para auditoría posterior

- 01_APP/HIDROFLOW/src/services/hidroEngine.js
- 01_APP/HIDROFLOW/src/HidroFlow.jsx
- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
- 01_APP/HIDROFLOW/src/services/hidrogramas/

## Patrones de búsqueda propuestos

- Qpico, Qp, qPico, caudalPico.
- tPico, Tp, tiempoPico.
- volTotal, volumen, volumenTotal.
- Math.max, reduce, map.
- qSeries, series, serie, data, points.
- tiempo, caudal, hidrograma, hidrogramas.

## Evidencia heredada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta tipoEntrada object y contenedor resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- OT-0078H dictaminó que el punto crítico está antes o durante el empaquetamiento de resultados.

## Prohibiciones

- No modificar hidroEngine.js en OT-0078I.
- No modificar HidroFlow.jsx.
- No modificar ComparadorMultiMetodo.jsx.
- No recalcular hidrogramas.
- No reconstruir Q(t) desde Qpico y tPico.
- No inventar puntos tiempo-caudal.
- No interpolar forma Q(t) sin serie real.
- No calcular métricas morfológicas.

## Decisión técnica

OT-0078I no implementa cambios funcionales. Solo diseña la auditoría focal del cálculo o derivación de Qpico, tPico y volTotal.

## Siguiente fase recomendada

OT-0078J — Auditoría focal en código del cálculo de Qpico, tPico y volTotal.

## Criterio de salida

OT-0078I queda completa cuando exista diseño versionado de auditoría focal del cálculo de Qpico, tPico y volTotal, sin cambios funcionales sobre la aplicación.
