# -*- coding: utf-8 -*-
"""
Pruebas S1-S12 de la OT-HF-SIG-002 (Contratos Transversales de Ingeniería SIG v1).

S1.  Existen los nueve contratos SIG.
S2.  Autoconsistencia con hf.case.v1 (relación declarada en cada contrato).
S3.  Registro espacial gobernado válido.
S4.  Red HF conserva competencia territorial no demostrada.
S5.  Segmento 24 no demostrado.
S6.  adopted_cell null.
S7.  FAIL_ORIENTATION histórico y no apto.
S8.  GATE 1/2/3 intactos.
S9.  P1-P5 siguen PASS (con la restricción de drift de estado_hash documentada).
S10. Los inmutables conservan los hashes baseline.
S11. Cero rutas absolutas nuevas en archivos creados por la OT.
S12. Ningún motor productivo modificado.

Nota: S10 y S12 comparan contra el árbol de trabajo al inicio de la OT-HF-SIG-002
(incluye modificaciones preexistentes no atribuibles a la OT).
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sig_validators import (  # noqa: E402
    CASO,
    CONTRATOS_GIS,
    INMUTABLES_BASELINE,
    INMUTABLES_CASO,
    MOTORES_INVENTARIADOS,
    RAIZ_REPO,
    ruta_absoluta_nueva,
    validar_adopted_cell_null,
    validar_estado_red,
    validar_fail_orientation,
    validar_gates,
    validar_registro_espacial,
    validar_segmento_24,
    verificar_hashes,
)

GIS_DIR = RAIZ_REPO / "docs" / "contratos" / "gis"

DRIFT_ESPERADO = "estado_hash registrado != calculado"


def s1_contratos() -> list[str]:
    fallos = []
    for nombre in CONTRATOS_GIS:
        if not (GIS_DIR / nombre).is_file():
            fallos.append(f"contrato ausente: {nombre}")
    return fallos


def s2_consistencia_hf_case() -> list[str]:
    fallos = []
    if not (GIS_DIR / "README.md").is_file():
        fallos.append("README.md ausente en docs/contratos/gis")
    for nombre in CONTRATOS_GIS:
        texto = (GIS_DIR / nombre).read_text("utf-8", errors="replace")
        if "hf.case.v1" not in texto:
            fallos.append(f"{nombre}: no referencia hf.case.v1")
        if "iguana_pc80" not in texto:
            fallos.append(f"{nombre}: sin ejemplo iguana_pc80")
        if "Veredictos" not in texto:
            fallos.append(f"{nombre}: sin sección de veredictos")
    return fallos


def s3_registro() -> list[str]:
    ok, fallos = validar_registro_espacial()
    return [] if ok else fallos


def s4_red() -> list[str]:
    ok, fallos = validar_estado_red()
    return [] if ok else fallos


def s5_segmento() -> list[str]:
    ok, fallos = validar_segmento_24()
    return [] if ok else fallos


def s6_adopted_cell() -> list[str]:
    ok, fallos = validar_adopted_cell_null()
    return [] if ok else fallos


def s7_fail_orientation() -> list[str]:
    ok, fallos = validar_fail_orientation()
    return [] if ok else fallos


def s8_gates() -> list[str]:
    ok, fallos = validar_gates()
    return [] if ok else fallos


def _cargar_portabilidad():
    ruta = RAIZ_REPO / "02_CORE" / "portability" / "tests" / "run_portability_tests.py"
    spec = importlib.util.spec_from_file_location("run_portability_tests", ruta)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def s9_portabilidad() -> list[str]:
    fallos = []
    try:
        port = _cargar_portabilidad()
    except Exception as exc:  # pragma: no cover - defensa
        return [f"no se pudo importar run_portability_tests: {exc}"]
    for nombre, fn in (
        ("P1_estructura", port.p1_estructura),
        ("P2_integridad", port.p2_integridad),
        ("P3_clasificacion", port.p3_clasificacion),
        ("P4_decision", port.p4_decision),
        ("P5_portabilidad", port.p5_portabilidad),
    ):
        errores = fn(CASO)
        if not errores:
            continue
        if nombre == "P2_integridad":
            solo_drift = all(DRIFT_ESPERADO in e for e in errores)
            if solo_drift:
                continue
        fallos.extend(f"{nombre}: {e}" for e in errores)
    return fallos


def s10_inmutables() -> list[str]:
    fallos = []
    for grupo, lista in (("baseline", INMUTABLES_BASELINE), ("caso", INMUTABLES_CASO)):
        raiz = RAIZ_REPO if grupo == "baseline" else CASO
        ok, errs = verificar_hashes(lista, raiz=raiz)
        fallos.extend(f"{grupo}: {e}" for e in errs)
    return fallos


def s11_sin_rutas_absolutas() -> list[str]:
    fallos = []
    carpetas = [
        CASO / "spatial",
        RAIZ_REPO / "docs" / "contratos" / "gis",
        RAIZ_REPO / "02_CORE" / "sig_engineering",
    ]
    for carpeta in carpetas:
        if not carpeta.is_dir():
            fallos.append(f"carpeta ausente: {carpeta.relative_to(RAIZ_REPO)}")
            continue
        for p in sorted(carpeta.rglob("*")):
            if not p.is_file():
                continue
            texto = p.read_text("utf-8", errors="replace")
            if ruta_absoluta_nueva(texto):
                fallos.append(f"ruta absoluta en {p.relative_to(RAIZ_REPO)}")
    for nombre in CONTRATOS_GIS:
        texto = (GIS_DIR / nombre).read_text("utf-8", errors="replace")
        if ruta_absoluta_nueva(texto):
            fallos.append(f"ruta absoluta en docs/contratos/gis/{nombre}")
    return fallos


def s12_motores() -> list[str]:
    ok, errs = verificar_hashes(MOTORES_INVENTARIADOS)
    return [] if ok else errs


def run_todo() -> int:
    suite = {
        "S1_contratos_sig": s1_contratos,
        "S2_consistencia_hf_case": s2_consistencia_hf_case,
        "S3_registro_espacial": s3_registro,
        "S4_red_competencia": s4_red,
        "S5_segmento_24": s5_segmento,
        "S6_adopted_cell_null": s6_adopted_cell,
        "S7_fail_orientation": s7_fail_orientation,
        "S8_gates": s8_gates,
        "S9_portabilidad": s9_portabilidad,
        "S10_inmutables": s10_inmutables,
        "S11_cero_rutas_absolutas": s11_sin_rutas_absolutas,
        "S12_motores": s12_motores,
    }
    ok_global = True
    for nombre, fn in suite.items():
        fallos = fn()
        if fallos:
            ok_global = False
            print(f"{nombre}: FAIL")
            for f in fallos:
                print(f"   {f}")
        else:
            print(f"{nombre}: PASS")
    print("RESULTADO_S1_S12:", "PASS" if ok_global else "FAIL")
    print("NOTA: S9 permite únicamente el drift documentado de estado_hash "
          "(sección 11 de la OT-HF-SIG-002); case.json no se modifica.")
    return 0 if ok_global else 1


if __name__ == "__main__":
    sys.exit(run_todo())