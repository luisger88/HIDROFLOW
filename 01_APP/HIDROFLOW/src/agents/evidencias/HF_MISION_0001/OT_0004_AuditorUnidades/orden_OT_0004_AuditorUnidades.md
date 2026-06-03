# Orden OT-0004 — HF_AuditorUnidades
## Misión HF-MISION-0001
## Auditoría de unidades en calcTc(p) — La Iguaná PC_80

## Auditor asignado

HF_AuditorUnidades

## Objetivo

Auditar las unidades usadas por calcTc(p) en src/services/hidroEngine.js.

## Contexto

OT-0003A construyó la matriz método-campo de calcTc(p).

Se detectaron variables críticas:

- L = p.longitud_cauce
- A = p.area
- Sp = p.pendiente_cuenca
- So = ((cota_mayor_cauce - cota_menor_cauce) / (L * 1000)) * 1000
- Lft = L * 3280.84
- Sf = (cota_mayor_cauce - cota_menor_cauce) / (L * 3280.84)
- Ss = SCS_RETENCION_MM / p.CN - 254

## Archivo objetivo principal

- src/services/hidroEngine.js

## Bloque objetivo

- export function calcTc(p)

## Mandato cerrado

El auditor debe limitarse a:

- Identificar unidad esperada por cada fórmula.
- Identificar unidad usada por cada variable.
- Verificar si So, Sf y Sp están en escala decimal, porcentaje o por mil.
- Detectar riesgo de doble conversión.
- Detectar riesgo de longitud en km vs m.
- Detectar riesgo de área en km² vs m².
- Comunicar hallazgos al HF_AuditorJefe.

## Qué buscar

- So / 1000
- Math.pow(So
- Math.pow(Sf
- Math.pow(Sp
- L * 1000
- Lft
- 3280.84
- A
- cota_max
- cota_min
- cota_mayor_cauce
- cota_menor_cauce
- CN
- SCS_RETENCION_MM
- min
- h

## Qué NO hacer

- No modificar hidroEngine.js.
- No corregir fórmulas.
- No cambiar factores.
- No convertir unidades.
- No adoptar Tc.
- No asumir unidad sin evidencia.

## Evidencia requerida

Para cada método:

- Método.
- Variables usadas.
- Unidad esperada.
- Unidad inferida desde código.
- Conversión aplicada.
- Posible riesgo.
- Recomendación.

## Criterio de cierre

La orden OT-0004 se cierra cuando se pueda responder:

1. Si So está en milésima, decimal o porcentaje.
2. Si Sf está en ft/ft.
3. Si Sp está en porcentaje o decimal.
4. Si L está en km y L*1000 en m.
5. Si Lft está correctamente en pies.
6. Si A está en km² para Giandotti.
7. Si los Tc altos pueden estar asociados a unidades.
