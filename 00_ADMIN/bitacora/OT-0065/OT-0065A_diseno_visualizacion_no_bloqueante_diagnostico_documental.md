# OT-0065A — Diseño de visualización no bloqueante del diagnóstico documental

Fecha: 2026-06-10 23:16:06

## Estado base

- Rama: ot-0065-panel-diagnostico-documental-no-bloqueante.
- Rama creada desde main limpio post OT-0064.
- Main base: 8adaca8, estabilizado post PR #95.
- OT-0064 integró internamente el diagnóstico documental silencioso.
- Working tree inicial limpio.

## Objetivo

Diseñar una visualización no bloqueante del diagnóstico documental, sin alterar el flujo de copiado ni el texto exportable del expediente.

## Fuente técnica heredada

El panel futuro debe mostrar una lectura diagnóstica auxiliar del adaptador documental, sin convertirse en requisito para copiar el expediente ni en fuente paralela de datos.

Principio rector: observar y reportar, no bloquear ni transformar.

## Información candidata a visualizar

- Estado del diagnóstico documental: OK / con advertencias / no disponible.
- Total de secciones reconocidas.
- Total de restricciones reconocidas.
- Estado técnico extraído.
- Advertencias del adaptador si existen.
- Errores del adaptador si existen, como lectura no bloqueante.

## Ubicación visual candidata

La ubicación candidata futura debe ser cercana al bloque del expediente hidrológico mínimo, pero separada del botón de copiado para evitar sugerir que el diagnóstico controla la operación.

Debe ser un panel discreto, similar a otros bloques de lectura técnica, con texto de alcance no adoptivo.

## Reglas obligatorias

- No cambiar el texto copiado al portapapeles.
- No bloquear el botón Copiar expediente hidrológico mínimo.
- No reemplazar validaciones existentes.
- No modificar tokensInvalidosExpediente.
- No modificar seccionesObligatoriasExpediente.
- No modificar textoExpediente.
- No generar PDF.
- No generar Word.
- No generar mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Riesgos

- Que el panel se interprete como validación adoptiva final.
- Que el panel parezca controlar el copiado.
- Que se duplique información del expediente.
- Que se convierta prematuramente en exportador documental.

## Decisión técnica

OT-0065A no implementa panel funcional. Solo define el diseño de una visualización no bloqueante. La implementación mínima queda reservada para OT-0065B si se autoriza.

## Criterio de salida

OT-0065A queda completa cuando exista un diseño versionado del panel diagnóstico documental no bloqueante, sin cambios funcionales sobre la aplicación.
