# Contrato del Dato Espacial HidroFlow — hf.spatial-data.v1

- **Esquema:** `hf.spatial-data.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Declarar y gobernar **todo activo espacial** que un caso portable referencia,
incorpora o produce. El registro espacial es la fuente única de verdad para
saber qué es canónico, qué es computacional, qué es referencial, de dónde viene,
en qué CRS vive y qué hash lo identifica.

Esta versión materializa el registro en
`HF_CASE/iguana_pc80/spatial/spatial-data-registry.json` como **inventario
espacial piloto** del caso iguana_pc80. No inventaría activos ajenos al caso.

## 2. Schema id

- `schema`: `hf.spatial-data.v1`
- `schema_version`: `1.0`

## 3. Entradas

- Un caso portable validado (`hf.case.v1`), en particular su `manifest.json`
  (autoridad de clasificación A/B/C/D) y sus referencias (`network/`,
  `terrain/`, `evidence/`, `references/`, `outputs/`).
- La decisión espacial vigente (`hf.spatial-decision.v1`) sin cambios.
- Los hashes registrados en `evidence/hashes.json` y `REGISTRO_HASHES_GATE02.json`.
- Datos pesados externos (MDT, red, imagen) referenciados, nunca copiados.

## 4. Campos obligatorios por activo

| Campo | Tipo | Ejemplo iguana_pc80 |
|---|---|---|
| `id` | string | `mdt_copernicus_glo30_aburra` |
| `nombre` | string | `MDT Copernicus GLO30 - Valle de Aburrá` |
| `clase` | enum | `A_CANONICO` / `B_COMPUTACIONAL` / `C_REFERENCIAL` / `D_CACHE` |
| `formato` | string | `GeoTIFF` |
| `fuente` | string | `Copernicus GLO30` |
| `autoridad` | string | `Copernicus / operación institucional HidroFlow` |
| `cobertura` | string | `Valle de Aburrá (extensión 72 x 77.5 km)` |
| `fecha` | string|null | `2026-09-20` |
| `vigencia` | string | `no_definida` |
| `licencia` | string | `Copernicus Open Access (referencial)` |
| `crs` | string | `EPSG:32618` |
| `datum` | string | `WGS84` |
| `axis_order` | string | `x_easting_y_northing` |
| `resolucion` | string | `30 m` |
| `escala` | string|null | `n/a (raster original)` |
| `extension` | objeto | `{west, south, east, north}` |
| `nodata` | número|null | `null` |
| `precision_conocida` | string | `resolución original GLO30; sin precisión posicional certificada` |
| `tamano` | número|null | `tamaño en bytes` |
| `sha256` | string | `1b12e9db...` |
| `procedencia` | string | `GATE 2 E2 / operación institucional` |
| `transformaciones` | array | `[EPSG:4326 -> EPSG:32618 rasterio.warp.transform]` |
| `regenerabilidad` | string | `no_regenerable` |
| `portabilidad` | string | `no_portable_datos_privados` |
| `restricciones` | array | `["referenciado por hash; no copiado"]` |
| `estado` | string | `REFERENCIADO` |

## 5. Estados del dato espacial

- `REGISTRADO` — entrada declarada en el registro con todos los campos obligatorios.
- `REFERENCIADO` — activo pesado/externo localizado por hash; no copiado.
- `INCORPORADO` — activo con copia dentro del paquete (rastreable por manifest).
- `RATIFICADO` — dato adoptado por decisión profesional y persistido.
- `PROPUESTA_NO_ADOPTADA` — dato computacional propuesto; sin adopción.
- `HISTORICO` — evidencia preservada; no corregible ni sobrescribible.
- `REVOCADO` / `INVALIDADO` — dato que dejó de ser apto y se declara formalmente.

## 6. Salidas

- `spatial/spatial-data-registry.json` (inventario espacial gobernado del caso).
- Entradas utilizables por `hf.geo-qa.v1`, `hf.network.v1`, `hf.comparison.v1`,
  HF-CARTO y la aplicación React (lado consumo).

## 7. Evidencias

- `manifest.json` (clasificación y copia interna).
- `evidence/hashes.json` y `evidence/provenance.json`.
- `REGISTRO_HASHES_GATE02.json` (hashes de E2 del GATE 2).
- SHA-256 de cada activo interno verificable en `checksums.sha256`.

## 8. Validaciones

1. Todo activo registrado incluye **todos** los campos obligatorios.
2. `clase` ∈ {A, B, C, D} y coherente con `manifest.json`.
3. `crs` siempre presente; si falta, el veredicto es FAIL.
4. `sha256` siempre presente para clase A y B; si falta en clase A → FAIL.
5. `axis_order` siempre presente y explícito (no inferido).
6. Cero rutas absolutas nuevas en el registro.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Registro completo, CRS y hash presentes, clases válidas | **PASS** |
| Falta un campo no crítico; activo clase C sin hash (referencial) | **PASS CONDICIONAL** |
| Activo clase A sin CRS o sin hash | **FAIL** |
| CRS ausente en cualquier clase | **FAIL** |
| Ruta absoluta nueva | **FAIL** |

## 10. Bloqueos

- Un activo clase A sin CRS/hash bloquea su uso canónico.
- Un dato no registrado no puede entrar en circuitos de decisión.
- Un activo `HISTORICO` bloquea su corrección y sobrescritura.

## 11. Responsabilidades profesionales

- Declarar la fuente, autoridad y licencia reales sin inventar valores
  (`unknown` cuando no exista).
- Clasificar A/B/C/D con criterio (canónico ≠ disponible).
- Registrar la precisión conocida sin sobredeclarar exactitud.

## 12. Consumidores

- `hf.spatial-reference.v1` (para resolver el CRS/axis de cada activo).
- `hf.geo-qa.v1` (listas de verificación por clase).
- `hf.network.v1` / `hf.comparison.v1` (estado de la red y métricas).
- HF-CARTO (qué renderizar con autoridad).
- Aplicación React / proxy (declaración de CRS de entrega).

## 13. Responsabilidades prohibidas

- Promover un dato de clase C o D a canónico por disponibilidad.
- Silenciar la ausencia de CRS o hash.
- Inventar licencias, vigencias o precisiones.
- Copiar datos pesados al paquete sin necesidad demostrada.

## 14. Relación con hf.case.v1

El registro espacial es subsidiario de `hf.case.v1`: su clasificación A/B/C/D
debe ser **coherente** con `manifest.json` y con `hf.spatial-decision.v1`.
Un cambio de clase en el registro no cambia por sí mismo el estado del caso;
el estado solo cambia por decisión profesional persistida en
`state/gates.jsonl` y `decision-log.jsonl`.

## 15. Ejemplo del caso iguana_pc80

Activos inventariados en el piloto (coherentes con `manifest.json`):

| id | clase | formato | estado |
|---|---|---|---|
| `project-location` (punto D-03) | A_CANONICO | GeoJSON | RATIFICADO |
| `proposed-cell` (fila 1028, col 946) | B_COMPUTACIONAL | GeoJSON | PROPUESTA_NO_ADOPTADA |
| `mdt_copernicus_glo30_aburra` | B_COMPUTACIONAL | GeoTIFF | REFERENCIADO |
| `red_hf_gate02_d03` | B_COMPUTACIONAL | GeoJSON | INTERNALLY_VALIDATED |
| `segmento_candidato_d03` (segmento 24) | B_COMPUTACIONAL | GeoJSON | CANDIDATO_NO_DEMOSTRADO |
| `mapgis` | C_REFERENCIAL | institucional_catastro | REFERENCIAL |
| `ortofoto_amva` | C_REFERENCIAL_VISUAL | imagen_georreferenciada | REFERENCIAL_VISUAL |
| `verificacion_D03.png` | EVIDENCIA | PNG | HISTORICO (FAIL_ORIENTATION) |
| `contrato_snap_D03` | A_CANONICO | JSON | INMUTABLE |
| `manifiesto_gate02` | B_COMPUTACIONAL | JSON | MANIFIESTO_E2 |

La red HF permanece `INTERNALLY_VALIDATED` con
`TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED`; el segmento 24 sigue
`CANDIDATO_NO_DEMOSTRADO`. `adopted_cell` sigue null.