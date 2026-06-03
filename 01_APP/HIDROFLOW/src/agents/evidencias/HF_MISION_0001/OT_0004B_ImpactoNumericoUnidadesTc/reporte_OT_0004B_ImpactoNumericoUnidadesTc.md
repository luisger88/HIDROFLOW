# Reporte OT-0004B — Impacto numérico por unidad en Tc

## Estado

Abierto.

## Objetivo

Cuantificar el impacto numérico de diferentes interpretaciones de unidad en los métodos Tc sensibles a pendiente para La Iguaná PC_80.

## Valores base usados

- L = 15.524 km
- cota_mayor_cauce = 2819.27 m
- cota_menor_cauce = 1511.36 m
- desnivel = 1307.91 m
- CN = 88
- Sp como porcentaje = 8.43
- Sp como decimal = 0.0843

## Variables derivadas

- So = 84.250837
- So/1000 = 0.084251
- So en porcentaje aproximado = 8.425084
- Lft = 50931.76 ft
- desnivel convertido a ft = 4291.043 ft
- Sf actual código = 0.02568
- Sf coherente ft/ft = 0.084251
- Ss = 34.636364 mm

---

## 1. Impacto en Kirpich

### Escenarios

- Escenario A — Sf actual del código: Sf = desnivel_m / Lft = 0.02568
- Escenario B — Sf coherente ft/ft: Sf = desnivel_ft / Lft = 0.084251

### Resultados

| Escenario | Sf usado | Tc Kirpich min |
|---|---:|---:|
| Sf actual código | 0.02568 | 134.519 |
| Sf coherente ft/ft | 0.084251 | 85.139 |

### Comparación

- Diferencia = 49.38 min
- Relación Tc_actual / Tc_coherente = 1.57999

### Lectura técnica

Kirpich es sensible a Sf porque la fórmula usa Sf elevado a potencia negativa. Si Sf actual mezcla metros y pies, Tc puede quedar alterado.

---

## 2. Impacto en SCS-Ranser

### Escenarios

- Escenario A — Sp directo como porcentaje: Sp = 8.43
- Escenario B — Sp como decimal: Sp = 0.0843

### Resultados

| Escenario | Sp usado | Tc SCS-Ranser min |
|---|---:|---:|
| Sp porcentaje/directo | 8.43 | 122.024 |
| Sp decimal | 0.0843 | 1220.242 |

### Comparación

- Diferencia = 1098.218 min
- Relación Tc_decimal / Tc_porcentaje = 10

### Lectura técnica

SCS-Ranser depende directamente de Sp. Si la formulación espera porcentaje, el uso de 8.43 puede ser coherente. Si espera decimal, el resultado cambia fuertemente.

---

## 3. Impacto en Pérez-Montg.

### Escenarios

- Escenario A — So directo: So = 84.250837
- Escenario B — So decimal: So = 0.084251
- Escenario C — So porcentaje aproximado: So = 8.425084

### Resultados

| Escenario | So usado | Tc Pérez-Montg. min |
|---|---:|---:|
| So directo | 84.250837 | 11.241 |
| So decimal | 0.084251 | 89.289 |
| So porcentaje | 8.425084 | 22.428 |

### Lectura técnica

Pérez-Montg. usa So directamente en el motor, a diferencia de Témez y California, que usan So/1000. Debe verificarse documentalmente qué escala de So exige la formulación.

---

## 4. Referencias internas de consistencia

| Método | Unidad de pendiente usada por motor | Tc min calculado en auditoría |
|---|---|---:|
| Témez | So/1000 | 231.513 |
| California | So/1000 | 85.263 |
| Kirpich actual | Sf actual código | 134.519 |
| Kirpich coherente | Sf ft/ft | 85.139 |
| SCS-Ranser actual | Sp = 8.43 | 122.024 |
| SCS-Ranser decimal | Sp = 0.0843 | 1220.242 |
| Pérez-Montg. actual | So directo | 11.241 |

---

## Hallazgos preliminares

1. La pendiente geométrica del cauce queda respaldada por So/1000 = 0.084251, equivalente a aproximadamente 8.43%.
2. Kirpich presenta sensibilidad directa a la coherencia dimensional de Sf.
3. SCS-Ranser presenta sensibilidad crítica a si Sp se interpreta como porcentaje o decimal.
4. Pérez-Montg. requiere verificación documental porque usa So directamente.

## Recomendación

No modificar fórmulas todavía. Elevar al HF_AuditorJefe para decidir si se abren órdenes documentales específicas para Kirpich, SCS-Ranser y Pérez-Montg., o si se prepara un parche técnico mínimo posterior.

## Estado de adopción

Ningún Tc queda adoptado con base en esta validación. Todos los resultados permanecen como calculados por motor y pendientes de auditoría.
