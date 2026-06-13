# OT-0078E — Dictamen de construcción de resultados de hidrogramas

Fecha: 2026-06-12 23:24:39

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078A cerrada en commit 36ad49c.
- OT-0078B cerrada en commit 8dce21d.
- OT-0078C cerrada en commit 677cafc.
- OT-0078D cerrada en commit 78d865d.
- Alcance: dictamen documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico sobre la construcción de objetos resultados de hidrogramas que llegan al comparador, a partir de la auditoría focal OT-0078D.

## Evidencia consolidada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta tipoEntrada object y contenedor resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- OT-0078D auditó la construcción de objetos resultados en ComparadorMultiMetodo.jsx, HidroFlow.jsx e hidroEngine.js.

## Dictamen técnico

La evidencia disponible indica que la estructura que llega al comparador fue diseñada o publicada como contenedor de resultados resumen. Los objetos disponibles transportan Qpico, tPico y volTotal, pero no transportan una serie temporal Q(t) reconocible.

El problema no está en la visualización del comparador, sino en la etapa previa donde los hidrogramas se empaquetan como resultados. Allí debe auditarse si Q(t) se descarta, no se conserva o nunca se materializa como estructura persistente.

## Implicación técnica

No procede resolver la ausencia de Q(t) agregando lógica al comparador. La publicación de qSeries debe originarse antes del comparador, en el punto de cálculo, retención o empaquetamiento de resultados.

## Ruta siguiente permitida

- Auditar el punto exacto donde se empaquetan los resultados de hidrogramas.
- Identificar si Q(t) existe antes de crear Qpico, tPico y volTotal.
- Si Q(t) existe, diseñar publicación al contexto sin recalcular.
- Si Q(t) no existe, diseñar retención futura de la serie temporal al momento del cálculo.

## Rutas prohibidas

- Reconstruir Q(t) desde Qpico y tPico.
- Inventar puntos tiempo-caudal.
- Interpolar forma Q(t) sin serie real.
- Calcular métricas morfológicas sin qSeries real.
- Modificar hidroEngine.js sin auditoría focal previa del punto exacto de cálculo/empaquetamiento.

## Decisión técnica

OT-0078E no autoriza implementación funcional. La siguiente fase debe auditar específicamente el punto de empaquetamiento de resultados de hidrogramas previo al contexto.

## Siguiente fase recomendada

OT-0078F — Diseño de auditoría focal del empaquetamiento de resultados de hidrogramas.

## Criterio de salida

OT-0078E queda completa cuando exista dictamen versionado de construcción de resultados de hidrogramas, sin cambios funcionales sobre la aplicación.
