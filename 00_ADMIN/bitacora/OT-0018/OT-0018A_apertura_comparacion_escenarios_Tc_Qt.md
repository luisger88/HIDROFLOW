# OT-0018A — Apertura comparación controlada de escenarios Tc para Q(t)

## Objetivo

Abrir el frente de comparación controlada de escenarios Tc para Q(t), preparando una lectura explícita de escenarios sin alterar el cálculo operativo actual de Hidrogramas.

## Problema

HidroFlow ya muestra rutas Tc diferenciadas:

- Tc operativo Q(t).
- Tc global del Índice Hidrológico.
- Tc especializado del Comparador.

Actualmente estas rutas se visualizan, pero todavía no existe una estructura comparativa formal para analizar Qp, Tp, Volumen y estado por escenario.

## Tesis

La comparación de escenarios debe ser explícita, trazable y no invasiva.

No se debe forzar silenciosamente un Tc sobre otro. Cada escenario debe conservar fuente, valor y estado.

## Alcance inicial

- Diseñar una tabla visual mínima de escenarios Tc.
- Mostrar escenario operativo Q(t).
- Mostrar escenario global Índice.
- Reservar escenario Comparador como pendiente si no está disponible en Hidrogramas.
- No recalcular hidrogramas en esta fase.
- No modificar hidroEngine.js.

## Restricciones

- No modificar fórmulas hidrológicas.
- No forzar Tc global sobre Hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
