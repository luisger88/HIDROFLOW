# HF-ENGINEER-001 — Dictamen de Auditoría del Estado Inicial

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1
- **Fecha UTC:** 2026-09-20
- **Rama de trabajo:** `ot-hf-003-cstate-001a`

---

## 1. Alcance

Auditoría focalizada y previa a la implementación de las correcciones C-01 a
C-04 sobre el estado inicial del repositorio, con objeto de:

1. fijar el estado de frontera (baseline) que esta OT protege;
2. identificar dependencias silenciosas del caso histórico en los
   productores de `07_TOOLBOX/hf_geo/`;
3. verificar la coherencia de identidad antes de cerrar GATE 1.

## 2. Estado de frontera capturado

| Ítem | Valor |
|---|---|
| HEAD (rama base `main`) | `5014cf653114fdec913125414fd8579a6640aadf` |
| Rama de trabajo | `ot-hf-003-cstate-001a` (creada desde el HEAD anterior) |
| Rutas modificadas/sin seguimiento en el árbol | 429 (preexistentes, ajenas a esta OT) |
| `02_CORE/config/caso_activo.json` | **ya presentaba modificación preexistente** (no tocada por esta OT) |
| `02_PROYECTOS/OT-HF-003/OT-HF-003.hfproj` | **ya presentaba modificación preexistente** (no tocada por esta OT) |

## 3. Hallazgos de dependencias silenciosas (C-01/C-02)

Se auditaron los productores de `07_TOOLBOX/hf_geo/`. Hallazgos:

1. `producir_tc.py` hardcodea `AREA = 50.6718`, `LCP_DIV = 15.6665`,
   `LCP = 15.6665`, `DH = 1662.9`, `SC = 0.10567` (líneas 19-23).
2. `producir_volumen.py` hardcodea `AREA_KM2 = 50.6718` (línea 14).
3. `producir_qp.py` hardcodea `A = 50.6718` (línea 22).
4. `producir_geomorfometria.py` hardcodea `Lcp_div_km = 15.6665`
   (línea 102) y rutas rígidas a `caso_real_001/hf_geo/temp` (línea 81).
5. `producir_lcp_div.py` apunta fijo a `caso_real_001/hf_geo/temp` (línea 103).
6. `generar_expediente.py` hardcodea `AREA = 50.6718` y `PERIMETRO = 37.195`
   (líneas 43-44).
7. `producir_cn.py` apunta fijo a
   `caso_real_001/hf_geo/geojson/cuenca.geojson` (línea 39), con rutas
   absolutas de cobertura y sin registro de hash de cuenca.
8. Los productores escriben a `datos_gobernados\` por rutas absolutas.

**Conclusión:** existe dependencia silenciosa de la geometría y corpus del caso
histórico; los productores no reciben explícitamente la cuenca reproducida ni
su `parametros.json`.

## 4. Hallazgos de identidad (GATE 1)

1. `OT-HF-003.hfproj` → `contratoCuenca`: `id = iguana_pc80`,
   `nombre = Quebrada La Iguana - PC_80`, coordenadas
   `(6.271785117145225, -75.59408755595547)`, `cota_menor_cauce_msnm = 1511.36`.
   Coinciden con D-01/D-03 ratificadas.
2. `OT-HF-003.hfproj` → `metadata.otId = OT-HF-003` (coherente).
3. `OT-HF-003.hfproj` → `estado_operativo.params.nombre_cuenca = "POST_OK"`:
   referencia operativa histórica, **no** identidad vigente.
4. `OT-HF-003.hfproj` → bloques `evidenciaValidacion.outlet`
   `(6.21698682679494, -75.5627319497491)`, `parametros`
   (`area_km2 = 0.1818`) y `cuenca` (`(6.21380474954716, -75.5693404588773)`):
   referencias divergentes residuales, **no** pertenecen al caso La Iguaná PC_80.
5. `02_CORE/config/caso_activo.json` apunta a `salida_HF-CASE-CIENPESOS`
   con `otId = null`: Cien Pesos está fuera de esta consolidación (D-02).

## 5. Dictamen

La auditoría confirma que el estado inicial es protegible y que las
correcciones C-01 a C-04 deben implementarse sin recalcular variables reales
y sin alterar los artefactos históricos.

Resultado global: **PROCEDE** — apertura y ejecución del incremento E1 con las
prohibiciones que el propio expediente declara.