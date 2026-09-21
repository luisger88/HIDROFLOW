# -*- coding: utf-8 -*-
"""
Pruebas P1-P5 del caso portable HidroFlow (OT-HF-PORT-002).

P1. Estructura     — el paquete contiene todos los contratos obligatorios.
P2. Integridad     — los hashes coinciden (checksums.sha256 y estado_hash).
P3. Clasificación  — todos los activos incorporados tienen clase válida A/B/C/D.
P4. Decisión       — GATE 2 pendiente; adopted_cell null/ausente; segmento 24
                     no adoptado; decision_profesional de GATE 2 null.
P5. Portabilidad estructural — copiar el caso a una carpeta temporal externa,
                     reabrirlo desde la nueva raíz con el resolvedor, validar
                     y eliminar la copia temporal.

La prueba P5 NO ejecuta WhiteboxTools ni reproduce el snap real.
"""

from __future__ import annotations

import json
import shutil
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from resolver import (  # noqa: E402
    PortabilityError,
    abrir_caso,
    resolver_raiz_caso,
    verificar_hashes,
    ruta_interna,
)
from validators import (  # noqa: E402
    CLASES_VALIDAS,
    validar_case,
    validar_contratos,
    validar_decision_log,
    validar_manifest,
    validar_spatial_decision,
    validar_gates,
)

CONTRATOS_OBLIGATORIOS = [
    ".hfcase",
    "case.json",
    "manifest.json",
    "decision-log.jsonl",
    "checksums.sha256",
    "state/gates.jsonl",
    "geometry/project-location.geojson",
    "geometry/proposed-cell.geojson",
    "decision/spatial-decision.json",
    "evidence/provenance.json",
    "evidence/hashes.json",
    "references/source-manifest.json",
]

ARCHIVOS_PREEXISTENTES_CASO = ["case.json", "manifest.json", "checksums.sha256"]


def _fallo(msg: str) -> str:
    return f"FAIL: {msg}"


def p1_estructura(raiz: Path) -> list[str]:
    """P1 — Estructura: contratos obligatorios presentes."""
    fallos: list[str] = []
    for rel in CONTRATOS_OBLIGATORIOS:
        p = raiz / rel
        if not p.is_file():
            fallos.append(_fallo(f"contrato obligatorio ausente: {rel}"))
    if fallos:
        return fallos
    return []


def p2_integridad(raiz: Path) -> list[str]:
    """P2 — Integridad: hashes coinciden y columna archivo del caso portable."""
    fallos: list[str] = []
    vh = verificar_hashes(raiz)
    if not vh["ok"]:
        fallos.extend(_fallo(d) for d in vh["diferencias"])
    # estado_hash debe coincidir
    try:
        resumen = abrir_caso(raiz)
    except PortabilityError as exc:
        return [_fallo(f"no es posible abrir caso: {exc}")]
    if resumen["estado_hash_registrado"] != resumen["estado_hash_calculado"]:
        fallos.append(
            _fallo(
                "estado_hash registrado != calculado: "
                f"{resumen['estado_hash_registrado']} vs "
                f"{resumen['estado_hash_calculado']}"
            )
        )
    return fallos


def p3_clasificacion(raiz: Path) -> list[str]:
    """P3 — Clasificación: todos los activos incorporados tienen clase válida."""
    fallos: list[str] = []
    manifest = json.loads((raiz / "manifest.json").read_text("utf-8"))
    incorporados = manifest.get("activos_incorporados", [])
    ids = set()
    for activo in incorporados:
        clase = activo.get("clase")
        if clase not in CLASES_VALIDAS:
            fallos.append(
                _fallo(
                    f"clase inválida en {activo.get('id')}: {clase}"
                )
            )
        if activo.get("id") in ids:
            fallos.append(_fallo(f"id duplicado: {activo.get('id')}"))
        ids.add(activo.get("id"))
    if not incorporados:
        fallos.append(_fallo("manifest sin activos_incorporados"))
    return fallos


def p4_decision(raiz: Path) -> list[str]:
    """P4 — Decisión: GATE 2 pendiente, adopted_cell null, segmento 24 no adoptado."""
    fallos: list[str] = []
    ok_case, errs_case = validar_case(raiz)
    ok_sd, errs_sd = validar_spatial_decision(raiz)
    ok_dl, errs_dl = validar_decision_log(raiz)
    ok_g, errs_g = validar_gates(raiz)
    for label, ok, errs in (
        ("case", ok_case, errs_case),
        ("spatial_decision", ok_sd, errs_sd),
        ("decision_log", ok_dl, errs_dl),
        ("gates", ok_g, errs_g),
    ):
        if not ok:
            fallos.extend(_fallo(f"{label}: {e}") for e in errs)

    # adopted_cell debe ser null o ausente en spatial-decision.json
    sd = json.loads((raiz / "decision/spatial-decision.json").read_text("utf-8"))
    if "adopted_cell" not in sd:
        fallos.append(_fallo("adopted_cell ausente en spatial-decision.json"))
    elif sd.get("adopted_cell") is not None:
        fallos.append(_fallo("adopted_cell no es null"))

    # segmento 24 como candidato no demostrado
    if sd.get("proposed_cell", {}).get("segmento") != 24:
        fallos.append(_fallo("proposed_cell.segmento != 24"))
    if sd.get("network", {}).get("segmento_24_estado") != "CANDIDATO_NO_DEMOSTRADO":
        fallos.append(_fallo("segmento 24 no registrado como CANDIDATO_NO_DEMOSTRADO"))

    # prohibición textual en toda la ruta de decisión del caso
    prohibidos = ["adoptar la celda", "celda adoptada", "aceptado"]
    for rel in ["decision-log.jsonl", "decision/spatial-decision.json"]:
        texto = (raiz / rel).read_text("utf-8").lower()
        for p in prohibidos:
            if p.lower() in texto:
                # "adoptar la celda" aparece en contexto de prohibición
                fallos.append(_fallo(f"texto prohibido '{p}' en {rel}"))
    return fallos


def p5_portabilidad(raiz: Path) -> list[str]:
    """
    P5 — Portabilidad estructural: copiar a carpeta TEMPORAL externa, abrir
    desde la nueva raíz, validar y eliminar la copia temporal.
    No ejecuta WhiteboxTools ni reproduce el snap.
    """
    fallos: list[str] = []
    tmp = Path(tempfile.mkdtemp(prefix="hfport-", dir=None))
    try:
        copia = tmp / "iguana_pc80"
        shutil.copytree(raiz, copia)
        if not (copia / ".hfcase").is_file():
            return [_fallo("copia temporal sin .hfcase")]
        # Abrir desde la nueva raíz con el resolvedor
        resumen = abrir_caso(copia)
        if not (copia / "case.json").is_file():
            fallos.append(_fallo("case.json ausente en la copia"))
        if resumen["caso"].get("id") != "iguana_pc80":
            fallos.append(_fallo("identidad no preservada en la copia"))
        if resumen["gates"].get("GATE_2", {}).get("veredicto") != "CONDICIONAL":
            fallos.append(_fallo("GATE_2 no es CONDICIONAL en la copia"))
        if resumen["adopted_cell"] is not None:
            fallos.append(_fallo("adopted_cell no es null en la copia"))
        # Validar todos los contratos en la copia
        v = validar_contratos(copia)
        if not v["ok"]:
            for k, (ok, errs) in v["resultados"].items():
                if not ok:
                    fallos.extend(_fallo(f"copia {k}: {e}") for e in errs)
        # Verificar hashes en la copia
        vh = verificar_hashes(copia)
        if not vh["ok"]:
            fallos.extend(_fallo(f"copia hashes: {d}") for d in vh["diferencias"])
        return fallos
    except PortabilityError as exc:
        return [_fallo(f"P5 portabilidad: {exc}")]
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def run_todo(raiz: Path) -> int:
    """Ejecuta P1-P5 y reporta. Devuelve 0 si todo pasa, 1 en otro caso."""
    pruevas = {
        "P1_estructura": p1_estructura,
        "P2_integridad": p2_integridad,
        "P3_clasificacion": p3_clasificacion,
        "P4_decision": p4_decision,
        "P5_portabilidad": p5_portabilidad,
    }
    ok_global = True
    for nombre, fn in pruevas.items():
        fallos = fn(raiz)
        if fallos:
            ok_global = False
            print(f"{nombre}: FAIL")
            for f in fallos:
                print(f"   {f}")
        else:
            print(f"{nombre}: PASS")
    print("RESULTADO_P1_P5:", "PASS" if ok_global else "FAIL")
    return 0 if ok_global else 1


def main(argv: list[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    raiz: Path
    try:
        if argv:
            raiz = resolver_raiz_caso(argv[0])
        else:
            raiz = resolver_raiz_caso()
    except PortabilityError as exc:
        print(f"FAIL: no se pudo resolver la raíz del caso: {exc}")
        return 1
    print(f"Caso portable raíz: {raiz}")
    return run_todo(raiz)


if __name__ == "__main__":
    sys.exit(main())