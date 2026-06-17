# OT-0187A — Apertura saneamiento helper Identificación contra [object Object]

## Objetivo

Sanear el helper `construirLineasIdentificacionExpediente(...)` para evitar que `contextoBase.cuenca` llegue al expediente como `[object Object]` cuando la cuenca se recibe como objeto.

## Antecedente

OT-0186 ejecutó validación aislada del helper Identificación y detectó el hallazgo `HALLAZGO_OT_0186_HELPER_IDENTIFICACION_AISLADA_RESIDUOS`.

El caso `contexto con cuenca candidata como objeto` produjo:

```text
Cuenca: [object Object]
```

## Alcance

Esta OT aplica un cambio mínimo y localizado en el helper `construirLineasIdentificacionExpediente(...)`.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Criterio técnico

Cuando `contextoBase.cuenca` sea objeto, el helper debe usar una propiedad textual competente, preferiblemente:

- `cuenca.nombre`;
- `cuenca.nombreCuenca`;
- `cuenca.id`;
- fallback textual seguro.

Nunca debe permitir conversión implícita a `[object Object]`.
