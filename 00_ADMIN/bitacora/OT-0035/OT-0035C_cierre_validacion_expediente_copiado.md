# OT-0035C — Cierre validación expediente copiado

## Objetivo

Cerrar la OT-0035 consolidando la validación del expediente hidrológico mínimo copiado desde HidroFlow.

## Resultado práctico

Se validó que el botón Copiar expediente hidrológico mínimo genera contenido real en el portapapeles.

El expediente copiado contiene las secciones obligatorias:

- Expediente hidrológico mínimo.
- Identificación.
- Parámetros hidrológicos base.
- Tiempo de concentración y roles Tc.
- Volumen de referencia.
- Resumen Q-5 auditado.
- Restricciones técnicas.

## Campos críticos validados

La validación confirmó presencia de:

- Cuenca.
- Área.
- Fuente de contexto.
- Estación IDF.
- Pendiente media.
- Longitud cauce principal.
- CN.
- CN base.
- CN efectivo.
- AMC.
- Tc comparador.
- Lluvia efectiva total.
- Volumen esperado.

## Patrones problemáticos

La validación confirmó ausencia de:

- undefined.
- null.
- NaN.
- [object Object].

## Corrección aplicada

Se corrigió el flujo de copia del expediente para garantizar copia real al portapapeles mediante mecanismo robusto basado en textarea temporal y document.execCommand.

## Decisión técnica

La validación es de producto reproducible.

No se modifica el motor.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Validación

El botón fue validado visualmente en navegador.

La salida copiada fue validada con el verificador local vexp.

El working tree quedó limpio después de los commits funcionales.

## Dictamen

OT-0035 confirma que el expediente hidrológico mínimo no solo está pintado en la interfaz, sino que puede copiarse como salida técnica reproducible con campos críticos presentes y sin valores problemáticos.

## Estado

OT-0035 lista para PR.
