# OT-0213B — Decisión de siguiente automatización documental mínima

## Objetivo

Definir el siguiente paso tras validar el uso repetible de `Nueva-OTDocumentalHidroFlow` en OTs documentales mínimas no sensibles.

## Estado actual

El ciclo de herramienta documental mínima quedó cerrado así:

- OT-0207: generador documental mínimo creado;
- OT-0208: validación operativa con hallazgo;
- OT-0209: ajuste mínimo Markdown;
- OT-0210: revalidación operativa aprobada;
- OT-0211: protocolo operativo mínimo;
- OT-0212: uso repetible aprobado.

## Capacidades actuales confirmadas

`Nueva-OTDocumentalHidroFlow` permite:

- crear carpeta `00_ADMIN/bitacora/OT-XXXX`;
- crear apertura documental mínima;
- crear cierre documental mínimo;
- registrar restricciones;
- sugerir comandos Git;
- operar sin ejecutar commits automáticos;
- operar sin tocar motor ni expediente operativo.

## Opciones consideradas

### Opción A — Cerrar fase tooling y volver al expediente

Ventaja: permite retomar bloques pendientes del expediente con menor fricción.

Riesgo: el generador aún solo cubre apertura/cierre, no auditorías ni validaciones.

### Opción B — Mejorar ligeramente el generador

Ventaja: permitiría agregar campos como tipo de OT, archivos críticos o plantilla de validación.

Riesgo: puede iniciar sobrediseño si no se controla el alcance.

### Opción C — Crear utilidad complementaria para verificación post-generación

Ventaja: automatiza chequeos repetitivos sin tocar motor ni Git.

Riesgo: añade otra herramienta que también debe validarse.

### Opción D — Usar el generador en una OT documental real no sensible

Ventaja: prueba valor práctico inmediato en flujo real.

Riesgo: si se elige mal el tema, puede abrir alcance técnico sensible.

## Decisión recomendada

La decisión recomendada es cerrar la fase tooling mínima y volver al expediente solo con OTs documentales o de decisión no sensibles.

No se recomienda mejorar más el generador en este momento.

No se recomienda automatizar commits.

No se recomienda tocar el perfil PowerShell.

No se recomienda entrar todavía a Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t) mediante automatización.

## Justificación

El generador ya cumplió el objetivo inicial: reducir fricción documental mínima sin modificar código operativo.

Seguir ampliándolo ahora puede recrear el mismo problema de coste operativo que se buscaba resolver.

La utilidad actual es suficiente para reducir pegado manual en aperturas/cierres documentales controlados.

## Decisión operativa

Se cierra la fase de tooling documental mínimo.

Se conserva `Nueva-OTDocumentalHidroFlow` como herramienta de apoyo documental cargada manualmente.

Se vuelve al expediente con menor fricción, sin usar todavía automatización sobre bloques sensibles.

## Próximo frente recomendado

`OT-0214 — Cierre de fase tooling documental mínimo y retorno controlado al expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se automatizaron commits.
- No se tocaron bloques sensibles del expediente.
