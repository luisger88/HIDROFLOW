# OT-0163A — Apertura diseño función pura Escenario Q-Tr activo

## Objetivo

Diseñar la función pura futura del bloque `## 5. Escenario Q-Tr activo — control de trazabilidad`, sin implementarla todavía.

## Antecedente

OT-0160 auditó el bloque y lo clasificó como técnicamente sensible / dependiente de estado.

OT-0160C saneó documentalmente la auditoría.

OT-0161 definió el contrato documental del bloque.

OT-0162 extrajo la forma exacta del bloque operativo.

## Alcance

Esta OT solo diseña la función pura futura.

No implementa helper.

No modifica `ComparadorMultiMetodo.jsx`.

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

## Regla técnica principal

- No recalcular Q.
- No inferir Tr.
- No recalcular área.
- No recalcular CN.
- No recalcular S ni Ia.
- No recalcular Pe.
- No modificar `estadoQTrActivoExpediente`.
- No modificar `qTrActivoExpediente`.
- No consultar motor.
- Solo representar valores ya presentes o fallback documental.
