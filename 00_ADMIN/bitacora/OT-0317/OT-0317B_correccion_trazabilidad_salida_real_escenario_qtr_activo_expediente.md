# OT-0317B — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente

## Resumen

```json
{
  "validacion": "OT-0317",
  "bloque": "Escenario Q-Tr activo",
  "totalControles": 10,
  "controlesAprobados": 10,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "salidaRealQTrCorregida": true,
  "buildAprobado": true,
  "recalculaQTr": false,
  "seleccionaPeriodoRetornoAdoptado": false,
  "modificaMotor": false,
  "modificaUI": false
}
```

## Bloque Q-Tr activo extraído de salida real corregida

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: activo
Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.
Periodo de retorno activo: 100
Q-Tr activo: Tr 100 años
```

## Controles evaluados

### bloque_qtr_presente

```json
{
  "id": "bloque_qtr_presente",
  "aprobado": true
}
```

### bloque_qtr_unico

```json
{
  "id": "bloque_qtr_unico",
  "ocurrencias": 1,
  "aprobado": true
}
```

### bloque_qtr_extraible

```json
{
  "id": "bloque_qtr_extraible",
  "bloqueQTr": "## 5. Escenario Q-Tr activo — control de trazabilidad\nEstado: activo\nLectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.\nPeriodo de retorno activo: 100\nQ-Tr activo: Tr 100 años",
  "aprobado": true
}
```

### bloque_qtr_expone_periodo_retorno_100

```json
{
  "id": "bloque_qtr_expone_periodo_retorno_100",
  "bloqueQTr": "## 5. Escenario Q-Tr activo — control de trazabilidad\nEstado: activo\nLectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.\nPeriodo de retorno activo: 100\nQ-Tr activo: Tr 100 años",
  "aprobado": true
}
```

### bloque_qtr_activo_no_es_fallback

```json
{
  "id": "bloque_qtr_activo_no_es_fallback",
  "bloqueQTr": "## 5. Escenario Q-Tr activo — control de trazabilidad\nEstado: activo\nLectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.\nPeriodo de retorno activo: 100\nQ-Tr activo: Tr 100 años",
  "aprobado": true
}
```

### bloque_qtr_sin_tokens_invalidos

```json
{
  "id": "bloque_qtr_sin_tokens_invalidos",
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

### comparador_sin_modificacion

```json
{
  "id": "comparador_sin_modificacion",
  "aprobado": true
}
```

### resumen_q5_sin_modificacion

```json
{
  "id": "resumen_q5_sin_modificacion",
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

- La salida real/exportable expone el periodo de retorno activo.
- La salida real/exportable ya no deja `Q-Tr activo` como fallback vacío.
- La corrección no recalcula Q-Tr.
- La corrección no selecciona periodo de retorno adoptado.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó el bloque `Resumen Q-5 auditado`.
- Build Vite aprobado.

## Decisión

La trazabilidad de salida real del bloque `Escenario Q-Tr activo` queda corregida en el alcance de OT-0317.