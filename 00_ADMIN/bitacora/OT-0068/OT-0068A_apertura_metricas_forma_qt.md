# OT-0068A — Apertura y métricas mínimas de coherencia física de la forma Q(t)

Fecha: 2026-06-12 17:31:23

## Estado base

- Rama: ot-0068-coherencia-fisica-forma-qt.
- Rama creada desde main limpio posterior al cierre documental de OT-0067.
- OT-0067 dejó incorporada la clasificación de coherencia hidrológica Tc–Qp–Tp–Volumen.
- Working tree inicial limpio.

## Objetivo

Abrir la auditoría de coherencia física de la forma temporal Q(t), evaluando cómo ocurre la respuesta hidrológica en el tiempo y no solamente el valor de Qp, Tp o el volumen total.

## Tesis técnica

Un hidrograma puede conservar masa y aun así ser físicamente no representativo si concentra el caudal en una ventana temporal incompatible con el tiempo de concentración, la longitud hidráulica, la pendiente longitudinal, la continuidad del cauce y la respuesta geomorfológica de la cuenca.

Por tanto, OT-0068 evalúa la forma Q(t) como condición física de aceptabilidad, no como ajuste cosmético ni como simple comparación gráfica.

## Materia prima geomorfológica asegurada

La evaluación de la forma Q(t) debe reconocer que la materia prima del hidrograma proviene del módulo geomorfológico y de la cuenca validada. En particular:

- Cuenca definida.
- Red hídrica validada.
- Punto de control PC_80.
- Área de cuenca.
- Longitud hidráulica efectiva.
- Eje principal continuo.
- Perfil longitudinal.
- Desnivel cabecera–salida.
- Pendiente de cauce principal.
- Coherencia geomorfológica de la respuesta temporal.

## Métricas mínimas propuestas

Las métricas se formulan como temporales o adimensionales para evitar dependencia de unidades absolutas y permitir comparación entre métodos.

### 1. Duración efectiva De

Tiempo durante el cual Q(t) permanece por encima de un umbral relativo del pico, por ejemplo 5% o 10% de Qp.

Lectura técnica: una De demasiado corta frente al Tc sugiere hidrograma tipo espiga.

### 2. Ancho a media altura W50

Ancho temporal del hidrograma cuando Q(t) es mayor o igual al 50% de Qp.

Indicador derivado: W50/Tp.

Lectura técnica: W50/Tp muy bajo indica concentración excesiva alrededor del pico.

### 3. Ancho a cuarto de altura W25

Ancho temporal del hidrograma cuando Q(t) es mayor o igual al 25% de Qp.

Indicador derivado: W25/Tp.

Lectura técnica: permite distinguir hidrogramas difusos de hidrogramas extremadamente agudos.

### 4. Relación Tp/Tc

Relación entre tiempo al pico del hidrograma y tiempo de concentración operativo o global disponible.

Lectura técnica: valores demasiado bajos indican respuesta antes de que la cuenca pueda concentrar físicamente el flujo.

### 5. Asimetría subida/recesión

Relación entre la duración de subida hasta Qp y la duración de recesión posterior al pico.

Lectura técnica: una subida extremadamente rápida con recesión corta puede indicar forma no representativa.

### 6. Pendiente relativa de subida

Tasa relativa de incremento desde un umbral bajo hasta Qp, expresada respecto al tiempo disponible de subida.

Lectura técnica: una pendiente de subida excesiva es señal de concentración artificial del volumen.

### 7. Pendiente relativa de recesión

Tasa relativa de descenso desde Qp hacia un umbral bajo posterior.

Lectura técnica: recesión extremadamente abrupta puede evidenciar hidrograma espiga o forma no conservadora en tiempo.

## Clasificación inicial esperada

- SCS: candidato coherente principal.
- Snyder: candidato coherente o alterno, sujeto a métricas.
- Clark IUH: referencial/difusivo, sujeto a métricas.
- Williams & Hann: candidato crítico por forma tipo espiga y Tp corto frente a Tc.

## Restricciones de OT-0068A

- No modificar hidroEngine.js.
- No recalcular Q-Tr.
- No recalcular Q-5.
- No recalcular Método Racional.
- No alterar Qp, Tp, Volumen ni Q(t).
- No generar PDF, Word ni mapas.
- No usar SIATA para forzar caudales.

## Criterio de salida

OT-0068A queda completa cuando exista una apertura documentada de métricas mínimas para evaluar la coherencia física de la forma Q(t), reconociendo la dependencia geomorfológica de la materia prima del hidrograma.
