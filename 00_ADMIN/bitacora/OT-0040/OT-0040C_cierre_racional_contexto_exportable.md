# OT-0040C — Cierre publicación Método Racional al contexto exportable

## Objetivo

Cerrar la OT-0040 consolidando la publicación de resultados reales del Método Racional al contexto exportable de HidroFlow.

## Resultado práctico

El expediente hidrológico mínimo ahora incluye una sección del Método Racional con tabla exportable:

- Tr.
- I.
- P.
- C.
- Q.

## Decisión técnica

Los resultados racionales se publican desde la ruta existente de HidroFlow usando calcRacional.

El Comparador consume los resultados desde el contexto exportable.

No se duplica calcRacional dentro del Comparador.

No se recalcula de forma paralela en el expediente.

## Validación

La validación v40ok confirmó:

- presencia del expediente hidrológico mínimo;
- presencia de la sección Método Racional;
- presencia de Tc racional exportado;
- presencia de Tabla Método Racional;
- presencia de encabezado Tr, I, P, C, Q;
- presencia de Restricciones técnicas;
- ausencia de ANTES_OT0040;
- ausencia de function vexp;
- ausencia de function v40;
- ausencia de function v40ok;
- ausencia de Get-Clipboard;
- ausencia de Select-String;
- ausencia de Write-Host;
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

OT-0040 convierte el Método Racional de sección informativa a tabla real exportable dentro del expediente hidrológico mínimo.

El expediente queda más completo: Q-5 como bloque de hidrogramas auditados y Método Racional como contraste global independiente con resultados tabulados.

## Estado

OT-0040 lista para PR.
