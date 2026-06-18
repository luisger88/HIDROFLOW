# OT-0231B — Revalidación expediente con criterio ajustado de tokens inválidos

## Resumen

```json
{
  "validacion": "OT-0231",
  "criterioAjustadoDesde": "OT-0230",
  "archivoExpediente": "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js",
  "archivoHelper": "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js",
  "archivoComparador": "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx",
  "totalControles": 32,
  "controlesAprobados": 16,
  "controlesFallidos": 16,
  "revalidacionExpedienteAprobada": false,
  "tokensEvaluadosSobre": "salida_documental_generada",
  "cargaNodeEsm": "import relativo resuelto en memoria sin modificar fuente",
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Criterio aplicado

Los tokens inválidos se evaluaron sobre la salida documental generada por `construirExpedienteHidrologicoMinimo`, no sobre el código fuente completo.

Para ejecutar la revalidación en Node ESM sin modificar el código fuente, el import relativo sin extensión del helper se resolvió en memoria mediante URL `file://`.

## Controles evaluados

### archivo_expediente

```json
{
  "id": "archivo_expediente",
  "aprobado": true,
  "detalle": "Archivo de expediente existe"
}
```

### import_helper

```json
{
  "id": "import_helper",
  "descripcion": "Import del helper presente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### seccion_12

```json
{
  "id": "seccion_12",
  "descripcion": "Sección 12 presente",
  "ocurrencias": 2,
  "aprobado": true
}
```

### marca_ot0228

```json
{
  "id": "marca_ot0228",
  "descripcion": "Marca de acople OT-0228 presente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### llamada_helper

```json
{
  "id": "llamada_helper",
  "descripcion": "Llamada al helper presente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### alcance_general

```json
{
  "id": "alcance_general",
  "descripcion": "Alcance general acoplado",
  "ocurrencias": 1,
  "aprobado": true
}
```

### restriccion_motor

```json
{
  "id": "restriccion_motor",
  "descripcion": "Restricción general sobre motor presente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### advertencia_no_adopcion

```json
{
  "id": "advertencia_no_adopcion",
  "descripcion": "Advertencia general de no adopción presente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_unico_ot0228

```json
{
  "id": "bloque_unico_ot0228",
  "descripcion": "Bloque OT-0228 aparece una sola vez en fuente",
  "ocurrencias": 1,
  "aprobado": true
}
```

### salida_documental_generada

```json
{
  "id": "salida_documental_generada",
  "descripcion": "Salida documental generada desde construirExpedienteHidrologicoMinimo",
  "aprobado": true,
  "longitud": 15,
  "error": ""
}
```

### seccion_salida_# Expediente hidrológico mínimo — Cuenca activa

```json
{
  "id": "seccion_salida_# Expediente hidrológico mínimo — Cuenca activa",
  "descripcion": "Sección obligatoria en salida: # Expediente hidrológico mínimo — Cuenca activa",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 1. Identificación

```json
{
  "id": "seccion_salida_## 1. Identificación",
  "descripcion": "Sección obligatoria en salida: ## 1. Identificación",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 2. Parámetros hidrológicos base

```json
{
  "id": "seccion_salida_## 2. Parámetros hidrológicos base",
  "descripcion": "Sección obligatoria en salida: ## 2. Parámetros hidrológicos base",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 3. Tiempo de concentración y roles Tc

```json
{
  "id": "seccion_salida_## 3. Tiempo de concentración y roles Tc",
  "descripcion": "Sección obligatoria en salida: ## 3. Tiempo de concentración y roles Tc",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 4. Volumen de referencia

```json
{
  "id": "seccion_salida_## 4. Volumen de referencia",
  "descripcion": "Sección obligatoria en salida: ## 4. Volumen de referencia",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 5. Escenario Q-Tr activo — control de trazabilidad

```json
{
  "id": "seccion_salida_## 5. Escenario Q-Tr activo — control de trazabilidad",
  "descripcion": "Sección obligatoria en salida: ## 5. Escenario Q-Tr activo — control de trazabilidad",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 6. Resumen Q-5 auditado

```json
{
  "id": "seccion_salida_## 6. Resumen Q-5 auditado",
  "descripcion": "Sección obligatoria en salida: ## 6. Resumen Q-5 auditado",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 7. Método Racional — contraste global independiente

```json
{
  "id": "seccion_salida_## 7. Método Racional — contraste global independiente",
  "descripcion": "Sección obligatoria en salida: ## 7. Método Racional — contraste global independiente",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 8. Contraste Q-5 vs Método Racional

```json
{
  "id": "seccion_salida_## 8. Contraste Q-5 vs Método Racional",
  "descripcion": "Sección obligatoria en salida: ## 8. Contraste Q-5 vs Método Racional",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5

```json
{
  "id": "seccion_salida_## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "descripcion": "Sección obligatoria en salida: ## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## Diagnóstico temporal Q(t) no adoptivo

```json
{
  "id": "seccion_salida_## Diagnóstico temporal Q(t) no adoptivo",
  "descripcion": "Sección obligatoria en salida: ## Diagnóstico temporal Q(t) no adoptivo",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 10. Validación interna del expediente exportado

```json
{
  "id": "seccion_salida_## 10. Validación interna del expediente exportado",
  "descripcion": "Sección obligatoria en salida: ## 10. Validación interna del expediente exportado",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 11. Sello técnico de generación

```json
{
  "id": "seccion_salida_## 11. Sello técnico de generación",
  "descripcion": "Sección obligatoria en salida: ## 11. Sello técnico de generación",
  "ocurrencias": 0,
  "aprobado": false
}
```

### seccion_salida_## 12. Restricciones y advertencias técnicas

```json
{
  "id": "seccion_salida_## 12. Restricciones y advertencias técnicas",
  "descripcion": "Sección obligatoria en salida: ## 12. Restricciones y advertencias técnicas",
  "ocurrencias": 0,
  "aprobado": false
}
```

### token_salida_undefined

```json
{
  "id": "token_salida_undefined",
  "descripcion": "Token inválido undefined en salida documental generada",
  "ocurrencias": 0,
  "aprobado": true
}
```

### token_salida_null

```json
{
  "id": "token_salida_null",
  "descripcion": "Token inválido null en salida documental generada",
  "ocurrencias": 0,
  "aprobado": true
}
```

### token_salida_NaN

```json
{
  "id": "token_salida_NaN",
  "descripcion": "Token inválido NaN en salida documental generada",
  "ocurrencias": 0,
  "aprobado": true
}
```

### token_salida_[object Object]

```json
{
  "id": "token_salida_[object Object]",
  "descripcion": "Token inválido [object Object] en salida documental generada",
  "ocurrencias": 1,
  "aprobado": false
}
```

### bloque_general_en_salida

```json
{
  "id": "bloque_general_en_salida",
  "descripcion": "Bloque general de restricciones/advertencias aparece en salida documental",
  "ocurrencias": 0,
  "aprobado": false
}
```

### archivo_helper

```json
{
  "id": "archivo_helper",
  "aprobado": true,
  "detalle": "Helper existe"
}
```

### archivo_comparador

```json
{
  "id": "archivo_comparador",
  "aprobado": true,
  "detalle": "Comparador existe"
}
```

### build_vite

```json
{
  "id": "build_vite",
  "descripcion": "Build Vite",
  "aprobado": true
}
```

## Build

Build aprobado.

## Lectura técnica

- La revalidación se ejecutó con el criterio ajustado de OT-0230.
- No se modificó el expediente operativo.
- No se modificó el helper.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se tocaron bloques sensibles.

## Decisión

El expediente no debe considerarse estabilizado hasta corregir los hallazgos detectados.

## Próximo frente recomendado

`OT-0232 — Decisión sobre estabilización del bloque restricciones y advertencias generales`