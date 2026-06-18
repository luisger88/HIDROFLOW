# OT-0291B — Decisión estabilización bloque Volumen de referencia del expediente

## Objetivo

Documentar la decisión de estabilizar el bloque `Volumen de referencia` del expediente hidrológico mínimo.

## Antecedente

El bloque `Volumen de referencia` fue trabajado mediante una secuencia completa y controlada:

- OT-0277: selección del bloque documental siguiente.
- OT-0278: contrato documental del bloque.
- OT-0279: diseño del helper puro documental.
- OT-0280: implementación aislada del helper.
- OT-0281: validación aislada con hallazgo textual.
- OT-0282: corrección textual quirúrgica del helper.
- OT-0283: revalidación aislada limpia.
- OT-0284: decisión de integración futura.
- OT-0285: diseño del punto de acople.
- OT-0286: acople mínimo del helper.
- OT-0287: validación del acople con hallazgo.
- OT-0288: corrección del paso documental de valores.
- OT-0289: revalidación limpia del acople.
- OT-0290: revalidación limpia de la salida real/exportable.

## Evidencia principal

OT-0290 cerró con salida real revalidada:

```json
{
  "validacion": "OT-0290",
  "bloque": "Volumen de referencia",
  "totalControles": 16,
  "controlesAprobados": 16,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "salidaRealVolumenRevalidada": true,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Evidencia de salida real

La salida real/exportable conserva el bloque:

```text
## 4. Volumen de referencia
Lluvia efectiva total: 56,65 mm
Volumen esperado: 2.654.251 m³
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Condiciones estabilizadas

Quedan estabilizadas las siguientes condiciones:

- el helper `construirBloqueVolumenReferenciaExpediente` existe y fue validado en aislamiento;
- el helper se encuentra acoplado mediante función auxiliar;
- el constructor principal usa `construirLineasVolumenReferenciaExpediente`;
- el bloque inline antiguo fue sustituido;
- el bloque aparece exactamente una vez en la salida real;
- el bloque aparece después de `Tiempo de concentración y roles Tc` y antes de `Escenario Q-Tr activo`;
- la salida real conserva `Lluvia efectiva total: 56,65 mm`;
- la salida real conserva `Volumen esperado: 2.654.251 m³`;
- la fórmula textual se conserva;
- no hay tokens inválidos en el bloque;
- no se recalcula volumen;
- no se modifica motor;
- no participa `ComparadorMultiMetodo.jsx`.

## Decisión

Se aprueba estabilizar el bloque `Volumen de referencia` del expediente hidrológico mínimo.

Esta decisión es documental y de cierre técnico del bloque.

No implementa cambios funcionales.

No modifica el constructor principal.

No modifica el helper.

No modifica comparador.

No modifica motor.

No recalcula volumen.

## Estado del bloque

```text
ESTABILIZADO
```

## Frontera mantenida

La estabilización no autoriza:

- recalcular volumen;
- modificar Pe;
- modificar área;
- modificar fórmula de volumen;
- tocar motor;
- tocar Q-Tr;
- tocar Q-5;
- tocar Método Racional;
- tocar diagnóstico Q(t);
- emitir dictamen hidrológico.

## Próximo frente recomendado

`OT-0292 — Selección siguiente bloque documental del expediente hidrológico mínimo`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueVolumenReferenciaExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueVolumenReferenciaExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
