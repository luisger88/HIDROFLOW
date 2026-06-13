# OT-0078F — Diseño de auditoría focal del empaquetamiento de resultados de hidrogramas

Fecha: 2026-06-12 23:28:31

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078A cerrada en commit 36ad49c.
- OT-0078B cerrada en commit 8dce21d.
- OT-0078C cerrada en commit 677cafc.
- OT-0078D cerrada en commit 78d865d.
- OT-0078E cerrada en commit 6439b4c.
- Alcance: diseño de auditoría focal, sin cambios funcionales.

## Objetivo

Diseñar una auditoría focal para identificar el punto exacto donde se empaquetan los resultados de hidrogramas que llegan al comparador, verificando si antes del empaquetamiento existe una serie temporal Q(t) y si se pierde al construir resultados.

## Pregunta técnica central

¿Dónde se arma el objeto hidrogramas.resultados con Qpico, tPico y volTotal, y qué información existe antes de ese empaquetamiento?

## Puntos de auditoría propuestos

- Construcción del objeto hidrogramas.
- Construcción del arreglo resultados.
- Asignación de Qpico, tPico y volTotal.
- Presencia de serie temporal antes de empaquetar resultados.
- Pérdida o descarte de campos qSeries, series, serie, data o points.
- Publicación hacia contextoBase?.hidrogramas.

## Evidencia heredada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- Los resultados contienen Qpico, tPico y volTotal.
- Los resultados no contienen serie temporal reconocible.
- OT-0078E dictaminó que el foco debe moverse al empaquetamiento previo al contexto.

## Método propuesto

Auditar con búsquedas focales en HidroFlow.jsx e hidroEngine.js, priorizando patrones donde se construyen objetos con claves resultados, Qpico, tPico y volTotal.

## Prohibiciones

- No modificar HidroFlow.jsx en OT-0078F.
- No modificar hidroEngine.js.
- No modificar ComparadorMultiMetodo.jsx.
- No recalcular hidrogramas.
- No reconstruir qSeries desde valores resumen.
- No inventar puntos tiempo-caudal.
- No calcular métricas morfológicas.

## Decisión técnica

OT-0078F no implementa cambios funcionales. Solo diseña la auditoría focal del empaquetamiento de resultados de hidrogramas.

## Siguiente fase recomendada

OT-0078G — Auditoría focal en código del empaquetamiento de resultados de hidrogramas.

## Criterio de salida

OT-0078F queda completa cuando exista diseño versionado de auditoría focal del empaquetamiento de resultados de hidrogramas, sin cambios funcionales sobre la aplicación.
