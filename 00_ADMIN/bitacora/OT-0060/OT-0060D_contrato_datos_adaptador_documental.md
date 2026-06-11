# OT-0060D — Contrato de datos del adaptador documental

Fecha: 2026-06-10 21:04:45

## Estado base

- Rama: ot-0060-salida-documental-formal-expediente.
- OT-0060A cerrada en commit 0ab1eca.
- OT-0060B cerrada en commit 75268b2.
- OT-0060C cerrada en commit ab4391f.
- Main base: ae75b35, estabilizado post OT-0059.
- Working tree inicial limpio.

## Objetivo

Definir el contrato conceptual de datos para un futuro adaptador documental mínimo, sin crear todavía código funcional ni exportadores PDF/Word.

## Principio rector

El adaptador documental debe transformar contenido ya validado. No debe recalcular, consultar motores hidrológicos ni reconstruir lógica técnica.

Principio:

Un solo origen técnico del contenido; múltiples representaciones documentales.

## Entrada mínima obligatoria

- `textoExpediente`: cadena Markdown/textual ya validada.

Condiciones de entrada:

- Debe ser string.
- Debe tener contenido no vacío.
- Debe contener el título del expediente.
- Debe contener estado técnico.
- Debe contener secciones obligatorias del expediente exportable.
- Debe conservar tablas Markdown si existen.

## Metadatos opcionales

Los metadatos son auxiliares y no deben reemplazar el contenido técnico del expediente.

- `cuencaActiva`
- `fechaGeneracion`
- `estadoTecnico`
- `versionHidroFlow`
- `fuenteExpediente`
- `commitFuente`
- `origenPlantilla`

## Salida mínima esperada

- `titulo`
- `estadoTecnico`
- `resumen`
- `secciones`
- `restricciones`
- `trazabilidad`
- `advertencias`

## Forma conceptual de sección

Cada sección documental debe modelarse como:

- `numero`: número o identificador de sección.
- `titulo`: título textual.
- `contenido`: contenido Markdown/textual.
- `tipo`: tipo de sección.
- `origen`: referencia al fragmento del expediente exportable.

## Tipos de sección sugeridos

- `portada`
- `resumen`
- `identificacion`
- `parametros`
- `trazabilidad_qtr`
- `tabla_q5`
- `metodo_racional`
- `contraste`
- `consistencia`
- `validacion`
- `sello`
- `restricciones`
- `trazabilidad`

## Validaciones mínimas del contrato

El adaptador futuro debe validar:

1. Entrada presente.
2. Entrada tipo string.
3. Entrada no vacía.
4. Ausencia de tokens inválidos críticos: `undefined`, `null`, `NaN`, `[object Object]`.
5. Presencia del estado técnico.
6. Presencia de restricciones.
7. Presencia del sello técnico.
8. Presencia de secciones obligatorias.
9. Preservación del orden documental.
10. Preservación de tablas Markdown.

## Errores controlados

El contrato debe prever errores no destructivos:

- `ENTRADA_VACIA`
- `ENTRADA_NO_STRING`
- `TOKENS_INVALIDOS`
- `SIN_ESTADO_TECNICO`
- `SIN_RESTRICCIONES`
- `SIN_SELLO_TECNICO`
- `SECCIONES_INCOMPLETAS`
- `ORDEN_NO_VERIFICABLE`

## Ubicación futura recomendada

Si se implementa código funcional posteriormente, la ubicación recomendada es un servicio puro aislado:

`01_APP/HIDROFLOW/src/services/documentos/adaptarExpedienteDocumental.js`

Condición:

- El servicio debe ser puro.
- El servicio no debe importar React.
- El servicio no debe importar `hidroEngine.js`.
- El servicio no debe consultar estado global.
- El servicio debe operar sobre texto recibido como argumento.

## Fuera de alcance en OT-0060D

- Crear el servicio JavaScript.
- Modificar `ComparadorMultiMetodo.jsx`.
- Modificar UI.
- Generar PDF.
- Generar Word.
- Generar mapas.
- Recalcular Q-Tr.
- Recalcular Q-5.
- Recalcular Método Racional.
- Alterar resultados numéricos.

## Criterio de salida

OT-0060D queda completa cuando el contrato conceptual de datos del adaptador documental esté documentado, versionado y sin cambios funcionales sobre la aplicación.
