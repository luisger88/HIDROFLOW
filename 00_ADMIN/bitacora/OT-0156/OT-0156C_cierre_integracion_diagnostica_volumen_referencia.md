# OT-0156C — Cierre integración diagnóstica Volumen de referencia

## Resultado

Se integró `construirLineasVolumenReferenciaExpediente(...)` en `ComparadorMultiMetodo.jsx` solo como diagnóstico no invasivo.

## Validaciones aprobadas

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

El helper Volumen de referencia queda disponible dentro del comparador como diagnóstico interno, sin adopción operativa todavía.
