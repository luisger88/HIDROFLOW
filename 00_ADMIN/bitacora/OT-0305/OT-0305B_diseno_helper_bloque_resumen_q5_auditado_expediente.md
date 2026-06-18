# OT-0305B — Diseño helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Diseñar documentalmente el helper puro del bloque `Resumen Q-5 auditado` del expediente hidrológico mínimo.

## Antecedente

OT-0304 definió el contrato documental del bloque `Resumen Q-5 auditado`.

El contrato estableció que el bloque debe registrar resumen documental y trazabilidad de Q-5, sin recalcular Q-5, sin reinterpretar resultados, sin adoptar método o caudal, sin tocar motor y sin emitir dictamen hidrológico.

## Nombre del helper futuro

Se propone el helper:

```text
construirBloqueResumenQ5AuditadoExpediente
```

## Archivo futuro propuesto

El helper futuro deberá ubicarse en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js
```

Este archivo no se crea en OT-0305.

## Firma propuesta

La función principal futura deberá tener la firma:

```javascript
export function construirBloqueResumenQ5AuditadoExpediente(entrada = {}) {
  // implementación futura
}
```

## Entradas propuestas

El helper podrá recibir:

```javascript
{
  metodosQ5,
  estadoResumenQ5AuditadoExpediente,
  faltantesResumenQ5AuditadoExpediente,
  incluirTitulo = true
}
```

## Normalización esperada

La implementación futura deberá normalizar la entrada para evitar rupturas por valores ausentes, cadenas vacías o tipos no esperados.

Reglas esperadas:

- si `entrada` no es objeto, usar `{}`;
- si `metodosQ5` no es arreglo, tratarlo como arreglo vacío;
- si `estadoResumenQ5AuditadoExpediente` no existe, usar `sección contractual inicial del helper puro`;
- si `faltantesResumenQ5AuditadoExpediente` no es arreglo, tratarlo como arreglo vacío;
- si un valor documental no existe, usar fallback `—`;
- no mutar la entrada original.

## Salida propuesta

El helper debe devolver `string[]`.

Salida mínima con título:

```text
## 6. Resumen Q-5 auditado
Métodos recibidos: 0
Estado: sección contractual inicial del helper puro.
```

Salida mínima sin título:

```text
Métodos recibidos: 0
Estado: sección contractual inicial del helper puro.
```

## Fallbacks documentales

Fallbacks esperados:

- métodos recibidos: `0`;
- estado: `sección contractual inicial del helper puro`;
- valores ausentes: `—`.

## Exportaciones futuras

El archivo podrá exportar:

```javascript
export function construirBloqueResumenQ5AuditadoExpediente(entrada = {}) {}
export function contarMetodosQ5Documentales(metodosQ5) {}
export function formatearValorResumenQ5Documental(valor) {}
export function normalizarEstadoResumenQ5AuditadoDocumental(valor) {}
```

Las funciones auxiliares futuras deberán ser puras.

## Restricciones técnicas

El helper no debe:

- recalcular Q-5;
- recalcular hidrogramas;
- reinterpretar resultados Q-5;
- seleccionar método Q-5 adoptado;
- seleccionar caudal Q-5 adoptado;
- inferir suficiencia hidrológica;
- modificar motor;
- tocar Q-Tr;
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
- exporta `construirBloqueResumenQ5AuditadoExpediente`;
- salida con título devuelve `string[]`;
- salida sin título omite solo el título;
- fallback de métodos recibidos en `0` cuando no hay arreglo;
- fallback de estado contractual inicial cuando no hay estado;
- fallback `—` para valores ausentes;
- no muta entrada;
- no contiene tokens prohibidos;
- fuente sin recálculo Q-5;
- fuente sin reinterpretación Q-5;
- fuente sin referencias operativas a motor, Q-Tr, Método Racional o diagnóstico Q(t);
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

- `Escenario Q-Tr activo — control de trazabilidad`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión de diseño

Se aprueba el diseño documental del helper `construirBloqueResumenQ5AuditadoExpediente`.

Esta decisión no implementa el helper.

No crea archivo funcional.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula Q-5.

No reinterpreta resultados Q-5.

No recalcula Q-Tr.

No recalcula volumen.

## Próximo frente recomendado

`OT-0306 — Implementación helper bloque Resumen Q-5 auditado del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se crea `construirBloqueResumenQ5AuditadoExpediente.js`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se recalcula Q-Tr.

No se recalcula Q-5.

No se reinterpretan resultados Q-5.

No se recalcula volumen.

No se modifica `Tc_final`.

No se emite dictamen hidrológico.

No se tocan Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).

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
- No se recalculó Q-5.
- No se reinterpretaron resultados Q-5.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).
