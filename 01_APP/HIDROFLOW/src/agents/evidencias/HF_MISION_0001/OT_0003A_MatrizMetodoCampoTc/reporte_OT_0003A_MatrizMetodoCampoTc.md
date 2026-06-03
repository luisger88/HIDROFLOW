# Reporte OT-0003A — Matriz método-campo calcTc(p)

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
- Método:
- Fórmula observada:
- Variables usadas:
- Pendiente usada:
- Clasificación pendiente:
- Unidad esperada:
- Unidad inferida:
- Riesgo:
- Severidad:
- Relación con Tc alto:

## Matriz método-campo preliminar

| Método | Fórmula observada | Variables usadas | Pendiente usada | Clasificación | Riesgo |
|---|---|---|---|---|---|
| Témez | Pendiente | Pendiente | Pendiente | Por auditar | Alto |
| Kirpich | Pendiente | Pendiente | Pendiente | Por auditar | Alto |
| California | Pendiente | Pendiente | Pendiente | Por auditar | Alto |
| Giandotti | Pendiente | Pendiente | Pendiente | Por auditar | Alto |
| SCS-Ranser | Pendiente | Pendiente | Pendiente | Por auditar | Alto |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

---

## Hallazgo 1 — Matriz método-campo real de calcTc(p)

- Archivo: src/services/hidroEngine.js
- Bloque: export function calcTc(p)
- Líneas aproximadas: 194-245
- Severidad: Alta

### Variables base detectadas

- L = p.longitud_cauce
- A = p.area
- Sp = p.pendiente_cuenca
- So = ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000
- Lft = L * 3280.84
- Sf = (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84)
- Ss = SCS_RETENCION_MM / p.CN - 254

### Matriz método-campo auditada

| Método | Fórmula observada | Variables usadas | Pendiente usada | Clasificación | Riesgo |
|---|---|---|---|---|---|
| Témez (1978) | 0.3 * (L / (So/1000)^0.25)^0.76 | L, So | So/1000 | Scp derivada H/L | Alto: revisar unidades |
| Kirpich (1940) | 0.0078 * Lft^0.77 * Sf^-0.385 / 60 | Lft, Sf | Sf | Scp/H-L imperial | Alto: revisar conversión pies |
| California (1942) | 0.0195 * (L*1000)^0.77 * (So/1000)^-0.385 / 60 | L, So | So/1000 | Scp/H-L métrico | Alto: revisar unidades |
| Giandotti (1934) | (4*sqrt(A)+1.5*L)/(0.8*sqrt(cota_max-cota_min)) | A, L, cota_max, cota_min | No explícita | Desnivel geomorfológico | Alto: verificar cotas usadas |
| SCS-Ranser (1958) | (L*1000)^0.8 * (Ss+1)^0.7 / (4655 * Sp^0.5) | L, Ss, Sp, CN | Sp = pendiente_cuenca | Ambigua Scp/Sc | Crítico: único uso directo de pendiente_cuenca |
| Pérez-Montg. (1985) | 0.1039 * L^0.7 * So^-0.3 | L, So | So | Scp derivada H/L | Alto: revisar unidad de So |

### Conclusión técnica

calcTc(p) no usa una única pendiente. Los métodos Témez, Kirpich, California y Pérez-Montg. usan pendientes derivadas del desnivel y longitud del cauce. Giandotti usa desnivel geomorfológico entre cota máxima y mínima. SCS-Ranser es el método crítico porque usa directamente Sp = p.pendiente_cuenca.

### Riesgo principal

El campo pendiente_cuenca no explica todos los Tc altos, pero sí afecta directamente a SCS-Ranser. Se debe determinar si pendiente_cuenca representa Scp, Sc o alias histórico antes de adoptar SCS-Ranser.

### Recomendación

No modificar fórmulas todavía. Primero clasificar formalmente pendiente_cuenca y verificar unidades de So, Sf y Sp.
