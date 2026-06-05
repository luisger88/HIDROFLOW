# OT-0014C — Auditoría origen de params.tcMedMin

## Objetivo

Auditar dónde se asigna params.tcMedMin y cómo influye en el Tc mostrado por los módulos Hidrogramas e Hietogramas frente al estado global tcAgent.

## Evidencia auditada

En HidroFlow.jsx se identificó que ModParams persiste un valor tcMedMin dentro de params.

El bloque auditado indica:

tcMedMin = tcMed * 60

y luego actualiza params mediante setParams cuando params.tcMedMin difiere del valor calculado.

El comentario del código indica explícitamente:

Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas).

## Hallazgo

params.tcMedMin es una persistencia interna creada desde ModParams para compartir un Tc medio con otros módulos.

ModHidrogramas usa params.tcMedMin como prioridad antes de usar Tc_sugerido_min:

tc_min = usarOverrideTc ? Tc_override_min : +(params?.tcMedMin ?? Tc_sugerido_min)

Por tanto, el Tc visible en Hidrogramas puede provenir de params.tcMedMin y no del Tc_final publicado por el Comparador mediante tcAgent.

## Relación con la evidencia visual

Esto explica que Hidrogramas pueda mostrar Tc = 231.5 min con advertencia, mientras el Índice Hidrológico lateral aparece vacío si tcAgent no ha sido alimentado por el Comparador.

También explica que el Comparador pueda mostrar Tc sugerido = 114.2 min, porque ese valor proviene de seleccionarTc y del flujo tcAgent, no de params.tcMedMin.

## Riesgo técnico

Existen al menos dos rutas activas de Tc:

1. Ruta params.tcMedMin usada por Hidrogramas e Hietogramas.
2. Ruta Tc_final publicada por ComparadorMultiMetodo hacia tcAgent.

Si ambas rutas no se concilian, el usuario puede observar valores Tc divergentes en distintas vistas.

## Dictamen

No se recomienda modificar todavía el cálculo de Tc ni reemplazar params.tcMedMin.

La acción correcta es diseñar un adaptador mínimo que publique un estado Tc global coherente para el Índice Hidrológico, sin duplicar fórmulas ni alterar el motor.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas Tc.
- No cambiar Tc_final.
- No cambiar params.tcMedMin.
- No introducir setTimeout.
- No introducir console.log permanentes.
- No duplicar lógica hidrológica.

## Siguiente fase

Auditar la estructura actual de tcAgent y definir si puede recibir un estado base desde HidroFlow.jsx sin romper el flujo del Comparador.

## Estado

Auditoría documental. Sin cambios funcionales.
