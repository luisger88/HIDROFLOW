# OT-0162A — Apertura extracción exacta bloque Escenario Q-Tr activo operativo

## Objetivo

Extraer la forma exacta del bloque operativo `## 5. Escenario Q-Tr activo — control de trazabilidad` desde `ComparadorMultiMetodo.jsx`, línea por línea, antes de diseñar cualquier función pura.

## Antecedente

OT-0160 auditó el bloque y lo clasificó como técnicamente sensible / dependiente de estado.

OT-0160C saneó documentalmente la auditoría.

OT-0161 definió el contrato documental del bloque.

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
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica principal

- No recalcular Q.
- No inferir Tr.
- No modificar `estadoQTrActivoExpediente`.
- No modificar `qTrActivoExpediente`.
- No consultar motor.
- Solo extraer texto operativo existente.
