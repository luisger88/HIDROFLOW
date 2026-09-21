# Inventario espacial gobernado — iguana_pc80

- **Contrato rector:** `hf.spatial-data.v1` (OT-HF-SIG-002)
- **Caso:** `HF_CASE/iguana_pc80`

## Contenido

| Ruta | Función |
|---|---|
| `spatial/spatial-data-registry.json` | Inventario espacial gobernado (10 activos). Esquema `hf.spatial-data.v1`. |
| `spatial/qa/README.md` | Guía de QA del inventario. |
| `spatial/qa/qa-ledger.jsonl` | Ledger de QA piloto (22 entradas; línea base de diseño, no ejecución operativa HF-GEO-QA). |

## Reglas del inventario

1. Clasificación coherente con `manifest.json` (A/B/C/D).
2. Activos pesados referenciados por ruta relativa y hash; NO se copian.
3. CRS, datum y axis_order siempre declarados (nulos explícitos para JSON no espacial).
4. La red HF y el segmento 24 conservan sus estados no demostrados.
5. `verificacion_D03.png` se preserva como histórica (`FAIL_ORIENTATION`, `NOT_SUITABLE`).
6. Cero rutas absolutas nuevas en este directorio.

## Conflicto administrado (sección 11 de la OT-HF-SIG-002)

Registrar `spatial/*` en `manifest.json` y `checksums.sha256` modifica el
`estado_hash` calculado por el resolver, pero `case.json` es inmutable y no se
modifica. El conflicto está documentado en la entrada 18 del ledger y en el
cierre de la OT; NO se corrige `case.json`.