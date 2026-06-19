# OT-0323C — Cierre Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5

## Resultado

Se ejecutó la revalidación de la salida real/exportable del expediente hidrológico mínimo para el bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5`.

La revalidación confirmó que el bloque existe, aparece una sola vez, queda después del bloque `Contraste Q-5 vs Método Racional`, queda antes del `Diagnóstico temporal Q(t) no adoptivo`, no contiene tokens inválidos, no modifica código funcional, no recalcula volumen, no recalcula Q-5, no modifica motor y no modifica UI.

Sin embargo, la revalidación detectó tres brechas técnicas relevantes:

- El bloque no expone explícitamente Pe, Área y Volumen esperado, aunque esos datos se suministran al constructor en el contexto de prueba.
- El bloque no expone Método Q-5 principal, Volumen Q-5 principal ni relación Q-5/esperado, aunque existen datos Q-5 disponibles en la entrada de prueba.
- El bloque no conserva referencia al Q-Tr activo como parte del control cruzado.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0323\OT-0323A_apertura_revalidacion-salida-real-control-pe-area-volumen-q5-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0323\OT-0323B_revalidacion_salida_real_control_pe_area_volumen_q5.md

Script de revalidación:

07_TOOLBOX\validaciones\validar_ot0323_control_pe_area_volumen_q5.mjs

## Resultado de controles

```json
{
  "validacion": "OT-0323",
  "bloque": "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "totalControles": 18,
  "controlesAprobados": 15,
  "controlesFallidos": 3,
  "controlesFallidosIds": [
    "bloque_control_expone_pe_area_volumen",
    "bloque_control_expone_q5_principal",
    "bloque_control_expone_qtr_activo"
  ],
  "salidaRealControlPeAreaVolumenQ5Revalidada": false,
  "buildAprobado": true,
  "recalculaVolumen": false,
  "recalculaQ5": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque extraído de salida real

```text
## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5
Estado: pendiente de integración completa con datos derivados del expediente operativo.
```

## Hallazgos principales

### 1. Pe–Área–Volumen no expuesto

El bloque no muestra explícitamente Pe total, Área ni Volumen esperado, aunque son datos necesarios para el control físico básico del volumen.

### 2. Q-5 principal no expuesto

El bloque no muestra Método Q-5 principal, Volumen Q-5 principal ni relación volumen Q-5 / volumen esperado.

### 3. Q-Tr activo no referenciado

El bloque no conserva referencia al Q-Tr activo dentro del control cruzado, aunque este dato ya fue corregido y revalidado en OTs anteriores.

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

No se recalculó volumen.

No se recalculó Q-5.

No se seleccionó método Q-5 adoptado.

No se seleccionó caudal Q-5 adoptado.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0323 queda cerrada como revalidación con hallazgo. El siguiente frente debe corregir la salida real del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5`, exponiendo datos ya disponibles en contexto, sin recalcular volumen, sin recalcular Q-5 y sin modificar motor, UI ni ComparadorMultiMetodo.jsx.

## Próximo frente recomendado

OT-0324 — Corrección salida real Control Pe–Área–Volumen/Q-5
