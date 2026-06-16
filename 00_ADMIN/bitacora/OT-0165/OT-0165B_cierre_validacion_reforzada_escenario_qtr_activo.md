# OT-0165B — Cierre validación reforzada helper Escenario Q-Tr activo

## Resultado

Se reforzó la validación aislada del helper `construirLineasEscenarioQTrActivoExpediente(...)`.

## Casos validados

- entrada `null`;
- entrada `string`;
- entrada `array`;
- `formatearValorQTrExpediente` no función;
- formateador que devuelve `null`;
- formateador que devuelve `undefined`;
- formateador que devuelve objeto;
- `estado` vacío;
- `fuente` vacía;
- `faltantes` con strings vacíos, objetos y `null`;
- valores Q-Tr en cero;
- valores Q-Tr como strings numéricos;
- valores Q-Tr como `NaN`.

## Validaciones aprobadas

- `VALIDACION_OT_0165_HELPER_ESCENARIO_QTR_ACTIVO_REFORZADA_OK`;
- `VALIDACION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- helper documental;
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

El helper de Escenario Q-Tr activo queda reforzado frente a casos borde, manteniendo comportamiento estrictamente representacional.
