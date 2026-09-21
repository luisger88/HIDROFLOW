# Contrato de Interoperabilidad Espacial HidroFlow — hf.interoperability.v1

- **Esquema:** `hf.interoperability.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Governar los **formatos abiertos y la interoperabilidad espacial** de HidroFlow:
qué formatos se consideran interoperables, cómo se transporta el CRS, cómo se
georreferencia, qué está prohibido (afines propietarios, datos con CRS oculto) y
cómo se comporta el visor web (reproyección server-side con `always_xy=True`).

## 2. Schema id

- `schema`: `hf.interoperability.v1`
- `schema_version`: `1.0`

## 3. Formatos interoperables

| Formato | Uso | Rol |
|---|---|---|
| GeoJSON | geometrías de caso y entrega web (RFC 7946, EPSG:4326 lon/lat) | Canónico de intercambio |
| GeoTIFF | rasters (MDT, salidas del motor) | Canónico raster |
| JSON | configuración, registros, ledger | Gobernanza |
| PNG | evidencias | Evidencia visual |
| KML / KMZ | exportación hacia Google Earth | Exportación (solo lectura de consumo) |
| GPKG (institucional) | capas de referencia MapGIS | Referencia (clase C) |
| SHP | referencias heredadas | Importación permitida (CRS obligatorio) |

## 4. Reglas de interoperabilidad

1. **Formato propietario afín (CAD vectorial) = FAIL.** No se adopta ni se
   exporta a formatos que oculten la geometría o el CRS.
2. **CRS oculto = FAIL.** Todo dato de intercambio declara su CRS
   (GeoJSON RFC 7946, GeoTIFF con tags de CRS). Los datos sin CRS se marcan
   `crs_oculto: "Sí"`.
3. **Reproyección solo server-side con `always_xy=True`.** El proxy
   (`express-server.js`) reproyecta con librería geodésica aprobada
   (proj4/pyproj); el navegador nunca reproyecta CRS por sí mismo.
4. **GeoJSON de entrega en EPSG:4326 (lon/lat)**: nunca se entrega UTM crudo.
5. **Las transformaciones se registran** (ver `hf.spatial-reference.v1`).
6. Los visores (Leaflet + OSM tiles) consumen GeoJSON server-side y nunca
   proyectan UTM en el cliente.

## 5. Estados

- `INTEROPERABLE` — formato + CRS declarados y válidos.
- `EXPORTABLE` — listo para exportación (KML/KMZ, GeoJSON).
- `BLOQUEADO` — formato prohibido o CRS oculto.

## 6. Salidas

- Entrega de datos con CRS declarado y transformación registrada.
- Exportaciones KML/KMZ/GeoJSON a consumidores externos (HF-CARTO, Google Earth).

## 7. Evidencia

- `express-server.js` (`/api/artefacto` → GeoJSON de `geometry/*`).
- Reglas de transformación con `always_xy` en `express-server.js` / puente
  `hf_geo_bridge.cjs`.
- Contrato de referencia espacial (árbol de código, sin copiar proveniencia).

## 8. Validaciones

1. Todo GeoJSON entregado es RFC 7946 (EPSG:4326, lon/lat).
2. Cero rasters/vectores de intercambio con CRS oculto.
3. Cero transformaciones en el navegador.
4. `always_xy=True` presente en toda transformación del proxy.
5. Formatos prohibidos ausentes del circuito de datos.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Formato abierto + CRS declarado + transformación registrada | **PASS** |
| Formato abierto con CRS declarado pero sin transformación verificada | **CONDICIONAL** |
| Formato propietario afín o CRS oculto / transformación en navegador | **FAIL** |

## 10. Bloqueos

- Dato con CRS oculto bloquea su incorporación.
- CAD vectorial afín bloqueado en importación y exportación.
- Entrega UTM cruda al web bloqueada.

## 11. Responsabilidades profesionales

- Certificar CRS y datum en cada intercambio.
- Declarar `crs_oculto` cuando un heredado no traiga CRS.
- Registrar manual exacto de la transformación (método + versión + `always_xy`).

## 12. Consumidores

- Proxy React (`express-server.js`), visores Leaflet.
- HF-CARTO y exportaciones KML/KMZ.
- `hf.spatial-data.v1` y `hf.spatial-reference.v1` (declaraciones de formato/CRS).

## 13. Responsabilidades prohibidas

- Proyectar UTM en el navegador.
- Entregar salidas sin CRS.
- Importar/exportar formatos afines propietarios.
- Silenciar un CRS desconocido convirtiéndolo a "WGS84 por defecto".

## 14. Relación con hf.case.v1

`hf.case.v1` materializa las geometrías del caso en GeoJSON RFC 7946
(`geometry/`), mientras `hf.interoperability.v1` garantiza que esa entrega se
haga con CRS declarado, transformación server-side y formatos abiertos.

## 15. Ejemplo del caso iguana_pc80

- `project-location.geojson` / `proposed-cell.geojson`: GeoJSON RFC 7946
  (EPSG:4326, lon/lat). El proxy sirve `/api/artefacto` con `always_xy=True`.
- MDT: GeoTIFF con tags CRS EPSG:32618.
- Ortofoto AMVA y MapGIS (GPKG): clase C; CRS georreferenciado; uso visual.
- KML/KMZ: exportación a Google Earth de topónimos/rodeos, sin valor de decisión.
- Cero UTM crudo en la salida web; cero transformación en el navegador.