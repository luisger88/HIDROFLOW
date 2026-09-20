# HF-CASE-STATE-001A — Decisiones Ratificadas

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a`

---

## D-01 — Identidad del caso

| Campo | Valor |
|---|---|
| id | `iguana_pc80` |
| nombre oficial | `Quebrada La Iguaná - PC_80` |
| OT | `OT-HF-003` |

## D-02 — Caso objetivo y exclusión de Cien Pesos

El caso objetivo es `OT-HF-003`. **Cien Pesos queda fuera** de esta
consolidación. `02_CORE/config/caso_activo.json` **no se modifica** en este
incremento.

## D-03 — Punto hidrológico ratificado (todavía no reproducido)

| Campo | Valor |
|---|---|
| latitud | `6.271785117145225` |
| longitud | `-75.59408755595547` |
| cota | `1511.36 msnm` |
| rol | Punto de control y salida hidrológica La Iguaná PC_80 |

## D-11 — Definición de Q-5

- **Q-5 significa:** hidrografía principal del periodo de retorno activo, con
  SCS-HU como método principal inicial.
- Q-5 **no** significa Tr = 5 años.
- Q-5 **no** equivale al Método Racional.

## D-12 — Estado del Método Racional

El Método Racional es **referencial, de contraste, no adoptivo y no principal**.

## D-13 — Prohibición de mezcla de familias geométricas

Queda **prohibido** mezclar variables de familias geométricas incompatibles.

---

## Clasificación de referencias divergentes (ratificada)

| Referencia | Clasificación |
|---|---|
| `estado_operativo.params.nombre_cuenca = POST_OK` | Operativa histórica; no identidad vigente |
| `evidenciaValidacion.outlet (6.21693…, -75.56273…)` | Residual; no pertenece al caso |
| `parametros.area_km2 = 0.1818` | Cien Pesos; fuera de caso (D-02) |
| `cuenca.lat_salida/lon_salida (6.21380…, -75.56934…)` | Residual; no pertenece al caso |

## Ratificación formal

Las decisiones D-01, D-02, D-03, D-11, D-12 y D-13 quedan ratificadas y
vigentes para este incremento E1 y para las corridas posteriores de la OT.