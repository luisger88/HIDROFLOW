# OT-0309B — Decisión integración helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Documentar la decisión de integrar posteriormente el helper puro `construirBloqueResumenQ5AuditadoExpediente` al expediente hidrológico mínimo.

## Antecedente

OT-0303 seleccionó el bloque `Resumen Q-5 auditado` como siguiente bloque documental del expediente hidrológico mínimo.

OT-0304 definió el contrato documental del bloque.

OT-0305 diseñó el helper puro `construirBloqueResumenQ5AuditadoExpediente`.

OT-0306 implementó el helper de forma aislada.

OT-0307 ejecutó una primera validación aislada con un hallazgo en el criterio de aislamiento frente al constructor.

OT-0308 ajustó el criterio de validación y cerró con validación limpia del helper en aislamiento.

## Evidencia principal

OT-0308 cerró con:

```json
{
  "validacion": "OT-0308",
  "helper": "construirBloqueResumenQ5AuditadoExpediente",
  "totalControles": 20,
  "controlesAprobados": 20,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "helperValidadoAislado": true,
  "observacionesNoBloqueantes": 2,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Evidencia de criterio ajustado

OT-0308 confirmó que el constructor no importa ni usa el helper nuevo:

```json
{
  "id": "constructor_sin_acople_helper_nuevo_resumen_q5",
  "descripcion": "Constructor principal no importa ni usa todavía el helper nuevo construirBloqueResumenQ5AuditadoExpediente",
  "ocurrenciasHelperNuevoEnConstructor": 0,
  "ocurrenciasAuxiliarPreexistenteEnConstructor": 1,
  "aprobado": true
}
```

## Estado del helper

El helper queda en estado:

```text
VALIDADO EN AISLAMIENTO
```

## Decisión

Se aprueba avanzar hacia la integración futura del helper `construirBloqueResumenQ5AuditadoExpediente` al expediente hidrológico mínimo.

Esta decisión no acopla el helper.

Esta decisión no modifica el constructor principal.

Esta decisión no modifica el helper.

Esta decisión no modifica comparador.

Esta decisión no modifica motor.

Esta decisión no recalcula Q-5.

Esta decisión no reinterpreta resultados Q-5.

Esta decisión no selecciona método Q-5 adoptado.

Esta decisión no selecciona caudal Q-5 adoptado.

## Condición para integración futura

Antes del acople funcional, debe diseñarse explícitamente el punto de acople.

El diseño del acople deberá definir:

- import futuro del helper;
- función auxiliar delegada dentro del constructor si aplica;
- sustitución o delegación del bloque inline actual `Resumen Q-5 auditado`;
- conservación del orden documental;
- ausencia de contaminación de `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`;
- preservación de la función preexistente si aplica o sustitución controlada;
- validaciones estructurales mínimas;
- límites de no recálculo Q-5;
- límites de no reinterpretación Q-5;
- límites de no selección de método o caudal adoptado.

## Frontera mantenida

La decisión de integración futura no autoriza:

- acoplar el helper en esta OT;
- modificar `construirExpedienteHidrologicoMinimo.js`;
- modificar `construirBloqueResumenQ5AuditadoExpediente.js`;
- modificar `ComparadorMultiMetodo.jsx`;
- modificar motor;
- recalcular Q-5;
- reinterpretar resultados Q-5;
- seleccionar método Q-5 adoptado;
- seleccionar caudal Q-5 adoptado;
- tocar Q-Tr;
- tocar Método Racional;
- tocar diagnóstico Q(t);
- emitir dictamen hidrológico.

## Próximo frente recomendado

`OT-0310 — Diseño punto acople helper bloque Resumen Q-5 auditado del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirBloqueResumenQ5AuditadoExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se recalcula Q-5.

No se reinterpretan resultados Q-5.

No se selecciona método Q-5 adoptado.

No se selecciona caudal Q-5 adoptado.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueResumenQ5AuditadoExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se reinterpretaron resultados Q-5.
- No se seleccionó método Q-5 adoptado.
- No se seleccionó caudal Q-5 adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).
