# OT-0038A — Apertura coherencia entre salidas reproducibles Q-5

## Objetivo

Abrir la validación de coherencia entre las dos salidas reproducibles principales de Q-5:

- Resumen técnico Q-5.
- Expediente hidrológico mínimo.

## Problema

HidroFlow ya permite copiar dos salidas técnicas reproducibles. Ahora debe validarse que ambas sean coherentes entre sí y que no presenten contradicciones técnicas.

## Alcance

- Capturar resumen técnico Q-5 copiado.
- Capturar expediente hidrológico mínimo copiado.
- Comparar afirmaciones técnicas clave.
- Detectar contradicciones o campos problemáticos.
- No modificar cálculos.
- No modificar motor.

## Criterios de coherencia

Ambas salidas deben coincidir en:

- Estado general diagnóstico no adoptivo.
- SCS Unit Hydrograph como candidato principal de referencia.
- SCS Mod. como variante ajustable.
- Snyder, Williams & Hann y Clark IUH como comparativos o referenciales.
- Masa y volumen controlados frente a la referencia física.
- Qp y Tp sujetos a revisión temporal.
- Restricciones técnicas respetadas.

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
