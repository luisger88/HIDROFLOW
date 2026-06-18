# OT-0237B — Selección del siguiente bloque del expediente hidrológico mínimo

## Objetivo

Seleccionar el siguiente bloque del expediente hidrológico mínimo a fortalecer después del cierre del bloque de restricciones y advertencias generales.

## Antecedente

El frente del bloque de restricciones y advertencias generales quedó cerrado documentalmente en OT-0236.

Ese cierre aplica únicamente al bloque general acoplado en la sección 12 del expediente hidrológico mínimo.

No aplica a Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe, masa ni otros bloques sensibles.

## Estado actual

El expediente hidrológico mínimo ya cuenta con un bloque general de restricciones y advertencias estabilizado.

La siguiente decisión debe evitar ampliar automáticamente el alcance técnico hacia bloques sensibles sin selección documental previa.

## Candidatos de siguiente bloque

Se consideran como candidatos documentales, sin implementar todavía:

### Opción A — Identificación del expediente

Bloque de bajo riesgo, asociado a datos descriptivos, trazabilidad de cuenca activa, versión y fecha de generación.

Ventaja: fortalece presentación institucional sin tocar cálculos hidrológicos.

Riesgo: bajo.

### Opción B — Sello técnico de generación

Bloque ya existente y sensible para trazabilidad documental.

Ventaja: mejora cierre formal del expediente.

Riesgo: medio-bajo, porque puede tocar textos de responsabilidad técnica.

### Opción C — Validación interna del expediente exportado

Bloque de control documental que verifica secciones, tokens inválidos y consistencia general.

Ventaja: fortalece robustez exportable.

Riesgo: medio, porque puede interactuar con validadores existentes.

### Opción D — Resumen Q-5 auditado

Bloque hidrológico sensible.

Ventaja: alto valor técnico.

Riesgo: alto; no debe abordarse sin contrato específico.

### Opción E — Método Racional o contraste Q-5 vs Racional

Bloques hidrológicos sensibles.

Ventaja: alto valor técnico.

Riesgo: alto; no deben tocarse como siguiente paso automático.

## Decisión recomendada

La opción recomendada es avanzar con un bloque documental de bajo riesgo antes de volver a bloques hidrológicos sensibles.

Se recomienda seleccionar:

```text
Bloque Identificación del expediente
```

## Justificación

El bloque de Identificación permite seguir fortaleciendo el expediente hidrológico mínimo sin alterar cálculos, motor, Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe ni masa.

Además, es un bloque transversal que mejora trazabilidad institucional y orden documental.

## Decisión operativa

Se selecciona como siguiente frente el contrato del bloque Identificación del expediente.

No se implementa ningún cambio en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se tocan bloques sensibles.

## Próximo frente recomendado

`OT-0238 — Contrato bloque Identificación del expediente hidrológico mínimo`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
