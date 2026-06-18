# OT-0236B — Registro consolidado cierre bloque restricciones y advertencias generales

## Objetivo

Registrar de forma consolidada el cierre del bloque de restricciones y advertencias generales del expediente hidrológico mínimo.

## Alcance del cierre

Este cierre aplica únicamente al bloque general de restricciones y advertencias acoplado en la sección 12 del expediente hidrológico mínimo.

No aplica a Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe, masa ni otros bloques sensibles.

## Ciclo técnico consolidado

El bloque fue tratado mediante el siguiente ciclo:

- OT-0220: contrato del bloque de restricciones y advertencias generales;
- OT-0221: diseño del helper;
- OT-0222: implementación pura del helper;
- OT-0223: validación aislada con hallazgo;
- OT-0224: ajuste del criterio del validador;
- OT-0225: revalidación aislada aprobada;
- OT-0226: decisión de no integrar directamente y diseñar punto de acople;
- OT-0227: diseño del punto de acople;
- OT-0228: implementación del acople mínimo;
- OT-0229: validación inicial del expediente acoplado con hallazgo;
- OT-0230: ajuste criterio tokens;
- OT-0231: revalidación con hallazgo de normalización;
- OT-0232: auditoría forma real de salida;
- OT-0233: ajuste normalizador salida documental;
- OT-0234: revalidación aprobada con normalizador corregido;
- OT-0235: decisión formal de estabilización.

## Hito técnico principal

OT-0234 dejó evidencia de revalidación aprobada:

```json
{
  "totalControles": 34,
  "controlesAprobados": 34,
  "controlesFallidos": 0,
  "revalidacionExpedienteAprobada": true,
  "textoEvaluadoDesde": "salida.texto"
}
```

## Estado estabilizado

El bloque general de restricciones y advertencias queda estabilizado bajo estas condiciones:

- se encuentra acoplado en la sección `## 12. Restricciones y advertencias técnicas`;
- usa el helper `construirBloqueRestriccionesAdvertenciasGeneralesExpediente`;
- aparece una sola vez en la salida documental;
- la salida documental se valida desde `salida.texto`;
- no introduce `undefined`, `null`, `NaN` ni `[object Object]`;
- no modifica motor;
- no modifica bloques hidrológicos sensibles;
- no modifica `ComparadorMultiMetodo.jsx`.

## Archivos relevantes

Archivo de expediente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

Helper:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

Validaciones relevantes:

```text
07_TOOLBOX/validaciones/validar_ot0229_expediente_restricciones_advertencias_acoplado.mjs
07_TOOLBOX/validaciones/revalidar_ot0231_expediente_criterio_ajustado_tokens.mjs
07_TOOLBOX/validaciones/revalidar_ot0234_expediente_normalizador_corregido.mjs
```

## Decisión consolidada

Se cierra el frente del bloque de restricciones y advertencias generales como estabilizado.

La estabilización es estrictamente documental y funcional para el bloque general en la sección 12.

No se habilita ninguna modificación adicional por esta OT.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica el acople.

No se toca motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

Pendiente definición de siguiente bloque del expediente hidrológico mínimo.

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se modificó el acople.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
