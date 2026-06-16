# OT-0183A — Apertura extracción reforzada Identificación operativo vs diagnóstico

## Objetivo

Diferenciar de forma precisa el bloque operativo real `## 1. Identificación` dentro del arreglo `textoExpediente` frente al bloque diagnóstico no invasivo OT-0125D y el helper existente `construirLineasIdentificacionExpediente(...)`.

## Antecedente

OT-0182 localizó un bloque relacionado con identificación, pero correspondía al diagnóstico no invasivo `// OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado`, no necesariamente al bloque operativo real dentro de `textoExpediente`.

## Alcance

Esta OT solo extrae y documenta.

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

## Criterio de extracción reforzada

La extracción debe delimitar:

- inicio real de `const textoExpediente = [`;
- cierre real del arreglo `textoExpediente`;
- bloque operativo `## 1. Identificación` dentro del arreglo;
- inicio de `## 2` dentro del arreglo;
- bloque diagnóstico OT-0125D fuera o después del arreglo;
- uso/importación de `construirLineasIdentificacionExpediente(...)`.
