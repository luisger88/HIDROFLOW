# OT-0077C — Dictamen de ruta viable para publicación Q(t)

Fecha: 2026-06-12 22:51:44

## Estado base

- Rama: ot-0077-ruta-publicacion-futura-series-qt.
- OT-0077A cerrada en commit 4a15a9c.
- OT-0077B cerrada en commit b7f231c.
- Alcance: dictamen técnico documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico sobre la ruta viable para publicar series temporales Q(t) reales por método, a partir de la auditoría de rutas candidatas, sin recalcular hidrogramas ni reconstruir series desde valores resumen.

## Evidencia consolidada

- El objeto hidrogramas llega al comparador como contenedor de resultados.
- Total de candidatos: 5.
- Candidatos con serie temporal reconocible: 0.
- Candidatos sin serie temporal reconocible: 5.
- Candidatos con Qpico: 5.
- Candidatos con tPico: 5.
- Candidatos con volTotal: 5.

## Evaluación de rutas candidatas

### Ruta 1 — Publicación desde motor hidrológico

Viable solo si se confirma que el motor genera y retiene internamente series Q(t) antes de resumirlas. No debe implementarse sin auditoría específica del punto exacto de generación.

### Ruta 2 — Publicación desde contexto exportable

Viable solo si existe una serie temporal aguas arriba que actualmente no se transporta al contexto. No es viable si el contexto solo recibe resultados resumen.

### Ruta 3 — Adaptador sobre objetos existentes

No viable en el estado actual del comparador, porque los objetos disponibles contienen Qpico, tPico y volTotal, pero no contienen serie temporal reconocible.

### Ruta 4 — Retención futura de serie temporal

Ruta técnicamente más segura si se confirma que el flujo actual no conserva series Q(t). Debe diseñarse como retención de serie real en origen, no como reconstrucción posterior.

## Dictamen técnico

No existe ruta viable inmediata para publicar qSeries reales desde el comparador usando los objetos actualmente disponibles, porque no hay serie temporal reconocible en los 5 candidatos evaluados.

La ruta viable debe partir del origen de generación o retención de la serie Q(t). Si el motor ya genera la serie, debe publicarse desde el origen o desde el contexto exportable. Si el motor no la conserva, debe diseñarse una retención futura de serie temporal sin alterar resultados existentes.

## Prohibiciones

- No reconstruir qSeries desde Qpico, tPico o volTotal.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular métricas morfológicas sin qSeries real.
- No usar SIATA para forzar caudales.
- No modificar hidroEngine.js en esta fase.
- No recalcular hidrogramas.
- No alterar Qpico, tPico, volTotal ni Q(t).

## Decisión técnica

OT-0077C no autoriza implementación funcional. El siguiente paso debe ser diseñar una auditoría focal del punto exacto donde el motor genera o pierde la serie temporal Q(t).

## Siguiente fase recomendada

OT-0077D — Diseño de auditoría focal del punto de generación o pérdida de Q(t).

## Criterio de salida

OT-0077C queda completa cuando exista dictamen versionado de ruta viable para publicación Q(t), sin cambios funcionales sobre la aplicación.
