# OT-0322B — Revalidación salida real Contraste Q-5 vs Método Racional

## Resumen

```json
{
  "validacion": "OT-0322",
  "bloque": "Contraste Q-5 vs Método Racional",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealContrasteQ5RacionalRevalidada": true,
  "buildAprobado": true,
  "recalculaQ5": false,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque Contraste Q-5 vs Método Racional extraído de salida real

```text
## 8. Contraste Q-5 vs Método Racional
Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.
```

## Controles evaluados

### constructor_existe

```json
{
  "id": "constructor_existe",
  "aprobado": true
}
```

### bloque_contraste_presente

```json
{
  "id": "bloque_contraste_presente",
  "aprobado": true
}
```

### bloque_contraste_unico

```json
{
  "id": "bloque_contraste_unico",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_contraste_extraible

```json
{
  "id": "bloque_contraste_extraible",
  "bloqueContraste": "## 8. Contraste Q-5 vs Método Racional\nLectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  "aprobado": true
}
```

### bloque_contraste_despues_metodo_racional

```json
{
  "id": "bloque_contraste_despues_metodo_racional",
  "indiceRacional": 1787,
  "indiceContraste": 2161,
  "aprobado": true
}
```

### bloque_contraste_antes_control_volumen

```json
{
  "id": "bloque_contraste_antes_control_volumen",
  "indiceContraste": 2161,
  "indiceControlVolumen": 2283,
  "aprobado": true
}
```

### contraste_declara_complementarios_no_equivalentes

```json
{
  "id": "contraste_declara_complementarios_no_equivalentes",
  "bloqueContraste": "## 8. Contraste Q-5 vs Método Racional\nLectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  "aprobado": true
}
```

### contraste_no_incrusta_tabla_racional

```json
{
  "id": "contraste_no_incrusta_tabla_racional",
  "bloqueContraste": "## 8. Contraste Q-5 vs Método Racional\nLectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  "aprobado": true
}
```

### contraste_no_incrusta_resumen_q5

```json
{
  "id": "contraste_no_incrusta_resumen_q5",
  "bloqueContraste": "## 8. Contraste Q-5 vs Método Racional\nLectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  "aprobado": true
}
```

### bloques_q5_racional_contraste_separados

```json
{
  "id": "bloques_q5_racional_contraste_separados",
  "aprobado": true
}
```

### bloque_contraste_sin_tokens_invalidos

```json
{
  "id": "bloque_contraste_sin_tokens_invalidos",
  "hallazgos": [],
  "aprobado": true
}
```

### salida_real_sin_tokens_invalidos

```json
{
  "id": "salida_real_sin_tokens_invalidos",
  "hallazgos": [],
  "aprobado": true
}
```

### constructor_sin_modificacion_en_ot0322

```json
{
  "id": "constructor_sin_modificacion_en_ot0322",
  "aprobado": true
}
```

### comparador_sin_modificacion

```json
{
  "id": "comparador_sin_modificacion",
  "aprobado": true
}
```

### qtr_sin_modificacion

```json
{
  "id": "qtr_sin_modificacion",
  "aprobado": true
}
```

### q5_sin_modificacion

```json
{
  "id": "q5_sin_modificacion",
  "aprobado": true
}
```

### build_vite

```json
{
  "id": "build_vite",
  "aprobado": true
}
```

## Lectura técnica

- La salida real/exportable conserva el bloque `Contraste Q-5 vs Método Racional`.
- El bloque se mantiene separado de `Resumen Q-5 auditado` y de `Método Racional`.
- El bloque declara que Q-5 y Método Racional son complementarios, pero no equivalentes.
- El bloque no incrusta tablas de Q-5 ni Método Racional.
- No se recalcula Q-5.
- No se recalcula Método Racional.
- No se selecciona método adoptado.
- No se modificó código funcional en OT-0322.
- Build Vite aprobado.

## Decisión

La salida real/exportable del bloque `Contraste Q-5 vs Método Racional` queda revalidada desde main en el alcance de OT-0322.

## Próximo frente recomendado

`OT-0323 — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5`