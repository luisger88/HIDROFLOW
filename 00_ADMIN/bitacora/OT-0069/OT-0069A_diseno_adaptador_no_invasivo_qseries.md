# OT-0069A — Diseño del adaptador no invasivo de publicación qSeries

Fecha: 2026-06-12 18:58:54

## Estado base

- Rama: ot-0069-adaptador-no-invasivo-publicacion-qseries.
- Rama creada desde main limpio post OT-0068.
- Main base: 5e59baf, merge post PR #98.
- OT-0068 dejó contrato de publicación qSeries en OT-0068E.
- Working tree inicial limpio.

## Objetivo

Diseñar un adaptador no invasivo para publicar qSeries normalizada por método de hidrograma, a partir de los objetos existentes, sin recalcular hidrogramas y sin modificar el motor hidrológico.

## Fuente técnica heredada

- OT-0068A definió métricas mínimas de forma Q(t).
- OT-0068B auditó disponibilidad de series Q(t).
- OT-0068C auditó qSeries y estructura temporal.
- OT-0068D dictaminó insuficiencia para calcular métricas morfológicas sin qSeries normalizada.
- OT-0068E definió contrato mínimo de publicación qSeries.

## Contrato objetivo

El adaptador deberá producir, por método, un objeto con:

- metodoId.
- metodoNombre.
- tipo igual a q.
- qSeries como arreglo temporal.
- tiempoMin por punto.
- caudalM3s por punto.
- Qpico.
- tPico.
- volTotal.
- dtMin si está disponible.
- fuente.
- estadoPublicacion.

## Principio de diseño

El adaptador debe leer y normalizar. No debe calcular hidrogramas, no debe modificar valores reportados, no debe corregir Qp, Tp ni volumen, y no debe inferir forma cuando la serie temporal no exista.

## Entradas candidatas

- contextoBase?.hidrogramas.
- Objetos de método disponibles en el comparador.
- Campos resumen existentes: Qp, qp, Qpico, qPico, caudalPico.
- Campos temporales existentes: Tp, tp, tPico, tiempoPico.
- Campos de volumen existentes: volumen, volTotal, volumenTotal.
- Posibles series existentes: qSeries, series, serie, data, points.

## Estados de publicación

- publicado: qSeries completa y válida.
- parcial: existe serie pero no cumple todo el contrato.
- no_disponible: no existe serie temporal.
- inconsistente: la serie contradice Qpico, tPico o volTotal.

## Reglas de no invasión

- No modificar hidroEngine.js.
- No modificar fórmulas de hidrogramas.
- No recalcular Q-Tr.
- No recalcular Q-5.
- No recalcular Método Racional.
- No alterar Qp, Tp, Volumen ni Q(t).
- No generar PDF, Word ni mapas.
- No usar SIATA para forzar caudales.

## Ruta de implementación posterior

OT-0069A solo diseña. Una fase posterior podrá crear un servicio puro, por ejemplo adaptarQSeriesHidrogramas.js, que reciba los hidrogramas existentes y devuelva objetos normalizados según el contrato OT-0068E.

## Criterio de salida

OT-0069A queda completa cuando exista un diseño versionado del adaptador no invasivo de publicación qSeries, sin cambios funcionales sobre la aplicación.
