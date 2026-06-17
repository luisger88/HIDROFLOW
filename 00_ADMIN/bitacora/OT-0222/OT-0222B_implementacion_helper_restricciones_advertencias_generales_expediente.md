# OT-0222B — Implementación helper puro restricciones y advertencias generales del expediente

## Objetivo

Implementar el helper puro documental `construirBloqueRestriccionesAdvertenciasGeneralesExpediente` conforme al diseño OT-0221.

## Archivo creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

## Tipo de cambio

Implementación de helper puro documental.

No se integra todavía al expediente operativo.

## Función exportada

```javascript
construirBloqueRestriccionesAdvertenciasGeneralesExpediente
```

## Entradas permitidas

- `advertenciasGenerales`.
- `restriccionesGenerales`.
- `alcanceGeneral`.
- `incluirTitulo`.

## Controles incluidos

- Ignora entradas que no sean arreglos.
- Ignora elementos que no sean texto.
- Normaliza espacios.
- Omite textos vacíos.
- Omite textos con términos sensibles.
- Devuelve arreglo de líneas Markdown.
- No consulta motor.
- No modifica UI.
- No copia al portapapeles.

## Alcance mantenido

No se modificó `textoExpediente`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificaron helpers existentes.

No se modificaron validadores existentes.

No se integró el helper al expediente operativo.

## Próximo frente recomendado

`OT-0223 — Validación aislada helper restricciones y advertencias generales del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se integró el helper.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
