# OT-0146B — Integración diagnóstica no invasiva Tiempo de concentración y roles Tc

## Cambio aplicado

Se importó `construirLineasTiempoConcentracionRolesTcExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

Se agregó un diagnóstico interno no invasivo que:

- ejecuta el helper con `Tc_final` y `trDisenoActivoExpediente`;
- une las líneas delegadas en texto diagnóstico;
- verifica 10 líneas;
- verifica encabezado delegado `## 3. Tiempo de concentración y roles Tc`;
- verifica presencia del encabezado operativo;
- verifica presencia de `Tc comparador:` en delegado y operativo;
- verifica presencia de `Tr global activo:` en delegado y operativo;
- verifica presencia de `Roles Tc:` en delegado y operativo;
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
