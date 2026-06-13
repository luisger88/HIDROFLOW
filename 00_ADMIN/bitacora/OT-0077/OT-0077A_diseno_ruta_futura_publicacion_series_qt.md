# OT-0077A — Diseño de ruta futura para publicar series Q(t)

Fecha: 2026-06-12 22:46:47

## Estado base

- Rama: ot-0077-ruta-publicacion-futura-series-qt.
- Rama creada desde main limpio post OT-0076.
- Main base: e93b859, merge post PR #106.
- OT-0076 dejó dictaminada la ausencia de serie temporal publicada.
- Working tree inicial limpio.

## Objetivo

Diseñar una ruta técnica futura para publicar series temporales Q(t) reales por método, sin reconstruir artificialmente hidrogramas, sin recalcular resultados y sin alterar Qpico, tPico, volTotal ni Q(t).

## Evidencia heredada

- Tipo entrada: object.
- Contenedor: resultados.
- Candidatos: 5.
- Con serie temporal: 0.
- Sin serie temporal: 5.
- Con Qpico: 5.
- Con tPico: 5.
- Con volTotal: 5.

## Problema técnico

El comparador recibe resultados resumen por método, pero no recibe serie temporal Q(t) reconocible. Esto impide calcular métricas morfológicas de forma como De, W50, W25, pendientes relativas o asimetría subida/recesión.

## Principio rector

La publicación futura de Q(t) debe partir de series realmente generadas o retenidas por el flujo hidrológico. No se deben inventar puntos tiempo-caudal, no se debe interpolar desde Qpico/tPico/volTotal y no se debe reconstruir forma temporal sin serie real.

## Rutas candidatas

### Ruta 1 — Publicación desde motor hidrológico

El motor conserva o expone directamente la serie temporal generada por cada hidrograma. Esta ruta es la más fiel, pero requiere auditoría cuidadosa para no modificar fórmulas ni recalcular resultados.

### Ruta 2 — Publicación desde contexto exportable

El motor o la capa de orquestación ya produce series internas, pero solo publica resúmenes al comparador. La serie puede agregarse al contexto exportable sin alterar Qpico, tPico ni volTotal.

### Ruta 3 — Adaptador sobre objetos existentes

Si las series existen con nombres no normalizados, el adaptador puede mapearlas al contrato qSeries sin recalcular. Esta ruta solo es válida si existe arreglo temporal real.

### Ruta 4 — Retención futura de serie temporal

Si el flujo actual no conserva series Q(t), se debe diseñar una fase futura de retención de la serie temporal al momento de cálculo, sin cambiar resultados resumen existentes.

## Contrato de publicación objetivo

Cada método deberá publicar, cuando exista serie real:

- metodoId.
- metodoNombre.
- tipo: q.
- qSeries.
- tiempoMin.
- caudalM3s.
- Qpico.
- tPico.
- volTotal.
- dtMin si está disponible.
- fuente.
- estadoPublicacion.

## Prohibiciones

- No reconstruir qSeries desde Qpico y tPico.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular De, W50, W25, pendientes ni asimetría sin qSeries real.
- No modificar hidroEngine.js en OT-0077A.
- No recalcular hidrogramas.
- No alterar Qpico, tPico, volTotal ni Q(t).
- No usar SIATA para forzar caudales.

## Decisión técnica

OT-0077A no implementa publicación funcional. Solo diseña la ruta futura de publicación de series Q(t). La siguiente fase debe auditar cuál de las rutas candidatas es viable en el código real.

## Siguiente fase recomendada

OT-0077B — Auditoría de rutas candidatas de publicación Q(t).

## Criterio de salida

OT-0077A queda completa cuando exista diseño versionado de ruta futura para publicar series Q(t), sin cambios funcionales sobre la aplicación.
