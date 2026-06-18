# OT-0244B — Implementación acople mínimo helper Identificación del expediente

## Objetivo

Implementar el acople mínimo del helper `construirBloqueIdentificacionExpedienteMinimo` dentro del expediente hidrológico mínimo.

## Corrección aplicada

Se corrigió el acople para evitar intervenir `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.

El arreglo de secciones obligatorias conserva únicamente títulos de sección.

El acople funcional se aplica únicamente dentro de `construirLineasIdentificacionExpediente`.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper acoplado

```text
construirBloqueIdentificacionExpedienteMinimo
```

## Archivo helper usado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js
```

## Cambio aplicado

Se agregó el import del helper de Identificación.

Se sustituyó el cuerpo de `construirLineasIdentificacionExpediente` por una llamada explícita al helper.

No se modificó la constante `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`.

## Entradas usadas

El acople pasa únicamente campos documentales:

- cuenca;
- identificador interno de cuenca;
- versión documental del expediente;
- tipo de salida documental;
- fecha de generación;
- fuente o modo de generación;
- estado documental;
- alcance documental;
- `incluirTitulo: true`.

## Alcance mantenido

No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modificó `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificaron validadores existentes.

No se modificó motor.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0245 — Validación acople helper Identificación del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper de Identificación.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
