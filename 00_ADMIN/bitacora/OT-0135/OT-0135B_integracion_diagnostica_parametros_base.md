# OT-0135B — Integración diagnóstica no invasiva Parámetros hidrológicos base

## Cambio aplicado

Se importó `construirLineasParametrosHidrologicosBaseExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

Se agregó un diagnóstico interno no invasivo que:

- ejecuta el helper con `contextoBase`;
- une las líneas delegadas en texto diagnóstico;
- verifica 5 líneas;
- verifica encabezado delegado `## 2. Parámetros hidrológicos base`;
- verifica presencia del encabezado operativo;
- verifica presencia de `CN:` en delegado y operativo;
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
