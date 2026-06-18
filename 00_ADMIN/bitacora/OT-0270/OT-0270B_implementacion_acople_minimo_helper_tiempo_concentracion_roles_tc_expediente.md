# OT-0270B — Implementación acople mínimo helper Tiempo de concentración y roles Tc del expediente

## Objetivo

Implementar el acople mínimo del helper `construirBloqueTiempoConcentracionRolesTcExpediente` dentro de `construirExpedienteHidrologicoMinimo.js`.

## Antecedente

OT-0269 diseñó el punto de acople mediante delegación de la función auxiliar `construirLineasTiempoConcentracionRolesTcExpediente` hacia el helper validado.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se agregó el import del helper:

```javascript
import { construirBloqueTiempoConcentracionRolesTcExpediente } from "./construirBloqueTiempoConcentracionRolesTcExpediente";
```

Se sustituyó únicamente el cuerpo de la función auxiliar:

```text
construirLineasTiempoConcentracionRolesTcExpediente
```

La función auxiliar ahora delega en:

```javascript
return construirBloqueTiempoConcentracionRolesTcExpediente({
  Tc_final: entrada?.Tc_final,
  trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente,
  incluirTitulo: true
});
```

## Alcance mantenido

No se tocó directamente el arreglo principal `texto`.

No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

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

El acople mínimo deja preparada la cadena:

```text
construirExpedienteHidrologicoMinimo
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
```

La salida real del constructor principal deberá validarse en una OT posterior.

## Próximo frente recomendado

`OT-0271 — Validación acople helper Tiempo de concentración y roles Tc del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se tocó directamente el arreglo principal `texto`.
- No se modificó el helper validado.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
