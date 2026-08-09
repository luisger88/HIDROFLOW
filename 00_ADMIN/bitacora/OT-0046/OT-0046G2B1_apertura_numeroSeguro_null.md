# OT-0046G2B1 — Corrección documental de numeroSeguro(null)

## Estado previo

OT-0046G2B diagnosticó que el primer cero hidrológico real nace en la lluvia efectiva.

Commit:
5d84218 docs(expediente): diagnostica estado fuente de ceros hidrologicos

## Hallazgo secundario

Se identificó que `numeroSeguro(null)` puede convertir `null` en `0`, porque:

- Number(null) = 0
- Number.isFinite(0) = true

Esto puede enmascarar ausencia de dato como cero dentro del Expediente Inteligente.

## Objetivo

Corregir `numeroSeguro` para que:

- null retorne null
- undefined retorne null
- valores numéricos reales sigan retornando número
- cero real siga retornando 0

## Restricciones

No corregir motor hidrológico.
No recalcular lluvia efectiva.
No recalcular Q-5.
No recalcular Q-Tr.
No modificar fórmulas.
No relajar guards.
No agregar console.log.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Criterio de éxito

Los valores ausentes deben exportarse como NO DETECTADO o equivalente documental, no como 0.

Los valores realmente iguales a 0 deben seguir exportándose como 0.
