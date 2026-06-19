# OT-0324C — Cierre Corrección salida real Control Pe–Área–Volumen/Q-5

## Resultado

Se corrigió de forma mínima y controlada la salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` del expediente hidrológico mínimo.

La corrección permite que el bloque exponga datos ya disponibles en contexto: Pe total, Área, Volumen esperado, Método Q-5 principal, Volumen Q-5 principal, relación Q-5/esperado, resultado de consistencia volumétrica y Q-Tr activo.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0324\OT-0324A_apertura_correccion-salida-real-control-pe-area-volumen-q5-expediente.md

Documento de corrección y validación inline:

00_ADMIN\bitacora\OT-0324\OT-0324B_correccion_salida_real_control_pe_area_volumen_q5.md

## Resultado de validación

```json
{
  "validacion": "OT-0324",
  "bloque": "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealControlPeAreaVolumenQ5Corregida": true,
  "buildAprobado": true,
  "recalculaVolumen": false,
  "recalculaQ5": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque corregido extraído de salida real

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

## Cambios aplicados

Se modificó únicamente:

- `01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

El ajuste expone datos ya disponibles en contexto. No recalcula volumen ni Q-5.

## Alcance mantenido

No se modificó:

- Motor.
- UI.
- textoExpediente.
- ComparadorMultiMetodo.jsx.
- construirBloqueEscenarioQTrActivoExpediente.js.
- construirBloqueResumenQ5AuditadoExpediente.js.
- Helpers no relacionados.

No se creó helper funcional nuevo.

No se creó validador permanente nuevo.

No se recalculó volumen.

No se recalculó Q-5.

No se seleccionó método Q-5 adoptado.

No se seleccionó caudal Q-5 adoptado.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0324 queda cerrada como corrección mínima del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` en salida real/exportable.

## Próximo frente recomendado

OT-0325 — Revalidación salida real Control Pe–Área–Volumen/Q-5 corregido
