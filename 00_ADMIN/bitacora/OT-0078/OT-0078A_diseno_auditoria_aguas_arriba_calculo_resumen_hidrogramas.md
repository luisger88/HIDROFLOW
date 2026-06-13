# OT-0078A — Diseño de auditoría aguas arriba del cálculo/resumen de hidrogramas

Fecha: 2026-06-12 23:09:54

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- Rama creada desde main limpio post OT-0077.
- Main base: 6d81472, merge post PR #107.
- OT-0077 dictaminó que la pérdida/no publicación de Q(t) ocurre antes de la llegada al comparador.
- Working tree inicial limpio.

## Objetivo

Diseñar una auditoría aguas arriba para identificar el punto exacto donde se calculan, resumen, transforman o pierden los hidrogramas Q(t), sin modificar el motor, sin recalcular hidrogramas y sin alterar Qpico, tPico, volTotal ni Q(t).

## Pregunta técnica central

¿En qué punto del flujo HidroFlow se pasa de una posible serie temporal Q(t) a resultados resumen como Qpico, tPico y volTotal?

## Alcance de auditoría

### 1. Motor hidrológico

Identificar funciones o bloques donde se calculan hidrogramas unitarios, hidrogramas transformados o series Q(t), incluyendo métodos SCS, Snyder, Clark y Williams & Hann.

### 2. Orquestación en HidroFlow.jsx

Identificar dónde se reciben resultados del motor, cómo se empaquetan y qué se publica hacia contexto, comparador o expediente.

### 3. Contexto exportable

Identificar si el contexto conserva únicamente resúmenes o si existe oportunidad de transportar series temporales reales.

### 4. ComparadorMultiMetodo.jsx

Confirmar que el comparador recibe solo resultados resumen y no debe ser el punto de reconstrucción de Q(t).

### 5. Servicios de hidrogramas

Auditar adaptadores y helpers ya creados para distinguir diagnóstico estructural de publicación real de series.

## Evidencia heredada

- contextoBase?.hidrogramas llega como contenedor de resultados.
- Total de candidatos: 5.
- Con serie temporal reconocible: 0.
- Sin serie temporal reconocible: 5.
- Con Qpico: 5.
- Con tPico: 5.
- Con volTotal: 5.
- El adaptador qSeries reporta estado No disponible.

## Método de auditoría propuesto

Realizar búsquedas focales por funciones, campos y patrones relacionados con hidrogramas y series temporales, evitando volcados masivos y evitando cualquier modificación funcional.

## Patrones candidatos

- hidrograma.
- hidrogramas.
- Qpico.
- tPico.
- volTotal.
- qSeries.
- qSerie.
- series.
- serie.
- data.
- points.
- tiempo.
- caudal.
- q.
- Q.
- Snyder.
- Clark.
- Williams.
- Hann.
- SCS.
- dt.
- dtMin.
- volumen.

## Prohibiciones

- No modificar hidroEngine.js en OT-0078A.
- No modificar HidroFlow.jsx.
- No modificar ComparadorMultiMetodo.jsx.
- No recalcular hidrogramas.
- No reconstruir qSeries desde valores resumen.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular métricas morfológicas.
- No usar SIATA para forzar caudales.

## Decisión técnica

OT-0078A no implementa cambios funcionales. Solo diseña la auditoría aguas arriba para orientar una revisión focal posterior.

## Siguiente fase recomendada

OT-0078B — Auditoría focal aguas arriba en código del cálculo/resumen de hidrogramas.

## Criterio de salida

OT-0078A queda completa cuando exista diseño versionado de auditoría aguas arriba del cálculo/resumen de hidrogramas, sin cambios funcionales sobre la aplicación.
