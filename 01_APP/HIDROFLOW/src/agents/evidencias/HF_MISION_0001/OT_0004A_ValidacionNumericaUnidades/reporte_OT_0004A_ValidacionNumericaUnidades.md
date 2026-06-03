# Reporte OT-0004A — Validación numérica de unidades

## Estado

Abierto.

## Objetivo

Validar numéricamente las unidades críticas usadas por calcTc(p) para La Iguaná PC_80.

## Valores base usados

- L = 15.524 km
- cota_mayor_cauce = 2819.27 m
- cota_menor_cauce = 1511.36 m
- desnivel = 1307.91 m
- Sp = 8.43 %
- Sp decimal = 0.0843
- CN = 88

## Cálculos de auditoría

- So = (desnivel / (L * 1000)) * 1000 = 84.250837
- So / 1000 = 0.084251
- Lft = L * 3280.84 = 50931.76 ft
- Sf actual en código = desnivel_m / Lft = 0.02567965
- desnivel convertido a ft = 4291.043 ft
- Sf coherente ft/ft = desnivel_ft / Lft = 0.08425084
- Ss = 25400 / CN - 254 = 34.636364 mm

## Comparación crítica Sf

| Variable | Valor | Interpretación |
|---|---:|---|
| Sf actual código | 0.02567965 | usa desnivel en m y longitud en ft |
| Sf coherente ft/ft | 0.08425084 | usa desnivel en ft y longitud en ft |
| Relación Sf_ftft / Sf_actual | 3.28084 | factor de escala aproximado |

## Hallazgo preliminar

El cálculo de Sf en el código usa aparentemente desnivel en metros dividido por longitud en pies. Si Kirpich requiere pendiente adimensional coherente ft/ft, el valor usado por el código podría estar reducido por un factor aproximado de 3.28084.

## Riesgo

Alto. Kirpich usa Sf elevado a una potencia negativa, por lo cual una pendiente menor puede aumentar el Tc calculado.

## Observación sobre So

So = 84.250837 equivale a una pendiente por mil. So/1000 = 0.084251 equivale a pendiente decimal. Esto es coherente para métodos que usan So/1000.

## Observación sobre Sp

SCS-Ranser usa Sp directo. Si Sp = 8.43 representa porcentaje, el motor usa 8.43. Si la fórmula esperara decimal, el valor equivalente sería 0.0843. Este punto requiere verificación documental de la formulación SCS-Ranser.

## Observación sobre Ss

Ss = 34.636364 mm con CN = 88. Este valor alimenta SCS-Ranser mediante Math.pow(Ss + 1, 0.7).

## Conclusión preliminar

Para La Iguaná PC_80, So y So/1000 son trazables con L y desnivel. El punto más crítico de unidad en calcTc(p) es Sf en Kirpich, seguido por Sp en SCS-Ranser y So directo en Pérez-Montg.

## Recomendación

No modificar fórmula todavía. Elevar al HF_AuditorJefe para decidir si se abre una orden específica de validación documental de Kirpich, SCS-Ranser y Pérez-Montg.
