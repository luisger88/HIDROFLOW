# OT-0063B — Diseño de integración silenciosa del diagnóstico documental

Fecha: 2026-06-10 22:36:21

## Estado base
- Rama: ot-0063-diagnostico-documental-no-invasivo-comparador.
- Main base: 271e212, estabilizado post OT-0062.
- OT-0063A cerrada en commit 7eee21e.
- Alcance: diseño documental, sin cambios funcionales.

## Objetivo
Diseñar una integración silenciosa del adaptador documental en el flujo del expediente, sin modificar todavía ComparadorMultiMetodo.jsx ni alterar el comportamiento existente.

## Principio de integración
El adaptador documental debe ejecutarse como diagnóstico auxiliar posterior a la construcción de textoExpediente, sin modificar el texto, sin bloquear el copiado y sin sustituir la validación existente.

## Punto conceptual futuro
El punto candidato futuro es inmediatamente después de construir textoExpediente mediante join y antes del bloque de validación/copiado.

## Reglas obligatorias
- No duplicar textoExpediente.
- No modificar textoExpediente.
- No modificar seccionesObligatoriasExpediente.
- No modificar tokensInvalidosExpediente.
- No reemplazar la validación existente.
- No bloquear el copiado si el diagnóstico documental falla.
- No crear UI visible en esta fase.
- No generar PDF, Word ni mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Decisión técnica
OT-0063B no implementa integración funcional. Deja definida la estrategia silenciosa y no invasiva. La primera integración funcional mínima queda reservada para OT-0063C, si se autoriza.

## Criterio de salida
OT-0063B queda completa cuando exista un diseño versionado de integración silenciosa del diagnóstico documental, sin cambios funcionales sobre la aplicación.
