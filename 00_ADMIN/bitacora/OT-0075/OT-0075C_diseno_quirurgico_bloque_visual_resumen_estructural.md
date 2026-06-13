# OT-0075C — Diseño quirúrgico del bloque visual mínimo de resumen estructural

Fecha: 2026-06-12 21:48:41

## Estado base

- Rama: ot-0075-exposicion-controlada-resumen-estructural-hidrogramas.
- OT-0075A cerrada en commit 585c5c2.
- OT-0075B cerrada en commit 898cc17.
- resumenEstructuraHidrogramas ya existe internamente desde OT-0074.
- Alcance: diseño de bloque visual mínimo, sin cambios funcionales.

## Objetivo

Definir el bloque visual mínimo para exponer de forma controlada el resumen estructural de hidrogramas, usando únicamente resumenEstructuraHidrogramas.resumen y sin mostrar series crudas, arrays completos ni puntos tiempo-caudal.

## Ubicación propuesta

El bloque debe ubicarse dentro o inmediatamente después del panel diagnóstico qSeries existente, como ampliación controlada de disponibilidad estructural. No debe reemplazar el panel qSeries ni invadir la tabla Q-5.

## Información mínima permitida

- Tipo de entrada.
- Contenedor detectado.
- Total de candidatos.
- Candidatos con serie temporal.
- Candidatos sin serie temporal.
- Candidatos con Qpico.
- Candidatos con tPico.
- Candidatos con volTotal.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No mostrar puntos tiempo-caudal.
- No listar claves extensas completas.
- No mostrar candidatos completos.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes.
- No calcular asimetría.
- No inferir forma Q(t).

## Texto sugerido

Resumen estructural de hidrogramas: lectura agregada del objeto hidrogramas disponible en contexto. Este bloque no muestra series crudas, no calcula métricas morfológicas y no modifica Qp, Tp, Volumen ni Q(t).

## Criterio visual

El bloque debe ser discreto, técnico y solo lectura. Debe usar conteos agregados y mantener consistencia visual con el panel qSeries existente.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No reemplazar diagnosticoQSeries.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar flujo de copiado.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0075C queda completa cuando exista diseño versionado del bloque visual mínimo de resumen estructural, sin cambios funcionales sobre la aplicación.
