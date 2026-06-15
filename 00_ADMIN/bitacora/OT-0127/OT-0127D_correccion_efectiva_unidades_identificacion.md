# OT-0127D — Corrección efectiva de aplicación de unidades

## Hallazgo

La primera ejecución de OT-0127 no modificó realmente el helper documental.

La evidencia fue:

- `git diff` sobre `construirExpedienteHidrologicoMinimo.js` salió vacío;
- `validar_ot0124_identificacion.mjs` seguía mostrando líneas sin unidades;
- `comparar_ot0126_identificacion_delegada_operativa.mjs` seguía reportando 3 diferencias estrictas;
- los scripts temporales de aplicación/validación quedaron corruptos por interpolación de plantillas durante el pegado.

## Corrección aplicada

Se reescribieron los scripts de OT-0127 para aplicar los cambios mediante expresiones regulares sobre el texto fuente del helper, evitando evaluación accidental de variables internas como `areaKm2`, `pendienteMediaPct` o `longitudCauceKm`.

## Resultado esperado

El helper debe emitir ahora:

- `Área: 46.8516 km²`;
- `Pendiente media: 8.43 %`;
- `Longitud cauce principal: 15.524 km`.

La comparación OT-0126 debe pasar con:

- 7 coincidencias estrictas;
- 0 diferencias estrictas;
- 0 diferencias textuales fuertes.

## Restricciones mantenidas

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
