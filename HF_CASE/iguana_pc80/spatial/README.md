# Inventario espacial gobernado — iguana_pc80

- **Contrato rector:** `hf.spatial-data.v1` (OT-HF-SIG-002)
- **Caso:** `HF_CASE/iguana_pc80`
- **Integridad:** modelo triple (`state_hash`, `package_hash`,
  `evidence_hash`) desde OT-HF-SIG-002B (`hf.integrity.v1`)

## Contenido

| Ruta | Función |
|---|---|
| `spatial/spatial-data-registry.json` | Inventario espacial gobernado (10 activos). Esquema `hf.spatial-data.v1`. |
| `spatial/qa/README.md` | Guía de QA del inventario. |
| `spatial/qa/qa-ledger.jsonl` | Ledger de QA piloto (23 entradas; línea base de diseño, no ejecución operativa HF-GEO-QA). |

## Reglas del inventario

1. Clasificación coherente con `manifest.json` (A/B/C/D).
2. Activos pesados referenciados por ruta relativa y hash; NO se copian.
3. CRS, datum y axis_order siempre declarados (nulos explícitos para JSON no espacial).
4. La red HF y el segmento 24 conservan sus estados no demostrados.
5. `verificacion_D03.png` se preserva como histórica (`FAIL_ORIENTATION`, `NOT_SUITABLE`).
6. Cero rutas absolutas nuevas en este directorio.

## Integridad y drift resuelto (OT-HF-SIG-002B)

El registro de `spatial/*` en el paquete ya no altera la coherencia de hashes:
`state_hash` cubre solo los contratos de decisión; el inventario y el ledger
forman parte de `evidence_hash`; `package_hash` cubre la composición física.
`case.json` se migró técnicamente (bloque `integridad` → `integrity.json`).
P1-P5 y S1-S12 + I1-I8 pasan sin excepciones (ledger, líneas 18 y 23).