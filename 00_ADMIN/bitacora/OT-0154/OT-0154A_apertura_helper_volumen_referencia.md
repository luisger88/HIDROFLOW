# OT-0154A — Apertura implementación helper puro Volumen de referencia

## Objetivo

Implementar la función pura `construirLineasVolumenReferenciaExpediente(...)` en el helper documental del expediente hidrológico mínimo.

## Antecedente

OT-0150 auditó el bloque `## 4. Volumen de referencia` y lo clasificó como sensible.

OT-0151 definió el contrato documental.

OT-0152 extrajo la forma exacta operativa.

OT-0153 diseñó la función pura futura.

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

- No calcular volumen.
- No recalcular Pe.
- No recalcular área.
- No inferir masa.
- No consultar motor.
- Solo representar valores presentes o fallback documental.
