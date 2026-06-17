# OT-0221B — Diseño helper bloque restricciones y advertencias generales del expediente

## Objetivo

Diseñar el helper documental futuro para construir un bloque acotado de restricciones y advertencias generales del expediente hidrológico mínimo, sin implementarlo todavía.

## Antecedente

OT-0220 definió el contrato documental del bloque de restricciones y advertencias generales del expediente.

Ese contrato excluye explícitamente Q-5, Método Racional, diagnóstico Q(t), Volumen, Q-Tr, Pe y masa hidrológica.

## Nombre candidato del helper

```text
construirBloqueRestriccionesAdvertenciasGeneralesExpediente
```

## Archivo candidato futuro

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

## Tipo de helper

Helper puro documental.

No debe leer estado global.

No debe consultar motor.

No debe recalcular resultados.

No debe modificar UI.

No debe copiar al portapapeles.

No debe modificar `textoExpediente` directamente.

## Firma candidata

```javascript
export function construirBloqueRestriccionesAdvertenciasGeneralesExpediente({
  advertenciasGenerales = [],
  restriccionesGenerales = [],
  alcanceGeneral = "",
  incluirTitulo = true
} = {})
```

## Entradas permitidas

- `advertenciasGenerales`: lista de textos generales de advertencia documental.
- `restriccionesGenerales`: lista de textos generales de restricción documental.
- `alcanceGeneral`: texto opcional de alcance general del expediente.
- `incluirTitulo`: bandera para incluir o no encabezado de sección.

## Entradas prohibidas

El helper no debe recibir:

- tablas Q-5;
- resultados de Método Racional;
- series Q(t);
- volúmenes hidrológicos;
- datos de Pe;
- caudales Q-Tr;
- objetos internos del motor;
- resultados de hidrogramas;
- dictámenes técnicos de adopción.

## Salida esperada

La salida debe ser un arreglo de líneas Markdown o texto documental equivalente.

La salida debe poder integrarse posteriormente al expediente sin cálculos ni efectos secundarios.

## Secciones candidatas de salida

El helper podrá producir:

- título del bloque;
- alcance general;
- restricciones generales;
- advertencias generales;
- nota de no adopción hidrológica general;
- recordatorio de que los bloques sensibles se revisan en sus secciones específicas.

## Redacción permitida

El helper podrá generar frases como:

- El expediente no modifica el motor hidrológico.
- El expediente no recalcula hidrogramas.
- Las advertencias generales no implican adopción hidrológica.
- Los resultados sensibles deben revisarse en sus bloques específicos.
- Este bloque tiene alcance documental e interpretativo general.

## Redacción prohibida

El helper no debe generar frases que indiquen:

- validación de Q-5;
- adopción del Método Racional;
- selección de diagnóstico Q(t);
- aprobación de Volumen, Pe o masa;
- selección de Q-Tr;
- reemplazo de auditoría técnica especializada.

## Validaciones futuras esperadas

La implementación futura deberá validar:

- que la salida sea determinística;
- que acepte entradas vacías;
- que no emita tokens `undefined`, `null`, `NaN` ni `[object Object]`;
- que no incluya términos sensibles si no fueron permitidos;
- que no modifique archivos fuente distintos al helper;
- que no toque motor ni UI.

## Integración futura

La integración futura al expediente operativo no debe hacerse en la misma OT de implementación del helper.

Primero debe implementarse el helper puro.

Después debe validarse de forma aislada.

Luego debe decidirse si procede integrarlo al expediente.

## Decisión operativa

Se aprueba únicamente el diseño del helper.

No se implementa el helper en esta OT.

No se crea el archivo candidato en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0222 — Implementación helper puro restricciones y advertencias generales del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se creó helper.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se implementó el bloque.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
