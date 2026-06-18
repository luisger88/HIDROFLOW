# OT-0279B — Diseño helper bloque Volumen de referencia del expediente

## Objetivo

Diseñar el helper puro documental del bloque `Volumen de referencia` del expediente hidrológico mínimo.

## Antecedente

OT-0278 aprobó el contrato documental del bloque `## 4. Volumen de referencia`.

El contrato definió líneas mínimas, campos permitidos, campos no permitidos, reglas de fallback, formato documental, tokens prohibidos y frontera frente a Q-Tr, Q-5, Método Racional y diagnóstico Q(t).

## Helper futuro propuesto

Nombre del helper:

```text
construirBloqueVolumenReferenciaExpediente
```

Archivo futuro propuesto:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js
```

## Firma futura propuesta

```javascript
export function construirBloqueVolumenReferenciaExpediente(entrada = {})
```

## Entradas permitidas

El helper podrá recibir únicamente:

- `peTotalMm`;
- `volumenEsperadoM3`;
- `areaKm2`, solo como campo documental de trazabilidad si se requiere;
- `incluirTitulo`.

## Entradas no permitidas

El helper no deberá recibir ni manipular:

- hidrogramas;
- series Q(t);
- resultados Q-5;
- resultados Q-Tr;
- resultados del Método Racional;
- diagnóstico temporal Q(t);
- parámetros de selección de Tc;
- criterios de competencia hidrológica;
- insumos para recalcular CN, AMC, Pe, área o volumen.

## Salida esperada

El helper deberá devolver:

```javascript
string[]
```

## Líneas mínimas esperadas

Cuando `incluirTitulo` sea verdadero, la salida deberá incluir:

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor documental o fallback>
Volumen esperado: <valor documental o fallback>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

Cuando `incluirTitulo` sea falso, la salida podrá omitir únicamente el título, conservando las demás líneas mínimas.

## Normalización documental

El helper deberá normalizar valores de entrada sin mutarlos.

Un valor ausente, nulo, indefinido, vacío, no numérico o no finito deberá representarse como:

```text
—
```

## Formato de lluvia efectiva

Si `peTotalMm` es un número finito, deberá representarse con unidad:

```text
mm
```

Ejemplo documental:

```text
Lluvia efectiva total: 56,65 mm
```

El número de decimales podrá definirse durante la implementación, sin alterar el valor recibido.

## Formato de volumen esperado

Si `volumenEsperadoM3` es un número finito, deberá representarse con unidad:

```text
m³
```

Ejemplo documental:

```text
Volumen esperado: 2.654.251 m³
```

El separador de miles y el número de decimales podrán definirse durante la implementación, sin alterar el valor recibido.

## Fórmula textual

La salida deberá conservar la línea:

```text
Fórmula: Pe(mm) × Área(km²) × 1000.
```

Esta línea será explicativa y documental.

No deberá ejecutar recálculo.

No deberá modificar la fórmula del motor.

## Tokens prohibidos

La salida no deberá contener:

```text
undefined
null
NaN
[object Object]
```

## Reglas de pureza

El helper deberá ser puro:

- no mutar entradas;
- no consultar motor;
- no acceder a DOM;
- no acceder a portapapeles;
- no ejecutar efectos secundarios;
- no consultar datos externos;
- no modificar estado global;
- no recalcular volumen.

## Frontera con otros bloques

El helper deberá mantenerse separado de:

- `Escenario Q-Tr activo`;
- `Resumen Q-5 auditado`;
- `Método Racional`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`.

No deberá incluir lectura de Q-Tr.

No deberá incluir lectura de Q-5.

No deberá incluir contraste con Método Racional.

No deberá emitir juicio de consistencia Pe–Área–Volumen/Q-5.

No deberá incluir diagnóstico temporal Q(t).

## Diseño funcional futuro sugerido

La implementación futura podrá estructurarse así:

```javascript
function normalizarNumeroDocumental(valor) {
  // normaliza sin recalcular
}

function formatearLluviaEfectivaDocumental(valor) {
  // devuelve "—" o "<número> mm"
}

function formatearVolumenEsperadoDocumental(valor) {
  // devuelve "—" o "<número> m³"
}

export function construirBloqueVolumenReferenciaExpediente(entrada = {}) {
  const {
    peTotalMm,
    volumenEsperadoM3,
    incluirTitulo = true
  } = entrada ?? {};

  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 4. Volumen de referencia");
  }

  lineas.push(`Lluvia efectiva total: ${formatearLluviaEfectivaDocumental(peTotalMm)}`);
  lineas.push(`Volumen esperado: ${formatearVolumenEsperadoDocumental(volumenEsperadoM3)}`);
  lineas.push("Fórmula: Pe(mm) × Área(km²) × 1000.");

  return lineas;
}
```

Este diseño es orientativo.

No autoriza implementación en esta OT.

## Criterios de aceptación futuros

Cuando el helper sea implementado, deberá validarse que:

- el archivo existe;
- exporta `construirBloqueVolumenReferenciaExpediente`;
- devuelve `string[]`;
- incluye título cuando `incluirTitulo` es verdadero;
- omite únicamente el título cuando `incluirTitulo` es falso;
- conserva las líneas mínimas esperadas;
- aplica fallback `—` ante valores ausentes o inválidos;
- no emite tokens prohibidos;
- no muta entradas;
- no toca motor;
- no recalcula volumen;
- no mezcla Q-Tr, Q-5, Método Racional ni diagnóstico Q(t);
- el build permanece aprobado.

## Decisión de diseño

Se aprueba el diseño del helper puro documental `construirBloqueVolumenReferenciaExpediente`.

No se autoriza crear el archivo en esta OT.

No se autoriza implementar el helper en esta OT.

No se autoriza acoplar el helper en esta OT.

No se autoriza modificar el constructor principal en esta OT.

## Próximo frente recomendado

`OT-0280 — Implementación helper bloque Volumen de referencia del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se crea helper.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

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
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
