# OT-0281B — Validación aislada helper bloque Volumen de referencia del expediente

## Resumen

```json
{
  "validacion": "OT-0281",
  "helper": "construirBloqueVolumenReferenciaExpediente",
  "totalControles": 19,
  "controlesAprobados": 18,
  "controlesFallidos": 1,
  "controlesFallidosIds": [
    "sin_referencias_bloques_prohibidos_en_fuente"
  ],
  "buildAprobado": true,
  "helperValidadoAislado": false,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Controles evaluados

### archivo_helper_existe

```json
{
  "id": "archivo_helper_existe",
  "descripcion": "Archivo del helper existe",
  "aprobado": true
}
```

### modulo_importa_sin_error

```json
{
  "id": "modulo_importa_sin_error",
  "descripcion": "El helper importa sin error runtime",
  "error": "",
  "aprobado": true
}
```

### exporta_constructor_principal

```json
{
  "id": "exporta_constructor_principal",
  "descripcion": "Exporta construirBloqueVolumenReferenciaExpediente",
  "aprobado": true
}
```

### exporta_formateador_lluvia

```json
{
  "id": "exporta_formateador_lluvia",
  "descripcion": "Exporta formatearLluviaEfectivaDocumental",
  "aprobado": true
}
```

### exporta_formateador_volumen

```json
{
  "id": "exporta_formateador_volumen",
  "descripcion": "Exporta formatearVolumenEsperadoDocumental",
  "aprobado": true
}
```

### salida_con_titulo_es_string_array

```json
{
  "id": "salida_con_titulo_es_string_array",
  "descripcion": "Salida con título devuelve string[]",
  "salidaConTitulo": [
    "## 4. Volumen de referencia",
    "Lluvia efectiva total: 56,65 mm",
    "Volumen esperado: 2.654.251 m³",
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ],
  "aprobado": true
}
```

### salida_con_titulo_contiene_lineas_minimas

```json
{
  "id": "salida_con_titulo_contiene_lineas_minimas",
  "descripcion": "Salida con título conserva líneas mínimas",
  "aprobado": true
}
```

### salida_sin_titulo_omite_solo_titulo

```json
{
  "id": "salida_sin_titulo_omite_solo_titulo",
  "descripcion": "Salida sin título omite solo el título y conserva tres líneas documentales",
  "salidaSinTitulo": [
    "Lluvia efectiva total: 56,65 mm",
    "Volumen esperado: 2.654.251 m³",
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ],
  "aprobado": true
}
```

### formato_lluvia_valida

```json
{
  "id": "formato_lluvia_valida",
  "descripcion": "La lluvia válida se formatea con unidad mm",
  "salida": "56,65 mm",
  "aprobado": true
}
```

### formato_volumen_valido

```json
{
  "id": "formato_volumen_valido",
  "descripcion": "El volumen válido se formatea con unidad m³",
  "salida": "2.654.251 m³",
  "aprobado": true
}
```

### fallback_lluvia_invalida

```json
{
  "id": "fallback_lluvia_invalida",
  "descripcion": "La lluvia inválida usa fallback documental",
  "salida": "—",
  "aprobado": true
}
```

### fallback_volumen_invalido

```json
{
  "id": "fallback_volumen_invalido",
  "descripcion": "El volumen inválido usa fallback documental",
  "salida": "—",
  "aprobado": true
}
```

### fallbacks_casos_invalidos

```json
{
  "id": "fallbacks_casos_invalidos",
  "descripcion": "Casos inválidos no rompen y usan fallback documental",
  "salidasFallback": [
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ],
    [
      "## 4. Volumen de referencia",
      "Lluvia efectiva total: —",
      "Volumen esperado: —",
      "Fórmula: Pe(mm) × Área(km²) × 1000."
    ]
  ],
  "aprobado": true
}
```

### sin_tokens_invalidos_salida_valida

```json
{
  "id": "sin_tokens_invalidos_salida_valida",
  "descripcion": "Salida válida sin tokens prohibidos",
  "hallazgos": [],
  "aprobado": true
}
```

### sin_tokens_invalidos_fallbacks

```json
{
  "id": "sin_tokens_invalidos_fallbacks",
  "descripcion": "Salidas fallback sin tokens prohibidos",
  "hallazgos": [],
  "aprobado": true
}
```

### no_muta_entrada

```json
{
  "id": "no_muta_entrada",
  "descripcion": "El helper no muta la entrada",
  "entradaAntes": {
    "peTotalMm": 56.65,
    "volumenEsperadoM3": 2654250.9,
    "incluirTitulo": true
  },
  "entradaDespues": {
    "peTotalMm": 56.65,
    "volumenEsperadoM3": 2654250.9,
    "incluirTitulo": true
  },
  "aprobado": true
}
```

### sin_referencias_bloques_prohibidos_en_fuente

```json
{
  "id": "sin_referencias_bloques_prohibidos_en_fuente",
  "descripcion": "Fuente sin referencias operativas a Q-Tr, Q-5, Racional o diagnóstico Q(t)",
  "aprobado": false
}
```

### sin_recalculo_explicito_volumen_en_fuente

```json
{
  "id": "sin_recalculo_explicito_volumen_en_fuente",
  "descripcion": "Fuente sin fórmula de recálculo de volumen",
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

- El helper fue validado en aislamiento.
- La validación no acopla el helper al constructor principal.
- La validación confirma salida `string[]`, título opcional, fallbacks y ausencia de tokens prohibidos.
- No se modificó motor.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se recalculó volumen.
- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Decisión

El helper requiere corrección antes de integración.

## Próximo frente recomendado

`OT-0282 — Corrección helper bloque Volumen de referencia del expediente`