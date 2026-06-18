# OT-0235B — Decisión sobre estabilización del bloque restricciones y advertencias generales

## Objetivo

Decidir si el bloque de restricciones y advertencias generales acoplado al expediente hidrológico mínimo puede considerarse estabilizado.

## Antecedente

El bloque fue tratado mediante el siguiente ciclo técnico:

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
- OT-0234: revalidación aprobada con normalizador corregido.

## Evidencia principal

OT-0234 confirmó:

```json
{
  "totalControles": 34,
  "controlesAprobados": 34,
  "controlesFallidos": 0,
  "revalidacionExpedienteAprobada": true,
  "textoEvaluadoDesde": "salida.texto",
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Estado técnico del bloque

El bloque general de restricciones y advertencias está acoplado en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

El helper usado es:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

La sección de acople es:

```text
## 12. Restricciones y advertencias técnicas
```

## Validaciones superadas

- Import del helper presente.
- Sección 12 presente.
- Marca OT-0228 presente.
- Llamada al helper presente.
- Bloque OT-0228 único en fuente.
- Salida documental generada correctamente desde `salida.texto`.
- `salida.ok === true`.
- `salida.errores.length === 0`.
- Secciones obligatorias presentes.
- Ausencia de `undefined`, `null`, `NaN` y `[object Object]` en `salida.texto`.
- Bloque general presente una sola vez en `salida.texto`.
- Helper existente.
- Comparador existente.
- Build Vite aprobado.

## Lectura técnica

El bloque ya superó el ciclo de contrato, diseño, implementación, acople, auditoría de salida y revalidación documental.

La validación final no depende de inspección superficial del código fuente, sino de la salida documental real exportable mediante `salida.texto`.

No se detectaron tokens inválidos en la salida documental.

No se detectó duplicidad del bloque general en la salida documental.

No se modificaron bloques sensibles durante la revalidación.

## Decisión

Se considera estabilizado el bloque de restricciones y advertencias generales acoplado al expediente hidrológico mínimo.

La estabilización aplica únicamente al bloque general y a su acople actual en la sección 12.

No implica estabilización de otros bloques del expediente ni autoriza modificaciones sobre Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe o masa.

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica el acople.

No se toca motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0236 — Registro consolidado cierre bloque restricciones y advertencias generales`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se modificó el acople.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
