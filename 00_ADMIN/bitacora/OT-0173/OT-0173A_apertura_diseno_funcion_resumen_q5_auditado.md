# OT-0173A — Apertura diseño función pura Resumen Q-5 auditado

## Objetivo

Diseñar la función pura futura del bloque `## 6. Resumen Q-5 auditado`, sin implementarla todavía.

## Antecedente

OT-0170 auditó el bloque y lo clasificó como técnicamente sensible / dependiente de Q-5.

OT-0170C saneó documentalmente la auditoría.

OT-0171 definió el contrato documental del bloque.

OT-0172 extrajo la forma exacta del bloque operativo.

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
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica principal

- No recalcular Q-5.
- No modificar Qp.
- No modificar Tp.
- No modificar volumen.
- No modificar hidrogramas.
- No consultar motor.
- Solo representar texto fijo y `tablaQ5Markdown` ya existente.
