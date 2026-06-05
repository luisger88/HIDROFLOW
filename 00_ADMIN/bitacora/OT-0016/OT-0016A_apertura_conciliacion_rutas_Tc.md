# OT-0016A — Apertura conciliación de rutas Tc

## Objetivo

Abrir la conciliación técnica de las rutas de Tiempo de Concentración visibles en HidroFlow.

## Problema observado

Actualmente coexisten varias lecturas de Tc:

- Índice Hidrológico global base: aproximadamente 113.5 min.
- Hidrogramas interno: 231.5 min con advertencia.
- Comparador especializado: aproximadamente 114.2 min.

## Tesis

HidroFlow debe explicar y conciliar estas rutas antes de avanzar a adopciones hidrológicas o conclusiones científicas.

## Alcance inicial

- Auditar la ruta Tc base publicada al Índice.
- Auditar la ruta tcMedMin usada por Hidrogramas.
- Auditar la ruta Tc_final usada por Comparador.
- Definir cuál valor es informativo, cuál es operativo y cuál es especializado.
- No modificar fórmulas en esta fase.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas Tc.
- No cambiar Tc_final.
- No cambiar params.tcMedMin.
- No cambiar hidrogramas.
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
