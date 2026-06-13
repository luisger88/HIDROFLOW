# OT-0076F — Cierre del dictamen de ausencia de serie temporal

Fecha: 2026-06-12 22:36:27

## Estado base

- Rama: ot-0076-dictamen-ausencia-serie-temporal-hidrogramas.
- OT-0076A cerrada en commit 80dffdc.
- OT-0076B cerrada en commit 4638eb0.
- OT-0076C cerrada en commit e1507b6.
- OT-0076D cerrada en commit c9a1612.
- OT-0076E cerrada en commit c2f4b29.
- Working tree previo al cierre: limpio.

## Resultado de OT-0076

- Se diseñó el dictamen de ausencia de serie temporal publicada.
- Se auditó la ubicación segura dentro del bloque Resumen estructural de hidrogramas.
- Se diseñó el texto exacto del dictamen.
- Se implementó el dictamen dentro del bloque existente.
- Se validó visualmente en navegador.

## Evidencia estructural consolidada

- Tipo entrada: object.
- Contenedor: resultados.
- Candidatos: 5.
- Con serie: 0.
- Sin serie: 5.
- Con Qpico: 5.
- Con tPico: 5.
- Con volTotal: 5.

## Dictamen incorporado

Dictamen de serie temporal: el objeto hidrogramas contiene resultados resumen para los 5 métodos evaluados, incluyendo Qpico, tPico y volTotal, pero no publica una serie temporal Q(t) reconocible. No procede calcular métricas morfológicas de forma hasta disponer de qSeries reales o normalizadas por método.

## Lectura técnica

El comparador dispone de resultados resumen por método, pero no dispone de serie temporal Q(t) publicada bajo una estructura reconocible. Por tanto, no procede calcular métricas morfológicas como De, W50, W25, pendientes relativas o asimetría subida/recesión.

## Restricciones cumplidas

- No se creó panel adicional.
- No se mostró qSeries cruda.
- No se mostraron arrays completos.
- No se mostraron puntos tiempo-caudal.
- No se calcularon De, W50, W25, pendientes ni asimetría.
- No se modificó hidroEngine.js.
- No se modificó HidroFlow.jsx.
- No se reemplazó obtenerResultadoQMetodo.
- No se recalcularon hidrogramas.
- No se alteraron Qp, Tp, Volumen ni Q(t).
- No se modificó flujo de copiado.

## Decisión técnica

OT-0076 cierra el dictamen de ausencia de serie temporal publicada. La publicación real de qSeries o la retención de series temporales en origen queda diferida a una fase posterior.

## Siguiente fase recomendada

OT-0077 — Ruta de publicación futura de series temporales Q(t).

## Criterio de cierre

OT-0076 queda lista para Pull Request hacia main como dictamen de ausencia de serie temporal publicada.
