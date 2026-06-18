# OT-0280B — Implementación helper bloque Volumen de referencia del expediente

## Objetivo

Implementar el helper puro documental `construirBloqueVolumenReferenciaExpediente` para el bloque `Volumen de referencia` del expediente hidrológico mínimo.

## Antecedente

OT-0278 definió el contrato documental del bloque `Volumen de referencia`.

OT-0279 aprobó el diseño del helper puro documental `construirBloqueVolumenReferenciaExpediente`.

## Archivo funcional creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js
```

## Exportaciones implementadas

El archivo nuevo exporta:

```javascript
formatearLluviaEfectivaDocumental
formatearVolumenEsperadoDocumental
construirBloqueVolumenReferenciaExpediente
```

## Firma principal implementada

```javascript
export function construirBloqueVolumenReferenciaExpediente(entrada = {})
```

## Líneas documentales generadas

Cuando `incluirTitulo` es verdadero, el helper genera:

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor documental o fallback>
Volumen esperado: <valor documental o fallback>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

Cuando `incluirTitulo` es falso, omite únicamente el título.

## Fallback documental

Los valores ausentes, nulos, vacíos, no numéricos o no finitos se representan como:

```text
—
```

## Alcance técnico

El helper es puro documental.

No consulta motor.

No recalcula volumen.

No modifica Pe.

No modifica área.

No modifica fórmula de volumen.

No accede a DOM.

No accede a portapapeles.

No modifica estado global.

No consulta datos externos.

## Frontera mantenida

El helper no recibe ni manipula:

- hidrogramas;
- series Q(t);
- resultados Q-5;
- resultados Q-Tr;
- resultados del Método Racional;
- diagnóstico temporal Q(t);
- parámetros de selección de Tc;
- criterios de competencia hidrológica;
- insumos para recalcular CN, AMC, Pe, área o volumen.

## Alcance mantenido

No se acopló el helper al constructor principal.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se modificaron helpers existentes.

No se modificaron validadores existentes.

No se recalculó `Tc`.

No se recalculó volumen.

No se modificó `Tc_final`.

No se emitió dictamen hidrológico.

No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Validación ejecutada en esta OT

La validación formal aislada queda reservada para OT-0281.

En esta OT se ejecuta únicamente build de producción como control de sintaxis/proyecto.

## Próximo frente recomendado

`OT-0281 — Validación aislada helper bloque Volumen de referencia del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
