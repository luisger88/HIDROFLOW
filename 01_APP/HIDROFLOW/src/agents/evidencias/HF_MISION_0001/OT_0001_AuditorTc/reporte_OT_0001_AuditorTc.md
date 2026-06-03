# Reporte OT-0001 — HF_AuditorTc

## Estado

Abierto.

## Resumen ejecutivo

Pendiente de diligenciar.

## Evidencias revisadas

Pendiente.

## Hallazgos

### Hallazgo 1

- Archivo:
- Línea aproximada:
- Bloque:
- Variable:
- Descripción:
- Riesgo:
- Severidad:
- Relación con auditoría Tc–Tp–Qp–Volumen:

## Matriz preliminar Tc

| Método | Campo motor | Valor observado | Unidad inferida | Pendiente asociada | Riesgo |
|---|---|---:|---|---|---|
| Témez | Pendiente | 231.51 | min | Scp por auditar | Alto |
| Kirpich | Pendiente | 134.52 | min | H/L por auditar | Alto |
| Giandotti | Pendiente | 105.07 | min | desnivel geomorfológico por auditar | Alto |
| SCS-Ranser | Pendiente | 122.02 | min | Scp/Sc por auditar | Alto |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

## Observaciones del Auditor Jefe

Pendiente.


---

## Hallazgo 2 — Fuente operativa probable de calcTc localizada

- Archivo: src/services/hidroEngine.js
- Línea aproximada: 1594
- Bloque: export function calcTc(p)
- Variable clave: Sp = p.pendiente_cuenca
- Variables detectadas:
  - L = p.longitud_cauce
  - A = p.area
  - Sp = p.pendiente_cuenca

### Descripción

HF_AuditorTc localizó la fuente operativa probable de calcTc usada por HidroFlow en src/services/hidroEngine.js.

La función recibe un objeto p y deriva variables internas L, A y Sp. El campo Sp se asigna desde p.pendiente_cuenca, lo cual requiere auditoría porque puede representar Sc, Scp o un alias histórico usado por el motor.

### Riesgo

Alto.

Si p.pendiente_cuenca se está usando como pendiente del cauce principal para métodos que requieren Scp, puede existir ambigüedad técnica. Si realmente representa Sc, entonces algunos métodos Tc podrían estar usando pendiente de cuenca donde se requiere pendiente longitudinal del cauce.

### Relación con auditoría Tc–Tp–Qp–Volumen

Los Tc altos observados pueden estar relacionados con longitud, desnivel, pendiente usada o unidades. Este hallazgo alimenta directamente la auditoría de pendientes Scp vs Sc.

### Recomendación

No modificar la fórmula todavía. Primero documentar exactamente qué representa p.pendiente_cuenca en el catálogo de cuencas y en los parámetros consumidos por HidroFlow.

---

## Hallazgo 3 — Existe motor modular alterno de Tc

- Archivo: src/services/tc/calcTc.ts
- Bloque: export function calcTc(inputs: TcInputs): TcResultados

### Descripción

Se detectó una segunda implementación o motor modular de cálculo Tc en src/services/tc/calcTc.ts. Esta implementación parece devolver campos como kirpich_min, temez_min, giandotti_min y scs_lag_min.

### Riesgo

Medio.

Puede existir duplicidad entre el motor operativo en hidroEngine.js y el motor modular en services/tc/calcTc.ts. Se debe verificar cuál está conectado a HidroFlow y cuál es futuro, alterno o no operativo.

### Recomendación

Clasificar motores Tc:
1. Motor operativo actual.
2. Motor modular alterno.
3. Archivos históricos o copias.

No unificar ni reemplazar sin mandato del HF_AuditorJefe.

