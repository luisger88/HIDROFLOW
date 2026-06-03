# Reporte OT-0004C — Revisión documental específica de Kirpich

## Estado

Abierto.

## Resumen ejecutivo

Pendiente de diligenciar.

## Evidencias revisadas

- OT-0004A Validación numérica de unidades.
- OT-0004B Impacto numérico por unidad en Tc.
- Bloque calcTc(p) en src/services/hidroEngine.js.

## Hallazgos

### Hallazgo 1

- Archivo:
- Línea aproximada:
- Fórmula observada:
- Unidad esperada documental:
- Unidad usada por el motor:
- Diferencia:
- Impacto en Tc:
- Riesgo:
- Severidad:

## Matriz preliminar Kirpich

| Elemento | Implementación actual | Unidad esperada por auditar | Riesgo |
|---|---|---|---|
| Lft | L * 3280.84 | pies | Bajo si L está en km |
| Sf | desnivel_m / Lft | ft/ft o adimensional coherente | Alto |
| Tc actual | 134.52 min aprox. | Pendiente de validar | Alto |
| Tc con Sf coherente | 85.14 min aprox. | Referencia de auditoría | Alto |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

---

## Hallazgo 1 — Unidad esperada para Kirpich

- Método: Kirpich (1940)
- Archivo motor: src/services/hidroEngine.js
- Bloque: export function calcTc(p)
- Fórmula implementada:

h = (0.0078 * Lft^0.77 * Sf^-0.385) / 60

## Evidencia documental preliminar

La formulación tradicional de Kirpich con coeficiente 0.0078 usa longitud L en pies y pendiente S como pendiente adimensional del canal principal, usualmente ft/ft.

En términos dimensionales, si Lft está en pies, la pendiente Sf debe ser coherente con esa unidad, es decir, desnivel en pies dividido por longitud en pies, o una pendiente adimensional equivalente.

## Implementación actual observada en HidroFlow

- Lft = L * 3280.84
- Sf = (cota_mayor_cauce - cota_menor_cauce) / (L * 3280.84)

## Validación numérica La Iguaná PC_80

- L = 15.524 km
- desnivel = 1307.91 m
- Lft = 50931.76 ft
- desnivel convertido a ft = 4291.043 ft
- Sf actual código = 0.02567965
- Sf coherente ft/ft = 0.08425084
- Relación aproximada = 3.28084

## Impacto numérico

- Tc Kirpich actual aproximado = 134.52 min
- Tc Kirpich con Sf coherente aproximado = 85.14 min
- Diferencia aproximada = 49.38 min

## Análisis

La implementación actual convierte la longitud a pies, pero conserva aparentemente el desnivel en metros para calcular Sf. Esto genera una pendiente mixta m/ft.

Si la fórmula implementada con coeficiente 0.0078 exige L en pies y S en ft/ft o pendiente adimensional coherente, entonces Sf debe calcularse con desnivel y longitud en la misma unidad.

## Riesgo

Crítico para Kirpich. El Tc actual de Kirpich puede estar aumentado por una pendiente Sf reducida artificialmente debido a mezcla de unidades.

## Dictamen preliminar

Kirpich debe permanecer como resultado calculado por el motor, pero no adoptable hasta resolver la coherencia dimensional de Sf.

## Recomendación

No modificar código todavía. Preparar, si el HF_AuditorJefe lo autoriza, un parche técnico mínimo y auditable que convierta el desnivel a pies para calcular Sf, o que use una pendiente adimensional coherente equivalente.

## Requiere cambio de código

Pendiente de autorización del HF_AuditorJefe.
