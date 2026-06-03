# Orden OT-0001 — HF_AuditorTc
## Misión HF-MISION-0001
## Auditoría Tc–Tp–Qp–Volumen La Iguaná PC_80

## Auditor asignado

HF_AuditorTc

## Objetivo

Inspeccionar la lógica de tiempo de concentración en HidroFlow sin modificar código.

## Archivos objetivo iniciales

- src/HidroFlow.jsx
- src/hidroEngine.js

## Mandato cerrado

El auditor debe limitarse a:

- Buscar ocurrencias de calcTc(params).
- Identificar la función fuente calcTc.
- Identificar qué módulos consumen calcTc.
- Detectar si existen múltiples usos con propósitos distintos.
- Identificar campos de salida de calcTc.
- Relacionar resultados observados en el comparador con la estructura real de calcTc.
- Comunicar hallazgos al HF_AuditorJefe.

## Qué debe buscar

- function calcTc
- export function calcTc
- const calcTc
- calcTc(
- tcList
- Tc sugerido
- tc_metodos
- r.h
- r.m
- h
- min

## Qué NO debe hacer

- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No corregir fórmulas.
- No adoptar ningún Tc.
- No promediar métodos.
- No inferir unidades sin evidencia.
- No mezclar Scp y Sc.

## Evidencia requerida

Para cada hallazgo:

- Archivo.
- Línea aproximada.
- Función o bloque.
- Variable.
- Campo de salida.
- Fórmula o uso.
- Riesgo.
- Relación con ComparadorMultiMetodo.

## Criterio de cierre

La orden OT-0001 se cierra cuando HF_AuditorTc entregue evidencia suficiente para responder:

1. Dónde vive calcTc.
2. Qué estructura devuelve calcTc.
3. Qué métodos calcula.
4. Qué unidades reporta.
5. Qué pendiente usa cada método o qué pendiente debe auditarse.
6. Qué módulo consume cada Tc.
7. Por qué Témez aparece como aproximadamente 231.51 min.

