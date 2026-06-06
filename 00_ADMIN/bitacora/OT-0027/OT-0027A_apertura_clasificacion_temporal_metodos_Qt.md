# OT-0027A — Apertura clasificación temporal de métodos Q(t)

## Objetivo

Abrir el frente de clasificación temporal de métodos Q(t), usando las métricas incorporadas en OT-0026 para convertir Tp/Tc en una decisión técnica visible por método.

## Problema

Después de OT-0026, Q-5 muestra métricas temporales como Tp/Tc y duración equivalente. Sin embargo, todavía falta traducir esas métricas en una lectura técnica inmediata por método.

## Tesis

Cada método Q(t) debe exponer un estado temporal comprensible, sin modificar Qp, Tp, Volumen ni Q(t).

## Criterio inicial

- Tp/Tc < 0.50: respuesta rápida.
- 0.50 <= Tp/Tc <= 1.50: rango temporal razonable.
- Tp/Tc > 1.50: respuesta retardada.
- Sin Tc o sin Tp válido: sin referencia temporal.

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
