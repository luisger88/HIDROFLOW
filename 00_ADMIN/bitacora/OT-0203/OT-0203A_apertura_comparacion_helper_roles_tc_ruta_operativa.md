# OT-0203A — Apertura comparación helper roles Tc vs ruta operativa

## Objetivo

Comparar de forma controlada el helper validado `construirLineasTiempoConcentracionRolesTcExpediente(...)` contra su ruta operativa de composición dentro de `textoExpediente`.

## Antecedente

OT-0201 auditó y trazó el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)` como bloque integrado dentro de `textoExpediente`.

OT-0202 validó el helper en aislamiento y obtuvo `VALIDACION_OT_0202_HELPER_ROLES_TC_AISLADA_OK`.

## Ruta operativa auditada

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Alcance

Esta OT solo compara y documenta.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica botón ni portapapeles.

No modifica validadores existentes.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Criterios de comparación

La comparación debe confirmar:

- que `textoExpediente` existe;
- que la ruta operativa usa `...construirLineasTiempoConcentracionRolesTcExpediente(...)`;
- que la invocación operativa pasa `Tc_final`;
- que la invocación operativa pasa `trDisenoActivoExpediente`;
- que el helper validado conserva encabezado y etiquetas mínimas;
- que la salida controlada no emite `undefined`, `null`, `NaN` ni `[object Object]`.
