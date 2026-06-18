# OT-0253B — Implementación helper bloque Parámetros hidrológicos base del expediente

## Objetivo

Implementar el helper puro `construirBloqueParametrosHidrologicosBaseExpediente` para representar documentalmente el bloque `Parámetros hidrológicos base`.

## Antecedente

OT-0251 aprobó el contrato documental del bloque.

OT-0252 aprobó el diseño del helper puro.

## Archivo funcional creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js
```

## Helper implementado

```text
construirBloqueParametrosHidrologicosBaseExpediente
```

## Firma implementada

```javascript
export function construirBloqueParametrosHidrologicosBaseExpediente({
  CN = "—",
  CN_base = "—",
  CN_efectivo = "—",
  AMC = "—",
  incluirTitulo = true
} = {})
```

## Salida documental

Con `incluirTitulo = true`, el helper genera:

```text
## 2. Parámetros hidrológicos base
CN: <valor o —>
CN base: <valor o —>
CN efectivo: <valor o —>
AMC: <valor o —>
```

Con `incluirTitulo = false`, omite únicamente el título.

## Normalización documental implementada

- `undefined` se representa como `—`.
- `null` se representa como `—`.
- cadenas vacías se representan como `—`.
- números no finitos se representan como `—`.
- objetos se representan como `—`.
- cadenas no vacías se conservan como texto.
- números finitos se convierten directamente a texto.

## Criterio de no recálculo

El helper no calcula CN.

El helper no calcula CN base.

El helper no calcula CN efectivo.

El helper no deriva AMC.

El helper no audita valores hidrológicos.

El helper solo representa documentalmente valores recibidos.

## Alcance mantenido

No se acopló el helper al constructor principal.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificaron validadores existentes.

No se modificó motor.

No se recalcularon ni validaron `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0254 — Validación aislada helper Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se acopló el helper al constructor principal.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
