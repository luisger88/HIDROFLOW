# OT-0190A — Selección prudente del siguiente bloque representacional candidato

## Objetivo

Seleccionar de forma prudente el siguiente bloque representacional candidato del expediente hidrológico mínimo para un eventual ciclo de auditoría, validación y posible saneamiento.

## Antecedente

El ciclo del bloque `## 1. Identificación` quedó cerrado en OT-0189 como bloque ya delegado por helper, saneado contra `[object Object]` y comparado frente a su ruta operativa.

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
- posibilidad de validación aislada;
- posibilidad de comparación controlada contra ruta operativa;
- bajo coste de saneamiento en caso de residuos textuales.

## Bloques no recomendados todavía

No se recomienda avanzar todavía sobre:

- bloques Q-5 operativos complejos;
- bloques Método Racional;
- bloques Q(t) / hidrogramas;
- bloques de diagnóstico temporal;
- bloques que dependan directamente del motor hidrológico;
- bloques que modifiquen botón, portapapeles o flujo de copiado.

## Candidatos preliminares

| Candidato | Riesgo | Motivo | Decisión preliminar |
|---|---|---|---|
| Parámetros hidrológicos base | Bajo/medio | Bloque representacional ya delegado, pero puede contener variables numéricas y unidades | Candidato preferente con auditoría previa |
| Tiempo de concentración y roles Tc | Alto | Técnicamente sensible y con implicaciones hidrológicas | No recomendado todavía |
| Volumen de referencia | Medio/alto | Vinculado a lluvia efectiva, área y masa | No recomendado sin auditoría reforzada |
| Escenario Q-Tr activo | Medio | Representacional, pero conecta con resultados de caudal | Candidato posterior, no inmediato |
| Sello técnico auxiliar | Bajo | Representacional/documental, ya tratado parcialmente en ciclos previos | Candidato alterno |
| Método Racional | Alto | Contraste técnico independiente | No recomendado todavía |
| Q(t) / hidrogramas | Alto | Dependencia directa de series, Qp, Tp y motor | No recomendado todavía |

## Candidato recomendado

El candidato recomendado es el bloque `## 2. Parámetros hidrológicos base`, siempre que la auditoría confirme que ya está delegado por helper y que su contenido puede validarse sin tocar cálculos ni motor.

## Justificación

El bloque `## 2. Parámetros hidrológicos base` parece ser el siguiente bloque natural después de Identificación porque:

- pertenece al inicio del expediente;
- es principalmente representacional;
- puede validarse contra salida textual;
- no requiere sustitución inmediata;
- permite detectar residuos de formato, unidades o valores objeto antes de avanzar a bloques más sensibles.

## Decisión

No se sustituye ningún bloque en esta OT.

No se implementa ni modifica helper.

La decisión prudente es abrir después una auditoría/trazabilidad del bloque `## 2. Parámetros hidrológicos base` para confirmar su ruta real de composición.

## Próxima OT recomendada

`OT-0191 — Auditoría/trazabilidad bloque Parámetros hidrológicos base`
