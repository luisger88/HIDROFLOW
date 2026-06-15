# OT-0133A — Apertura de implementación helper puro Parámetros hidrológicos base

## Objetivo

Implementar la función pura `construirLineasParametrosHidrologicosBaseExpediente(...)` en el helper documental del expediente hidrológico mínimo.

## Antecedente

OT-0131 definió el contrato documental del bloque `## 2. Parámetros hidrológicos base`.

OT-0132 diseñó la función pura futura.

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

La función debe ser estrictamente representacional:

- no recalcular;
- no inferir;
- no derivar;
- no consultar motor;
- solo representar valores presentes en `contextoBase` o fallback `—`.
