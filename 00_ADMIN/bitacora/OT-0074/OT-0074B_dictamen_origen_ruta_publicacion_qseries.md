# OT-0074B — Dictamen de origen y ruta de publicación real qSeries

Fecha: 2026-06-12 20:57:48

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- OT-0074A cerrada en commit eb8f82b.
- Main base: ab1cc83, posterior a OT-0073.
- Alcance: dictamen técnico documental, sin cambios funcionales.

## Objetivo

Emitir un dictamen técnico sobre el origen real de las series Q(t) y la ruta correcta para publicar qSeries reales por método, sin recalcular hidrogramas ni alterar Qp, Tp, Volumen o Q(t).

## Evidencia heredada de OT-0074A

- El panel qSeries reporta actualmente Estado: No disponible.
- Total de métodos evaluados: 5.
- Publicados: 0.
- Parciales: 0.
- No disponibles: 5.
- Inconsistentes: 0.
- La auditoría OT-0074A buscó qSeries, series, serie, data, points y campos asociados a Qpico, tPico y volTotal.

## Dictamen preliminar

Con la evidencia disponible, el problema operativo no es el cálculo de Qp, Tp o Volumen, sino la ausencia de publicación normalizada de series temporales Q(t) bajo el contrato qSeries.

Por tanto, no procede calcular métricas morfológicas de forma hasta establecer una ruta explícita de publicación real de qSeries por método.

## Hipótesis de origen

La ausencia de qSeries puede deberse a una de estas causas:

1. El motor genera solo valores resumen y no conserva serie temporal.
2. El motor genera serie temporal pero no la publica al contexto.
3. La serie existe con otro nombre o estructura no reconocida por el adaptador.
4. La serie se pierde en una etapa intermedia antes del comparador.

## Ruta técnica recomendada

Antes de modificar código funcional, se requiere una auditoría más focal del objeto real de hidrogramas generado en tiempo de ejecución o publicado al contexto, con evidencia de estructura concreta por método.

La ruta recomendada es:

- Identificar el objeto exacto donde se construyen hidrogramas Q-5.
- Confirmar si existe arreglo temporal antes de resumir Qp, Tp y Volumen.
- Si existe, publicar qSeries desde el contexto sin recalcular.
- Si no existe, documentar limitación y diseñar retención futura de serie temporal en el motor, sin alterar resultados existentes.

## Prohibiciones técnicas

- No reconstruir qSeries desde Qp y Tp.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular métricas morfológicas sin qSeries real.
- No usar SIATA para forzar caudales.
- No modificar hidroEngine.js en esta fase.

## Decisión técnica

OT-0074B no autoriza todavía la publicación funcional de qSeries. Primero debe identificarse el objeto real de hidrogramas en ejecución y verificarse si contiene serie temporal completa por método.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No calcular métricas morfológicas.

## Criterio de salida

OT-0074B queda completa cuando exista dictamen versionado sobre el origen y ruta de publicación real qSeries, sin cambios funcionales sobre la aplicación.
