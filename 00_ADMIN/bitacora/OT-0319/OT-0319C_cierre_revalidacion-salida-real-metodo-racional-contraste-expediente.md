# OT-0319C — Cierre Revalidación salida real Método Racional como contraste global independiente

## Resultado

Se ejecutó la revalidación de la salida real/exportable del expediente hidrológico mínimo para el bloque `Método Racional — contraste global independiente`.

La revalidación confirmó que el bloque existe, aparece una sola vez, queda después del bloque `Resumen Q-5 auditado`, queda antes del bloque `Contraste Q-5 vs Método Racional`, se mantiene separado de Q-5, no contiene tokens inválidos y puede evaluarse sin modificar código funcional.

Sin embargo, la revalidación detectó dos brechas técnicas relevantes:

- El bloque no explicita suficientemente su carácter no adoptivo.
- El bloque no expone tabla racional aunque el contexto de prueba contiene resultados racionales disponibles.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0319\OT-0319A_apertura_revalidacion-salida-real-metodo-racional-contraste-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0319\OT-0319B_revalidacion_salida_real_metodo_racional_contraste_expediente.md

Script de revalidación:

07_TOOLBOX\validaciones\validar_ot0319_metodo_racional_contraste.mjs

## Resultado de controles

```json
{
  "validacion": "OT-0319",
  "bloque": "Método Racional — contraste global independiente",
  "totalControles": 17,
  "controlesAprobados": 15,
  "controlesFallidos": 2,
  "controlesFallidosIds": [
    "bloque_racional_no_adoptivo",
    "bloque_racional_expone_tabla_si_hay_resultados"
  ],
  "salidaRealMetodoRacionalRevalidada": false,
  "buildAprobado": true,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoRacionalAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque extraído de salida real

```text
## 7. Método Racional — contraste global independiente
Uso: contraste global independiente de caudal pico.
Estado: sección contractual inicial del helper puro.
```

## Hallazgos principales

### 1. Carácter no adoptivo insuficiente

El bloque declara que el Método Racional es un contraste global independiente, pero no deja explícito en la salida real que no debe adoptarse como método principal ni como caudal final sin revisión técnica.

### 2. Tabla racional no expuesta

El contexto de prueba contiene resultados racionales en `contextoBase.metodo_racional.resultados`, pero la salida real del bloque no expone una tabla racional.

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

OT-0319 queda cerrada como revalidación con hallazgo. El siguiente frente debe corregir la salida real del bloque Método Racional como contraste global independiente, sin recalcular Método Racional, sin adoptarlo como principal y sin mezclarlo con Q-5.

## Próximo frente recomendado

OT-0320 — Corrección salida real Método Racional como contraste global independiente
