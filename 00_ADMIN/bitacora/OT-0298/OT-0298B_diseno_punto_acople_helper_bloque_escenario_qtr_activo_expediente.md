# OT-0298B — Diseño punto acople helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Diseñar documentalmente el punto de acople futuro del helper `construirBloqueEscenarioQTrActivoExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

OT-0295 implementó de forma aislada el helper `construirBloqueEscenarioQTrActivoExpediente`.

OT-0296 validó el helper en aislamiento con 17 controles aprobados de 17.

OT-0297 aprobó la integración futura del helper, condicionada a diseñar explícitamente el punto de acople antes de modificar el constructor principal.

## Archivo funcional futuro a modificar

El acople futuro deberá limitarse al constructor del expediente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper ya disponible

El helper validado en aislamiento es:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js
```

## Patrón de acople aprobado

El acople futuro deberá seguir el patrón usado en bloques anteriores:

```text
import del helper
↓
función auxiliar delegada
↓
uso de la función auxiliar en la salida real
↓
eliminación o sustitución del bloque inline antiguo
↓
validación estructural posterior
```

## Import futuro

Deberá agregarse un único import:

```javascript
import { construirBloqueEscenarioQTrActivoExpediente } from "./construirBloqueEscenarioQTrActivoExpediente";
```

## Función auxiliar futura

Deberá crearse una función auxiliar delegada dentro de `construirExpedienteHidrologicoMinimo.js`:

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

## Bloque inline actual a sustituir

El bloque actual del constructor contiene una forma inline equivalente a:

```javascript
"## 5. Escenario Q-Tr activo — control de trazabilidad",
`Estado: ${contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado"}`,
"Lectura técnica: bloque reservado para integración posterior sin recálculo.",
```

Ese bloque deberá sustituirse por una llamada a la función auxiliar delegada.

## Llamada futura en salida real

La salida real deberá usar:

```javascript
...construirLineasEscenarioQTrActivoExpediente({
  estadoQTrActivoExpediente: contextoBase?.q_tr_activo_estado?.estado,
  qTrActivoExpediente: contextoBase?.q_tr_activo,
  faltantesQTrActivoExpediente: contextoBase?.q_tr_activo_faltantes,
  trDisenoActivoExpediente: trDisenoActivoExpedienteDocumental
}),
```

## Entradas documentales permitidas

El acople podrá pasar únicamente entradas documentales ya disponibles en el constructor o en `contextoBase`.

Entradas permitidas:

- `contextoBase?.q_tr_activo_estado?.estado`;
- `contextoBase?.q_tr_activo`;
- `contextoBase?.q_tr_activo_faltantes`;
- `trDisenoActivoExpedienteDocumental`.

## Restricción crítica

El acople no debe recalcular Q-Tr.

El acople no debe seleccionar periodo de retorno adoptado.

El acople no debe inferir caudales.

El acople no debe modificar motor.

El acople no debe tocar Q-5.

El acople no debe tocar Método Racional.

El acople no debe tocar diagnóstico Q(t).

El acople no debe emitir dictamen hidrológico.

## SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO

El acople no debe contaminar `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO` con llamadas al helper ni con funciones auxiliares.

Esta constante debe permanecer declarativa.

## Validaciones estructurales esperadas en OT futura

El acople futuro deberá validar:

- import único del helper;
- función auxiliar delegada presente una sola vez;
- uso de la función auxiliar en la salida real;
- ausencia del bloque inline antiguo;
- helper sin modificación;
- constructor sin referencias operativas a motor para recalcular Q-Tr;
- `ComparadorMultiMetodo.jsx` sin modificación;
- build aprobado;
- `git status --short` limpio tras commit.

## Frontera frente a otros bloques

El diseño no autoriza modificar:

- `Volumen de referencia`;
- `Resumen Q-5 auditado`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión de diseño

Se aprueba el diseño del punto de acople futuro del helper `construirBloqueEscenarioQTrActivoExpediente`.

Esta decisión no acopla el helper.

No modifica constructor.

No modifica helper.

No modifica comparador.

No modifica motor.

No recalcula Q-Tr.

No selecciona periodo de retorno adoptado.

No recalcula volumen.

## Próximo frente recomendado

`OT-0299 — Acople mínimo helper bloque Escenario Q-Tr activo del expediente`

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
