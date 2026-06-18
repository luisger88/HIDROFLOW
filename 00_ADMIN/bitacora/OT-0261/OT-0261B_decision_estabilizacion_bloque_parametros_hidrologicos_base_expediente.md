# OT-0261B — Decisión estabilización bloque Parámetros hidrológicos base del expediente

## Objetivo

Decidir la estabilización del bloque `Parámetros hidrológicos base` dentro del expediente hidrológico mínimo.

## Antecedente

El bloque `Parámetros hidrológicos base` siguió el ciclo controlado:

- OT-0250: selección del bloque;
- OT-0251: contrato documental;
- OT-0252: diseño del helper;
- OT-0253: implementación del helper puro;
- OT-0254: validación aislada aprobada;
- OT-0255: decisión de integración futura;
- OT-0256: diseño del punto de acople;
- OT-0257: implementación del acople mínimo;
- OT-0258: validación del acople con hallazgo;
- OT-0259: corrección del acople en salida real;
- OT-0260: revalidación aprobada.

## Evidencia principal

OT-0260 revalidó el acople en salida real:

```json
{
  "validacion": "OT-0260",
  "helper": "construirBloqueParametrosHidrologicosBaseExpediente",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "buildAprobado": true,
  "acopleAuxiliarValidado": true,
  "acopleSalidaRealValidado": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Estado técnico del bloque

El bloque queda operando en la cadena:

```text
construirExpedienteHidrologicoMinimo
↓
construirLineasParametrosHidrologicosBaseExpediente
↓
construirBloqueParametrosHidrologicosBaseExpediente
```

## Alcance estabilizado

La estabilización cubre únicamente la representación documental segura de:

- `CN`;
- `CN base`;
- `CN efectivo`;
- `AMC`.

## Criterio de estabilización

Se considera estabilizado el bloque porque:

- el helper puro existe;
- el helper fue validado aisladamente;
- el helper fue acoplado al constructor principal mediante función auxiliar;
- el constructor principal usa la función auxiliar en la salida real;
- la salida real fue revalidada con valores objeto;
- no se detectaron tokens inválidos;
- no se detectaron términos sensibles ajenos al bloque;
- el build fue aprobado.

## Límites de la estabilización

La estabilización no implica:

- recálculo de `CN`;
- recálculo de `CN base`;
- recálculo de `CN efectivo`;
- derivación de `AMC`;
- auditoría hidrológica de los valores;
- validación técnica de suficiencia hidrológica;
- modificación de motor;
- modificación de UI;
- modificación de `ComparadorMultiMetodo.jsx`;
- intervención sobre Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t).

## Decisión

Se aprueba declarar estabilizado el bloque `Parámetros hidrológicos base` como componente documental del expediente hidrológico mínimo.

Esta decisión no autoriza nuevos cambios funcionales.

Cualquier auditoría hidrológica futura sobre `CN`, `CN base`, `CN efectivo` o `AMC` deberá abrir una OT específica.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0262 — Registro consolidado cierre bloque Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueParametrosHidrologicosBaseExpediente.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
