# OT-0157A — Apertura comparación textual Volumen de referencia delegado vs operativo

## Objetivo

Comparar de forma controlada el bloque `## 4. Volumen de referencia` generado por el helper delegado frente al bloque operativo actual del expediente.

## Antecedente

OT-0154 implementó el helper puro `construirLineasVolumenReferenciaExpediente(...)`.

OT-0155 reforzó su validación aislada.

OT-0156 integró el helper en `ComparadorMultiMetodo.jsx` solo como diagnóstico no invasivo.

## Alcance

Esta OT solo compara texto delegado vs referencia operativa.

No sustituye el bloque operativo.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `textoExpediente`.

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

## Criterio de cierre

OT-0157 se considera válida si:

- el bloque delegado retorna 4 líneas;
- el bloque operativo de referencia tiene 4 líneas;
- encabezado, lluvia efectiva, volumen esperado y fórmula coinciden;
- no hay residuos técnicos;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
