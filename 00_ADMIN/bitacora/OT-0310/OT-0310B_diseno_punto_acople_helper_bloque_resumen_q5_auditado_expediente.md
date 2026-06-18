# OT-0310B — Diseño punto acople helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Diseñar documentalmente el punto de acople futuro del helper `construirBloqueResumenQ5AuditadoExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

OT-0304 definió el contrato documental del bloque `Resumen Q-5 auditado`.

OT-0305 diseñó el helper puro `construirBloqueResumenQ5AuditadoExpediente`.

OT-0306 implementó el helper de forma aislada.

OT-0308 validó el helper en aislamiento con criterio ajustado y 20 controles aprobados de 20.

OT-0309 aprobó la integración futura del helper, condicionada a diseñar explícitamente el punto de acople antes de modificar el constructor principal.

## Archivo funcional futuro a modificar

El acople futuro deberá limitarse al constructor del expediente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper ya disponible

El helper validado en aislamiento es:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js
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
import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";
```

## Función auxiliar futura

Deberá crearse o sustituirse una función auxiliar delegada dentro de `construirExpedienteHidrologicoMinimo.js`:

```javascript
export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  return construirBloqueResumenQ5AuditadoExpediente({
    metodosQ5: entrada?.metodosQ5,
    estadoResumenQ5AuditadoExpediente: entrada?.estadoResumenQ5AuditadoExpediente,
    faltantesResumenQ5AuditadoExpediente: entrada?.faltantesResumenQ5AuditadoExpediente,
    incluirTitulo: true
  });
}
```

## Situación actual del constructor

Existe una referencia preexistente a:

```text
construirLineasResumenQ5AuditadoExpediente
```

OT-0308 documentó que esta referencia preexistente no debe interpretarse como acople del helper nuevo `construirBloqueResumenQ5AuditadoExpediente`.

## Bloque inline actual a sustituir o delegar

El bloque actual del constructor contiene una forma equivalente a:

```javascript
"## 6. Resumen Q-5 auditado",
`Métodos recibidos: ${Array.isArray(metodos) ? metodos.length : 0}`,
"Estado: sección contractual inicial del helper puro.",
```

Ese bloque deberá sustituirse por una llamada a la función auxiliar delegada.

## Llamada futura en salida real

La salida real deberá usar:

```javascript
...construirLineasResumenQ5AuditadoExpediente({
  metodosQ5: metodos,
  estadoResumenQ5AuditadoExpediente: "sección contractual inicial del helper puro"
}),
```

## Entradas documentales permitidas

El acople podrá pasar únicamente entradas documentales ya disponibles en el constructor o explícitamente publicadas al contexto del expediente.

Entradas permitidas inicialmente:

- `metodos` como fuente documental de `metodosQ5`;
- estado documental explícito del bloque;
- faltantes documentales si ya existen publicados al contexto.

## Restricción crítica

El acople no debe recalcular Q-5.

El acople no debe recalcular hidrogramas.

El acople no debe reinterpretar resultados Q-5.

El acople no debe seleccionar método Q-5 adoptado.

El acople no debe seleccionar caudal Q-5 adoptado.

El acople no debe inferir suficiencia hidrológica.

El acople no debe modificar motor.

El acople no debe tocar Q-Tr.

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
- función auxiliar delega al helper;
- uso de la función auxiliar en la salida real;
- ausencia del bloque inline antiguo;
- helper sin modificación;
- constructor sin referencias operativas a motor para recalcular Q-5;
- `ComparadorMultiMetodo.jsx` sin modificación;
- build aprobado;
- `git status --short` limpio tras commit.

## Frontera frente a otros bloques

El diseño no autoriza modificar:

- `Escenario Q-Tr activo — control de trazabilidad`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión de diseño

Se aprueba el diseño del punto de acople futuro del helper `construirBloqueResumenQ5AuditadoExpediente`.

Esta decisión no acopla el helper.

No modifica constructor.

No modifica helper.

No modifica comparador.

No modifica motor.

No recalcula Q-5.

No reinterpreta resultados Q-5.

No selecciona método Q-5 adoptado.

No selecciona caudal Q-5 adoptado.

## Próximo frente recomendado

`OT-0311 — Acople mínimo helper bloque Resumen Q-5 auditado del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirBloqueResumenQ5AuditadoExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se recalcula Q-5.

No se reinterpretan resultados Q-5.

No se selecciona método Q-5 adoptado.

No se selecciona caudal Q-5 adoptado.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueResumenQ5AuditadoExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se reinterpretaron resultados Q-5.
- No se seleccionó método Q-5 adoptado.
- No se seleccionó caudal Q-5 adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).
