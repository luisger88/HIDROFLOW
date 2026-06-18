# OT-0259B — Corrección acople helper Parámetros hidrológicos base del expediente

## Objetivo

Corregir la salida real del constructor principal para que el bloque `Parámetros hidrológicos base` use la función auxiliar delegada al helper.

## Antecedente

OT-0258 validó que el acople auxiliar estaba correcto, pero detectó que la salida real del constructor principal aún conservaba un bloque inline de `## 2. Parámetros hidrológicos base`.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se sustituyó únicamente el bloque inline de `## 2. Parámetros hidrológicos base` dentro del arreglo principal `texto`.

La salida real del constructor principal ahora usa:

```javascript
...construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase
}),
```

## Alcance mantenido

No se modificó `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.

No se modificó `construirLineasParametrosHidrologicosBaseExpediente`.

No se modificó `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificaron validadores existentes.

No se modificó motor.

No se recalcularon ni validaron `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Lectura técnica

La corrección conecta la salida real del constructor principal con la función auxiliar ya delegada al helper de Parámetros hidrológicos base.

La constante de secciones obligatorias conserva únicamente títulos de sección.

El `export default` del constructor principal se conserva.

## Próximo frente recomendado

`OT-0260 — Revalidación acople helper Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper validado de parámetros base.
- No se modificó el helper de Identificación.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
