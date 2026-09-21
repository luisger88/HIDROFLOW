# QA del inventario espacial — iguana_pc80

Esta carpeta es el **registro piloto de aseguramiento de calidad espacial** del
caso, gobernado por `hf.geo-qa.v1` (diseño). **HF-GEO-QA NO ejecuta
operativamente** durante OT-HF-SIG-002.

## Contenido

- `qa-ledger.jsonl`: ledger de QA (línea a línea, append-only, legible por S1-S12).
- Cada línea: `linea`, `id_activo`, `grupo`, `check`, `resultado`, `detalle`,
  `fecha`, `metodo`, `evidencia`.

## Resultados por grupo

| Grupo | Resultado piloto |
|---|---|
| CRS / axis / transformación | PASS (activos con CRS declarado) |
| Red / competencia territorial | VALIDADO_INTERNO (competencia NO demostrada) |
| Evidencia / orientación | FAIL_ORIENTATION preservado (NOT_SUITABLE) |
| Referencias visuales | CONDICIONAL (uso visual; prohibida adopción) |
| Gobernanza / hashes | PASS (baselines S10/S12) |
| Integridad triple (OT-HF-SIG-002B) | PASS (state_hash/package_hash/evidence_hash coherentes; P1-P5 y S1-S12 + I1-I8 sin excepciones) |

## Normas

1. El ledger es append-only: nunca se reescriben líneas ya emitidas.
2. `FAIL_ORIENTATION` no se reutiliza ni se corrige.
3. QA interno no sustituye contraste externo.
4. Las entradas aquí son línea base de diseño para la futura apertura de
   HF-GEO-QA operativo (ver `docs/contratos/gis/README.md`).