# OT-0124C — Corrección quirúrgica de lectura de contexto Identificación

## Hallazgo

La validación aislada de `construirLineasIdentificacionExpediente(...)` detectó que, aun con contexto completo, la función retornaba fallbacks:

- `Cuenca: Cuenca activa`
- `Área: —`
- `Pendiente media: —`
- `Longitud cauce principal: —`

El script de validación confirmó que la función no estaba leyendo correctamente el contexto directo usado por la validación aislada.

## Diagnóstico

La función estaba estructurada para recibir una entrada con `contextoBase`, pero el script de validación aislada entregaba un contexto directo.

Esto activaba indebidamente los fallbacks aunque existieran datos válidos como:

- `cuenca`
- `nombreCuenca`
- `cuencaActiva.nombre`
- `areaKm2`
- `pendienteMediaPct`
- `longitudCaucePrincipalKm`

## Corrección aplicada

Se ajustó la función para aceptar ambas formas de entrada:

1. Entrada operativa futura:

`construirLineasIdentificacionExpediente({ contextoBase })`

2. Entrada directa de validación aislada:

`construirLineasIdentificacionExpediente(contexto)`

La corrección mantiene los fallbacks contractuales:

- `Cuenca activa`
- `—`
- `HidroFlow`
- `SAN CRISTOBAL`

## Resultado validado

La validación aislada pasó correctamente para:

- contexto completo;
- contexto fallback;
- ausencia de residuos técnicos:
  - `undefined`;
  - `null`;
  - `NaN`;
  - `[object Object]`.

Resultado esperado confirmado:

`VALIDACION_OT_0124_IDENTIFICACION_OK`

## Restricciones mantenidas

No se modificó:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Conclusión

OT-0124 confirma que la función pura del bloque Identificación puede operar de forma aislada con contexto completo y contexto fallback, sin integración visual todavía.
