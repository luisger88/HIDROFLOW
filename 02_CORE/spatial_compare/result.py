# -*- coding: utf-8 -*-
"""
result — serialización canónica determinista y validación del resultado.

Determinismo (hf.spatial-comparison.result.v1):
- JSON canónico: claves ordenadas, separadores compactos, UTF-8 sin escapes.
- comparison_run_id = SHORT(sha256(material_stable)) con 16 hex.
- output_hash = sha256(material con comparison_run_id fijado).
- timestamp, comparison_run_id y output_hash se EXCLUYEN del material estable.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any

from .models import (
    CLASIFICACIONES_VALIDAS,
    RESULTADOS_EMITIBLES,
    RESULTADOS_PROHIBIDOS,
    SCHEMA_RESULTADO,
    SCHEMA_VERSION,
    ComparisonResult,
)


def canonical_json(obj: Any) -> str:
    """JSON canónico determinista (orden de claves, compacto, UTF-8)."""
    return json.dumps(obj, sort_keys=True, ensure_ascii=False, separators=(",", ":"))


def _sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def material_stable(resultado: ComparisonResult) -> dict[str, Any]:
    """Material de resultado SIN timestamp, comparison_run_id ni output_hash."""
    d = resultado.to_dict()
    d.pop("timestamp", None)
    d.pop("comparison_run_id", None)
    d.pop("output_hash", None)
    return d


def material_con_run_id(resultado: ComparisonResult) -> dict[str, Any]:
    """Material estable + comparison_run_id fijado (para output_hash)."""
    base = material_stable(resultado)
    base["comparison_run_id"] = resultado.comparison_run_id
    return base


def calcular_comparison_run_id(resultado: ComparisonResult) -> str:
    return _sha(canonical_json(material_stable(resultado)))[:16]


def calcular_output_hash(resultado: ComparisonResult) -> str:
    return _sha(canonical_json(material_con_run_id(resultado)))


def serializar_sin_firma(resultado: ComparisonResult) -> str:
    """JSON canónico del material con comparison_run_id, sin timestamp, con LF."""
    d = material_con_run_id(resultado)
    d.pop("timestamp", None)
    return canonical_json(d) + "\n"


def serializar_completo(resultado: ComparisonResult) -> str:
    """JSON canónico completo (incluye timestamp) con salto final."""
    return canonical_json(resultado.to_dict()) + "\n"


def validar_shape_dict(resultado: dict[str, Any]) -> list[str]:
    """Valida estructura de un dict de resultado; devuelve lista de errores."""
    errores: list[str] = []
    if resultado.get("schema") != SCHEMA_RESULTADO:
        errores.append("schema != hf.spatial-comparison.result.v1")
    if resultado.get("schema_version") != SCHEMA_VERSION:
        errores.append("schema_version != 1.0")
    if resultado.get("result") not in RESULTADOS_EMITIBLES:
        errores.append(f"result invalido: {resultado.get('result')!r}")
    if resultado.get("result") in RESULTADOS_PROHIBIDOS:
        errores.append(f"result prohibido: {resultado.get('result')!r}")
    if resultado.get("classification") not in CLASIFICACIONES_VALIDAS:
        errores.append(f"classification invalida: {resultado.get('classification')!r}")
    if not resultado.get("source"):
        errores.append("source obligatorio")
    if not resultado.get("transformation_record"):
        errores.append("transformation_record obligatorio")
    if not resultado.get("qa_prereq"):
        errores.append("qa_prereq obligatorio")
    if not resultado.get("overlap_extent"):
        errores.append("overlap_extent obligatorio")
    if not resultado.get("tolerances"):
        errores.append("tolerances obligatorio")
    if not resultado.get("evidence_refs"):
        errores.append("evidence_refs vacia (obligatorio registrar evidencia)")
    if resultado.get("state_change"):
        errores.append("state_change debe ser false")
    if resultado.get("professional_decision") is not None:
        errores.append("professional_decision debe ser null")
    return errores


def validar_invariantes(resultado: ComparisonResult) -> list[str]:
    """Valida firmas e invariantes de determinismo de un ComparisonResult."""
    errores: list[str] = []
    esperado_run = calcular_comparison_run_id(resultado)
    if resultado.comparison_run_id != esperado_run:
        errores.append(
            f"comparison_run_id no coincide: {resultado.comparison_run_id!r} != {esperado_run!r}"
        )
    esperado_out = calcular_output_hash(resultado)
    if resultado.output_hash != esperado_out:
        errores.append("output_hash no coincide con el material fijado")
    errores.extend(validar_shape_dict(resultado.to_dict()))
    return errores


__all__ = [
    "canonical_json",
    "material_stable",
    "material_con_run_id",
    "calcular_comparison_run_id",
    "calcular_output_hash",
    "serializar_sin_firma",
    "serializar_completo",
    "validar_shape_dict",
    "validar_invariantes",
]