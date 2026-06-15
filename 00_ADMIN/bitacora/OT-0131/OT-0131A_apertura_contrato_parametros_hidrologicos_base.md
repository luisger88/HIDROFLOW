# OT-0131A — Apertura de contrato documental Parámetros hidrológicos base

## Objetivo

Definir el contrato documental del bloque `## 2. Parámetros hidrológicos base` antes de cualquier helper, integración diagnóstica o sustitución.

## Antecedente

OT-0130 seleccionó y auditó el bloque `## 2. Parámetros hidrológicos base`.

OT-0130C saneó la auditoría OT-0130B, dejando evidencia documental limpia.

La auditoría confirmó que el bloque contiene campos hidrológicamente sensibles:

- `CN`;
- `CN base`;
- `CN efectivo`;
- `AMC`.

## Alcance

Esta OT solo define contrato documental.

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

No recalcular.

No inferir.

No derivar.

Solo representar valores ya presentes en `contextoBase`.
