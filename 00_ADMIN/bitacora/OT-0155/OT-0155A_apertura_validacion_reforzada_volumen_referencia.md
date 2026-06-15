# OT-0155A — Apertura validación reforzada helper Volumen de referencia

## Objetivo

Validar de forma aislada y reforzada el helper puro `construirLineasVolumenReferenciaExpediente(...)` antes de cualquier integración diagnóstica o sustitución.

## Antecedente

OT-0154 implementó el helper puro representacional para el bloque `## 4. Volumen de referencia`.

La validación inicial confirmó contexto completo, fallback, lluvia no finita, volumen vacío y volumen objeto.

## Alcance

Esta OT solo refuerza la validación aislada.

No modifica el helper.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Casos borde a validar

- `peTotalMm: 0`;
- `peTotalMm: ""`;
- `peTotalMm: "56.65"`;
- `peTotalMm: null`;
- `peTotalMm: object`;
- `volumenEsperadoM3: 0`;
- `volumenEsperadoM3: "2654251"`;
- `volumenEsperadoM3: NaN`;
- `volumenEsperadoM3: null`;
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
