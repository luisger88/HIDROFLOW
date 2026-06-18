# OT-0287B — Validación acople helper bloque Volumen de referencia del expediente

## Resumen

```json
{
  "validacion": "OT-0287",
  "helper": "construirBloqueVolumenReferenciaExpediente",
  "totalControles": 16,
  "controlesAprobados": 14,
  "controlesFallidos": 2,
  "controlesFallidosIds": [
    "constructor_principal_sin_bloque_inline_volumen",
    "bloque_volumen_real_lineas_minimas"
  ],
  "buildAprobado": true,
  "acopleValidado": false,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Controles evaluados

### archivo_expediente_existe

```json
{
  "id": "archivo_expediente_existe",
  "descripcion": "Archivo del expediente existe",
  "aprobado": true
}
```

### archivo_helper_volumen_existe

```json
{
  "id": "archivo_helper_volumen_existe",
  "descripcion": "Archivo del helper Volumen de referencia existe",
  "aprobado": true
}
```

### import_helper_volumen_unico

```json
{
  "id": "import_helper_volumen_unico",
  "descripcion": "Import del helper Volumen de referencia presente una sola vez",
  "ocurrencias": 1,
  "aprobado": true
}
```

### modulo_temporal_importado

```json
{
  "id": "modulo_temporal_importado",
  "descripcion": "Módulo temporal del expediente importa sin error runtime",
  "error": "",
  "aprobado": true
}
```

### funcion_auxiliar_volumen_delegada

```json
{
  "id": "funcion_auxiliar_volumen_delegada",
  "descripcion": "Función auxiliar Volumen de referencia delega al helper",
  "aprobado": true
}
```

### salida_directa_auxiliar_valida

```json
{
  "id": "salida_directa_auxiliar_valida",
  "descripcion": "Salida directa de la función auxiliar usa el helper validado",
  "salidaAuxiliar": [
    "## 4. Volumen de referencia",
    "Lluvia efectiva total: 56,65 mm",
    "Volumen esperado: 2.654.251 m³",
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ],
  "aprobado": true
}
```

### constructor_principal_usa_funcion_auxiliar_volumen

```json
{
  "id": "constructor_principal_usa_funcion_auxiliar_volumen",
  "descripcion": "Constructor principal usa construirLineasVolumenReferenciaExpediente en la salida real",
  "aprobado": true
}
```

### constructor_principal_sin_bloque_inline_volumen

```json
{
  "id": "constructor_principal_sin_bloque_inline_volumen",
  "descripcion": "Constructor principal no conserva bloque inline antiguo de Volumen de referencia",
  "aprobado": false
}
```

### secciones_obligatorias_sin_acople

```json
{
  "id": "secciones_obligatorias_sin_acople",
  "descripcion": "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO permanece declarativa",
  "aprobado": true
}
```

### constructor_principal_sin_error_runtime

```json
{
  "id": "constructor_principal_sin_error_runtime",
  "descripcion": "Constructor principal ejecuta sin error runtime",
  "error": "",
  "aprobado": true
}
```

### constructor_principal_genera_salida

```json
{
  "id": "constructor_principal_genera_salida",
  "descripcion": "Constructor principal genera salida documental",
  "longitud": 3627,
  "aprobado": true
}
```

### bloque_volumen_real_detectado

```json
{
  "id": "bloque_volumen_real_detectado",
  "descripcion": "Salida real contiene bloque ## 4 antes de ## 5",
  "aprobado": true
}
```

### bloque_volumen_real_lineas_minimas

```json
{
  "id": "bloque_volumen_real_lineas_minimas",
  "descripcion": "Bloque Volumen de referencia real conserva líneas mínimas delegadas",
  "bloqueVolumenReal": "## 4. Volumen de referencia\nLluvia efectiva total: —\nVolumen esperado: —\nFórmula: Pe(mm) × Área(km²) × 1000.\n\n",
  "esperado": [
    "## 4. Volumen de referencia",
    "Lluvia efectiva total: 56,65 mm",
    "Volumen esperado: 2.654.251 m³",
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ],
  "aprobado": false
}
```

### bloque_volumen_sin_tokens_invalidos

```json
{
  "id": "bloque_volumen_sin_tokens_invalidos",
  "descripcion": "Bloque Volumen de referencia real sin tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### sin_modificacion_comparador

```json
{
  "id": "sin_modificacion_comparador",
  "descripcion": "Comparador no participa del acople",
  "aprobado": true
}
```

### build_vite

```json
{
  "id": "build_vite",
  "descripcion": "Build Vite aprobado",
  "aprobado": true
}
```

## Lectura técnica

- El acople del helper Volumen de referencia fue validado estructuralmente.
- La función auxiliar delega al helper validado.
- La salida real usa la función auxiliar.
- El bloque inline antiguo no permanece en el constructor principal.
- No se modificó el helper.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó motor.
- No se recalculó volumen.

## Decisión

El acople requiere corrección antes de avanzar.

## Próximo frente recomendado

`OT-0288 — Corrección acople helper bloque Volumen de referencia del expediente`