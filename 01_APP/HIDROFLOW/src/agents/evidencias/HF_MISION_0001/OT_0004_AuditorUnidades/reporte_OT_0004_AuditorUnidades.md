# Reporte OT-0004 — HF_AuditorUnidades

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
- Variable:
- Unidad esperada:
- Unidad inferida:
- Conversión observada:
- Riesgo:
- Severidad:
- Relación con Tc alto:

## Matriz preliminar de unidades

| Método | Variable | Unidad esperada | Unidad inferida | Conversión observada | Riesgo |
|---|---|---|---|---|---|
| Témez | So/1000 | Pendiente decimal | Por auditar | So dividido por 1000 | Alto |
| Kirpich | Lft, Sf | pies, ft/ft | Por auditar | L*3280.84 | Alto |
| California | L*1000, So/1000 | m, decimal | Por auditar | L km a m; So/1000 | Alto |
| Giandotti | A, L, cotas | km², km, m | Por auditar | Sin confirmar | Alto |
| SCS-Ranser | Sp | Pendiente | Por auditar | Sp directo | Crítico |
| Pérez-Montg. | So | Pendiente | Por auditar | So directo | Alto |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

---

## Hallazgo 1 — Variables base y unidades inferidas en calcTc(p)

- Archivo: src/services/hidroEngine.js
- Bloque: export function calcTc(p)
- Severidad: Alta

### Variables base detectadas

- L = p.longitud_cauce
- A = p.area
- Sp = p.pendiente_cuenca
- So = ((cota_mayor_cauce - cota_menor_cauce) / (L * 1000)) * 1000
- Lft = L * 3280.84
- Sf = (cota_mayor_cauce - cota_menor_cauce) / (L * 3280.84)
- Ss = SCS_RETENCION_MM / p.CN - 254

### Interpretación preliminar

- L parece estar en kilómetros.
- A parece estar en kilómetros cuadrados.
- Las cotas parecen estar en metros.
- So parece quedar expresada en milésimas o por mil, porque multiplica la pendiente decimal por 1000.
- So/1000 parece devolver pendiente decimal.
- Lft convierte longitud de kilómetros a pies.
- Sp toma directamente p.pendiente_cuenca, por lo tanto debe auditarse si está en porcentaje o decimal.
- Ss corresponde a retención SCS derivada del CN, aparentemente en milímetros.

### Riesgo

Alto. Las fórmulas Tc son sensibles a la escala de pendiente y longitud. Una conversión incorrecta puede amplificar o reducir significativamente Tc.

---

## Hallazgo 2 — Riesgo de unidad en Kirpich por Sf

- Método: Kirpich (1940)
- Variable crítica: Sf
- Fórmula observada: Sf = (cota_mayor_cauce - cota_menor_cauce) / (L * 3280.84)
- Severidad: Alta

### Análisis

Lft convierte L de kilómetros a pies mediante L * 3280.84. Sin embargo, el desnivel de cotas parece estar en metros. Si el numerador permanece en metros y el denominador está en pies, Sf puede quedar en una escala mixta m/ft.

### Riesgo

Alto. Kirpich usa Sf elevado a potencia negativa, por lo que una pendiente mal escalada puede modificar significativamente el Tc calculado.

### Recomendación

No corregir todavía. Confirmar en los datos fuente si las cotas están en metros y si la fórmula Kirpich espera pendiente ft/ft, m/m o una pendiente adimensional equivalente.

---

## Hallazgo 3 — SCS-Ranser usa Sp directo

- Método: SCS-Ranser (1958)
- Variable crítica: Sp = p.pendiente_cuenca
- Severidad: Crítica para interpretación Scp vs Sc

### Análisis

SCS-Ranser usa directamente Sp en Math.pow(Sp, 0.5). El campo Sp se toma de pendiente_cuenca. La auditoría OT-0003 clasificó pendiente_cuenca como alias ambiguo hasta confirmar si representa Scp, Sc o una pendiente hidrológica equivalente.

### Riesgo

Crítico. Si la fórmula espera pendiente en porcentaje y Sp = 8.43, el uso puede ser coherente. Si la fórmula espera pendiente decimal y Sp debería ser 0.0843, el resultado cambiaría de forma importante.

### Recomendación

Confirmar la unidad esperada por la formulación SCS-Ranser antes de adoptar ese Tc.

---

## Hallazgo 4 — Pérez-Montg. usa So directamente

- Método: Pérez-Montg. (1985)
- Variable crítica: So
- Fórmula observada: 0.1039 * L^0.7 * So^-0.3
- Severidad: Alta

### Análisis

Pérez-Montg. usa So directamente, mientras Témez y California usan So/1000. Esto indica que Pérez-Montg. podría esperar So en una escala distinta, posiblemente por mil o porcentaje, pero debe confirmarse con la formulación original o documentación técnica interna.

### Riesgo

Alto. Usar So directamente cuando otros métodos usan So/1000 puede ser correcto si la fórmula lo exige, pero también puede ser fuente de inconsistencia si no está documentado.

### Recomendación

Marcar Pérez-Montg. como método con auditoría de unidad pendiente antes de adopción.

---

## Matriz preliminar de unidades auditada

| Método | Variable crítica | Unidad inferida desde código | Conversión observada | Riesgo |
|---|---|---|---|---|
| Témez | So/1000 | Pendiente decimal | So se calcula por mil y luego se divide por 1000 | Medio-Alto |
| Kirpich | Lft, Sf | Lft en pies; Sf posiblemente m/ft | L*3280.84, pero desnivel parece en m | Alto |
| California | L*1000, So/1000 | Longitud en m; pendiente decimal | L km a m; So/1000 | Medio-Alto |
| Giandotti | A, L, cota_max-cota_min | km², km, m | Sin conversión explícita adicional | Alto: verificar fórmula |
| SCS-Ranser | Sp | pendiente_cuenca directa | Sin conversión | Crítico |
| Pérez-Montg. | So | So directo, posiblemente por mil | Sin dividir por 1000 | Alto |

## Conclusión preliminar OT-0004

calcTc(p) presenta varias escalas de unidad dentro del mismo bloque. La unidad de So, Sf y Sp debe quedar explícitamente documentada antes de adoptar Tc. Kirpich, SCS-Ranser y Pérez-Montg. quedan como los métodos más sensibles a auditoría de unidades.

## Recomendación preliminar

No modificar fórmulas todavía. El siguiente paso debe ser construir una validación numérica de unidades con los valores reales de La Iguaná PC_80: L, cotas, desnivel, So, Sf, Sp, CN y Ss.
