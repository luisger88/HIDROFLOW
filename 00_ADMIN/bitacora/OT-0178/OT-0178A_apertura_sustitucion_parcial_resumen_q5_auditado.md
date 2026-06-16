# OT-0178A — Apertura sustitución parcial Resumen Q-5 auditado

## Objetivo

Sustituir de forma parcial y controlada el bloque operativo `## 6. Resumen Q-5 auditado` dentro de `textoExpediente`, usando el helper `construirLineasResumenQ5AuditadoExpediente(...)`.

## Antecedente

OT-0174 implementó el helper puro.

OT-0175 reforzó su validación aislada.

OT-0176 confirmó coincidencia textual estricta 14/14 entre helper y referencia operativa controlada.

OT-0177 integró el helper como diagnóstico no invasivo.

## Alcance

Esta OT sustituye únicamente el bloque `## 6. Resumen Q-5 auditado` dentro de `textoExpediente`.

No modifica bloques `## 1` a `## 5`.

No modifica bloques posteriores.

## Restricciones

No se modifica:

- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica

- `textoExpediente` sigue siendo la fuente del copiado.
- El bloque se sustituye por expansión controlada del helper.
- No se recalcula Q-5.
- No se modifica `tablaQ5Markdown`.
- No se altera el diagnóstico previo salvo que siga siendo útil como control interno.
