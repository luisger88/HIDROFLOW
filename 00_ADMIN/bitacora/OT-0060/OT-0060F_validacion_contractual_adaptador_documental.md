# OT-0060F — Validación contractual del adaptador documental puro

Fecha: 2026-06-10 21:17:11

## Estado base

- Rama: ot-0060-salida-documental-formal-expediente.
- OT-0060A cerrada en commit 0ab1eca.
- OT-0060B cerrada en commit 75268b2.
- OT-0060C cerrada en commit ab4391f.
- OT-0060D cerrada en commit 276d0f8.
- OT-0060E apertura cerrada en commit 220a74e.
- OT-0060E funcional cerrada en commit f7a6751.
- Main base: ae75b35, estabilizado post OT-0059.
- Working tree inicial limpio.

## Objetivo

Validar contractualmente el servicio puro del adaptador documental antes de cualquier integración en UI o en ComparadorMultiMetodo.jsx.

## Servicio bajo validación

`01_APP/HIDROFLOW/src/services/documentos/adaptarExpedienteDocumental.js`

## Alcance de validación

La validación debe confirmar:

- Importación ESM correcta.
- Rechazo de entrada no string.
- Rechazo de entrada vacía.
- Detección de tokens inválidos.
- Extracción de título.
- Extracción de estado técnico.
- Separación de secciones.
- Extracción de restricciones.
- Preservación de trazabilidad.
- Ausencia de dependencias UI/motor/exportadores.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx.
- No modificar UI.
- No modificar hidroEngine.js.
- No recalcular Q-Tr.
- No recalcular Q-5.
- No recalcular Método Racional.
- No generar PDF.
- No generar Word.
- No generar mapas.
- No abrir exportaciones complejas.

## Criterio de salida

OT-0060F queda completa cuando exista un script de validación contractual versionado, el script apruebe, el build Vite apruebe y el working tree quede limpio.
