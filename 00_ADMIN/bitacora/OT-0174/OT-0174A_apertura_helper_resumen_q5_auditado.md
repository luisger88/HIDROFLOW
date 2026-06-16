# OT-0174A — Apertura implementación helper puro Resumen Q-5 auditado

## Objetivo

Implementar la función pura `construirLineasResumenQ5AuditadoExpediente(...)` en el helper documental del expediente hidrológico mínimo.

## Antecedente

OT-0170 auditó el bloque `## 6. Resumen Q-5 auditado` y lo clasificó como técnicamente sensible / dependiente de Q-5.

OT-0170C saneó documentalmente la auditoría.

OT-0171 definió el contrato documental.

OT-0172 extrajo la forma exacta operativa.

OT-0173 diseñó la función pura futura.

## Alcance

Esta OT implementa únicamente el helper puro.

No integra el helper en `ComparadorMultiMetodo.jsx`.

No sustituye `textoExpediente`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica

- No recalcular Q-5.
- No modificar Qp.
- No modificar Tp.
- No modificar volumen.
- No modificar hidrogramas.
- No consultar motor.
- Solo representar texto fijo y `tablaQ5Markdown` ya existente.
