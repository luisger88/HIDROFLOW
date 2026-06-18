# OT-0257B — Implementación acople mínimo helper Parámetros hidrológicos base del expediente

## Objetivo

Implementar el acople mínimo del helper `construirBloqueParametrosHidrologicosBaseExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

OT-0256 diseñó el punto de acople seguro para el helper de Parámetros hidrológicos base.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Cambio aplicado

Se agregó el import del helper:

```javascript
import { construirBloqueParametrosHidrologicosBaseExpediente } from "./construirBloqueParametrosHidrologicosBaseExpediente";
```

Se sustituyó exclusivamente el cuerpo de la función auxiliar:

```text
construirLineasParametrosHidrologicosBaseExpediente
```

La función auxiliar ahora delega al helper validado:

```javascript
return construirBloqueParametrosHidrologicosBaseExpediente({
  CN: contextoBase?.CN,
  CN_base: contextoBase?.CN_base,
  CN_efectivo: contextoBase?.CN_efectivo,
  AMC: contextoBase?.AMC,
  incluirTitulo: true
});
```

## Frontera aplicada

La sustitución quedó acotada entre:

```text
export function construirLineasParametrosHidrologicosBaseExpediente
```

y:

```text
export function construirLineasTiempoConcentracionRolesTcExpediente
```

## Alcance mantenido

No se modificó el helper `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se intervino directamente el arreglo principal `texto` del constructor.

No se modificó `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.

No se recalcularon ni validaron `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Riesgo pendiente

Debe validarse en OT-0258 si la salida real del constructor principal consume efectivamente la función auxiliar delegada o si aún conserva un bloque inline para `## 2. Parámetros hidrológicos base`.

## Próximo frente recomendado

`OT-0258 — Validación acople helper Parámetros hidrológicos base del expediente`

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
- No se intervino directamente el arreglo principal `texto`.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
