# OT-0328C — Cierre Revalidación salida real Sello técnico de generación

## Resultado

Se revalidó desde `main` la salida real/exportable del bloque `Sello técnico de generación` del expediente hidrológico mínimo.

La revalidación confirmó que el bloque existe, aparece una sola vez, queda después de la `Validación interna del expediente exportado`, queda antes de `Restricciones y advertencias técnicas`, expone herramienta, tipo de salida, versión del expediente, fecha de generación y alcance.

Sin embargo, la revalidación detectó dos brechas técnicas:

- El bloque no expone explícitamente autor técnico, aunque se suministró `autorTecnico` en el contexto de prueba.
- El bloque no expone explícitamente `Tipo auxiliar`; actualmente muestra `Tipo de salida`, que no cumple literalmente el contrato evaluado.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0328\OT-0328A_apertura_revalidacion-salida-real-sello-tecnico-generacion-expediente.md

Documento de revalidación:

00_ADMIN\bitacora\OT-0328\OT-0328B_revalidacion_salida_real_sello_tecnico_generacion.md

## Resultado de validación

```json
{
  "validacion": "OT-0328",
  "bloque": "Sello técnico de generación",
  "totalControles": 16,
  "controlesAprobados": 14,
  "controlesFallidos": 2,
  "controlesFallidosIds": [
    "bloque_sello_expone_autor",
    "bloque_sello_expone_tipo_auxiliar"
  ],
  "salidaRealSelloTecnicoRevalidada": false,
  "buildAprobado": true,
  "recalculaResultados": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque extraído de salida real

```text
## 11. Sello técnico de generación
Herramienta: HidroFlow.
Tipo de salida: Expediente hidrológico mínimo.
Versión del expediente: OT-0328
Fecha de generación: OT-0328
Alcance: helper puro inicial no integrado al botón de copiado.
```

## Hallazgos principales

### 1. Autor técnico no expuesto

El bloque no muestra explícitamente el autor técnico del expediente.

### 2. Tipo auxiliar no expuesto literalmente

El bloque muestra `Tipo de salida`, pero no `Tipo auxiliar`, que era el campo esperado por el contrato de revalidación.

## Alcance mantenido

No se modificó código funcional.

No se modifició:

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

No se recalcularon resultados.

No se emitió dictamen de suficiencia hidrológica.

## Decisión

OT-0328 queda cerrada como revalidación con hallazgo. El siguiente frente debe corregir la salida real del bloque `Sello técnico de generación`, exponiendo autor técnico y tipo auxiliar, sin modificar motor, UI ni ComparadorMultiMetodo.jsx.

## Próximo frente recomendado

OT-0329 — Corrección salida real Sello técnico de generación
