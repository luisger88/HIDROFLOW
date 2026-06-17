# OT-0219B — Decisión sobre bloque de restricciones y advertencias clasificadas

## Objetivo

Decidir si alguna familia de evidencia clasificada en OT-0218 puede convertirse posteriormente en un bloque documental seguro de restricciones y advertencias del expediente hidrológico mínimo.

## Antecedente

OT-0216 auditó referencias documentales relacionadas con restricciones, advertencias, notas, criterios de cautela y mensajes de no adopción.

OT-0217 decidió no consolidar directamente y recomendó clasificar primero la evidencia.

OT-0218 clasificó documentalmente la evidencia detectada.

## Resultado de OT-0218

La clasificación documental identificó:

```json
{
  "totalCoincidenciasClasificadas": 757,
  "restricciones_advertencias": 28,
  "notas_aclaraciones": 6,
  "no_adopcion_no_competencia": 66,
  "validacion_auditoria_criterio": 37,
  "q5_racional_qt": 140,
  "contraste_referencial": 34,
  "volumen_qtr_pe": 619,
  "sin_categoria_especifica": 0
}
```

## Lectura técnica

La evidencia clasificada confirma que no existe un único bloque homogéneo de restricciones y advertencias.

Las coincidencias mezclan advertencias documentales, notas, mensajes no adoptivos, criterios de validación, referencias Q-5/Racional/Q(t) y referencias a Volumen/Q-Tr/Pe/masa.

Por tanto, una consolidación global inmediata tendría alto riesgo técnico y documental.

## Familias candidatas

### Familia candidata principal

- Restricciones y advertencias técnicas.
- Notas y aclaraciones documentales.

Estas familias son las más cercanas a un bloque documental institucional, siempre que se mantengan separadas de Q-5, Método Racional, diagnóstico Q(t), Volumen, Q-Tr, Pe y masa hidrológica.

### Familias no candidatas todavía

- Referencias Q-5, Método Racional y diagnóstico Q(t).
- Referencias a Volumen, Q-Tr, Pe o masa hidrológica.
- Mensajes no adoptivos o no competentes asociados a bloques sensibles.
- Criterios de validación/auditoría que requieren contexto técnico propio.

Estas familias deben permanecer como evidencia clasificada o requerir OTs específicas antes de cualquier consolidación.

## Riesgo de consolidación prematura

Consolidar todo en un único bloque podría:

- duplicar advertencias ya existentes;
- mezclar restricciones documentales con restricciones hidrológicas sensibles;
- incorporar indirectamente mensajes de Q-5, Método Racional o diagnóstico Q(t);
- abrir discusión de Volumen, Q-Tr, Pe o masa sin auditoría específica;
- modificar `textoExpediente` sin contrato previo del bloque.

## Decisión recomendada

La decisión recomendada es no consolidar todavía.

Sí se recomienda abrir una OT documental de diseño contractual para un bloque acotado de restricciones y advertencias generales del expediente.

Ese bloque debe excluir explícitamente Q-5, Método Racional, diagnóstico Q(t), Volumen, Q-Tr, Pe y masa hidrológica.

## Decisión operativa

Se selecciona como siguiente frente el diseño contractual de un bloque de restricciones y advertencias generales del expediente.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0220 — Contrato del bloque restricciones y advertencias generales del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se consolidó ningún bloque.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
