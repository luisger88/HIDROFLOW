# OT-0046G2B1 — Corrección documental de numeroSeguro(null)

## Objetivo

Evitar que valores `null` o `undefined` se exporten como `0` en el Expediente Inteligente.

## Diagnóstico previo

OT-0046G2B identificó que:

- Number(null) = 0
- Number.isFinite(0) = true

Por tanto, `numeroSeguro(null)` podía devolver 0 y enmascarar ausencia de dato.

## Cambio aplicado

Se modificó `numeroSeguro` en `construirPayloadExpedienteDesdeEstado.js` para que:

- null retorne null
- undefined retorne null
- valores numéricos reales sigan retornando número
- cero real siga retornando 0

## Cambio técnico

Antes:

```js
const numeroSeguro = (valor) => {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};
```

Después:

```js
const numeroSeguro = (valor) => {
  if (valor === null || valor === undefined) return null;
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};
```

## Restricciones cumplidas

- No se modificó el motor hidrológico.
- No se recalculó lluvia efectiva.
- No se recalculó Q-5.
- No se recalculó Q-Tr.
- No se modificaron fórmulas.
- No se relajaron guards.
- No se agregaron console.log.

## Validación técnica

- Build Vite aprobado.
- git diff --check sin errores.
- No se agregaron console.log.

## Criterio de éxito

Los valores ausentes dejan de disfrazarse documentalmente como cero.

Los ceros reales siguen exportándose como cero.

## Pendiente posterior

OT-0046G2B2 — Auditoría hidrológica de lluvia efectiva cero.
