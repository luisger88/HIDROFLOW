# OT-0136A — Apertura comparación textual Parámetros base delegado vs operativo

## Objetivo

Comparar de forma controlada el bloque `## 2. Parámetros hidrológicos base` generado por el helper delegado frente al bloque operativo actual del expediente.

## Antecedente

OT-0133 implementó el helper puro `construirLineasParametrosHidrologicosBaseExpediente(...)`.

OT-0134 reforzó su validación aislada.

OT-0135 lo integró en `ComparadorMultiMetodo.jsx` solo como diagnóstico no invasivo.

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

OT-0136 se considera válida si:

- el bloque delegado retorna 5 líneas;
- el bloque operativo de referencia tiene 5 líneas;
- encabezado, CN, CN base, CN efectivo y AMC coinciden;
- no hay residuos técnicos;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
