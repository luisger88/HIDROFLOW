# OT-0075D — Implementación visual mínima del resumen estructural de hidrogramas

Fecha: 2026-06-12 21:54:01

## Estado base

- Rama: ot-0075-exposicion-controlada-resumen-estructural-hidrogramas.
- OT-0075A cerrada en commit 585c5c2.
- OT-0075B cerrada en commit 898cc17.
- OT-0075C cerrada en commit 3d429f9.
- resumenEstructuraHidrogramas ya existe internamente desde OT-0074.
- Alcance: implementación visual mínima no invasiva.

## Objetivo

Implementar un bloque visual mínimo para exponer de forma controlada el resumen estructural de hidrogramas, usando solo resumenEstructuraHidrogramas.resumen y sin exponer series crudas, arrays completos ni puntos tiempo-caudal.

## Información mostrada

- Tipo de entrada.
- Contenedor.
- Total de candidatos.
- Con serie temporal.
- Sin serie temporal.
- Con Qpico.
- Con tPico.
- Con volTotal.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No reemplazar diagnosticoQSeries.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No mostrar puntos tiempo-caudal.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0075D queda completa cuando el bloque visual mínimo renderice, el build Vite apruebe y no se hayan alterado motor, resultados hidrológicos ni flujo Q-5.
