# OT-0075A — Diseño de exposición controlada del resumen estructural de hidrogramas

Fecha: 2026-06-12 21:43:54

## Estado base

- Rama: ot-0075-exposicion-controlada-resumen-estructural-hidrogramas.
- Rama creada desde main limpio post OT-0074.
- Main base: 6c9c1bf, merge post PR #104.
- OT-0074 dejó integrado internamente resumenEstructuraHidrogramas.
- Working tree inicial limpio.

## Objetivo

Definir una exposición visual controlada del resumen estructural de hidrogramas, usando únicamente conteos agregados y sin exponer series Q(t) crudas, arrays completos ni puntos tiempo-caudal.

## Fuente técnica heredada

- OT-0074D creó el helper puro resumirEstructuraHidrogramas.js.
- OT-0074F integró internamente resumenEstructuraHidrogramas con useMemo.
- OT-0074G validó la integración silenciosa.

## Información permitida

- tipoEntrada.
- contenedor.
- totalCandidatos.
- conSerieTemporal.
- sinSerieTemporal.
- conQpico.
- conTPico.
- conVolTotal.
- estado general del resumen estructural.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No mostrar puntos tiempo-caudal.
- No listar claves extensas completas.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes relativas.
- No calcular asimetría subida/recesión.
- No inferir forma Q(t).

## Ubicación visual candidata

El panel futuro debe ubicarse cerca del panel diagnóstico qSeries o antes del Bloque Q-5, como lectura auxiliar de estructura disponible. No debe reemplazar el panel qSeries ni la tabla Q-5.

## Comportamiento permitido en fase funcional posterior

- Leer resumenEstructuraHidrogramas.resumen.
- Mostrar conteos agregados.
- Mostrar estado de estructura hidrogramas.
- Mantener el panel como solo lectura.
- No afectar diagnosticoQSeries.
- No afectar obtenerResultadoQMetodo.

## Comportamiento prohibido

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No reemplazar obtenerResultadoQMetodo.
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Decisión técnica

OT-0075A no implementa panel funcional. Solo diseña la exposición controlada del resumen estructural. La implementación mínima queda reservada para una fase posterior de OT-0075.

## Criterio de salida

OT-0075A queda completa cuando exista diseño versionado de exposición controlada del resumen estructural de hidrogramas, sin cambios funcionales sobre la aplicación.
