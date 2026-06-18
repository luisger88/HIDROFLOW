# OT-0243B — Diseño punto de acople helper Identificación del expediente

## Objetivo

Diseñar el punto de acople futuro del helper `construirBloqueIdentificacionExpedienteMinimo` dentro del expediente hidrológico mínimo.

## Antecedente

El helper de Identificación siguió el ciclo:

- OT-0237: selección del bloque Identificación;
- OT-0238: contrato del bloque;
- OT-0239: diseño del helper;
- OT-0240: implementación del helper puro;
- OT-0241: validación aislada aprobada;
- OT-0242: decisión de pasar a diseño de punto de acople.

## Evidencia principal

OT-0241 confirmó que el helper:

```json
{
  "totalCasos": 4,
  "casosAprobados": 4,
  "casosFallidos": 0,
  "buildAprobado": true,
  "validacionAisladaAprobada": true
}
```

## Helper candidato

Helper validado:

```text
construirBloqueIdentificacionExpedienteMinimo
```

Archivo:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js
```

Salida:

```javascript
string[]
```

## Archivo de acople futuro

El punto de acople futuro deberá ubicarse en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

Esta OT no modifica ese archivo.

## Ubicación conceptual del acople

El helper debe alimentar la sección:

```text
## 1. Identificación
```

La integración futura deberá reemplazar o complementar únicamente el bloque documental de identificación, sin alterar secciones hidrológicas posteriores.

## Forma de acople candidata

El acople futuro debería seguir una forma mínima y explícita:

```javascript
...construirBloqueIdentificacionExpedienteMinimo({
  cuenca: /* dato textual seguro */,
  identificadorCuenca: /* dato textual seguro */,
  versionExpediente: /* dato textual seguro */,
  tipoSalida: "expediente_hidrologico_minimo",
  fechaGeneracion,
  fuente: /* modo de generación */,
  estadoDocumental: /* estado documental */,
  alcanceDocumental: /* alcance textual */,
  incluirTitulo: true
}),
```

## Entradas seguras

Solo podrán pasarse entradas documentales y textuales:

- nombre de cuenca activa;
- identificador interno de cuenca;
- versión documental del expediente;
- tipo de salida documental;
- fecha de generación;
- fuente o modo de generación;
- estado documental;
- alcance documental.

## Entradas prohibidas

No debe pasarse al helper, ni directa ni indirectamente:

- Q-5;
- Q-Tr;
- Método Racional;
- Q(t);
- Volumen;
- Pe;
- masa;
- caudales;
- intensidades IDF;
- coeficientes hidrológicos;
- tiempos de concentración calculados;
- resultados de hidrogramas;
- conclusiones técnicas.

## Restricciones del acople futuro

El acople futuro deberá cumplir:

- ser mínimo;
- ser único;
- ser auditable;
- no modificar motor;
- no modificar comparador;
- no tocar bloques hidrológicos sensibles;
- no alterar la estructura de Q-5, Método Racional, Q(t), Volumen ni Q-Tr;
- no duplicar el título `## 1. Identificación`;
- no introducir `undefined`, `null`, `NaN` ni `[object Object]`;
- mantener salida documental determinística.

## Criterios de validación futura

Una validación posterior del acople deberá comprobar:

- import del helper presente una sola vez;
- llamada al helper presente una sola vez;
- sección `## 1. Identificación` presente en salida documental;
- campos mínimos de Identificación presentes;
- ausencia de tokens inválidos en salida documental;
- ausencia de términos hidrológicos prohibidos dentro del bloque Identificación;
- no duplicidad de sección Identificación;
- build Vite aprobado;
- sin modificación de motor;
- sin modificación de comparador;
- sin modificación de bloques sensibles.

## Decisión de diseño

Se aprueba el diseño del punto de acople del helper Identificación como integración futura mínima, documental y de bajo riesgo.

Esta OT no implementa el acople.

La implementación futura deberá realizarse mediante una OT específica y validarse posteriormente de forma aislada y/o documental.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0244 — Implementación acople mínimo helper Identificación del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
