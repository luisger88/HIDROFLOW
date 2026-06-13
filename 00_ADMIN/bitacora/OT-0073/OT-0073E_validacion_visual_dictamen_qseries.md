# OT-0073E — Validación visual del dictamen qSeries

Fecha: 2026-06-12 20:34:40

## Estado base

- Rama: ot-0073-dictamen-operativo-estado-qseries.
- OT-0073A cerrada en commit 429e500.
- OT-0073B cerrada en commit 86c0b42.
- OT-0073C cerrada en commit 4b151a2.
- OT-0073D cerrada en commit 264fe2a.
- Build Vite aprobado en OT-0073D.

## Objetivo

Validar visualmente que el dictamen operativo qSeries aparece dentro del panel qSeries existente, sin crear un panel adicional ni modificar la tabla Q-5.

## Elementos a validar

- El panel diagnóstico qSeries sigue visible.
- El dictamen operativo aparece dentro del panel qSeries.
- No se creó un panel adicional.
- Los contadores qSeries siguen visibles.
- No se muestra qSeries cruda.
- No se muestran puntos tiempo-caudal.
- No se calculan De, W50, W25, pendientes ni asimetría.
- El Bloque Q-5 permanece visible e intacto.

## Texto esperado

Dictamen operativo: las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por método.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No calcular métricas morfológicas.

## Criterio de salida

OT-0073E queda completa cuando exista validación visual versionada del dictamen qSeries dentro del panel existente.

## Resultado de validación

- Dictamen operativo visible dentro del panel qSeries existente.
- No se observó panel adicional.
- Contadores qSeries permanecen visibles.
- No se observó qSeries cruda.
- No se observaron puntos tiempo-caudal.
- No se observaron métricas morfológicas.
- Bloque Q-5 permanece visible e intacto.
- Build Vite aprobado.
