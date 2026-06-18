# OT-0294B — Diseño helper bloque Escenario Q-Tr activo del expediente

## Objetivo

Diseñar documentalmente el helper puro del bloque `Escenario Q-Tr activo — control de trazabilidad` del expediente hidrológico mínimo.

## Antecedente

OT-0293 definió el contrato documental del bloque `Escenario Q-Tr activo — control de trazabilidad`.

El contrato estableció que el bloque debe registrar trazabilidad documental del escenario Q-Tr activo sin recalcular Q-Tr, sin seleccionar Tr adoptado, sin tocar motor y sin emitir dictamen hidrológico.

## Nombre del helper futuro

Se propone el helper:

```text
construirBloqueEscenarioQTrActivoExpediente
```

## Archivo futuro propuesto

El helper futuro deberá ubicarse en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js
```

Este archivo no se crea en OT-0294.

## Firma propuesta

La función principal futura deberá tener la firma:

```javascript
export function construirBloqueEscenarioQTrActivoExpediente(entrada = {}) {
  // implementación futura
}
```

## Entradas propuestas

El helper podrá recibir:

```javascript
{
  estadoQTrActivoExpediente,
  qTrActivoExpediente,
  faltantesQTrActivoExpediente,
  trDisenoActivoExpediente,
  incluirTitulo = true
}
```

## Normalización esperada

La implementación futura deberá normalizar la entrada para evitar rupturas por valores ausentes, cadenas vacías o tipos no esperados.

Reglas esperadas:

- si `entrada` no es objeto, usar `{}`;
- si `estadoQTrActivoExpediente` no existe, usar estado documental `no_publicado`;
- si un valor documental no existe, usar fallback `—`;
- si `faltantesQTrActivoExpediente` no es arreglo, tratarlo como arreglo vacío;
- no mutar la entrada original.

## Salida propuesta

El helper debe devolver `string[]`.

Salida mínima con título:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: no_publicado
Lectura técnica: bloque reservado para integración posterior sin recálculo.
```

Salida mínima sin título:

```text
Estado: no_publicado
Lectura técnica: bloque reservado para integración posterior sin recálculo.
```

## Fallbacks documentales

Fallbacks esperados:

- estado: `no_publicado`;
- lectura técnica: `bloque reservado para integración posterior sin recálculo`; 
- valores ausentes: `—`.

## Exportaciones futuras

El archivo podrá exportar:

```javascript
export function construirBloqueEscenarioQTrActivoExpediente(entrada = {}) {}
export function normalizarEstadoQTrActivoDocumental(valor) {}
export function formatearValorQTrActivoDocumental(valor) {}
```

Las funciones auxiliares futuras deberán ser puras.

## Restricciones técnicas

El helper no debe:

- recalcular Q-Tr;
- seleccionar periodo de retorno adoptado;
- inferir caudales;
- modificar motor;
- tocar Q-5;
- tocar Método Racional;
- tocar diagnóstico Q(t);
- emitir dictamen hidrológico;
- acceder a DOM;
- acceder a portapapeles;
- usar estado global;
- mutar entradas.

## Tokens prohibidos

La salida no debe contener:

```text
undefined
null
NaN
[object Object]
```

## Validación aislada futura

La validación aislada futura deberá comprobar:

- archivo del helper existe;
- módulo importa sin error runtime;
- exporta `construirBloqueEscenarioQTrActivoExpediente`;
- salida con título devuelve `string[]`;
- salida sin título omite solo el título;
- fallback `no_publicado` cuando no hay estado;
- fallback `—` para valores ausentes;
- no muta entrada;
- no contiene tokens prohibidos;
- fuente sin recálculo Q-Tr;
- fuente sin referencias operativas a Q-5, Método Racional o diagnóstico Q(t);
- build Vite aprobado.

## Integración futura esperada

La integración futura deberá seguir el patrón usado en bloques anteriores:

```text
contrato
↓
diseño helper
↓
implementación aislada
↓
validación aislada
↓
decisión integración
↓
diseño acople
↓
acople mínimo
↓
validación/revalidación
↓
estabilización
```

## Frontera frente a otros bloques

El diseño no autoriza modificar:

- `Volumen de referencia`;
- `Resumen Q-5 auditado`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión de diseño

Se aprueba el diseño documental del helper `construirBloqueEscenarioQTrActivoExpediente`.

Esta decisión no implementa el helper.

No crea archivo funcional.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula Q-Tr.

No selecciona periodo de retorno adoptado.

No recalcula volumen.

## Próximo frente recomendado

`OT-0295 — Implementación helper bloque Escenario Q-Tr activo del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se crea `construirBloqueEscenarioQTrActivoExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se selecciona Tr adoptado.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se implementó helper.
- No se creó archivo funcional nuevo.
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se seleccionó Tr adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).
