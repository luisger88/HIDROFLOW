# Plantilla de caso portable HidroFlow (HF_CASE/_template)

Esquema de referencia para crear un caso portable (contrato hf.case.v1).

## Estructura mínima

```
HF_CASE/<caso_id>/
  .hfcase                          # marcador de raíz (descubrimiento portable)
  case.json                        # contrato hf.case.v1 (identidad, gates, restricciones)
  manifest.json                    # contrato hf.manifest.v1 (inventario A/B/C/D 100 %)
  decision-log.jsonl               # contrato hf.decision-log.v1 (append-only)
  checksums.sha256                 # hashes deterministas de archivos incorporados
  state/gates.jsonl                # ledger de gates (inmutable)
  geometry/...geojson              # geometrías (RFC 7946); adopted-cell SOLO si hay adopción
  decision/spatial-decision.json   # contrato hf.spatial-decision.v1
  source/                          # referencias a entradas/expediente
  terrain/                         # referencia al MDT (por hash, sin copiar)
  network/                         # referencia a la red HF (computacional)
  references/source-manifest.json  # fuentes referenciales (MapGIS, ortofoto, ...)
  catalog/                         # catálogo resumido de activos
  evidence/provenance.json         # procedencia gobernada
  evidence/hashes.json             # hashes de activos externos
  outputs/                         # referencias a salidas canónicas
  exports/                         # registro de exportaciones (no datos pesados)
  cache/                           # clase D: descartable sin perder el caso
```

## Pasos

1. Copiar la estructura (sin datos de otro caso).
2. Definir `caso_id`, nombre, OT y punto contractual en `case.json`.
3. Ejecutar el resolvedor/validadores portables:
   `python 02_CORE/portability/tests/run_portability_tests.py --case HF_CASE/<caso_id>`
4. Registrar decisiones en `decision-log.jsonl` y gates en `state/gates.jsonl`.
5. Generar `checksums.sha256` (regla del resolvedor) y validar P1-P5.

## Reglas

- No copiar MDT, GPKG, rásteres, teselas ni datos pesados al paquete.
- Inventariar el 100 % de los activos incorporados o referenciados.
- No crear `geometry/adopted-cell.geojson` sin adopción profesional.
- Sin rutas absolutas nuevas; usar rutas relativas o referencias configurables.