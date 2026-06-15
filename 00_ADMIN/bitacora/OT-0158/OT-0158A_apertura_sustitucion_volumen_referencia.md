# OT-0158A — Apertura sustitución parcial Volumen de referencia

## Objetivo

Sustituir únicamente el bloque operativo `## 4. Volumen de referencia` dentro de `textoExpediente` por el helper delegado `construirLineasVolumenReferenciaExpediente(...)`.

## Antecedente

OT-0154 implementó el helper puro.

OT-0155 reforzó su validación aislada.

OT-0156 integró el helper como diagnóstico no invasivo.

OT-0157 confirmó coincidencia textual estricta 4/4 entre delegado y referencia operativa.

## Alcance

Esta OT sustituye solo el bloque `## 4. Volumen de referencia`.

No modifica los bloques `## 1`, `## 2` ni `## 3`.

No modifica otros bloques del expediente.

## Restricciones

No se modifica:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
