# OT-0266B — Implementación helper bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Implementar el helper puro documental `construirBloqueTiempoConcentracionRolesTcExpediente`.

## Antecedente

OT-0265 diseñó el helper documental del bloque `Tiempo de concentración y roles Tc` con alcance representativo y no adoptivo.

## Archivo funcional creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js
```

## Helper implementado

```text
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Firma implementada

```javascript
export function construirBloqueTiempoConcentracionRolesTcExpediente({
  Tc_final = null,
  trDisenoActivoExpediente = null,
  incluirTitulo = true
} = {})
```

## Normalizadores internos

Se implementaron normalizadores internos no exportados:

```text
formatearTcDocumental(valor)
normalizarTrDocumental(valor)
```

## Salida documental

El helper devuelve `string[]` con:

- título opcional `## 3. Tiempo de concentración y roles Tc`;
- `Tc comparador` normalizado documentalmente;
- `Tr global activo` normalizado documentalmente;
- nota Tr de no recálculo;
- roles fijos de Tc.

## Alcance mantenido

No se acopló el helper al constructor principal.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se modificaron helpers existentes.

No se modificaron validadores existentes.

No se recalculó `Tc`.

No se modificó `Tc_final`.

No se seleccionó `Tc` adoptado.

No se emitió dictamen hidrológico.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0267 — Validación aislada helper bloque Tiempo de concentración y roles Tc del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó bloque Identificación.
- No se modificó bloque Parámetros hidrológicos base.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
