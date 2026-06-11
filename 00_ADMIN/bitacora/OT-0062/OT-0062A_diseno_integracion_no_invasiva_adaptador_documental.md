# OT-0062A — Diseño de integración no invasiva del adaptador documental

Fecha: 2026-06-10 22:20:48

## Estado base

- Rama: ot-0062-integracion-no-invasiva-adaptador-documental.
- Rama creada desde main limpio post OT-0061.
- Main base: 8c9abdf, estabilizado post PR #92.
- Working tree inicial limpio.

## Objetivo

Diseñar una integración no invasiva del adaptador documental puro, sin modificar todavía ComparadorMultiMetodo.jsx ni cambiar el flujo operativo del expediente copiado.

## Fuente técnica heredada

- OT-0059: expediente textual/exportable verificable.
- OT-0060: salida documental formal preparada sin integración UI.
- OT-0061: consumo documental representativo validado sin UI.

## Servicio candidato

Servicio puro existente:

01_APP/HIDROFLOW/src/services/documentos/adaptarExpedienteDocumental.js

## Principio de integración no invasiva

El adaptador documental debe actuar como diagnóstico auxiliar, no como reemplazo del expediente exportable ni del flujo actual de copiado.

Principio rector: un solo origen técnico del contenido; múltiples lecturas documentales no destructivas.

## Reglas de diseño

- No reemplazar el botón de copiar expediente.
- No modificar el texto exportable validado.
- No convertir el adaptador en fuente paralela de datos.
- No modificar resultados numéricos.
- No recalcular Q-Tr, Q-5 ni Método Racional.
- No tocar hidroEngine.js.
- No generar PDF, Word ni mapas.

## Punto candidato futuro

El punto candidato futuro deberá ser un bloque diagnóstico discreto, separado del flujo principal de copiado, que muestre estado del adaptador, conteo de secciones, conteo de restricciones y advertencias si existen.

## Fuera de alcance en OT-0062A

- Modificar ComparadorMultiMetodo.jsx.
- Crear UI.
- Integrar el adaptador al flujo de copiado.
- Generar documentos formales.
- Modificar motor hidrológico.
- Recalcular resultados.

## Criterio de salida

OT-0062A queda completa cuando exista una decisión de diseño documentada para una integración no invasiva del adaptador documental, sin cambios funcionales sobre la aplicación.
