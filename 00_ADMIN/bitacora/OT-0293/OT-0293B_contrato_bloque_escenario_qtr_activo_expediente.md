# OT-0293B — Contrato bloque Escenario Q-Tr activo del expediente

## Objetivo

Definir documentalmente el contrato del bloque `Escenario Q-Tr activo — control de trazabilidad` del expediente hidrológico mínimo.

## Antecedente

OT-0292 seleccionó el bloque `Escenario Q-Tr activo — control de trazabilidad` como siguiente frente documental del expediente hidrológico mínimo.

La selección se hizo después de estabilizar el bloque `Volumen de referencia` y con criterio de continuidad documental, bajo coste técnico, trazabilidad y no intervención del motor hidrológico.

## Propósito del bloque

El bloque `Escenario Q-Tr activo — control de trazabilidad` debe registrar documentalmente el estado del escenario Q-Tr disponible para el expediente.

Su propósito es trazabilidad documental, no cálculo hidrológico.

El bloque debe permitir saber si existe o no un escenario Q-Tr activo publicado al contexto del expediente.

## Título contractual

El bloque debe conservar el título:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
```

## Alcance contractual

El bloque podrá informar:

- estado documental del escenario Q-Tr activo;
- lectura técnica de trazabilidad;
- indicación de si el bloque está reservado para integración posterior;
- datos disponibles si ya existen en el contexto documental;
- fallbacks documentales cuando la información no esté publicada.

## Entradas permitidas futuras

Una implementación futura del helper podrá recibir únicamente entradas documentales ya disponibles o explícitamente publicadas al contexto del expediente.

Entradas candidatas:

```text
estadoQTrActivoExpediente
qTrActivoExpediente
faltantesQTrActivoExpediente
trDisenoActivoExpediente
incluirTitulo
```

Estas entradas no se implementan en OT-0293.

## Salida mínima esperada

El bloque deberá producir una salida tipo `string[]` con líneas documentales.

Salida mínima contractual:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: no_publicado
Lectura técnica: bloque reservado para integración posterior sin recálculo.
```

## Fallbacks documentales

Cuando no exista información publicada, el bloque debe usar fallbacks documentales explícitos.

Fallbacks mínimos:

- estado: `no_publicado`;
- lectura técnica: `bloque reservado para integración posterior sin recálculo`;
- valores no disponibles: `—`.

## Restricción crítica

El bloque no debe recalcular Q-Tr.

El bloque no debe seleccionar periodo de retorno adoptado.

El bloque no debe inferir caudales.

El bloque no debe modificar motor.

El bloque no debe tocar Q-5.

El bloque no debe tocar Método Racional.

El bloque no debe tocar diagnóstico Q(t).

El bloque no debe emitir dictamen hidrológico.

## Diferencia entre trazabilidad y adopción

Este bloque solo documenta trazabilidad del escenario Q-Tr activo.

No adopta un Q-Tr.

No adopta un periodo de retorno.

No decide suficiencia hidrológica.

No valida competencia técnica del valor.

No reemplaza bloques posteriores como Q-5, Método Racional, contraste o diagnóstico temporal Q(t).

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
- no recalcular Q-Tr;
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

- `Volumen de referencia`;
- `Resumen Q-5 auditado`;
- `Método Racional — contraste global independiente`;
- `Contraste Q-5 vs Método Racional`;
- `Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `Diagnóstico temporal Q(t) no adoptivo`;
- `ComparadorMultiMetodo.jsx`;
- motor hidrológico.

## Decisión contractual

Se aprueba el contrato documental del bloque `Escenario Q-Tr activo — control de trazabilidad`.

Esta decisión no implementa helper.

No modifica constructor.

No modifica comparador.

No modifica motor.

No recalcula Q-Tr.

No selecciona periodo de retorno adoptado.

No recalcula volumen.

## Próximo frente recomendado

`OT-0294 — Diseño helper bloque Escenario Q-Tr activo del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

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
- No se acopló helper.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se seleccionó Tr adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5, Método Racional ni diagnóstico Q(t).
