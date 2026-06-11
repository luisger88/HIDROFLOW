# OT-0060A — Diseño de salida documental formal del expediente hidrológico

Fecha: 2026-06-10 20:50:16

## Estado base

- Rama de trabajo: ot-0060-salida-documental-formal-expediente.
- Rama creada desde main limpio post OT-0059.
- Merge commit base en main: ae75b35.
- PR base cerrado: #90 — OT-0059 — Expediente hidrológico como salida técnica verificable.
- Build post-merge OT-0059 aprobado con Vite.
- Working tree inicial limpio.

## Tesis técnica

OT-0060 parte de un expediente hidrológico mínimo textual/exportable ya consolidado en OT-0059. El expediente cuenta con estructura auditada, constructor mapeado, orden técnico normalizado, estado técnico explícito, validación interna, sello técnico y restricciones al cierre.

La salida documental formal no debe iniciar generando archivos PDF, Word, mapas ni exportaciones complejas. Primero debe definirse la arquitectura documental, la plantilla conceptual, las fuentes internas de contenido y las restricciones de trazabilidad.

## Objetivo de OT-0060A

Diseñar la salida documental formal del expediente hidrológico sin modificar cálculos, motores ni resultados. Este paso define el alcance documental antes de cualquier automatización.

## Fuente documental principal

La fuente primaria para una salida formal será el expediente textual/exportable consolidado en ComparadorMultiMetodo.jsx, específicamente el contenido construido en 	extoExpediente.

Ese expediente ya contiene:

1. Identificación.
2. Parámetros base.
3. Contexto Tc / Tr / roles hidrológicos.
4. Volumen de referencia.
5. Escenario Q-Tr activo.
6. Resumen Q-5 auditado.
7. Método Racional como contraste global independiente.
8. Contraste Q-5 vs Método Racional.
9. Control de consistencia cruzada Pe–Área–Volumen/Q-5.
10. Validación interna del expediente exportado.
11. Sello técnico de generación.
12. Restri
- Generar mapas.
- Generar anexos cartográficos.
- Automatizar exportaciones complejas.
- Modificar UI.
- Modificar motor hidrológico.
- Modificar fórmulas.
- Recalcular Q-Tr.
- Recalcular Q-5.
- Recalcular Método Racional.
- Alterar resultados numéricos.

## Riesgos identificados

1. Duplicar contenido del expediente en otra estructura sin trazabilidad.
2. Crear una salida documental que diverja del texto exportable validado.
3. Introducir campos manuales no auditados.
4. Convertir el documento en aparente adopción técnica final sin revisión profesional.
5. Abrir generación PDF/Word antes de estabilizar la plantilla conceptual.
6. Mezclar salida documental con cálculo hidrológico.

## Criterio arquitectónico

La salida documental formal debe consumir el expediente exportable ya validado, no reconstruir cálculos ni replicar lógica hidrológica.

Principio:

Un solo origen técnico del contenido; múltiples formas de presentación documental.

## Propuesta de fases OT-0060

### OT-0060A — Diseño documental

Define alcance, estructura, fuente de datos, restricciones y riesgos.

### OT-0060B — Plantilla textual formal

Construye una plantilla documental textual basada en el expediente exportable, sin generar PDF/Word.

### OT-0060C — Adaptador documental mínimo

Diseña un adaptador que transforme el texto exportable en estructura documental, sin recalcular.

### OT-0060D — Prototipo de salida formal controlada

Evalúa generación documental formal solo si la plantilla ya está estabilizada.

## Criterio de cierre de OT-0060A

OT-0060A queda completa cuando exista una decisión arquitectónica documentada sobre la salida documental formal, con fuente única, restricciones claras y fases posteriores definidas.
