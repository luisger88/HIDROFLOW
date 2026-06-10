# OT-0056H — Validación real del expediente con sello interno

## Objetivo

Validar operativamente el botón real Copiar expediente hidrológico mínimo después de incorporar el sello de validación interna del expediente exportado.

## Estado base

- Rama: ot-0056h-validacion-real-expediente-sello
- Base: main estabilizado post OT-0056G
- Merge base: 7a1377e
- Cambio de código: ninguno

## Validación ejecutada

- Se levantó HidroFlow en una única instancia Vite.
- Se usó el botón real Copiar expediente hidrológico mínimo.
- El expediente fue leído desde el portapapeles mediante watcher local.
- Evidencia externa local: D:\HF_OT0056H_expediente_con_sello_validado.txt.

## Resultado

- Longitud del expediente copiado: 5424 caracteres.
- Tokens inválidos detectados: ninguno.
- Secciones obligatorias faltantes: ninguna.
- Bloques faltantes: ninguno.
- Q-Tr activo disponible: sí.
- Orden del sello interno: correcto.
- Resultado de orden: ORDEN_VALIDACION_SELLO: OK.

## Evidencia Q-Tr activo exportado

- Estado: disponible.
- Tr activo: 25 años.
- Estación IDF: SAN CRISTOBAL.
- Método IDF: EPM.
- Distribución temporal: EPM Q1.
- Área: 46,8516 km².
- CN efectivo: 88.
- S: 34,64 mm.
- Ia: 6,93 mm.
- Impermeabilidad: 60 %.
- Tc: 113,5475 min.
- Pe total: 56,6523 mm.
- Campos mínimos: completos.
- Fuente: derivarEstadoQTrActivo.

## Evidencia del sello interno

La sección ## Validación interna del expediente exportado apareció antes de ## 9. Sello técnico de generación.

## Restricciones cumplidas

- No se modificó HidroFlow.jsx.
- No se modificó ComparadorMultiMetodo.jsx.
- No se modificó el motor hidrológico.
- No se recalcularon caudales.
- No se alteró Q-5.
- No se alteró Método Racional.

## Cierre

OT-0056H queda validada operativamente. El expediente copiado con Q-Tr activo, Q-5, Método Racional, contraste, restricciones, sello interno y sello técnico fue exportado sin tokens inválidos ni secciones faltantes.
