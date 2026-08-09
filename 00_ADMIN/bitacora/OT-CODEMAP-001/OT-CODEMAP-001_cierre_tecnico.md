# OT-CODEMAP-001 — Cierre técnico

## Resultado

Se implementó y validó HF-CODEMAP v1.0.0 como CLI de memoria técnica navegable para HidroFlow.

## Resultado del indexador

- Archivos escaneados: 259
- Símbolos detectados: 5028
- Referencias cruzadas: 40828
- Guards detectados: 48
- Flujos de dominio: 8
- React flows: 281
- Document flows: 1
- Impact entries: 3693

## Consultas validadas

- resumen
- flujo Q5
- variable hidrogramasQ5Exportables
- variable onContextoComparador
- guard tieneQ5Publicado
- impacto filtroNumericoQ5
- alias Qp

## Hallazgos útiles inmediatos

- hidrogramasQ5Exportables se ubica en HidroFlow.jsx:2342.
- tieneQ5Publicado tiene guards asociados en ComparadorMultiMetodo.jsx.
- filtroNumericoQ5 impacta directamente el flujo Q5 y guards del expediente.
- Qp cuenta con aliases operativos: qp, Qpico, qPico, q_pico, caudalPico, caudal_pico.

## Regla operativa

Antes de tocar código crítico en HidroFlow, consultar HF-CODEMAP.

Después de cerrar una OT relevante, regenerar HF-CODEMAP.

## Estado

OT-CODEMAP-001 queda lista para commit selectivo.
