# OT-0226B — Decisión de integración del helper restricciones y advertencias generales al expediente

## Objetivo

Decidir si procede integrar el helper `construirBloqueRestriccionesAdvertenciasGeneralesExpediente` al expediente hidrológico mínimo.

## Antecedente

El ciclo técnico-documental del helper quedó cerrado así:

- OT-0220: contrato del bloque de restricciones y advertencias generales;
- OT-0221: diseño del helper;
- OT-0222: implementación pura del helper;
- OT-0223: validación aislada con hallazgo;
- OT-0224: ajuste del criterio del validador;
- OT-0225: revalidación aislada aprobada.

## Estado actual del helper

El helper existe en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

La función exportada es:

```javascript
construirBloqueRestriccionesAdvertenciasGeneralesExpediente
```

## Resultado de revalidación aislada

OT-0225 confirmó:

```json
{
  "casos": 5,
  "casosAprobados": 5,
  "casosFallidos": 0,
  "revalidacionAisladaAprobada": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Lectura técnica

El helper queda validado como pieza documental pura.

Sin embargo, la integración al expediente operativo requiere cautela porque implicaría tocar el flujo de construcción documental.

La integración no debe realizarse directamente sin definir un punto único de acople y un criterio claro de no contaminación de bloques sensibles.

## Opciones consideradas

### Opción A — Integrar directamente al expediente

Ventaja: permite usar de inmediato el bloque general de restricciones y advertencias.

Riesgo: tocaría `construirExpedienteHidrologicoMinimo.js` sin una estrategia de acople previa.

### Opción B — No integrar y cerrar el ciclo

Ventaja: evita riesgo operativo.

Riesgo: deja un helper validado sin uso dentro del expediente.

### Opción C — Diseñar primero el punto de acople mínimo

Ventaja: mantiene control, define ubicación, entradas permitidas, restricciones y pruebas antes de tocar el expediente operativo.

Riesgo: agrega una OT documental adicional antes de la integración.

## Decisión recomendada

La decisión recomendada es no integrar todavía.

Antes de cualquier integración, debe diseñarse un punto de acople mínimo dentro del expediente hidrológico mínimo.

Ese diseño debe definir:

- ubicación exacta del bloque;
- entradas permitidas;
- textos por defecto;
- restricciones de no contaminación con Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe y masa;
- validaciones posteriores.

## Decisión operativa

Se selecciona como siguiente frente el diseño del punto de acople mínimo del helper al expediente.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica el helper.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0227 — Diseño punto de acople helper restricciones y advertencias generales al expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se integró el helper.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
