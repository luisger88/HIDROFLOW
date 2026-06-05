# OT-0012G — Cierre técnico seguridad hidrológica Tc sugerido

## Objetivo

Cerrar técnicamente la OT-0012, consolidando la auditoría documental y la mejora visual aplicada sobre el Tc sugerido como variable crítica de seguridad hidrológica.

## Alcance ejecutado

- OT-0012A: apertura de la auditoría de seguridad hidrológica.
- OT-0012B: auditoría del origen del Tc sugerido.
- OT-0012C: reconstrucción numérica del Tc_ref_base.
- OT-0012D: evaluación de suficiencia conservadora.
- OT-0012E: criterio documental de advertencia técnica.
- OT-0012F: visualización de advertencia técnica en IndiceHidrologico.jsx.

## Resultado técnico

El Tc sugerido es trazable internamente y se reconstruyó como Tc_final aproximado de 114.2 min, derivado de Tc_ref_base aproximado de 135.747 min y factor de ajuste 0.8415.

El valor cae dentro del rango competente definido en OT-0011, pero se ubica cerca del borde inferior. Por seguridad hidrológica, no debe presentarse como valor único robusto sin advertencia técnica.

## Cambio aplicado

Se incorporó una advertencia visual informativa en IndiceHidrologico.jsx cuando el Tc sugerido se encuentra cerca del borde inferior relativo del rango competente.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificó tcSelector.js.
- No se modificó tcAgent.js.
- No se cambiaron fórmulas Tc.
- No se cambió Tc_final.
- No se cambiaron rangos.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Build

Build aprobado en OT-0012F. La advertencia de chunk size de Rollup se considera no bloqueante.

## Commits principales

- f02c387 docs(tc): abre OT-0012 seguridad hidrológica Tc sugerido
- afa6d1d docs(tc): audita origen del Tc sugerido
- 09c12f7 docs(tc): reconstruye Tc ref base y contraste competente
- 041e60f docs(tc): evalua suficiencia conservadora del Tc sugerido
- b048746 docs(tc): define advertencia tecnica para Tc sugerido
- da06012 feat(tc): muestra advertencia tecnica para Tc sugerido

## Dictamen de cierre

OT-0012 cumple su tesis: el Tc sugerido fue tratado como variable crítica de seguridad hidrológica y no solo como insumo de cálculo de caudal.

La intervención final fue de bajo costo arquitectónico: primero auditoría documental, luego visualización mínima sin alterar el motor hidrológico.

## Recomendación futura

Abrir una OT posterior para análisis de sensibilidad hidrológica explícita con escenarios Tc rápido, Tc sugerido y Tc lento/volumétrico.

## Estado

OT-0012 lista para PR.
