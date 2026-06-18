# OT-0274B — Corrección runtime variable trDisenoActivoExpediente en salida real Tc roles

## Objetivo

Corregir el error runtime `ReferenceError: trDisenoActivoExpediente is not defined` detectado en OT-0273.

## Antecedente

OT-0273 revalidó el acople y confirmó que la función auxiliar estaba delegada al helper, pero la ejecución real del constructor principal fallaba porque `trDisenoActivoExpediente` era usado en el arreglo `texto` sin estar declarado.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se corrigió el runtime mediante tres ajustes mínimos dentro de `construirExpedienteHidrologicoMinimo.js`:

1. Se agregó `trDisenoActivoExpediente = null` a la firma del constructor principal.

2. Se declaró `trDisenoActivoExpedienteDocumental` dentro del constructor principal, derivado de entradas ya disponibles y sin recálculo hidrológico.

3. La salida real del bloque Tc roles pasa ahora `trDisenoActivoExpedienteDocumental` a la función auxiliar delegada.

## Firma ajustada

```javascript
export default function construirExpedienteHidrologicoMinimo({
  contextoBase = {},
  Tc_final = null,
  trDisenoActivoExpediente = null,
  metodos = [],
  ...
} = {})
```

## Variable documental declarada

```javascript
const trDisenoActivoExpedienteDocumental =
  trDisenoActivoExpediente ??
  contextoBase?.trDisenoActivoExpediente ??
  contextoBase?.trDisenoActivo ??
  contextoBase?.Tr ??
  contextoBase?.TR ??
  contextoBase?.periodoRetorno ??
  contextoBase?.periodo_retorno ??
  contextoBase?.periodoRetornoAnos ??
  contextoBase?.periodoRetornoAnios ??
  null;
```

## Salida real ajustada

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente: trDisenoActivoExpedienteDocumental
}),
```

## Alcance mantenido

No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

No se modificó la función auxiliar `construirLineasTiempoConcentracionRolesTcExpediente`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se modificó bloque Identificación.

No se modificó bloque Parámetros hidrológicos base.

No se modificaron helpers existentes.

No se modificaron validadores existentes.

No se recalculó `Tc`.

No se modificó `Tc_final`.

No se seleccionó `Tc` adoptado.

No se emitió dictamen hidrológico.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Lectura técnica

La corrección elimina el fallo runtime sin alterar la lógica del helper ni la función auxiliar delegada.

La validez final deberá revalidarse en una OT posterior.

## Próximo frente recomendado

`OT-0275 — Revalidación runtime salida real helper Tiempo de concentración y roles Tc`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper validado.
- No se modificó la función auxiliar delegada.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
