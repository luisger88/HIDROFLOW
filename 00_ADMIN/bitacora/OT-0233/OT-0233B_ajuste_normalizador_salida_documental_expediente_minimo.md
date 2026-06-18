# OT-0233B — Ajuste normalizador salida documental expediente mínimo

## Objetivo

Ajustar los scripts de validación/revalidación para extraer correctamente la salida documental real desde `salida.texto`, con base en la auditoría OT-0232.

## Antecedente

OT-0232 auditó la forma real de salida de `construirExpedienteHidrologicoMinimo`.

La salida real no es un string directo ni un array, sino un objeto con las claves:

```text
ok
texto
errores
advertencias
secciones
metadata
```

La ruta correcta para el texto documental exportable es:

```text
salida.texto
```

## Ajuste aplicado

Se ajustó el normalizador en los scripts:

```text
07_TOOLBOX/validaciones/validar_ot0229_expediente_restricciones_advertencias_acoplado.mjs
07_TOOLBOX/validaciones/revalidar_ot0231_expediente_criterio_ajustado_tokens.mjs
```

## Nuevo criterio de normalización

El normalizador ahora prioriza:

1. string directo;
2. array directo;
3. `salida.texto`;
4. `salida.lineas`;
5. `salida.textoExpediente`;
6. `salida.markdown`;
7. `salida.contenido`;
8. `salida.secciones` como último respaldo.

## Alcance mantenido

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se modificó `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó el acople OT-0228.

No se tocó motor.

No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Decisión

El normalizador queda ajustado para una nueva revalidación del expediente acoplado.

## Próximo frente recomendado

`OT-0234 — Revalidación expediente con normalizador corregido`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se modificó el acople.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
