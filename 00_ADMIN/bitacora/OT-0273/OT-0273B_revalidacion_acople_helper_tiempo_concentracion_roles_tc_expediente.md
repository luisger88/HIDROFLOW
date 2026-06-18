# OT-0273B — Revalidación acople helper Tiempo de concentración y roles Tc del expediente

## Resumen

```json
{
  "validacion": "OT-0273",
  "helper": "construirBloqueTiempoConcentracionRolesTcExpediente",
  "totalControles": 15,
  "controlesAprobados": 11,
  "controlesFallidos": 4,
  "controlesFallidosIds": [
    "constructor_principal_sin_error_runtime",
    "constructor_principal_genera_salida",
    "bloque_tc_real_detectado",
    "salida_real_usa_campos_delegados"
  ],
  "buildAprobado": true,
  "acopleAuxiliarValidado": true,
  "acopleSalidaRealValidado": false,
  "requiereCorreccionSalidaReal": true,
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

### archivo_helper_tc_existe

```json
{
  "id": "archivo_helper_tc_existe",
  "descripcion": "Archivo del helper Tc roles existe",
  "aprobado": true
}
```

### import_helper_tc_unico

```json
{
  "id": "import_helper_tc_unico",
  "descripcion": "Import del helper Tc roles presente una sola vez",
  "ocurrencias": 1,
  "aprobado": true
}
```

### modulo_temporal_importado

```json
{
  "id": "modulo_temporal_importado",
  "descripcion": "Módulo temporal importado con imports file://",
  "error": "",
  "aprobado": true
}
```

### secciones_obligatorias_sin_helper_tc

```json
{
  "id": "secciones_obligatorias_sin_helper_tc",
  "descripcion": "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO no contiene llamadas a helper Tc",
  "aprobado": true
}
```

### funcion_auxiliar_delegada

```json
{
  "id": "funcion_auxiliar_delegada",
  "descripcion": "Función auxiliar Tc roles delega al helper",
  "aprobado": true
}
```

### constructor_principal_usa_funcion_auxiliar_tc

```json
{
  "id": "constructor_principal_usa_funcion_auxiliar_tc",
  "descripcion": "Constructor principal usa construirLineasTiempoConcentracionRolesTcExpediente en la salida real",
  "aprobado": true
}
```

### salida_directa_auxiliar_usa_helper

```json
{
  "id": "salida_directa_auxiliar_usa_helper",
  "descripcion": "Salida directa de la función auxiliar usa normalización delegada del helper",
  "salidaAuxiliar": [
    "## 3. Tiempo de concentración y roles Tc",
    "Tc comparador: —",
    "Tr global activo: — años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "aprobado": true
}
```

### constructor_principal_sin_error_runtime

```json
{
  "id": "constructor_principal_sin_error_runtime",
  "descripcion": "Constructor principal ejecuta sin error runtime",
  "error": "ReferenceError: trDisenoActivoExpediente is not defined",
  "aprobado": false
}
```

### constructor_principal_genera_salida

```json
{
  "id": "constructor_principal_genera_salida",
  "descripcion": "Constructor principal genera salida documental",
  "longitud": 0,
  "aprobado": false
}
```

### bloque_tc_real_detectado

```json
{
  "id": "bloque_tc_real_detectado",
  "descripcion": "La salida real contiene bloque ## 3 antes de ## 4",
  "aprobado": false
}
```

### salida_real_usa_campos_delegados

```json
{
  "id": "salida_real_usa_campos_delegados",
  "descripcion": "La salida real del constructor principal usa normalización delegada del helper",
  "bloqueTcReal": "",
  "esperado": [
    "## 3. Tiempo de concentración y roles Tc",
    "Tc comparador: —",
    "Tr global activo: — años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "aprobado": false
}
```

### constructor_principal_sin_bloque_inline_tc

```json
{
  "id": "constructor_principal_sin_bloque_inline_tc",
  "descripcion": "El constructor principal no conserva bloque inline de Tc antes de la sección 4",
  "aprobado": true
}
```

### bloque_tc_sin_tokens_invalidos

```json
{
  "id": "bloque_tc_sin_tokens_invalidos",
  "descripcion": "Bloque Tc real sin tokens inválidos",
  "hallazgos": [],
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

- La función auxiliar queda delegada al helper validado.
- La salida directa de la función auxiliar fue evaluada en aislamiento.
- La salida real del constructor principal fue evaluada por separado.
- La salida real usa la función auxiliar delegada.
- El bloque inline antiguo no permanece en el constructor principal.
- No se corrigió código funcional en esta OT.
- No se modificó motor.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.

## Decisión

El acople requiere corrección adicional antes de estabilizar el bloque.

## Próximo frente recomendado

`OT-0274 — Corrección runtime variable trDisenoActivoExpediente en salida real Tc roles`