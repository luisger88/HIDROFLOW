# OT-0031B — Clasificación conceptual de rutas Tc frente a GT-AS-004

## Objetivo

Clasificar conceptualmente los diferentes usos de Tc dentro de HidroFlow, para evitar mezclar tiempos de concentración, duración de evento, lag time y referencias especializadas del comparador.

## Evidencia auditada

En ComparadorMultiMetodo.jsx se identificó que Tc_final se calcula mediante seleccionarTc(""hidrograma"", metodosTc, contextoTc).

También se identificó que Q-5 usa Tc_final como referencia para:

- Tp/Tc.
- alerta Tc/Tp.
- estado temporal.
- dictamen Q-5.
- resumen ejecutivo Q-5.

## Marco GT-AS-004

La guía GT-AS-004 orienta la generación de hidrogramas mediante el hidrograma unitario sintético SCS.

También diferencia el uso de hidrogramas y volumen de almacenamiento/regulación frente al caudal pico de elementos hidráulicos, donde la duración puede asociarse al tiempo de concentración o criterio normativo aplicable.

La guía trabaja el volumen de almacenamiento/regulación con hidrogramas post y pre/natural y evento de 3 horas.

## Clasificación conceptual propuesta

### 1. Tc-IDF / caudal pico

Uso asociado a intensidad de lluvia y caudal pico para elementos hidráulicos.

No debe confundirse automáticamente con la duración total del evento de almacenamiento.

### 2. Tc-Q(t) operativo

Uso interno del módulo Hidrogramas para construir o parametrizar Q(t).

Este Tc puede diferir del Tc global del Índice o del Tc especializado del Comparador.

### 3. Lag / forma SCS

Uso temporal asociado a la forma del hidrograma unitario SCS.

No equivale necesariamente al Tc adoptivo ni a la duración total de lluvia.

### 4. Duración de evento 3 h

Uso asociado a almacenamiento/regulación y volumen acumulado.

No debe interpretarse como Tc de la cuenca.

### 5. Tc especializado del Comparador

Uso derivado de seleccionarTc(""hidrograma"") para evaluar coherencia y referencia técnica en Q-5.

### 6. Tc de métodos alternativos

Uso comparativo o referencial.

No debe desplazar automáticamente la ruta SCS principal sin justificación técnica.

## Dictamen

Los Tc altos no deben corregirse por intuición.

Primero deben ubicarse según su rol hidrológico.

Parte del ruido conceptual observado en HidroFlow proviene de usar valores Tc de rutas distintas como si fueran equivalentes.

## Decisión técnica

No se modifica el motor.

No se modifican fórmulas.

No se altera Qp, Tp, Volumen ni Q(t).

Esta OT documenta la clasificación conceptual necesaria para futuras decisiones de cálculo.

## Estado

Diagnóstico documental. Sin cambios funcionales.
