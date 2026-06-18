# OT-0277B — Selección siguiente bloque documental del expediente hidrológico mínimo

## Objetivo

Seleccionar documentalmente el siguiente bloque del expediente hidrológico mínimo que debe entrar al ciclo controlado de contrato, diseño, implementación, validación y estabilización.

## Antecedente

OT-0276 declaró estabilizado el bloque `Tiempo de concentración y roles Tc` con base en la revalidación runtime limpia de OT-0275.

El bloque estabilizado quedó cerrado como acople técnico y documental, sin selección de Tc adoptado, sin dictamen hidrológico y sin recálculo de motor.

## Estado previo estabilizado

La cadena estabilizada del bloque Tc roles quedó:

```text
construirExpedienteHidrologicoMinimo
↓
trDisenoActivoExpedienteDocumental
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Bloques documentales candidatos

Dentro del expediente hidrológico mínimo permanecen bloques posteriores que pueden entrar al mismo patrón de maduración:

- `## 4. Volumen de referencia`;
- `## 5. Escenario Q-Tr activo — control de trazabilidad`;
- `## 6. Resumen Q-5 auditado`;
- `## 7. Método Racional — contraste global independiente`;
- `## 8. Contraste Q-5 vs Método Racional`;
- `## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `## Diagnóstico temporal Q(t) no adoptivo`;
- `## 10. Validación interna del expediente exportado`;
- `## 11. Sello técnico de generación`;
- `## 12. Restricciones y advertencias técnicas`.

## Criterio de selección

El siguiente bloque debe seleccionarse bajo criterios de bajo riesgo y alto valor documental:

- continuidad natural dentro del expediente;
- bajo acoplamiento con decisiones hidrológicas nuevas;
- posibilidad de definir contrato documental sin recálculo;
- capacidad de validar salida textual y tokens inválidos;
- no intervención del motor;
- no emisión de dictamen hidrológico;
- no modificación de bloques ya estabilizados.

## Bloque seleccionado

Se selecciona como siguiente bloque:

```text
## 4. Volumen de referencia
```

## Justificación

El bloque `Volumen de referencia` es el bloque inmediatamente posterior a `Tiempo de concentración y roles Tc` dentro del expediente hidrológico mínimo.

Su maduración documental permite continuar el fortalecimiento del expediente en orden secuencial, sin saltar todavía hacia Q-Tr, Q-5, Método Racional o diagnóstico Q(t).

La selección no autoriza recalcular volumen ni modificar fórmulas.

La selección no autoriza modificar motor.

La selección no autoriza modificar el constructor principal.

La selección no autoriza modificar el comparador.

## Enfoque recomendado para el siguiente frente

El siguiente frente debe ser contractual:

```text
OT-0278 — Contrato bloque Volumen de referencia del expediente
```

Ese contrato deberá definir:

- título del bloque;
- líneas mínimas esperadas;
- campos permitidos;
- reglas de fallback documental;
- restricciones sobre recálculo;
- tokens prohibidos;
- frontera frente a Q-Tr, Q-5, Método Racional y diagnóstico Q(t).

## Decisión

Se aprueba seleccionar el bloque `Volumen de referencia` como siguiente bloque documental del expediente hidrológico mínimo.

Esta decisión es documental.

No implementa acople.

No implementa helper.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula volumen.

No toca Q-Tr.

No toca Q-5.

No toca Método Racional.

No toca diagnóstico Q(t).

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula volumen.

No se emite dictamen hidrológico.

No se tocan Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0278 — Contrato bloque Volumen de referencia del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
