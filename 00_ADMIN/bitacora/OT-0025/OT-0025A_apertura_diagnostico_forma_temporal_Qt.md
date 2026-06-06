# OT-0025A — Apertura diagnóstico forma temporal Q(t)

## Objetivo

Abrir el diagnóstico analítico de la forma temporal de los hidrogramas Q(t) después de la corrección de conservación de masa aplicada en OT-0022.

## Problema

La conservación de masa ya fue corregida y los volúmenes Q-5 se encuentran en escala física razonable. Sin embargo, persisten alertas Tc/Tp y diferencias importantes en Qp y Tp entre métodos.

## Tesis

Una vez controlado el volumen, la credibilidad de Q(t) depende de la forma temporal del hidrograma: tiempo al pico, concentración del volumen, ancho efectivo y relación entre Qp, Tp, Volumen y Tc.

## Alcance inicial

- Auditar cómo se obtiene Qp.
- Auditar cómo se obtiene Tp.
- Auditar la relación Tp/Tc.
- Auditar la relación Qp/Volumen.
- Identificar si los picos son producto de hidrogramas demasiado estrechos.
- No modificar el motor en esta fase.

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
