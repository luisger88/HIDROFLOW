# OT-0246B — Corrección acople helper Identificación del expediente

## Objetivo

Corregir el acople del helper `construirBloqueIdentificacionExpedienteMinimo` para que la salida real del constructor principal use el bloque delegado de Identificación.

## Antecedente

OT-0245 validó el acople y detectó un hallazgo: la función auxiliar `construirLineasIdentificacionExpediente` delegaba correctamente al helper, pero la salida real del constructor principal `construirExpedienteHidrologicoMinimo` aún conservaba un bloque inline antiguo de Identificación.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se sustituyó únicamente el bloque inline de `## 1. Identificación` dentro del constructor principal `construirExpedienteHidrologicoMinimo`.

El constructor principal ahora usa:

```javascript
...construirLineasIdentificacionExpediente({
  contextoBase,
  fechaGeneracion
}),
```

## Alcance mantenido

No se modificó `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.

No se modificó `construirLineasIdentificacionExpediente`.

No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modificó `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificaron validadores existentes.

No se modificó motor.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Lectura técnica

La corrección conecta la salida real del constructor principal con la función auxiliar ya delegada al helper de Identificación.

La constante de secciones obligatorias conserva únicamente títulos de sección.

El `export default` del constructor principal se conserva.

## Próximo frente recomendado

`OT-0247 — Revalidación acople helper Identificación del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper de Identificación.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
