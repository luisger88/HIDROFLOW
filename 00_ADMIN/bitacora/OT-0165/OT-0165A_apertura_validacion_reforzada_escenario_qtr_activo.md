# OT-0165A — Apertura validación reforzada helper Escenario Q-Tr activo

## Objetivo

Validar de forma aislada y reforzada el helper puro `construirLineasEscenarioQTrActivoExpediente(...)` antes de cualquier integración diagnóstica o sustitución.

## Antecedente

OT-0164 implementó el helper puro representacional para el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad`.

La validación inicial confirmó contexto completo, fallback general, faltantes, ausencia de formateador externo y objetos no serializables.

## Alcance

Esta OT solo refuerza la validación aislada.

No modifica el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Casos borde a validar

- entrada `null`;
- entrada `string`;
- entrada `array`;
- `formatearValorQTrExpediente` no función;
- formateador que devuelve `null`;
- formateador que devuelve `undefined`;
- formateador que devuelve objeto;
- `estado` vacío;
- `fuente` vacía;
- `faltantes` con strings vacíos, objetos y `null`;
- valores Q-Tr en cero;
- valores Q-Tr como strings numéricos;
- valores Q-Tr como `NaN`.

## Restricciones

No se modifica:

- helper documental;
- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
