# Contrato de Caso Portable HidroFlow — hf.case.v1

- **Esquema:** `hf.case.v1` (schema_version 1.0)
- **OT:** OT-HF-PORT-002 — Contrato Portable del Caso HidroFlow
- **Caso de ejemplo (implementado):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-003-cstate-001b-portabilidad-caso`
- **Fecha UTC:** 2026-09-20

---

## 1. Propósito

Definir el paquete portable mínimo de un caso hidrográfico: una estructura de
carpetas y contratos que puede copiarse a otra ubicación local y abrirse desde
esa nueva raíz **sin perder significado** ni depender de rutas absolutas nuevas.

El caso portable preserva: identidad, estado, decisiones, evidencia,
incertidumbre, restricciones, hashes, procedencia, clasificación de activos y
soberanía profesional.

Este contrato NO corrige la red hídrica, NO adopta el snap, NO ejecuta GATE 3,
NO construye HF-CARTO, NO abre HF-SIG-ENGINEERING-001 ni HF-CONVERSE.
Construye el contrato que esas capacidades respetarán posteriormente.

## 2. Estructura

```
HF_CASE/<caso_id>/
  .hfcase                          marcador de raíz (descubrimiento portable)
  case.json                        hf.case.v1 (identidad, estado, gates, state_hash)
  integrity.json                   hf.integrity.v1 (state/package/evidence)
  manifest.json                    hf.manifest.v1 (inventario 100 % A/B/C/D)
  decision-log.jsonl               hf.decision-log.v1 (append-only, UTF-8)
  checksums.sha256                 hashes SHA-256 deterministas
  state/gates.jsonl                ledger de gates (inmutable)
  geometry/                        GeoJSON RFC 7946
  source/                          referencias a entradas y expediente
  terrain/                         referencia al MDT por hash (no copiado)
  decision/spatial-decision.json   hf.spatial-decision.v1
  decision/restrictions.json       hf.restrictions.v1 (restricciones vigentes)
  network/                         referencia a la red HF (computacional)
  references/source-manifest.json  fuentes referenciales externas
  catalog/                         catálogo de activos (resumen)
  evidence/provenance.json         procedencia gobernada
  evidence/hashes.json             hashes de activos externos
  outputs/                         referencias a salidas canónicas
  exports/                         registro de exportaciones (sin datos pesados)
  cache/                           clase D, descartable
```

## 3. Clasificación de activos (A/B/C/D)

| Clase | Descripción | Ejemplos |
|---|---|---|
| **A — CANÓNICO** | Identidad, estado adoptado, decisiones ratificadas, restricciones vigentes, hashes de estado, gates persistidos, expediente vigente. | `case.json`, `manifest.json`, `decision-log.jsonl`, `gates.jsonl`, `project-location.geojson` |
| **B — COMPUTACIONAL** | MDT acondicionado, flow direction/accumulation, red HF, segmentos, candidatos, proposed_cell, productos regenerables. | `proposed-cell.geojson`, `red_gate02_D03.geojson` (por referencia), `snap_registro_D03.json` |
| **C — REFERENCIAL** | MapGIS, ortofoto, Google Earth, redes institucionales, cartografía externa, antecedentes profesionales. | `references/source-manifest.json` (MapGIS, ortofoto) |
| **D — CACHÉ** | Teselas, previews, temporales, vistas regenerables, salidas auxiliares sin autoridad. | `cache/` |

Reglas:

- La caché puede eliminarse sin perder el caso.
- Una referencia no se vuelve canónica por estar disponible.
- Un resultado computacional no se vuelve canónico sin decisión profesional.
- La imagen defectuosa de GATE 2 se preserva como **evidencia histórica**
  (clase `evidence`, estado `historic`, `qa: FAIL_ORIENTATION`,
  `decision_use: NOT_SUITABLE`), no como caché descartable.
- PMTiles puede ser caché visual, pero conserva id y hash del activo fuente.
- `adopted-cell.geojson` NO se crea con geometría nula; si no hay adopción se
  registra su ausencia en `spatial-decision.json`.

## 4. Estados

- GATE 1 = `PASS`
- GATE 2 = `CONDICIONAL` (decisión profesional pendiente; `decision_profesional` = null)
- GATE 3 = `BLOQUEADO`
- `verdict` espacial = `PENDING_PROFESSIONAL_DECISION`
- `network.competence` = `NOT_DEMONSTRATED`
- `adopted_cell` = null (o ausente)
- `acquisition_aoi` = null (si no está adoptada)
- `professional_click` = null (si no existe segundo clic real)

Estado permitido para la celda propuesta: `PROPUESTA, NO ADOPTADA` /
`CANDIDATO_NO_DEMOSTRADO`. No se escribe "adoptar / aceptado / confirmado /
celda vigente" respecto a (1028, 946).

## 5. Ejemplo: La Iguaná (iguana_pc80)

- Identidad: `iguana_pc80` / `Quebrada La Iguaná - PC_80` / `OT-HF-003`
- Punto D-03: lat `6.271785117145225`, lon `-75.59408755595547`, cota `1511.36 msnm`
- CRS geodésico: `EPSG:4326`; CRS operativo: `EPSG:32618`
- Propuesta computacional E2: fila `1028`, columna `946`, segmento `24`,
  distancia `32.307 m`, acumulación `55024`
- GATE 1 PASS · GATE 2 CONDICIONAL · GATE 3 BLOQUEADO
- `decision_profesional` de GATE 2 = null; `adopted_cell` = null
- `verificacion_D03.png` = evidencia histórica `FAIL_ORIENTATION`,
  `NOT_SUITABLE`, preservada en su ubicación original
- MDT por referencia y hash (no copiado): `1b12e9db…`
- Expediente histórico inmutable externo: `HF_EXPEDIENTE_001.json` (`5f6d8488…`)

## 6. Portabilidad

- Todas las rutas nuevas del paquete son **relativas** o referencias externas
  configurables. Cero rutas absolutas nuevas en HF_CASE, contratos, resolvedor,
  esquemas, validadores, tests y documentación ejecutable.
- Resolvedor portable aislado: `02_CORE/portability/resolver.py`. Prioridad:
  1) argumento explícito; 2) variable de entorno `HF_CASE_ROOT`;
  3) descubrimiento ascendente del marcador `.hfcase`; 4) error explícito.
  Prohibido el fallback a `D:\HidroFlow`, `C:\Users\User`, `caso_real_001`,
  "Cien Pesos" o salidas históricas. Impide escape fuera de la raíz y distingue
  activos internos/externos.
- Datos pesados (MDT, GPKG, rásteres, teselas) NO se copian; se referencian por
  ruta relativa/id/hash/fuente/autoridad/portabilidad/regenerabilidad/restricción.

## 7. Reglas de integridad

1. `checksums.sha256` cubre todos los archivos incorporados al paquete, no los
   externos. Cálculo determinista; verificación tras copiar a otra ubicación.
2. Hashes de activos pesados no copiados se registran en el manifest y en
   `evidence/hashes.json`; no se agregan al checksum como si estuvieran dentro.
3. La integridad del caso se modela con **tres hashes** (OT-HF-SIG-002B):
   `state_hash` (decisiones/estado), `package_hash` (composición física) y
   `evidence_hash` (evidencia), calculados por el resolver de portabilidad
   (`state_hash_paquete`, `package_hash_paquete`, `evidence_hash_paquete`) y
   registrados en `integrity.json` (`hf.integrity.v1`). `case.json` conserva
   `state_hash` como migración técnica. Detalle y anti-ciclos en
   `hf-integrity-v1.md`.
4. Todos los GeoJSON son válidos (RFC 7946), declaran CRS semántico cuando es
   necesario y registran hashes.
5. JSONL siempre línea = un objeto JSON. Append-only. UTF-8.
6. Valores ausentes se registran como `null` explícito; no se rellenan por
   inferencia.

## 8. Relación futura con HF-CARTO y HF-SIG-ENGINEERING-001

- **HF-CARTO** consumirá la capa de geometrías (`geometry/`) y la clasificación
  A/B/C/D para decidir qué renderizar con autoridad (canónico) frente a lo
  meramente visual (caché) o referencial.
- **HF-SIG-ENGINEERING-001** podrá abrirse solo cuando el caso lo autorice.
  Criterio exacto para abrirlo (según OT-HF-PORT-002): el paquete portable debe
  validar (P1-P5), los hashes de los inmutables deben conservarse y la
  restricción de archivos de portabilidad debe cumplirse. La reproducción
  física en otra máquina queda fuera de alcance y será certificada
  posteriormente.
- Ambas capacidades respetarán el estado de gates persistido en
  `state/gates.jsonl` y las decisiones de `decision/spatial-decision.json`.

## 9. Tests

`02_CORE/portability/tests/run_portability_tests.py` ejecuta:

```
P1. Estructura      contratos obligatorios presentes
P2. Integridad      state/package/evidence coinciden (sin tolerancia de drift)
P3. Clasificación   todas las clases A/B/C/D válidas
P4. Decisión        GATE 2 pendiente; adopted_cell null; segmento 24 no adoptado
P5. Portabilidad    copia temporal externa reabierta y validada, luego eliminada
```

P5 no ejecuta WhiteboxTools ni reproduce el snap real.