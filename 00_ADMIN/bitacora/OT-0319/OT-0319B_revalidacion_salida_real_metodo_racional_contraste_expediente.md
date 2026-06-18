# OT-0319B — Revalidación salida real Método Racional como contraste global independiente

## Resumen

```json
{
  "validacion": "OT-0319",
  "bloque": "Método Racional — contraste global independiente",
  "totalControles": 17,
  "controlesAprobados": 15,
  "controlesFallidos": 2,
  "controlesFallidosIds": [
    "bloque_racional_no_adoptivo",
    "bloque_racional_expone_tabla_si_hay_resultados"
  ],
  "salidaRealMetodoRacionalRevalidada": false,
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
Estado: sección contractual inicial del helper puro.
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
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nEstado: sección contractual inicial del helper puro.",
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
  "indiceContraste": 1948,
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
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nEstado: sección contractual inicial del helper puro.",
  "aprobado": true
}
```

### bloque_racional_no_adoptivo

```json
{
  "id": "bloque_racional_no_adoptivo",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nEstado: sección contractual inicial del helper puro.",
  "aprobado": false
}
```

### bloque_racional_expone_tabla_si_hay_resultados

```json
{
  "id": "bloque_racional_expone_tabla_si_hay_resultados",
  "descripcion": "Si contextoBase.metodo_racional.resultados contiene datos, el bloque racional debe exponer tabla racional.",
  "bloqueRacional": "## 7. Método Racional — contraste global independiente\nUso: contraste global independiente de caudal pico.\nEstado: sección contractual inicial del helper puro.",
  "aprobado": false
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

### constructor_sin_modificacion

```json
{
  "id": "constructor_sin_modificacion",
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

- La revalidación detectó controles fallidos que deben revisarse antes de avanzar.
- Los controles fallidos quedan listados en el resumen JSON.
- No se aplicó corrección funcional en esta OT.

## Decisión

La salida real/exportable del bloque `Método Racional — contraste global independiente` requiere revisión antes de avanzar.

## Próximo frente recomendado

`OT-0320 — Corrección salida real Método Racional como contraste global independiente`