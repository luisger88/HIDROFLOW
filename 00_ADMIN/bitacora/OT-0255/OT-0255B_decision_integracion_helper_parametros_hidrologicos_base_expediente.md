# OT-0255B — Decisión integración helper Parámetros hidrológicos base del expediente

## Objetivo

Decidir la integración futura del helper `construirBloqueParametrosHidrologicosBaseExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

El bloque `Parámetros hidrológicos base` siguió el ciclo inicial:

- OT-0250: selección del bloque;
- OT-0251: contrato documental;
- OT-0252: diseño del helper;
- OT-0253: implementación del helper puro;
- OT-0254: validación aislada aprobada.

## Evidencia principal

OT-0254 validó el helper de forma aislada:

```json
{
  "validacion": "OT-0254",
  "helper": "construirBloqueParametrosHidrologicosBaseExpediente",
  "totalControles": 13,
  "controlesAprobados": 13,
  "controlesFallidos": 0,
  "casosEvaluados": 6,
  "buildAprobado": true,
  "helperValidado": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Estado del helper

El helper `construirBloqueParametrosHidrologicosBaseExpediente` queda apto para planificar integración futura.

Archivo existente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js
```

## Alcance validado

La validación aislada confirmó:

- salida `string[]`;
- título opcional según `incluirTitulo`;
- campos mínimos presentes;
- normalización documental segura;
- ausencia de `undefined`, `null`, `NaN` y `[object Object]`;
- ausencia de términos prohibidos ajenos al bloque;
- determinismo;
- no mutación de entradas;
- build Vite aprobado.

## Decisión

Se aprueba avanzar hacia el diseño del punto de acople del helper `construirBloqueParametrosHidrologicosBaseExpediente` dentro del expediente hidrológico mínimo.

Esta decisión no autoriza todavía el acople funcional.

La integración deberá diseñarse primero en una OT separada, identificando el punto exacto de sustitución dentro de `construirExpedienteHidrologicoMinimo.js`.

## Criterio de integración futura

El futuro acople deberá cumplir:

- sustituir únicamente el bloque inline `## 2. Parámetros hidrológicos base` cuando corresponda;
- preservar `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO` sin contaminación;
- preservar el `export default` del constructor principal;
- no modificar el helper ya validado;
- no modificar `ComparadorMultiMetodo.jsx`;
- no modificar motor;
- no recalcular ni validar hidrológicamente `CN`, `CN base`, `CN efectivo` ni `AMC`;
- mantener salida documental segura.

## Riesgos a controlar en el diseño de acople

- Evitar intervención accidental sobre el bloque `Identificación` ya estabilizado.
- Evitar tocar bloques posteriores como Tiempo de concentración, Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t).
- Evitar mover o contaminar `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.
- Evitar confundir representación documental con validación hidrológica.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se acopla el helper al constructor principal.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0256 — Diseño punto acople helper Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificó `construirBloqueParametrosHidrologicosBaseExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se acopló el helper al constructor principal.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
