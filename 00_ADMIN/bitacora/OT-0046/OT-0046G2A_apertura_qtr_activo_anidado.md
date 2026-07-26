# OT-0046G2A — Normalización documental de Q-Tr activo anidado

## Estado previo

OT-0046G2 cerró el diagnóstico de valores hidrológicos dinámicos en cero.

Commit:
fdc7460 docs(expediente): diagnostica ceros hidrologicos dinamicos

## Problema específico

El Expediente Inteligente exporta:

- Q-Tr: 0 m³/s
- Estado: incompleto

El diagnóstico OT-0046G2 identificó una incompatibilidad documental:

- El constructor del payload lee primero:
  contextoBase.q_tr_activo.Q

- Pero la estructura disponible esperada está anidada como:
  contextoBase.q_tr_activo_estado.q_tr_activo.Q

## Objetivo

Agregar un fallback documental para que `construirPayloadExpedienteDesdeEstado.js` pueda leer Q-Tr activo desde la ruta anidada real antes de caer a escenarios multiescenario.

## Restricciones

No calcular Q-Tr.
No inventar Q-Tr.
No modificar motor hidrológico.
No modificar fórmulas.
No modificar Q-5.
No modificar Pe.
No modificar diagnóstico Q(t).
No relajar guards.
No agregar console.log.

## Criterio de éxito

Si `contextoBase.q_tr_activo_estado.q_tr_activo.Q` existe y es numérico, el expediente debe usarlo como caudal de diseño Q-Tr activo.
