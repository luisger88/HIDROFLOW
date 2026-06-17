# OT-0217B — Decisión sobre consolidación documental de restricciones y advertencias del expediente

## Objetivo

Decidir si conviene consolidar documentalmente restricciones y advertencias del expediente hidrológico mínimo con base en la auditoría OT-0216.

## Antecedente

OT-0216 ejecutó una auditoría documental de restricciones, advertencias, notas, criterios de cautela y mensajes de no adopción dentro del expediente hidrológico mínimo.

La auditoría revisó:

- `01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`;
- `01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx`.

## Resultado de la auditoría OT-0216

La auditoría identificó:

```json
{
  "archivosRevisados": 2,
  "archivosExistentes": 2,
  "totalCoincidencias": 207,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Lectura de la evidencia

La evidencia muestra que existen múltiples referencias dispersas relacionadas con:

- restricciones;
- advertencias técnicas;
- notas;
- criterios de cautela;
- mensajes de no adopción;
- validaciones internas;
- Q-5;
- Método Racional;
- diagnóstico temporal Q(t);
- criterios comparativos o referenciales.

## Riesgo de consolidar directamente

Una consolidación directa en este momento puede generar riesgos:

- duplicar advertencias ya existentes;
- alterar mensajes técnicos sin clasificación previa;
- mezclar restricciones documentales con restricciones hidrológicas sensibles;
- tocar indirectamente Q-5, Método Racional o diagnóstico Q(t);
- modificar `textoExpediente` sin una clasificación previa de la evidencia.

## Opciones consideradas

### Opción A — Consolidar inmediatamente restricciones y advertencias

Ventaja: mejora rápida de la legibilidad del expediente.

Riesgo: alto, porque hay 207 coincidencias y podrían mezclarse categorías distintas.

### Opción B — No consolidar y cerrar el frente

Ventaja: evita riesgo operativo.

Riesgo: deja dispersa la evidencia identificada por OT-0216.

### Opción C — Clasificar primero la evidencia antes de consolidar

Ventaja: permite separar restricciones, advertencias, notas, mensajes no adoptivos, referencias Q-5/Racional/Q(t) y criterios de validación.

Riesgo: agrega una OT documental adicional antes de una posible consolidación.

## Decisión recomendada

La decisión recomendada es no consolidar todavía.

Antes de cualquier ajuste o consolidación en el expediente, se debe clasificar documentalmente la evidencia encontrada en OT-0216.

## Decisión operativa

Se selecciona como siguiente frente una clasificación documental de las restricciones y advertencias detectadas.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0218 — Clasificación documental de restricciones y advertencias del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
