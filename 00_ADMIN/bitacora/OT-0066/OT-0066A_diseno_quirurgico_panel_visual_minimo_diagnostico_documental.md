# OT-0066A — Diseño quirúrgico del panel visual mínimo del diagnóstico documental

Fecha: 2026-06-10 23:33:31

## Estado base

- Rama: ot-0066-panel-visual-minimo-diagnostico-documental.
- Rama creada desde main limpio post OT-0065.
- Main base: 6ec242f, estabilizado post PR #96.
- Working tree inicial limpio.

## Objetivo

Diseñar el panel visual mínimo del diagnóstico documental como lectura auxiliar no bloqueante, sin implementar todavía cambios funcionales.

## Ubicación candidata

- Después de la referencia de escala del volumen esperado.
- Antes o cerca del panel visual de consistencia cruzada OT-0058.
- Separado visualmente del botón Copiar expediente hidrológico mínimo.

## Información mínima candidata

- Estado del diagnóstico documental.
- Total de secciones documentales reconocidas.
- Total de restricciones reconocidas.
- Estado técnico extraído.
- Advertencias o errores solo como lectura auxiliar.

## Restricciones

- No cambiar textoExpediente.
- No bloquear el copiado.
- No reemplazar validaciones existentes.
- No modificar tokensInvalidosExpediente.
- No modificar seccionesObligatoriasExpediente.
- No generar PDF, Word ni mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Decisión técnica

OT-0066A no implementa panel funcional. Solo define el diseño quirúrgico. La implementación mínima queda reservada para OT-0066B.

## Criterio de salida

OT-0066A queda completa cuando exista el diseño quirúrgico versionado del panel visual mínimo del diagnóstico documental, sin cambios funcionales sobre la aplicación.
