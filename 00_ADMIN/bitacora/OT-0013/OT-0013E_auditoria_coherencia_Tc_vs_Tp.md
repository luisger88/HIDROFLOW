# OT-0013E — Auditoría de coherencia Tc vs Tp

## Objetivo

Auditar si el Comparador Hidrológico Multi-Método dispone de una relación explícita entre Tc_final y los Tp de los hidrogramas normalizados.

## Evidencia auditada

En ComparadorMultiMetodo.jsx se identificó que Tc_final se calcula mediante seleccionarTc("hidrograma", metodosTc, contextoTc).

También se identificó que los resultados Q se obtienen mediante obtenerResultadoQMetodo(metodo), que devuelve Qp, Tp, volumen y disponible.

La tabla Q-5 renderiza Qp en m³/s, Tp en minutos y Volumen, usando resultadoQ.Qp, resultadoQ.Tp y resultadoQ.volumen.

## Hallazgo

El comparador muestra Tc_final y muestra Tp de cada hidrograma, pero no se observó una evaluación explícita de coherencia entre Tc_final y resultadoQ.Tp.

Tampoco se observó una advertencia específica cuando un Tp normalizado resulta demasiado bajo o demasiado alto frente al Tc usado como referencia hidrológica.

## Riesgo hidrológico

La ausencia de una revisión Tc vs Tp puede permitir que se visualicen hidrogramas con tiempos al pico físicamente sensibles sin advertencia técnica.

Un caso crítico sería un Tc relativamente alto combinado con un Tp demasiado bajo, porque puede indicar una respuesta temporal no conciliada o una parametrización interna que requiere revisión.

## Dictamen

Antes de adoptar resultados Qp, Tp o Volumen, debe incorporarse una auditoría de coherencia temporal Tc vs Tp.

En esta fase no se recomienda modificar el motor ni recalcular hidrogramas. La siguiente acción debe ser definir un criterio documental de alerta Tc vs Tp y luego evaluar si amerita visualización mínima.

## Estado

Auditoría documental. Sin cambios funcionales.
