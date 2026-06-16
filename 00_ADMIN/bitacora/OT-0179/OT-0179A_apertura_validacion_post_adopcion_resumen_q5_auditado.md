# OT-0179A — Apertura validación post-adopción Resumen Q-5 auditado

## Objetivo

Validar el estado posterior a la sustitución parcial del bloque `## 6. Resumen Q-5 auditado` por el helper `construirLineasResumenQ5AuditadoExpediente(...)`.

## Antecedente

OT-0178 sustituyó correctamente el bloque manual dentro de `textoExpediente` por la expansión del helper.

La validación histórica de OT-0177 quedó desactualizada porque todavía exigía que no existiera expansión del helper dentro de `textoExpediente`.

## Alcance

Esta OT ajusta la validación al estado post-adopción.

No sustituye nuevos bloques.

No modifica Q-5 operativo.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- bloque `## 1` a `## 5`;
- bloques posteriores;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.
