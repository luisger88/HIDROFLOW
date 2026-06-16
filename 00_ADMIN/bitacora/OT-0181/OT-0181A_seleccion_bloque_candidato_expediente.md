# OT-0181A — Selección prudente del siguiente bloque candidato del expediente

## Objetivo

Seleccionar de forma prudente el siguiente bloque candidato del expediente hidrológico mínimo para un eventual ciclo de delegación por helper.

## Antecedente

El ciclo del bloque `## 6. Resumen Q-5 auditado` quedó cerrado mediante auditoría, contrato, extracción, diseño, helper, validación, comparación, diagnóstico, sustitución parcial, validación post-adopción y registro consolidado.

## Alcance

Esta OT es exclusivamente documental y de decisión.

No implementa helper.

No modifica código operativo.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores.

## Criterios de selección

El siguiente bloque candidato debe cumplir preferiblemente:

- bajo riesgo técnico;
- contenido principalmente representacional;
- baja dependencia de cálculos internos sensibles;
- baja dependencia del motor hidrológico;
- baja dependencia de Q-5 operativo;
- baja dependencia del Método Racional;
- baja dependencia de diagnóstico Q(t);
- facilidad de extracción exacta;
- facilidad de comparación helper vs operativo;
- posibilidad de validación aislada sin tocar flujos de copiado.

## Bloques que no se recomiendan todavía

- Bloques con Q-5 operativo real;
- Bloques con Método Racional;
- Bloques con diagnóstico Q(t);
- Bloques que dependan de hidrogramas;
- Bloques que dependan de motor hidrológico;
- Bloques que modifiquen botón, portapapeles o flujo de copiado.

## Candidato recomendado

El candidato recomendado para el próximo ciclo es un bloque documental/identificativo o de contexto base, siempre que su extracción operativa confirme baja dependencia técnica.

## Candidatos preliminares

| Candidato | Riesgo | Motivo | Decisión preliminar |
|---|---|---|---|
| Bloque de identificación / contexto general | Bajo | Principalmente representacional | Candidato preferente |
| Bloque de parámetros base | Medio | Puede mezclar datos hidrológicos de entrada | Requiere auditoría previa |
| Bloque de tiempo de concentración | Alto | Técnicamente sensible | No recomendado todavía |
| Bloque de volumen de referencia | Medio/alto | Relacionado con masa y lluvia efectiva | No recomendado sin auditoría |
| Bloque Método Racional | Alto | Contraste técnico independiente | No recomendado todavía |
| Bloques Q(t) / hidrogramas | Alto | Dependencia directa de series y motor | No recomendado todavía |

## Decisión

No se sustituye ningún bloque en esta OT.

La decisión prudente es abrir después una auditoría/extracción del bloque de identificación o contexto general, si el estado operativo confirma que es representacional y de bajo riesgo.

## Próxima OT recomendada

`OT-0182 — Auditoría del bloque Identificación / contexto general del expediente`
