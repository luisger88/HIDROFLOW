# HF-CASE-STATE-001A — GATE 2 — EJECUCIÓN DEL SNAP D-03 (E2)

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E2
- **Estado:** **EJECUTADO** — veredicto CONDICIONAL, cadena detenida
- **Fecha UTC:** 2026-09-20T19:52/19:55
- **Rama:** `ot-hf-003-cstate-001a` (`3886ccf4547972b42d8ac052b14e2f9d60a4ee99`)
- **Entorno:** Python 3.13.9 (anaconda); rasterio 1.5.0; numpy 2.3.5; geopandas 1.1.4; shapely 2.1.2; scipy 1.16.3; matplotlib 3.10.6; WhiteboxTools v2.4.0

---

## 1. Autoridades leídas antes de ejecutar

- Contrato de snap (C-03): `07_TOOLBOX/hf_geo/config/contrato_snap_D03.json` (v1.0) y `07_TOOLBOX/hf_geo/contrato_snap_d03.py` — validación OK.
- Bitácoras: `PLAN_EJECUCION`, `GATE01_IDENTIDAD`, `GATE02_PREPARACION`, `DECISIONES_RATIFICADAS`, `DICTAMEN_E1`.

## 2. Comando de reproducción (hash de integridad)

El script operativo ejecutado (fuera del repositorio, consecutivo y con `--consecutivo=1`)
registra su SHA-256 en `REGISTRO_HASHES_GATE02.json` y `manifiesto_gate02.json`:

- `ejecutar_gate02_d03.py` → `04c26f956a1343cb5ab53e9a16e8d0887fd93ad8a0c711d0f09c77a9f45c518c`
- `contraste_snap.py` (validación cruzada) → `01543a7f2561f36056fb1cabacf4393ff2063d6679325fa0a7ab4aa2e6aef37f`

## 3. Entradas verificadas en ejecución

| Entrada | Verificación |
|---|---|
| MDT `01_DEM_HIDRO/00_BASE/DEM_Copernicus_GLO30_Aburra.tif` | SHA-256 `1b12e9db...b0800` = esperado; 24 891 532 B; EPSG:32618; 2400×2583; 30 m; sin NaN |
| Punto D-03 | lat `6.271785117145225`, lon `-75.59408755595547`, cota `1511.36 msnm` |
| Reproyección D-03 → EPSG:32618 | x=`434284.806`, y=`693285.656`; dentro del MDT (fila 1027, col 946) |
| Umbral de red | `500` celdas (gobernado) |
| Cruce de divisoria | punto D-03 dentro de la cuenca del punto snappeado (WBT watershed) = `true` |

## 4. Pipeline ejecutado

1. **M01 fill** (`fill.tif`) — 0.77 s.
2. **M02 flowdir** (`flowdir.tif`, D8 `d8_pointer`) — 0.17 s. Convención verificada empíricamente (gradiente máximo en 40 000 muestras; 100 % coincidencia): 1=NE, 2=E, 4=SE, 8=S, 16=SW, 32=W, 64=NW, 128=N.
3. **M03 flowacc** (`flowacc.tif`) — 0.36 s.
4. Red autorizada = intersección `flowacc ≥ 500` ∧ `extract_streams` (WBT): **179 231 celdas**, **92 segmentos** conexos (8-vecindad).

## 5. Snap D-03 (método oficial: traza D8)

La célula del punto (1027, 946) no pertenece a la red; se traza el flujo D8 desde
ella hasta la primera célula de red que **recibe el flujo del punto** (mismo
cauce, sin salto lateral):

| Atributo | Valor |
|---|---|
| Célula snap | fila 1028, col 946 (adyacente al sur) |
| Distancia euclidiana | **32.307 m** (30.0 m de traza) |
| Elevación MDT original / snapped | 1518.766 / 1517.117 msnm |
| Acumulación | 55 024 celdas |
| Segmento | 24 |
| Outlet retenido | **D-03** (`outlet_retenido: true`) |

## 6. Validaciones complementarias

- **Continuidad aguas abajo:** 2078 celdas de traza, todas en la red, 0 fuera; no llega a borde del MDT.
- **Divisoria:** la cuenca de aporte de la célula snappeada (55 024 celdas) **contiene** el punto D-03 ⇒ sin cruce de divisoria ni cambio de unidad hidrográfica.
- **Candidatos:** 34 celdas de red en ventana de 300 m; 1 solo segmento (24). El espacialmente más cercano (1027, 945) a 19.82 m **no** fue elegido: su cuenca (55 019 celdas) **no contiene** el punto D-03 — seleccionarlo habría cambiado el drenaje del punto (validado por watershed WBT).
- **Contraste WBT nativo** (`snap_pour_points`, solo documental): 30 m → celda degradada con acc 1; 136 m → (1029,947) @ 72.76 m; 200 m → (1030,947) @ 99.17 m. La rutina legada salta de cauce/reach; por eso el contrato C-03 no la usa como fuente de decisión.

## 7. Artefactos de salida

Ruta aislada `07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/` (14 archivos):
`caso_entrada_D03.json`, `punto_original_D03.geojson`, `punto_snap_D03.geojson`,
`red_gate02_D03.geojson`, `segmento_candidato_D03.geojson`, `snap_registro_D03.json`,
`contraste_snap_D03.json`, `verificacion_D03.png` (1650×1500, validada),
`verificacion_D03.kml`, `verificacion_D03.geojson`, `REGISTRO_HASHES_GATE02.json`,
`manifiesto_gate02.json`, `stdout_gate02.txt` (1317 B), `stderr_gate02.txt` (0 B).
Todos con SHA-256 en el registro de hashes y manifiesto.

## 8. Restricciones respetadas

- No se ejecutó GATE 3, no se delimitó cuenca canónica ni se calcularon parámetros geomorfológicos/hidrológicos.
- No se modificó `caso_activo.json`, `OT-HF-003.hfproj` ni `HF_EXPEDIENTE_001.json` (hashes idénticos a base en `REGISTRO_HASHES_GATE02.json`).

---

Firma: Agente Build (Big Pickle). Ejecución de GATE 2 completada y verificada.