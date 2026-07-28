# OT-CODEMAP-005 — Cierre técnico

## Resultado

Se implementó y corrigió el reporte ejecutivo de flujo activo Q5 en HF-CODEMAP.

## Limitación corregida

Antes de esta OT, HF-CODEMAP permitía consultar rutas semánticas activas, pero no generaba un dictamen ejecutivo accionable para retomar la corrección del expediente Q-5 sin rastreo manual.

Durante la validación inicial de OT-CODEMAP-005, el reporte-activo Q5 ejecutaba, pero aún indicaba productor no detectado, cable React no detectado y consumidor documental no detectado.

Después de la corrección, reporte-activo Q5 combina semantic flows activas, símbolos, referencias y props flows para identificar productor probable, cable React, consumidor documental, guard activo y recomendación técnica.

## Resultado funcional

- reporte-activo Q5 ejecuta correctamente.
- reporte-activo Q5 --md genera salida Markdown.
- reporte-activo Q5 --write regenera 07_TOOLBOX/codemap/out/report_Q5_active.md.
- El reporte ya identifica productor probable.
- El reporte ya identifica cable React.
- El reporte ya identifica consumidor documental.
- El reporte conserva guard activo y recomendación de intervención.

## Productor probable detectado

- qSeries.
- adaptarQSeriesHidrogramas.js.
- diagnosticoQSeries.
- resumenQSeries.

## Cable React detectado

- onContextoComparador.
- contextoComparador.
- setContextoComparador.

## Consumidor documental detectado

- ComparadorMultiMetodo.
- contextoBase.
- obtenerResultadoQMetodo.
- obtenerMetodosQ5Validos.
- metodosQ5ValidosParaExpediente.

## Guard activo

- faltantesExpediente.
- tieneQ5Publicado.
- tieneHidrogramasPublicados.
- Tabla Q-5 auditada con filas reales.

## Recomendación operativa generada

- Archivo foco: ComparadorMultiMetodo.jsx.
- Símbolo foco: tieneQ5Publicado / filasQ5Markdown / obtenerMetodosQ5Validos.
- Validación: copiar expediente y verificar que la sección Q-5 muestre valores reales.
- Alternativa si persiste cero: verificar HidroFlow.jsx e HidroFlowLayout.jsx.

## Regla operativa

Antes de retomar corrección del expediente Q-5, ejecutar:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs reporte-activo Q5

y complementar con:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow Q5 --active

## Estado

OT-CODEMAP-005 queda lista para commit selectivo.
