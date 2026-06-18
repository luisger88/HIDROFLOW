# OT-0286B — Acople mínimo helper bloque Volumen de referencia del expediente

## Objetivo

Acoplar mínimamente el helper puro documental `construirBloqueVolumenReferenciaExpediente` al expediente hidrológico mínimo.

## Antecedente

OT-0285 diseñó el punto de acople futuro del helper `construirBloqueVolumenReferenciaExpediente`.

El diseño aprobó el patrón: import del helper, función auxiliar delegada y uso de la función auxiliar en la salida real del constructor principal.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Import agregado

```javascript
import { construirBloqueVolumenReferenciaExpediente } from "./construirBloqueVolumenReferenciaExpediente";
```

## Función auxiliar delegada

La función `construirLineasVolumenReferenciaExpediente` delega ahora al helper validado:

```javascript
export function construirLineasVolumenReferenciaExpediente(entrada = {}) {
  return construirBloqueVolumenReferenciaExpediente({
    peTotalMm: entrada?.peTotalMm,
    volumenEsperadoM3: entrada?.volumenEsperadoM3,
    incluirTitulo: true
  });
}
```

## Salida real ajustada

El bloque inline de `Volumen de referencia` en la salida real fue sustituido por:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm,
  volumenEsperadoM3
}),
```

## Alcance técnico

No se modificó el helper `construirBloqueVolumenReferenciaExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se recalculó volumen.

No se modificó Pe.

No se modificó área.

No se modificó fórmula de volumen.

No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Validación en esta OT

Se ejecuta build de producción como control de sintaxis/proyecto.

La validación formal del acople queda reservada para OT-0287.

## Próximo frente recomendado

`OT-0287 — Validación acople helper bloque Volumen de referencia del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirBloqueVolumenReferenciaExpediente.js`.
- No se modificaron helpers existentes distintos del acople auxiliar.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
