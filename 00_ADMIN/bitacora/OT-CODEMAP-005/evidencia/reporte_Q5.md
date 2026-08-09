
# Reporte activo Q5 — HF-CODEMAP v1.4.0


## 1. Resumen ejecutivo

- Estado del flujo: activo con ruta detectada (13 pasos activos)
- Confianza: 1
- Archivos activos principales: adaptarQSeriesHidrogramas.js, ComparadorMultiMetodo.jsx, formatoInformeHallazgos.md, HF_AuditorJefe.md
- Riesgo operativo: MODERADO

## 2. Ruta activa detectada

- [callback_receive] `qSeries recibido por evaluarEstadoPublicacion` — 01_APP/HIDROFLOW/src/services/hidrogramas/adaptarQSeriesHidrogramas.js:142
- [guard] `expediente_faltantes: Volumen esperado` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2090
- [guard] `Q5_table` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2093
- [guard] `hidrogramas_published` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2097
- [guard] `Q5_table` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2101
- [guard] `Q5_table: Tabla Q-5 auditada con filas reales` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2103

## 3. Productor real probable

- `qSeries recibido por evaluarEstadoPublicacion` — 01_APP/HIDROFLOW/src/services/hidrogramas/adaptarQSeriesHidrogramas.js:142
- [symbol] `diagnosticoQSeries` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:240
- [symbol] `resumenQSeries` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:3271
- [symbol] `estadoQSeries` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:3279

## 4. Transporte / cable React

- [callback_prop] `onContextoComparador={?}` — parent -> ModHidrogramas — 01_APP/HIDROFLOW/src/HidroFlow.jsx:2019
- [prop_received] `contextoComparador={?}` — parent -> ModHidrogramas — 01_APP/HIDROFLOW/src/HidroFlow.jsx:2019
- [callback_prop] `onContextoComparador={?}` — parent -> HidroFlow — 01_APP/HIDROFLOW/src/HidroFlow.jsx:3742
- [state_setter] `setContextoComparador={useState}` — Field -> Field — 01_APP/HIDROFLOW/src/HidroFlow.jsx:3769
- [callback_prop] `onContextoComparador={setContextoComparador}` — Field -> ModHidrogramas — 01_APP/HIDROFLOW/src/HidroFlow.jsx:4320

## 5. Consumidor documental

- [symbol] `ComparadorMultiMetodo` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:58
- [symbol] `contextoBase` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:68
- [symbol] `obtenerResultadoQMetodo` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:890
- [symbol] `obtenerMetodosQ5Validos` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:1935
- [symbol] `metodosQ5ValidosParaExpediente` — 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2047

## 6. Guard activo

- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2090`
- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2093`
- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2097`
- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2101`
- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2103`
- [guard] `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx:2228`

## 7. Diagnostico operativo

El flujo activo muestra que Q-5 depende de la publicacion de hidrogramas hacia contextoComparador y de su consumo por ComparadorMultiMetodo antes de pasar el guard tieneQ5Publicado. La ruta incluye productor en ModHidrogramas, transporte via onContextoComparador/actualizarContextoComparador, y consumo en ComparadorMultiMetodo mediante obtenerMetodosQ5Validos y filasQ5Markdown.


## 8. Proxima intervencion recomendada

- Archivo foco: `ComparadorMultiMetodo.jsx`
- Simbolo foco: `tieneQ5Publicado / filasQ5Markdown / obtenerMetodosQ5Validos`
- Validacion: copiar expediente y verificar que la seccion Q-5 muestre valores reales.
- Alternativa: `HidroFlow.jsx` — verificar publicacion via `onContextoComparador` y `HidroFlowLayout.jsx` — verificar merge `actualizarContextoComparador`
