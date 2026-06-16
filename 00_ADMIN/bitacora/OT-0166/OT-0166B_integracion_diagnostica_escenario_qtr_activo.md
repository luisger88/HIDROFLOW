# OT-0166B — Integración diagnóstica no invasiva Escenario Q-Tr activo

## Cambio aplicado

Se importó `construirLineasEscenarioQTrActivoExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

Se agregó un diagnóstico interno no invasivo que:

- ejecuta el helper con `estadoQTrActivoExpediente`, `qTrActivoExpediente`, `faltantesQTrActivoExpediente` y `formatearValorQTrExpediente`;
- une las líneas delegadas en texto diagnóstico;
- verifica 16 líneas;
- verifica encabezado delegado `## 5. Escenario Q-Tr activo — control de trazabilidad`;
- verifica presencia del encabezado operativo;
- verifica presencia de `Estado:`, `Tr activo:`, `Campos mínimos:` y `Fuente:` en delegado y operativo;
- verifica presencia de la lectura técnica en delegado y operativo;
- solo emite `console.warn` si hay brechas.

## Restricciones mantenidas

No se reemplazó `textoExpediente`.

No se modificó:

- bloque operativo;
- botón;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
