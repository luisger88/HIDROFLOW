# OT-0171A — Apertura contrato documental Resumen Q-5 auditado

## Objetivo

Definir el contrato documental del bloque `## 6. Resumen Q-5 auditado` antes de cualquier helper, integración diagnóstica o sustitución.

## Antecedente

OT-0170 auditó el bloque `## 6. Resumen Q-5 auditado` y lo clasificó como técnicamente sensible / dependiente de Q-5.

OT-0170C saneó documentalmente la auditoría para dejar una base limpia.

## Bloque auditado

```text
## 6. Resumen Q-5 auditado
Estado general: diagnóstico no adoptivo.
SCS Unit Hydrograph: candidato principal de referencia.
SCS Mod.: variante ajustable.
Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
Masa y volumen: controlados frente a referencia física.
Qp y Tp: sujetos a revisión temporal antes de adopción técnica.

Tabla Q-5 auditada:
...tablaQ5Markdown
```

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
