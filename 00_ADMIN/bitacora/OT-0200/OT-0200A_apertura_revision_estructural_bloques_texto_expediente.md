# OT-0200A — Apertura revisión estructural de bloques reales dentro de textoExpediente

## Objetivo

Inventariar la estructura real de bloques que componen `textoExpediente` dentro de `ComparadorMultiMetodo.jsx`, para evitar seguir seleccionando candidatos no integrados.

## Antecedente

OT-0196 confirmó que el helper `Sello técnico auxiliar` existe pero no está integrado en `textoExpediente`.

OT-0199 confirmó que el candidato `Restricciones o advertencias técnicas` no aparece integrado con las rutas buscadas.

## Alcance

Esta OT solo inventaría y documenta.

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

## Preguntas de revisión

- ¿Existe `textoExpediente`?
- ¿Dónde cierra `textoExpediente`?
- ¿Qué helpers se expanden dentro de `textoExpediente`?
- ¿Qué encabezados literales `## ...` aparecen dentro de `textoExpediente`?
- ¿Qué bloques parecen candidatos reales para próximas auditorías?
