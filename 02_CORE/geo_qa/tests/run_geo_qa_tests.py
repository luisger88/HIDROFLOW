# -*- coding: utf-8 -*-
"""
run_geo_qa_tests — Q1-Q16 del plan de validación de HF-GEO-QA V1.

Criterios (OT-HF-GEO-QA-001):

Q01  Registry: seis perfiles con estructura de contrato válida.
Q02  CRS ausente en el registro espacial => FAIL CRITICAL.
Q03  Orden de ejes (always_xy) incorrecto => FAIL ERROR.
Q04  Affine espejada/rotada (north-up roto) => FAIL CRITICAL.
Q05  Norte invertido sin verificación => FAIL_ORIENTATION CRITICAL bloqueando
     SNAP_DECISION, PF02_ADOPTION, GATE_3, CANONICAL_WATERSHED y
     CARTOGRAPHIC_REPORT; permite HISTORICAL_AUDIT, DIAGNOSTIC, COMPARISON,
     RUPTURE_EVIDENCE.
Q06  Los seis perfiles responden con resultado del vocabulario válido.
Q07  Red interna nunca declara competencia territorial; resultado máximo
     INTERNALLY_VALIDATED; red desconectada (modo unica) = ERROR.
Q08  Celda propuesta (no adoptada) bloquea CANONICAL_WATERSHED.
Q09  adopted_cell null bloquea HF-HYDRO (HYDRO_CONSUMPTION).
Q10  Determinismo: mismas entradas => mismo qa_run_id/output_hash.
Q11  Copia portátil del caso => firmas idénticas (Q11-C formal).
Q12  Serialización determinista (JSON canónico idéntico entre ejecuciones).
Q13  Firewall de checks: los checks puros NO importan portability/resolver/
     deps/generador.
Q14  volver-no absolutas: sin rutas absolutas literales en el módulo.
Q15  Coordenadas/affine no finitas o fuera de rango => FAIL.
Q16  Módulo completo sin rutas absolutas y sin hardcode del drive.

Ejecución:  python tests/run_geo_qa_tests.py
"""

from __future__ import annotations

import json
import re
import shutil
import sys
import tempfile
from pathlib import Path

_D = Path(__file__).resolve()
TESTS_DIR = _D.parent
GEOQA_DIR = _D.parents[1]
CORE_DIR = _D.parents[2]
REPO = _D.parents[3]

if str(CORE_DIR) not in sys.path:
    sys.path.insert(0, str(CORE_DIR))

from geo_qa import __version__  # noqa: E402
from geo_qa import registry as Reg  # noqa: E402
from geo_qa import result as R  # noqa: E402
from geo_qa.checks import IMPL_POR_CHECK  # noqa: E402
from geo_qa.models import (  # noqa: E402
    CANONICAL_WATERSHED,
    CARTOGRAPHIC_REPORT,
    COMPARISON,
    CRITICAL,
    DIAGNOSTIC,
    ERROR,
    FAIL,
    FAIL_ORIENTATION,
    GATE_3,
    HISTORICAL_AUDIT,
    HYDRO_CONSUMPTION,
    INTERNALLY_VALIDATED,
    INTERNALLY_VALIDATED_WITH_RESTRICTIONS,
    PASS,
    PF02_ADOPTION,
    RESULTADOS_PERMITIDOS,
    RESTRICCION_TERRITORIAL,
    RUPTURE_EVIDENCE,
    SNAP_DECISION,
    SEVERIDADES_VALIDAS,
)
from geo_qa.runner import correr_perfil, repo_root  # noqa: E402

CASO = REPO / "HF_CASE/iguana_pc80"

RESULTADOS: list[tuple[str, bool, str]] = []


def registrar(nombre: str, ok: bool, detalle: str = "") -> None:
    RESULTADOS.append((nombre, ok, detalle))


def q01() -> bool:
    errores = Reg.validar_registry()
    ids = {p["id"] for p in Reg.listar()}
    ok = not errores and ids == set(Reg.PERFIL_IDS_ESPERADOS_SET)
    registrar("Q01_profes_registry", ok, "; ".join(errores) if errores else str(sorted(ids)))
    return ok


def q02() -> bool:
    f = IMPL_POR_CHECK[("spatial_reference", "crs_presente")]
    r = f({"registro": {}})
    ok = r.resultado == FAIL and r.severidad == CRITICAL
    registrar("Q02_crs_ausente", ok, f"resultado={r.resultado} severidad={r.severidad}")
    return ok


def q03() -> bool:
    f = IMPL_POR_CHECK[("spatial_reference", "always_xy_consistente")]
    r = f({"registro": {"crs": "EPSG:32618", "axis_order": "lat_lon"}})
    ok = r.resultado == FAIL and r.severidad == ERROR
    registrar("Q03_axis_invertido", ok, f"resultado={r.resultado} severidad={r.severidad}")
    return ok


def q04() -> bool:
    f_a = IMPL_POR_CHECK[("raster_georef", "affine_a_positivo_oriente_este")]
    r_a = f_a({"affine": (-30.0, 0.0, 405900.0, 0.0, -30.0, 724110.0)})
    ok_a = r_a.resultado == FAIL and r_a.severidad == CRITICAL
    ok_a2 = False
    f_e = IMPL_POR_CHECK[("raster_georef", "affine_e_negativo_north_up")]
    r_e = f_e({"affine": (30.0, 0.0, 405900.0, 0.0, 30.0, 724110.0)})
    ok_a2 = r_e.resultado == FAIL and r_e.severidad == CRITICAL
    ok_b = False
    f_r = IMPL_POR_CHECK[("raster_georef", "rotacion_ausente")]
    r_b = f_r({"affine": (30.0, 1.0, 405900.0, 0.5, -30.0, 724110.0)})
    ok_b = r_b.resultado == FAIL and r_b.severidad == CRITICAL
    ok = ok_a and ok_a2 and ok_b
    registrar(
        "Q04_affine_inconsistente",
        ok,
        f"a<0:{ok_a} e>0:{ok_a2} rot:{ok_b}",
    )
    return ok


def q05() -> bool:
    f = IMPL_POR_CHECK[("cartographic_evidence", "orientacion_norte")]
    r = f(
        {
            "decl": {
                "north_arrow_present": True,
                "north_arrow_verified": True,
                "north_arrow_direction": "south",
                "map_north_direction": "north",
            }
        }
    )
    bloqueados = {SNAP_DECISION, PF02_ADOPTION, GATE_3, CANONICAL_WATERSHED, CARTOGRAPHIC_REPORT}
    permitidos = {HISTORICAL_AUDIT, DIAGNOSTIC, COMPARISON, RUPTURE_EVIDENCE}
    ok = (
        r.resultado == FAIL_ORIENTATION
        and r.severidad == CRITICAL
        and set(r.consumers_blocked) == bloqueados
        and set(r.consumers_allowed) == permitidos
    )
    registrar("Q05_norte_invertido", ok, f"bloqueados={sorted(r.consumers_blocked)}")
    return ok


def q06() -> bool:
    ok = True
    detalle = []
    for perfil in Reg.PERFIL_IDS_ESPERADOS:
        try:
            qa = correr_perfil(perfil, CASO, "red_hf_gate02_d03" if perfil == "vector_geometry" else "project-location" if perfil == "spatial_reference" else "caso_iguana_pc80")
            valido = qa.resultado in RESULTADOS_PERMITIDOS and qa.severidad in SEVERIDADES_VALIDAS
            inv = R.validar_invariantes(qa)
            if not valido or inv:
                ok = False
                detalle.append(f"{perfil}: invalido o invariantes={inv}")
            else:
                detalle.append(f"{perfil}:{qa.resultado}")
        except Exception as ex:  # noqa: BLE001
            ok = False
            detalle.append(f"{perfil}: EXC {type(ex).__name__}: {ex}")
    registrar("Q06_seis_pofiles", ok, " | ".join(detalle))
    return ok


def q07() -> bool:
    qa = correr_perfil("network_internal", CASO, "red_hf_gate02_d03")
    ok_resultado = qa.resultado in (INTERNALLY_VALIDATED, INTERNALLY_VALIDATED_WITH_RESTRICTIONS)
    ok_restriccion = RESTRICCION_TERRITORIAL in qa.restricciones
    f = IMPL_POR_CHECK[("network_internal", "continuidad_topologica_declarada")]
    fc = {
        "type": "FeatureCollection",
        "features": [
            {"type": "Feature", "properties": {}, "geometry": {"type": "LineString", "coordinates": [[0.0, 0.0], [0.001, 0.0]]}},
            {"type": "Feature", "properties": {}, "geometry": {"type": "LineString", "coordinates": [[1.0, 1.0], [1.001, 1.0]]}},
        ],
    }
    r = f({"fc": fc, "modo": "unica"})
    ok_desconectada = r.resultado == FAIL and r.severidad == ERROR
    ok = ok_resultado and ok_restriccion and ok_desconectada
    registrar(
        "Q07_red_competencia",
        ok,
        f"resultado={qa.resultado} restriccion={ok_restriccion} desconectada={ok_desconectada}",
    )
    return ok


def q08() -> bool:
    qa = correr_perfil("gate02_diagnostic", CASO, "caso_iguana_pc80")
    ok = CANONICAL_WATERSHED in qa.consumidores_bloqueados
    registrar("Q08_proposed_cell_bloquea", ok, f"bloqueados={sorted(qa.consumidores_bloqueados)}")
    return ok


def q09() -> bool:
    decision = json.loads((CASO / "decision/spatial-decision.json").read_text(encoding="utf-8"))
    ok_null = decision.get("adopted_cell") is None
    qa = correr_perfil("gate02_diagnostic", CASO, "caso_iguana_pc80")
    ok = ok_null and HYDRO_CONSUMPTION in qa.consumidores_bloqueados
    registrar("Q09_adopted_null", ok, f"adopted_cell=None:{ok_null}")
    return ok


def q10() -> bool:
    qa1 = correr_perfil("network_internal", CASO, "red_hf_gate02_d03")
    qa2 = correr_perfil("network_internal", CASO, "red_hf_gate02_d03")
    ok = qa1.qa_run_id == qa2.qa_run_id and qa1.output_hash == qa2.output_hash
    registrar("Q10_determinismo", ok, f"run={qa1.qa_run_id} out={qa1.output_hash[:12]}...")
    return ok


def q11() -> bool:
    tmp = Path(tempfile.mkdtemp(prefix="hf_geo_qa_"))
    try:
        destino = tmp / "iguana_pc80"
        shutil.copytree(CASO, destino)
        qa_orig = correr_perfil("network_internal", CASO, "red_hf_gate02_d03")
        qa_copia = correr_perfil("network_internal", destino, "red_hf_gate02_d03")
        ok = qa_orig.qa_run_id == qa_copia.qa_run_id and qa_orig.output_hash == qa_copia.output_hash
        registrar("Q11_copia_portable", ok, f"run_orig={qa_orig.qa_run_id} run_copia={qa_copia.qa_run_id}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    return ok


def q12() -> bool:
    qa1 = correr_perfil("gate02_diagnostic", CASO, "caso_iguana_pc80")
    qa2 = correr_perfil("gate02_diagnostic", CASO, "caso_iguana_pc80")
    s1 = R.serializar_qa_sin_firma(qa1)
    s2 = R.serializar_qa_sin_firma(qa2)
    ok = s1 == s2 and s1.endswith("\n")
    registrar("Q12_serializacion_determinista", ok, f"len1={len(s1)} len2={len(s2)}")
    return ok


def q13() -> bool:
    prohibidos = ("portability", "resolver", "generar_integridad", "deps")
    ok = True
    detalle = []
    for py in (GEOQA_DIR / "checks").rglob("*.py"):
        texto = py.read_text(encoding="utf-8")
        for num, linea in enumerate(texto.splitlines(), 1):
            if linea.strip().startswith(("import ", "from ")):
                for tok in prohibidos:
                    if tok in linea:
                        ok = False
                        detalle.append(f"{py.name}:{num} {linea.strip()}")
    registrar("Q13_firewall_checks", ok, "; ".join(detalle) if detalle else "limpio")
    return ok


def q14() -> bool:
    patron = re.compile(r"[A-Za-z]" + ":" + r"[\\/]")
    malos = []
    for py in GEOQA_DIR.rglob("*.py"):
        if "tests" in py.parts:
            continue
        if patron.search(py.read_text(encoding="utf-8")):
            malos.append(str(py.relative_to(REPO)))
    ok = not malos
    registrar("Q14_sin_absolutas_modulo", ok, "; ".join(malos) if malos else "limpio")
    return ok


def q15() -> bool:
    f = IMPL_POR_CHECK[("spatial_reference", "coordenadas_finitas")]
    r1 = f({"registro": {"crs": "EPSG:4326"}, "coords": [(float("nan"), 0.0)]})
    ok1 = r1.resultado == FAIL and r1.severidad == CRITICAL
    r2 = f({"registro": {"crs": "EPSG:4326"}, "coords": [(200.0, 90.5)]})
    ok2 = r2.resultado == FAIL and r2.severidad == ERROR
    f_a = IMPL_POR_CHECK[("raster_georef", "affine_a_positivo_oriente_este")]
    r3 = f_a({"affine": (0.0, 0.0, 405900.0, 0.0, -30.0, 724110.0)})
    ok3 = r3.resultado == FAIL and r3.severidad == CRITICAL
    ok = ok1 and ok2 and ok3
    registrar("Q15_rangos_finitos", ok, f"nan:{ok1} fuera:{ok2} a<=0:{ok3}")
    return ok


def q16() -> bool:
    patron = re.compile(r"[A-Za-z]" + ":" + r"[\\/]")
    malos = []
    for py in GEOQA_DIR.rglob("*.py"):
        if patron.search(py.read_text(encoding="utf-8")):
            malos.append(str(py.relative_to(REPO)))
    ok = not malos
    registrar("Q16_zero_absolutas", ok, "; ".join(malos) if malos else "limpio")
    return ok


def main() -> int:
    q01()
    q02()
    q03()
    q04()
    q05()
    q06()
    q07()
    q08()
    q09()
    q10()
    q11()
    q12()
    q13()
    q14()
    q15()
    q16()
    print(f"geo_qa v{__version__}  caso = {CASO}")
    fallos = 0
    for nombre, ok, detalle in RESULTADOS:
        print(f"{nombre}: {'PASS' if ok else 'FAIL':<4} {detalle}")
        if not ok:
            fallos += 1
    print(f"RESULTADO_Q1_Q16: { 'PASS' if fallos == 0 else f'FAIL ({fallos} criterios rotos)' }")
    return 1 if fallos else 0


if __name__ == "__main__":
    raise SystemExit(main())