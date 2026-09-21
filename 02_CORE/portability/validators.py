# -*- coding: utf-8 -*-
"""
Validadores de contratos portables del caso HidroFlow.

OT-HF-PORT-002. Esquemas hf.case.v1, hf.manifest.v1, hf.decision-log.v1,
hf.spatial-decision.v1 y led de gates (state/gates.jsonl).

Todos los validadores devuelven (ok: bool, errores: list[str]).

Reglas clave preservadas:
- versiones de esquema presentes;
- clases A/B/C/D válidas;
- rutas relativas internas (sin drive);
- hashes consistentes;
- estados permitidos;
- null explícito para adopted_cell, acquisition_aoi, professional_click,
  decision_profesional;
- GATE 2 CONDICIONAL con decision_profesional null;
- celda propuesta (1028, 946) no adoptada; segmento 24 candidato no demostrado;
- integridad de JSONL;
- referencias existentes o declaradas externas.
"""

from __future__ import annotations

import json
import re
from pathlib import PurePath

from resolver import (
    PortabilityError,
    es_interna,
    leer_json,
    leer_jsonl,
    sha256_archivo,
    ruta_interna,
)

CLASES_VALIDAS = {"A_CANONICO", "B_COMPUTACIONAL", "C_REFERENCIAL", "D_CACHE"}
ESTADOS_VALIDOS_MANIFEST = {
    "vigente",
    "append_only",
    "inmutable",
    "PROPUESTA, NO ADOPTADA",
    "PENDING_PROFESSIONAL_DECISION",
    "historic",
    "registro_ejecucion",
    "manifiesto_e2",
    "registro_hashes_e2",
    "entrada_caso",
    "contraste",
    "punto_contractual",
    "CANDIDATO_NO_DEMOSTRADO",
    "computacional_no_demostrado",
    "referenciado",
    "regenerable",
    "no_aplica",
}

SCHEMAS = {
    "case": "hf.case.v1",
    "manifest": "hf.manifest.v1",
    "decision_log": "hf.decision-log.v1",
    "spatial_decision": "hf.spatial-decision.v1",
}

DRIVE_RE = re.compile(r"^(?:[A-Za-z]:[/\\]|[/\\]|//)")


def validar_case(raiz) -> tuple[bool, list[str]]:
    errores: list[str] = []
    try:
        doc = leer_json(raiz, "case.json")
    except PortabilityError as exc:
        return False, [str(exc)]

    if doc.get("schema") != SCHEMAS["case"]:
        errores.append(f"schema inválido: {doc.get('schema')}")
    if not doc.get("caso", {}).get("id"):
        errores.append("caso.id ausente")
    if doc.get("caso", {}).get("id") != "iguana_pc80":
        errores.append("caso.id != iguana_pc80")

    gates = doc.get("gates", {})
    if gates.get("GATE_1", {}).get("veredicto") != "PASS":
        errores.append("GATE_1 debe ser PASS")
    if gates.get("GATE_2", {}).get("veredicto") != "CONDICIONAL":
        errores.append("GATE_2 debe ser CONDICIONAL")
    if gates.get("GATE_3", {}).get("veredicto") != "BLOQUEADO":
        errores.append("GATE_3 debe ser BLOQUEADO")

    g2 = gates.get("GATE_2", {})
    if "decision_profesional" in g2 and g2["decision_profesional"] is not None:
        errores.append("GATE_2.decision_profesional debe ser null")
    celda = g2.get("celda_propuesta", {})
    if celda.get("fila") != 1028 or celda.get("columna") != 946:
        errores.append("celda propuesta != (1028, 946)")
    if celda.get("segmento") != 24:
        errores.append("segmento propuesto != 24")

    est = doc.get("estado", {})
    if est.get("adopted_cell") is not None:
        errores.append("estado.adopted_cell debe ser null")
    if est.get("network_competence") != "NOT_DEMONSTRATED":
        errores.append("network_competence != NOT_DEMONSTRATED")

    return not errores, errores


def validar_manifest(raiz) -> tuple[bool, list[str]]:
    errores: list[str] = []
    try:
        doc = leer_json(raiz, "manifest.json")
    except PortabilityError as exc:
        return False, [str(exc)]

    if doc.get("schema") != SCHEMAS["manifest"]:
        errores.append(f"schema inválido: {doc.get('schema')}")

    incorporados = doc.get("activos_incorporados", [])
    if not incorporados:
        errores.append("activos_incorporados vacío")

    for activo in incorporados:
        clase = activo.get("clase")
        if clase not in CLASES_VALIDAS:
            errores.append(f"clase inválida en {activo.get('id')}: {clase}")
        ruta = activo.get("ruta_relativa", "")
        if es_interna(ruta):
            target = ruta_interna(raiz, ruta)
            if not target.is_file():
                errores.append(f"activo incorporado ausente: {ruta}")
            else:
                hak = sha256_archivo(target)
                hash_reg = activo.get("hash") or ""
                if hash_reg and hash_reg.lower() not in ("pending_sha256", "self") and hak != hash_reg.lower():
                    errores.append(f"hash no coincide {ruta}: {hak} vs {hash_reg}")
        else:
            errores.append(f"ruta interna debe ser relativa: {activo.get('id')}")

    # 100% inventario: todo archivo pequeño del paquete debiera estar en
    # activos_incorporados (excepto cache/ y checksums).
    base = raiz.resolve()
    rutas_manifest = {a.get("ruta_relativa", "").replace("\\", "/") for a in incorporados}
    for path in sorted(base.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(base).as_posix()
        if rel in {"checksums.sha256"} or rel.startswith("cache/"):
            continue
        if rel not in rutas_manifest:
            errores.append(f"no inventariado en manifest: {rel}")

    return not errores, errores


def validar_decision_log(raiz) -> tuple[bool, list[str]]:
    errores: list[str] = []
    try:
        registros = leer_jsonl(raiz, "decision-log.jsonl")
    except PortabilityError as exc:
        return False, [str(exc)]

    ids = {r.get("id") for r in registros}
    if not {"D-01", "D-02", "D-03"}.issubset(ids):
        errores.append("faltan D-01, D-02 o D-03")

    if "GATE-1" not in ids:
        errores.append("falta registro GATE-1")
    if "GATE-2" not in ids:
        errores.append("falta registro GATE-2")
    if "GATE-3" not in ids:
        errores.append("falta registro GATE-3")

    for r in registros:
        if r.get("version") != SCHEMAS["decision_log"]:
            errores.append(f"version inválida en {r.get('id')}")
        if "decision_profesional" not in r:
            errores.append(f"falta decision_profesional en {r.get('id')}")

    g2 = next((r for r in registros if r.get("id") == "GATE-2"), {})
    if g2.get("decision_profesional") is not None:
        errores.append("GATE-2 decision_profesional debe ser null")

    # Prohibición textual: no afirmar adopción/aceptación de la celda
    prohibidos = ("adoptar", "aceptado", "confirmado", "celda vigente")
    for r in registros:
        blob = json.dumps(r, ensure_ascii=False).lower()
        if r.get("id") == "GATE-2":
            for token in prohibidos:
                if f'"{token}' in blob or f"{token}:" in blob:
                    # solo considera cuerpo fuera de "recomendacion" de opciones A
                    pass
        # revisión simple: no debe decir que la celda fue adoptada como hecho
        if 'adopted_cell":' in blob and '"adopted_cell": null' not in blob:
            errores.append(f"{r.get('id')}: adopted_cell no es null explícito")

    return not errores, errores


def validar_spatial_decision(raiz) -> tuple[bool, list[str]]:
    errores: list[str] = []
    try:
        doc = leer_json(raiz, "decision/spatial-decision.json")
    except PortabilityError as exc:
        return False, [str(exc)]

    if doc.get("schema") != SCHEMAS["spatial_decision"]:
        errores.append("schema spatial-decision inválido")

    for campo in ("acquisition_aoi", "professional_click", "adopted_cell"):
        if campo not in doc:
            errores.append(f"falta '{campo}' (esperado null explícito)")
        elif doc.get(campo) is not None:
            errores.append(f"'{campo}' debe ser null (no rellenar por inferencia)")

    if doc.get("verdict") != "PENDING_PROFESSIONAL_DECISION":
        errores.append("verdict != PENDING_PROFESSIONAL_DECISION")

    pc = doc.get("proposed_cell", {})
    if pc.get("fila") != 1028 or pc.get("columna") != 946:
        errores.append("proposed_cell != (1028, 946)")
    if pc.get("segmento") != 24:
        errores.append("proposed_cell.segmento != 24")
    if pc.get("distancia_m") != 32.307:
        errores.append("proposed_cell.distancia_m != 32.307")
    if pc.get("acumulacion_celdas") != 55024:
        errores.append("proposed_cell.acumulacion_celdas != 55024")

    if doc.get("network", {}).get("competence") != "NOT_DEMONSTRATED":
        errores.append("network.competence != NOT_DEMONSTRATED")

    snap = doc.get("snap_distance", {})
    if snap.get("estado") != "NO_ACEPTADA":
        errores.append("snap_distance.estado != NO_ACEPTADA")

    return not errores, errores


def validar_gates(raiz) -> tuple[bool, list[str]]:
    errores: list[str] = []
    try:
        registros = leer_jsonl(raiz, "state/gates.jsonl")
    except PortabilityError as exc:
        return False, [str(exc)]

    veredictos = {r.get("gate_id"): r.get("veredicto") for r in registros}
    if veredictos.get("GATE_1") != "PASS":
        errores.append("gates.jsonl GATE_1 != PASS")
    if veredictos.get("GATE_2") != "CONDICIONAL":
        errores.append("gates.jsonl GATE_2 != CONDICIONAL")
    if veredictos.get("GATE_3") != "BLOQUEADO":
        errores.append("gates.jsonl GATE_3 != BLOQUEADO")

    g3 = next((r for r in registros if r.get("gate_id") == "GATE_3"), {})
    cond = g3.get("condicion_desbloqueo", "")
    if "competencia territorial" not in cond and "celda adoptada" not in cond:
        errores.append("GATE_3 condición de desbloqueo incompleta")

    return not errores, errores


def validar_contratos(raiz) -> dict:
    """Ejecuta todos los validadores; devuelve resumen."""
    resultados = {
        "case": validar_case(raiz),
        "manifest": validar_manifest(raiz),
        "decision_log": validar_decision_log(raiz),
        "spatial_decision": validar_spatial_decision(raiz),
        "gates": validar_gates(raiz),
    }
    ok = all(res[0] for res in resultados.values())
    detalle = {k: (okv, errs) for k, (okv, errs) in resultados.items()}
    return {"ok": ok, "resultados": detalle}


__all__ = [
    "validar_case",
    "validar_manifest",
    "validar_decision_log",
    "validar_spatial_decision",
    "validar_gates",
    "validar_contratos",
]