# OT-0267B — Validación aislada helper bloque Tiempo de concentración y roles Tc del expediente

## Resumen

```json
{
  "validacion": "OT-0267",
  "helper": "construirBloqueTiempoConcentracionRolesTcExpediente",
  "totalControles": 12,
  "controlesAprobados": 12,
  "controlesFallidos": 0,
  "totalCasos": 8,
  "casosAprobados": 8,
  "casosFallidos": [],
  "buildAprobado": true,
  "helperValidado": true,
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

### import_helper_ok

```json
{
  "id": "import_helper_ok",
  "descripcion": "Import ESM del helper aprobado",
  "error": "",
  "aprobado": true
}
```

### export_nominal_presente

```json
{
  "id": "export_nominal_presente",
  "descripcion": "Export nominal presente",
  "aprobado": true
}
```

### export_default_presente

```json
{
  "id": "export_default_presente",
  "descripcion": "Export default presente",
  "aprobado": true
}
```

### export_default_equivale_nominal

```json
{
  "id": "export_default_equivale_nominal",
  "descripcion": "Export default equivale al export nominal",
  "aprobado": true
}
```

### casos_aprobados

```json
{
  "id": "casos_aprobados",
  "descripcion": "Todos los casos funcionales aislados aprobados",
  "totalCasos": 8,
  "casosAprobados": 8,
  "casosFallidos": [],
  "aprobado": true
}
```

### salida_siempre_string_array

```json
{
  "id": "salida_siempre_string_array",
  "descripcion": "Todas las salidas son string[]",
  "aprobado": true
}
```

### campos_minimos_presentes

```json
{
  "id": "campos_minimos_presentes",
  "descripcion": "La salida con título contiene los campos mínimos",
  "aprobado": true
}
```

### sin_tokens_invalidos

```json
{
  "id": "sin_tokens_invalidos",
  "descripcion": "Las salidas no contienen tokens inválidos",
  "hallazgos": [],
  "aprobado": true
}
```

### sin_frases_prohibidas

```json
{
  "id": "sin_frases_prohibidas",
  "descripcion": "Las salidas no contienen frases prohibidas",
  "hallazgos": [],
  "aprobado": true
}
```

### no_muta_entradas

```json
{
  "id": "no_muta_entradas",
  "descripcion": "El helper no muta entradas",
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

## Casos evaluados

### entrada_completa_con_titulo

```json
{
  "id": "entrada_completa_con_titulo",
  "aprobado": true,
  "entrada": {
    "Tc_final": 114.23,
    "trDisenoActivoExpediente": 100,
    "incluirTitulo": true
  },
  "salida": [
    "## 3. Tiempo de concentración y roles Tc",
    "Tc comparador: 114.2 min",
    "Tr global activo: 100 años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "error": ""
}
```

### entrada_completa_sin_titulo

```json
{
  "id": "entrada_completa_sin_titulo",
  "aprobado": true,
  "entrada": {
    "Tc_final": 114.23,
    "trDisenoActivoExpediente": 100,
    "incluirTitulo": false
  },
  "salida": [
    "Tc comparador: 114.2 min",
    "Tr global activo: 100 años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "error": ""
}
```

### entrada_vacia

```json
{
  "id": "entrada_vacia",
  "aprobado": true,
  "entrada": {},
  "salida": [
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
  "error": ""
}
```

### entrada_parcial_tc

```json
{
  "id": "entrada_parcial_tc",
  "aprobado": true,
  "entrada": {
    "Tc_final": 0,
    "incluirTitulo": true
  },
  "salida": [
    "## 3. Tiempo de concentración y roles Tc",
    "Tc comparador: 0.0 min",
    "Tr global activo: — años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "error": ""
}
```

### entrada_parcial_tr_textual

```json
{
  "id": "entrada_parcial_tr_textual",
  "aprobado": true,
  "entrada": {
    "trDisenoActivoExpediente": "  100  ",
    "incluirTitulo": true
  },
  "salida": [
    "## 3. Tiempo de concentración y roles Tc",
    "Tc comparador: —",
    "Tr global activo: 100 años",
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ],
  "error": ""
}
```

### valores_null_undefined_nan_objeto

```json
{
  "id": "valores_null_undefined_nan_objeto",
  "aprobado": true,
  "entrada": {
    "Tc_final": {
      "valor": 114
    },
    "trDisenoActivoExpediente": {
      "valor": 100
    },
    "incluirTitulo": true
  },
  "salida": [
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
  "error": ""
}
```

### tc_nan_tr_infinito

```json
{
  "id": "tc_nan_tr_infinito",
  "aprobado": true,
  "entrada": {
    "Tc_final": null,
    "trDisenoActivoExpediente": null,
    "incluirTitulo": true
  },
  "salida": [
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
  "error": ""
}
```

### cadenas_vacias

```json
{
  "id": "cadenas_vacias",
  "aprobado": true,
  "entrada": {
    "Tc_final": "   ",
    "trDisenoActivoExpediente": "   ",
    "incluirTitulo": true
  },
  "salida": [
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
  "error": ""
}
```

## Lectura técnica

- La validación se ejecutó de forma aislada sobre el helper puro.
- No se acopló el helper al constructor principal.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó motor.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.

## Decisión

El helper `construirBloqueTiempoConcentracionRolesTcExpediente` queda validado aisladamente.

## Próximo frente recomendado

`OT-0268 — Decisión integración helper bloque Tiempo de concentración y roles Tc del expediente`