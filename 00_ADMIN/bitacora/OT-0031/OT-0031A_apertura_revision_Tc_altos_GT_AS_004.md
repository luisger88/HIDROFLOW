# OT-0031A — Apertura revisión Tc altos frente a GT-AS-004

## Objetivo

Abrir la revisión hidrológica de los tiempos de concentración altos y su relación con la guía GT-AS-004, para diferenciar usos metodológicos de Tc dentro de HidroFlow.

## Problema

HidroFlow muestra varias rutas Tc:

- Tc global del Índice Hidrológico.
- Tc operativo de Hidrogramas/Q(t).
- Tc especializado del Comparador.
- Tc usado en Método Racional.
- Tc asociado a métodos sintéticos alternativos.

Algunos valores altos pueden provenir de mezclar conceptos: duración de lluvia para almacenamiento/regulación, tiempo de concentración para caudal pico, lag time del hidrograma SCS y métodos alternativos de comparación.

## Marco GT-AS-004

La guía GT-AS-004 orienta el diseño de sistemas de almacenamiento y regulación de aguas lluvias.

Para hidrogramas, la guía prioriza el hidrograma unitario sintético SCS y exige justificación para metodologías alternativas.

Para almacenamiento/regulación, la guía trabaja con hidrogramas post y pre/natural y volumen acumulado asociado a evento de 3 horas.

Para caudal pico de elementos hidráulicos, la guía diferencia el cálculo con duración equivalente al tiempo de concentración o criterio normativo aplicable.

## Tesis

Los Tc altos no deben corregirse por intuición ni por comparación externa. Deben clasificarse según uso hidrológico:

- Tc de intensidad/IDF.
- Tc de generación Q(t).
- Tiempo de rezago/forma SCS.
- Duración de lluvia de almacenamiento.
- Tc de métodos alternativos.

## Alcance inicial

- Auditar dónde se usa Tc en HidroFlow.
- Separar Tc de diseño pico, Tc operativo Q(t), lag time y duración 3 h.
- Identificar si hay ruido conceptual introducido por interpretación de GT-AS-004.
- No modificar motor en esta fase.

## Restricciones

- No usar caudales externos como fundamento de corrección.
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
