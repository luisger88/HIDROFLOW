# -*- coding: utf-8 -*-
"""
Pruebas S1-S12 e I1-I8 de la OT-HF-SIG-002B (integridad triple de estado,
paquete y evidencia) sobre los contratos SIG v1.

S1.  Existen los nueve contratos SIG.
S2.  Autoconsistencia con hf.case.v1 (relación declarada en cada contrato).
S3.  Registro espacial gobernado válido.
S4.  Red HF conserva competencia territorial no demostrada.
S5.  Segmento 24 no demostrado.
S6.  adopted_cell null.
S7.  FAIL_ORIENTATION histórico y no apto.
S8.  GATE 1/2/3 intactos.
S9.  P1-P5 siguen PASS sin excepciones (S9 estricto; sin drift tolerado).
S10. Los inmutables conservan los hashes baseline y case.json migra solo
     técnicamente.
S11. Cero rutas absolutas nuevas en archivos creados por la OT (incluye
     integrity.json y restrictions.json).
S12. Ningún motor productivo modificado.

I1.  Agregar evidencia nueva no cambia state_hash (sí package_hash).
I2.  Modificar evidencia cambia evidence_hash (no state_hash).
I3.  Agregar activo cambia package_hash (no state_hash ni evidence_hash).
I4.  Cambiar gates en copia temporal cambia state_hash (solo en copia).
I5.  Una copia temporal preserva los tres hashes.
I6.  Sin ciclos ni auto-referencias (integrity.json y manifest crudo excluidos).
I7.  Serialización y cálculo deterministas.
I8.  Rutas relativas en los nuevos contratos de integridad.

Nota: S10 y S12 comparan contra el árbol de trabajo al inicio de la
OT-HF-SIG-002 (incluye modificaciones preexistentes no atribuibles a la OT).
"""

from __future__ import annotations

import importlib.util
import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sig_validators import (  # noqa: E402
    ARCHIVOS_DECISION,
    CASO,
    CONTRATOS_GIS,
    INMUTABLES_BASELINE,
    MOTORES_INVENTARIADOS,
    RAIZ_REPO,
    ruta_absoluta_nueva,
    validar_adopted_cell_null,
    validar_estado_red,
    validar_fail_orientation,
    validar_gates,
    validar_migracion_case_tecnica,
    validar_registro_espacial,
    validar_restrictions,
    validar_segmento_24,
    verificar_hashes,
)

GIS_DIR = RAIZ_REPO / "docs" / "contratos" / "gis"


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


def _cargar_resolver():
    """Carga resolver.py de portability (con el modelo triple de integridad)."""
    dir_port = RAIZ_REPO / "02_CORE" / "portability"
    sys.path.insert(0, str(dir_port))
    res_spec = importlib.util.spec_from_file_location(
        "resolver_modelo", dir_port / "resolver.py"
    )
    resolver = importlib.util.module_from_spec(res_spec)
    res_spec.loader.exec_module(resolver)
    return resolver


def s9_portabilidad() -> list[str]:
    """S9 estricto: P1-P5 PASS sin excepciones y sin drift tolerado."""
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
        fallos.extend(f"{nombre}: {e}" for e in errores)
    return fallos


def s10_inmutables() -> list[str]:
    fallos = []
    ok, errs = verificar_hashes(INMUTABLES_BASELINE)
    fallos.extend(f"baseline: {e}" for e in errs)
    ok, errs = verificar_hashes(ARCHIVOS_DECISION, raiz=CASO)
    fallos.extend(f"decision: {e}" for e in errs)
    ok, errs = validar_migracion_case_tecnica()
    if not ok:
        fallos.extend(f"migracion_case: {e}" for e in errs)
    ok, errs = validar_restrictions()
    if not ok:
        fallos.extend(f"restrictions: {e}" for e in errs)
    return fallos


def s11_sin_rutas_absolutas() -> list[str]:
    fallos = []
    carpetas = [
        CASO / "spatial",
        CASO / "decision",
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
    for rel in ("integrity.json", "decision/restrictions.json"):
        texto = (CASO / rel).read_text("utf-8", errors="replace")
        if ruta_absoluta_nueva(texto):
            fallos.append(f"ruta absoluta en HF_CASE/iguana_pc80/{rel}")
    return fallos


def s12_motores() -> list[str]:
    ok, errs = verificar_hashes(MOTORES_INVENTARIADOS)
    return [] if ok else errs


def _copia_temporal() -> tuple[Path, Path]:
    tmp = Path(tempfile.mkdtemp(prefix="hfsig-", dir=None))
    copia = tmp / "iguana_pc80"
    shutil.copytree(CASO, copia)
    return tmp, copia


def i1_evidencia_no_cambia_estado() -> list[str]:
    """I1 - Agregar evidencia nueva no cambia state_hash (sí package_hash)."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        st0 = resolver.state_hash_paquete(copia)
        pkg0 = resolver.package_hash_paquete(copia)
        (copia / "evidence" / "extra-integridad-test.json").write_text(
            '{"prueba":"I1"}\n', encoding="utf-8"
        )
        if resolver.state_hash_paquete(copia) != st0:
            return ["state_hash cambió al agregar evidencia"]
        if resolver.package_hash_paquete(copia) == pkg0:
            return ["package_hash no cambió al agregar evidencia"]
        return []
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i2_evidencia_cambia_evidence() -> list[str]:
    """I2 - Modificar evidencia cambia evidence_hash (no state_hash)."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        ev0 = resolver.evidence_hash_paquete(copia)
        st0 = resolver.state_hash_paquete(copia)
        ruta = copia / "evidence" / "hashes.json"
        doc = json.loads(ruta.read_text("utf-8"))
        doc["prueba_i2"] = "cambio de evidencia"
        ruta.write_text(
            json.dumps(doc, sort_keys=True, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        if resolver.evidence_hash_paquete(copia) == ev0:
            return ["evidence_hash no cambió al modificar evidencia"]
        if resolver.state_hash_paquete(copia) != st0:
            return ["state_hash cambió al modificar evidencia"]
        return []
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i3_activo_cambia_paquete() -> list[str]:
    """I3 - Agregar activo cambia package_hash (no state ni evidence)."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        st0 = resolver.state_hash_paquete(copia)
        ev0 = resolver.evidence_hash_paquete(copia)
        pkg0 = resolver.package_hash_paquete(copia)
        (copia / "geometry" / "extra-activo-test.json").write_text(
            '{"prueba":"I3"}\n', encoding="utf-8"
        )
        if resolver.package_hash_paquete(copia) == pkg0:
            return ["package_hash no cambió al agregar activo"]
        if resolver.state_hash_paquete(copia) != st0:
            return ["state_hash cambió al agregar activo"]
        if resolver.evidence_hash_paquete(copia) != ev0:
            return ["evidence_hash cambió al agregar activo"]
        return []
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i4_gates_cambian_estado() -> list[str]:
    """I4 - Cambiar gates en copia temporal cambia state_hash."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        st0 = resolver.state_hash_paquete(copia)
        ruta = copia / "state" / "gates.jsonl"
        registros = [
            json.loads(x) for x in ruta.read_text("utf-8").splitlines() if x.strip()
        ]
        for reg in registros:
            if reg.get("gate_id") == "GATE_2":
                reg["veredicto"] = "PASS"  # solo en copia temporal
        ruta.write_text(
            "\n".join(json.dumps(r, ensure_ascii=False) for r in registros) + "\n",
            encoding="utf-8",
        )
        if resolver.state_hash_paquete(copia) == st0:
            return ["state_hash no cambió al cambiar GATE 2"]
        return []
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i5_copia_preserva_hashes() -> list[str]:
    """I5 - Una copia temporal preserva los tres hashes."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        original = (
            resolver.state_hash_paquete(CASO),
            resolver.package_hash_paquete(CASO),
            resolver.evidence_hash_paquete(CASO),
        )
        copia_h = (
            resolver.state_hash_paquete(copia),
            resolver.package_hash_paquete(copia),
            resolver.evidence_hash_paquete(copia),
        )
        fallos = []
        for nombre, o, c in zip(
            ("state", "package", "evidence"), original, copia_h
        ):
            if o != c:
                fallos.append(f"{nombre}_hash no preservado en copia: {o} vs {c}")
        return fallos
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i6_sin_ciclos() -> list[str]:
    """I6 - Sin ciclos: integrity.json y el manifest crudo no se hashean."""
    resolver = _cargar_resolver()
    tmp, copia = _copia_temporal()
    try:
        pkg0 = resolver.package_hash_paquete(copia)
        ruta = copia / "integrity.json"
        doc = json.loads(ruta.read_text("utf-8"))
        doc["hashes"]["package_hash"] = "a" * 64
        ruta.write_text(
            json.dumps(doc, sort_keys=True, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        if resolver.package_hash_paquete(copia) != pkg0:
            return ["package_hash depende de integrity.json (ciclo)"]
        material = resolver._archivos_paquete(copia)
        if any(
            p in material
            for p in ("case.json", "integrity.json", "manifest.json", "checksums.sha256")
        ):
            return ["el material de package_hash incluye meta"]
        return []
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def i7_determinista() -> list[str]:
    """I7 - Serialización y cálculo deterministas."""
    resolver = _cargar_resolver()
    a = resolver.generar_integridad(CASO)
    b = resolver.generar_integridad(CASO)
    if a != b:
        return ["generar_integridad no es determinista"]
    if resolver.package_hash_paquete(CASO) != resolver.package_hash_paquete(CASO):
        return ["package_hash no determinista"]
    return []


def i8_rutas_relativas() -> list[str]:
    """I8 - Rutas relativas en los nuevos contratos de integridad."""
    resolver = _cargar_resolver()
    try:
        integ = resolver.leer_integridad(CASO)
    except Exception as exc:  # pragma: no cover - defensa
        return [f"leer_integridad: {exc}"]
    fallos = []
    cobertura = integ.get("cobertura", {})
    for grupo in ("state", "evidence"):
        for rel in cobertura.get(grupo, []):
            if ruta_absoluta_nueva(rel):
                fallos.append(f"ruta absoluta en cobertura.{grupo}: {rel}")
    for rel in cobertura.get("paquete_excluidos_meta", []):
        if ruta_absoluta_nueva(rel):
            fallos.append(f"ruta absoluta en paquete_excluidos_meta: {rel}")
    ok, errs = validar_restrictions()
    if not ok:
        fallos.extend(errs)
    return fallos


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
        "I1_evidencia_no_cambia_estado": i1_evidencia_no_cambia_estado,
        "I2_evidencia_cambia_evidence": i2_evidencia_cambia_evidence,
        "I3_activo_cambia_paquete": i3_activo_cambia_paquete,
        "I4_gates_cambian_estado": i4_gates_cambian_estado,
        "I5_copia_preserva_hashes": i5_copia_preserva_hashes,
        "I6_sin_ciclos": i6_sin_ciclos,
        "I7_determinista": i7_determinista,
        "I8_rutas_relativas": i8_rutas_relativas,
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
    print("RESULTADO_S1_S12_I1_I8:", "PASS" if ok_global else "FAIL")
    print("S9 es estricto: P1-P5 deben pasar sin excepciones y con los tres "
          "hashes de integridad coherentes (OT-HF-SIG-002B).")
    return 0 if ok_global else 1


if __name__ == "__main__":
    sys.exit(run_todo())