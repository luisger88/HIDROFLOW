# OT-0039C — Cierre Método Racional en expediente hidrológico mínimo

## Objetivo

Cerrar la OT-0039 consolidando la incorporación del Método Racional como contraste global independiente dentro del expediente hidrológico mínimo.

## Resultado práctico

Se agregó una sección propia en el expediente hidrológico mínimo:

- Método Racional como contraste global independiente.
- Uso como contraste de caudal pico.
- Disponibilidad de resultados en el módulo Método Racional.
- Separación explícita frente al bloque Q-5 de hidrogramas.
- Criterio no adoptivo principal sin revisión de competencia, duración Tc y alcance normativo.

## Evidencia

La auditoría confirmó que calcRacional y ModRacional existen en HidroFlow.jsx.

También confirmó que los resultados numéricos del Método Racional están disponibles dentro del módulo Racional, pero no en el scope actual del ComparadorMultiMetodo ni del expediente.

## Decisión técnica

No se duplica calcRacional dentro del Comparador.

No se recalcula el Método Racional en el expediente.

No se inventa una tabla racional sin publicar primero resultados reales al contexto exportable.

La integración actual queda como sección informativa y trazable.

## Validación

El expediente copiado fue validado con vexp39.

La validación confirmó:

- presencia de la sección Método Racional;
- presencia de contraste global independiente;
- presencia de módulo Método Racional;
- separación frente al bloque Q-5;
- presencia de Restricciones técnicas;
- ausencia de undefined;
- ausencia de null;
- ausencia de NaN;
- ausencia de [object Object].

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

## Dictamen

OT-0039 integra el Método Racional en el expediente mínimo como contraste global independiente, sin mezclarlo con el bloque Q-5 de hidrogramas.

La tabla racional real queda pendiente para una OT posterior, cuando los resultados del módulo Racional sean publicados al contexto exportable.

## Estado

OT-0039 lista para PR.
