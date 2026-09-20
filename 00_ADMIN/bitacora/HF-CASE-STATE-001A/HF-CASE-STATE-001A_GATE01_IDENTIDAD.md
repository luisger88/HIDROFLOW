# HF-CASE-STATE-001A — GATE 1 — IDENTIDAD

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a`
- **Base:** `main` @ `5014cf653114fdec913125414fd8579a6640aadf`

---

## 1. Checks de identidad

| # | Check | Evidencia | Resultado |
|---|---|---|---|
| 1 | `id = iguana_pc80` | `OT-HF-003.hfproj` → `contratoCuenca.cuenca.id`; ContratoCuenca.json del pipeline | **PASS** |
| 2 | `nombre = Quebrada La Iguaná - PC_80` | `OT-HF-003.hfproj` → `contratoCuenca.cuenca.nombre` | **PASS** |
| 3 | `otId = OT-HF-003` | `OT-HF-003.hfproj` → `metadata.otId` | **PASS** |
| 4 | Punto D-03 coincide con el catálogo ratificado | lat `6.271785117145225`, lon `-75.59408755595547`, cota `1511.36` = D-03 (HF-CASE-STATE-001A) | **PASS** |
| 5 | `POST_OK` no es identidad vigente | `estado_operativo.params.nombre_cuenca = "POST_OK"` clasificado como referencia operativa histórica, no de identidad | **PASS** |
| 6 | Cien Pesos no pertenece al caso | `caso_activo.json` → `out = salida_HF-CASE-CIENPESOS`, `otId = null`; D-02 excluye Cien Pesos | **PASS** |
| 7 | Referencias divergentes quedan clasificadas | `evidenciaValidacion.outlet`, `parametros` (0.1818 km²), `cuenca` (inferior) y `POST_OK` clasificadas en HF-CASE-STATE-001A_DECISIONES_RATIFICADAS.md | **PASS** |
| 8 | No se modificó `caso_activo.json` | No se tocó en esta OT. Hash al inicio `76AF14F6…` (se re-verifica al cierre del incremento) | **PASS** |
| 9 | No se modificó el estado del caso | No se ejecutó ningún productor ni cálculo real; `caso_activo.json` y `OT-HF-003.hfproj` intactos por esta OT | **PASS** |
| 10 | No se adoptaron D-04 a D-10 | No incorporadas | **PASS** |
| 11 | No se generó expediente canónico | El productor C-04 solo se probó con fixture sintético; no se generó expediente sobre el caso | **PASS** |
| 12 | No se abrió HF-CONVERSE | No abierta | **PASS** |

## 2. Resultado

## GATE 1 — RESULTADO: **PASS**

La identidad canónica del caso es `iguana_pc80` / `Quebrada La Iguaná - PC_80`
/ `OT-HF-003`, con el punto D-03
`(6.271785117145225, -75.59408755595547, 1511.36 msnm)` coincidente con el
catálogo ratificado. Las referencias divergentes quedan clasificadas sin
afectar la identidad.

## 3. Consecuencia

- ✅ Procede preparar (sin ejecutar) GATE 2 — Punto D-03.
- ✅ Proceden los commits focalizados del incremento.
- Se mantienen las prohibiciones del §1 y §4 de la instrucción.

---
Firma: Agente Build (Big Pickle).