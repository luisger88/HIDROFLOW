# OT-0127B — Aplicación de unidades en Identificación delegada

## Cambio aplicado

Se ajustó la función:

`construirLineasIdentificacionExpediente(...)`

en:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

para que las líneas numéricas del bloque `## 1. Identificación` emitan unidades institucionales:

- `Área: <valor> km²`;
- `Pendiente media: <valor> %`;
- `Longitud cauce principal: <valor> km`.

## Justificación

OT-0126 demostró que el bloque delegado y el bloque operativo eran equivalentes en contenido esencial, pero no estrictamente iguales por ausencia de unidades en tres líneas.

## Restricciones mantenidas

No se modificó:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Resultado esperado

La comparación OT-0126 debe pasar ahora con:

- 7 líneas delegadas;
- 7 líneas operativas;
- 7 coincidencias estrictas;
- 0 diferencias estrictas;
- 0 diferencias textuales fuertes.
