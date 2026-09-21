# HF-GEO-QA V1 — Puerta Operativa de Calidad Espacial

OT-HF-GEO-QA-001 · rama `ot-hf-geo-qa-001-puerta-calidad-espacial`

Módulo aislado, determinista y sin autoridad decisional. Ejecuta los contratos
SIG de `docs/contratos/gis` (registro espacial, raster, red, cartografía y
puerta 2) para evaluar productos espaciales **antes** de su consumo por
HF-CARTO, HF-HYDRO, watershed, expediente o decisiones profesionales.

## Garantías contratuales

- `state_change = false` y `professional_decision = null` en todo resultado.
- No escribe decisiones, gates, `adopted-cell` ni modifica el MDT.
- No modifica motores productivos (`hf_geo`, proxy, React, `hidroflow_cli`).
- Resultados deterministas (`hf.geo-qa.result.v1@1.0`): `qa_run_id` y
  `output_hash` calculados con JSON canónico (claves ordenadas, UTF-8, LF).
- Rango de resultados: `PASS`, `CONDICIONAL`, `FAIL`, `FAIL_ORIENTATION`,
  `INTERNALLY_VALIDATED`, `INTERNALLY_VALIDATED_WITH_RESTRICTIONS`.
- Severidades: `INFO`, `WARNING`, `ERROR`, `CRITICAL`.
- No usa rutas absolutas en el código: las rutas se derivan de `__file__` o
  de registros relativos.
- Importa el resolver de portabilidad bajo demanda (solo runner/cli), nunca
  en los checks puros.

## Perfiles

| id | objetivo | resultado máximo |
|---|---|---|
| `spatial_reference` | Registro de referencia espacial (CRS, datum, ejes, transformación) | PASS |
| `raster_georef` | Georeferenciación del ráster (affine, north-up, extensión, punto contractual) | PASS |
| `cartographic_evidence` | Evidencia cartográfica declarativa (flecha norte ⇒ FAIL_ORIENTATION) | PASS |
| `vector_geometry` | Geometría vectorial FeatureCollection | PASS |
| `network_internal` | Validez interna de la red HF (gate02) | INTERNALLY_VALIDATED |
| `gate02_diagnostic` | Diagnóstico integral de la puerta 2 | INTERNALLY_VALIDATED |

La red **nunca** declara competencia territorial: añade la restricción
`TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED` y bloquea consumo en
`EXPEDIENTE`, `DECISION_PROFESIONAL`, `CANONICAL_WATERSHED` y
`TERRITORIAL_COMPETENCE`.

`FAIL_ORIENTATION` (CRITICAL) se dispara cuando la flecha norte está presente
y no está verificada o no coincide con el norte del mapa; bloquea
`SNAP_DECISION`, `PF02_ADOPTION`, `GATE_3`, `CANONICAL_WATERSHED` y
`CARTOGRAPHIC_REPORT`, y permite `HISTORICAL_AUDIT`, `DIAGNOSTIC`,
`COMPARISON` y `RUPTURE_EVIDENCE`.

## Uso

Desde `02_CORE` (o con `02_CORE` en `PYTHONPATH`):

```bash
python -m geo_qa.cli profiles
python -m geo_qa.cli verify gate02_diagnostic HF_CASE/iguana_pc80 caso_iguana_pc80
python -m geo_qa.cli run-all HF_CASE/iguana_pc80
python -m geo_qa.cli pilot HF_CASE/iguana_pc80 C
```

`pilot <A|B|C|D>` registra la evidencia en
`spatial/qa/qa-ledger.jsonl` (una línea por ejecución, con `qa_run_id`) y
regenera la integridad del caso; `state_hash` permanece invariante.

## Estructura

```
geo_qa/
├── __init__.py            versión y doc del módulo
├── models.py              vocabulario de resultados y QaResult
├── result.py              JSON canónico, qa_run_id, output_hash, invariantes
├── profiles.py            catálogo declarativo de los seis perfiles
├── registry.py            registro y validación Q1 del catálogo
├── runner.py              contexto del caso y orquestador determinista
├── cli.py                 interfaz CLI
├── deps.py                paths de importación (solo runner/cli)
├── checks/                checks puros por dominio (sin imports de portability)
│   ├── spatial_reference.py
│   ├── raster_georef.py
│   ├── cartographic_evidence.py
│   ├── vector_geometry.py
│   ├── network_internal.py
│   └── gate02_diagnostic.py
└── tests/run_geo_qa_tests.py   Q1-Q16
```

## Hallazgos QA esperados en el caso `iguana_pc80`

- Registro `spatial-data-registry.json` declara CRS EPSG:32618 para la red;
  el archivo `red_gate02_D03.geojson` declara EPSG:4326 (discrepancia => WARNING).
- La vectorización no expone nodos compartidos exactos (594 extremos grado 1);
  se reporta WARNING, la continuidad raster consta en el registro.
- El vector no expone campo de acumulación: la monotonicidad NO se afirma.
- La puerta 2 se describe como GATE_3 BLOQUEADO, `adopted_cell null`, celda
  propuesta NO ADOPTADA.

## Autoridad y licencias

El módulo es un componente de gobernanza digital (Perfil Profesional 2/3,
Ingeniero Digital). La habilitación de consumo es responsabilidad de la
autoridad que persiste la decisión profesional; este módulo NUNCA la emite.