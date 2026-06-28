# OT-AUTO-005

## Objetivo

Crear un comando único de validación del expediente hidrológico mínimo.

## Alcance

El comando debe ejecutar:

- HF-TestExpediente MultiTr.
- HF-TestExpedienteReporte.
- npm run build.
- Resumen final PASS/FAIL.

## Resultado esperado

Reducir la validación post-cambio del expediente a una sola instrucción operativa.

## Estado

Abierta.
## Radar arquitectónico no negociable

HidroFlow no debe evolucionar como una calculadora aislada, sino como un expediente técnico-científico automatizable, portable y defendible.

Toda variable o resultado técnico relevante del expediente deberá poder acompañarse de:

- fórmula matemática utilizada,
- definición de variables,
- unidades,
- valores aplicados,
- resultado obtenido,
- fuente computacional,
- trazabilidad dentro del flujo HidroFlow.

Frente futuro recomendado:

OT-EXP-FORM-001 — Fórmulas matemáticas trazables del expediente hidrológico.

Este frente deberá incorporar explícitamente al expediente las expresiones matemáticas que dan lugar a resultados como CN, S, Ia, Pe, IDF, Tc, Q-Tr, Qp, volumen, ratio de consistencia y Método Racional.

## Radar complementario no negociable

Además de las fórmulas matemáticas trazables, el expediente HidroFlow deberá evolucionar hacia un producto técnico-científico autoportable con soporte explícito para:

- gráficas exportables,
- mapas exportables,
- esquemas de conectividad hidrológica,
- trazabilidad espacial,
- rutas de flujo,
- red hídrica validada,
- localización de punto de control,
- evidencia visual asociada a resultados numéricos.

Estos elementos no deben tratarse como adornos visuales, sino como evidencia técnica exportable que complemente las fórmulas, variables, unidades, resultados y trazabilidad computacional.

Frentes futuros recomendados:

- OT-EXP-FORM-001 — Fórmulas matemáticas trazables del expediente hidrológico.
- OT-EXP-VIS-001 — Gráficas exportables del expediente hidrológico.
- OT-EXP-MAP-001 — Mapas y conectividad hidrológica exportable.
- OT-EXP-PORT-001 — Expediente autoportable con evidencias numéricas, gráficas, mapas y trazabilidad completa.

Criterio arquitectónico:

Todo resultado técnico relevante deberá poder responder:

1. ¿De qué fórmula proviene?
2. ¿Con qué variables se calculó?
3. ¿Con qué unidades?
4. ¿Qué valor se aplicó?
5. ¿Qué resultado generó?
6. ¿Dónde se calculó en HidroFlow?
7. ¿Qué gráfica, mapa o evidencia visual lo respalda?
8. ¿Cómo se exporta en el expediente?
