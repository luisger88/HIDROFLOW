# OT-0071C — Diseño quirúrgico del panel qSeries mínimo

Fecha: 2026-06-12 19:50:34

## Estado base

- Rama: ot-0071-panel-diagnostico-qseries-no-invasivo.
- OT-0071A cerrada en commit ff31cc8.
- OT-0071B cerrada en commit 2560838.
- diagnosticoQSeries ya existe internamente desde OT-0070.
- Alcance: diseño de patch visual mínimo, sin cambios funcionales.

## Objetivo

Diseñar el panel visual mínimo qSeries, usando únicamente diagnosticoQSeries.resumen, sin exponer series crudas ni calcular métricas morfológicas.

## Ubicación exacta propuesta

El panel debe ubicarse antes del llamado al Bloque Q-5:

{renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}

Debe quedar como lectura auxiliar entre los bloques de diagnóstico/resumen y la tabla Q-5, sin reemplazar la tabla ni alterar obtenerResultadoQMetodo.

## Información mínima a mostrar

- Total de métodos evaluados.
- qSeries publicados.
- qSeries parciales.
- qSeries no disponibles.
- qSeries inconsistentes.
- Estado de lectura no adoptiva.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar puntos tiempo-caudal.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes.
- No calcular asimetría.

## Criterio visual

El panel debe ser discreto, no bloqueante, solo lectura y similar al estilo de paneles técnicos existentes. Su función es informar disponibilidad de qSeries, no validar adopción hidrológica.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0071C queda completa cuando exista diseño versionado del panel qSeries mínimo, sin cambios funcionales sobre la aplicación.
