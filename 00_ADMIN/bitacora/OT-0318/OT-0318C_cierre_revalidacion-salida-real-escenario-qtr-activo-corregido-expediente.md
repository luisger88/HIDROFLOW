# OT-0318C — Cierre Revalidación salida real Escenario Q-Tr activo corregido del expediente

## Resultado

Se revalidó desde `main` la corrección aplicada en OT-0317 sobre la salida real/exportable del bloque `Escenario Q-Tr activo` del expediente hidrológico mínimo.

La revalidación confirmó que la salida mantiene explícitamente el periodo de retorno activo y el Q-Tr activo, sin regresar al fallback documental.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0318\OT-0318A_apertura_revalidacion-salida-real-escenario-qtr-activo-corregido-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0318\OT-0318B_revalidacion_salida_real_escenario_qtr_activo_corregido_expediente.md

Validador reutilizado:

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

## Bloque revalidado

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: activo
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: 100
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

No se recalculó Q-Tr.

No se seleccionó periodo de retorno adoptado.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0318 queda cerrada como revalidación limpia de la corrección Q-Tr activo aplicada en OT-0317.

## Próximo frente recomendado

OT-0319 — Revalidación salida real Método Racional como contraste global independiente
