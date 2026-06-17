# OT-0198A — Selección prudente de bloque representacional integrado alternativo

## Objetivo

Seleccionar un bloque representacional alternativo que sí esté integrado dentro de `textoExpediente`, después de cerrar la decisión sobre el helper `Sello técnico auxiliar` como auxiliar no operativo.

## Antecedente

OT-0195 seleccionó `Sello técnico auxiliar` como candidato preliminar.

OT-0196 auditó su trazabilidad y encontró que el helper existe, pero no está integrado dentro de `textoExpediente`.

OT-0197 decidió conservar `construirLineasSelloTecnicoAuxiliarExpediente(...)` como helper auxiliar no operativo y no avanzar a validación aislada operativa ni comparación controlada.

## Alcance

Esta OT es exclusivamente documental y de decisión.

No implementa helper.

No integra helper.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

No modifica botón ni portapapeles.

## Criterios de selección

El siguiente bloque candidato debe cumplir preferiblemente:

- estar integrado dentro de `textoExpediente`;
- tener ruta operativa auditable;
- ser principalmente representacional;
- tener baja dependencia de Q-5 operativo;
- tener baja dependencia del Método Racional;
- tener baja dependencia de diagnóstico Q(t);
- no requerir modificación del motor hidrológico;
- permitir auditoría/trazabilidad documental;
- permitir validación aislada posterior si ya existe helper;
- permitir comparación controlada contra ruta operativa.

## Bloques no recomendados todavía

No se recomienda avanzar todavía sobre:

- bloques Q-5 operativos complejos;
- bloques Método Racional;
- bloques Q(t) / hidrogramas;
- bloques de diagnóstico temporal;
- bloques de volumen o masa si dependen de lluvia efectiva, área o resultados hidrológicos sensibles;
- bloques que dependan directamente del motor hidrológico;
- bloques que modifiquen botón, portapapeles o flujo de copiado.

## Candidatos preliminares

| Candidato | Riesgo | Motivo | Decisión preliminar |
|---|---|---|---|
| Escenario Q-Tr activo | Medio | Puede estar integrado y ser representacional, pero conecta con resultados de caudal | Candidato posible con auditoría previa estricta |
| Resumen de restricciones o advertencias técnicas | Bajo/medio | Puede ser textual/documental si ya está integrado, pero requiere confirmar ruta real | Candidato preferente si la auditoría confirma integración |
| Volumen de referencia | Medio/alto | Vinculado a lluvia efectiva, área y masa | No recomendado sin auditoría reforzada |
| Tiempo de concentración y roles Tc | Alto | Técnicamente sensible y con implicaciones hidrológicas | No recomendado todavía |
| Método Racional | Alto | Contraste técnico independiente | No recomendado todavía |
| Q(t) / hidrogramas | Alto | Dependencia directa de series, Qp, Tp y motor | No recomendado todavía |

## Candidato recomendado

El candidato recomendado es `Resumen de restricciones o advertencias técnicas`, siempre que la auditoría confirme que ya está integrado dentro de `textoExpediente` y que su contenido es principalmente textual/documental.

## Justificación

Este candidato es prudente porque:

- puede tener bajo coste si ya existe ruta operativa;
- puede ser representacional antes que computacional;
- puede fortalecer el expediente sin entrar en Q-5, Método Racional o Q(t);
- permite detectar residuos textuales o rutas manuales antes de tocar bloques técnicos sensibles.

## Decisión

No se sustituye ningún bloque en esta OT.

No se implementa ni modifica helper.

La decisión prudente es abrir después una auditoría/trazabilidad del bloque `Resumen de restricciones o advertencias técnicas` para confirmar si existe ruta operativa integrada.

## Próxima OT recomendada

`OT-0199 — Auditoría/trazabilidad bloque Restricciones o advertencias técnicas`
