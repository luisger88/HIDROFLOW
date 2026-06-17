# OT-0215B — Selección prudente del bloque documental del expediente a retomar

## Objetivo

Seleccionar prudentemente el siguiente bloque documental del expediente hidrológico mínimo a retomar después del cierre de la fase tooling documental mínimo.

## Antecedente

OT-0214 cerró formalmente la fase de tooling documental mínimo y definió el retorno controlado al expediente.

La herramienta `Nueva-OTDocumentalHidroFlow` queda disponible para aperturas y cierres documentales mínimos, pero no debe utilizarse todavía para intervenir bloques sensibles.

## Estado actual del expediente

Ya quedaron estabilizados ciclos documentales previos sobre bloques de bajo riesgo:

- Identificación;
- Parámetros hidrológicos base;
- Tiempo de concentración y roles Tc.

También quedó claro que los bloques pendientes con mayor sensibilidad incluyen:

- Volumen de referencia;
- escenario Q-Tr activo;
- resumen Q-5 auditado;
- Método Racional;
- diagnóstico temporal Q(t).

## Criterios de selección

El bloque a retomar debe cumplir:

- bajo riesgo operativo;
- bajo coste documental;
- valor claro para el expediente;
- posibilidad de auditoría previa sin implementación;
- ausencia de modificación directa al motor;
- ausencia de modificación directa a `textoExpediente`;
- ausencia de intervención sobre Q-5, Q-Tr o Método Racional.

## Opciones consideradas

### Opción A — Volumen de referencia

Ventaja: es un bloque importante del expediente.

Riesgo: conecta con Pe y volumen esperado, por tanto puede abrir discusión de masa hidrológica.

### Opción B — Escenario Q-Tr activo

Ventaja: aporta lectura hidráulico-hidrológica útil.

Riesgo: conecta con caudal activo y puede aproximarse demasiado a Q-Tr/Q-5.

### Opción C — Resumen Q-5 auditado

Ventaja: tiene alto valor técnico.

Riesgo: es sensible y no debe retomarse sin una auditoría específica previa.

### Opción D — Bloque de restricciones/advertencias del expediente

Ventaja: es documental, no requiere cálculo nuevo y puede mejorar la robustez institucional del expediente.

Riesgo: si se modifica sin auditoría, puede duplicar o alterar mensajes existentes.

### Opción E — Inventario/selección de bloque no sensible antes de implementación

Ventaja: mantiene control, evita tocar bloques sensibles y permite decidir con evidencia.

Riesgo: agrega una OT documental adicional antes de implementar.

## Decisión recomendada

La decisión recomendada es no retomar todavía Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

El siguiente frente debe ser una auditoría documental de bajo riesgo sobre restricciones y advertencias del expediente, o una selección más específica de bloque no sensible.

## Decisión operativa

Se selecciona como siguiente línea prudente el bloque documental de restricciones/advertencias del expediente, pero solo para auditoría previa.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

## Próximo frente recomendado

`OT-0216 — Auditoría documental de restricciones y advertencias del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
