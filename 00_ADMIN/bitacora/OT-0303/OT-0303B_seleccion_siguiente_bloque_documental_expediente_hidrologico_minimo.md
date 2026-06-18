# OT-0303B — Selección siguiente bloque documental del expediente hidrológico mínimo

## Objetivo

Seleccionar documentalmente el siguiente bloque del expediente hidrológico mínimo a fortalecer después de estabilizar el bloque `Escenario Q-Tr activo — control de trazabilidad`.

## Antecedente

OT-0302 estabilizó formalmente el bloque `Escenario Q-Tr activo — control de trazabilidad` del expediente hidrológico mínimo.

La estabilización se basó en la secuencia completa de selección, contrato, diseño, implementación, validación aislada, decisión de integración, diseño de acople, acople mínimo, validación de acople, revalidación de salida real y decisión de cierre.

## Estado previo estabilizado

Bloques ya tratados con patrón de helper/acople/validación:

- Identificación.
- Parámetros hidrológicos base.
- Tiempo de concentración y roles Tc.
- Volumen de referencia.
- Escenario Q-Tr activo — control de trazabilidad.

El bloque `Escenario Q-Tr activo — control de trazabilidad` quedó con estado:

```text
ESTABILIZADO
```

## Bloques documentales pendientes en el expediente

A partir de la estructura actual del expediente hidrológico mínimo, los bloques posteriores aún pueden fortalecerse gradualmente:

- Resumen Q-5 auditado.
- Método Racional — contraste global independiente.
- Contraste Q-5 vs Método Racional.
- Control de consistencia cruzada Pe–Área–Volumen/Q-5.
- Diagnóstico temporal Q(t) no adoptivo.
- Validación interna del expediente exportado.
- Sello técnico de generación.
- Restricciones y advertencias técnicas.

## Criterio de selección

La selección debe priorizar:

- continuidad del orden documental;
- bajo coste técnico;
- bajo riesgo de tocar motor;
- posibilidad de helper puro documental;
- posibilidad de validación aislada;
- ausencia de recálculo hidrológico;
- aporte a trazabilidad del expediente exportable;
- conservación de bloques ya estabilizados.

## Bloque recomendado

Se selecciona como siguiente bloque:

```text
Resumen Q-5 auditado
```

## Justificación

El bloque `Resumen Q-5 auditado` es el siguiente bloque natural después de `Escenario Q-Tr activo — control de trazabilidad` en el orden del expediente.

Su fortalecimiento puede abordarse inicialmente como bloque documental de trazabilidad y resumen, sin recalcular hidrogramas, sin tocar motor, sin modificar Q-Tr, sin modificar Método Racional y sin intervenir diagnóstico Q(t).

La selección mantiene el patrón de avance seguro:

```text
selección
↓
contrato documental
↓
diseño helper puro
↓
implementación aislada
↓
validación aislada
↓
decisión integración
↓
diseño acople
↓
acople mínimo
↓
validación/revalidación
↓
estabilización
```

## Alcance del bloque seleccionado

El bloque deberá tratarse inicialmente como resumen documental auditado de Q-5.

No deberá recalcular Q-5.

No deberá recalcular hidrogramas.

No deberá modificar motor.

No deberá tocar Q-Tr.

No deberá tocar Método Racional.

No deberá tocar diagnóstico Q(t).

No deberá emitir dictamen hidrológico.

## Decisión

Se aprueba seleccionar el bloque `Resumen Q-5 auditado` como siguiente frente documental del expediente hidrológico mínimo.

Esta decisión es documental.

No implementa helper.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula Q-5.

No recalcula Q-Tr.

No recalcula volumen.

## Próximo frente recomendado

`OT-0304 — Contrato bloque Resumen Q-5 auditado del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se recalcula Q-5.

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
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se implementó helper.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).
