# OT-0025B — Diagnóstico forma temporal Q(t) post masa

## Objetivo

Documentar el diagnóstico analítico inicial de la forma temporal de los hidrogramas Q(t) después de la corrección de conservación de masa.

## Evidencia auditada

En ComparadorMultiMetodo.jsx se confirmó que Qp, Tp y Volumen se leen desde resultadoQ.

También se confirmó que la alerta Tc/Tp se calcula mediante la relación:

tpRel = resultadoQ.Tp / Tc_final

La alerta se activa cuando:

tpRel < 0.5 o tpRel > 1.5

## Lectura técnica

Después de OT-0022, los volúmenes Q-5 quedaron alineados con la referencia física de volumen esperado.

Por tanto, las alertas Tc/Tp persistentes ya no deben interpretarse como falla de masa, sino como advertencia de forma temporal del hidrograma.

## Diagnóstico preliminar

La alerta Tc/Tp post-masa indica que el tiempo al pico de algunos métodos no está conciliado con el Tc de referencia usado por el Comparador.

Esto puede deberse a:

- forma propia del hidrograma unitario;
- ancho temporal del método;
- posición del pico dentro de Q(t);
- diferencia entre Tc operativo del método y Tc_final del Comparador;
- carácter comparativo o referencial del método.

## Decisión técnica

No se modifica el motor en esta fase.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

La forma temporal queda diagnosticada como pendiente de evaluación por método antes de cualquier adopción técnica.

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).

## Dictamen

OT-0025B separa claramente dos problemas:

- La masa ya fue corregida en OT-0022.
- La forma temporal Q(t), especialmente Tp frente a Tc_final, sigue pendiente de revisión metodológica.

## Estado

Diagnóstico documental. Sin cambios funcionales.
