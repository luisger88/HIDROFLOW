# OT-0039A — Apertura Método Racional en expediente hidrológico mínimo

## Objetivo

Abrir el frente para integrar el Método Racional como contraste global independiente dentro del expediente hidrológico mínimo de cuenca activa.

## Problema

OT-0038 dejó coherentes las salidas reproducibles Q-5 y expediente, e incorporó la mención del Método Racional como contraste global independiente.

Sin embargo, el expediente todavía no contiene una sección propia del Método Racional con datos o lectura técnica mínima.

## Tesis

El expediente hidrológico mínimo debe distinguir claramente entre:

- Q-5 como bloque de hidrogramas auditados.
- Método Racional como contraste global independiente de caudal pico.
- Roles Tc usados en cada ruta.

## Alcance inicial

- Auditar datos disponibles del Método Racional.
- Identificar si existe tabla por periodo de retorno.
- Identificar campos Q, I, P, C, Tc y Tr disponibles.
- Preparar una sección mínima para el expediente copiable.
- No modificar el motor.
- No recalcular resultados.
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
