# OT-0078H — Dictamen del empaquetamiento de resultados de hidrogramas

Fecha: 2026-06-12 23:42:06

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078A cerrada en commit 36ad49c.
- OT-0078B cerrada en commit 8dce21d.
- OT-0078C cerrada en commit 677cafc.
- OT-0078D cerrada en commit 78d865d.
- OT-0078E cerrada en commit 6439b4c.
- OT-0078F cerrada en commit ee9300b.
- OT-0078G cerrada en commit 4236bdc.
- Alcance: dictamen documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico sobre el empaquetamiento de resultados de hidrogramas, a partir de la auditoría focal OT-0078G.

## Evidencia consolidada

- El comparador recibe contextoBase?.hidrogramas como contenedor de resultados.
- El resumen estructural reporta tipoEntrada object y contenedor resultados.
- El resumen estructural reporta 5 candidatos.
- Los 5 candidatos contienen Qpico, tPico y volTotal.
- Ninguno de los 5 candidatos expone serie temporal reconocible.
- OT-0078G auditó el empaquetamiento en HidroFlow.jsx, hidroEngine.js y ComparadorMultiMetodo.jsx.

## Dictamen técnico

La evidencia disponible indica que el empaquetamiento que llega al comparador conserva resultados resumen, no series temporales Q(t). El objeto resultados transporta Qpico, tPico y volTotal, pero no transporta una estructura temporal reconocible.

El punto crítico sigue estando antes o durante el empaquetamiento de resultados, no en la visualización del comparador. La siguiente auditoría debe enfocarse en el punto exacto donde se calculan o derivan Qpico, tPico y volTotal.

## Implicación técnica

No procede agregar qSeries en el comparador ni construirlas desde resultados resumen. La única ruta técnicamente válida es publicar una serie temporal real desde el punto de cálculo o conservarla antes de resumir los hidrogramas.

## Ruta siguiente permitida

- Auditar el cálculo o derivación de Qpico, tPico y volTotal.
- Identificar si Q(t) existe antes de calcular esos resúmenes.
- Si Q(t) existe, diseñar publicación al empaquetamiento sin recalcular.
- Si Q(t) no existe, diseñar retención futura al momento del cálculo.

## Rutas prohibidas

- Reconstruir Q(t) desde Qpico y tPico.
- Inventar puntos tiempo-caudal.
- Interpolar forma Q(t) sin serie real.
- Calcular métricas morfológicas sin qSeries real.
- Modificar hidroEngine.js sin auditoría focal previa del punto exacto de cálculo.

## Decisión técnica

OT-0078H no autoriza implementación funcional. La siguiente fase debe auditar específicamente el cálculo o derivación de Qpico, tPico y volTotal.

## Siguiente fase recomendada

OT-0078I — Diseño de auditoría focal del cálculo de Qpico, tPico y volTotal.

## Criterio de salida

OT-0078H queda completa cuando exista dictamen versionado del empaquetamiento de resultados de hidrogramas, sin cambios funcionales sobre la aplicación.
