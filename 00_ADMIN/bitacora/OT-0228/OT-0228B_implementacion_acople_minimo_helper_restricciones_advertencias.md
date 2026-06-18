# OT-0228B — Implementación acople mínimo helper restricciones y advertencias generales

## Objetivo

Implementar el acople mínimo del helper `construirBloqueRestriccionesAdvertenciasGeneralesExpediente` dentro del expediente hidrológico mínimo.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper acoplado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

## Punto de acople

Se acopló el helper en la sección general:

```text
## 12. Restricciones y advertencias técnicas
```

## Tipo de cambio

Acople mínimo, único y auditable.

No se modificó el helper.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó `textoExpediente` directamente.

## Textos generales acoplados

Restricciones generales:

- El expediente no modifica el motor hidrológico.
- El expediente no recalcula resultados.
- El bloque tiene alcance documental e interpretativo general.

Advertencias generales:

- Las advertencias generales no implican adopción hidrológica.
- Los resultados sensibles deben revisarse en sus bloques específicos.
- Este bloque no sustituye la validación técnica especializada.

## Alcance mantenido

No se tocó motor.

No se tocó UI.

No se tocó `ComparadorMultiMetodo.jsx`.

No se modificó el helper.

No se modificaron validadores existentes.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0229 — Validación expediente con bloque restricciones y advertencias generales acoplado`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente` directamente.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el helper.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
