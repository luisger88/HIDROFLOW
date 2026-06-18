# OT-0304B — Contrato bloque Resumen Q-5 auditado del expediente

## Objetivo

Definir documentalmente el contrato del bloque `Resumen Q-5 auditado` del expediente hidrológico mínimo.

## Antecedente

OT-0303 seleccionó el bloque `Resumen Q-5 auditado` como siguiente frente documental del expediente hidrológico mínimo.

La selección se hizo después de estabilizar el bloque `Escenario Q-Tr activo — control de trazabilidad`, con criterio de continuidad documental, bajo coste técnico, trazabilidad y no intervención del motor hidrológico.

## Propósito del bloque

El bloque `Resumen Q-5 auditado` debe registrar documentalmente el estado resumido de los resultados Q-5 disponibles para el expediente.

Su propósito es resumen documental y trazabilidad, no cálculo hidrológico.

El bloque debe permitir saber si existen resultados Q-5 publicados al contexto del expediente y cuántos métodos fueron recibidos, sin recalcular, reinterpretar ni adoptar resultados.

## Título contractual

El bloque debe conservar el título:

```text
## 6. Resumen Q-5 auditado
```

## Alcance contractual

El bloque podrá informar:

- estado documental del resumen Q-5;
- cantidad de métodos Q-5 recibidos;
- lectura técnica de trazabilidad;
- indicación de si el bloque está reservado para integración posterior;
- datos disponibles si ya existen en el contexto documental;
- fallbacks documentales cuando la información no esté publicada.

## Entradas permitidas futuras

Una implementación futura del helper podrá recibir únicamente entradas documentales ya disponibles o explícitamente publicadas al contexto del expediente.

Entradas candidatas:

```text
metodosQ5
estadoResumenQ5AuditadoExpediente
faltantesResumenQ5AuditadoExpediente
incluirTitulo
```

Estas entradas no se implementan en OT-0304.

## Salida mínima esperada

El bloque deberá producir una salida tipo `string[]` con líneas documentales.

Salida mínima contractual:

```text
## 6. Resumen Q-5 auditado
Métodos recibidos: 0
Estado: sección contractual inicial del helper puro.
```

## Fallbacks documentales

Cuando no exista información publicada, el bloque debe usar fallbacks documentales explícitos.

Fallbacks mínimos:

- métodos recibidos: `0`;
- estado: `sección contractual inicial del helper puro`;
- valores no disponibles: `—`.

## Restricción crítica

El bloque no debe recalcular Q-5.

El bloque no debe recalcular hidrogramas.

El bloque no debe reinterpretar resultados Q-5.

El bloque no debe seleccionar método adoptado.

El bloque no debe seleccionar caudal adoptado.

El bloque no debe inferir suficiencia hidrológica.

El bloque no debe modificar motor.

El bloque no debe tocar Q-Tr.

El bloque no debe tocar Método Racional.

El bloque no debe tocar diagnóstico Q(t).

El bloque no debe emitir dictamen hidrológico.

## Diferencia entre resumen y adopción

Este bloque solo documenta resumen y trazabilidad de Q-5.

No adopta un método Q-5.

No adopta un caudal Q-5.

No decide suficiencia hidrológica.

No valida competencia técnica de los métodos.

No reemplaza bloques posteriores como Método Racional, contraste Q-5 vs Método Racional, consistencia cruzada Pe–Área–Volumen/Q-5 o diagnóstico temporal Q(t).

## Criterios de aceptación futura

Una futura implementación del helper deberá cumplir:

- exportar una función constructora pura;
- devolver `string[]`;
- aceptar título opcional mediante `incluirTitulo`;
- usar fallbacks documentales;
- no mutar entradas;
- no acceder a DOM;
- no acceder a portapapeles;
- no usar estado global;
- no recalcular Q-5;
- no recalcular hidrogramas;
- no reinterpretar resultados Q-5;
- no tocar motor;
- no generar tokens inválidos;
- poder validarse de forma aislada.

## Tokens prohibidos

La salida no debe contener:

```text
undefined
null
NaN
[object Object]
```

## Frontera frente a otros bloques

El contrato no autoriza modificar:

- `Escenario Q-Tr activo — control de trazabilidad`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión contractual

Se aprueba el contrato documental del bloque `Resumen Q-5 auditado`.

Esta decisión no implementa helper.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula Q-5.

No reinterpreta resultados Q-5.

No recalcula Q-Tr.

No recalcula volumen.

## Próximo frente recomendado

`OT-0305 — Diseño helper bloque Resumen Q-5 auditado del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

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
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se reinterpretaron resultados Q-5.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).
