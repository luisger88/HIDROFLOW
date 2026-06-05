# OT-0013H — Cierre técnico auditoría Tc–Tp–Qp–Volumen

## Objetivo

Cerrar técnicamente la OT-0013, consolidando la auditoría de coherencia entre Tc, Tp, Qp y Volumen en el Comparador Hidrológico Multi-Método.

## Alcance ejecutado

- OT-0013A: apertura de auditoría Tc–Tp–Qp–Volumen.
- OT-0013B: auditoría del origen de Qp, Tp y Volumen en ComparadorMultiMetodo.jsx.
- OT-0013C: auditoría de estructura real de hidrogramas en módulos vivos.
- OT-0013D: trazabilidad de contextoBase.hidrogramas hacia ComparadorMultiMetodo.
- OT-0013E: auditoría de coherencia Tc vs Tp.
- OT-0013F: criterio documental de alerta Tc vs Tp.
- OT-0013G: visualización mínima de alerta Tc vs Tp en bloque Q.

## Hallazgos consolidados

HidroFlow.jsx normaliza los hidrogramas antes de entregarlos al comparador.

La estructura entregada al comparador contiene metodo, Qp, Tp, volumen y puntos.

ComparadorMultiMetodo.jsx está alineado con esa estructura normalizada y no requiere modificación del adaptador para leer campos internos como Qp_m3s, Tp_idx o Vol_m3.

La relación Tc vs Tp no se evaluaba visualmente antes de esta OT.

Se incorporó una alerta visual mínima en la celda Tp del bloque Q-5 cuando Tp_rel = Tp / Tc_final queda fuera del rango inicialmente razonable.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se recalcularon hidrogramas.
- No se modificó Tc_final.
- No se modificó Qp.
- No se modificó Tp.
- No se modificó volumen.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Build

Build aprobado con npm run build. La advertencia de chunk size de Rollup/Vite se considera no bloqueante.

## Commits principales

- af307a0 docs(hidrogramas): abre auditoria Tc Tp Qp Volumen
- a95ccdb docs(hidrogramas): audita origen Qp Tp Volumen
- 2e9499b docs(hidrogramas): audita estructura real de hidrogramas
- c5b00b3 docs(hidrogramas): traza contexto de hidrogramas al comparador
- 7071e23 docs(hidrogramas): audita coherencia Tc vs Tp
- fc03331 docs(hidrogramas): define criterio alerta Tc vs Tp
- aae6263 feat(hidrogramas): muestra alerta Tc vs Tp en bloque Q

## Dictamen de cierre

OT-0013 cumple su objetivo: auditar la coherencia Tc–Tp–Qp–Volumen y agregar una alerta visual mínima para la relación Tc vs Tp sin alterar el motor hidrológico.

## Estado

OT-0013 lista para PR.
