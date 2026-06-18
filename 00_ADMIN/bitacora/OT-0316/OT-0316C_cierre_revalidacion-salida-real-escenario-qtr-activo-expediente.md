# OT-0316C — Cierre Revalidación salida real Escenario Q-Tr activo del expediente

## Resultado

Se ejecutó la revalidación de la salida real/exportable del expediente hidrológico mínimo para el bloque `Escenario Q-Tr activo`.

La revalidación confirmó que el bloque existe, aparece una sola vez, se ubica antes del bloque `Resumen Q-5 auditado`, no contiene tokens inválidos y puede evaluarse sin modificar código funcional.

Sin embargo, la revalidación detectó una brecha técnica relevante: el bloque no expone explícitamente el valor del periodo de retorno activo ni el valor Q-Tr activo en la salida real.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0316\OT-0316A_apertura_revalidacion-salida-real-escenario-qtr-activo-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0316\OT-0316B_revalidacion_salida_real_escenario_qtr_activo_expediente.md

Script de revalidación:

07_TOOLBOX\validaciones\validar_ot0316_salida_real_qtr_activo.mjs

## Resultado de controles

```json
{
  "validacion": "OT-0316",
  "bloque": "Escenario Q-Tr activo",
  "totalControles": 20,
  "controlesAprobados": 19,
  "controlesFallidos": 1,
  "controlesFallidosIds": [
    "bloque_qtr_contiene_periodo_retorno_prueba"
  ],
  "buildAprobado": true,
  "salidaRealQTrRevalidada": false,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "recalculaQTr": false,
  "seleccionaPeriodoRetornoAdoptado": false
}
```

## Bloque extraído de salida real

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: activo
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: —
Q-Tr activo: —
```

## Hallazgo principal

La estructura documental del bloque Q-Tr activo está presente y correctamente ubicada, pero la salida real no expone el valor del periodo de retorno activo ni el valor Q-Tr activo.

Esto impide que el expediente muestre completamente la trazabilidad hidrológica esperada del escenario Q-Tr desde el contexto de cuenca.

## Alcance mantenido

No se modificó código funcional.

No se modificó:

- Motor.
- UI.
- textoExpediente.
- ComparadorMultiMetodo.jsx.
- construirExpedienteHidrologicoMinimo.js.
- construirBloqueEscenarioQTrActivoExpediente.js.
- construirBloqueResumenQ5AuditadoExpediente.js.
- Helpers existentes.

No se recalculó Q-Tr.

No se seleccionó periodo de retorno adoptado.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0316 queda cerrada como revalidación con hallazgo. El siguiente frente debe corregir la trazabilidad de salida real del escenario Q-Tr activo, sin recalcular Q-Tr y sin seleccionar periodo de retorno adoptado.

## Próximo frente recomendado

OT-0317 — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente
