# -*- coding: utf-8 -*-
"""
evidence — persistencia de resultados, ledger de evidencia y catálogo de perfiles.

Convenciones:
- runs/  <run_id>.json           resultado canónico completo (con timestamp).
- evidence/ <run_id>_sources.json referencia de fuentes y transformación.
- evidence/ <question>_audit.md  auditoría legible de cada run.
- profiles/ <perfil>.json        catálogo declarativo por perfil.
- comparison-ledger.jsonl        append serial, único por comparison_run_id.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import __version__
from .models import ComparisonResult
from .result import canonical_json, serializar_completo

_LEDGER = "spatial/comparisons/comparison-ledger.jsonl"
_RUNS = "spatial/comparisons/runs"
_EVIDENCIA = "spatial/comparisons/evidence"
_PERFILES = "spatial/comparisons/profiles"


def _leer_jsonl(path: Path) -> list[dict]:
    out: list[dict] = []
    if not path.exists():
        return out
    for linea in path.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if not linea:
            continue
        out.append(json.loads(linea))
    return out


def slug_question(question_id: str) -> str:
    return "".join(c if c.isalnum() or c == "_" else "_" for c in question_id)


def ruta_run(raiz: Path, question_id: str) -> Path:
    return raiz / _RUNS / f"{slug_question(question_id)}.json"


def persistir_run(raiz: Path, resultado: ComparisonResult) -> list[str]:
    """Escribe run completo (ruta estable por pregunta), fuentes y auditoría."""
    slug = slug_question(resultado.question_id)

    dir_runs = raiz / _RUNS
    dir_ev = raiz / _EVIDENCIA
    dir_runs.mkdir(parents=True, exist_ok=True)
    dir_ev.mkdir(parents=True, exist_ok=True)

    full = raiz / _RUNS / f"{slug}.json"
    full.write_text(serializar_completo(resultado), encoding="utf-8")

    sources = {
        "case_id": resultado.case_id,
        "question_id": resultado.question_id,
        "perfil": resultado.comparison_profile,
        "classification": resultado.classification,
        "comparison_crs": resultado.comparison_crs,
        "source": resultado.source.as_dict(),
        "target": resultado.target.as_dict() if resultado.target else None,
        "transformation_record": resultado.transformation_record.as_dict(),
        "qa_prereq": resultado.qa_prereq,
        "governance": resultado.governance,
    }
    fuentes = raiz / _EVIDENCIA / f"{slug}_sources.json"
    fuentes.write_text(canonical_json(sources) + "\n", encoding="utf-8")

    audit = raiz / _EVIDENCIA / f"{slug}_audit.md"
    audit.write_text(_texto_auditoria(resultado), encoding="utf-8")

    return [
        f"{_RUNS}/{slug}.json",
        f"{_EVIDENCIA}/{slug}_sources.json",
        f"{_EVIDENCIA}/{slug}_audit.md",
    ]


def _texto_auditoria(resultado: ComparisonResult) -> str:
    lineas = [
        f"# Auditoría de comparación espacial — {resultado.question_id}",
        "",
        f"- motor: {resultado.motor} v{resultado.version}",
        f"- perfil: {resultado.comparison_profile}",
        f"- clasificación: {resultado.classification}",
        f"- case: {resultado.case_id}",
        f"- comparison_run_id: {resultado.comparison_run_id}",
        f"- output_hash: {resultado.output_hash}",
        f"- resultados: {resultado.result} (confianza {resultado.confidence})",
        f"- state_change: {resultado.state_change} · professional_decision: {resultado.professional_decision}",
        "",
        "## Fuentes",
        "",
        f"- {resultado.source.nombre} [{resultado.source.asset_id}] hash={resultado.source.hash_sha256[:16]} crs={resultado.source.crs_declarado}",
    ]
    if resultado.target:
        lineas.append(
            f"- {resultado.target.nombre} [{resultado.target.asset_id}] hash={resultado.target.hash_sha256[:16]} crs={resultado.target.crs_declarado}"
        )
    lineas += [
        "",
        "## Transformación",
        "",
        f"- {resultado.transformation_record.origen} -> {resultado.transformation_record.destino} "
        f"({resultado.transformation_record.motor} {resultado.transformation_record.version}, "
        f"always_xy={resultado.transformation_record.always_xy})",
        "",
        "## Gobernanza",
        "",
    ]
    for k, v in sorted(resultado.governance.items()):
        lineas.append(f"- {k}: {v}")
    if resultado.metrics:
        lineas += ["", "## Métricas", "", "| métrica | unidad | valor |", "|---|---|---|"]
        for m in sorted(resultado.metrics, key=lambda x: x.id):
            lineas.append(f"| {m.id} | {m.unidad} | {m.valor} |")
    lineas += ["", "## Supuestos y limitaciones", ""]
    for a in resultado.assumptions:
        lineas.append(f"- supuesto: {a}")
    for l in resultado.limitations:
        lineas.append(f"- limitación: {l}")
    lineas += ["", "## Divergencias y correspondencias", ""]
    for d in resultado.divergences:
        lineas.append(f"- divergencia: {d}")
    for c in resultado.correspondences:
        lineas.append(f"- correspondencia: {c}")
    for s in resultado.unmatched_segments:
        lineas.append(f"- sin homólogo: {s}")
    lineas += ["", "## Interpretaciones", ""]
    for i in resultado.allowed_interpretations:
        lineas.append(f"- permitida: {i}")
    for i in resultado.forbidden_interpretations:
        lineas.append(f"- prohibida: {i}")
    lineas.append("")
    return "\n".join(lineas)


def append_ledger(raiz: Path, resultado: ComparisonResult) -> int:
    """Append serial en comparison-ledger.jsonl; rechaza comparison_run_id duplicado."""
    ledger = raiz / _LEDGER
    lineas = _leer_jsonl(ledger)
    run_ids = [e.get("evidencia") for e in lineas if e.get("grupo") == "comparison"]
    if resultado.comparison_run_id in run_ids:
        raise RuntimeError(f"comparison_run_id duplicado en ledger: {resultado.comparison_run_id!r}")
    numero = max((e.get("linea") or 0) for e in lineas) + 1 if lineas else 1
    entrada = {
        "linea": numero,
        "grupo": "comparison",
        "question_id": resultado.question_id,
        "perfil": resultado.comparison_profile,
        "classification": resultado.classification,
        "resultado": resultado.result,
        "detalle": " | ".join(resultado.razones) if resultado.razones else resultado.result,
        "fecha": _fecha(),
        "metodo": f"HF_SPATIAL_COMPARE_RUNNER v{__version__}",
        "evidencia": resultado.comparison_run_id,
        "output_hash": resultado.output_hash,
        "state_change": False,
    }
    ledger.parent.mkdir(parents=True, exist_ok=True)
    with open(ledger, "a", encoding="utf-8") as f:
        f.write(json.dumps(entrada, ensure_ascii=False) + "\n")
    return numero


def leer_ledger(raiz: Path) -> list[dict]:
    return _leer_jsonl(raiz / _LEDGER)


def escribir_catalogo_perfiles(raiz: Path, perfiles: list[dict]) -> list[str]:
    """Persiste el catálogo declarativo en profiles/*.json."""
    dir_p = raiz / _PERFILES
    dir_p.mkdir(parents=True, exist_ok=True)
    rutas: list[str] = []
    for p in perfiles:
        ruta = dir_p / f"{p['id']}.json"
        ruta.write_text(canonical_json(p) + "\n", encoding="utf-8")
        rutas.append(f"{_PERFILES}/{p['id']}.json")
    return rutas


def _fecha() -> str:
    from datetime import date

    return date.today().isoformat()


__all__ = [
    "persistir_run",
    "append_ledger",
    "leer_ledger",
    "escribir_catalogo_perfiles",
    "ruta_run",
    "slug_question",
    "_LEDGER",
    "_RUNS",
    "_EVIDENCIA",
    "_PERFILES",
]