# OT-0078L — Diseño de auditoría focal de la estructura uh

Fecha de corrección documental: 2026-06-13 00:21:51

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078J cerrada en commit 1d7497f.
- OT-0078K cerrada en commit ddeeef5.
- OT-0078L tuvo una primera versión incompleta en commit 09548d3.
- Esta corrección completa el diseño documental sin cambios funcionales.

## Objetivo

Diseñar una auditoría focal sobre la estructura uh identificada aguas arriba, para determinar si representa una serie temporal de hidrograma, un hidrograma unitario normalizado, una estructura auxiliar o una forma intermedia no directamente publicable como qSeries.

## Evidencia heredada

- OT-0078J identificó evidencia en HidroFlow.jsx de construcción de arreglos temporales internos.
- Se observó una estructura tipo uh asociada a normalizarHuAM.
- Se observó retorno de estructuras con campos tp, qp y uh.
- El comparador no recibe uh como qSeries reconocible.
- El resumen estructural sigue reportando 5 candidatos sin serie temporal reconocible.

## Pregunta técnica central

¿La estructura uh contiene una serie temporal real o normalizada que pueda publicarse posteriormente como qSeries sin recalcular hidrogramas ni alterar Qpico, tPico o volTotal?

## Preguntas de auditoría

- Dónde se crea uh.
- Qué tipo de dato tiene uh.
- Si uh es arreglo.
- Si uh contiene pares tiempo-caudal.
- Si uh contiene solo ordenadas normalizadas.
- Si uh tiene dt, dtMin, índice temporal o escala temporal asociada.
- Si qp y tp se derivan de uh.
- Si volTotal se deriva de uh o de otra integración.
- Si uh corresponde a hidrograma unitario o a hidrograma ya escalado.
- Si uh puede normalizarse a qSeries sin recalcular.

## Archivos candidatos para auditoría posterior

- 01_APP/HIDROFLOW/src/HidroFlow.jsx
- 01_APP/HIDROFLOW/src/services/hidroEngine.js
- 01_APP/HIDROFLOW/src/services/hidrogramas/

## Patrones de búsqueda propuestos

- uh
- normalizarHuAM
- tp
- qp
- dt
- dtMin
- tiempo
- caudal
- hidrograma
- normalizado

## Prohibiciones

- No modificar HidroFlow.jsx en OT-0078L.
- No modificar hidroEngine.js.
- No modificar ComparadorMultiMetodo.jsx.
- No recalcular hidrogramas.
- No reconstruir Q(t) desde Qpico y tPico.
- No inventar puntos tiempo-caudal.
- No asumir que uh es qSeries sin auditoría.
- No calcular métricas morfológicas.

## Decisión técnica

OT-0078L no implementa cambios funcionales. Solo diseña la auditoría focal de la estructura uh o equivalente.

## Siguiente fase recomendada

OT-0078M — Auditoría focal en código de la estructura uh.

## Criterio de salida

OT-0078L queda completa cuando exista diseño versionado de auditoría focal de la estructura uh, sin cambios funcionales sobre la aplicación.
