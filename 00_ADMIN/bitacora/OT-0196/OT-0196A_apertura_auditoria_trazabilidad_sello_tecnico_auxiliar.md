# OT-0196A — Apertura auditoría/trazabilidad bloque Sello técnico auxiliar

## Objetivo

Auditar y trazar la composición real del bloque `Sello técnico auxiliar` dentro del expediente hidrológico mínimo.

## Antecedente

OT-0195 seleccionó el bloque `Sello técnico auxiliar` como siguiente candidato representacional preferente, condicionado a confirmar primero su ruta real de composición.

## Alcance

Esta OT solo audita y traza.

No implementa helper.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

No modifica botón ni portapapeles.

## Restricciones

No se modifica:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Preguntas de auditoría

- ¿Existe el bloque `Sello técnico auxiliar` como texto literal o por helper?
- ¿La ruta operativa usa `construirLineasSelloTecnicoAuxiliarExpediente(...)`?
- ¿La invocación operativa pasa `contextoBase` u otros argumentos?
- ¿El helper se exporta correctamente?
- ¿La salida controlada contiene residuos `undefined`, `null`, `NaN` o `[object Object]`?
- ¿El bloque es apto para validación aislada posterior sin tocar cálculos ni motor?
