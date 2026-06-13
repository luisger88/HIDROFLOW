# OT-0078C — Dictamen aguas arriba del cálculo/resumen de hidrogramas

Fecha: 2026-06-12 23:14:01

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078A cerrada en commit 36ad49c.
- OT-0078B cerrada en commit 8dce21d.
- Alcance: dictamen documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico a partir de la auditoría focal aguas arriba, para determinar si la serie temporal Q(t) existe antes de resumirse o si el flujo actual conserva únicamente Qpico, tPico y volTotal.

## Evidencia consolidada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta tipoEntrada object y contenedor resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- La auditoría focal OT-0078B revisó ComparadorMultiMetodo.jsx, HidroFlow.jsx, hidroEngine.js y services/hidrogramas.

## Dictamen técnico

La evidencia disponible confirma que el flujo que llega al comparador conserva resultados resumen de hidrogramas, pero no publica una serie temporal Q(t) reconocible.

El punto de auditoría debe desplazarse aguas arriba hacia la construcción real de hidrogramas y el empaquetamiento previo al contexto. No es técnicamente válido resolver la ausencia de Q(t) en el comparador, porque allí ya no existe una serie temporal reconocible.

## Ruta permitida

- Auditar el punto exacto donde se construyen los objetos de resultados de hidrogramas.
- Identificar si Q(t) existe antes de generar Qpico, tPico y volTotal.
- Si Q(t) existe, diseñar su publicación al contexto sin recalcular.
- Si Q(t) no existe como objeto persistente, diseñar retención futura de la serie temporal en origen.

## Rutas prohibidas

- Reconstruir Q(t) desde Qpico y tPico.
- Inventar puntos tiempo-caudal.
- Interpolar forma Q(t) sin serie real.
- Calcular métricas morfológicas sin qSeries real.
- Modificar hidroEngine.js sin auditoría focal previa del punto exacto de cálculo.

## Decisión técnica

OT-0078C no autoriza implementación funcional. La siguiente fase debe auditar específicamente la construcción de objetos de resultados de hidrogramas antes de llegar al contextoBase?.hidrogramas.

## Siguiente fase recomendada

OT-0078D — Auditoría focal de construcción de objetos resultados de hidrogramas.

## Criterio de salida

OT-0078C queda completa cuando exista dictamen versionado aguas arriba del cálculo/resumen de hidrogramas, sin cambios funcionales sobre la aplicación.
