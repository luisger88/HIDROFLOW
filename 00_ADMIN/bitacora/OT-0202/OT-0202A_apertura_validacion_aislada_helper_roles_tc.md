# OT-0202A — Apertura validación aislada helper Tiempo de concentración y roles Tc

## Objetivo

Validar en aislamiento el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)`, ya auditado en OT-0201 como bloque integrado dentro de `textoExpediente`.

## Antecedente

OT-0201 confirmó que la ruta operativa usa:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

La auditoría obtuvo `AUDITORIA_OT_0201_TRAZABILIDAD_TIEMPO_CONCENTRACION_ROLES_TC_OK` y decisión preliminar `candidato apto para validación aislada posterior`.

## Alcance

Esta OT solo valida el helper en aislamiento.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

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

## Criterios de validación

El helper debe:

- exportarse correctamente;
- retornar un arreglo de líneas;
- generar el encabezado `## 3. Tiempo de concentración y roles Tc`;
- incluir referencias a `Tc comparador`, `Tr global activo` y `Roles Tc`;
- no emitir `undefined`, `null`, `NaN` ni `[object Object]`;
- conservar salida textual apta para expediente.
