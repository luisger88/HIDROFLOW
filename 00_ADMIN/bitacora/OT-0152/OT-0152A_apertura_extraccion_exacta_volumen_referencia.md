# OT-0152A — Apertura extracción exacta bloque Volumen de referencia operativo

## Objetivo

Extraer la forma exacta del bloque operativo `## 4. Volumen de referencia` desde `ComparadorMultiMetodo.jsx`, línea por línea, antes de diseñar cualquier helper.

## Antecedente

OT-0150 auditó el bloque `## 4. Volumen de referencia` y lo clasificó como técnicamente sensible.

OT-0150C saneó documentalmente la auditoría.

OT-0151 definió el contrato documental del bloque.

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

- No calcular volumen.
- No recalcular Pe.
- No recalcular área.
- No inferir masa.
- Solo extraer texto operativo existente.
