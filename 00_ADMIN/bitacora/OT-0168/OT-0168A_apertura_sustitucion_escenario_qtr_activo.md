# OT-0168A — Apertura sustitución parcial Escenario Q-Tr activo

## Objetivo

Sustituir únicamente el bloque operativo `## 5. Escenario Q-Tr activo — control de trazabilidad` dentro de `textoExpediente` por el helper delegado `construirLineasEscenarioQTrActivoExpediente(...)`.

## Antecedente

OT-0164 implementó el helper puro.

OT-0165 reforzó su validación aislada.

OT-0166 integró el helper como diagnóstico no invasivo.

OT-0167 confirmó coincidencia textual estricta 16/16 entre bloque delegado y referencia operativa.

## Alcance

Esta OT sustituye solo el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad`.

No modifica los bloques `## 1`, `## 2`, `## 3` ni `## 4`.

No modifica bloques posteriores.

## Restricciones

No se modifica:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Regla técnica

- No recalcular Q.
- No inferir Tr.
- No modificar `estadoQTrActivoExpediente`.
- No modificar `qTrActivoExpediente`.
- No consultar motor.
