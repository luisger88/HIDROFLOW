# OT-0061B — Script de consumo documental representativo

Fecha: 2026-06-10 22:04:13

## Estado base

- Rama: ot-0061-prueba-consumo-documental-sin-ui.
- OT-0061A cerrada en commits 0630aa2 y 52b7936.
- Main base: 2d31efe, estabilizado post OT-0060.
- Working tree inicial limpio.

## Objetivo

Crear un script de consumo documental representativo para validar el adaptador adaptarExpedienteDocumental con un expediente textual completo, sin integración UI.

## Alcance

- Consumir el servicio puro adaptarExpedienteDocumental.
- Usar un expediente representativo en texto.
- Validar estructura documental resultante.
- No tocar ComparadorMultiMetodo.jsx.
- No modificar UI.
- No generar PDF, Word ni mapas.

## Validaciones esperadas

- ok true.
- Título extraído.
- Estado técnico extraído.
- 12 secciones reconocidas.
- Restricciones extraídas.
- Método Racional clasificado como metodo_racional.
- Consistencia cruzada clasificada como consistencia.
- Trazabilidad conservada.

## Criterio de salida

OT-0061B queda completa cuando el script de consumo documental representativo esté versionado, ejecute correctamente y el build con Vite apruebe.
