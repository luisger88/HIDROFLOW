# OT-0074C — Diseño de auditoría runtime no invasiva del objeto hidrogramas

Fecha: 2026-06-12 21:00:05

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- OT-0074A cerrada en commit eb8f82b.
- OT-0074B cerrada en commit caa8bfd.
- Alcance: diseño de auditoría runtime, sin cambios funcionales.

## Objetivo

Diseñar una auditoría runtime no invasiva para inspeccionar la estructura real de contextoBase?.hidrogramas en ejecución y determinar si contiene series temporales Q(t) o solo valores resumen.

## Pregunta central

¿El objeto real contextoBase?.hidrogramas transporta qSeries, series, serie, data, points o algún arreglo equivalente de pares tiempo-caudal por método?

## Método propuesto

La auditoría runtime debe producir un resumen estructural, no un volcado masivo. Debe reportar únicamente:

- Tipo de contextoBase?.hidrogramas.
- Si es arreglo u objeto contenedor.
- Número de métodos/candidatos detectados.
- Claves principales por método.
- Presencia de qSeries, series, serie, data o points.
- Si los posibles campos de serie son arreglos.
- Longitud de las series si existen.
- Primer punto resumido solo como claves, no como serie completa.
- Presencia de Qpico, tPico y volTotal o aliases.

## Restricciones de seguridad

- No imprimir qSeries completa.
- No imprimir arrays largos.
- No modificar motor.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No exponer la auditoría en UI productiva.
- No persistir datos sensibles o masivos.

## Ruta funcional futura

Si se implementa una auditoría runtime en OT-0074D, debe ser local, controlada, de bajo volumen y removible o encapsulada como herramienta diagnóstica. No debe formar parte del flujo operativo final sin decisión posterior.

## Criterio de salida

OT-0074C queda completa cuando exista diseño versionado de auditoría runtime no invasiva del objeto hidrogramas, sin cambios funcionales sobre la aplicación.
