# OT-0263B — Selección siguiente bloque documental del expediente

## Objetivo

Seleccionar el siguiente bloque documental del expediente hidrológico mínimo después del cierre consolidado del bloque `Parámetros hidrológicos base`.

## Estado previo

Los bloques documentales ya cerrados o estabilizados son:

- `Identificación`;
- `Parámetros hidrológicos base`.

## Bloque cerrado inmediatamente anterior

El bloque `Parámetros hidrológicos base` quedó cerrado en OT-0262 como componente documental estabilizado.

## Criterio de selección

El siguiente bloque se selecciona por orden documental dentro del expediente hidrológico mínimo, evitando saltar a bloques de mayor complejidad hidrológica como Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t).

## Bloque seleccionado

Se selecciona como siguiente frente documental:

```text
Tiempo de concentración y roles Tc
```

Correspondiente a la sección:

```text
## 3. Tiempo de concentración y roles Tc
```

## Razón de selección

El bloque `Tiempo de concentración y roles Tc` es el siguiente bloque en el orden del expediente.

Su tratamiento inicial debe mantenerse documental y no adoptivo.

La selección no autoriza recálculo de `Tc` ni revisión de competencia hidrológica.

La selección no autoriza modificar motor, comparador ni fórmulas.

## Alcance previsto del siguiente contrato

La OT posterior deberá definir el contrato documental del bloque, incluyendo como mínimo:

- título del bloque;
- líneas mínimas permitidas;
- campos documentales de entrada;
- campos prohibidos;
- restricciones de no recálculo;
- criterios de normalización documental;
- límites frente a Volumen, Q-Tr, Q-5, Método Racional y diagnóstico Q(t).

## Límites de esta selección

Esta OT no diseña helper.

Esta OT no implementa helper.

Esta OT no acopla helper.

Esta OT no modifica `construirExpedienteHidrologicoMinimo.js`.

Esta OT no modifica `ComparadorMultiMetodo.jsx`.

Esta OT no modifica motor.

Esta OT no recalcula `Tc`.

Esta OT no valida competencia hidrológica de `Tc`.

Esta OT no toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Riesgo a controlar

El bloque `Tiempo de concentración y roles Tc` puede parecer hidrológicamente sensible.

Por tanto, el próximo contrato deberá separar con claridad:

- representación documental de valores ya recibidos;
- roles descriptivos de Tc;
- prohibición de recálculo;
- prohibición de dictamen técnico de suficiencia;
- prohibición de modificar motor o fórmulas.

## Decisión

Se aprueba seleccionar el bloque `Tiempo de concentración y roles Tc` como siguiente frente documental del expediente hidrológico mínimo.

No se autoriza ningún cambio funcional en esta OT.

## Próximo frente recomendado

`OT-0264 — Contrato bloque Tiempo de concentración y roles Tc del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

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
- No se modificó bloque Identificación.
- No se modificó bloque Parámetros hidrológicos base.
- No se tocó Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
