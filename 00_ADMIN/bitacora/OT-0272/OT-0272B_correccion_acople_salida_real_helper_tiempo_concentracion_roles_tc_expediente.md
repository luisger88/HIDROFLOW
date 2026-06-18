# OT-0272B — Corrección acople salida real helper Tiempo de concentración y roles Tc del expediente

## Objetivo

Corregir la salida real del constructor principal para que el bloque `Tiempo de concentración y roles Tc` use la función auxiliar delegada al helper.

## Antecedente

OT-0271 validó que el acople auxiliar estaba correcto, pero detectó que la salida real del constructor principal aún conservaba el bloque inline antiguo de `## 3. Tiempo de concentración y roles Tc`.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se sustituyó únicamente el bloque inline de `## 3. Tiempo de concentración y roles Tc` dentro del arreglo principal `texto`.

La salida real del constructor principal ahora usa:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Cadena técnica resultante

```text
construirExpedienteHidrologicoMinimo
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
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

La corrección conecta la salida real del constructor principal con la función auxiliar ya delegada al helper.

El bloque inline antiguo queda eliminado del constructor principal.

La validez final del acople deberá revalidarse en una OT posterior.

## Próximo frente recomendado

`OT-0273 — Revalidación acople helper Tiempo de concentración y roles Tc del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper validado.
- No se modificó la función auxiliar delegada.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
