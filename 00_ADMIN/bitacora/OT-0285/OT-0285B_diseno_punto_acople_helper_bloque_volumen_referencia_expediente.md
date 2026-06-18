# OT-0285B — Diseño punto de acople helper bloque Volumen de referencia del expediente

## Objetivo

Diseñar el punto de acople futuro del helper puro documental `construirBloqueVolumenReferenciaExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

OT-0284 aprobó habilitar la integración futura del helper `construirBloqueVolumenReferenciaExpediente` al expediente hidrológico mínimo.

La decisión fue documental y arquitectónica. No implementó acople, no modificó constructor, no modificó helper, no modificó comparador, no tocó motor y no recalculó volumen.

## Helper validado

Helper:

```text
construirBloqueVolumenReferenciaExpediente
```

Archivo:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js
```

Estado:

```text
Validado en aislamiento por OT-0283 con 19/19 controles aprobados.
```

## Punto de acople futuro propuesto

El acople futuro deberá realizarse dentro de:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

El acople deberá seguir el patrón ya usado para el bloque `Tiempo de concentración y roles Tc`:

```text
import del helper
↓
función auxiliar delegada
↓
uso de la función auxiliar en la salida real del constructor principal
↓
validación de ausencia de bloque inline antiguo
```

## Import futuro propuesto

Se propone agregar, en una OT posterior, el import:

```javascript
import { construirBloqueVolumenReferenciaExpediente } from "./construirBloqueVolumenReferenciaExpediente";
```

Este import no se agrega en OT-0285.

## Función auxiliar futura propuesta

Se propone que la función auxiliar `construirLineasVolumenReferenciaExpediente` delegue al helper validado:

```javascript
export function construirLineasVolumenReferenciaExpediente(entrada = {}) {
  return construirBloqueVolumenReferenciaExpediente({
    peTotalMm: entrada?.peTotalMm,
    volumenEsperadoM3: entrada?.volumenEsperadoM3,
    incluirTitulo: true
  });
}
```

Esta delegación no se implementa en OT-0285.

## Sustitución futura del bloque inline

En una OT posterior, la salida real del constructor principal deberá sustituir el bloque inline:

```javascript
"## 4. Volumen de referencia",
`Lluvia efectiva total: ${...}`,
`Volumen esperado: ${...}`,
"Fórmula: Pe(mm) × Área(km²) × 1000.",
```

por una llamada delegada a la función auxiliar:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm,
  volumenEsperadoM3
}),
```

Esta sustitución no se implementa en OT-0285.

## Variables de entrada futuras

El acople futuro podrá usar únicamente variables ya disponibles dentro del constructor principal:

- `peTotalMm`;
- `volumenEsperadoM3`.

No se deben introducir nuevas fuentes de cálculo.

No se debe recalcular volumen.

No se debe consultar motor.

No se debe usar información externa.

## SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO

La constante `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO` no debe contener llamadas al helper ni a la función auxiliar.

Debe permanecer como lista declarativa de secciones obligatorias.

## Controles futuros recomendados

Cuando se implemente el acople, deberá validarse:

- import del helper presente una sola vez;
- función auxiliar delega al helper;
- salida directa auxiliar usa el helper;
- constructor principal usa `construirLineasVolumenReferenciaExpediente`;
- salida real contiene `## 4. Volumen de referencia`;
- salida real conserva las líneas mínimas;
- salida real no contiene bloque inline antiguo;
- salida real no contiene tokens prohibidos;
- no se modifica motor;
- no se modifica comparador;
- no se recalcula volumen;
- build Vite aprobado.

## Frontera obligatoria

El acople futuro no debe tocar:

- Q-Tr;
- Q-5;
- Método Racional;
- Contraste Q-5 vs Método Racional;
- Control de consistencia cruzada Pe–Área–Volumen/Q-5;
- diagnóstico temporal Q(t);
- motor hidrológico;
- `ComparadorMultiMetodo.jsx`.

## Decisión de diseño

Se aprueba el diseño del punto de acople futuro del helper `construirBloqueVolumenReferenciaExpediente`.

El acople deberá realizarse en una OT posterior, de forma mínima y controlada.

No se autoriza acoplar el helper en esta OT.

No se autoriza modificar el constructor principal en esta OT.

No se autoriza modificar el helper en esta OT.

No se autoriza recalcular volumen en esta OT.

## Próximo frente recomendado

`OT-0286 — Acople mínimo helper bloque Volumen de referencia del expediente`

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
