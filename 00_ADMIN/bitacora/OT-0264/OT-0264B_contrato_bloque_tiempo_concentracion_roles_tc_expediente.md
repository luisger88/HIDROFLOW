# OT-0264B — Contrato bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Definir el contrato documental del bloque `Tiempo de concentración y roles Tc` del expediente hidrológico mínimo.

## Antecedente

OT-0263 seleccionó el bloque `Tiempo de concentración y roles Tc` como siguiente frente documental del expediente.

El bloque debe tratarse inicialmente como representación documental no adoptiva, sin recálculo ni dictamen hidrológico.

## Nombre del bloque

```text
Tiempo de concentración y roles Tc
```

## Título documental obligatorio

```text
## 3. Tiempo de concentración y roles Tc
```

## Propósito documental

Representar de forma segura y trazable la información recibida sobre `Tc` y sus roles documentales dentro del expediente hidrológico mínimo.

Este bloque no selecciona, calcula, corrige, adopta ni valida hidrológicamente el tiempo de concentración.

## Campos documentales permitidos

El contrato permite representar únicamente campos ya recibidos por entrada:

- `Tc_final`;
- `trDisenoActivoExpediente`;
- roles textuales predefinidos de Tc;
- nota de no recálculo;
- nota de trazabilidad documental.

## Campos mínimos de salida

El bloque deberá generar, como mínimo:

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: <valor o —>
Tr global activo: <valor o —> años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Normalización documental esperada

Los valores recibidos deberán normalizarse documentalmente:

- `undefined` se representa como `—`;
- `null` se representa como `—`;
- cadenas vacías se representan como `—`;
- números no finitos se representan como `—`;
- objetos se representan como `—`;
- números finitos de `Tc` se expresan en minutos con una cifra decimal;
- `trDisenoActivoExpediente` se representa como texto documental sin recálculo.

## Prohibiciones explícitas

El bloque no podrá:

- recalcular `Tc`;
- seleccionar un `Tc` adoptado;
- modificar `Tc_final`;
- evaluar competencia hidrológica de `Tc`;
- emitir dictamen de suficiencia o seguridad hidrológica;
- modificar motor;
- modificar fórmulas;
- modificar `ComparadorMultiMetodo.jsx`;
- modificar Volumen;
- modificar Q-Tr;
- modificar Q-5;
- modificar Método Racional;
- modificar diagnóstico Q(t).

## Campos prohibidos en el bloque

El bloque no deberá incorporar:

- hidrogramas completos;
- caudales Q-5;
- resultados de Método Racional;
- balances de volumen;
- dictámenes de plausibilidad temporal;
- diagnóstico Q(t);
- advertencias globales de restricciones;
- conclusiones hidrológicas adoptivas.

## Términos sensibles permitidos solo como rol descriptivo

Algunos términos pueden aparecer solo como parte de roles ya existentes:

- `Q(t)` solo en `Tc operativo Q(t)`;
- `Q-5` solo en `Tc comparador: referencia especializada para coherencia Q-5`;
- `Lag / forma SCS` solo como descripción documental de rol.

Estos términos no autorizan cálculo, validación ni integración con los bloques Q(t), Q-5 o SCS.

## Criterio de éxito del futuro helper

Un helper futuro del bloque deberá cumplir:

- devolver `string[]`;
- incluir el título obligatorio cuando `incluirTitulo = true`;
- omitir únicamente el título cuando `incluirTitulo = false`;
- preservar campos mínimos;
- no producir `undefined`, `null`, `NaN` ni `[object Object]`;
- no modificar entradas;
- ser determinístico;
- no recalcular `Tc`.

## Alcance frente al constructor principal

Este contrato no autoriza acople.

El acople futuro, si se aprueba, deberá hacerse mediante una función auxiliar y validarse de forma aislada antes de tocar la salida real.

## Decisión contractual

Se aprueba el contrato documental del bloque `Tiempo de concentración y roles Tc` con alcance estrictamente representativo y no adoptivo.

## Próximo frente recomendado

`OT-0265 — Diseño helper bloque Tiempo de concentración y roles Tc del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se diseña helper en esta OT.

No se implementa helper en esta OT.

No se acopla helper en esta OT.

No se recalcula ni valida `Tc`.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
