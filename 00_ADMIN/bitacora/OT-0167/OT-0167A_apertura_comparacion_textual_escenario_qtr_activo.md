# OT-0167A — Apertura comparación textual Escenario Q-Tr activo delegado vs operativo

## Objetivo

Comparar de forma controlada el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` generado por el helper delegado frente al bloque operativo actual del expediente.

## Antecedente

OT-0164 implementó el helper puro `construirLineasEscenarioQTrActivoExpediente(...)`.

OT-0165 reforzó su validación aislada.

OT-0166 integró el helper en `ComparadorMultiMetodo.jsx` solo como diagnóstico no invasivo.

## Alcance

Esta OT solo compara texto delegado vs referencia operativa controlada.

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

OT-0167 se considera válida si:

- el bloque delegado retorna 16 líneas;
- el bloque operativo de referencia tiene 16 líneas;
- encabezado, campos principales y lectura técnica coinciden;
- no hay residuos técnicos;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
