# OT-0064B — Integración interna silenciosa del diagnóstico documental

Fecha: 2026-06-10 22:54:17

## Estado base

- Rama: ot-0064-integracion-interna-silenciosa-diagnostico-documental.
- OT-0064A cerrada en commit 494f62a.
- Main base: 42c1bb4, estabilizado post OT-0063.
- Working tree inicial limpio.

## Objetivo

Integrar internamente el adaptador documental como diagnóstico silencioso no bloqueante, usando el textoExpediente real y sin alterar el flujo de copiado.

## Intervención autorizada

- Agregar import del servicio puro adaptarExpedienteDocumental.
- Ejecutar diagnóstico justo después de construir textoExpediente.
- Usar try/catch para impedir bloqueo del copiado.
- Usar console.warn solo si el diagnóstico falla.

## Restricciones

- No modificar textoExpediente.
- No modificar tokensInvalidosExpediente.
- No modificar seccionesObligatoriasExpediente.
- No reemplazar validación existente.
- No bloquear copiado.
- No agregar window.alert ni window.prompt.
- No crear UI visible.
- No generar PDF, Word ni mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Criterio de salida

OT-0064B queda completa cuando el diagnóstico documental silencioso esté integrado, el build Vite apruebe y se confirme que no cambió el flujo de copiado ni el texto exportable.
