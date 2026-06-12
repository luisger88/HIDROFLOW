# OT-0068E — Contrato de publicación de qSeries para métricas de forma Q(t)

Fecha: 2026-06-12 18:34:38

## Estado base

- Rama: ot-0068-coherencia-fisica-forma-qt.
- OT-0068A cerrada en commit 71dbbdb.
- OT-0068B cerrada en commit 4e29219.
- OT-0068C cerrada en commit 9114f81.
- OT-0068D cerrada en commit ebec5da.
- Working tree previo al contrato: limpio.

## Objetivo

Definir el contrato mínimo de publicación de qSeries por método de hidrograma para habilitar, en una fase posterior, el cálculo defendible de métricas de forma Q(t) sin recalcular hidrogramas ni modificar el motor hidrológico.

## Decisión técnica heredada de OT-0068D

OT-0068D dictaminó que la estructura actualmente consumida por el comparador es suficiente para auditar Qp, Tp y volumen, pero no queda suficientemente demostrada para calcular métricas morfológicas completas de Q(t).

Por tanto, antes de calcular De, W50, W25, pendientes o asimetría, se requiere publicar o normalizar qSeries como serie temporal ordenada por método.

## Principio rector

El contrato de qSeries debe exponer la serie temporal ya generada por el motor o por los objetos de hidrograma existentes. No debe recalcular resultados, no debe ajustar Qp, no debe alterar Tp, no debe modificar volumen y no debe reconstruir hidrogramas.

## Contrato mínimo propuesto por método

Cada método debe publicar un objeto normalizado con la siguiente estructura mínima:

```js
{
  metodoId: "string",
  metodoNombre: "string",
  tipo: "q",
  qSeries: [
    { tiempoMin: 0, caudalM3s: 0 }
  ],
  Qpico: null,
  tPico: null,
  volTotal: null,
  dtMin: null,
  fuente: "motor_hidroflow",
  estadoPublicacion: "publicado"
}
```

## Campos obligatorios

- metodoId: identificador estable del método.
- metodoNombre: nombre legible del método.
- tipo: debe ser q para métodos de hidrograma.
- qSeries: arreglo temporal ordenado.
- tiempoMin: tiempo del punto en minutos.
- caudalM3s: caudal del punto en m³/s.
- Qpico: caudal pico reportado o derivado del objeto existente, sin recalcular.
- tPico: tiempo al pico reportado o derivado del objeto existente, sin recalcular.
- volTotal: volumen total reportado por el hidrograma, sin recalcular.
- dtMin: paso temporal si está disponible.
- fuente: origen de publicación.
- estadoPublicacion: publicado, parcial, no_disponible o inconsistente.

## Reglas de validación del contrato

- qSeries debe ser un arreglo.
- qSeries debe contener al menos tres puntos para evaluar forma mínima.
- tiempoMin debe ser numérico y estar en orden ascendente.
- caudalM3s debe ser numérico y no negativo.
- El máximo de caudalM3s debe ser compatible con Qpico dentro de tolerancia definida.
- El tiempo asociado al máximo debe ser compatible con tPico dentro de tolerancia definida.
- No deben existir valores undefined, null no justificados, NaN ni objetos serializados como [object Object].

## Métricas que habilita el contrato

- Duración efectiva De.
- W50.
- W25.
- W50/Tp.
- W25/Tp.
- Asimetría subida/recesión.
- Pendiente relativa de subida.
- Pendiente relativa de recesión.

## Estados de publicación

- publicado: qSeries completa y válida.
- parcial: qSeries existe pero no cumple todos los requisitos.
- no_disponible: el método no expone serie temporal.
- inconsistente: qSeries contradice Qpico, tPico o volTotal reportado.

## Restricciones

- No modificar hidroEngine.js en OT-0068E.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No generar PDF, Word ni mapas.
- No usar SIATA para forzar caudales.

## Decisión técnica

OT-0068E define contrato, no implementación. La implementación del adaptador de publicación de qSeries queda diferida a una fase posterior si el contrato es aceptado.

## Criterio de salida

OT-0068E queda completa cuando exista un contrato versionado para publicar qSeries por método de hidrograma, suficiente para habilitar cálculo futuro de métricas de forma Q(t) sin recalcular resultados.
