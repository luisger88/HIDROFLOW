# OT-0012A — Apertura: Auditoría de seguridad hidrológica del Tc sugerido

## Nombre de la OT

OT-0012 — Auditoría de seguridad hidrológica del Tc sugerido

## Estado de entrada

- Rama de trabajo: ot-0012-seguridad-hidrologica-tc-sugerido
- Rama base: main
- OT-0011 fusionada a main mediante PR #14.
- Merge commit OT-0011: 88223c7.
- Build en main aprobado.
- Working tree limpio antes de iniciar OT-0012.

## Tesis Senior

El Tc sugerido no debe evaluarse únicamente como insumo para calcular caudal.

Debe evaluarse como una variable crítica de seguridad hidrológica para representar la respuesta rápida de la cuenca ante eventos de creciente súbita.

## Contexto técnico

Después de OT-0011, HidroFlow distingue explícitamente:

- Tc sugerido: 114,2 min
- Métodos válidos: 6
- Rango bruto Tc: 11,2–231,5 min
- Rango competente Tc: 105,1–231,5 min

Esta separación permite iniciar una auditoría más profunda: verificar si el Tc sugerido es seguro para análisis de creciente súbita y no solo coherente con una selección estadística o computacional.

## Pregunta central

¿El Tc sugerido de 114,2 min es hidrológicamente seguro y defendible para representar la respuesta crítica de La Iguaná PC_80 ante un evento de creciente súbita?

## Preguntas técnicas derivadas

1. De dónde sale exactamente el Tc sugerido de 114,2 min.
2. Qué regla aplica seleccionarTc para definir Tc_final.
3. Si Tc_final usa todos los métodos, solo métodos competentes o una regla mixta.
4. Si Tc sugerido se ubica dentro del rango competente Tc.
5. Si Tc sugerido está cerca del límite inferior competente o si suaviza la respuesta.
6. Qué implicación tiene adoptar un Tc mayor o menor sobre intensidad IDF, Qp, Tp y forma del hidrograma.
7. Si para creciente súbita debe considerarse un Tc crítico o una banda de seguridad.

## Enfoque específico: creciente súbita

Para creciente súbita, el Tc no representa solamente un tiempo de cálculo.

El Tc condiciona:

- intensidad de lluvia crítica
- tiempo de concentración de escorrentía
- sincronización de aportes
- tiempo al pico
- forma del hidrograma
- caudal pico
- tiempo disponible de reacción
- lectura operativa de amenaza

Un Tc demasiado alto puede suavizar el hidrograma, reducir la intensidad crítica y subestimar condiciones rápidas de respuesta.

Un Tc demasiado bajo puede sobreestimar la respuesta si proviene de métodos no competentes o fuera de escala.

Por tanto, la auditoría debe buscar un criterio de seguridad defendible, no simplemente el valor más bajo ni el promedio más cómodo.

## Regla de bajo costo arquitectónico

OT-0012 inicia sin cambios funcionales.

Queda prohibido en la fase de apertura:

- modificar hidroEngine.js
- modificar tcSelector.js
- modificar tcAgent.js
- modificar fórmulas Tc
- modificar Tc_final
- modificar mapTcResultados
- cambiar rangos
- introducir constantes manuales
- introducir setTimeout
- introducir console.log permanentes

## Archivos candidatos para auditoría posterior

- 01_APP/HIDROFLOW/src/services/tcSelector.js
- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
- 01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
- 01_APP/HIDROFLOW/src/services/tc/derivarRangoCompetenteTc.js
- 01_APP/HIDROFLOW/src/data/matrizCompetenciaComparador.js
- 01_APP/HIDROFLOW/src/data/metodosComparadorCatalogo.js

## Producto esperado de OT-0012

Un dictamen técnico que indique si el Tc sugerido:

- está dentro del rango competente
- es suficientemente conservador para creciente súbita
- requiere análisis de sensibilidad
- debe mantenerse como Tc sugerido
- debe acompañarse de advertencia técnica
- o debe contrastarse con un Tc crítico de seguridad

## Estado

Documento de apertura. Sin cambios funcionales aplicados.
