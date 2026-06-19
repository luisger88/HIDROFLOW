# OT-0324B — Corrección salida real Control Pe–Área–Volumen/Q-5

## Resumen

```json
{
  "validacion": "OT-0324",
  "bloque": "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "totalControles": 17,
  "controlesAprobados": 17,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealControlPeAreaVolumenQ5Corregida": true,
  "buildAprobado": true,
  "recalculaVolumen": false,
  "recalculaQ5": false,
  "seleccionaMetodoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque Control Pe–Área–Volumen/Q-5 extraído de salida real corregida

```text
## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5
Lectura técnica: control interno preliminar de consistencia volumétrica; no recalcula volumen, no recalcula Q-5 y no selecciona método adoptado.
Pe total: 56,65 mm
Área: 46,8516 km²
Volumen esperado: 2.654.250,9 m³
Método Q-5 principal: SCS Unit Hydrograph
Volumen Q-5 principal: 2.654.250,9 m³
Relación volumen Q-5 / volumen esperado: 1
Resultado de consistencia volumétrica: relación volumétrica documentada para control interno preliminar
Q-Tr activo: Tr 100 años
```

## Controles evaluados

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
  "bloqueControl": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5\nLectura técnica: control interno preliminar de consistencia volumétrica; no recalcula volumen, no recalcula Q-5 y no selecciona método adoptado.\nPe total: 56,65 mm\nÁrea: 46,8516 km²\nVolumen esperado: 2.654.250,9 m³\nMétodo Q-5 principal: SCS Unit Hydrograph\nVolumen Q-5 principal: 2.654.250,9 m³\nRelación volumen Q-5 / volumen esperado: 1\nResultado de consistencia volumétrica: relación volumétrica documentada para control interno preliminar\nQ-Tr activo: Tr 100 años",
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
  "indiceDiagnostico": 2821,
  "aprobado": true
}
```

### bloque_control_expone_pe_area_volumen

```json
{
  "id": "bloque_control_expone_pe_area_volumen",
  "aprobado": true
}
```

### bloque_control_expone_q5_principal

```json
{
  "id": "bloque_control_expone_q5_principal",
  "aprobado": true
}
```

### bloque_control_expone_resultado_consistencia

```json
{
  "id": "bloque_control_expone_resultado_consistencia",
  "aprobado": true
}
```

### bloque_control_expone_qtr_activo

```json
{
  "id": "bloque_control_expone_qtr_activo",
  "aprobado": true
}
```

### bloque_control_declara_no_recalculo

```json
{
  "id": "bloque_control_declara_no_recalculo",
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

### constructor_modificado_en_alcance_ot0324

```json
{
  "id": "constructor_modificado_en_alcance_ot0324",
  "descripcion": "El constructor puede modificarse en OT-0324 porque el bloque vive inline allí.",
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

- La salida real/exportable expone Pe, Área, Volumen esperado, Método Q-5 principal, Volumen Q-5 principal, relación Q-5/esperado, resultado de consistencia volumétrica y Q-Tr activo.
- La corrección no recalcula volumen.
- La corrección no recalcula Q-5.
- La corrección no selecciona método adoptado.
- La modificación funcional se limita al constructor documental del expediente.
- Build Vite aprobado.

## Decisión

La salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` queda corregida en el alcance de OT-0324.