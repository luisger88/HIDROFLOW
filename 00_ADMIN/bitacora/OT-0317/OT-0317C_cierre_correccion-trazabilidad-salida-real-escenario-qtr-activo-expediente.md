# OT-0317C — Cierre Corrección trazabilidad salida real Escenario Q-Tr activo del expediente

## Resultado

Se corrigió de forma mínima y controlada la trazabilidad de la salida real/exportable del bloque `Escenario Q-Tr activo` del expediente hidrológico mínimo.

La corrección permite que el bloque exponga explícitamente el periodo de retorno activo y el Q-Tr activo disponibles desde el contexto de cuenca.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0317\OT-0317A_apertura_correccion-trazabilidad-salida-real-escenario-qtr-activo-expediente.md

Documento de corrección y validación:

00_ADMIN\bitacora\OT-0317\OT-0317B_correccion_trazabilidad_salida_real_escenario_qtr_activo_expediente.md

Script de validación:

07_TOOLBOX\validaciones\validar_ot0317_correccion_qtr_activo.mjs

## Resultado de validación

```json
{
  "validacion": "OT-0317",
  "bloque": "Escenario Q-Tr activo",
  "totalControles": 10,
  "controlesAprobados": 10,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealQTrCorregida": true,
  "buildAprobado": true,
  "recalculaQTr": false,
  "seleccionaPeriodoRetornoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque corregido extraído de salida real

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: activo
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: 100
Q-Tr activo: Tr 100 años
```

## Cambios aplicados

Se modificó únicamente:

- `01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`
- `01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js`

## Alcance mantenido

No se modificó:

- Motor.
- UI.
- textoExpediente.
- ComparadorMultiMetodo.jsx.
- construirBloqueResumenQ5AuditadoExpediente.js.
- Helpers no relacionados con Q-Tr.

No se creó helper funcional nuevo.

No se recalculó Q-Tr.

No se seleccionó periodo de retorno adoptado.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0317 queda cerrada como corrección mínima de trazabilidad Q-Tr activo en salida real/exportable.

## Próximo frente recomendado

OT-0318 — Revalidación salida real Escenario Q-Tr activo corregido del expediente
