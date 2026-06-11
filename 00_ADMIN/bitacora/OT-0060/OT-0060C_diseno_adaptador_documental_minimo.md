# OT-0060C — Diseño de adaptador documental mínimo

Fecha: 2026-06-10 21:03:00

## Estado base

- Rama: ot-0060-salida-documental-formal-expediente.
- OT-0060A cerrada en commit 0ab1eca.
- OT-0060B cerrada en commit 75268b2.
- Main base: ae75b35, estabilizado post OT-0059.
- Working tree inicial limpio.

## Objetivo

Diseñar un adaptador documental mínimo que permita convertir el expediente textual/exportable validado en una estructura documental formal, sin generar PDF, Word, mapas ni exportaciones complejas.

## Fuente primaria

La fuente primaria sigue siendo `textoExpediente`, construido en:

`01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx`

El adaptador no debe recalcular, no debe consultar el motor hidrológico y no debe reconstruir lógica de Q-Tr, Q-5 ni Método Racional.

## Principio arquitectónico

Un solo origen técnico del contenido; múltiples representaciones documentales.

El adaptador debe recibir contenido ya validado y transformarlo únicamente en una estructura ordenada para presentación documental.

## Entrada conceptual

Entrada mínima esperada:

- `textoExpediente: string`

Opcionalmente, en fases posteriores:

- `metadatosDocumento.cuencaActiva`
- `metadatosDocumento.fechaGeneracion`
- `metadatosDocumento.estadoTecnico`
- `metadatosDocumento.versionHidroFlow`
- `metadatosDocumento.fuenteExpediente`

## Salida conceptual

Salida mínima esperada:

- `estructuraDocumental.titulo`
- `estructuraDocumental.estadoTecnico`
- `estructuraDocumental.secciones[]`
- `estructuraDocumental.restricciones`
- `estructuraDocumental.trazabilidad`

Cada sección documental debe poder expresarse como:

- `numero`
- `titulo`
- `contenido`
- `tipo`

## Reglas de transformación

1. No alterar el contenido técnico.
2. No recalcular valores.
3. No modificar unidades.
4. No reinterpretar dictámenes.
5. No cambiar estado técnico.
6. No remover restricciones.
7. No promover resultados a adoptivos.
8. Preservar orden de secciones.
9. Preservar tablas Markdown.
10. Preservar trazabilidad al expediente exportable.

## Secciones mínimas esperadas

El adaptador debe reconocer o preservar:

1. Identificación.
2. Parámetros base.
3. Contexto Tc / Tr / roles hidrológicos.
4. Volumen de referencia.
5. Escenario Q-Tr activo.
6. Resumen Q-5 auditado.
7. Método Racional como contraste global independiente.
8. Contraste Q-5 vs Método Racional.
9. Control de consistencia cruzada.
10. Validación interna.
11. Sello técnico.
12. Restricciones y advertencias.

## Fuera de alcance

- Generar PDF.
- Generar Word.
- Generar mapas.
- Crear anexos cartográficos.
- Modificar UI.
- Modificar `hidroEngine.js`.
- Modificar fórmulas hidrológicas.
- Recalcular Q-Tr.
- Recalcular Q-5.
- Recalcular Método Racional.
- Alterar resultados numéricos.
- Crear una fuente paralela de datos hidrológicos.

## Riesgos

1. Duplicar el expediente exportable en una nueva lógica.
2. Separar la plantilla formal de la fuente validada.
3. Romper tablas Markdown durante la transformación.
4. Reordenar secciones sin control.
5. Eliminar restricciones por limpieza documental.
6. Confundir presentación documental con adopción técnica.

## Criterio de salida

OT-0060C queda completa cuando exista una decisión de diseño sobre el adaptador documental mínimo, sus entradas, salidas, reglas de transformación, riesgos y restricciones.
