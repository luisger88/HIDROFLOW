# OT-0166A — Apertura integración diagnóstica Escenario Q-Tr activo

## Objetivo

Integrar de forma diagnóstica y no invasiva el helper `construirLineasEscenarioQTrActivoExpediente(...)` dentro de `ComparadorMultiMetodo.jsx`.

## Antecedente

OT-0164 implementó el helper puro `construirLineasEscenarioQTrActivoExpediente(...)`.

OT-0165 reforzó su validación aislada frente a casos borde.

## Alcance

Esta OT solo ejecuta el helper como diagnóstico interno.

No sustituye el bloque operativo `## 5. Escenario Q-Tr activo — control de trazabilidad`.

No cambia `textoExpediente`.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- bloque operativo de `textoExpediente`;
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
