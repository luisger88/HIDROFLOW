# OT-0144A — Apertura validación reforzada helper Tiempo de concentración y roles Tc

## Objetivo

Validar de forma aislada y reforzada el helper puro `construirLineasTiempoConcentracionRolesTcExpediente(...)` antes de cualquier integración diagnóstica o sustitución.

## Antecedente

OT-0143 implementó el helper puro representacional para el bloque `## 3. Tiempo de concentración y roles Tc`.

La validación inicial confirmó contexto completo, fallback y caso no finito.

## Alcance

Esta OT solo refuerza la validación aislada.

No modifica el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Casos borde a validar

- `Tc_final: 0`;
- `Tc_final: ""`;
- `Tc_final: NaN`;
- `Tc_final: null`;
- `Tc_final: "114.23"`;
- `trDisenoActivoExpediente: ""`;
- `trDisenoActivoExpediente: null`;
- `trDisenoActivoExpediente: object`;
- entrada vacía.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- helper documental;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
