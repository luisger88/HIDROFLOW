# OT-0187B — Saneamiento helper Identificación contra [object Object]

## Cambio aplicado

Se agregó el normalizador local `normalizarTextoIdentificacionExpediente(...)` dentro de `construirExpedienteHidrologicoMinimo.js`.

El helper `construirLineasIdentificacionExpediente(...)` ahora normaliza `nombreCuenca` para evitar que `contextoBase.cuenca` llegue al expediente como `[object Object]` cuando la cuenca es un objeto.

## Criterio aplicado

Cuando el valor recibido es objeto, el normalizador intenta usar:

- `nombre`;
- `nombreCuenca`;
- `id`;
- `codigo`;
- `label`;
- `descripcion`;
- fallback textual seguro.

## Validación ejecutada

Se reejecutó:

`07_TOOLBOX/validaciones/validar_ot0186_helper_identificacion_aislada.mjs`

## Resultado

El caso `contexto con cuenca candidata como objeto` pasó de:

```text
Cuenca: [object Object]
```

a:

```text
Cuenca: La Iguaná PC_80
```

La validación post-saneamiento emitió:

```text
VALIDACION_OT_0186_HELPER_IDENTIFICACION_AISLADA_OK
```

## Restricciones mantenidas

No se modificó:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.
