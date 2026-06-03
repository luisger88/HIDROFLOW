# Orden OT-0004D — Revisión documental específica de SCS-Ranser
## Misión HF-MISION-0001
## Auditoría de unidades en calcTc(p) — La Iguaná PC_80

## Auditor asignado

HF_AuditorUnidades con apoyo de HF_AuditorTc.

## Objetivo

Determinar la unidad esperada de la pendiente Sp usada en el método SCS-Ranser implementado en calcTc(p).

## Contexto

OT-0004B evidenció alta sensibilidad del método SCS-Ranser a la escala de Sp.

Resultados observados:

- Sp = 8.43 → Tc ≈ 122.02 min
- Sp = 0.0843 → Tc ≈ 1220.24 min

Relación ≈ 10 veces.

## Implementación en motor

SCS-Ranser:
h = ((L*1000)^0.8 * (Ss + 1)^0.7) / (4655 * Sp^0.5)

Variables:
- L = longitud en km
- L*1000 = longitud en m
- Ss = retención SCS
- Sp = p.pendiente_cuenca

## Archivo objetivo

- src/services/hidroEngine.js

## Mandato cerrado

- Identificar unidad esperada de Sp en la formulación.
- Verificar si la fórmula implementada coincide con SCS-Ranser estándar.
- Determinar si Sp debe estar en porcentaje o en pendiente decimal.
- Comparar con implementación actual.
- No modificar código.

## Qué buscar

- SCS
- Ranser
- 4655
- Sp
- pendiente
- slope
- porcentaje
- decimal

## Qué NO hacer

- No modificar hidroEngine.js.
- No cambiar Sp.
- No corregir fórmula.
- No adoptar Tc.

## Evidencia requerida

- Unidad esperada de Sp.
- Unidad usada actualmente.
- Diferencia.
- Impacto numérico.
- Riesgo.

## Criterio de cierre

OT-0004D se cierra cuando se pueda responder:

1. Si Sp debe ser porcentaje o decimal.
2. Si pendiente_cuenca está correctamente usada.
3. Si el Tc actual es dimensionalmente coherente.
4. Si el método puede adoptarse o no.
