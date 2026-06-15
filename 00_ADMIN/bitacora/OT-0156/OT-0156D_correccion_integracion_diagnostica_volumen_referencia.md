# OT-0156D — Corrección integración diagnóstica Volumen de referencia

## Hallazgo

La primera integración diagnóstica OT-0156 dejó un bloque JSX corrupto en `ComparadorMultiMetodo.jsx`.

El build falló con:

```text
Expected ")" but found ";"
```

La causa fue un corte de pegado que dejó el fragmento inválido `lineasDelsole.warn(...)` dentro del diagnóstico.

## Corrección aplicada

Se reemplazó completamente el bloque diagnóstico OT-0156 por una versión válida, conservando el alcance no invasivo.

## Validaciones aprobadas

- `CORRECCION_OT_0156_DIAGNOSTICO_VOLUMEN_REFERENCIA_OK`;
- `VALIDACION_OT_0156_DIAGNOSTICA_VOLUMEN_REFERENCIA_OK`;
- `VALIDACION_OT_0155_HELPER_VOLUMEN_REFERENCIA_REFORZADA_OK`;
- `VALIDACION_OT_0154_HELPER_VOLUMEN_REFERENCIA_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se reemplazó `textoExpediente`.

No se modificó:

- bloque operativo;
- botón;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Conclusión

OT-0156 queda corregida y validada como integración diagnóstica no invasiva.
