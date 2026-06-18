# OT-0282B — Corrección helper bloque Volumen de referencia del expediente

## Objetivo

Corregir únicamente la referencia textual prohibida detectada por OT-0281 en la fuente del helper `construirBloqueVolumenReferenciaExpediente`.

## Antecedente

OT-0281 validó el helper en aislamiento y aprobó 18 de 19 controles.

El único control fallido fue:

```text
sin_referencias_bloques_prohibidos_en_fuente
```

## Causa

El helper contenía una referencia textual en comentario a bloques externos y módulos comparativos.

La referencia no afectaba comportamiento funcional, pero activaba el control textual estricto de la validación aislada.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js
```

## Cambio aplicado

Se sustituyó únicamente el comentario:

```javascript
// No consulta Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
```

por:

```javascript
// No consulta bloques hidrologicos externos ni modulos comparativos.
```

## Alcance técnico

No se modificó la lógica del helper.

No se modificaron exportaciones.

No se modificaron formateadores.

No se modificaron líneas documentales.

No se modificó el fallback documental.

No se modificó la fórmula textual.

## Alcance mantenido

No se acopló el helper al constructor principal.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se modificaron helpers existentes.

No se modificaron validadores existentes.

No se recalculó `Tc`.

No se recalculó volumen.

No se modificó `Tc_final`.

No se emitió dictamen hidrológico.

No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Validación en esta OT

La revalidación formal aislada queda reservada para OT-0283.

En esta OT se ejecuta build de producción como control de sintaxis/proyecto.

## Próximo frente recomendado

`OT-0283 — Revalidación aislada helper bloque Volumen de referencia del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
