# OT-0258B — Validación acople helper Parámetros hidrológicos base del expediente

## Resumen

```json
{
  "validacion": "OT-0258",
  "helper": "construirBloqueParametrosHidrologicosBaseExpediente",
  "totalControles": 16,
  "controlesAprobados": 13,
  "controlesFallidos": 3,
  "buildAprobado": true,
  "acopleAuxiliarValidado": true,
  "acopleSalidaRealValidado": false,
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

### archivo_helper_parametros_existe

```json
{
  "id": "archivo_helper_parametros_existe",
  "descripcion": "Archivo del helper de parámetros base existe",
  "aprobado": true
}
```

### import_helper_parametros_unico

```json
{
  "id": "import_helper_parametros_unico",
  "descripcion": "Import del helper de parámetros base presente una sola vez",
  "ocurrencias": 1,
  "aprobado": true
}
```

### modulo_temporal_importado

```json
{
  "id": "modulo_temporal_importado",
  "descripcion": "El módulo temporal pudo importarse en Node ESM con imports file://",
  "error": "",
  "aprobado": true
}
```

### secciones_obligatorias_sin_helper

```json
{
  "id": "secciones_obligatorias_sin_helper",
  "descripcion": "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO no contiene llamadas a helper",
  "aprobado": true
}
```

### export_default_presente

```json
{
  "id": "export_default_presente",
  "descripcion": "export default del constructor principal presente",
  "aprobado": true
}
```

### funcion_auxiliar_delegada

```json
{
  "id": "funcion_auxiliar_delegada",
  "descripcion": "construirLineasParametrosHidrologicosBaseExpediente delega al helper",
  "aprobado": true
}
```

### salida_directa_auxiliar_string_array

```json
{
  "id": "salida_directa_auxiliar_string_array",
  "descripcion": "La salida directa de la función auxiliar devuelve string[]",
  "longitud": 5,
  "aprobado": true
}
```

### salida_directa_usa_helper

```json
{
  "id": "salida_directa_usa_helper",
  "descripcion": "La salida directa de la función auxiliar usa normalización delegada del helper",
  "salida": [
    "## 2. Parámetros hidrológicos base",
    "CN: —",
    "CN base: —",
    "CN efectivo: —",
    "AMC: —"
  ],
  "aprobado": true
}
```

### constructor_principal_genera_salida

```json
{
  "id": "constructor_principal_genera_salida",
  "descripcion": "El constructor principal genera salida documental",
  "longitud": 3302,
  "aprobado": true
}
```

### bloque_parametros_real_detectado

```json
{
  "id": "bloque_parametros_real_detectado",
  "descripcion": "La salida real contiene bloque ## 2 antes de ## 3",
  "aprobado": true
}
```

### salida_real_usa_campos_delegados

```json
{
  "id": "salida_real_usa_campos_delegados",
  "descripcion": "La salida real del constructor principal usa normalización delegada del helper",
  "bloqueParametrosReal": "## 2. Parámetros hidrológicos base\nCN: [object Object]\nCN base: [object Object]\nCN efectivo: [object Object]\nAMC: [object Object]\n\n",
  "esperado": [
    "CN: —",
    "CN base: —",
    "CN efectivo: —",
    "AMC: —"
  ],
  "aprobado": false
}
```

### constructor_principal_sin_bloque_inline_parametros

```json
{
  "id": "constructor_principal_sin_bloque_inline_parametros",
  "descripcion": "El constructor principal no conserva bloque inline de parámetros base",
  "bloqueInlineConstructorDetectado": true,
  "aprobado": false
}
```

### bloque_parametros_sin_tokens_invalidos

```json
{
  "id": "bloque_parametros_sin_tokens_invalidos",
  "descripcion": "Bloque Parámetros hidrológicos base sin tokens inválidos",
  "hallazgos": [
    {
      "token": "[object Object]",
      "ocurrencias": 4
    }
  ],
  "aprobado": false
}
```

### bloque_parametros_sin_terminos_sensibles

```json
{
  "id": "bloque_parametros_sin_terminos_sensibles",
  "descripcion": "Bloque Parámetros hidrológicos base sin términos sensibles ajenos al bloque",
  "hallazgos": [],
  "aprobado": true
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

## Lectura técnica

- La validación revisó fuente, import, función auxiliar, salida directa y salida real del constructor principal.
- La función auxiliar se evalúa con valores objeto para detectar si la normalización proviene del helper.
- Si la salida real contiene `[object Object]`, significa que el constructor principal conserva lógica inline no delegada.
- No se modificó código funcional durante esta validación.
- No se modificó motor.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se recalcularon ni validaron hidrológicamente `CN`, `CN base`, `CN efectivo` ni `AMC`.

## Decisión

El acople auxiliar queda validado, pero la salida real del constructor principal requiere corrección antes de estabilizarse.

## Próximo frente recomendado

`OT-0259 — Corrección acople helper Parámetros hidrológicos base del expediente`