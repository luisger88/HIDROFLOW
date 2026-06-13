# OT-0077D — Diseño de auditoría focal del punto de generación o pérdida de Q(t)

Fecha: 2026-06-12 22:53:18

## Estado base

- Rama: ot-0077-ruta-publicacion-futura-series-qt.
- OT-0077A cerrada en commit 4a15a9c.
- OT-0077B cerrada en commit b7f231c.
- OT-0077C cerrada en commit c86350f.
- Alcance: diseño de auditoría focal, sin cambios funcionales.

## Objetivo

Diseñar una auditoría focal para identificar el punto exacto donde se genera, transforma, resume o pierde la serie temporal Q(t), sin modificar el motor hidrológico, sin recalcular hidrogramas y sin alterar Qpico, tPico, volTotal ni Q(t).

## Pregunta técnica central

¿La serie temporal Q(t) existe en alguna etapa previa al comparador y se pierde durante la publicación al contexto, o el flujo actual solo conserva resultados resumen como Qpico, tPico y volTotal?

## Puntos de auditoría propuestos

### 1. Motor hidrológico

Auditar si el motor genera explícitamente arreglos temporales para cada método de hidrograma antes de calcular Qpico, tPico y volTotal.

### 2. Capa de orquestación HidroFlow.jsx

Auditar si HidroFlow.jsx recibe objetos de hidrograma con series temporales o si solo recibe resultados resumen.

### 3. Contexto exportable

Auditar si el contexto exportable conserva únicamente resultados resumen o si existe alguna serie no transportada al comparador.

### 4. contextoBase?.hidrogramas

Auditar si contextoBase?.hidrogramas contiene únicamente resultados o si existe una estructura anidada con serie temporal no reconocida.

### 5. ComparadorMultiMetodo.jsx

Auditar si el comparador consume solo Qpico, tPico y volTotal, o si descarta una serie temporal existente por no estar normalizada.

## Evidencia actual

- El panel qSeries informa Estado: No disponible.
- El resumen estructural informa tipoEntrada: object.
- El resumen estructural informa contenedor: resultados.
- El resumen estructural informa candidatos: 5.
- El resumen estructural informa conSerieTemporal: 0.
- El resumen estructural informa sinSerieTemporal: 5.
- El resumen estructural informa conQpico: 5.
- El resumen estructural informa conTPico: 5.
- El resumen estructural informa conVolTotal: 5.

## Método de auditoría recomendado

La auditoría debe ser documental y de código, con búsquedas focales sobre nombres de campos y funciones relacionadas con hidrogramas, evitando volcados masivos y evitando impresión de series completas.

## Patrones a buscar

- qSeries.
- series.
- serie.
- data.
- points.
- q.
- Q.
- tiempo.
- caudal.
- Qpico.
- tPico.
- volTotal.
- hidrogramas.
- Snyder.
- Clark.
- Williams.
- Hann.
- SCS.

## Prohibiciones

- No modificar hidroEngine.js en esta fase.
- No modificar HidroFlow.jsx en esta fase.
- No modificar ComparadorMultiMetodo.jsx en esta fase.
- No recalcular hidrogramas.
- No reconstruir qSeries desde valores resumen.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular métricas morfológicas.
- No usar SIATA para forzar caudales.

## Decisión técnica

OT-0077D no implementa cambios funcionales. Solo diseña la auditoría focal que permitirá determinar en una fase posterior dónde nace o se pierde Q(t).

## Siguiente fase recomendada

OT-0077E — Auditoría focal en código del punto de generación o pérdida de Q(t).

## Criterio de salida

OT-0077D queda completa cuando exista diseño versionado de auditoría focal del punto de generación o pérdida de Q(t), sin cambios funcionales sobre la aplicación.
