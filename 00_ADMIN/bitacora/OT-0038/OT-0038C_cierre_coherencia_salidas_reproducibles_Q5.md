# OT-0038C — Cierre coherencia entre salidas reproducibles Q-5

## Objetivo

Cerrar la OT-0038 consolidando la validación de coherencia entre las dos salidas reproducibles principales de Q-5:

- Resumen técnico Q-5.
- Expediente hidrológico mínimo.

## Resultado práctico

Se validó que ambas salidas son coherentes en sus afirmaciones técnicas principales:

- Estado general: diagnóstico no adoptivo.
- SCS Unit Hydrograph como candidato principal de referencia.
- SCS Mod. como variante ajustable.
- Snyder, Williams & Hann y Clark IUH como métodos comparativos/referenciales.
- Masa y volumen controlados frente a la referencia física.
- Qp y Tp sujetos a revisión temporal.
- Método Racional como contraste global independiente de caudal pico, no perteneciente al bloque Q-5 de hidrogramas.
- Restricciones técnicas respetadas.

## Correcciones aplicadas

Se alineó la redacción de restricciones entre el resumen técnico Q-5 y el expediente hidrológico mínimo.

También se incorporó la mención explícita del Método Racional como contraste global independiente, manteniendo la separación conceptual frente al bloque Q-5 de hidrogramas.

Se corrigió una cadena JSX partida durante la incorporación de la mención del Método Racional, recuperando build limpio.

## Validación

La comparación local cq5 confirmó:

- coherencia entre resumen técnico Q-5 y expediente mínimo;
- ausencia de undefined;
- ausencia de null;
- ausencia de NaN;
- ausencia de [object Object];
- presencia de tabla Q-5 auditada en el expediente;
- presencia de métodos principales en la tabla Q-5.

## Decisión técnica

La validación es de producto reproducible.

No se modifica el motor.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Dictamen

OT-0038 confirma que las dos salidas reproducibles principales de HidroFlow son coherentes entre sí.

El Resumen técnico Q-5 y el Expediente hidrológico mínimo dicen lo mismo, respetan restricciones, no presentan valores problemáticos e incorporan la separación conceptual del Método Racional como contraste global independiente.

## Estado

OT-0038 lista para PR.
