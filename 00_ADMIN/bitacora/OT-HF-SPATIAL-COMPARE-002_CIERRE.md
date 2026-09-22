# OT-HF-SPATIAL-COMPARE-002 · CIERRE — Contraste territorial limitado post-assessment

- **Fecha:** 2026-09-22
- **Rama:** `ot-hf-spatial-compare-002-post-assessment`
- **Caso de referencia:** `iguana_pc80`
- **Autoridad:** Ingeniero Digital (Big Pickle) — Perfil Profesional 2/3
- **Estado:** CIERRE

## 1. Objetivo

Materializar la vía **gobernada de contraste territorial limitado** de una
fuente externa que ya pasó por assessment (`hf.spatial-source-assessment.v1`),
conservando todos los invariantes del motor V1: sin autoridad
(`state_change=false`, `professional_decision=null`), determinismo firme por
firma, nunca adopción ni competencia territorial, y persistencia inventariada
en el caso portable.

## 2. Cómo leer la fuente sin copiarla

El GeoPackage `streams_urban_1000_medellin.gpkg` (148 088 features, capa
`Channel Network`, 189 MB) tiene un srs_id interno `100000` con organización
`NONE`, no reconocible como map-compatible por GDAL:

1. **fiona con `bbox=` ignora el filtro espacial** (devuelve las 148 088
   features incluso con una ventana lejana; `fiona.open(layer=…).filter` lanza
   `TypeError`).
2. **La preselección correcta es por el índice rtree nativo del propio archivo**
   (tabla virtual `rtree_Channel Network_geom`, 148 088 filas) con SQL puro en
   modo `read-only`:
   `SELECT id FROM "rtree_Channel Network_geom" WHERE minx<=? AND maxx>=? AND miny<=? AND maxy>=? ORDER BY id`.
3. La lectura de las features preseleccionadas se hace con
   `pyogrio.read_dataframe(str(gpkg), sql="SELECT fid, geom … ORDER BY fid")`
   → en **~0.04 s**, solo 596 geometrías de la ventana D-03.
4. Tras la lectura, `reducir_xyz_xy` descarta la dimensión Z en memoria
   (596/596 partes con Z, 34 381 vértices) y `transformar_lineas` pasa de
   EPSG:9377 a EPSG:32618 con `always_xy=True`.

## 3. Puerta de métricas limitadas

`governance.cumplimiento_metricas_limitadas(entrada, assessment)` habilita el
contraste cuando, además del estado `CONDITIONALLY_APT_FOR_COMPARISON` y la
concordancia de `assessment_id`, cumple:

- `aptitud.apto_para_comparacion=true` y `apto_para_metricas_plenas=false`.
- Quorum QA sin `FAIL`/`FAIL_ORIENTATION` (24 PASS / 6 CONDICIONAL, 30 checks).
- Escalón `CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION` con veredicto `PASS`.
- `crs=EPSG:9377` con `always_xy=true`.
- Cobertura de ventana positiva (`n_lineas_ventana=575`,
  `pct_extension_sobre_ventana=1.0`) y `restricciones` no vacías (5).

## 4. Resultado del run limitado

`EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON` (perfil
`COMPARE_LIMITED_EXTERNAL_V1`, fuera del catálogo V1):

- **Resultado:** `PARTIALLY_COMPARABLE`; clasificación `TERRITORIAL_CONTRAST_AUDIT`;
  confianza `BAJA`.
- **Firmas:** `comparison_run_id=3c1166f948abe5df`,
  `output_hash=d0d0a4d6978d189ac82b25b9d5aa80453a8992038b0f1b58ef48ca29c89ed97f`.
- Evidencia decisoria: pct del target dentro del corredor de 30 m de la fuente =
  **58.565 % ≥ 40 %**; orientación local mediana 44.781°; 4 segmentos sin
  homólogo; `iou_corredores@30 = 0.123`.
- Métricas señeras: fuente en ventana 805 LineStrings / 35 819.127 m; target
  8 / 7 413.542 m; hausdorff 666.766/666.766/387.709 m; distancias
  fuente→red n=30 995, mediana 127.011 m, máx 666.766 m.
- `input_hashes`: registry 30117c68…, source `3b2b91cf…` (GPKG inmutable),
  target `ce398aef…` (red HF inmutable), assessment `6d3ff5c1…`.
- Interpretaciones permitidas: las 3 del assessment; bloquea además
  `CANONICAL_WATERSHED`, `CARTOGRAPHIC_REPORT`, `HYDRO_CONSUMPTION`,
  `EXPEDIENTE`, `DECISION_PROFESIONAL`, `GATE_3`, `PF02_ADOPTION` y
  `TERRITORIAL_COMPETENCE`.

Comandos:

```powershell
$env:PYTHONPATH = "02_CORE"
python -X utf8 02_CORE/spatial_compare/tests/run_spatial_compare_tests.py      # C1-C20/E1-E6
python -X utf8 02_CORE/spatial_compare/tests/run_spatial_compare_limited_tests.py  # T1-T20/B1-B12
python -m spatial_compare.cli run-limited HF_CASE/iguana_pc80                 # persistir de nuevo
```

## 5. Resultado de las pruebas

```
RESULTADO_C1_C20: PASS (26/26)      # vía B2: re-ejecución completa
RESULTADO_T1_T20: PASS (31/31)      # incluye T15: re-ejecución determinista
```

T1-T6 gate; T7-T8 catálogo/consumidores; T9-T12 adaptador read-only,
preselección rtree (596), reducción Z y bounds en CRS; T13-T17 invariantes,
determinismo de serialización, métricas y prohibiciones; T18 integridad;
T19 ledger (línea 4); T20 histórico intacto; B1-B12 extras (B2 = regresión
completa de C1-C20/E1-E6).

## 6. Persistencia e integridad

- `spatial/comparisons/runs/EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON.json`
- `spatial/comparisons/evidence/` → `…_sources.json` y `…_audit.md`
- `spatial/comparisons/profiles/COMPARE_LIMITED_EXTERNAL_V1.json`
- `comparison-ledger.jsonl` → línea 4 (pregunta del contraste limitado).
- Manifest: 4 activos nuevos con fuente `OT-HF-SPATIAL-COMPARE-002`
  (55 → 59 incorporados); `checksums.sha256` e `integrity.json` regenerados.

```
state_hash    5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d  (INVARIANTE)
package_hash  146651e33dccd573a3eba7e490c865ff72433f4d76371f7beee4bd235a8ada97  (cambió)
evidence_hash 0a4c16f6c32d2425a8d1f0be029a80bd7ff482f4bdfb9219bb69d01d7447db2f  (cambió)
```

## 7. Hallazgos y decisiones técnicas

- El filtro `bbox` de fiona/GDAL no es fiable para este GeoPackage; la
  preselección correcta es el SQL sobre el rtree nativo del archivo en modo
  `ro` (sin escrituras, `PRAGMA query_only=ON`).
- Los corredores (radios 30/60/90/136 m) dominan el costo (~297 s); optimizados
  pasando la unión precomputada `[uA]`/`[uB]` a `analisis_multibuffer` con
  resultado idéntico (`_union` retorna la geometría única).
- La ventana D-03 está **rotada** respecto a UTM: la envolvente en EPSG:9377
  no permite un "roundtrip por esquinas"; la propiedad estable verificada es el
  centro (tolerancia 5 cm) y que el bbox de regreso contiene el original.
- Determinismo confirmado por re-ejecución (T15): `run_id` y `output_hash`
  reproducen exactamente la base.

## 8. Muro y no-tocado

- GeoPackage, red HF, `state/*`, `decision/*`, `geometry/*`,
  `evidence/hashes.json`, `case.json`, `caso_activo.json`, `OT-HF-003.hfproj`
  y `01_APP/**` sin cambios de esta OT (todo verificable por `git status`).
- Las transformaciones y la reducción Z ocurren en memoria; las firmas de las
  fuentes se verifican contra el registry antes de cualquier lectura.

## 9. Cierre recomendado

OT-HF-SPATIAL-COMPARE-002 **ACEPTADA**. La vía limitada queda operativa,
determinista, sin autoridad y con evidencia persistida; los consumidores
adoptivos y decisionales permanecen bloqueados para la fuente externa.