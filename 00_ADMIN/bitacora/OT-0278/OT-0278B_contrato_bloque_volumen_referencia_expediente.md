# OT-0278B — Contrato bloque Volumen de referencia del expediente

## Objetivo

Definir el contrato documental del bloque `Volumen de referencia` del expediente hidrológico mínimo.

## Antecedente

OT-0277 seleccionó el bloque `## 4. Volumen de referencia` como siguiente bloque documental a madurar, después de la estabilización del bloque `Tiempo de concentración y roles Tc`.

La selección fue documental y no autorizó recalcular volumen, modificar fórmulas, tocar motor, modificar constructor, alterar comparador ni intervenir Q-Tr, Q-5, Método Racional o diagnóstico Q(t).

## Bloque contractual

El bloque objeto de contrato es:

```text
## 4. Volumen de referencia
```

## Propósito documental

El bloque debe exponer, de forma textual y trazable, el volumen de referencia asociado al expediente hidrológico mínimo.

Su función es documental, no computacional.

No adopta caudales.

No recalcula lluvia efectiva.

No recalcula área.

No recalcula volumen.

No modifica el motor hidrológico.

## Líneas mínimas esperadas

El bloque deberá producir como mínimo las siguientes líneas documentales:

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor documental o fallback>
Volumen esperado: <valor documental o fallback>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Campos documentales permitidos

El contrato permite recibir únicamente campos ya disponibles desde el contexto documental o desde entradas explícitas:

- `peTotalMm` o equivalente documental de lluvia efectiva total;
- `volumenEsperadoM3` o equivalente documental de volumen esperado;
- `areaKm2` o equivalente documental de área, solo si se requiere para trazabilidad textual;
- `incluirTitulo`, si se diseña posteriormente un helper reutilizable.

## Campos no permitidos

El bloque no debe recibir ni manipular:

- hidrogramas;
- series Q(t);
- resultados Q-5;
- resultados Q-Tr;
- resultados del Método Racional;
- diagnóstico temporal Q(t);
- parámetros de selección de Tc;
- criterios de competencia hidrológica;
- insumos para recalcular CN, AMC, Pe, área o volumen.

## Reglas de fallback documental

Cuando un valor no esté disponible, sea nulo, indefinido, vacío, no numérico o no finito, el bloque deberá mostrar:

```text
—
```

El fallback no debe activar cálculos alternos.

El fallback no debe inferir valores.

El fallback no debe consultar motor.

El fallback no debe usar datos externos.

## Formato documental esperado

La lluvia efectiva total, si está disponible como número finito, deberá mostrarse con unidad:

```text
mm
```

El volumen esperado, si está disponible como número finito, deberá mostrarse con unidad:

```text
m³
```

El separador decimal y el formato final podrán ser definidos en el diseño del helper, pero sin alterar el valor recibido.

## Fórmula textual permitida

El contrato permite mantener la línea textual:

```text
Fórmula: Pe(mm) × Área(km²) × 1000.
```

Esta línea tiene carácter documental y explicativo.

No autoriza recalcular volumen dentro del bloque.

No autoriza modificar la fórmula usada por el motor o por otros módulos.

## Tokens prohibidos

La salida del bloque no debe contener:

```text
undefined
null
NaN
[object Object]
```

## Frontera con otros bloques

El bloque `Volumen de referencia` debe mantenerse separado de:

- `## 5. Escenario Q-Tr activo — control de trazabilidad`;
- `## 6. Resumen Q-5 auditado`;
- `## 7. Método Racional — contraste global independiente`;
- `## 8. Contraste Q-5 vs Método Racional`;
- `## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5`;
- `## Diagnóstico temporal Q(t) no adoptivo`.

No debe incluir lectura de Q-Tr.

No debe incluir lectura de Q-5.

No debe incluir contraste con Método Racional.

No debe incluir juicio de consistencia Pe–Área–Volumen/Q-5.

No debe incluir diagnóstico temporal Q(t).

## Restricciones hidrológicas

Este contrato no autoriza:

- recalcular volumen;
- recalcular lluvia efectiva;
- recalcular área;
- recalcular CN;
- recalcular AMC;
- recalcular Tc;
- modificar `Tc_final`;
- seleccionar Tc adoptado;
- emitir dictamen hidrológico;
- modificar motor;
- modificar comparador.

## Criterios de aceptación futuros

Cuando se diseñe e implemente un helper para este bloque, deberá validarse que:

- devuelve `string[]`;
- incluye el título cuando `incluirTitulo` sea verdadero;
- conserva las líneas mínimas esperadas;
- aplica fallback `—` ante valores ausentes o inválidos;
- no emite tokens prohibidos;
- no muta entradas;
- no toca motor;
- no recalcula volumen;
- no mezcla Q-Tr, Q-5, Método Racional ni diagnóstico Q(t);
- el build permanece aprobado.

## Decisión contractual

Se aprueba el contrato documental del bloque `Volumen de referencia`.

Este contrato habilita un siguiente frente de diseño de helper puro documental.

No autoriza implementación en esta OT.

No autoriza acople en esta OT.

No autoriza modificar el constructor principal en esta OT.

## Próximo frente recomendado

`OT-0279 — Diseño helper bloque Volumen de referencia del expediente`

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
