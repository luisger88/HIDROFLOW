# OT-0046G1 — Normalización de identificación en payload documental

## Resultado

El resumen ejecutivo del Expediente Inteligente dejó de mostrar:

- Cuenca: NO DETECTADO
- Área: NO DETECTADO km²

## Evidencia funcional

El expediente copiado ahora muestra:

- Cuenca: POST_OK
- Área: 46,8516 km²

## Cambio aplicado

Se creó `payload.identificacion` en `construirPayloadExpedienteDesdeEstado.js` usando datos ya calculados:

- `payload.cuenca.nombre`
- `payload.geomorfometria.areaKm2`

## Restricciones cumplidas

- No se modificaron fórmulas hidrológicas.
- No se modificó Q-5.
- No se modificó Q-Tr.
- No se modificó Pe.
- No se modificó diagnóstico Q(t).
- No se agregaron `console.log`.

## Estado

Aprobado funcionalmente.

## Pendiente para siguientes sub-OT

- Pe total en cero.
- Q-Tr en cero.
- Qp/Tp/Volumen Q-5 en cero.
- Diagnóstico Q(t) con 0 filas.
