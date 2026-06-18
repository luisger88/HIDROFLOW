# OT-0299B — Acople mínimo helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Acoplar de forma mínima y quirúrgica el helper puro `construirBloqueEscenarioQTrActivoExpediente` al constructor del expediente hidrológico mínimo.

## Antecedente

OT-0298 diseñó el punto de acople futuro del helper Q-Tr y autorizó avanzar al acople mínimo en una OT explícita.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper acoplado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js
```

## Cambios aplicados

Se agregó import único del helper:

```javascript
import { construirBloqueEscenarioQTrActivoExpediente } from "./construirBloqueEscenarioQTrActivoExpediente";
```

Se agregó o sustituyó la función auxiliar delegada:

```javascript
export function construirLineasEscenarioQTrActivoExpediente(entrada = {}) {
  return construirBloqueEscenarioQTrActivoExpediente({
    estadoQTrActivoExpediente: entrada?.estadoQTrActivoExpediente,
    qTrActivoExpediente: entrada?.qTrActivoExpediente,
    faltantesQTrActivoExpediente: entrada?.faltantesQTrActivoExpediente,
    trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente,
    incluirTitulo: true
  });
}
```

Se sustituyó el bloque inline antiguo por llamada a la función auxiliar:

```javascript
...construirLineasEscenarioQTrActivoExpediente({
  estadoQTrActivoExpediente: contextoBase?.q_tr_activo_estado?.estado,
  qTrActivoExpediente: contextoBase?.q_tr_activo,
  faltantesQTrActivoExpediente: contextoBase?.q_tr_activo_faltantes,
  trDisenoActivoExpediente: trDisenoActivoExpedienteDocumental
}),
```

## Alcance técnico

No se modificó el helper `construirBloqueEscenarioQTrActivoExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se recalculó Q-Tr.

No se seleccionó Tr adoptado.

No se tocó Q-5.

No se tocó Método Racional.

No se tocó diagnóstico Q(t).

## Validación en esta OT

Se ejecuta build de producción como control de sintaxis/proyecto.

La validación formal del acople queda reservada para OT-0300.

## Próximo frente recomendado

`OT-0300 — Validación acople helper bloque Escenario Q-Tr activo del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirBloqueEscenarioQTrActivoExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se seleccionó Tr adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).
