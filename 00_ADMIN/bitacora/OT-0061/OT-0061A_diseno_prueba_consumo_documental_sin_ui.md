# OT-0061A — Diseño de prueba de consumo documental sin UI

Fecha: 2026-06-10 21:53:00

## Estado base

- Rama: ot-0061-prueba-consumo-documental-sin-ui.
- Rama creada desde main limpio post OT-0060.
- Merge commit base en main: 2d31efe.
- PR base cerrado: #91 — OT-0060 — Salida documental formal del expediente hidrológico.
- Build post-merge OT-0060 aprobado con Vite.
- Working tree inicial limpio.

## Objetivo

Definir una prueba de consumo documental controlada para el servicio puro adaptarExpedienteDocumental, sin integración UI y sin modificar ComparadorMultiMetodo.jsx.

## Fuente técnica heredada

OT-0060 dejó en main:

- Diseño de salida documental formal.
- Plantilla textual formal del expediente.
- Diseño de adaptador documental mínimo.
- Contrato de datos del adaptador.
- Servicio puro adaptarExpedienteDocumental.js.
- Validación contractual del adaptador.
- Cierre integral sin integración UI.

## Alcance de OT-0061A

Esta etapa solo diseña la prueba de consumo documental. No implementa integración visual ni exportadores.

## Prueba objetivo

La prueba deberá tomar un expediente textual representativo y procesarlo mediante adaptarExpedienteDocumental(textoExpediente, metadatosDocumento).

La salida esperada debe confirmar:

- ok true.
- título extraído.
- estado técnico extraído.
- 12 secciones reconocidas.
- restricciones extraídas.
- trazabilidad conservada.
- clasificación correcta de Método Racional.
- clasificación correcta de consistencia cruzada.
- ausencia de errores contractuales.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx.
- No modificar UI.
- No modificar hidroEngine.js.
- No recalcular Q-Tr.
- No recalcular Q-5.
- No recalcular Método Racional.
- No alterar resultados numéricos.
- No generar PDF.
- No generar Word.
- No generar mapas.
- No abrir exportaciones complejas.

## Criterio de salida

OT-0061A queda completa cuando la estrategia de prueba de consumo documental sin UI quede documentada y versionada.
