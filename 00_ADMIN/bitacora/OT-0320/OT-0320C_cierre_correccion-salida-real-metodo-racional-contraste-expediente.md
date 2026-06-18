# OT-0320C — Cierre Corrección salida real Método Racional como contraste global independiente

## Resultado

Se corrigió de forma mínima y controlada la salida real/exportable del bloque `Método Racional — contraste global independiente` del expediente hidrológico mínimo.

La corrección permite que el bloque explicite su carácter no adoptivo principal y exponga tabla racional cuando existan resultados disponibles en contexto.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0320\OT-0320A_apertura_correccion-salida-real-metodo-racional-contraste-expediente.md

Documento de corrección y validación:

00_ADMIN\bitacora\OT-0320\OT-0320B_correccion_salida_real_metodo_racional_contraste_expediente.md

Script de validación:

07_TOOLBOX\validaciones\validar_ot0320_metodo_racional_corregido.mjs

## Resultado de validación

```json
{
  "validacion": "OT-0320",
  "bloque": "Método Racional — contraste global independiente",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealMetodoRacionalCorregida": true,
  "buildAprobado": true,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoRacionalAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque corregido extraído de salida real

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

## Cambios aplicados

Se modificó únicamente:

- `01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

El ajuste agrega formato documental y tabla del Método Racional desde resultados ya disponibles en contexto.

## Alcance mantenido

No se modificó:

- Motor.
- UI.
- textoExpediente.
- ComparadorMultiMetodo.jsx.
- construirBloqueEscenarioQTrActivoExpediente.js.
- construirBloqueResumenQ5AuditadoExpediente.js.
- Helpers no relacionados con Método Racional.

No se creó helper funcional nuevo.

No se recalculó Método Racional.

No se seleccionó Método Racional como adoptado.

No se seleccionó caudal racional adoptado.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0320 queda cerrada como corrección mínima del bloque Método Racional como contraste global independiente en salida real/exportable.

## Próximo frente recomendado

OT-0321 — Revalidación salida real Método Racional corregido como contraste global independiente
