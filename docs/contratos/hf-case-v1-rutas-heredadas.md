# Rutas heredadas del caso portable — OT-HF-PORT-002

- **Caso:** `iguana_pc80` (Quebrada La Iguaná - PC_80, OT-HF-003)
- **Rama:** `ot-hf-003-cstate-001b-portabilidad-caso`
- **Regla de la OT:** cero rutas absolutas nuevas en HF_CASE, contratos,
  resolvedor, esquemas, validadores, tests y documentación ejecutable.

El paquete portable (contratos del caso) NO contiene rutas absolutas nuevas.
Las rutas heredadas que lo conectan a los activos originales del repositorio
son **relativas a la raíz del repositorio** (propiedad `ruta_relativa_repo` o
`ruta_relativa`) y se clasifican aquí.

## Clasificación

| Clase | Descripción |
|---|---|
| **BLOQUEANTE** | Impide la portabilidad si se introduce como ruta absoluta nueva |
| **NO BLOQUEANTE** | Relativa dentro del repo; permitida y verificable |
| **HISTÓRICA** | Pertenece a salida canónica E2 inmutable; no debe migrarse ni sobreescribirse |
| **FUERA DE ALCANCE** | Sin contacto con el paquete; solo se documenta si aparece |
| **MIGRACIÓN FUTURA** | Ruta que podrá convertirse en referencia configurable |

## Inventario

### 1. Activos de estado gobernado (externos, clase A) — NO BLOQUEANTE

| Ruta relativa | Uso | Clase |
|---|---|---|
| `07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json` | Expediente histórico (contrato D-03) | A |
| `02_CORE/config/caso_activo.json` | Caso activo (referencia de operación) | A |
| `02_PROYECTOS/OT-HF-003/OT-HF-003.hfproj` | Proyecto OT-HF-003 | A |
| `07_TOOLBOX/hf_geo/config/contrato_snap_D03.json` | Contrato del snap D03 | A |
| `00_ADMIN/bitacora/HF-CASE-STATE-001A/HF-CASE-STATE-001A_REGISTRO_HISTORICOS.json` | Registro histórico E1/E2 (inmutable) | A |

Solo se referencian por ruta relativa, id y hash (ver `evidence/hashes.json`,
`references/source-manifest.json`). No se copian al paquete.

### 2. Salida canónica E2 — HISTÓRICA (inmutable)

| Ruta relativa | Uso |
|---|---|
| `07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/{red_gate02_D03.geojson, segmento_candidato_D03.geojson, verificacion_D03.png, verificacion_D03.kml, verificacion_D03.geojson, snap_registro_D03.json, manifiesto_gate02.json, REGISTRO_HASHES_GATE02.json, caso_entrada_D03.json, contraste_snap_D03.json, punto_original_D03.geojson, punto_snap_D03.geojson}` | Salida canónica de GATE 2 (E2) |

No se sobreescribe ni se migra. `verificacion_D03.png` es evidencia histórica
`FAIL_ORIENTATION` / `NOT_SUITABLE` y se conserva en su ubicación original.

### 3. MDT — NO BLOQUEANTE / MIGRACIÓN FUTURA

| Ruta relativa | Uso |
|---|---|
| `01_DEM_HIDRO/00_BASE/DEM_Copernicus_GLO30_Aburra.tif` | MDT GLO-30 de la cuenca (referencial, por hash, no copiado) |

Fuente de Baigorri/GLO-30 Copernicus. Se referencia con hash `1b12e9db…`.
Migración futura: descriptor externo configurable (variable de entorno).

### 4. Fuentes referenciales — C (referencial), NO BLOQUEANTE

| Ruta | Uso |
|---|---|
| AMVA → MapGIS + red de referencia | Verificación visual de trazado preliminar |
| AMVA ortofoto / Google Earth | Visual; prohibida la adopción automática |
| `docs/interface/HF_CARTOGRAFIA_CAPACIDAD_OPERATIVA.md`, `00_ADMIN/bitacora/HF-COVER-005.md` | Registro de la capacidad/cobertura |
| `00_ADMIN/bitacora/HF-GEO-DIAG-002.md`, `HF-GEO-DIAG-004.md` | Registro de referencias AMVA/MapGIS |

### 5. Caché regenerable — D (caché), NO BLOQUEANTE

| Ruta | Uso |
|---|---|
| `cache/` (dentro del paquete) | Teselas, previews, temporales regenerables; descartable sin perder el caso |
| `exports/` (dentro del paquete) | Registro de exportaciones; sin datos pesados en Git |

## Verificación

`02_CORE/portability/resolver.py`:

- `es_interna()` rechaza rutas absolutas o con drive (`C:`, `D:`) al resolver
  activos incorporados.
- `ruta_interna()` bloquea escapes fuera de la raíz del caso.
- `abrir_caso()` / `verificar_hashes()` operan solo con rutas relativas
  provenientes de los contratos.
- Los tests P1-P5 validan estructura, integridad, clasificación, decisión y
  portabilidad estructural (copia temporal + reapertura + borrado).

Fuera del paquete, `references/source-manifest.json` y
`evidence/provenance.json` mantienen las referencias heredadas sin convertirlas
en rutas absolutas nuevas.