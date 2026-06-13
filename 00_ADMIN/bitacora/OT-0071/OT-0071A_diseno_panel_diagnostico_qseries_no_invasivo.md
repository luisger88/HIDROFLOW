# OT-0071A — Diseño del panel diagnóstico qSeries no invasivo

Fecha: 2026-06-12 19:46:08

## Estado base

- Rama: ot-0071-panel-diagnostico-qseries-no-invasivo.
- Rama creada desde main limpio post OT-0070.
- OT-0070 dejó integrado internamente diagnosticoQSeries con useMemo.
- Servicio disponible: adaptarQSeriesHidrogramas.js.
- Working tree inicial limpio.

## Objetivo

Diseñar un panel visual no invasivo para mostrar el resumen de disponibilidad qSeries, sin modificar cálculos, sin exponer series crudas y sin calcular métricas morfológicas de forma Q(t).

## Fuente técnica heredada

- OT-0068 definió el contrato de publicación qSeries.
- OT-0069 creó y validó el adaptador puro qSeries.
- OT-0070 integró diagnosticoQSeries internamente de forma silenciosa.

## Información permitida en el panel

- Total de métodos evaluados.
- Métodos con qSeries publicados.
- Métodos parciales.
- Métodos no disponibles.
- Métodos inconsistentes.
- Estado general: disponible, parcial, no disponible o inconsistente.

## Información prohibida en esta fase

- No mostrar qSeries cruda.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes relativas.
- No calcular asimetría subida/recesión.

## Ubicación visual candidata

El panel futuro debe ubicarse cerca del Bloque Q-5, como lectura diagnóstica auxiliar previa o cercana a la tabla de hidrogramas, sin reemplazar el bloque Q-5 ni alterar el flujo de copiado.

## Comportamiento permitido en fase funcional posterior

- Leer diagnosticoQSeries.resumen.
- Mostrar contadores agregados.
- Mostrar estado general no adoptivo.
- Mantener el panel como solo lectura.

## Comportamiento prohibido

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No reemplazar obtenerResultadoQMetodo.
- No calcular métricas morfológicas.
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Decisión técnica

OT-0071A no implementa panel funcional. Solo define el diseño del panel diagnóstico qSeries no invasivo. La implementación mínima queda reservada para una fase posterior de OT-0071.

## Criterio de salida

OT-0071A queda completa cuando exista diseño versionado del panel diagnóstico qSeries no invasivo, sin cambios funcionales sobre la aplicación.
