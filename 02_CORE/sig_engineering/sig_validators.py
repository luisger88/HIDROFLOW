# -*- coding: utf-8 -*-
"""
Validadores aislados de ingeniería SIG (OT-HF-SIG-002).

Validan contratos transversales SIG v1, inventario espacial gobernado y los
estados espaciales del caso iguana_pc80 sin modificar nada.

El nombre sig_validators evita colisión con el módulo validators de
02_CORE/portability (S9 importa ambos).

Baseline de motores e inmutables = estado del árbol de trabajo al inicio de la
OT-HF-SIG-002 (incluye modificaciones preexistentes no atribuibles a la OT).
"""

from __future__ import annotations

import hashlib
import json
import re
from pathlib import Path


RAIZ_REPO = Path(__file__).resolve().parents[2]
CASO_RUTA = Path("HF_CASE") / "iguana_pc80"
CASO = RAIZ_REPO / CASO_RUTA

CONTRATOS_GIS = [
    "hf-comparison-v1.md",
    "hf-geo-qa-v1.md",
    "hf-interoperability-v1.md",
    "hf-network-v1.md",
    "hf-spatial-data-v1.md",
    "hf-spatial-decision-v1.md",
    "hf-spatial-reference-v1.md",
    "hf-terrain-chain-v1.md",
    "hf-uncertainty-v1.md",
]

CLASES_VALIDAS = {"A_CANONICO", "B_COMPUTACIONAL", "C_REFERENCIAL", "C_REFERENCIAL_VISUAL", "EVIDENCIA"}

CAMPOS_OBLIGATORIOS_REGISTRO = [
    "id", "nombre", "clase", "formato", "fuente", "autoridad",
    "cobertura", "fecha", "vigencia", "licencia", "crs", "datum",
    "axis_order", "resolucion", "escala", "extension", "nodata",
    "precision_conocida", "tamano", "sha256", "procedencia",
    "transformaciones", "regenerabilidad", "portabilidad",
    "restricciones", "estado",
]

MOTORES_INVENTARIADOS = [
    ("07_TOOLBOX/hf_geo/mod_01_fill.py", "9aad7347fe13782976c0a253548c21d731ef87f12432d0b28a4ca085488badf9"),
    ("07_TOOLBOX/hf_geo/mod_02_flowdir.py", "952f52b777d8da6fa7fce45b0cbc50c9de26b95e141ba449fd04942fdb6abf16"),
    ("07_TOOLBOX/hf_geo/mod_03_flowacc.py", "c19fb41cf233c12d024ca5db34907b0a668593340f20b99b0b8038314c3b478e"),
    ("07_TOOLBOX/hf_geo/mod_04_snap.py", "da7240bc8bb994857f7f254c492a17c0916047ebb4788e4325d731d4343ea456"),
    ("07_TOOLBOX/hf_geo/mod_05_watershed.py", "c65954330deef6d328f0c9ee0592f4cae7a780f57cd3dafce44be2da3e1955ad"),
    ("07_TOOLBOX/hf_geo/mod_06_streamnet.py", "3c287a8ac173e4cfc91d6e354f4fe5931f41f54709c7ac5b2daf98c197793726"),
    ("07_TOOLBOX/hf_geo/pipeline.py", "ce1499d3ddf3838de784772dcc1d3d06bbfde738ace7d945c122d94a8eea5c00"),
    ("07_TOOLBOX/hf_geo/wbt_runner.py", "575517d1889408e0625331bbeb62df216c36e185a494ee32e63628edfb412a9c"),
    ("07_TOOLBOX/hf_geo/cli.py", "878e80bc615fda3e828749282bcad10937ab47f0b7ba01ff13abeb0189c7f865"),
    ("07_TOOLBOX/hf_geo/contrato_snap_d03.py", "d9d5b0001358666fee1ba8c091b6b029f33d95dee1654ae78be23222e44b6689"),
    ("07_TOOLBOX/hidroflow_cli.py", "567aedcd4ee3e3141688d61c299d8d38a7d46939d708cdf4182b8848211d370d"),
    ("01_APP/HIDROFLOW/proxy/express-server.js", "62a930c4d89602561f1b4a0ae283e13892647718b28cb5ba53fbb2212c50e75c"),
    ("01_APP/HIDROFLOW/proxy/hf_geo_bridge.cjs", "ace81d480476b98fa466a9e30ca14020f50be3e762d639884198780accb7599c"),
    ("01_APP/HIDROFLOW/proxy/hf_hydro_cli.cjs", "eaa45a46c5ad0fea5a64155e6ae3d82bd6dfda6a4c9cbbe96f62fb03c9dd5584"),
    ("01_APP/HIDROFLOW/src/HidroFlow.jsx", "3e697a9b9c463ec325b6261aa0cf31fa148fb1f50baa8e2f1c8afa5f5407d4aa"),
    ("01_APP/HIDROFLOW/package.json", "9e2afc25a47828e5b1bb91781a852859623bd477d1cc183c05e3df9f7acf50e8"),
]

INMUTABLES_BASELINE = [
    ("02_CORE/config/caso_activo.json", "76af14f62c3aff8f4656f0c6dd51a4c37d9a310fdb169718c763dfb2f06ee522"),
    ("02_PROYECTOS/OT-HF-003/OT-HF-003.hfproj", "87f3943bc3b49dd4ececc48e04c8ffb874abd7676e65a8f74238a7bba43b7841"),
    ("07_TOOLBOX/hf_geo/config/contrato_snap_D03.json", "e84331acf4700ead49fb87845da86d45a28d805ed402e154e9a946cd6f9cf803"),
    ("07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json", "5f6d84888327f824758033fe3abfd05d647864664a9206dbb105c9bf914ed6db"),
    ("00_ADMIN/bitacora/HF-CASE-STATE-001A/HF-CASE-STATE-001A_REGISTRO_HISTORICOS.json", "3bdd2be3f4c0d9318baa1424a074d3ee6c9a65219cf8acbee52ea386b57f0e76"),
]

INMUTABLES_CASO = [
    ("case.json", "b24fea974753630431d50f650f31a1510d5e0b0f1fba885db75de13355d63a14"),
    ("decision-log.jsonl", "dd1049354e6d6b5d0f0d34db6ba3818d880f59d711a51131e9e54eaf0cbbf2c1"),
    ("state/gates.jsonl", "5d3048d9a6a7b24d0fa3aa9efc021dc36ec037e8ca0460d7185650352b00ec9e"),
    ("decision/spatial-decision.json", "187b4c7ef407f04db8dc111c33afaf9689849883c32f79474fdba9a301245c18"),
    ("geometry/project-location.geojson", "a117c8954a23ab8456ec18aa0525ed696e0814889fa2abd9234d5d40289696b3"),
    ("geometry/proposed-cell.geojson", "5f5e8a4f1c03adaf1c9d297337adf1b8fb57919602174162e8983f24f27e5bce"),
]


def sha256_archivo(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for bloque in iter(lambda: fh.read(1048576), b""):
            h.update(bloque)
    return h.hexdigest()


def leer_json(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as fh:
        return json.load(fh)


def leer_jsonl(path: Path) -> list[dict]:
    registros = []
    with open(path, "r", encoding="utf-8") as fh:
        for num, linea in enumerate(fh, start=1):
            linea = linea.strip()
            if not linea:
                continue
            try:
                registros.append(json.loads(linea))
            except json.JSONDecodeError as exc:
                raise ValueError(f"JSONL inválido línea {num}: {exc}") from exc
    return registros


def ruta_absoluta_nueva(texto: str) -> bool:
    patrones = [
        re.compile(r"(?i)\b[A-Za-z]:[\\/]"),
        re.compile(r"(?i)^\\\\[^\\]+"),
    ]
    for pat in patrones:
        if pat.search(texto):
            return True
    return False


def validar_registro_espacial() -> tuple[bool, list[str]]:
    ruta = CASO / "spatial" / "spatial-data-registry.json"
    if not ruta.is_file():
        return (False, ["inventario espacial ausente"])
    fallos: list[str] = []
    try:
        reg = leer_json(ruta)
    except ValueError as exc:
        return (False, [f"JSON inválido: {exc}"])
    if reg.get("schema") != "hf.spatial-data.v1":
        fallos.append("schema != hf.spatial-data.v1")
    activos = reg.get("activos", [])
    if not activos:
        fallos.append("sin activos")
    for a in activos:
        for campo in CAMPOS_OBLIGATORIOS_REGISTRO:
            if campo not in a:
                fallos.append(f"{a.get('id')}: falta campo {campo}")
        if a.get("clase") not in CLASES_VALIDAS:
            fallos.append(f"{a.get('id')}: clase inválida {a.get('clase')}")
        if a.get("clase") == "A_CANONICO" and not a.get("sha256"):
            fallos.append(f"{a.get('id')}: clase A sin sha256")
        if a.get("clase") not in ("A_CANONICO", "B_COMPUTACIONAL") and not a.get("crs"):
            pass
        for campo in ("ruta_relativa", "ruta_relativa_repo"):
            if a.get(campo) and ruta_absoluta_nueva(str(a[campo])):
                fallos.append(f"{a.get('id')}: ruta absoluta en {campo}")
    return (not fallos, fallos)


def validar_estado_red() -> tuple[bool, list[str]]:
    fallos: list[str] = []
    try:
        sd = leer_json(CASO / "decision" / "spatial-decision.json")
        red = leer_json(CASO / "network" / "hf-network-reference.json")
    except FileNotFoundError:
        return (False, ["archivos de red/decisión ausentes"])
    if red.get("activo", {}).get("competencia_territorial") != "NOT_DEMONSTRATED":
        fallos.append("competencia_territorial != NOT_DEMONSTRATED")
    if sd.get("network", {}).get("competence") != "NOT_DEMONSTRATED":
        fallos.append("network.competence != NOT_DEMONSTRATED")
    reg = leer_json(CASO / "spatial" / "spatial-data-registry.json")
    for a in reg.get("activos", []):
        if a.get("id") == "red_hf_gate02_d03" and a.get("estado") != "INTERNALLY_VALIDATED":
            fallos.append("registro: red_fh estado != INTERNALLY_VALIDATED")
    return (not fallos, fallos)


def validar_segmento_24() -> tuple[bool, list[str]]:
    fallos: list[str] = []
    sd = leer_json(CASO / "decision" / "spatial-decision.json")
    if sd.get("proposed_cell", {}).get("segmento") != 24:
        fallos.append("proposed_cell.segmento != 24")
    if sd.get("network", {}).get("segmento_24_estado") != "CANDIDATO_NO_DEMOSTRADO":
        fallos.append("segmento_24_estado != CANDIDATO_NO_DEMOSTRADO")
    reg = leer_json(CASO / "spatial" / "spatial-data-registry.json")
    for a in reg.get("activos", []):
        if a.get("id") == "segmento_candidato_d03" and a.get("estado") != "CANDIDATO_NO_DEMOSTRADO":
            fallos.append("registro: segmento != CANDIDATO_NO_DEMOSTRADO")
    return (not fallos, fallos)


def validar_adopted_cell_null() -> tuple[bool, list[str]]:
    fallos: list[str] = []
    sd = leer_json(CASO / "decision" / "spatial-decision.json")
    if "adopted_cell" not in sd:
        fallos.append("adopted_cell ausente")
    elif sd.get("adopted_cell") is not None:
        fallos.append("adopted_cell no es null")
    if sd.get("acquisition_aoi") is not None:
        fallos.append("acquisition_aoi no es null")
    if sd.get("professional_click") is not None:
        fallos.append("professional_click no es null")
    if sd.get("verdict") != "PENDING_PROFESSIONAL_DECISION":
        fallos.append("verdict != PENDING_PROFESSIONAL_DECISION")
    return (not fallos, fallos)


def validar_fail_orientation() -> tuple[bool, list[str]]:
    fallos: list[str] = []
    manifest = leer_json(CASO / "manifest.json")
    registrado = None
    for a in manifest.get("activos_referenciados_pesados", []):
        if a.get("id") == "verificacion_D03.png":
            registrado = a
    if registrado is None:
        fallos.append("verificacion_D03.png no registrado en manifest")
    else:
        if registrado.get("estado") != "historic":
            fallos.append("estado != historic")
        if registrado.get("qa") != "FAIL_ORIENTATION":
            fallos.append("qa != FAIL_ORIENTATION")
        if registrado.get("decision_use") != "NOT_SUITABLE":
            fallos.append("decision_use != NOT_SUITABLE")
    reg = leer_json(CASO / "spatial" / "spatial-data-registry.json")
    for a in reg.get("activos", []):
        if a.get("id") == "verificacion_D03.png":
            if a.get("estado") != "HISTORICO":
                fallos.append("registro: verificacion_D03.png no HISTORICO")
            if "FAIL_ORIENTATION" not in a.get("precision_conocida", ""):
                fallos.append("registro: no menciona FAIL_ORIENTATION")
    return (not fallos, fallos)


def validar_gates() -> tuple[bool, list[str]]:
    fallos: list[str] = []
    try:
        gates = leer_jsonl(CASO / "state" / "gates.jsonl")
    except ValueError as exc:
        return (False, [f"gates inválido: {exc}"])
    estados = {}
    for g in gates:
        estados[g.get("gate_id")] = g.get("veredicto")
    if not estados:
        return (False, ["gates sin líneas"])
    if estados.get("GATE_1") != "PASS":
        fallos.append(f"GATE_1 != PASS ({estados.get('GATE_1')})")
    if estados.get("GATE_2") != "CONDICIONAL":
        fallos.append(f"GATE_2 != CONDICIONAL ({estados.get('GATE_2')})")
    if estados.get("GATE_3") != "BLOQUEADO":
        fallos.append(f"GATE_3 != BLOQUEADO ({estados.get('GATE_3')})")
    return (not fallos, fallos)


def verificar_hashes(rel_hash: list[tuple[str, str]], raiz: Path = RAIZ_REPO) -> tuple[bool, list[str]]:
    fallos: list[str] = []
    for rel, esperado in rel_hash:
        target = raiz / rel
        if not target.is_file():
            fallos.append(f"{rel}: AUSENTE (raíz {raiz})")
            continue
        real = sha256_archivo(target)
        if real != esperado:
            fallos.append(f"{rel}: {real} != {esperado}")
    return (not fallos, fallos)


__all__ = [
    "RAIZ_REPO", "CASO",
    "CONTRATOS_GIS", "CLASES_VALIDAS", "CAMPOS_OBLIGATORIOS_REGISTRO",
    "MOTORES_INVENTARIADOS",
    "INMUTABLES_BASELINE", "INMUTABLES_CASO",
    "sha256_archivo", "leer_json", "leer_jsonl", "ruta_absoluta_nueva",
    "validar_registro_espacial", "validar_estado_red", "validar_segmento_24",
    "validar_adopted_cell_null", "validar_fail_orientation", "validar_gates",
    "verificar_hashes",
]