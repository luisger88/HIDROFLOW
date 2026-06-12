# OT-0067 — Cierre técnico de coherencia hidrológica Tc–Qp–Tp–Volumen

Fecha: 2026-06-11 22:40:47

## Estado base

- Rama de cierre: main.
- Main base posterior a OT-0066: PR #97 fusionado.
- OT-0067 se trabajó directamente sobre main durante estabilización crítica.
- Build Vite aprobado después de la corrección funcional.
- Working tree previo al cierre documental: limpio.

## Objetivo de OT-0067

Introducir una evaluación explícita de coherencia hidrológica Tc–Qp–Tp–Volumen dentro del Comparador Hidrológico Multi-Método, diferenciando resultados numéricamente válidos de resultados físicamente representativos.

## Hallazgo técnico crítico

Se confirmó un desacople estructural entre tiempo de concentración, tiempo al pico, caudal pico y forma del hidrograma para métodos que concentran el volumen demasiado rápido.

Caso crítico observado:

- Método: Williams & Hann.
- Qp observado en el comparador: aproximadamente 518.09 m³/s.
- Tp observado: 20 min.
- Tc operativo de hidrogramas observado: aproximadamente 231.5 min.
- Lectura: el volumen puede conservarse, pero la respuesta temporal no es físicamente representativa para adopción técnica directa.

## Criterio técnico aplicado

La coherencia hidrológica no se evalúa solamente por conservación de volumen. También debe considerar forma temporal, relación Tc/Tp, magnitud de Qp y plausibilidad física del hidrograma.

Criterio incorporado:

