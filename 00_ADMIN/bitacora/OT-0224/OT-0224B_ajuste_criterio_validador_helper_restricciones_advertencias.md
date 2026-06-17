# OT-0224B — Ajuste criterio validador helper restricciones advertencias generales

## Objetivo

Ajustar el criterio del validador aislado creado en OT-0223 para evitar falsos positivos por términos demasiado amplios.

## Antecedente

OT-0223 ejecutó la validación aislada del helper `construirBloqueRestriccionesAdvertenciasGeneralesExpediente`.

La validación no quedó aprobada porque todos los casos detectaron como sensibles los términos `pe` y `adopción`.

## Hallazgo

`pe` es un patrón demasiado corto y puede aparecer dentro de palabras generales como `expediente`, `especializada` o `específicos`.

`adopción` aparece dentro de una frase permitida por diseño: `Las advertencias generales no implican adopción hidrológica`.

## Ajuste aplicado

Se ajustó únicamente el validador aislado:

```text
07_TOOLBOX/validaciones/validar_ot0223_helper_restricciones_advertencias_generales_expediente.mjs
```

Cambios de criterio:

- se elimina `pe` como término sensible global;
- se elimina `adopción` / `adopcion` como término sensible literal global;
- se mantiene el control sobre términos sensibles explícitos como Q-5, Método Racional, Q(t), Volumen, Q-Tr, masa, hidrogramas, caudales y adopciones afirmativas;
- se conserva la frase permitida de cautela: `no implican adopción hidrológica`.

## Alcance mantenido

No se modificó el helper.

No se modificó `textoExpediente`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó `construirExpedienteHidrologicoMinimo.js`.

No se integró el helper al expediente operativo.

## Decisión

El validador queda ajustado para una nueva revalidación aislada posterior.

## Próximo frente recomendado

`OT-0225 — Revalidación aislada helper restricciones y advertencias generales`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se integró el helper.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
