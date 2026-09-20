# HF-CASE-STATE-001A — Plan de Ejecución

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1 — Correcciones C-01 a C-04 y GATE 1 — Identidad
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a`
- **Rama base:** `main` (`5014cf653114fdec913125414fd8579a6640aadf`)

---

## 1. Objetivo

Ejecutar controladamente el primer incremento verificable de la consolidación
del estado hidrológico canónico de la Quebrada La Iguaná — PC_80.

## 2. Alcance del incremento E1

1. Proteger el estado inicial del repositorio.
2. Crear una rama de trabajo aislada. ✅ `ot-hf-003-cstate-001a`
3. Registrar formalmente el plan y las decisiones ratificadas.
4. Implementar las correcciones C-01 a C-04.
5. Ejecutar y cerrar GATE 1 — IDENTIDAD.
6. Preparar (sin ejecutar) GATE 2 — PUNTO D-03.
7. Emitir dictamen binario de preparación para GATE 2.

## 3. Correcciones planificadas

### C-01 — Re-parametrización de productores
- Auditar constantes hardcodeadas (`AREA`, `LCP_DIV`, `DH`, `SC` y equivalentes)
  en `07_TOOLBOX/hf_geo/`.
- Los productores deben leer la geomorfología desde un artefacto de entrada
  explícito (p. ej. `parametros.json` de la cuenca reproducida).
- Sin recalcular variables; validación estricta de campos; fallo explícito si
  faltan campos; sin fallback silencioso a La Iguaná histórica; compatibilidad
  conservada; pruebas unitarias/estáticas.

### C-02 — Parametrización de `producir_cn.py`
- Cuenca explícita de entrada; sin ruta rígida a `caso_real_001/...`;
  validación de existencia y CRS; registro de fuente, hash de cuenca, fuentes
  de cobertura y HSG; CN como candidato sujeto a decisión; restricciones de
  vigencia de cobertura; rutas configurables.

### C-03 — Contrato de snap D-03
- Contrato gobernado del futuro snap: punto original, CRS, MDT, umbral,
  tolerancia, criterios PASS/FAIL, prohibición de outlet automático.
- Resolución de la ambigüedad 30 m / 200 m / 128–136 m mediante regla
  gobernada documentada.

### C-04 — Productor del expediente gobernado
- Eslabón mínimo determinista para producir un expediente gobernado
  normalizado (cuerpo + metadatos, hash SHA-256, identidad, outlet, Scp/Sc,
  decisiones, restricciones, Q-5/D-11, Racional como contraste).
- Preservar el hash histórico `cd98512f…`.
- Prueba determinista con fixture; no sobrescribir `HF_EXPEDIENTE_001.json`.

## 4. Gates

- **GATE 1 — Identidad:** verifica id, nombre, otId, punto D-03, no POST_OK,
  no Cien Pesos, divergencias clasificadas, no mutaciones al estado.
  Resultado posible: PASS o FAIL.
- **GATE 2 — Punto D-03:** se prepara (comando, rutas, MDT, umbral, contrato,
  artefactos, PASS/FAIL, rollback, checklist) **sin ejecutar**.

## 5. Validaciones permitidas en E1

- Formato, sintaxis, imports, configuración.
- Pruebas unitarias de las correcciones (fixtures sintéticos).
- Verificación estática de ausencia de constantes del caso histórico.
- Determinismo del productor C-04 con fixture.
- Git diff focalizado de archivos de la OT.

Prohibido: pipelines GIS pesados, cálculos hidrológicos reales, mutar
artefactos históricos, modificar `caso_activo.json` u `OT-HF-003.hfproj`.

## 6. Commits focalizados previstos

1. `docs(case-state): registra plan y decisiones de consolidacion`
2. `refactor(governance): parametriza productores hidrologicos`
3. `feat(case-state): define contrato de snap y productor gobernado`
4. `docs(case-state): cierra gate identidad`

El push quedará sujeto a la política real del repositorio (se documenta el
comando propuesto si procede, sin ejecutarlo de forma automática).

## 7. Criterio binario de aceptación

Ver checklist del §14 de la instrucción OT-HF-003-CSTATE-001A (se audita al
cierre del incremento en el dictamen final).