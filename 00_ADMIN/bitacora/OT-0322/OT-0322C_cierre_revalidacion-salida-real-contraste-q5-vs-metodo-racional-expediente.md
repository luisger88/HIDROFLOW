# OT-0322C — Cierre Revalidación salida real Contraste Q-5 vs Método Racional

## Resultado

Se revalidó desde `main` la salida real/exportable del bloque `Contraste Q-5 vs Método Racional` del expediente hidrológico mínimo.

La revalidación confirmó que el bloque existe, aparece una sola vez, queda después del bloque `Método Racional`, queda antes del control de consistencia `Pe–Área–Volumen/Q-5`, declara que Q-5 y Método Racional son complementarios pero no equivalentes, no incrusta tablas de Q-5 ni Método Racional, no recalcula caudales y no selecciona método adoptado.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0322\OT-0322A_apertura_revalidacion-salida-real-contraste-q5-vs-metodo-racional-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0322\OT-0322B_revalidacion_salida_real_contraste_q5_vs_metodo_racional.md

Script de revalidación:

07_TOOLBOX\validaciones\validar_ot0322_contraste_q5_racional.mjs

## Resultado de validación

```json
{
  "validacion": "OT-0322",
  "bloque": "Contraste Q-5 vs Método Racional",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealContrasteQ5RacionalRevalidada": true,
  "buildAprobado": true,
  "recalculaQ5": false,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque revalidado

```text
## 8. Contraste Q-5 vs Método Racional
Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.
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

No se recalculó Q-5.

No se recalculó Método Racional.

No se seleccionó Método Racional como adoptado.

No se seleccionó caudal racional adoptado.

No se seleccionó método Q-5 adoptado.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0322 queda cerrada como revalidación limpia del bloque `Contraste Q-5 vs Método Racional` en salida real/exportable.

## Próximo frente recomendado

OT-0323 — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5
