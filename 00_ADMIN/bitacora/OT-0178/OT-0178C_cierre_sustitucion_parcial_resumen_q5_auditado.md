# OT-0178C — Cierre sustitución parcial Resumen Q-5 auditado

## Resultado

Se sustituyó parcialmente el bloque `## 6. Resumen Q-5 auditado` dentro de `textoExpediente` por la expansión del helper `construirLineasResumenQ5AuditadoExpediente(...)`.

## Validaciones aprobadas

- `APLICACION_OT_0178_SUSTITUCION_RESUMEN_Q5_AUDITADO_OK`;
- `VALIDACION_OT_0178_SUSTITUCION_RESUMEN_Q5_AUDITADO_OK`;
- `VALIDACION_OT_0177_DIAGNOSTICA_RESUMEN_Q5_AUDITADO_OK`;
- `COMPARACION_OT_0176_RESUMEN_Q5_AUDITADO_OK`;
- `VALIDACION_OT_0175_HELPER_RESUMEN_Q5_AUDITADO_REFORZADA_OK`;
- `VALIDACION_OT_0174_HELPER_RESUMEN_Q5_AUDITADO_OK`;
- Build Vite aprobado.

## Restricciones mantenidas

No se modificó:

- bloques `## 1` a `## 5`;
- bloques posteriores;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico.

## Verificaciones clave

- `textoExpediente` sigue siendo la fuente del copiado.
- `areaTexto.value = textoExpediente` sigue intacto.
- `window.prompt(..., textoExpediente)` sigue intacto.
- No se introdujo `navigator.clipboard`.
- No se introdujo `writeText`.

## Conclusión

El bloque `## 6. Resumen Q-5 auditado` queda sustituido de forma controlada por helper, sin alterar los flujos operativos de copiado ni el motor hidrológico.
