# OT-0316B — Revalidación salida real Escenario Q-Tr activo del expediente

## Resumen

```json
{
  "validacion": "OT-0316",
  "bloque": "Escenario Q-Tr activo",
  "foco": "salida real/exportable del expediente hidrológico mínimo",
  "totalControles": 20,
  "controlesAprobados": 19,
  "controlesFallidos": 1,
  "controlesFallidosIds": [
    "bloque_qtr_contiene_periodo_retorno_prueba"
  ],
  "buildAprobado": true,
  "salidaRealQTrRevalidada": false,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "recalculaQTr": false,
  "seleccionaPeriodoRetornoAdoptado": false
}
```

## Bloque Escenario Q-Tr activo extraído de salida real

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: activo
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: —
Q-Tr activo: —
```

## Controles evaluados

### constructor_existe

```json
{
  "id": "constructor_existe",
  "descripcion": "Constructor del expediente existe",
  "aprobado": true
}
```

### helper_qtr_existe

```json
{
  "id": "helper_qtr_existe",
  "descripcion": "Helper Escenario Q-Tr activo existe",
  "aprobado": true
}
```

### constructor_importa_helper_qtr

```json
{
  "id": "constructor_importa_helper_qtr",
  "descripcion": "Constructor importa el helper Escenario Q-Tr activo",
  "ocurrencias": 1,
  "aprobado": true
}
```

### constructor_usa_lineas_qtr

```json
{
  "id": "constructor_usa_lineas_qtr",
  "descripcion": "Constructor usa construirLineasEscenarioQTrActivoExpediente en la salida real",
  "aprobado": true
}
```

### constructor_importa_en_copia_temporal_esm

```json
{
  "id": "constructor_importa_en_copia_temporal_esm",
  "descripcion": "Constructor importa correctamente en copia temporal ESM con imports relativos normalizados a .js",
  "directorioTemporal": "C:\\Users\\User\\AppData\\Local\\Temp\\hidroflow-ot0316-qtr-documentos-fe4RLe",
  "error": "",
  "aprobado": true
}
```

### constructor_default_disponible

```json
{
  "id": "constructor_default_disponible",
  "descripcion": "Constructor principal del expediente está disponible",
  "aprobado": true
}
```

### salida_real_generada

```json
{
  "id": "salida_real_generada",
  "descripcion": "La salida real/exportable del expediente fue generada como texto",
  "longitudTexto": 3646,
  "aprobado": true
}
```

### salida_real_contiene_bloque_qtr

```json
{
  "id": "salida_real_contiene_bloque_qtr",
  "descripcion": "La salida real contiene el bloque Escenario Q-Tr activo",
  "aprobado": true
}
```

### salida_real_qtr_unico

```json
{
  "id": "salida_real_qtr_unico",
  "descripcion": "El bloque Escenario Q-Tr activo aparece una sola vez",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_qtr_extraible

```json
{
  "id": "bloque_qtr_extraible",
  "descripcion": "El bloque Q-Tr puede extraerse entre sección 5 y sección 6",
  "bloqueQTr": "## 5. Escenario Q-Tr activo — control de trazabilidad\nEstado: activo\nLectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.\nPeriodo de retorno activo: —\nQ-Tr activo: —",
  "aprobado": true
}
```

### bloque_qtr_antes_resumen_q5

```json
{
  "id": "bloque_qtr_antes_resumen_q5",
  "descripcion": "El bloque Q-Tr activo queda antes del bloque Resumen Q-5 auditado",
  "indiceQTr": 1474,
  "indiceResumenQ5": 1672,
  "aprobado": true
}
```

### bloque_qtr_contiene_estado_o_trazabilidad

```json
{
  "id": "bloque_qtr_contiene_estado_o_trazabilidad",
  "descripcion": "El bloque Q-Tr contiene señales documentales de estado o trazabilidad",
  "aprobado": true
}
```

### bloque_qtr_contiene_periodo_retorno_prueba

```json
{
  "id": "bloque_qtr_contiene_periodo_retorno_prueba",
  "descripcion": "El bloque Q-Tr debe reflejar explícitamente el valor de periodo de retorno de prueba cuando el contexto lo expone",
  "valorEsperado": "100",
  "bloqueQTr": "## 5. Escenario Q-Tr activo — control de trazabilidad\nEstado: activo\nLectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.\nPeriodo de retorno activo: —\nQ-Tr activo: —",
  "aprobado": false
}
```

### bloque_qtr_sin_tokens_invalidos

```json
{
  "id": "bloque_qtr_sin_tokens_invalidos",
  "descripcion": "El bloque Q-Tr no contiene tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### salida_real_sin_tokens_invalidos

```json
{
  "id": "salida_real_sin_tokens_invalidos",
  "descripcion": "La salida real completa no contiene tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### helper_qtr_conserva_exportacion

```json
{
  "id": "helper_qtr_conserva_exportacion",
  "descripcion": "Helper Q-Tr conserva exportación esperada",
  "aprobado": true
}
```

### constructor_sin_modificacion_git_en_ot0316

```json
{
  "id": "constructor_sin_modificacion_git_en_ot0316",
  "descripcion": "Constructor no fue modificado en OT-0316",
  "aprobado": true
}
```

### helper_qtr_sin_modificacion_git_en_ot0316

```json
{
  "id": "helper_qtr_sin_modificacion_git_en_ot0316",
  "descripcion": "Helper Q-Tr no fue modificado en OT-0316",
  "aprobado": true
}
```

### comparador_sin_modificacion_git_en_ot0316

```json
{
  "id": "comparador_sin_modificacion_git_en_ot0316",
  "descripcion": "ComparadorMultiMetodo.jsx no fue modificado en OT-0316",
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

- La revalidación detectó controles fallidos que deben corregirse antes de avanzar.
- Los controles fallidos quedan listados en el resumen JSON.
- No se aplicó corrección funcional en esta OT.

## Decisión

La salida real/exportable requiere revisión antes de avanzar.

## Próximo frente recomendado

`OT-0317 — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente`