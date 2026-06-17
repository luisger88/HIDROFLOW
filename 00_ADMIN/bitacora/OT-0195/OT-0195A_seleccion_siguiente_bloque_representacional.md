# OT-0195A — Selección prudente del siguiente bloque representacional candidato

## Objetivo

Seleccionar de forma prudente el siguiente bloque representacional candidato del expediente hidrológico mínimo después del cierre del ciclo `## 2. Parámetros hidrológicos base`.

## Antecedente

OT-0189 cerró el ciclo del bloque `## 1. Identificación`.

OT-0194 cerró el ciclo del bloque `## 2. Parámetros hidrológicos base` como bloque delegado por helper, validado en aislamiento y comparado frente a su ruta operativa.

## Alcance

Esta OT es exclusivamente documental y de decisión.

No implementa helper.

No modifica código operativo.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

## Criterios de selección

El siguiente bloque candidato debe cumplir preferiblemente:

- bajo riesgo técnico;
- contenido principalmente representacional;
- baja dependencia de cálculos sensibles;
- baja dependencia de Q-5 operativo;
- baja dependencia del Método Racional;
- baja dependencia de diagnóstico Q(t);
- baja dependencia del motor hidrológico;
- posibilidad de auditoría/trazabilidad sin tocar código;
- posibilidad de validación aislada posterior;
- posibilidad de comparación controlada contra ruta operativa.

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
| Sello técnico auxiliar | Bajo | Bloque representacional/documental, no recalcula resultados y ya ha sido tratado parcialmente en ciclos previos | Candidato preferente con auditoría previa |
| Escenario Q-Tr activo | Medio | Representacional, pero conecta con resultados de caudal | Candidato posterior, no inmediato |
| Volumen de referencia | Medio/alto | Vinculado a lluvia efectiva, área y masa | No recomendado sin auditoría reforzada |
| Tiempo de concentración y roles Tc | Alto | Técnicamente sensible y con implicaciones hidrológicas | No recomendado todavía |
| Método Racional | Alto | Contraste técnico independiente | No recomendado todavía |
| Q(t) / hidrogramas | Alto | Dependencia directa de series, Qp, Tp y motor | No recomendado todavía |

## Candidato recomendado

El candidato recomendado es el bloque `Sello técnico auxiliar`, siempre que la auditoría confirme su ruta real de composición, su bajo acoplamiento técnico y su carácter documental/representacional.

## Justificación

El bloque `Sello técnico auxiliar` parece el candidato más prudente porque:

- es representacional/documental;
- no debería recalcular resultados;
- no depende directamente de Q-5 operativo;
- no depende directamente del Método Racional;
- no depende de diagnóstico Q(t);
- puede auditarse por trazabilidad textual;
- permite continuar fortaleciendo el expediente sin entrar aún en bloques hidrológicamente sensibles.

## Decisión

No se sustituye ningún bloque en esta OT.

No se implementa ni modifica helper.

La decisión prudente es abrir después una auditoría/trazabilidad del bloque `Sello técnico auxiliar` para confirmar su ruta real de composición.

## Próxima OT recomendada

`OT-0196 — Auditoría/trazabilidad bloque Sello técnico auxiliar`
