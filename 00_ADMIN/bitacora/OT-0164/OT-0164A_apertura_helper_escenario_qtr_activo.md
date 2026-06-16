# OT-0164A — Apertura implementación helper puro Escenario Q-Tr activo

## Objetivo

Implementar la función pura `construirLineasEscenarioQTrActivoExpediente(...)` en el helper documental del expediente hidrológico mínimo.

## Antecedente

OT-0160 auditó el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` y lo clasificó como sensible / dependiente de estado.

OT-0160C saneó documentalmente la auditoría.

OT-0161 definió el contrato documental.

OT-0162 extrajo la forma exacta operativa.

OT-0163 diseñó la función pura futura.

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
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica

- No recalcular Q.
- No inferir Tr.
- No recalcular área.
- No recalcular CN.
- No recalcular S ni Ia.
- No recalcular Pe.
- No modificar `estadoQTrActivoExpediente`.
- No modificar `qTrActivoExpediente`.
- No consultar motor.
- Solo representar valores presentes o fallback documental.
