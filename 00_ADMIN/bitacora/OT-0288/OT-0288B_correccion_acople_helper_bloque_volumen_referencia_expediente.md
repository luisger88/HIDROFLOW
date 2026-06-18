# OT-0288B — Corrección acople helper bloque Volumen de referencia del expediente

## Objetivo

Corregir únicamente el paso documental de valores hacia el bloque `Volumen de referencia` acoplado.

## Antecedente

OT-0287 validó el acople del helper `construirBloqueVolumenReferenciaExpediente` y aprobó 14 de 16 controles.

Los controles fallidos fueron:

```text
constructor_principal_sin_bloque_inline_volumen
bloque_volumen_real_lineas_minimas
```

## Causa técnica principal

La salida directa auxiliar generaba correctamente `56,65 mm` y `2.654.251 m³`, pero la salida real del constructor recibía valores documentales no publicados en el caso validado y terminaba usando fallback `—`.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Corrección aplicada

Se agregaron entradas documentales explícitas al constructor principal:

```javascript
peTotalMm: peTotalMmEntradaDocumental = null,
volumenEsperadoM3: volumenEsperadoM3EntradaDocumental = null,
```

Se agregaron variables documentales de respaldo:

```javascript
const peTotalMmBloqueVolumenReferenciaDocumental =
  Number.isFinite(Number(peTotalMmEntradaDocumental))
    ? Number(peTotalMmEntradaDocumental)
    : peTotalMm;

const volumenEsperadoM3BloqueVolumenReferenciaDocumental =
  Number.isFinite(Number(volumenEsperadoM3EntradaDocumental))
    ? Number(volumenEsperadoM3EntradaDocumental)
    : volumenEsperadoM3;
```

La llamada al helper acoplado ahora recibe:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm: peTotalMmBloqueVolumenReferenciaDocumental,
  volumenEsperadoM3: volumenEsperadoM3BloqueVolumenReferenciaDocumental
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

La revalidación formal del acople queda reservada para OT-0289.

## Próximo frente recomendado

`OT-0289 — Revalidación acople helper bloque Volumen de referencia del expediente`

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
