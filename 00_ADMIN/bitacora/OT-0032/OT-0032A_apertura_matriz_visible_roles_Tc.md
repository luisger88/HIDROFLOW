# OT-0032A — Apertura matriz visible de roles Tc

## Objetivo

Abrir el frente de matriz visible de roles Tc, traduciendo la clasificación conceptual de OT-0031 a una lectura práctica dentro de HidroFlow.

## Problema

OT-0031 clasificó conceptualmente las rutas Tc, pero esa clasificación todavía no está visible para el usuario dentro de la interfaz.

## Tesis

HidroFlow debe mostrar explícitamente que no todos los tiempos hidrológicos representan el mismo concepto.

La interfaz debe diferenciar:

- Tc global del Índice.
- Tc operativo Q(t).
- Tc especializado del Comparador.
- Duración de evento de 3 h.
- Lag SCS o forma temporal.
- Tc de métodos alternativos.

## Alcance

- Agregar una matriz visual compacta de roles Tc.
- No modificar cálculos.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No modificar motor hidrológico.

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
