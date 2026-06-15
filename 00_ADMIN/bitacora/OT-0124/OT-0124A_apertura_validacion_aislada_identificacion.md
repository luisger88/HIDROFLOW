# OT-0124A — Apertura documental de validación aislada Identificación

## Objetivo

Validar de forma aislada la función pura:

`construirLineasIdentificacionExpediente(...)`

ubicada en:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Antecedente inmediato

OT-0123 implementó la función pura del bloque documental `## 1. Identificación` dentro del helper del expediente hidrológico mínimo, pero la dejó explícitamente aislada.

La función no fue integrada en `ComparadorMultiMetodo.jsx`.

## Alcance de OT-0124

Crear y ejecutar una validación aislada específica para verificar que la función:

- retorna un arreglo;
- retorna 7 líneas;
- incluye encabezado `## 1. Identificación`;
- incluye líneas documentales esperadas para:
  - Cuenca;
  - Área;
  - Fuente de contexto;
  - Estación IDF;
  - Pendiente media;
  - Longitud cauce principal;
- opera con contexto completo;
- opera con contexto fallback;
- aplica fallbacks documentales:
  - `Cuenca activa`;
  - `—`;
  - `HidroFlow`;
  - `SAN CRISTOBAL`;
- no emite residuos técnicos:
  - `undefined`;
  - `null`;
  - `NaN`;
  - `[object Object]`.

## Restricciones explícitas

Esta OT no integra la función en UI.

No se modifica:

- `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Criterio de cierre

OT-0124 se considera cerrada únicamente si el script de validación aislada pasa correctamente para contexto completo y contexto fallback, sin modificar componentes visuales ni lógica hidrológica.
