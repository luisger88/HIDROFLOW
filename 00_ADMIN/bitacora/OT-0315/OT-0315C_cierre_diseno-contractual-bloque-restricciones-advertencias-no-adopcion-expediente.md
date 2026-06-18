# OT-0315C — Cierre Diseño contractual del bloque Restricciones, advertencias y no adopción automática del expediente

## Resultado

Se documentó el contrato del futuro helper puro para el bloque `Restricciones, advertencias y no adopción automática` del expediente hidrológico mínimo.

## Evidencia principal

Documento de apertura:

00_ADMIN\bitacora\OT-0315\OT-0315A_apertura_diseno-contractual-bloque-restricciones-advertencias-no-adopcion-expediente.md

Documento de diseño contractual:

00_ADMIN\bitacora\OT-0315\OT-0315B_diseno_contractual_bloque_restricciones_advertencias_no_adopcion_expediente.md

## Decisión contractual

Se define como helper candidato:

`construirBloqueRestriccionesAdvertenciasGeneralesExpediente`

Se define como encabezado esperado:

`## 10. Restricciones, advertencias y no adopción automática`

La salida futura esperada será `string[]`.

## Alcance mantenido

No se modificó código funcional.

No se modificó:

- Motor.
- UI.
- textoExpediente.
- ComparadorMultiMetodo.jsx.
- construirExpedienteHidrologicoMinimo.js.
- construirBloqueResumenQ5AuditadoExpediente.js.
- Helpers existentes.
- Validadores existentes.

No se creó helper funcional.

No se creó archivo funcional nuevo.

No se creó script de validación.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se emitió dictamen de suficiencia hidrológica.

## Próximo frente recomendado

OT-0316 — Helper puro bloque Restricciones, advertencias y no adopción automática del expediente

## Decisión

OT-0315 queda cerrada como diseño contractual. Cualquier implementación posterior debe realizarse mediante una OT explícita.
