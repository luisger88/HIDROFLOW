# OT-0320B — Corrección salida real Método Racional como contraste global independiente

## Resumen

```json
{
  "validacion": "OT-0320",
  "bloque": "Método Racional — contraste global independiente",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealMetodoRacionalCorregida": true,
  "buildAprobado": true,
  "recalculaMetodoRacional": false,
  "seleccionaMetodoRacionalAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque Método Racional extraído de salida real

```text
## 7. Método Racional — contraste global independiente
Uso: contraste global independiente de caudal pico.
Carácter: no adoptivo principal; requiere revisión técnica antes de adopción.
Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.

Tabla Método Racional:
| Tr | I | P | C | Q |
|---:|---:|---:|---:|---:|
| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |
```

## Controles evaluados

### constructor_existe

```json
{
  "id": "constructor_existe",
  "aprobado": true
}
```

### bloque_racional_presente

```json
{
  "id": "bloque_racional_presente",
  "aprobado": true
}
```

### bloque_racional_unico

```json
{
  "id": "bloque_racional_unico",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_racional_extraible

```json
{
  "id": "bloque_racional_extraible",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nCarácter: no adoptivo principal; requiere revisión técnica antes de adopción.\nRelación con Q-5: no pertenece al bloque Q-5 de hidrogramas.\n\nTabla Método Racional:\n| Tr | I | P | C | Q |\n|---:|---:|---:|---:|---:|\n| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |",
  "aprobado": true
}
```

### bloque_racional_despues_q5

```json
{
  "id": "bloque_racional_despues_q5",
  "indiceQ5": 1686,
  "indiceRacional": 1787,
  "aprobado": true
}
```

### bloque_racional_antes_contraste

```json
{
  "id": "bloque_racional_antes_contraste",
  "indiceRacional": 1787,
  "indiceContraste": 2161,
  "aprobado": true
}
```

### bloque_racional_separado_de_q5

```json
{
  "id": "bloque_racional_separado_de_q5",
  "bloqueQ5": "## 6. Resumen Q-5 auditado\nMétodos recibidos: 4\nEstado: sección contractual inicial del helper puro",
  "aprobado": true
}
```

### bloque_racional_declara_contraste_independiente

```json
{
  "id": "bloque_racional_declara_contraste_independiente",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nCarácter: no adoptivo principal; requiere revisión técnica antes de adopción.\nRelación con Q-5: no pertenece al bloque Q-5 de hidrogramas.\n\nTabla Método Racional:\n| Tr | I | P | C | Q |\n|---:|---:|---:|---:|---:|\n| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |",
  "aprobado": true
}
```

### bloque_racional_no_adoptivo

```json
{
  "id": "bloque_racional_no_adoptivo",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nCarácter: no adoptivo principal; requiere revisión técnica antes de adopción.\nRelación con Q-5: no pertenece al bloque Q-5 de hidrogramas.\n\nTabla Método Racional:\n| Tr | I | P | C | Q |\n|---:|---:|---:|---:|---:|\n| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |",
  "aprobado": true
}
```

### bloque_racional_expone_tabla_si_hay_resultados

```json
{
  "id": "bloque_racional_expone_tabla_si_hay_resultados",
  "descripcion": "Si contextoBase.metodo_racional.resultados contiene datos, el bloque racional debe exponer tabla racional.",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nCarácter: no adoptivo principal; requiere revisión técnica antes de adopción.\nRelación con Q-5: no pertenece al bloque Q-5 de hidrogramas.\n\nTabla Método Racional:\n| Tr | I | P | C | Q |\n|---:|---:|---:|---:|---:|\n| 100 | 88,12 mm/h | 74,35 mm | 0,62 | 711,42 m³/s |",
  "aprobado": true
}
```

### bloque_racional_sin_tokens_invalidos

```json
{
  "id": "bloque_racional_sin_tokens_invalidos",
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

### constructor_modificado_en_alcance_ot0320

```json
{
  "id": "constructor_modificado_en_alcance_ot0320",
  "descripcion": "El constructor puede modificarse en OT-0320 porque el bloque Método Racional vive inline allí.",
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

- La salida real/exportable conserva el bloque `Método Racional — contraste global independiente`.
- El bloque está separado del bloque `Resumen Q-5 auditado`.
- El bloque mantiene lectura no adoptiva.
- Si hay resultados racionales en contexto, la tabla racional se expone.
- No se recalcula Método Racional.
- No se selecciona Método Racional como adoptado.
- No se modificó código funcional.
- Build Vite aprobado.

## Decisión

La salida real/exportable del bloque `Método Racional — contraste global independiente` queda corregida en el alcance de OT-0320.

## Próximo frente recomendado

`OT-0321 — Revalidación salida real Método Racional corregido como contraste global independiente`