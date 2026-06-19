# OT-0325C — Cierre Revalidación salida real Control Pe–Área–Volumen/Q-5 corregido

## Resultado

Se revalidó desde `main` la corrección aplicada en OT-0324 sobre la salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` del expediente hidrológico mínimo.

La revalidación confirmó que el bloque conserva Pe total, Área, Volumen esperado, Método Q-5 principal, Volumen Q-5 principal, relación Q-5/esperado, resultado de consistencia volumétrica y Q-Tr activo.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0325\OT-0325A_apertura_revalidacion-salida-real-control-pe-area-volumen-q5-corregido-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0325\OT-0325B_revalidacion_salida_real_control_pe_area_volumen_q5_corregido.md

## Resultado de validación

```json
{
  "validacion": "OT-0325",
  "bloque": "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealControlPeAreaVolumenQ5Revalidada": true,
  "buildAprobado": true,
  "recalculaVolumen": false,
  "recalculaQ5": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque revalidado

```text
## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5
Lectura técnica: control interno preliminar de consistencia volumétrica; no recalcula volumen, no recalcula Q-5 y no selecciona método adoptado.
Pe total: 56,65 mm
Área: 46,8516 km²
Volumen esperado: 2.654.250,9 m³
Método Q-5 principal: SCS Unit Hydrograph
Volumen Q-5 principal: 2.654.250,9 m³
Relación volumen Q-5 / volumen esperado: 1
Resultado de consistencia volumétrica: relación volumétrica documentada para control interno preliminar
Q-Tr activo: Tr 100 años
```

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

No se creó helper funcional nuevo.

No se creó validador permanente nuevo.

No se recalculó volumen.

No se recalculó Q-5.

No se seleccionó método adoptado.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0325 queda cerrada como revalidación limpia de la corrección del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` aplicada en OT-0324.

## Próximo frente recomendado

OT-0326 — Revalidación salida real Diagnóstico temporal Q(t) no adoptivo
