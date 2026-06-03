# Orden OT-0004C — Revisión documental específica de Kirpich
## Misión HF-MISION-0001
## Auditoría de unidades en calcTc(p) — La Iguaná PC_80

## Auditor asignado

HF_AuditorUnidades con apoyo de HF_AuditorTc.

## Objetivo

Revisar documentalmente la unidad esperada por el método Kirpich implementado en calcTc(p), especialmente la pendiente Sf.

## Contexto

OT-0004A y OT-0004B detectaron una posible inconsistencia dimensional en Kirpich.

En el motor actual se observa:

Kirpich:
h = (0.0078 * Lft^0.77 * Sf^-0.385) / 60

Variables:
- Lft = L * 3280.84
- Sf = (cota_mayor_cauce - cota_menor_cauce) / (L * 3280.84)

Validación numérica La Iguaná PC_80:
- L = 15.524 km
- desnivel = 1307.91 m
- Lft = 50931.76 ft
- Sf actual código = 0.02567965
- Sf coherente ft/ft = 0.08425084
- Relación = 3.28084

## Archivo objetivo principal

- src/services/hidroEngine.js

## Bloque objetivo

- export function calcTc(p)
- Método: Kirpich (1940)

## Mandato cerrado

El auditor debe limitarse a:

- Verificar la fórmula Kirpich implementada.
- Identificar unidad esperada para Lft.
- Identificar unidad esperada para Sf.
- Determinar si Sf debe ser ft/ft, m/m o pendiente adimensional equivalente.
- Comparar la implementación actual contra la forma documental esperada.
- Comunicar hallazgos al HF_AuditorJefe.

## Qué buscar

- Kirpich
- 0.0078
- Lft
- Sf
- ft/ft
- pendiente adimensional
- longitud en pies
- desnivel en pies
- slope

## Qué NO hacer

- No modificar hidroEngine.js.
- No corregir Sf.
- No cambiar fórmula.
- No adoptar Tc Kirpich.
- No reemplazar valores.
- No aplicar parche sin autorización del HF_AuditorJefe.

## Evidencia requerida

El auditor debe reportar:

- Fórmula documental esperada.
- Unidad esperada para longitud.
- Unidad esperada para pendiente.
- Comparación contra implementación actual.
- Impacto numérico ya observado.
- Riesgo.
- Recomendación.

## Criterio de cierre

OT-0004C se cierra cuando el auditor pueda responder:

1. Si la fórmula Kirpich implementada espera L en pies.
2. Si la pendiente Sf debe ser ft/ft.
3. Si el uso actual de desnivel en metros sobre longitud en pies es dimensionalmente inconsistente.
4. Si el Tc Kirpich actual debe quedar marcado como no adoptable hasta corrección.
5. Si procede preparar parche técnico mínimo posterior.
