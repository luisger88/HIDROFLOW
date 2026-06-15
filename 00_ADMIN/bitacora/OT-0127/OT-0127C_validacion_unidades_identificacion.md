# OT-0127C — Validación de unidades en Identificación delegada

## Validaciones ejecutadas

Se ejecutaron las siguientes validaciones:

1. Validación aislada histórica OT-0124:

`validar_ot0124_identificacion.mjs`

2. Comparación textual OT-0126:

`comparar_ot0126_identificacion_delegada_operativa.mjs`

3. Validación específica OT-0127:

`validar_ot0127_unidades_identificacion.mjs`

## Resultado esperado

La validación específica OT-0127 confirma que el bloque delegado emite:

- `Área: 46.8516 km²`;
- `Pendiente media: 8.43 %`;
- `Longitud cauce principal: 15.524 km`.

La comparación OT-0126 debe confirmar coincidencia estricta total frente al bloque operativo de referencia.

## Restricciones verificadas

Se verifica que:

- `areaTexto.value` sigue usando `textoExpediente`;
- `window.prompt(..., textoExpediente)` sigue intacto;
- no se modifica `ComparadorMultiMetodo.jsx`;
- no se sustituye el bloque operativo;
- no se toca motor ni cálculos hidrológicos.
