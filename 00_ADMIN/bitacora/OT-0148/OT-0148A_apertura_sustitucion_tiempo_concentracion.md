# OT-0148A — Apertura sustitución parcial Tiempo de concentración y roles Tc

## Objetivo

Sustituir únicamente el bloque operativo `## 3. Tiempo de concentración y roles Tc` dentro de `textoExpediente` por el helper delegado `construirLineasTiempoConcentracionRolesTcExpediente(...)`.

## Antecedente

OT-0143 implementó el helper puro.

OT-0144 reforzó su validación aislada.

OT-0145 corrigió el fallback `Tc_final` vacío/null.

OT-0146 integró el helper como diagnóstico no invasivo.

OT-0147 confirmó coincidencia textual estricta 10/10 entre delegado y referencia operativa.

## Alcance

Esta OT sustituye solo el bloque `## 3. Tiempo de concentración y roles Tc`.

No modifica los bloques `## 1. Identificación` ni `## 2. Parámetros hidrológicos base`.

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
