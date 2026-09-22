# -*- coding: utf-8 -*-
"""
Pruebas C1-C20 de HF-SPATIAL-COMPARE V1 (OT-HF-SPATIAL-COMPARE-001).

C1.  Catálogo        — seis perfiles válidos, todos con ejecutor.
C2.  Vocabulario     — resultados emitibles/prohibidos y clasificaciones.
C3.  Invariantes     — state_change=false, professional_decision=null, firmas.
C4.  No-adopción     — perfiles bloquean adoptivos; interpretaciones correctas.
C5.  Determinismo    — re-ejecución produce el mismo run_id salida canónica.
C6.  Gate CRS        — CRS no gobernado bloquea métricas.
C7.  Licencia        — licencia UNKNOWN bloquea métricas (piloto territorial).
C8.  Clase           — clase visual/evidencia bloquea métricas.
C9.  Fuentes        — la comparación no modifica los archivos fuente.
C10. JSON canónico   — serialización determinista sin timestamp ni rutas.
C11. Firmas         — run_id sensible al material; timestamp no lo altera.
C12. Corredores     — 4 radios 30/60/90/136 m con sensibilidad.
C13. Evidencia      — persist_run escribe runs/, evidence/ y auditoría.
C14. Ledger         — append serial único, rechazo de run_id duplicado.
C15. Catálogo case  — profiles/*.json se escriben y parsean.
C16. Punto-red      — perfil punto-red con invariantes y distancias.
C17. Territorial    — auditoría SIN_GOBERNANZA → INSUFFICIENT_EVIDENCE, 0 métricas.
C18. Baselines      — re-ejecuta Q1-Q16, P1-P5 y S1-S12/I1-I8 (PASS).
C19. Sin absolutas  — runs, ledger y auditorías no contienen rutas absolutas.
C20. Integridad     — tras los pilotos state_hash invariante y package/evidence
                      cambian; checksums verifican.

Extras E1-E6: slug, percentil R-7, hausdorff, cobertura, roundtrip CRS, CLI.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
CORE = REPO / "02_CORE"
sys.path.insert(0, str(CORE))
sys.path.insert(0, str(CORE / "portability"))

CASO_REL = "HF_CASE/iguana_pc80"
CASO = REPO / CASO_REL

BASE_STATE = "5f9bf470eee69079c5d05d695013d8132dcd5d1592c12f508e07e70713e8853d"
BASE_PACKAGE = "a122fb19c4249e64f257f286e01ed16b7e844ed1de965a55df23c2f4f0aa04db"
BASE_EVIDENCE = "86373befa426621fb14b85bbcef822cf916a7e5b2d29a097d3d9c397345804d5"

COMPARA = "spatial/comparisons"
LEDGER = CASO / COMPARA / "comparison-ledger.jsonl"
RUNS = CASO / COMPARA / "runs"
EVID = CASO / COMPARA / "evidence"
PROFILES = CASO / COMPARA / "profiles"

from spatial_compare import result as R  # noqa: E402
from spatial_compare.corridors import analisis_multibuffer  # noqa: E402
from spatial_compare.evidence import (  # noqa: E402
    append_ledger,
    leer_ledger,
    persistir_run,
    slug_question,
    escribir_catalogo_perfiles,
)
from spatial_compare.governance import cumplimiento_metricas  # noqa: E402
from spatial_compare.metrics import (  # noqa: E402
    cobertura_comun,
    hausdorff,
    percentil,
)
from spatial_compare.models import (  # noqa: E402
    ALTA,
    BAJA,
    CANDIDATE_WITH_EVIDENCE,
    CLASE_C_REFERENCIAL_VISUAL,
    COMPARISON_CRS,
    COMPARE_POINT_TO_NETWORKS_V1,
    COMPARE_SEGMENT_CORRESPONDENCE_V1,
    CORREDOR_RADIOS_M,
    GATE_3,
    INSUFFICIENT_EVIDENCE,
    MEDIA,
    PF02_ADOPTION,
    RESULTADOS_EMITIBLES,
    RESULTADOS_PROHIBIDOS,
    TERRITORIAL_COMPETENCE,
    ComparisonResult,
)
from spatial_compare.profiles import IMPL_POR_PERFIL, PERFILES  # noqa: E402
from spatial_compare.registry import listar, obtener, validar_registry  # noqa: E402
from spatial_compare.runner import (  # noqa: E402
    correr_comparacion,
    repo_root,
)
from spatial_compare.transforms import (  # noqa: E402
    DATUM_POR_EPSG,
    transformar_lineas,
)
from resolver import leer_integridad, verificar_hashes  # noqa: E402

_INTERNO_IDS = (
    "INTERNO_RED_VS_SEGMENTO_24",
    "red_hf_gate02_d03",
    "segmento_candidato_d03",
)

_cache_interno: ComparisonResult | None = None


def _correr_interno() -> ComparisonResult:
    global _cache_interno
    if _cache_interno is None:
        _cache_interno = correr_comparacion(
            COMPARE_SEGMENT_CORRESPONDENCE_V1, CASO_REL, _INTERNO_IDS[0],
            _INTERNO_IDS[1], _INTERNO_IDS[2], repo=repo_root(),
            clasificacion="COMPUTATIONAL_INTERNAL_COMPARISON",
            seleccion_target={"tipo": "segmento_elegido", "segmento": 24,
                              "ventana": "interseccion_con_envelope_de_la_fuente"},
        )
    return _cache_interno


def _fallo(msg: str) -> str:
    return f"FAIL: {msg}"


# ----------------------------------------------------------------------- C1-C5

def c1_catalogo() -> list[str]:
    errores = validar_registry()
    return [_fallo(e) for e in errores] + ([] if len(listar()) == 6 else [_fallo("esperaba 6 perfiles")])


def c2_vocabulario() -> list[str]:
    fallos: list[str] = []
    for r in RESULTADOS_EMITIBLES:
        if r in RESULTADOS_PROHIBIDOS:
            fallos.append(_fallo(f"resultado emitible y prohibido a la vez: {r}"))
    return fallos


def c3_invariantes() -> list[str]:
    res = _correr_interno()
    err = R.validar_invariantes(res)
    fallos = [_fallo(e) for e in err]
    if res.state_change:
        fallos.append(_fallo("state_change debe ser false"))
    if res.professional_decision is not None:
        fallos.append(_fallo("professional_decision debe ser null"))
    if len(res.comparison_run_id) != 16:
        fallos.append(_fallo(f"run_id no es 16 hex: {res.comparison_run_id!r}"))
    if res.output_hash != re.fullmatch(r"[0-9a-f]{64}", res.output_hash).group(0):
        fallos.append(_fallo(f"output_hash no es 64 hex: {res.output_hash!r}"))
    return fallos


def c4_no_adopcion() -> list[str]:
    fallos: list[str] = []
    for perfil in listar():
        bloqueados = set(perfil.get("consumidores_bloqueados", []))
        for clave in (PF02_ADOPTION, GATE_3, TERRITORIAL_COMPETENCE):
            if clave not in bloqueados:
                fallos.append(_fallo(f"{perfil['id']} no bloquea a {clave}"))
    res = _correr_interno()
    if res.result in RESULTADOS_PROHIBIDOS:
        fallos.append(_fallo(f"resultado prohibido emitido: {res.result}"))
    costo = " ".join(res.allowed_interpretations)
    for prohibido in ("ADOPTED", "TERRITORIALLY"):
        if prohibido in costo:
            fallos.append(_fallo(f"interpretación prohibida en allowed: {prohibido}"))
    return fallos


def c5_determinismo() -> list[str]:
    a = correr_comparacion(
        COMPARE_SEGMENT_CORRESPONDENCE_V1, CASO_REL, _INTERNO_IDS[0],
        _INTERNO_IDS[1], _INTERNO_IDS[2], repo=repo_root(),
        clasificacion="COMPUTATIONAL_INTERNAL_COMPARISON",
        seleccion_target={"tipo": "segmento_elegido", "segmento": 24,
                          "ventana": "interseccion_con_envelope_de_la_fuente"},
    )
    b = correr_comparacion(
        COMPARE_SEGMENT_CORRESPONDENCE_V1, CASO_REL, _INTERNO_IDS[0],
        _INTERNO_IDS[1], _INTERNO_IDS[2], repo=repo_root(),
        clasificacion="COMPUTATIONAL_INTERNAL_COMPARISON",
        seleccion_target={"tipo": "segmento_elegido", "segmento": 24,
                          "ventana": "interseccion_con_envelope_de_la_fuente"},
    )
    fallos: list[str] = []
    if a.comparison_run_id != b.comparison_run_id:
        fallos.append(_fallo("run_id distinto entre re-ejecuciones"))
    if R.serializar_sin_firma(a) != R.serializar_sin_firma(b):
        fallos.append(_fallo("salida canónica distinta entre re-ejecuciones"))
    return fallos


# ----------------------------------------------------------------------- C6-C9

def c6_gate_crs() -> list[str]:
    entrada = {
        "clase": "B_COMPUTACIONAL", "estado": "REFERENCIADO", "licencia": "uso interno",
        "autoridad": "X", "crs": "EPSG:9999", "datum": "WGS84",
        "axis_order": "x_easting_y_northing",
    }
    bloqueos = cumplimiento_metricas(entrada)
    return ([] if any("no gobernado" in b for b in bloqueos)
            else [_fallo(f"CRS no gobernado no bloqueado: {bloqueos}")])


def c7_licencia_unknown() -> list[str]:
    fallos: list[str] = []
    entrada = {
        "clase": "B_COMPUTACIONAL", "estado": "REFERENCIADO", "licencia": "UNKNOWN",
        "autoridad": "X", "crs": "EPSG:32618", "datum": "WGS84",
        "axis_order": "x_easting_y_northing",
    }
    if not any("licencia UNKNOWN" in b for b in cumplimiento_metricas(entrada)):
        fallos.append(_fallo("licencia UNKNOWN no bloquea métricas"))
    res = correr_comparacion(
        "COMPARE_VECTOR_NETWORKS_V1", CASO_REL, "EXTERNO_STREAMS_URBAN_1000_AUDIT",
        "streams_urban_1000_medellin", repo=repo_root(),
        clasificacion="TERRITORIAL_CONTRAST_AUDIT",
    )
    if res.result != INSUFFICIENT_EVIDENCE:
        fallos.append(_fallo(f"territorial esperaba INSUFFICIENT_EVIDENCE: {res.result}"))
    if res.metrics:
        fallos.append(_fallo("fuente no apta produjo métricas"))
    bloqueos = res.governance.get("bloqueos_source", [])
    if not any("licencia UNKNOWN" in b for b in bloqueos):
        fallos.append(_fallo(f"bloqueos sin licencia UNKNOWN: {bloqueos}"))
    if res.governance.get("fuente_apta_para_metricas"):
        fallos.append(_fallo("fuente SIN_GOBERNANZA marcada apta"))
    return fallos


def c8_clase_no_metrica() -> list[str]:
    entrada = {
        "clase": CLASE_C_REFERENCIAL_VISUAL, "estado": "REFERENCIAL_VISUAL",
        "licencia": "uso institucional", "autoridad": "AMVA", "crs": "EPSG:3116",
        "datum": "MAGNA-SIRGAS", "axis_order": "x_easting_y_northing",
    }
    bloqueos = cumplimiento_metricas(entrada)
    return ([] if any("clase no apta" in b for b in bloqueos)
            else [_fallo(f"clase visual no bloqueada: {bloqueos}")])


def c9_fuentes_no_modificadas() -> list[str]:
    from resolver import sha256_archivo

    red = REPO / "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/red_gate02_D03.geojson"
    seg = REPO / "07_TOOLBOX/salida_OT-HF-003_CANONICO/gate02_d03/segmento_candidato_D03.geojson"
    antes = {str(red): sha256_archivo(red), str(seg): sha256_archivo(seg)}
    res = _correr_interno()
    fallos: list[str] = []
    for ruta, digest in antes.items():
        if sha256_archivo(Path(ruta)) != digest:
            fallos.append(_fallo(f"fuente modificada por la comparación: {ruta}"))
    tr = res.transformation_record
    if tr.origen != "EPSG:4326" or tr.destino != COMPARISON_CRS:
        fallos.append(_fallo(f"transformación CRS inesperada: {tr.origen}->{tr.destino}"))
    if tr.motor != "pyproj" or not tr.always_xy:
        fallos.append(_fallo("motor/always_xy de transformación incorrectos"))
    return fallos


# ------------------------------------------------------------------- C10-C15

def c10_json_canonico() -> list[str]:
    a = {"b": 1, "a": [2, 1]}
    b = {"a": [2, 1], "b": 1}
    fallos: list[str] = []
    if R.canonical_json(a) != R.canonical_json(b):
        fallos.append(_fallo("JSON canónico dependiente del orden de claves"))
    ser = R.serializar_sin_firma(_correr_interno())
    if not ser.endswith("\n"):
        fallos.append(_fallo("serialización sin salto final"))
    if '"timestamp"' in ser:
        fallos.append(_fallo("serialización sin firma conserva timestamp"))
    dict_ = json.loads(ser)
    if "comparison_run_id" not in dict_:
        fallos.append(_fallo("serialización sin firma sin run_id"))
    if "output_hash" in dict_:
        fallos.append(_fallo("serialización sin firma incluye output_hash (se deriva del material+run_id)"))
    return fallos


def c11_firmas() -> list[str]:
    res = _correr_interno()
    fallos: list[str] = []
    original_id = res.comparison_run_id
    original_out = res.output_hash
    res.timestamp = "2000-01-01T00:00:00Z"
    if R.calcular_comparison_run_id(res) != original_id:
        fallos.append(_fallo("el timestamp altera el material estable"))
    doc = json.loads(R.canonical_json(res.to_dict()))
    doc["metrics"][0]["valor"] = 0.0
    copia = ComparisonResult.from_dict(doc)
    copia.comparison_run_id = ""
    copia.output_hash = ""
    nuevo_id = R.calcular_comparison_run_id(copia)
    if nuevo_id == original_id:
        fallos.append(_fallo("cambiar una métrica no altera el run_id"))
    if R.calcular_output_hash(copia) == original_out:
        fallos.append(_fallo("cambiar una métrica no altera el output_hash"))
    return fallos


def c12_corredores() -> list[str]:
    from shapely.geometry import LineString

    a = [LineString([(0, 0), (1000, 0)]), LineString([(0, 10), (1000, 10)])]
    b = [LineString([(0, 0.5), (1000, 0.5)])]
    conv = analisis_multibuffer(a, b, CORREDOR_RADIOS_M)
    fallos: list[str] = []
    if [p["radio_m"] for p in conv["por_radio"]] != [30.0, 60.0, 90.0, 136.0]:
        fallos.append(_fallo(f"radios inesperados: {conv['por_radio']}"))
    for entry in conv["por_radio"]:
        for campo in ("pct_fuente_dentro", "pct_target_dentro", "iou_corredores", "radio_m"):
            if campo not in entry:
                fallos.append(_fallo(f"corredor sin campo {campo}"))
    if not conv["sensibilidad"]:
        fallos.append(_fallo("sin observación de sensibilidad"))
    return fallos


def c13_evidencia() -> list[str]:
    res = _correr_interno()
    tmp = Path(tempfile.mkdtemp(prefix="sc_test_evidencia_"))
    try:
        rutas = persistir_run(tmp, res)
        fallos: list[str] = []
        if len(rutas) != 3:
            fallos.append(_fallo(f"esperaba 3 rutas persistidas: {rutas}"))
        run_file = tmp / rutas[0]
        if not run_file.is_file():
            return fallos + [_fallo(f"run ausente: {rutas[0]}")]
        doc = json.loads(run_file.read_text(encoding="utf-8"))
        err = R.validar_shape_dict(doc)
        if err:
            fallos.extend(_fallo(e) for e in err)
        audit = tmp / rutas[2]
        if res.question_id not in audit.read_text(encoding="utf-8"):
            fallos.append(_fallo("auditoría sin question_id"))
        return fallos
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def c14_ledger() -> list[str]:
    res = _correr_interno()
    tmp = Path(tempfile.mkdtemp(prefix="sc_test_ledger_"))
    try:
        fallos: list[str] = []
        n1 = append_ledger(tmp, res)
        if n1 != 1:
            fallos.append(_fallo(f"primera línea ledger={n1}, esperaba 1"))
        try:
            append_ledger(tmp, res)
            fallos.append(_fallo("no rechazó duplicado de comparison_run_id"))
        except RuntimeError as exc:
            if "duplicado" not in str(exc):
                fallos.append(_fallo("excepción de duplicado inesperada"))
        lineas = leer_ledger(tmp)
        if len(lineas) != 1:
            fallos.append(_fallo("ledger con más de una línea tras duplicado rechazado"))
        if lineas[0]["state_change"] is not False:
            fallos.append(_fallo("ledger state_change no false"))
        if lineas[0]["evidencia"] != res.comparison_run_id:
            fallos.append(_fallo("ledger evidencia no coincide con run_id"))
        return fallos
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def c15_catalogo_archivo() -> list[str]:
    tmp = Path(tempfile.mkdtemp(prefix="sc_test_catalogo_"))
    try:
        rutas = escribir_catalogo_perfiles(tmp, [PERFILES[i] for i in PERFILES])
        fallos: list[str] = []
        if len(rutas) != len(PERFILES):
            fallos.append(_fallo("catálogo con número de archivos incorrecto"))
        for ruta in rutas:
            p = tmp / ruta
            if not p.is_file():
                fallos.append(_fallo(f"catalogo ausente: {ruta}"))
                continue
            doc = json.loads(p.read_text(encoding="utf-8"))
            if doc.get("id") != Path(ruta).stem:
                fallos.append(_fallo(f"id incoherente en {ruta}"))
        return fallos
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


# ------------------------------------------------------------------- C16-C20

def c16_punto_red() -> list[str]:
    res = correr_comparacion(
        COMPARE_POINT_TO_NETWORKS_V1, CASO_REL, "DIAG_PROJECT_LOCATION_VS_RED",
        "project-location", "red_hf_gate02_d03", repo=repo_root(),
        clasificacion="DIAGNOSTIC_COMPARISON",
    )
    fallos: list[str] = []
    err = R.validar_invariantes(res)
    fallos.extend(_fallo(e) for e in err)
    if res.result not in RESULTADOS_EMITIBLES:
        fallos.append(_fallo(f"resultado fuera del vocabulario: {res.result}"))
    distancia = next((m for m in res.metrics if m.id == "distancia_punto_red_min"), None)
    if distancia is None:
        fallos.append(_fallo("sin métrica distancia_punto_red_min"))
    return fallos


def c17_territorial() -> list[str]:
    res = correr_comparacion(
        "COMPARE_VECTOR_NETWORKS_V1", CASO_REL, "EXTERNO_STREAMS_URBAN_1000_AUDIT",
        "streams_urban_1000_medellin", repo=repo_root(),
        clasificacion="TERRITORIAL_CONTRAST_AUDIT",
    )
    fallos: list[str] = []
    err = R.validar_invariantes(res)
    fallos.extend(_fallo(e) for e in err)
    if res.result != INSUFFICIENT_EVIDENCE:
        fallos.append(_fallo(f"esperaba INSUFFICIENT_EVIDENCE: {res.result}"))
    if res.metrics:
        fallos.append(_fallo("0 métricas esperadas en auditoría territorial"))
    if res.confidence != BAJA:
        fallos.append(_fallo(f"confianza esperada BAJA: {res.confidence}"))
    if not any("CRS ausente" in b for b in res.governance.get("bloqueos_source", [])):
        fallos.append(_fallo("auditoría sin bloqueo de CRS ausente"))
    return fallos


def _correr_baseline(nombre: str, cmd: list[str]) -> list[str]:
    env = dict(os.environ)
    env["PYTHONPATH"] = os.pathsep.join([str(CORE), env.get("PYTHONPATH", "")])
    try:
        pr = subprocess.run(
            cmd, cwd=str(REPO), env=env, capture_output=True, text=True, timeout=1200
        )
    except subprocess.TimeoutExpired:
        return [_fallo(f"{nombre} agotó tiempo")]
    if pr.returncode != 0:
        cola = (pr.stdout or "")[-300:] + "|" + (pr.stderr or "")[-300:]
        return [_fallo(f"{nombre} FAIL:\n{cola}")]
    return []


def c18_baselines() -> list[str]:
    fallos: list[str] = []
    fallos += _correr_baseline(
        "P1-P5",
        [sys.executable, "-X", "utf8", "02_CORE/portability/tests/run_portability_tests.py", CASO_REL],
    )
    fallos += _correr_baseline(
        "S1-S12/I1-I8",
        [sys.executable, "-X", "utf8", "02_CORE/sig_engineering/tests/run_sig_engineering_tests.py"],
    )
    fallos += _correr_baseline(
        "Q1-Q16",
        [sys.executable, "-X", "utf8", "02_CORE/geo_qa/tests/run_geo_qa_tests.py"],
    )
    return fallos


def _colectar_strings(obj) -> list[str]:
    out: list[str] = []
    if isinstance(obj, str):
        out.append(obj)
    elif isinstance(obj, dict):
        for v in obj.values():
            out.extend(_colectar_strings(v))
    elif isinstance(obj, list):
        for v in obj:
            out.extend(_colectar_strings(v))
    return out


def c19_sin_rutas_absolutas() -> list[str]:
    fallos: list[str] = []
    patron = re.compile(r"^[A-Za-z]:[\\/]", re.M)
    base = str(REPO)
    archivos = [LEDGER]
    archivos += sorted(RUNS.glob("*.json")) if RUNS.is_dir() else []
    archivos += sorted(EVID.glob("*.md")) if EVID.is_dir() else []
    archivos += sorted(EVID.glob("*.json")) if EVID.is_dir() else []
    for archivo in archivos:
        if not archivo.is_file():
            continue
        texto = archivo.read_text(encoding="utf-8")
        if patron.search(texto):
            fallos.append(_fallo(f"ruta absoluta (unidad) en {archivo.name}"))
        if base in texto:
            fallos.append(_fallo(f"base del repo absoluta en {archivo.name}"))
        for cadena in _colectar_strings(json.loads(texto) if archivo.suffix == ".json" else {"md": texto}):
            if patron.search(cadena):
                fallos.append(_fallo(f"ruta con unidad en valor: {cadena[:80]!r}"))
    return fallos


def c20_integridad() -> list[str]:
    fallos: list[str] = []
    integridad = leer_integridad(CASO)
    hashes = integridad.get("hashes", {})
    if hashes.get("state_hash") != BASE_STATE:
        fallos.append(_fallo("state_hash cambió tras los pilotos (debe ser invariante)"))
    if hashes.get("package_hash") == BASE_PACKAGE:
        fallos.append(_fallo("package_hash no cambió tras los pilotos"))
    if hashes.get("evidence_hash") == BASE_EVIDENCE:
        fallos.append(_fallo("evidence_hash no incluye spatial/comparisons"))
    vh = verificar_hashes(CASO)
    if not vh["ok"]:
        fallos.extend(_fallo(d) for d in vh["diferencias"])
    if not (CASO / "manifest.json").is_file() or not (CASO / "checksums.sha256").is_file():
        fallos.append(_fallo("manifest/checksums ausentes tras regeneración"))
    return fallos


# ----------------------------------------------------------------------- extras

def e1_slug() -> list[str]:
    if slug_question("A b-c / d") != "A_b_c___d":
        return [_fallo(f"slug inesperado: {slug_question('A b-c / d')!r}")]
    return []


def e2_percentil() -> list[str]:
    if percentil(list(range(10)), 25.0) != 2.25:
        return [_fallo("percentil R-7 25% != 2.25")]
    if percentil(list(range(10)), 50.0) != 4.5:
        return [_fallo("percentil R-7 50% != 4.5")]
    return []


def e3_hausdorff() -> list[str]:
    from shapely.geometry import LineString

    a = [LineString([(0, 0), (100, 0)])]
    b = [LineString([(0, 50), (100, 50)])]
    hd = hausdorff(a, b)
    fallos: list[str] = []
    if hd["hausdorff_max_m"] != 50.0:
        fallos.append(_fallo(f"hausdorff esperaba 50.0: {hd}"))
    if hd["hausdorff_dirigido_A_B_m"] != 50.0 or hd["hausdorff_dirigido_B_A_m"] != 50.0:
        fallos.append(_fallo(f"hausdorff dirigido inesperado: {hd}"))
    return fallos


def e4_cobertura() -> list[str]:
    from shapely.geometry import LineString

    a = [LineString([(0, 0), (100, 0)])]
    b = [LineString([(1000, 1000), (1100, 1000)])]
    c = cobertura_comun(a, b)
    fallos: list[str] = []
    if c["iou_envolventes"] != 0.0:
        fallos.append(_fallo(f"iou esperaba 0: {c['iou_envolventes']}"))
    return fallos


def e5_roundtrip_crs() -> list[str]:
    from shapely.geometry import LineString

    g = LineString([(-75.5, 6.25), (-75.0, 6.5)])
    ida, tr = transformar_lineas([g], "EPSG:4326", "EPSG:32618")
    vuelta, _ = transformar_lineas(ida, "EPSG:32618", "EPSG:4326")
    fallos: list[str] = []
    if tr.motor != "pyproj" or DATUM_POR_EPSG["32618"] != "WGS84":
        fallos.append(_fallo("motor/datum de transformación incorrectos"))
    x_in, y_in = g.coords[0]
    x_fin, y_fin = vuelta[0].coords[0]
    if abs(x_in - x_fin) > 1e-3 or abs(y_in - y_fin) > 1e-3:
        fallos.append(_fallo(f"roundtrip 4326->32618->4326 no cierra: {x_in,y_in} vs {x_fin,y_fin}"))
    return fallos


def e6_cli() -> list[str]:
    env = dict(os.environ)
    env["PYTHONPATH"] = str(CORE)
    pr = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_compare.cli", "profiles"],
        cwd=str(REPO), env=env, capture_output=True, text=True,
    )
    fallos: list[str] = []
    if pr.returncode != 0 or "COMPARE_SEGMENT_CORRESPONDENCE_V1" not in pr.stdout:
        fallos.append(_fallo(f"CLI profiles falló: {pr.stderr[-200:]}"))
    pr_bad = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_compare.cli", "run", "PERFIL_INEXISTENTE",
         CASO_REL, "q", "s"],
        cwd=str(REPO), env=env, capture_output=True, text=True,
    )
    if pr_bad.returncode == 0:
        fallos.append(_fallo("CLI aceptó perfil inexistente"))
    return fallos


# --------------------------------------------------------------------- ejecución

def run_todo() -> int:
    pruebas = {
        "C1_catalogo": c1_catalogo,
        "C2_vocabulario": c2_vocabulario,
        "C3_invariantes": c3_invariantes,
        "C4_no_adopcion": c4_no_adopcion,
        "C5_determinismo": c5_determinismo,
        "C6_gate_crs": c6_gate_crs,
        "C7_licencia_unknown": c7_licencia_unknown,
        "C8_clase_no_metrica": c8_clase_no_metrica,
        "C9_fuentes_no_modificadas": c9_fuentes_no_modificadas,
        "C10_json_canonico": c10_json_canonico,
        "C11_firmas": c11_firmas,
        "C12_corredores": c12_corredores,
        "C13_evidencia": c13_evidencia,
        "C14_ledger": c14_ledger,
        "C15_catalogo_archivo": c15_catalogo_archivo,
        "C16_punto_red": c16_punto_red,
        "C17_territorial": c17_territorial,
        "C18_baselines": c18_baselines,
        "C19_sin_rutas_absolutas": c19_sin_rutas_absolutas,
        "C20_integridad": c20_integridad,
        "E1_slug": e1_slug,
        "E2_percentil": e2_percentil,
        "E3_hausdorff": e3_hausdorff,
        "E4_cobertura": e4_cobertura,
        "E5_roundtrip_crs": e5_roundtrip_crs,
        "E6_cli": e6_cli,
    }
    ok_global = True
    contadores = {"ok": 0, "fail": 0}
    for nombre, fn in pruebas.items():
        fallos = fn()
        if fallos:
            ok_global = False
            contadores["fail"] += 1
            print(f"{nombre}: FAIL")
            for f in fallos:
                print(f"   {f}")
        else:
            contadores["ok"] += 1
            print(f"{nombre}: PASS")
    total = contadores["ok"] + contadores["fail"]
    print(f"RESULTADO_C1_C20: {'PASS' if ok_global else 'FAIL'} ({contadores['ok']}/{total})")
    return 0 if ok_global else 1


if __name__ == "__main__":
    sys.exit(run_todo())