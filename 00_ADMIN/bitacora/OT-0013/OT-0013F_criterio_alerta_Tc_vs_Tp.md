# OT-0013F — Criterio de alerta Tc vs Tp

## Objetivo

Definir un criterio documental para advertir posibles incoherencias temporales entre el Tc_final usado como referencia hidrológica y los Tp normalizados de los hidrogramas del bloque Q-5.

## Base auditada

- Tc_final se calcula en ComparadorMultiMetodo.jsx mediante seleccionarTc("hidrograma", metodosTc, contextoTc).
- Los hidrogramas llegan al comparador normalizados desde HidroFlow.jsx con campos metodo, Qp, Tp, volumen y puntos.
- La tabla Q-5 muestra Tp en minutos, pero no evalúa explícitamente la relación Tp/Tc.

## Criterio propuesto

Para cada hidrograma con Tp válido y Tc_final válido, se recomienda calcular la relación:

Tp_rel = Tp / Tc_final

## Bandas preliminares de lectura

- Tp_rel < 0.25: alerta alta. El tiempo al pico es muy bajo frente al Tc.
- 0.25 <= Tp_rel < 0.50: advertencia. El hidrograma responde rápido frente al Tc.
- 0.50 <= Tp_rel <= 1.50: rango inicialmente razonable para revisión ordinaria.
- Tp_rel > 1.50: revisión. El tiempo al pico es alto frente al Tc y puede requerir explicación metodológica.

## Justificación

El criterio no adopta ni rechaza automáticamente un hidrograma. Solo clasifica la relación temporal para apoyar la auditoría hidrológica.

Un Tp demasiado bajo frente a Tc puede indicar una respuesta temporal demasiado rápida, una parametrización interna sensible, una unidad mal interpretada o una diferencia entre el tiempo al pico del hidrograma y el tiempo de concentración adoptado.

Un Tp demasiado alto frente a Tc puede indicar retardo excesivo o una parametrización que debe ser trazada antes de usar el resultado como soporte de diseño.

## Regla de implementación futura

Cualquier alerta Tc vs Tp debe ser informativa y no debe modificar Tc_final, Tp, Qp, volumen, hidrogramas, motor hidrológico ni fórmulas.

## Dictamen

Se recomienda implementar en una fase posterior una advertencia visual mínima en el bloque Q-5 cuando Tp_rel esté fuera del rango inicialmente razonable.

## Estado

Criterio documental. Sin cambios funcionales.
