# OT-0268B — Decisión integración helper bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Decidir si procede integrar el helper `construirBloqueTiempoConcentracionRolesTcExpediente` al constructor del expediente hidrológico mínimo.

## Antecedente

OT-0264 definió el contrato documental del bloque `Tiempo de concentración y roles Tc`.

OT-0265 diseñó el helper puro documental.

OT-0266 implementó el helper como archivo funcional independiente.

OT-0267 validó aisladamente el helper.

## Evidencia principal

OT-0267 cerró la validación aislada con resultado aprobado:

```json
{
  "validacion": "OT-0267",
  "helper": "construirBloqueTiempoConcentracionRolesTcExpediente",
  "totalControles": 12,
  "controlesAprobados": 12,
  "controlesFallidos": 0,
  "totalCasos": 8,
  "casosAprobados": 8,
  "casosFallidos": [],
  "buildAprobado": true,
  "helperValidado": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Estado actual del helper

El helper existe como archivo funcional independiente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js
```

El helper está validado aisladamente, pero aún no está acoplado al constructor principal.

## Cadena futura propuesta

La integración futura deberá buscar esta cadena:

```text
construirExpedienteHidrologicoMinimo
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Criterio de decisión

Procede diseñar el punto de acople porque:

- el contrato documental fue aprobado;
- el helper fue diseñado;
- el helper fue implementado como archivo funcional independiente;
- el helper fue validado aisladamente;
- la salida es `string[]`;
- el título opcional funciona;
- los casos de normalización fueron aprobados;
- no hay tokens inválidos;
- no hay mutación de entradas;
- el build fue aprobado.

## Decisión

Se aprueba avanzar al diseño del punto de acople del helper `construirBloqueTiempoConcentracionRolesTcExpediente`.

Esta decisión no autoriza acoplar todavía.

El acople deberá diseñarse en una OT separada y ejecutarse posteriormente con sustitución mínima controlada.

## Condiciones para el diseño del acople

El diseño del acople deberá cumplir:

- usar función auxiliar dentro de `construirExpedienteHidrologicoMinimo.js`;
- no intervenir directamente bloques no relacionados;
- no modificar `ComparadorMultiMetodo.jsx`;
- no modificar motor;
- no recalcular `Tc`;
- no modificar `Tc_final`;
- no emitir dictamen hidrológico;
- no tocar Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Riesgo a controlar

El bloque `Tiempo de concentración y roles Tc` contiene términos sensibles como `Q(t)`, `Q-5` y `Lag / forma SCS`.

Estos términos solo deben conservarse como roles documentales fijos, sin activar cálculos, validaciones ni integraciones con otros bloques.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se acopla el helper.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula ni valida `Tc`.

No se modifica `Tc_final`.

No se selecciona `Tc` adoptado.

No se emite dictamen hidrológico.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0269 — Diseño punto de acople helper Tiempo de concentración y roles Tc del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
