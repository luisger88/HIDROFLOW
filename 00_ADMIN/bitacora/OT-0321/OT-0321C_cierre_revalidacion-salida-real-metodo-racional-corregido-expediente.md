# OT-0321C — Cierre Revalidación salida real Método Racional corregido como contraste global independiente

## Resultado

Se revalidó desde `main` la corrección aplicada en OT-0320 sobre la salida real/exportable del bloque `Método Racional — contraste global independiente` del expediente hidrológico mínimo.

La revalidación confirmó que el bloque mantiene explícitamente su carácter no adoptivo principal, conserva separación frente a Q-5 y expone tabla racional cuando existen resultados disponibles en contexto.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0321\OT-0321A_apertura_revalidacion-salida-real-metodo-racional-corregido-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0321\OT-0321B_revalidacion_salida_real_metodo_racional_corregido_expediente.md

Script de revalidación:

07_TOOLBOX\validaciones\validar_ot0321_metodo_racional_revalidado.mjs

## Resultado de validación

```json
{
  "validacion": "OT-0321",
  "bloque": "Método Racional — contraste global independiente",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealMetodoRacionalRevalidada": true,
  "buildAprobado": true,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoRacionalAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque revalidado

```text
## 7. Método Racional — contraste global independiente
Uso: contraste global independiente de caudal pico.
Carácter: no adoptivo principal; requiere revisión técnica antes de adopción.
Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.

Tabla Método Racional:
| Tr | I | P | C | Q |
|---:|---:|---:|---:|---:|
| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |
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

No se recalculó Método Racional.

No se seleccionó Método Racional como adoptado.

No se seleccionó caudal racional adoptado.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0321 queda cerrada como revalidación limpia de la corrección del bloque Método Racional aplicada en OT-0320.

## Próximo frente recomendado

OT-0322 — Revalidación salida real Contraste Q-5 vs Método Racional
