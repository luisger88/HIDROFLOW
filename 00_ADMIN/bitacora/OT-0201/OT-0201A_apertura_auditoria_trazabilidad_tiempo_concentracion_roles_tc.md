# OT-0201A — Apertura auditoría/trazabilidad bloque Tiempo de concentración y roles Tc

## Objetivo

Auditar y trazar la composición real del bloque `Tiempo de concentración y roles Tc` dentro de `textoExpediente`.

## Antecedente

OT-0200 inventarió los bloques reales dentro de `textoExpediente` y confirmó que `construirLineasTiempoConcentracionRolesTcExpediente(...)` está expandido como helper integrado.

La ruta operativa detectada fue:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Alcance

Esta OT solo audita y traza.

No implementa helper.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

No modifica botón ni portapapeles.

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

## Preguntas de auditoría

- ¿Existe `textoExpediente`?
- ¿La ruta operativa usa `construirLineasTiempoConcentracionRolesTcExpediente(...)`?
- ¿Qué argumentos recibe la ruta operativa?
- ¿El helper se exporta correctamente?
- ¿Puede importarse y ejecutarse en escenario controlado?
- ¿La salida controlada contiene residuos `undefined`, `null`, `NaN` o `[object Object]`?
- ¿El bloque es apto para validación aislada posterior?
