# OT-0323B — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5

## Resumen

```json
{
  "validacion": "OT-0323",
  "bloque": "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "totalControles": 18,
  "controlesAprobados": 15,
  "controlesFallidos": 3,
  "controlesFallidosIds": [
    "bloque_control_expone_pe_area_volumen",
    "bloque_control_expone_q5_principal",
    "bloque_control_expone_qtr_activo"
  ],
  "salidaRealControlPeAreaVolumenQ5Revalidada": false,
  "buildAprobado": true,
  "recalculaVolumen": false,
  "recalculaQ5": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque Control Pe–Área–Volumen/Q-5 extraído de salida real

```text
## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5
Estado: pendiente de integración completa con datos derivados del expediente operativo.
```

## Controles evaluados

### constructor_existe

```json
{
  "id": "constructor_existe",
  "aprobado": true
}
```

### bloque_control_presente

```json
{
  "id": "bloque_control_presente",
  "aprobado": true
}
```

### bloque_control_unico

```json
{
  "id": "bloque_control_unico",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_control_extraible

```json
{
  "id": "bloque_control_extraible",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": true
}
```

### bloque_control_despues_contraste_q5_racional

```json
{
  "id": "bloque_control_despues_contraste_q5_racional",
  "indiceContraste": 2173,
  "indiceControl": 2295,
  "aprobado": true
}
```

### bloque_control_antes_diagnostico_temporal

```json
{
  "id": "bloque_control_antes_diagnostico_temporal",
  "indiceControl": 2295,
  "indiceDiagnostico": 2442,
  "aprobado": true
}
```

### bloque_control_expone_lectura_control_interno

```json
{
  "id": "bloque_control_expone_lectura_control_interno",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": true
}
```

### bloque_control_expone_pe_area_volumen

```json
{
  "id": "bloque_control_expone_pe_area_volumen",
  "descripcion": "El bloque debe exponer explícitamente Pe, Área y Volumen esperado si esos datos están disponibles.",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": false
}
```

### bloque_control_expone_q5_principal

```json
{
  "id": "bloque_control_expone_q5_principal",
  "descripcion": "El bloque debe exponer Método Q-5 principal, Volumen Q-5 principal y relación Q-5/esperado si esos datos están disponibles.",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": false
}
```

### bloque_control_expone_qtr_activo

```json
{
  "id": "bloque_control_expone_qtr_activo",
  "descripcion": "El bloque debe conservar referencia al Q-Tr activo como parte del control cruzado.",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": false
}
```

### bloque_control_no_incrusta_contraste

```json
{
  "id": "bloque_control_no_incrusta_contraste",
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nEstado: pendiente de integración completa con datos derivados del expediente operativo.",
  "aprobado": true
}
```

### bloque_control_sin_tokens_invalidos

```json
{
  "id": "bloque_control_sin_tokens_invalidos",
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

### constructor_sin_modificacion_en_ot0323

```json
{
  "id": "constructor_sin_modificacion_en_ot0323",
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

La salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` requiere revisión antes de avanzar.

## Próximo frente recomendado

`OT-0324 — Corrección salida real Control Pe–Área–Volumen/Q-5`