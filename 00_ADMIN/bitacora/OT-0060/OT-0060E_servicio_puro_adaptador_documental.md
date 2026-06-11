# OT-0060E — Servicio puro del adaptador documental

Fecha: 2026-06-10 21:06:09

## Estado base

- Rama: ot-0060-salida-documental-formal-expediente.
- OT-0060A cerrada en commit 0ab1eca.
- OT-0060B cerrada en commit 75268b2.
- OT-0060C cerrada en commit ab4391f.
- OT-0060D cerrada en commit 276d0f8.
- Main base: ae75b35, estabilizado post OT-0059.
- Working tree inicial limpio.

## Objetivo

Crear un servicio puro mínimo para adaptar el expediente textual/exportable a una estructura documental formal, sin integrar UI y sin generar PDF, Word, mapas ni exportaciones complejas.

## Ubicación propuesta

`01_APP/HIDROFLOW/src/services/documentos/adaptarExpedienteDocumental.js`

## Reglas de implementación

- Servicio puro.
- Sin React.
- Sin `hidroEngine.js`.
- Sin estado global.
- Sin recálculos.
- Sin alteración de unidades.
- Sin modificación de resultados numéricos.
- Sin PDF.
- Sin Word.
- Sin mapas.
- Entrada única principal: `textoExpediente`.
- Salida: estructura documental mínima.

## Función candidata

`adaptarExpedienteDocumental(textoExpediente, metadatosDocumento = {})`

## Salida esperada

- `ok`.
- `errores`.
- `advertencias`.
- `titulo`.
- `estadoTecnico`.
- `secciones`.
- `restricciones`.
- `trazabilidad`.

## Criterio de salida

OT-0060E queda completa cuando exista un servicio puro versionado, sin integración UI, con validación mínima de contrato y sin alterar la aplicación.
