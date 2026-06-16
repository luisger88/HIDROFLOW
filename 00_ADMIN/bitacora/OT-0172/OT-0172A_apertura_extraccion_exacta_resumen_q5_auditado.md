# OT-0172A — Apertura extracción exacta bloque Resumen Q-5 auditado operativo

## Objetivo

Extraer la forma exacta del bloque operativo `## 6. Resumen Q-5 auditado` desde `ComparadorMultiMetodo.jsx`, línea por línea, antes de diseñar cualquier función pura.

## Antecedente

OT-0170 auditó el bloque y lo clasificó como técnicamente sensible / dependiente de Q-5.

OT-0170C saneó documentalmente la auditoría.

OT-0171 definió el contrato documental del bloque.

## Alcance

Esta OT solo extrae y documenta la forma operativa real del bloque.

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
- Solo extraer texto operativo existente.
