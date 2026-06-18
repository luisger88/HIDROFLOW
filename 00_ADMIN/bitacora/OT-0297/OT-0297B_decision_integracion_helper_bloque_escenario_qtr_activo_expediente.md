# OT-0297B — Decisión integración helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Documentar la decisión de integrar posteriormente el helper puro `construirBloqueEscenarioQTrActivoExpediente` al expediente hidrológico mínimo.

## Antecedente

OT-0295 implementó de forma aislada el helper `construirBloqueEscenarioQTrActivoExpediente`.

OT-0296 validó de forma aislada el helper con resultado limpio.

La validación confirmó existencia del archivo, import runtime, exportaciones, salida con título, salida sin título, fallbacks, no mutación de entrada, ausencia de tokens inválidos, ausencia de referencias operativas prohibidas y build aprobado.

## Evidencia principal

OT-0296 cerró con:

```json
{
  "validacion": "OT-0296",
  "helper": "construirBloqueEscenarioQTrActivoExpediente",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "helperValidadoAislado": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Evidencia de salida mínima

Con entrada vacía, el helper produce:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: no_publicado
Lectura técnica: bloque reservado para integración posterior sin recálculo.
```

## Evidencia de salida activa

Con entrada activa documental, el helper produce trazabilidad sin adopción ni recálculo:

```text
Estado: publicado
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: 100
Q-Tr activo: 123.45
```

## Estado del helper

El helper queda en estado:

```text
VALIDADO EN AISLAMIENTO
```

## Decisión

Se aprueba avanzar hacia la integración futura del helper `construirBloqueEscenarioQTrActivoExpediente` al expediente hidrológico mínimo.

Esta decisión no acopla el helper.

Esta decisión no modifica el constructor principal.

Esta decisión no modifica el helper.

Esta decisión no modifica comparador.

Esta decisión no modifica motor.

Esta decisión no recalcula Q-Tr.

Esta decisión no selecciona periodo de retorno adoptado.

## Condición para integración futura

Antes del acople funcional, debe diseñarse el punto de acople de forma explícita.

El diseño del acople deberá definir:

- import futuro del helper;
- función auxiliar delegada dentro del constructor si aplica;
- sustitución del bloque inline actual de `Escenario Q-Tr activo`; 
- conservación del orden documental;
- ausencia de contaminación de `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`;
- validaciones estructurales mínimas;
- límites de no recálculo Q-Tr;
- límites de no selección de Tr adoptado.

## Frontera mantenida

La decisión de integración futura no autoriza:

- acoplar el helper en esta OT;
- modificar `construirExpedienteHidrologicoMinimo.js`;
- modificar `construirBloqueEscenarioQTrActivoExpediente.js`;
- modificar `ComparadorMultiMetodo.jsx`;
- modificar motor;
- recalcular Q-Tr;
- seleccionar Tr adoptado;
- tocar Q-5;
- tocar Método Racional;
- tocar diagnóstico Q(t);
- emitir dictamen hidrológico.

## Próximo frente recomendado

`OT-0298 — Diseño punto acople helper bloque Escenario Q-Tr activo del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirBloqueEscenarioQTrActivoExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se selecciona Tr adoptado.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueEscenarioQTrActivoExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se seleccionó Tr adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).
