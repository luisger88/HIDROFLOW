# OT-0199A — Apertura auditoría/trazabilidad bloque Restricciones o advertencias técnicas

## Objetivo

Auditar y trazar si existe un bloque de `Restricciones`, `Advertencias técnicas` o equivalente dentro de `textoExpediente` del expediente hidrológico mínimo.

## Antecedente

OT-0198 seleccionó `Resumen de restricciones o advertencias técnicas` como candidato representacional integrado alternativo, condicionado a confirmar primero su ruta real de composición.

## Alcance

Esta OT solo audita y traza.

No implementa helper.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Preguntas de auditoría

- ¿Existe dentro de `textoExpediente` una referencia textual a restricciones o advertencias técnicas?
- ¿Existe una ruta operativa mediante helper?
- ¿Qué helper candidato, si existe, parece asociado al bloque?
- ¿El helper candidato se exporta en `construirExpedienteHidrologicoMinimo.js`?
- ¿Puede importarse y ejecutarse en escenario controlado sin residuos?
- ¿El bloque es apto para validación aislada posterior?
