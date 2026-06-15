# OT-0130A — Apertura de selección de siguiente bloque documental

## Objetivo

Seleccionar y justificar el siguiente bloque documental candidato para delegación dentro del expediente hidrológico mínimo.

## Antecedente

El bloque `## 1. Identificación` ya completó el ciclo controlado:

- contrato;
- helper puro;
- validación aislada;
- integración diagnóstica;
- comparación textual;
- ajuste de formato;
- sustitución parcial;
- validación post-adopción.

## Candidato natural

`## 2. Parámetros hidrológicos base`

## Precaución técnica

Aunque es el bloque siguiente del expediente, puede contener campos hidrológicos sensibles como:

- CN;
- CN base;
- CN efectivo;
- AMC;
- lluvia efectiva.

Por tanto, OT-0130 no implementa helper ni sustituye bloque. Solo audita y clasifica.

## Alcance

Esta OT debe:

- localizar el bloque operativo;
- listar sus líneas actuales;
- clasificar campos documentales y técnicamente sensibles;
- decidir si conviene delegarlo completo o dividirlo;
- mantener intacto `ComparadorMultiMetodo.jsx`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
