# OT-0143A — Apertura implementación helper puro Tiempo de concentración y roles Tc

## Objetivo

Implementar la función pura `construirLineasTiempoConcentracionRolesTcExpediente(...)` en el helper documental del expediente hidrológico mínimo.

## Antecedente

OT-0140 definió el contrato documental preliminar.

OT-0141 extrajo la forma exacta del bloque operativo.

OT-0142 diseñó la función pura futura.

OT-0142C saneó documentalmente el diseño.

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

- No recalcular Tc.
- No inferir Tc.
- No derivar roles.
- No reinterpretar competencia.
- No generar advertencias nuevas.
- Solo representar valores presentes o fallback documental.
