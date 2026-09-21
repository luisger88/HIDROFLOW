# Dictamen final OT-HF-PORT-002 — Contrato portable del caso HidroFlow

- **Caso:** `iguana_pc80` (Quebrada La Iguaná - PC_80, OT-HF-003)
- **OT emisora:** OT-HF-PORT-002 — Contrato Portable del Caso HidroFlow
- **Rama de ejecución:** `ot-hf-003-cstate-001b-portabilidad-caso`
- **Commit base:** `5b279635247f0238333cb6d1b8ae2a843ba36465`
  (`ot-hf-003-cstate-001a`)
- **Fecha:** 2026-09-20

## Veredicto

> **B. PASS CON RESTRICCIONES**

El paquete portable es válido, integro y reproducible para abrir el caso desde
otra raíz local. Las restricciones no bloquean la apertura estructural, pero
obligan a registrar explícitamente lo siguiente antes de emitir veredicto PASS
pleno de HF-SIG-ENGINEERING-001.

## Resumen de lo entregado

| Componente | Estado |
|---|---|
| Paquete `HF_CASE/iguana_pc80` + plantilla `HF_CASE/_template` | Creado |
| Contratos HF v1 (`case.json`, `manifest.json`, `decision-log.jsonl`, `spatial-decision.json`, `gates.jsonl`, checksums) | Creados y validados |
| Resolvedor portable aislado (`02_CORE/portability/resolver.py`) | Creado |
| Esquemas/validadores (`02_CORE/portability/validators.py`) | Creados |
| Pruebas P1-P5 (`02_CORE/portability/tests/run_portability_tests.py`) | PASS |
| Documento de contrato `docs/contratos/hf-case-v1.md` | Creado |
| Inventario de rutas heredadas `docs/contratos/hf-case-v1-rutas-heredadas.md` | Creado |
| Inmutables (5) | Hashes conservados |

## Resultado de pruebas P1-P5

```
P1_estructura:      PASS   contratos obligatorios presentes
P2_integridad:      PASS   hashes coinciden; estado_hash consistente
P3_clasificacion:   PASS   clases A/B/C/D válidas, ids únicos
P4_decision:        PASS   GATE 2 pendiente; adopted_cell null; segmento 24 no adoptado
P5_portabilidad:    PASS   copia temporal reabierta/validada y eliminada
RESULTADO_P1_P5:    PASS
```

- P5 copió a carpeta TEMPORAL externa, reabrió desde esa nueva raíz con el
  resolvedor, validó contratos y hashes, y eliminó la copia. Sin ejecutar
  WhiteboxTools. Copia temporal confirmada ausente tras la prueba.
- `estado_hash` calculado = registrado = `d753dd56c09e2014ed450d0442979f01e7bba4568ca9bf1e312b474f8868009d`.

## Hashes de inmutables (conservados, sin cambios)

| Archivo | SHA-256 |
|---|---|
| `02_CORE/config/caso_activo.json` | `76af14f62c3aff8f4656f0c6dd51a4c37d9a310fdb169718c763dfb2f06ee522` |
| `02_PROYECTOS/OT-HF-003/OT-HF-003.hfproj` | `87f3943bc3b49dd4ececc48e04c8ffb874abd7676e65a8f74238a7bba43b7841` |
| `07_TOOLBOX/hf_geo/config/contrato_snap_D03.json` | `e84331acf4700ead49fb87845da86d45a28d805ed402e154e9a946cd6f9cf803` |
| `07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json` | `5f6d84888327f824758033fe3abfd05d647864664a9206dbb105c9bf914ed6db` |
| `00_ADMIN/bitacora/HF-CASE-STATE-001A/HF-CASE-STATE-001A_REGISTRO_HISTORICOS.json` | `3bdd2be3f4c0d9318baa1424a074d3ee6c9a65219cf8acbee52ea386b57f0e76` |

## Rutas heredadas

Cero rutas absolutas nuevas. Activos iniciales y referencias se conectan por
ruta relativa, id y hash (ver `hf-case-v1-rutas-heredadas.md`).

## Restricciones registradas (PASS CON RESTRICCIONES)

1. **Decisión profesional de GATE 2 pendiente.** `decision_profesional` = null
   en GATE 2; la celda (1028, 946) es `PROPUESTA, NO ADOPTADA`. No emitir
   veredicto pleno mientras no exista acta profesional PF-02.
2. **Evidencia histórica defectuosa preservada por autoridad.** 
   `verificacion_D03.png` (QA `FAIL_ORIENTATION`, `NOT_SUITABLE`) se conserva
   como evidencia de clase A en su ubicación original; no se corrige.
3. **Reproducción física fuera de alcance.** La copia local validada (P5) y la
   verificación de hashes entregan portabilidad estructural; la reproducción
   hidrogeomática completa es certificación posterior (fuera de esta OT).
4. **MDT por referencia (no copiado).** GLO-30 se resuelve por hash
   `1b12e9db…`; el lector debe tenerlo disponible para la apertura operativa.

## Criterio para abrir HF-SIG-ENGINEERING-001

Se puede abrir la ingeniería cuando: el paquete valide P1-P5, los inmutables
externos conserven los hashes registrados, y las restricciones 1-4 estén
documentadas. La apertura consensúa PF-02 (decisión profesional GATE 2) y no
autoriza por sí misma la adopción de la celda.

## Componentes no modificados

express-server, hf_geo_bridge, hf_hydro_cli, wbt_runner, motores hidrológicos,
productores, aplicación React, base de conocimiento y expediente gobernado.

## Sello

Dictamen emitido por el agente de ingeniería (OT-HF-PORT-002) sobre la rama
`ot-hf-003-cstate-001b-portabilidad-caso`, fecha 2026-09-20.