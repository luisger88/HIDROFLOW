# OT-0147A — Apertura comparación textual Tiempo de concentración delegado vs operativo

## Objetivo

Comparar de forma controlada el bloque `## 3. Tiempo de concentración y roles Tc` generado por el helper delegado frente al bloque operativo actual del expediente.

## Antecedente

OT-0143 implementó el helper puro `construirLineasTiempoConcentracionRolesTcExpediente(...)`.

OT-0144 reforzó su validación aislada.

OT-0145 ajustó el fallback de `Tc_final` vacío/null.

OT-0146 integró el helper en `ComparadorMultiMetodo.jsx` solo como diagnóstico no invasivo.

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

OT-0147 se considera válida si:

- el bloque delegado retorna 10 líneas;
- el bloque operativo de referencia tiene 10 líneas;
- encabezado, Tc comparador, Tr global activo, Nota Tr y Roles Tc coinciden;
- no hay residuos técnicos;
- `ComparadorMultiMetodo.jsx` queda sin cambios.
