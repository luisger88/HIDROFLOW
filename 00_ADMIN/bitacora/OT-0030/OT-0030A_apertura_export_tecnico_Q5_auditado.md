# OT-0030A — Apertura export técnico Q-5 auditado

## Objetivo

Abrir el frente de export técnico Q-5 auditado, orientado a consolidar en una salida reproducible el estado técnico alcanzado por el bloque Q-5 después de las auditorías de masa, volumen, forma temporal, clasificación y dictamen por método.

## Problema

Q-5 ya contiene una lectura técnica robusta en pantalla, pero todavía no existe una estructura exportable que consolide esa información como evidencia reproducible.

## Tesis

Un resultado hidrológico defendible debe poder exportarse o consolidarse con trazabilidad mínima: qué se calculó, qué se advirtió, qué se clasificó, qué se considera no adoptivo y qué restricciones fueron respetadas.

## Alcance inicial

- Preparar una estructura técnica exportable para Q-5.
- Consolidar resumen ejecutivo Q-5.
- Consolidar referencia de volumen esperado.
- Consolidar estado general no adoptivo.
- Consolidar jerarquía metodológica.
- No modificar cálculos.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).

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
