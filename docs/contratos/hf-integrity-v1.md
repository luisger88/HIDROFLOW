# Contrato de Integridad del Caso Portable — hf.integrity.v1

- **Esquema:** `hf.integrity.v1` (hash_version 2)
- **OT:** OT-HF-SIG-002B — Conciliación de la integridad de estado, paquete y
  evidencia
- **Caso de ejemplo (implementado):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Propósito

Separar la integridad del caso portable en **tres hashes independientes** para
que cada cambio tenga un efecto proporcional y predecible:

| Hash | Alcance | Cambia cuando |
|---|---|---|
| `state_hash` | Contratos de **decisión** | Cambia cualquier decisión, gate, restricción o geometría de decisión |
| `package_hash` | Composición física completa del paquete | Se añade/modifica cualquier archivo incorporado o su manifest |
| `evidence_hash` | Contratos de **evidencia** | Cambia el registro espacial, el ledger de QA o la evidencia |

Los tres se registran en `integrity.json` (contrato `hf.integrity.v1`).
`case.json` conserva únicamente `state_hash` como migración técnica
(OT-HF-SIG-002B).

## 2. Coberturas

### 2.1 state_hash (contratos de decisión)

`decision-log.jsonl`, `state/gates.jsonl`, `decision/spatial-decision.json`,
`decision/restrictions.json`, `geometry/project-location.geojson`,
`geometry/proposed-cell.geojson` y `geometry/adopted-cell.geojson` cuando
exista.

### 2.2 package_hash (composición física)

Todos los archivos del paquete **excepto meta** (`case.json`, `integrity.json`,
`manifest.json` en crudo, `checksums.sha256`) y excepto `cache/` y `exports/`.
El `manifest.json` participa mediante su **proyección canónica** (serialización
ordenada de sus entradas menos las meta), de modo que no hay ciclos.

### 2.3 evidence_hash (evidencia)

`evidence/hashes.json`, `evidence/provenance.json`,
`spatial/spatial-data-registry.json`, `spatial/qa/qa-ledger.jsonl` y, cuando
existan, los archivos de `spatial/comparisons/**`.

## 3. Determinismo

- Cada hash es `SHA-256` sobre líneas `ruta-relativa-posix::sha256` ordenadas.
- `integrity.json` se regenera byte-idéntico (sin marcas de tiempo).
- La regeneración integral (resolver + manifest + checksums) está en
  `02_CORE/portability/generar_integridad.py`.

## 4. Anti-ciclos

El material hasheado nunca incluye: `case.json`, `integrity.json`,
`manifest.json` (se usa la proyección), `checksums.sha256`, `cache/` ni
`exports/`. La entrada `integrity-json` del manifest queda fuera de la
proyección canónica.

## 5. Validación

- P2 de portabilidad: `state_hash`, `package_hash` y `evidence_hash`
  registrados == calculados, **sin tolerancia de drift**.
- `validar_integridad` (`02_CORE/portability/validators.py`) ejecuta la
  comparación completa.
- Pruebas I1-I8 (`02_CORE/sig_engineering/tests/run_sig_engineering_tests.py`):
  comportamiento de los tres hashes, portabilidad, anti-ciclos, determinismo y
  rutas relativas.

## 6. Migración técnica (OT-HF-SIG-002B)

El antiguo `estado_hash` (un hash de todos los archivos pequeños salvo meta)
no era invariable frente al inventario espacial. Se sustituye por el modelo
triple: `estado_hash` → `state_hash` (contratos de decisión), y se añaden
`package_hash` y `evidence_hash`. `case.json` migra solo técnicamente
(renombra la clave, persiste el nuevo valor y referencia `integrity.json`);
ninguna decisión, gate, restricción o geometría cambió (S10 lo verifica).