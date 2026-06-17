# OT-0197A — Decisión sobre helper Sello técnico auxiliar no integrado

## Objetivo

Tomar una decisión documental sobre el helper `construirLineasSelloTecnicoAuxiliarExpediente(...)`, identificado en OT-0196 como helper existente pero no integrado dentro de `textoExpediente`.

## Antecedente

OT-0195 seleccionó el bloque `Sello técnico auxiliar` como candidato representacional preliminar.

OT-0196 auditó su trazabilidad y confirmó que:

- `textoExpediente` existe;
- el cierre de `textoExpediente` existe;
- el helper `construirLineasSelloTecnicoAuxiliarExpediente(...)` existe;
- el helper se importa correctamente como función;
- la salida controlada no emite `undefined`, `null`, `NaN` ni `[object Object]`;
- no se confirmó uso del helper dentro de `textoExpediente`;
- no se localizó ruta operativa;
- no se confirmó paso de `contextoBase`;
- la salida controlada declara explícitamente `helper_no_integrado`.

## Alcance

Esta OT es exclusivamente documental y de decisión.

No implementa helper.

No integra helper.

No sustituye contenido.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

No modifica botón ni portapapeles.

## Hallazgo base

El helper existe, pero actualmente opera como auxiliar no integrado:

```text
Estado auxiliar helper expediente: helper_no_integrado.
```

## Opciones consideradas

| Opción | Riesgo | Lectura | Decisión |
|---|---|---|---|
| Integrar ahora en `textoExpediente` | Medio | Implicaría modificar ruta operativa sin necesidad demostrada | No recomendado |
| Descartar/eliminar helper | Medio | El helper existe y puede conservar valor documental o futuro | No recomendado |
| Conservar como auxiliar no operativo | Bajo | Mantiene trazabilidad sin añadir coste ni riesgo operativo | Recomendado |
| Reabrir como candidato futuro | Bajo/medio | Solo si se justifica necesidad documental real | Diferido |

## Decisión

Se decide conservar `construirLineasSelloTecnicoAuxiliarExpediente(...)` como helper auxiliar no operativo y no integrado.

No se integra en `textoExpediente` en este momento.

No se abre validación aislada operativa para este bloque porque no existe ruta operativa dentro del expediente.

No se sustituye contenido manual ni se modifica el flujo de copiado.

## Justificación

La decisión evita introducir coste operativo innecesario.

El helper no presenta residuos textuales en salida controlada, pero tampoco está conectado al expediente real.

Integrarlo ahora sería una ampliación funcional no solicitada y no demostrada como necesaria.

La ruta prudente es conservarlo como auxiliar documentado y volver a seleccionar un bloque representacional que sí esté integrado en `textoExpediente`.

## Restricciones mantenidas

No se modificó:

- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Estado consolidado

El bloque `Sello técnico auxiliar` no continúa por ahora hacia validación aislada operativa ni comparación controlada.

El helper queda reconocido como auxiliar no integrado, conservado sin intervención.

## Próximo frente recomendado

`OT-0198 — Selección prudente de bloque representacional integrado alternativo`
