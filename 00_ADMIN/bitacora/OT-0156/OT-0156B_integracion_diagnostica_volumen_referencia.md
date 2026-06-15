# OT-0156B — Integración diagnóstica no invasiva Volumen de referencia

## Cambio aplicado

Se importó `construirLineasVolumenReferenciaExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

Se agregó un diagnóstico interno no invasivo que:

- ejecuta el helper con `peTotalMm` y `volumenEsperadoM3`;
- une las líneas delegadas en texto diagnóstico;
- verifica 4 líneas;
- verifica encabezado delegado `## 4. Volumen de referencia`;
- verifica presencia del encabezado operativo;
- verifica presencia de `Lluvia efectiva total:` en delegado y operativo;
- verifica presencia de `Volumen esperado:` en delegado y operativo;
- verifica presencia de la fórmula en delegado y operativo;
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
