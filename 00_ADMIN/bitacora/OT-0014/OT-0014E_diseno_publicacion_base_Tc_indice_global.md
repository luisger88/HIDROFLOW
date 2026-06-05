# OT-0014E — Diseño publicación base Tc para Índice Hidrológico global

## Objetivo

Diseñar una regla mínima para que HidroFlow.jsx pueda alimentar el Índice Hidrológico global mediante tcAgent, sin romper el flujo especializado del Comparador Multi-Método.

## Base auditada

OT-0014A identificó que el Índice Hidrológico puede quedar sin Tc cuando el Comparador no ha publicado estado en tcAgent.

OT-0014B identificó que Hidrogramas muestra un Tc interno mediante tc_min, desacoplado del Tc_final del Comparador.

OT-0014C identificó que params.tcMedMin se persiste desde ModParams para ser usado por Hietogramas e Hidrogramas.

OT-0014D identificó que tcAgent permite merge abierto, pero no tiene reglas de prioridad ni protección contra degradación del estado.

## Problema

Si HidroFlow.jsx publica directamente un estado Tc base en tcAgent, podría pisar información más rica publicada por ComparadorMultiMetodo.jsx.

El Comparador publica Tc_final, metodosTc, contextoTc, metodosTcCompetentes y rangoCompetenteTc.

HidroFlow.jsx podría publicar un estado más básico basado en calcTc(params) o params.tcMedMin.

## Criterio de diseño

La publicación base desde HidroFlow.jsx solo debe despertar el Índice cuando el estado Tc esté vacío o incompleto.

No debe reemplazar un estado especializado ya publicado por el Comparador.

## Regla propuesta

Antes de publicar desde HidroFlow.jsx, consultar getTcState().

Publicar estado base solo si:

- Tc_final es null o undefined.
- metodosTc es null o no tiene métodos.
- rangoCompetenteTc no existe.

## Contenido mínimo del estado base

El estado base podría incluir:

- Tc_final: valor base documentado, preferiblemente params.tcMedMin si existe.
- metodosTc: objeto derivado desde calcTc(params), sin cambiar fórmulas.
- contextoTc: pendiente, área, CN y fuente.
- fuente: hidroflow_base.
- modoPublicacion: base_indice_global.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas Tc.
- No cambiar Tc_final especializado del Comparador.
- No cambiar params.tcMedMin.
- No duplicar lógica hidrológica.
- No introducir setTimeout.
- No introducir console.log permanentes.

## Riesgo controlado

El estado base puede despertar el Índice en Hidrogramas, pero debe ceder prioridad al Comparador cuando este publique un estado especializado.

## Dictamen

Se recomienda implementar posteriormente una publicación base mínima desde HidroFlow.jsx, condicionada a que tcAgent esté vacío o incompleto.

La implementación debe ser pequeña, auditable y reversible.

## Estado

Diseño documental. Sin cambios funcionales.
