# OT-0284B — Decisión integración helper bloque Volumen de referencia del expediente

## Objetivo

Documentar la decisión de habilitar la integración futura del helper puro documental `construirBloqueVolumenReferenciaExpediente` al expediente hidrológico mínimo.

## Antecedente

El bloque `Volumen de referencia` fue trabajado mediante una secuencia controlada de OTs:

- OT-0277: selección del bloque documental siguiente.
- OT-0278: contrato documental del bloque.
- OT-0279: diseño del helper puro documental.
- OT-0280: implementación aislada del helper.
- OT-0281: validación aislada con hallazgo textual.
- OT-0282: corrección textual quirúrgica del helper.
- OT-0283: revalidación aislada limpia.

## Evidencia principal

OT-0283 cerró con revalidación aprobada:

```json
{
  "validacion": "OT-0283",
  "helper": "construirBloqueVolumenReferenciaExpediente",
  "totalControles": 19,
  "controlesAprobados": 19,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "helperValidadoAislado": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Helper validado

Helper:

```text
construirBloqueVolumenReferenciaExpediente
```

Archivo:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js
```

## Condiciones verificadas

La revalidación confirmó:

- archivo del helper existente;
- import del módulo sin error runtime;
- exportación de `construirBloqueVolumenReferenciaExpediente`;
- exportación de `formatearLluviaEfectivaDocumental`;
- exportación de `formatearVolumenEsperadoDocumental`;
- salida con título como `string[]`;
- conservación de líneas mínimas;
- salida sin título omitiendo únicamente el título;
- lluvia válida formateada como `56,65 mm`;
- volumen válido formateado como `2.654.251 m³`;
- fallback documental `—` para lluvia inválida;
- fallback documental `—` para volumen inválido;
- casos inválidos sin ruptura y con fallback;
- salida válida sin tokens prohibidos;
- salidas fallback sin tokens prohibidos;
- no mutación de entrada;
- fuente sin referencias operativas prohibidas;
- ausencia de recálculo explícito de volumen;
- build Vite aprobado.

## Decisión

Se aprueba habilitar la integración futura del helper `construirBloqueVolumenReferenciaExpediente` al expediente hidrológico mínimo.

Esta decisión es documental y arquitectónica.

No implementa acople en esta OT.

No modifica el constructor principal en esta OT.

No modifica el helper en esta OT.

No modifica comparador.

No modifica motor.

No recalcula volumen.

No modifica Pe.

No modifica área.

No modifica fórmula de volumen.

## Criterio de integración futura

La integración futura deberá seguir el patrón seguro ya usado para el bloque `Tiempo de concentración y roles Tc`:

```text
Diseño punto de acople
↓
Acople mínimo mediante función auxiliar
↓
Validación del acople auxiliar
↓
Corrección salida real, si aplica
↓
Revalidación salida real
↓
Decisión de estabilización
```

## Frontera obligatoria del acople futuro

El acople futuro deberá respetar:

- no recalcular volumen;
- no modificar motor;
- no consultar datos externos;
- no tocar comparador;
- no tocar Q-Tr;
- no tocar Q-5;
- no tocar Método Racional;
- no tocar diagnóstico Q(t);
- no emitir dictamen hidrológico;
- no modificar bloques ya estabilizados.

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se acopla el helper.

No se modifica `construirBloqueVolumenReferenciaExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0285 — Diseño punto de acople helper bloque Volumen de referencia del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueVolumenReferenciaExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
