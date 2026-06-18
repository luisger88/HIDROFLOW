# OT-0240B — Implementación helper bloque Identificación del expediente hidrológico mínimo

## Objetivo

Implementar el helper puro `construirBloqueIdentificacionExpedienteMinimo` como bloque documental de Identificación del expediente hidrológico mínimo.

## Archivo creado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js
```

## Función exportada

```javascript
construirBloqueIdentificacionExpedienteMinimo
```

## Salida

El helper devuelve exclusivamente:

```javascript
string[]
```

## Campos emitidos

- Cuenca activa.
- Identificador interno de cuenca.
- Versión del expediente.
- Tipo de salida documental.
- Fecha de generación.
- Fuente o modo de generación.
- Estado documental.
- Alcance documental.

## Reglas aplicadas

- Valores `null` o `undefined` se sustituyen por `—`.
- Cadenas vacías se sustituyen por `—`.
- Números finitos se convierten a texto.
- Booleanos se convierten a texto.
- Objetos y arreglos se sustituyen por `—`.
- La salida es determinística para la misma entrada.

## Alcance mantenido

No se integró el helper al expediente operativo.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificaron validadores existentes.

No se modificó motor.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0241 — Validación aislada helper bloque Identificación del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
