# Orden OT-0004D-A — Origen de pendiente_cuenca

## Objetivo

Rastrear el origen, cálculo y unidad de la variable pendiente_cuenca en todo el sistema HidroFlow.

## Mandato cerrado

- Identificar todos los archivos donde aparece pendiente_cuenca.
- Determinar si es asignada, calculada o proveniente de catálogo.
- Verificar su unidad (%, decimal, adimensional).
- Verificar si su valor es transformado en algún punto.
- No modificar código.

## Archivos objetivo

- src/data/cuencasCatalogo.js
- src/services/hidroEngine.js
- src/components/
- src/pages/ (si aplica)

## Qué buscar

- pendiente_cuenca
- slope
- Scp
- Sc
- porcentaje
- decimal

## Criterio de cierre

1. Identificar el origen único de pendiente_cuenca.
2. Determinar su unidad real.
3. Detectar inconsistencias.
4. Clasificar riesgo.
