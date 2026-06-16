# OT-0164D — Corrección implementación helper Escenario Q-Tr activo

## Hallazgo

La primera implementación del helper `construirLineasEscenarioQTrActivoExpediente(...)` quedó corrupta por corte de pegado.

El validador falló con:

```text
SyntaxError: missing ) after argument list
```

El build Vite también falló por sintaxis inválida en `construirExpedienteHidrologicoMinimo.js`.

## Corrección aplicada

Se reemplazó completamente la función `construirLineasEscenarioQTrActivoExpediente(...)` por una versión válida y estrictamente representacional.

## Validaciones aprobadas

- `CORRECCION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK`;
- `VALIDACION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK`;
- Build Vite aprobado.

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

OT-0164 queda corregida y validada como implementación de helper puro, sin integración ni sustitución operativa.
