# OT-0014D — Auditoría tcAgent como estado global Tc

## Objetivo

Auditar la estructura actual de tcAgent.js para determinar si puede actuar como punto de estado global del Tiempo de Concentración para despertar el Índice Hidrológico fuera del Comparador Multi-Método.

## Evidencia auditada

tcAgent.js define un estado inicial mínimo:

Tc_final: null
metodosTc: null
contextoTc: null

La función setTcState(data) actualiza el estado mediante merge abierto:

TcState = { ...TcState, ...data }

Luego notifica a los suscriptores mediante listeners.forEach(fn => fn(TcState)).

IndiceHidrologico.jsx consume el estado mediante getTcState y subscribeTc.

ComparadorMultiMetodo.jsx publica estado mediante setTcState.

## Hallazgo

tcAgent es un agente reactivo simple y flexible.

Aunque el estado inicial solo declara Tc_final, metodosTc y contextoTc, el merge abierto permite transportar campos adicionales como rangoCompetenteTc, rangoBrutoTc, fuente o modoPublicacion.

Sin embargo, tcAgent no implementa reglas de prioridad, fuente, versión, timestamp ni protección contra degradación del estado.

## Riesgo técnico

Si HidroFlow.jsx empieza a publicar un estado Tc base sin reglas, podría sobrescribir o degradar el estado más específico publicado por ComparadorMultiMetodo.jsx.

Esto podría producir inconsistencias visuales si un publicador base reemplaza un estado enriquecido que ya contiene Tc_final, metodosTcCompetentes o rangoCompetenteTc.

## Dictamen

tcAgent puede servir como punto global para despertar el Índice Hidrológico, pero la publicación desde HidroFlow.jsx debe ser mínima y controlada.

No se recomienda modificar tcAgent todavía.

La siguiente fase debe diseñar una regla de publicación segura desde HidroFlow.jsx, evitando duplicar lógica hidrológica y evitando pisar el estado especializado del Comparador.

## Criterio preliminar recomendado

HidroFlow.jsx podría publicar un estado base del Tc solo cuando el agente esté vacío o incompleto.

El Comparador Multi-Método debe seguir siendo la fuente especializada para Tc_final, rangos competentes y evaluación comparativa.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas Tc.
- No cambiar Tc_final.
- No cambiar params.tcMedMin.
- No introducir setTimeout.
- No introducir console.log permanentes.
- No duplicar lógica hidrológica.

## Siguiente fase

Diseñar un adaptador mínimo de publicación base para despertar el Índice Hidrológico sin romper el flujo del Comparador.

## Estado

Auditoría documental. Sin cambios funcionales.
