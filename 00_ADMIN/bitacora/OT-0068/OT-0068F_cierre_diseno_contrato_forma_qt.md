# OT-0068F — Cierre de diseño y contrato de coherencia física de la forma Q(t)

Fecha: 2026-06-12 18:40:51

## Estado base

- Rama: ot-0068-coherencia-fisica-forma-qt.
- Main base: eee40b4, posterior al cierre de OT-0067.
- OT-0068A cerrada en commit 71dbbdb.
- OT-0068B cerrada en commit 4e29219.
- OT-0068C cerrada en commit 9114f81.
- OT-0068D cerrada en commit ebec5da.
- OT-0068E cerrada en commit 4f79bbd.
- Working tree previo al cierre: limpio.

## Ciclo OT-0068 ejecutado

### OT-0068A — Apertura y métricas mínimas de forma Q(t)

- Commit: 71dbbdb docs(hidrologia): abre metricas forma temporal Qt
- Resultado: se definieron métricas candidatas como De, W50, W25, Tp/Tc, asimetría y pendientes relativas.
- Se reconoció que la forma Q(t) depende de la materia prima geomorfológica validada.

### OT-0068B — Auditoría de disponibilidad real de series Q(t)

- Commit: 4e29219 docs(hidrologia): audita disponibilidad series Qt
- Resultado: se auditó la disponibilidad de campos asociados a hidrogramas, Qp, Tp, volumen y posibles series temporales.

### OT-0068C — Auditoría focal de qSeries y estructura temporal real

- Commit: 9114f81 docs(hidrologia): audita qseries estructura temporal
- Resultado: se auditó si qSeries existía como estructura temporal suficiente para métricas de forma.
- Se verificó sin modificar ComparadorMultiMetodo.jsx, HidroFlow.jsx ni hidroEngine.js.
- Commit: 4f79bbd docs(hidrologia): define contrato qseries forma Qt
- Resultado: se definió el contrato mínimo de publicación de qSeries por método.
- El contrato exige metodoId, metodoNombre, tipo q, qSeries, tiempoMin, caudalM3s, Qpico, tPico, volTotal, dtMin, fuente y estadoPublicacion.

## Decisión técnica

OT-0068 no implementa métricas funcionales de forma Q(t). Se cierra como fase de diseño, auditoría, dictamen y contrato. La implementación funcional de publicación o adaptación de qSeries queda diferida a OT-0069.

## Restricciones cumplidas

- No se modificó ComparadorMultiMetodo.jsx.
- No se modificó HidroFlow.jsx.
- No se modificó hidroEngine.js.
- No se recalcularon hidrogramas.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se recalculó Método Racional.
- No se alteraron Qp, Tp, Volumen ni Q(t).
- No se generó PDF.
- No se generó Word.
- No se generaron mapas.
- No se usó SIATA para forzar caudales.

## Resultado final

OT-0068 deja establecida una ruta defendible para evaluar la coherencia física de la forma Q(t), sin calcular métricas prematuras sobre una estructura temporal no confirmada.

La fase concluye que primero debe existir qSeries normalizada y contractualmente publicada por método antes de calcular métricas morfológicas.

## Siguiente fase recomendada

OT-0069 — Adaptador no invasivo de publicación qSeries.

Objetivo de OT-0069: publicar o adaptar qSeries por método según el contrato OT-0068E, sin recalcular hidrogramas ni modificar el motor hidrológico.

## Criterio de cierre

OT-0068 queda lista para Pull Request hacia main como fase de diseño, auditoría, dictamen y contrato de coherencia física de la forma Q(t).
