# OT-0295B — Implementación helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Implementar de forma aislada el helper puro documental `construirBloqueEscenarioQTrActivoExpediente`.

## Antecedente

OT-0294 diseñó documentalmente el helper del bloque `Escenario Q-Tr activo — control de trazabilidad`.

## Archivo funcional creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js
```

## Exportaciones implementadas

El archivo exporta:

```javascript
export function construirBloqueEscenarioQTrActivoExpediente(entrada = {})
export function normalizarEstadoQTrActivoDocumental(valor)
export function formatearValorQTrActivoDocumental(valor)
```

## Comportamiento implementado

El helper:

- devuelve `string[]`;
- permite título opcional mediante `incluirTitulo`;
- usa estado documental fallback `no_publicado`;
- usa fallback `—` para valores ausentes;
- no muta entrada;
- no accede a DOM;
- no accede a portapapeles;
- no usa estado global;
- no recalcula Q-Tr;
- no selecciona periodo de retorno adoptado;
- no toca motor;
- no toca Q-5;
- no toca Método Racional;
- no toca diagnóstico Q(t).

## Salida mínima esperada

Con entrada vacía produce:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: no_publicado
Lectura técnica: bloque reservado para integración posterior sin recálculo.
```

## Alcance técnico

No se acopló el helper al constructor principal.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se recalculó Q-Tr.

No se seleccionó Tr adoptado.

No se recalculó volumen.

## Validación en esta OT

La validación formal aislada queda reservada para OT-0296.

## Próximo frente recomendado

`OT-0296 — Validación aislada helper bloque Escenario Q-Tr activo del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se seleccionó Tr adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).
