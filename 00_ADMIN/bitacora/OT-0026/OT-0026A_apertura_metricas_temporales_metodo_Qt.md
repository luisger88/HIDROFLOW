# OT-0026A — Apertura métricas temporales por método Q(t)

## Objetivo

Abrir el frente de métricas temporales por método Q(t), posterior a la corrección de conservación de masa y al diagnóstico de forma temporal.

## Problema

Después de OT-0022, los volúmenes Q-5 quedaron físicamente controlados. Sin embargo, persisten diferencias importantes en Qp y Tp entre métodos, así como alertas Tc/Tp.

## Tesis

Una vez corregida la masa, la forma temporal del hidrograma debe evaluarse con métricas internas por método, sin usar caudales externos ni calibraciones ajenas.

## Métricas candidatas

- Tp/Tc: relación entre tiempo al pico y Tc de referencia.
- Duración equivalente: Volumen / Qp.
- Qp/Volumen: concentración relativa del volumen en el pico.
- Estado temporal: lectura técnica de si el método responde muy rápido, razonable o retardado.

## Alcance inicial

- Auditar si Qp, Tp, Volumen y Tc_final están disponibles simultáneamente en el comparador.
- Preparar una métrica visual mínima por método.
- No modificar el motor.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).

## Restricciones

- No usar caudales externos como fundamento de corrección.
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
