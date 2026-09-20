# HF-ENGINEER-001 — Matriz de Evidencia

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1
- **Fecha UTC:** 2026-09-20

---

## Estado de frontera (baseline)

| Clave | Evidencia | Valor |
|---|---|---|
| `baseline.head` | `git rev-parse HEAD` | `5014cf653114fdec913125414fd8579a6640aadf` |
| `baseline.branch` | `git branch --show-current` | `main` |
| `baseline.working_tree_changes` | `git status --porcelain` | 429 rutas (modificadas o sin seguimiento) |

## Identidad (GATE 1)

| Clave | Fuente | Valor |
|---|---|---|
| `gate1.id` | `OT-HF-003.hfproj` → `contratoCuenca.cuenca.id` | `iguana_pc80` |
| `gate1.nombre` | `OT-HF-003.hfproj` → `contratoCuenca.cuenca.nombre` | `Quebrada La Iguana - PC_80` |
| `gate1.otId` | `OT-HF-003.hfproj` → `metadata.otId` | `OT-HF-003` |
| `gate1.d03.lat` | `contratoCuenca.cuenca.lat_salida` | `6.271785117145225` |
| `gate1.d03.lon` | `contratoCuenca.cuenca.lon_salida` | `-75.59408755595547` |
| `gate1.d03.cota` | `contratoCuenca.cuenca.cota_menor_cauce_msnm` | `1511.36` |
| `gate1.post_ok` | `estado_operativo.params.nombre_cuenca` | `POST_OK` (no vigente) |
| `gate1.cien_pesos` | `caso_activo.json` → `out` | `salida_HF-CASE-CIENPESOS` (fuera de caso) |

## Referencias divergentes clasificadas

| Clave | Fuente | Valor | Clasificación |
|---|---|---|---|
| `div1` | `evidenciaValidacion.outlet` | `(6.21698682679494, -75.5627319497491)` | Residual, no pertenece al caso |
| `div2` | `parametros.area_km2` | `0.1818` | Cien Pesos — fuera de caso (D-02) |
| `div3` | `cuenca` (bloque inferior del hfproj) | `(6.21380474954716, -75.5693404588773)` | Residual, no pertenece al caso |
| `div4` | `estado_operativo.params.nombre_cuenca` | `POST_OK` | Operativa histórica, no identidad |

## Antecedente histórico conservado (C-04)

| Clave | Evidencia | Valor |
|---|---|---|
| `expediente.historico_hash` | `07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json` → `hash_expediente` | `cd98512feb2ffca76ffde98f40f6dcce875f461efe098626d06da1f386c7921f` |
| `expediente.historico_ruta` | archivo físico | `07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json` (conservado sin sobrescritura) |

## Auditoría de dependencias silenciosas (C-01)

| Clave | Archivo | Línea | Hallazgo |
|---|---|---|---|
| `dep.01` | `producir_tc.py` | 19-23 | `AREA/LCP_DIV/LCP/DH/SC` hardcodeados |
| `dep.02` | `producir_volumen.py` | 14 | `AREA_KM2 = 50.6718` hardcodeado |
| `dep.03` | `producir_qp.py` | 22 | `A = 50.6718` hardcodeado |
| `dep.04` | `producir_geomorfometria.py` | 81, 102 | ruta rígida `caso_real_001` y `Lcp_div_km` |
| `dep.05` | `producir_lcp_div.py` | 103 | ruta rígida `caso_real_001/hf_geo/temp` |
| `dep.06` | `generar_expediente.py` | 43-44 | `AREA/PERIMETRO` hardcodeados |
| `dep.07` | `producir_cn.py` | 39 | ruta rígida `caso_real_001/hf_geo/geojson/cuenca.geojson` |

## Evidencia cruda de OpenCode

| Clave | Ruta | Estado |
|---|---|---|
| `respuesta.opencode.raw` | `00_ADMIN/bitacora/HF-ENGINEER-001/evidencias/HF-ENGINEER-001_respuesta_opencode.txt` | PENDIENTE DE INCORPORACIÓN MANUAL |

---
Fin de la matriz.