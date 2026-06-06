# OT-0019A — Apertura auditoría magnitudes Qp–Tp–Volumen en Q-5

## Objetivo

Auditar las magnitudes Qp, Tp y Volumen mostradas en el bloque Q-5 del Comparador Hidrológico Multi-Método.

## Problema observado

El bloque Q-5 muestra valores hidrológicamente sensibles de Qp, Tp y Volumen. Algunos caudales y volúmenes son muy altos y requieren control de magnitud antes de cualquier lectura adoptiva.

## Tesis

Qp, Tp y Volumen no deben interpretarse como resultados adoptivos solo porque el comparador los muestra. Deben marcarse como resultados sujetos a auditoría de magnitud, unidades e integración.

## Alcance inicial

- Auditar visualmente los valores Qp, Tp y Volumen del bloque Q-5.
- Identificar si existe advertencia de no adopción suficiente.
- Preparar una alerta visual mínima de control de magnitud si aplica.
- No recalcular hidrogramas.
- No modificar motor hidrológico.

## Restricciones

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
