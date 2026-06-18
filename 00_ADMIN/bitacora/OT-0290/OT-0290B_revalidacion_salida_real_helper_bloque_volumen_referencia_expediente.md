# OT-0290B — Revalidación salida real helper bloque Volumen de referencia del expediente

## Resumen

```json
{
  "validacion": "OT-0290",
  "bloque": "Volumen de referencia",
  "totalControles": 16,
  "controlesAprobados": 16,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "salidaRealVolumenRevalidada": true,
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
  "descripcion": "Archivo del constructor del expediente existe",
  "aprobado": true
}
```

### modulo_temporal_importa_sin_error

```json
{
  "id": "modulo_temporal_importa_sin_error",
  "descripcion": "Módulo temporal del expediente importa sin error",
  "error": "",
  "aprobado": true
}
```

### constructor_principal_disponible

```json
{
  "id": "constructor_principal_disponible",
  "descripcion": "Constructor principal disponible como función",
  "aprobado": true
}
```

### salida_real_sin_error

```json
{
  "id": "salida_real_sin_error",
  "descripcion": "Constructor genera salida real sin error",
  "error": "",
  "aprobado": true
}
```

### salida_real_texto_string

```json
{
  "id": "salida_real_texto_string",
  "descripcion": "Salida real contiene texto documental",
  "longitud": 3647,
  "aprobado": true
}
```

### bloque_volumen_exactamente_una_vez

```json
{
  "id": "bloque_volumen_exactamente_una_vez",
  "descripcion": "Bloque ## 4. Volumen de referencia aparece exactamente una vez",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_volumen_orden_correcto

```json
{
  "id": "bloque_volumen_orden_correcto",
  "descripcion": "Bloque Volumen aparece después de Tc y antes de Escenario Q-Tr",
  "aprobado": true
}
```

### bloque_volumen_lineas_minimas_exactas

```json
{
  "id": "bloque_volumen_lineas_minimas_exactas",
  "descripcion": "Bloque Volumen conserva líneas mínimas con valores documentales",
  "bloqueVolumenReal": "## 4. Volumen de referencia\nLluvia efectiva total: 56,65 mm\nVolumen esperado: 2.654.251 m³\nFórmula: Pe(mm) × Área(km²) × 1000.\n\n",
  "esperado": [
    "## 4. Volumen de referencia",
    "Lluvia efectiva total: 56,65 mm",
    "Volumen esperado: 2.654.251 m³",
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ],
  "aprobado": true
}
```

### bloque_volumen_sin_fallback_en_caso_valido

```json
{
  "id": "bloque_volumen_sin_fallback_en_caso_valido",
  "descripcion": "Bloque Volumen no usa fallback cuando recibe valores válidos",
  "aprobado": true
}
```

### bloque_volumen_sin_tokens_invalidos

```json
{
  "id": "bloque_volumen_sin_tokens_invalidos",
  "descripcion": "Bloque Volumen sin tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### salida_real_sin_tokens_invalidos

```json
{
  "id": "salida_real_sin_tokens_invalidos",
  "descripcion": "Salida real completa sin tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### bloque_tc_previo_presente

```json
{
  "id": "bloque_tc_previo_presente",
  "descripcion": "Bloque previo Tc permanece presente antes de Volumen",
  "aprobado": true
}
```

### bloque_qtr_posterior_presente

```json
{
  "id": "bloque_qtr_posterior_presente",
  "descripcion": "Bloque posterior Q-Tr permanece después de Volumen",
  "aprobado": true
}
```

### sin_modificacion_comparador

```json
{
  "id": "sin_modificacion_comparador",
  "descripcion": "Comparador no participa en esta revalidación",
  "aprobado": true
}
```

### sin_recalculo_volumen

```json
{
  "id": "sin_recalculo_volumen",
  "descripcion": "Revalidación no recalcula volumen; usa valores documentales de entrada",
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

## Evidencia principal

```text
## 4. Volumen de referencia
Lluvia efectiva total: 56,65 mm
Volumen esperado: 2.654.251 m³
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Lectura técnica

- La salida real/exportable del expediente conserva el bloque `Volumen de referencia`.
- El bloque aparece en el orden esperado, después de `Tiempo de concentración y roles Tc` y antes de `Escenario Q-Tr activo`.
- La salida real conserva valores documentales válidos para lluvia efectiva y volumen esperado.
- La revalidación no recalcula volumen.
- No se modificó el constructor.
- No se modificó el helper.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó motor.

## Decisión

La salida real del bloque `Volumen de referencia` queda revalidada.

## Próximo frente recomendado

`OT-0291 — Decisión estabilización bloque Volumen de referencia del expediente`