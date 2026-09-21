# Contrato de Referencia Espacial HidroFlow — hf.spatial-reference.v1

- **Esquema:** `hf.spatial-reference.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Gobernar toda referencia espacial declarada en HidroFlow: el par CRS
origen/destino, datum, transformación registrada, unidades, orden de ejes,
affine transform, extensión, resolución, alineamiento, pixelación, orientación,
norte y precisión. Su función es que ningún dato se interprete sin una
referencia espacial explícita y gobernada, y que ninguna evidencia desorientada
entre jamás a un circuito de decisión.

## 2. Schema id

- `schema`: `hf.spatial-reference.v1`
- `schema_version`: `1.0`

## 3. Campos gobernados

| Campo | Descripción |
|---|---|
| `crs_origen` / `crs_destino` | EPSG declarado (ej. `EPSG:4326` → `EPSG:32618`) |
| `datum` | WGS84, MAGNA-SIRGAS, etc. |
| `transformacion` | Transformación registrada (rasterio/pyproj/WBT, con parámetro `always_xy`) |
| `unidades` | metros / grados decimales |
| `axis_order` | `lon_lat` / `lat_lon` / `x_easting_y_northing` / `y_easting` ... |
| `always_xy` | booleano; fuerza orden X=Easting, Y=Northing en transformaciones |
| `affine` | matriz affine del raster (para realidad de georreferenciación) |
| `extension` | bbox (west/south/east/north) en el CRS declarado |
| `resolucion` | tamaño de celda (m o arc-seg) |
| `alineamiento` | alineación de esquinas con la grilla del CRS |
| `fila` / `columna` | índice de celda en la grilla |
| `pixelacion` | `left-top` orientado a norte, `north-up` requerido |
| `orientacion` | rotación de la grilla respecto al norte (0 = north-up) |
| `norte` | tipo: `GRID_NORTH` / `TRUE_NORTH` / `MAGNETIC_NORTH` |
| `precision` | precisión conocida declarada, sin sobredeclaración |

## 4. Reglas obligatorias

1. **Invertir X/Y en una salida geográfica (escribir lat/lon donde se declara
   lon/lat o viceversa) = FAIL.** El orden de ejes de entrega se declara siempre.
2. **CRS ausente = FAIL.** Ningún raster, vector o imagen sin CRS declarado es admisible.
3. **Transformación no registrada = FAIL.** Toda reproyección debe registrar el
   método, la versión de librería y el parámetro `always_xy` usado.
4. **Flecha norte incorrecta = FAIL_ORIENTATION.** Se marca el producto completo.
5. **El crecimiento de filas de un raster no equivale a norte geográfico.** La
   fila 0 puede coincidir o no con la latitud máxima; se verifica con la
   georreferenciación (affine), no con convención de lectura.
6. **Evidencia FAIL_ORIENTATION no es apta para decisión.** No se reutiliza, no
   se corrige silenciosamente, no se recorta para eliminar la marca.

## 5. Estados

- `DECLARADO` — referencia registrada (crs, datum, axis, unidades).
- `VERIFICADO` — transformación ejecutada y contrastada contra pyproj oficial.
- `ALINEADO` — grilla north-up con affine coherente y extensión conforme.
- `RECHAZADO` — referencia falló CRS/transformación/orientación.

## 6. Salidas

- Declaración de referencia espacial por activo en
  `spatial/spatial-data-registry.json`.
- Transformaciones registradas reutilizables (nunca transformar CRS en el
  navegador; siempre en el proxy con `always_xy=True`).

## 7. Evidencias

- `snap_registro_D03.json` (reproyección `rasterio.warp.transform` 4326→32618).
- Bitácoras de diagnóstico `HF-GEO-DIAG-*` (validación contra pyproj oficial y
  contra MapGIS).
- Leyendas de escala en visor (`HF-UI-NORTH-001`): escala gráfica sobre
  medición declarada (Δlon · cos(lat)); método de escala exigido en el contrato.

## 8. Validaciones

1. Todo activo espacial del registro tiene `crs`, `datum`, `axis_order`,
   `unidades` y `transformaciones` (o nulo explícito).
2. El CRS operativo de la cuenca es `EPSG:32618`; la entrega web es `EPSG:4326`
   (lon/lat, RFC 7946); nunca se entrega UTM como GeoJSON sin conversión.
3. La transformación EPSG:3116 usa parámetros oficiales (pyproj), nunca Snyder
   manual con parámetros divergentes (~490 m de error).
4. `FAIL_ORIENTATION` identificado se preserva; su `decision_use` es
   `NOT_SUITABLE`.
5. La flecha norte del visor indica el norte declarado (latitud máxima arriba
   por convención de pantalla), distinto del `GRID_NORTH` del raster.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| CRS + datum + axis + transformación registrada y verificada | **PASS** |
| CRS presente pero falta verificación de transformación | **PASS CONDICIONAL** |
| X/Y invertido, CRS ausente o transformación no registrada | **FAIL** |
| Flecha norte incorrecta / imagen desorientada | **FAIL_ORIENTATION** |

## 10. Bloqueos

- `FAIL_ORIENTATION` bloquea PASS cartográfico y todo uso decisional.
- CRS ausente bloquea la incorporación del activo.
- Transformación no registrada bloquea la comparación espacial.

## 11. Responsabilidades profesionales

- Certificar el norte y la orientación de cada producto cartográfico.
- Registrar el método de transformación y sus versiones.
- No convertir coordenadas en el navegador sin librería geodésica aprobada.

## 12. Consumidores

- `hf.geo-qa.v1` (checks CRS, axis order, transformación, affine, orientación, norte).
- `hf.comparison.v1` (métricas sobre referencias alineadas).
- Proxy React (`express-server.js`) y visores (leaflet).
- HF-CARTO y exportaciones.

## 13. Responsabilidades prohibidas

- Entregar salidas sin declarar el CRS o el orden de ejes.
- "Arreglar" una imagen `FAIL_ORIENTATION` para reutilizarla.
- Interpretar fila 0 como "norte" sin verificar la affine.
- Usar transformaciones manuales no contrastadas contra pyproj.

## 14. Relación con hf.case.v1

`hf.case.v1` declara el par `crs.geodesico: EPSG:4326` y `crs.operativo:
EPSG:32618`. `hf.spatial-reference.v1` transporta ese par a cada activo,
transformación y visor, y garantiza que la evidencia `FAIL_ORIENTATION`
respete el estado `historic` preservado por el caso.

## 15. Ejemplo del caso iguana_pc80

- Punto D-03: geodésico `EPSG:4326` (lat/lon) → operativo `EPSG:32618`
  (x_easting/y_northing), `always_xy=True`.
- MDT Copernicus GLO30: `EPSG:32618`, 30 m, shape `[2583, 2400]`, bounds
  `[405900, 646620, 477900, 724110]`, affine north-up.
- Celda propuesta: fila 1028, columna 946, x=434295, y=693255 (UTM 18N).
- `verificacion_D03.png`: QA `FAIL_ORIENTATION`, `decision_use NOT_SUITABLE`,
  preservada como evidencia histórica; no apta para decisión.
- Entrega web GeoJSON en CRS84 (lon/lat), RFC 7946; nunca UTM sin conversión.