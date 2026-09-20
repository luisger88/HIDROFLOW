# HF-ENGINEER-001 — Decisión de Apertura

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1 — Correcciones C-01 a C-04 y GATE 1 — Identidad
- **Fecha UTC:** 2026-09-20
- **Rama base:** `main`
- **Rama de trabajo:** `ot-hf-003-cstate-001a`
- **Estado:** ABIERTA

---

## 1. Objeto

Ejecutar el primer incremento verificable de la consolidación del estado
hidrológico canónico de la Quebrada La Iguaná — PC_80 (`OT-HF-003`): proteger
el estado inicial, aislar el trabajo en rama propia, registrar decisiones
ratificadas, implementar las correcciones gobernantes C-01 a C-04, cerrar
GATE 1 — Identidad y dejar GATE 2 — Punto D-03 preparado pero sin ejecutar.

## 2. Decisiones de apertura

1. Se opera sobre `main` en `HEAD 5014cf653114fdec913125414fd8579a6640aadf`,
   con `429` rutas modificadas o sin seguimiento preexistentes ajenas a esta OT.
2. Se crea rama aislada `ot-hf-003-cstate-001a` desde dicho `HEAD`; **no se
   descarta ningún cambio preexistente** (prohibido `git reset`, `git clean`,
   `git checkout` sobre archivos ajenos).
3. Esta OT **solo** versiona los archivos que crea o modifica de forma
   explícita. Ningún cambio ajeno entra al commit.
4. Se ratifican las decisiones profesionales D-01, D-02, D-03, D-11, D-12 y
   D-13 del expediente HF-CASE-STATE-001A.
5. GATE 1 — Identidad se ejecuta y documenta con evidencia trazable.
6. GATE 2 — Punto D-03 se prepara (comando, rutas, contrato, criterios) sin
   reproducción alguna.

## 3. Prohibiciones operativas de este incremento

- No ejecutar la delimitación de la cuenca.
- No reproducir todavía D-03.
- No recalcular geometría ni hidrología reales.
- No modificar `02_CORE/config/caso_activo.json`.
- No modificar `OT-HF-003.hfproj` con valores canónicos.
- No generar el expediente canónico sobre datos reales.
- No abrir HF-CONVERSE-001A.
- No ejecutar pipelines GIS pesados (WhiteboxTools, snap, watershed, CN real).
- No adoptar D-04 a D-10.
- No forzar push sin verificar la política del repositorio.

## 4. Fuera de alcance declarado

Hidráulica, R3, Manning, secciones, calado, velocidad, Froude, HEC-RAS,
HF-SOFTWARE-001-S1, GEO-FORENSIC-001, R2C, M01_fill, investigación de
WhiteboxTools, PRE-R2A/B, VS1, HF-ESTUDIO-HIDROLOGIA-001, saneamiento general,
inventarios generales y HF-CONVERSE-001A.

## 5. Firmas

- **Agente:** Build
- **Modelo:** Big Pickle
- **Idioma:** Español de Colombia