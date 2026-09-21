# Contrato de Cadena de Terreno HidroFlow — hf.terrain-chain.v1

- **Esquema:** `hf.terrain-chain.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Gobernar la **cadena de terreno**: la secuencia determinista de productos que
parte del MDT original y llega a la red hídrica segmentada. Todo producto de la
cadena es una ejecución reproducible con padre conocido, motor y versión,
parámetros, CRS, resolución, NoData, extensión, duración, advertencias y hash de
salida. Ningún eslabón puede saltarse; ninguna salida se vuelve canónica sin
decisión profesional.

## 2. Schema id

- `schema`: `hf.terrain-chain.v1`
- `schema_version`: `1.0`

## 3. Cadena gobernada

```
MDT → QA → alineamiento → acondicionamiento →
flow direction → flow accumulation → red → segmentación
```

Módulos de referencia del motor `07_TOOLBOX/hf_geo`:

| Eslabón | Producto | Módulo |
|---|---|---|
| QA | dictamen de aptitud del MDT | `verificar.py`, contrato MDT |
| Alineamiento | grilla north-up en CRS y resolución declaradas | `io_raster.py` |
| Acondicionamiento | MDT sin sinks (depresiones rellenadas) | `mod_01_fill.py` (M01) |
| Flow direction | dirección de flujo D8 (d8_pointer) | `mod_02_flowdir.py` (M02) |
| Flow accumulation | acumulación de celdas aguas arriba | `mod_03_flowacc.py` (M03) |
| Red | celdas con acumulación ≥ umbral | WhiteboxTools `extract_streams` |
| Segmentación | segmentos de red (aristas con orden) | `mod_06_streamnet.py` (M06), `mod_10_strahler.py` (M10) |

## 4. Campos obligatorios de cada producto

- `id_producto`, `padre` (id del eslabón previo), `hash_padre`.
- `motor` (ej. `WBT v2.4.0`, `rasterio 1.5.0`, `hf_geo`).
- `version` (ej. `python 3.13.9`, `whitebox_tools v2.4.0`).
- `parametros` (ej. `umbral 500 celdas`, `resolución 30 m`).
- `crs`, `resolucion`, `nodata`, `extension`.
- `duracion_s`, `advertencias` (array), `hash_salida`.

## 5. Estados

- `PLANIFICADO` — eslabón previsto, no ejecutado.
- `EJECUTADO` — producto generado con registro de ejecución.
- `VERIFICADO` — ejecución contrastada (hash e inspección).
- `DETENIDO` — cadena detenida por contrato (ej. decisión profesional pendiente).
- `REGENERADO` — vuelto a ejecutar con el mismo contrato y hash de salida.

## 6. Salidas

- Registro de cadena por ejecución (no copiado al paquete; referenciado).
- Hashes de cada eslabón en `REGISTRO_HASHES_GATE02.json` y
  `evidence/hashes.json`.

## 7. Evidencias

- `snap_registro_D03.json` (PASO_0 a PASO_12 de E2 del GATE 2).
- `manifiesto_gate02.json` (versiones de herramientas y duraciones).
- `REGISTRO_HASHES_GATE02.json` (hash del MDT y de cada salida).
- `stdout_gate02.txt` / `stderr_gate02.txt` (bitácora de ejecución).

## 8. Validaciones

1. Todo producto declara `padre` y `hash_padre` (cadena sin huecos).
2. La convención de flujo se declara: `WhiteboxTools D8 (d8_pointer)`.
3. El CRS no cambia a lo largo de la cadena hasta la vectorización.
4. NoData y extensión se propagan sin mutación silenciosa.
5. El hash de salida de cada eslabón se registra antes de avanzar.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Eslabón ejecutado con registro completo y hash | **PASS** |
| Eslabón ejecutado con advertencias documentadas | **CONDICIONAL** |
| Salto de eslabón, parámetros ausentes o hash faltante | **FAIL** |
| Cadena usada para decisión sin QA de cada eslabón | **BLOQUEADO** |

## 10. Bloqueos

- La cadena se detiene ante decisión profesional pendiente (estado actual).
- Sin verificación del MDT no se inicia el acondicionamiento.
- Sin flow direction verificada no hay acumulación.

## 11. Responsabilidades profesionales

- Registrar parámetros reales (umbral, resolución, tolerancias).
- Declarar advertencias; no ocultar degradaciones.
- Reproducir con el mismo contrato antes de declarar una salida regenerada.

## 12. Consumidores

- `hf.network.v1` (red y segmentos derivados de la cadena).
- `hf.spatial-decision.v1` (proposed_cell originada en el snap sobre la cadena).
- `hf.uncertainty.v1` (calidad del MDT y sensibilidad al umbral).
- `hf.geo-qa.v1` (checks de resolución, NoData, extensión, acumulación).

## 13. Responsabilidades prohibidas

- Fusionar eslabones sin registro (ej. "fill+flowdir en una sola salida").
- Reutilizar una salida histórica sin verificar su hash.
- Cambiar el umbral de red sin registrar el impacto en segmentos.

## 14. Relación con hf.case.v1

`hf.case.v1` referencia el MDT por hash en `terrain/mdt-reference.json` y la red
en `network/hf-network-reference.json`. La cadena de terreno es la procedencia
computacional de ambos; el caso conserva los hashes y la clasificación
`B_COMPUTACIONAL` sin elevarla a canónico.

## 15. Ejemplo del caso iguana_pc80

Ejecución E2 del GATE 2 (del `snap_registro_D03.json`):

| Eslabón | Producto | parámetros | hash |
|---|---|---|---|
| MDT | Copernicus GLO30 | EPSG:32618, 30 m | `1b12e9db...` |
| M01 fill | MDT rellenado | — | (ejecución WBT) |
| M02 flowdir | D8 pointer | convención WBT | (ejecución WBT) |
| M03 flowacc | acumulación | — | (ejecución WBT) |
| Red | red autorizada | umbral 500; 179231 celdas | `ce398aef...` |
| Segmentación | 92 segmentos; segmento candidato 24 | — | `5fcce071...` |

Duraciones registradas M01-M03: 0.77 s / 0.17 s / 0.36 s. Versiones:
WhiteboxTools v2.4.0, rasterio 1.5.0, geopandas 1.1.4, python 3.13.9.
Cadena **DETENIDA** en la decisión profesional (GATE 2 CONDICIONAL).