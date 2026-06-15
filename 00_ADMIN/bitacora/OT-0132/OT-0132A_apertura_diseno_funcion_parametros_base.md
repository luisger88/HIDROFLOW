# OT-0132A — Apertura de diseño de función pura Parámetros hidrológicos base

## Objetivo

Diseñar la función pura futura del bloque `## 2. Parámetros hidrológicos base`, sin implementarla todavía.

## Antecedente

OT-0131 definió el contrato documental del bloque.

Regla central:

- No recalcular.
- No inferir.
- No derivar.
- Solo representar valores ya presentes en `contextoBase`.

## Alcance

Esta OT solo diseña la función pura.

No crea la función en el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No sustituye `textoExpediente`.

No integra nada en UI.

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
