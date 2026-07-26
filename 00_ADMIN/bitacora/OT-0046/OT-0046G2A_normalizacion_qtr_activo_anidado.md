# OT-0046G2A — Normalización documental de Q-Tr activo anidado

## Objetivo

Permitir que el Expediente Inteligente lea Q-Tr activo desde la ruta anidada real:

- contextoBase.q_tr_activo_estado.q_tr_activo.Q

antes de caer al fallback multiescenario.

## Diagnóstico previo

OT-0046G2 identificó que el constructor documental leía primero:

- contextoBase.q_tr_activo.Q

pero la estructura disponible esperada está anidada como:

- contextoBase.q_tr_activo_estado.q_tr_activo.Q

## Cambio aplicado

Se agregaron fallbacks documentales para:

- contextoBase.q_tr_activo_estado.q_tr_activo.Q
- contextoBase.q_tr_activo_estado.q_tr_activo.q
- contextoBase.q_tr_activo_estado.q_tr_activo.caudal

conservando primero las rutas planas legacy y dejando extraerQTrActivoDesdeEscenarios como fallback final.

## Validación técnica

- Build Vite aprobado.
- git diff --check sin errores.
- No se agregaron console.log.
- Solo se modificó construirPayloadExpedienteDesdeEstado.js.

## Validación funcional

El expediente sigue mostrando Q-Tr en cero o NO DETECTADO.

Interpretación:
- La ruta documental ya reconoce el Q-Tr activo anidado.
- Si el expediente sigue mostrando cero, la causa probable ya no es la incompatibilidad documental de ruta, sino que el valor fuente anidado también llega vacío, cero o no numérico.

## Restricciones cumplidas

- No se calculó Q-Tr.
- No se inventó Q-Tr.
- No se modificaron fórmulas hidrológicas.
- No se modificó Q-5.
- No se modificó Pe.
- No se modificó diagnóstico Q(t).
- No se relajaron guards.
- No se agregaron console.log.

## Criterio de cierre

G2A elimina la pérdida documental por ruta anidada.

Si el valor fuente sigue en cero, el siguiente paso no es documental sino diagnóstico del estado fuente de q_tr_activo_estado.

## Siguiente sub-OT recomendada

OT-0046G2B — Auditoría del estado fuente q_tr_activo_estado y lluvia efectiva/hidrogramas en cero.
