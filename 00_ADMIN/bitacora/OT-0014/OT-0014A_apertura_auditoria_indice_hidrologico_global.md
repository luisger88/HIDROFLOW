# OT-0014A — Apertura auditoría Índice Hidrológico global

## Objetivo

Abrir la auditoría para despertar el Índice Hidrológico global fuera del Comparador Multi-Método, especialmente durante la navegación por el módulo Hidrogramas.

## Evidencia visual

En el módulo Hidrogramas se observa Tc: 231.5 min con advertencia, mientras el Índice Hidrológico lateral muestra Tc sugerido, métodos válidos, rango bruto Tc y rango competente Tc sin datos.

En el Comparador Multi-Método, el Índice Hidrológico sí muestra Tc sugerido, métodos válidos, rango bruto Tc y rango competente Tc, lo que indica que la publicación reactiva funciona cuando el Comparador alimenta el agente Tc.

## Auditoría inicial

En HidroFlow.jsx se identificó que el módulo Hidrogramas muestra Tc mediante tc_min.toFixed(1) y qaStatus.tcWarning.

También se identificó que HidroFlow.jsx calcula Tc en varios puntos mediante calcTc(params).

La búsqueda de setTcState, getTcState y subscribeTc muestra que el agente Tc es consumido por IndiceHidrologico.jsx y publicado principalmente desde ComparadorMultiMetodo.jsx.

## Hallazgo

El Índice Hidrológico depende del estado publicado en tcAgent. Si el Comparador no se ha montado o no ha publicado estado, el Índice puede permanecer sin Tc aunque otros módulos de HidroFlow ya calculen o muestren Tc.

## Hipótesis técnica

El estado Tc global no está siendo alimentado desde HidroFlow.jsx como fuente base común. Actualmente el Comparador actúa como publicador principal del estado Tc, lo que limita el despertar del Índice Hidrológico en módulos como Hidrogramas.

## Restricciones

- No modificar hidroEngine.js sin auditoría previa.
- No modificar fórmulas Tc.
- No cambiar Tc_final.
- No cambiar rangos.
- No introducir setTimeout.
- No introducir console.log permanentes.
- No duplicar lógica hidrológica.

## Siguiente fase

Auditar el bloque de HidroFlow.jsx donde se calcula Tc para Hidrogramas y el bloque donde se arma el contextoComparador, para decidir si conviene publicar un estado Tc base desde HidroFlow.jsx o crear un adaptador externo mínimo.

## Estado

Apertura y auditoría inicial. Sin cambios funcionales.
