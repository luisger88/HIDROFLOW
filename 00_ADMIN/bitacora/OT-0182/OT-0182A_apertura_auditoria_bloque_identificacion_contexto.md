# OT-0182A — Apertura auditoría bloque Identificación / contexto general

## Objetivo

Auditar y extraer la forma operativa del bloque `## 1. Identificación` o bloque equivalente de identificación / contexto general dentro del expediente hidrológico mínimo.

## Antecedente

OT-0181 seleccionó como candidato preferente un bloque documental/identificativo o de contexto base, por su bajo riesgo técnico y carácter principalmente representacional.

## Alcance

Esta OT solo audita y extrae la forma operativa actual del bloque candidato.

No implementa helper.

No diseña función pura.

No sustituye contenido.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

## Restricciones

No se modifica:

- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico;
- helper documental existente.

## Criterio de auditoría

La auditoría debe responder:

- si existe bloque `## 1. Identificación` dentro de `textoExpediente`;
- dónde inicia y dónde termina;
- qué líneas lo componen;
- si contiene valores fijos o variables;
- si depende de cálculos sensibles;
- si depende de Q-5, Método Racional, Q(t) o motor;
- si parece apto para futuro helper representacional.
