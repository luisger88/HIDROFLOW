# -*- coding: utf-8 -*-
"""
Pruebas R1-R20 y A1-A12 de HF-SPATIAL-SOURCE V1 (OT-HF-SPATIAL-SOURCE-001).

R1.  Contrato        — identidad del assessment (schema, contrato, OT, vocabulario).
R2.  Lector          — GeoPackageSource abre la capa, cuenta features y atributos.
R3.  capa_h1         — determinista entre aperturas y sensible al contenido.
R4.  Estadísticas    — conteo, nulas, tipos geométricos y extremos.
R5.  CRS             — formalización externa EPSG:9377 y roundtrip D-03.
R6.  Cobertura       — métricas de ventana dentro del vocabulario y rango.
R7.  Metadatos       — geometry_type_name y dimensiones z/m.
R8.  Proveniencia    — procedencia declarada, formatada para la auditoría.
R9.  Licenciamiento  — license_status LICENSE_UNKNOWN (hecho, no inventado).
R10. QA              — 3 perfiles con resumen/quorum correctos.
R11. Máquina         — fixture limpio: CONDITIONALLY_APT_FOR_COMPARISON.
R12. Determinismo    — re-ejecución produce el mismo assessment_id/output_hash.
R13. Restricciones   — licencia, autoridad y contraste reflejados.
R14. Resolución      — interpretaciones permitidas y resultado máximo emitible.
R15. Registro        — entrada_assessed con 26 campos + assessment_id.
R16. Persistencia    — documento, ledger, registro y run post-assessment.
R17. Integridad      — regeneración serial y P2 (validar_integridad).
R18. Run             — contrato de comparación, INSUFFICIENT_EVIDENCE/BAJA.
R19. Sin absolutas   — artefactos nuevos sin rutas absolutas.
R20. Histórico       — la entrada streams_urban_1000_medellin no se toca.

A1.  Vacío           — capa sin features -> READABLE FAIL -> NOT_APT.
A2.  Nulas           — geometrías NULL -> GEOMETRIES_VALID FAIL -> NOT_APT.
A3.  CRS ilegible    — srs sin definición -> CRS_VERIFIED FAIL -> NOT_APT.
A4.  Fuera de window — extensión lejana -> COBERTURA FAIL -> NOT_APT.
A5.  Duplicados      — geometrías idénticas -> duplicados_geometricos CONDICIONAL.
A6.  Autocruces      — línea que se cruza -> recalificado CONDICIONAL (no bloquea).
A7.  Estabilidad     — assessment_id invariante tras registrar (idempotencia).
A8.  Firmas          — output_hash 64 hex y distinto del assessment_id.
A9.  Invariantes     — mutación de aptitud detectada por validar_invariantes.
A10. Registro seguro — id duplicado y campos faltantes lanzan error.
A11. Ledger único    — segunda corrida no duplica el run ni el ledger.
A12. CLI             — evaluar/registrar devuelven código 0.
"""

from __future__ import annotations

import json
import math
import re
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path

import fiona  # noqa: E402
from shapely.geometry import LineString  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
CORE = REPO / "02_CORE"
sys.path.insert(0, str(CORE))
sys.path.insert(0, str(CORE / "portability"))

CASO_REL = "HF_CASE/iguana_pc80"
BASE_X, BASE_Y = 4713077.666, 2251730.497
RADIO = 1000.0

SRC_REL = "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg"

from spatial_source import evidence as EVID  # noqa: E402
from spatial_source import registry as REG  # noqa: E402
from spatial_source.assessment import correr_assessment  # noqa: E402
from spatial_source.geopackage import GeoPackageSource  # noqa: E402
from spatial_source.models import (  # noqa: E402
    APTITUD_CONDITIONALLY_APT,
    APTITUD_NOT_APT,
    LICENSE_STATUS_UNKNOWN,
    QUESTION_POST_ASSESSMENT,
    SOURCE_ID,
    SOURCE_ID_ASESADO,
    SOURCE_LAYER,
    CONTRACT_VERSION,
    SCHEMA as SSCHEMA,
)
from spatial_source.result import (  # noqa: E402
    calcular_output_hash,
    validar_invariantes,
)


# ------------------------------------------------------------------ fixtures

def _capa_variante(ruta_gpkg: Path, variante: str) -> None:
    """Escribe la capa sintética 'Channel Network' según la variante."""
    schema = {"geometry": "MultiLineString",
              "properties": {"SegmentID": "int", "Order": "int", "Length": "float"}}
    with fiona.open(str(ruta_gpkg), "w", driver="GPKG", layer=SOURCE_LAYER,
                    schema=schema, crs={"init": "EPSG:9377"}) as dst:
        if variante in ("clean", "dup", "selfcross"):
            geom_dicts = []
            if variante == "dup":
                ang = 0.0
                r = 400.0
                p = (BASE_X + r * math.cos(ang), BASE_Y + r * math.sin(ang))
                coords = [[(p[0] - 1, p[1]), (p[0] + 1, p[1] + 1)]]
                geom_dicts = [coords, list(coords)]
            for i, coords in enumerate(geom_dicts):
                dst.write({"geometry": {"type": "MultiLineString", "coordinates": coords},
                           "properties": {"SegmentID": i + 1, "Order": 1,
                                          "Length": round(float(sum(
                                              LineString(part).length for part in coords)), 3)}})
            if variante != "dup":
                for i in range(40):
                    ang = i * 2.0 * math.pi / 40
                    r = 300 + 12.0 * i
                    cx = BASE_X + r * math.cos(ang)
                    cy = BASE_Y + r * math.sin(ang)
                    if variante == "selfcross" and i == 5:
                        coords = [[(cx - 6, cy), (cx + 6, cy)],
                                  [(cx, cy - 6), (cx, cy + 6)]]
                    else:
                        coords = [[(cx - 1, cy), (cx + 1, cy + 1)]]
                    dst.write({"geometry": {"type": "MultiLineString", "coordinates": coords},
                               "properties": {"SegmentID": i + 1, "Order": (i % 5) + 1,
                                              "Length": round(float(LineString(coords[0]).length), 3)}})
        elif variante == "empty":
            pass
        elif variante == "nullgeom":
            for i in range(5):
                if i in (2, 4):
                    dst.write({"geometry": None,
                               "properties": {"SegmentID": i + 1, "Order": 1, "Length": 1.0}})
                    continue
                cx = BASE_X + i * 50
                cy = BASE_Y + i * 50
                dst.write({"geometry": {"type": "MultiLineString", "coordinates": [[(cx, cy), (cx + 1, cy + 1)]]},
                           "properties": {"SegmentID": i + 1, "Order": 1, "Length": 1.414}})
        elif variante in ("far", "undefined_crs"):
            for i in range(40):
                ang = i * 2.0 * math.pi / 40
                r = 300 + 12.0 * i
                ox = 6000.0 if variante == "far" else 0.0
                oy = 6000.0 if variante == "far" else 0.0
                cx = BASE_X + ox + r * math.cos(ang)
                cy = BASE_Y + oy + r * math.sin(ang)
                dst.write({"geometry": {"type": "MultiLineString", "coordinates": [[(cx, cy), (cx + 1, cy + 1)]]},
                           "properties": {"SegmentID": i + 1, "Order": (i % 5) + 1, "Length": 1.414}})


def _gpkg_variante(dir_tmp: Path, variante: str) -> Path:
    ruta = dir_tmp / f"streams_{variante}.gpkg"
    _capa_variante(ruta, variante)
    if variante == "undefined_crs":
        con = sqlite3.connect(ruta)
        con.execute(
            "UPDATE gpkg_spatial_ref_sys SET definition='undefined', "
            "organization='NONE', organization_coordsys_id=-1, srs_name='unknown' "
            "WHERE srs_id=(SELECT srs_id FROM gpkg_contents WHERE table_name=?)",
            (SOURCE_LAYER,),
        )
        con.commit()
        con.close()
    return ruta


def _caso_portable(dir_tmp: Path) -> Path:
    """Caso portable mínimo bajo dir_tmp/HF_CASE/iguana_pc80 (parents[1]=repo)."""
    caso = dir_tmp / CASO_REL
    caso.mkdir(parents=True, exist_ok=True)
    (caso / ".hfcase").write_text("HF case marker\n", encoding="utf-8")
    (caso / "case.json").write_text(
        json.dumps({"id": "iguana_pc80", "ot": "OT-HF-SPATIAL-SOURCE-001"},
                   ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    manifest = {
        "activadores": {"reference_hash": "state_hash en case.json"},
        "activos": 0,
        "activos_referenciados_pesados": [
            {"id": "streams_urban_1000_medellin", "clase": "B_COMPUTACIONAL",
             "formato": "GeoPackage", "ruta_relativa_repo": SRC_REL,
             "fuente": "externa", "estado": "SIN_GOBERNANZA"},
        ],
        "activos_incorporados": [],
    }
    (caso / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    reg = {"activos": [
        {"id": "streams_urban_1000_medellin",
         "nombre": "Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams)",
         "clase": "B_COMPUTACIONAL", "formato": "GeoPackage", "crs": None,
         "estado": "SIN_GOBERNANZA"},
    ]}
    (caso / "spatial").mkdir(exist_ok=True)
    (caso / "spatial" / "spatial-data-registry.json").write_text(
        json.dumps(reg, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (caso / "spatial" / "qa").mkdir(parents=True, exist_ok=True)
    (caso / "spatial" / "qa" / "qa-ledger.jsonl").write_text("", encoding="utf-8")
    (caso / "decision").mkdir(exist_ok=True)
    (caso / "decision" / "spatial-decision.json").write_text(
        json.dumps({"ot": "OT-HF-003",
                    "project_location": {"latitud": 6.271785117145225,
                                         "longitud": -75.59408755595547,
                                         "crs": "EPSG:4326"}},
                   ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (caso / "decision" / "restrictions.json").write_text("{}", encoding="utf-8")
    (caso / "decision-log.jsonl").write_text("", encoding="utf-8")
    (caso / "state").mkdir(exist_ok=True)
    (caso / "state" / "gates.jsonl").write_text(
        json.dumps({"gate": "G2", "hito": "fixture"}) + "\n", encoding="utf-8")
    (caso / "geometry").mkdir(exist_ok=True)
    (caso / "geometry" / "project-location.geojson").write_text(
        json.dumps({"type": "Feature",
                    "geometry": {"type": "Point",
                                 "coordinates": [-75.59408755595547, 6.271785117145225]},
                    "properties": {}}), encoding="utf-8")
    (caso / "geometry" / "proposed-cell.geojson").write_text("{}", encoding="utf-8")
    (caso / "evidence").mkdir(exist_ok=True)
    (caso / "evidence" / "hashes.json").write_text("{}", encoding="utf-8")
    (caso / "evidence" / "provenance.json").write_text("{}", encoding="utf-8")
    return caso


def _fallo(msg: str) -> str:
    return msg


# ------------------------------------------------------------------ tests R

def r1_contrato(dir_tmp) -> list[str]:
    fallos = []
    if SSCHEMA != "hf.spatial-source-assessment.v1":
        fallos.append(_fallo(f"schema {SSCHEMA!r} != hf.spatial-source-assessment.v1"))
    if not CONTRACT_VERSION.startswith("contract_hf.spatial-source-assessment.v1"):
        fallos.append(_fallo(f"contract {CONTRACT_VERSION!r}"))
    if SOURCE_ID != "streams_urban_1000_medellin":
        fallos.append(_fallo(f"SOURCE_ID {SOURCE_ID!r}"))
    if SOURCE_ID_ASESADO != "streams_urban_1000_medellin_assessed":
        fallos.append(_fallo(f"SOURCE_ID_ASESADO {SOURCE_ID_ASESADO!r}"))
    if QUESTION_POST_ASSESSMENT != "EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT":
        fallos.append(_fallo(f"question {QUESTION_POST_ASSESSMENT!r}"))
    return fallos


def r2_lector(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    with GeoPackageSource(gpkg) as s:
        if s.capa != SOURCE_LAYER:
            fallos.append(_fallo(f"capa {s.capa!r}"))
        if s.conteo != 40:
            fallos.append(_fallo(f"conteo {s.conteo} != 40"))
        if "SegmentID" not in s.nombres_columnas:
            fallos.append(_fallo("sin columna SegmentID"))
        primeras = [fid for fid, _p, _g in list(s.iter_features())[:3]]
        if primeras != ["1", "2", "3"]:
            fallos.append(_fallo(f"fids {primeras!r} no ordenados"))
    return fallos


def r3_capa_h1(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    with GeoPackageSource(gpkg) as s:
        h1 = s.capa_h1()
        h2 = s.capa_h1()
    if h1 != h2:
        fallos.append(_fallo("capa_h1 no determinista"))
    if len(h1) != 64:
        fallos.append(_fallo(f"capa_h1 largo {len(h1)}"))
    gpkg2 = _gpkg_variante(dir_tmp, "selfcross")
    with GeoPackageSource(gpkg2) as s2:
        h3 = s2.capa_h1()
    if h3 == h1:
        fallos.append(_fallo("capa_h1 no sensible al contenido"))
    return fallos


def r4_estadisticas(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    with GeoPackageSource(gpkg) as s:
        st = s.estadisticas_capa()
    for clave in ("conteo", "n_geom", "n_geom_nulas", "n_geom_vacias",
                  "n_multilinestring", "tipos_geometricos", "segment_ids_unicos",
                  "segment_ids_duplicados", "longitud_attr_total_m",
                  "extremos_totales", "extremos_compartidos"):
        if clave not in st:
            fallos.append(_fallo(f"stats sin {clave}"))
    if st["conteo"] != 40 or st["n_geom"] != 40 or st["n_geom_nulas"] != 0:
        fallos.append(_fallo(f"stats inconsistentes {st['conteo']}/{st['n_geom']}/{st['n_geom_nulas']}"))
    if st["tipos_geometricos"] != ["MultiLineString"]:
        fallos.append(_fallo(f"tipos {st['tipos_geometricos']}"))
    return fallos


def r5_crs(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    from spatial_source.crs import analizar_crs
    with GeoPackageSource(gpkg) as s:
        c = analizar_crs(s)
    if c["resultado"] != "CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION":
        fallos.append(_fallo(f"crs resultado {c['resultado']}"))
    if c["crs_declarado"] != "EPSG:9377":
        fallos.append(_fallo(f"crs_declarado {c['crs_declarado']}"))
    if "d03_nativo" not in c["roundtrip"]:
        fallos.append(_fallo("sin roundtrip d03_nativo"))
    return fallos


def r6_cobertura(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    cov = res.cobertura
    if cov["resultado"] not in ("COBERTURA_INSUFICIENTE_DE_VENTANA", "COBERTURA_PARCIAL_DE_VENTANA", "COBERTURA_COMPLETA_DE_VENTANA"):
        fallos.append(_fallo(f"cobertura {cov['resultado']}"))
    if not (0.0 <= cov["pct_extension_sobre_ventana"] <= 1.0):
        fallos.append(_fallo("pct_extension fuera de rango"))
    if not (0.0 <= cov["pct_lineas_ventana_buffer1m"] <= 1.0):
        fallos.append(_fallo("pct_lineas fuera de rango"))
    if "extension_nativa" not in cov or "ventana_utm_32618" not in cov:
        fallos.append(_fallo("cobertura sin extension/ventana"))
    return fallos


def r7_metadatos(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    m = res.metadata_tecnica
    if m.get("geometry_type_name", "").upper() != "MULTILINESTRING":
        fallos.append(_fallo(f"geometry_type_name {m.get('geometry_type_name')}"))
    if "z" not in (m.get("dimensiones") or {}):
        fallos.append(_fallo("sin dimensiones.z"))
    return fallos


def r8_proveniencia(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    p = res.proveniencia
    if not isinstance(p.get("procedencia"), str) or not p.get("procedencia"):
        fallos.append(_fallo("procedencia no declarada"))
    return fallos


def r9_licencia(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if res.licenciamiento.get("license_status") != LICENSE_STATUS_UNKNOWN:
        fallos.append(_fallo(f"license_status {res.licenciamiento.get('license_status')}"))
    return fallos


def r10_qa(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    qa = res.qa
    nombres = {p["perfil"] for p in qa.get("perfiles", [])}
    if nombres != {"QA_SPATIAL_REFERENCE_V1", "QA_VECTOR_GEOMETRY_V1", "QA_NETWORK_INTERNAL_V1"}:
        fallos.append(_fallo(f"perfiles {sorted(nombres)}"))
    if set(qa["quorum"]) != {"PASS", "CONDICIONAL", "FAIL", "FAIL_ORIENTATION"}:
        fallos.append(_fallo(f"quorum keys {sorted(qa['quorum'])}"))
    if not qa["ok"]:
        fallos.append(_fallo(f"qa ok False con fixture limpio: {qa['quorum']}"))
    return fallos


def r11_maquina(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if res.aptitud["resultado"] != APTITUD_CONDITIONALLY_APT:
        fallos.append(_fallo(f"aptitud {res.aptitud['resultado']}"))
    if res.aptitud.get("apto_para_comparacion") is not True:
        fallos.append(_fallo("apto_para_comparacion != True"))
    fallos.append(validar_invariantes(res) and "invariantes no vacíos" or "")
    return [f for f in fallos if f]


def r12_determinismo(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    a = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    b = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if a.assessment_id != b.assessment_id:
        fallos.append(_fallo("assessment_id distinto entre ejecuciones"))
    if a.firmas["output_hash"] != b.firmas["output_hash"]:
        fallos.append(_fallo("output_hash distinto entre ejecuciones"))
    return fallos


def r13_restricciones(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    texto = " | ".join(res.restricciones)
    if "LICENSE_UNKNOWN" not in texto or "autoridad" not in texto:
        fallos.append(_fallo("restricciones sin licencia/autoridad"))
    if "PARTIALLY_COMPARABLE" not in texto:
        fallos.append(_fallo("restricciones sin tope PARTIALLY_COMPARABLE"))
    return fallos


def r14_resolucion(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    rzn = res.resolucion
    if rzn.get("resultado_emitible_max") != "PARTIALLY_COMPARABLE":
        fallos.append(_fallo(f"resultado_emitible_max {rzn.get('resultado_emitible_max')}"))
    interpre = rzn.get("interpretaciones_permitidas", [])
    if not any(str(i).startswith("PARTIALLY_COMPARABLE") for i in interpre):
        fallos.append(_fallo("sin PARTIALLY_COMPARABLE permitida"))
    for prohibida in ("TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_SEGMENT",
                      "TERRITORIALLY_COMPETENT", "ADOPTED_CELL"):
        if any(prohibida in str(i) for i in interpre):
            fallos.append(_fallo(f"{prohibida} permitida"))
    return fallos


def r15_registro(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    ent = REG.entrada_assessed(res, res.qa["quorum"])
    faltan = REG.validar_campos_obligatorios(ent)
    if faltan:
        fallos.append(_fallo(f"campos faltantes: {faltan}"))
    if ent["id"] != SOURCE_ID_ASESADO:
        fallos.append(_fallo(f"id {ent['id']}"))
    if ent["estado"] != APTITUD_CONDITIONALLY_APT:
        fallos.append(_fallo(f"estado {ent['estado']}"))
    if ent.get("assessment_id") != res.assessment_id:
        fallos.append(_fallo("assessment_id del registro != res"))
    return fallos


def r16_persistencia(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    out = EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    for rel in (EVID._ARCHIVO_ASSESSMENT, EVID._LEDGER):
        if not (caso / rel).is_file():
            fallos.append(_fallo(f"falta {rel}"))
    if len(out["post_assessment_runs"]) < 3:
        fallos.append(_fallo(f"runs {out['post_assessment_runs']}"))
    entry = REG.buscar_activo(caso, SOURCE_ID_ASESADO)
    if entry is None:
        fallos.append(_fallo("entrada assessed no registrada"))
    else:
        if "assessment_id" not in entry:
            fallos.append(_fallo("entrada sin assessment_id"))
    manifest = json.loads((caso / "manifest.json").read_text("utf-8"))
    refs = {e.get("id") for e in manifest.get("activos_referenciados_pesados", [])}
    if SOURCE_ID_ASESADO not in refs:
        fallos.append(_fallo("manifest sin referenciado assessed"))
    return fallos


def r17_integridad(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    out = EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=True)
    if not out["hashes_post"]:
        fallos.append(_fallo("sin hashes regenerados"))
    for nombre in ("integrity.json", "checksums.sha256", "manifest.json"):
        if not (caso / nombre).is_file():
            fallos.append(_fallo(f"falta {nombre}"))
    integ = json.loads((caso / "integrity.json").read_text("utf-8"))
    for clave in ("state_hash", "package_hash", "evidence_hash"):
        if clave not in integ.get("hashes", {}):
            fallos.append(_fallo(f"integrity sin {clave}"))
    hashes2 = EVID.regenerar_integridad(caso)
    if hashes2 != out["hashes_post"]:
        fallos.append(_fallo("regeneración no determinista"))
    return fallos


def r18_run_post(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    run_doc = json.loads((caso / EVID._RUN).read_text("utf-8"))
    if run_doc.get("result") != "INSUFFICIENT_EVIDENCE":
        fallos.append(_fallo(f"result {run_doc.get('result')}"))
    if run_doc.get("confidence") != "BAJA":
        fallos.append(_fallo(f"confidence {run_doc.get('confidence')}"))
    if run_doc.get("classification") != "TERRITORIAL_CONTRAST_AUDIT":
        fallos.append(_fallo(f"classification {run_doc.get('classification')}"))
    if "licencia UNKNOWN" not in json.dumps(run_doc.get("governance", {})):
        fallos.append(_fallo("governance sin bloqueo licencia UNKNOWN"))
    return fallos


def r19_sin_absolutas(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=True)
    rutas = [
        EVID._ARCHIVO_ASSESSMENT, EVID._LEDGER, EVID._RUN, EVID._SOURCES, EVID._AUDIT,
        "spatial/spatial-data-registry.json", "manifest.json", "integrity.json",
    ]
    pat = re.compile(r"[A-Za-z]:[\\/]|/tmp/|tempfile")
    for rel in rutas:
        archivo = caso / rel
        if not archivo.is_file():
            fallos.append(_fallo(f"falta {rel}"))
            continue
        texto = archivo.read_text("utf-8", errors="replace")
        if pat.search(texto):
            fallos.append(_fallo(f"ruta absoluta en {rel}: {pat.search(texto).group(0)}"))
    return fallos


def r20_historico(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    hist = REG.buscar_activo(caso, "streams_urban_1000_medellin")
    if hist is None:
        fallos.append(_fallo("entrada histórica perdida"))
    elif hist.get("estado") != "SIN_GOBERNANZA":
        fallos.append(_fallo(f"histórico mutado: {hist.get('estado')}"))
    asesado = REG.buscar_activo(caso, SOURCE_ID_ASESADO)
    if asesado is None:
        fallos.append(_fallo("falta la entrada evaluated"))
    elif asesado.get("id") == "streams_urban_1000_medellin":
        fallos.append(_fallo("id asesado colisiona con el histórico"))
    return fallos


# ------------------------------------------------------------------ tests A

def a1_vacio(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "empty")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    escalon = next((e for e in res.aptitud["escalones"]
                    if e["estado"] == "READABLE"), None)
    if escalon is None or escalon["veredicto"] != "FAIL":
        fallos.append(_fallo(f"readable no FAIL: {escalon}"))
    if res.aptitud["resultado"] != APTITUD_NOT_APT:
        fallos.append(_fallo(f"aptitud {res.aptitud['resultado']}"))
    return fallos


def a2_nulas(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "nullgeom")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if res.estadisticas.get("n_geom_nulas") != 2:
        fallos.append(_fallo(f"nulas {res.estadisticas.get('n_geom_nulas')}"))
    if res.aptitud["resultado"] != APTITUD_NOT_APT:
        fallos.append(_fallo(f"aptitud {res.aptitud['resultado']}"))
    return fallos


def a3_crs_ilegible(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "undefined_crs")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if res.crs["resultado"] != "CRS_UNDECLARED":
        fallos.append(_fallo(f"crs {res.crs['resultado']}"))
    if res.aptitud["resultado"] != APTITUD_NOT_APT:
        fallos.append(_fallo(f"aptitud {res.aptitud['resultado']}"))
    return fallos


def a4_fuera_ventana(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "far")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if res.cobertura["resultado"] != "COBERTURA_INSUFICIENTE_DE_VENTANA":
        fallos.append(_fallo(f"cobertura {res.cobertura['resultado']}"))
    if res.aptitud["resultado"] != APTITUD_NOT_APT:
        fallos.append(_fallo(f"aptitud {res.aptitud['resultado']}"))
    return fallos


def a5_duplicados(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "dup")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    chk = next((c for p in res.qa["perfiles"] for c in p["checks"]
                if c.get("check_id") == "duplicados_geometricos"), None)
    if chk is None or chk["resultado"] != "CONDICIONAL":
        fallos.append(_fallo(f"duplicados {chk.get('resultado') if chk else None}"))
    return fallos


def a6_autocruces(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "selfcross")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    perfil = next(p for p in res.qa["perfiles"] if p["perfil"] == "QA_VECTOR_GEOMETRY_V1")
    chk = next((c for c in perfil["checks"]
                if c.get("check_id") == "autointersecciones_ausentes"), None)
    if chk is None:
        fallos.append(_fallo("sin check autointersecciones"))
    elif chk["resultado"] != "CONDICIONAL":
        fallos.append(_fallo(f"autointersecciones {chk['resultado']} (querido CONDICIONAL)"))
    if perfil["resultado_global"] != "PASS":
        fallos.append(_fallo("perfil vector FAIL tras recalificación"))
    if not res.qa["ok"]:
        fallos.append(_fallo("qa ok False tras recalificación"))
    return fallos


def a7_estabilidad(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    a = EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    b = EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    if a["assessment_id"] != b["assessment_id"]:
        fallos.append(_fallo("assessment_id cambió tras registrar"))
    return fallos


def a8_firmas(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    if not res.firmas["output_hash"] or len(res.firmas["output_hash"]) != 64:
        fallos.append(_fallo("output_hash no 64 hex"))
    if res.firmas["output_hash"] == res.assessment_id:
        fallos.append(_fallo("output_hash == assessment_id"))
    if calcular_output_hash(res) != res.firmas["output_hash"]:
        fallos.append(_fallo("calcular_output_hash no coincide"))
    return fallos


def a9_invariantes(dir_tmp) -> list[str]:
    fallos = []
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    import copy
    mut = copy.deepcopy(res)
    mut.crs = {}
    errores = validar_invariantes(mut)
    if not errores:
        fallos.append(_fallo("esperaba error de invariante al vaciar crs"))
    if len(errores) != 1:
        fallos.append(_fallo(f"esperaba 1 error de crs, got {errores}"))
    return fallos


def a10_registro_seguro(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = _gpkg_variante(dir_tmp, "clean")
    res = correr_assessment(ruta_fuente=str(gpkg.absolute()))
    ent = REG.entrada_assessed(res, res.qa["quorum"])
    faltan = REG.validar_campos_obligatorios(ent)
    if faltan:
        fallos.append(_fallo(f"entrada assessed sin campos: {faltan}"))
    REG.insertar_activo(caso, ent)
    try:
        REG.insertar_activo(caso, dict(ent))
        fallos.append(_fallo("no lanzó por id duplicado"))
    except ValueError:
        pass
    try:
        REG.insertar_activo(caso, {"id": "solo_id"})
        fallos.append(_fallo("no lanzó por campos faltantes"))
    except ValueError:
        pass
    return fallos


def a11_ledger_unico(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    EVID.correr_y_registrar(ruta_fuente=SRC_REL, caso_raiz=str(caso), regenerar=False)
    ledger = (caso / "spatial" / "comparisons" / "comparison-ledger.jsonl")
    lineas = [json.loads(l) for l in ledger.read_text("utf-8").splitlines() if l.strip()]
    ids = [e.get("evidencia") for e in lineas if e.get("grupo") == "comparison"]
    if len(ids) != len(set(ids)):
        fallos.append(_fallo(f"ledger con run duplicado: {ids}"))
    asm = REG.buscar_activo(caso, SOURCE_ID_ASESADO)
    if asm is None or asm.get("assessment_id") is None:
        fallos.append(_fallo("registro corrupto tras re-corrida"))
    return fallos


def a12_cli(dir_tmp) -> list[str]:
    fallos = []
    caso = _caso_portable(dir_tmp)
    gpkg = dir_tmp / SRC_REL
    gpkg.parent.mkdir(parents=True, exist_ok=True)
    _capa_variante(gpkg, "clean")
    env = {"PYTHONUTF8": "1", "PYTHONPATH": str(CORE) + ";" + str(CORE / "portability")}
    pr = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_source.cli", "evaluar",
         "--fuente", SRC_REL, "--root", str(caso), "--json"],
        cwd=str(REPO), capture_output=True, text=True, env=env,
    )
    if pr.returncode != 0:
        fallos.append(_fallo(f"cli evaluar rc={pr.returncode}: {pr.stderr[-200:]}"))
    else:
        doc = json.loads(pr.stdout)
        if doc.get("aptitud", {}).get("resultado") != APTITUD_CONDITIONALLY_APT:
            fallos.append(_fallo("cli evaluar aptitud inesperada"))
    pr2 = subprocess.run(
        [sys.executable, "-X", "utf8", "-m", "spatial_source.cli", "registrar",
         "--fuente", SRC_REL, "--root", str(caso), "--sin-integridad", "--json"],
        cwd=str(REPO), capture_output=True, text=True, env=env,
    )
    if pr2.returncode != 0:
        fallos.append(_fallo(f"cli registrar rc={pr2.returncode}: {pr2.stderr[-200:]}"))
    else:
        if json.loads(pr2.stdout).get("aptitud") != APTITUD_CONDITIONALLY_APT:
            fallos.append(_fallo("cli registrar aptitud inesperada"))
    return fallos


# ------------------------------------------------------------------ ejecución

def run_todo() -> int:
    dir_tmp = Path(tempfile.mkdtemp(prefix="ss_tests_", dir=str(Path(tempfile.gettempdir()))))
    pruebas = {
        "R1_contrato": r1_contrato,
        "R2_lector": r2_lector,
        "R3_capa_h1": r3_capa_h1,
        "R4_estadisticas": r4_estadisticas,
        "R5_crs": r5_crs,
        "R6_cobertura": r6_cobertura,
        "R7_metadatos": r7_metadatos,
        "R8_proveniencia": r8_proveniencia,
        "R9_licencia": r9_licencia,
        "R10_qa": r10_qa,
        "R11_maquina": r11_maquina,
        "R12_determinismo": r12_determinismo,
        "R13_restricciones": r13_restricciones,
        "R14_resolucion": r14_resolucion,
        "R15_registro": r15_registro,
        "R16_persistencia": r16_persistencia,
        "R17_integridad": r17_integridad,
        "R18_run_post": r18_run_post,
        "R19_sin_absolutas": r19_sin_absolutas,
        "R20_historico": r20_historico,
        "A1_vacio": a1_vacio,
        "A2_nulas": a2_nulas,
        "A3_crs_ilegible": a3_crs_ilegible,
        "A4_fuera_ventana": a4_fuera_ventana,
        "A5_duplicados": a5_duplicados,
        "A6_autocruces": a6_autocruces,
        "A7_estabilidad": a7_estabilidad,
        "A8_firmas": a8_firmas,
        "A9_invariantes": a9_invariantes,
        "A10_registro_seguro": a10_registro_seguro,
        "A11_ledger_unico": a11_ledger_unico,
        "A12_cli": a12_cli,
    }
    ok_global = True
    cont = {"ok": 0, "fail": 0}
    for nombre, fn in pruebas.items():
        try:
            fallos = fn(dir_tmp)
        except Exception as exc:  # noqa: BLE001
            fallos = [_fallo(f"EXCEPCIÓN: {type(exc).__name__}: {exc}")]
        if fallos:
            ok_global = False
            cont["fail"] += 1
            print(f"{nombre}: FAIL")
            for f in fallos:
                print(f"   {f}")
        else:
            cont["ok"] += 1
            print(f"{nombre}: PASS")
    total = cont["ok"] + cont["fail"]
    print(f"RESULTADO_R1R20_A1A12: {'PASS' if ok_global else 'FAIL'} ({cont['ok']}/{total})")
    return 0 if ok_global else 1


if __name__ == "__main__":
    sys.exit(run_todo())