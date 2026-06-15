# OT-0126A — Apertura de comparación textual Identificación delegada vs operativa

## Objetivo

Comparar de forma controlada el bloque documental `## 1. Identificación` generado por la función delegada:

`construirLineasIdentificacionExpediente(...)`

frente al bloque operativo actual construido manualmente dentro de `textoExpediente` en:

`01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx`

## Antecedente

OT-0125 integró la función delegada dentro de `ComparadorMultiMetodo.jsx` como diagnóstico no invasivo.

La integración quedó validada mediante:

`VALIDACION_OT_0125D_IDENTIFICACION_DIAGNOSTICA_OK`

y build Vite aprobado.

## Alcance de OT-0126

Esta OT no sustituye el bloque operativo.

Solo compara:

- cantidad de líneas;
- encabezado;
- línea Cuenca;
- línea Área;
- Fuente de contexto;
- Estación IDF;
- Pendiente media;
- Longitud cauce principal;
- diferencias de formato;
- presencia de unidades;
- ausencia de residuos técnicos.

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

OT-0126 se considera válida si se genera una comparación explícita entre bloque delegado y bloque operativo, documentando coincidencias y brechas sin adoptar todavía el resultado delegado.
