# -*- coding: utf-8 -*-
"""
result — serialización canónica determinista y validación del QA.

Determinismo (hf.geo-qa.result.v1):
- JSON canónico: claves ordenadas, separadores compactos, UTF-8 sin escapes,
  lista final terminada en salto de línea (estilo portability).
- qa_run_id = SHORT(sha256(material_stable)) con 16 hex.
- output_hash = sha256(material con qa_run_id fijado, excluyendo timestamp).
- timestamp, qa_run_id y output_hash se EXCLUYEN del material estable y, por
  tanto, no contaminan el hash de verificación.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any

from .models import (
    RESULTADOS_CHECK_PERMITIDOS,
    RESULTADOS_PERMITIDOS,
    SEVERIDADES_VALIDAS,
    SCHEMA_RESULTADO,
    QaResult,
)


def canonical_json(obj: Any) -> str:
    """JSON canónico determinista (orden de claves, compacto, UTF-8)."""
    return json.dumps(
        obj,
        sort_keys=True,
        ensure_ascii=False,
        separators=(",", ":"),
    )


def _sha(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def material_stable(qa: QaResult) -> dict[str, Any]:
    """Material de resultado SIN timestamp, qa_run_id ni output_hash."""
    return {
        "schema": qa.schema,
        "schema_version": qa.schema_version,
        "contract_version": qa.contract_version,
        "motor": qa.motor,
        "version": qa.version,
        "case_id": qa.case_id,
        "asset_id": qa.asset_id,
        "asset_hash": qa.asset_hash,
        "qa_profile": qa.qa_profile,
        "checks": [c.as_dict() for c in qa.checks],
        "resultado": qa.resultado,
        "severidad": qa.severidad,
        "razones": sorted(set(qa.razones)),
        "evidencia": sorted(set(qa.evidencia)),
        "restricciones": sorted(set(qa.restricciones)),
        "consumidores_permitidos": sorted(set(qa.consumidores_permitidos)),
        "consumidores_bloqueados": sorted(set(qa.consumidores_bloqueados)),
        "input_hashes": dict(sorted((k, str(v)) for k, v in qa.input_hashes.items())),
        "state_change": qa.state_change,
        "professional_decision": qa.professional_decision,
    }


def material_con_run_id(qa: QaResult) -> dict[str, Any]:
    """Material estable + qa_run_id fijado (para output_hash)."""
    base = material_stable(qa)
    base["qa_run_id"] = qa.qa_run_id
    return base


def calcular_qa_run_id(qa: QaResult) -> str:
    return _sha(canonical_json(material_stable(qa)))[:16]


def calcular_output_hash(qa: QaResult) -> str:
    return _sha(canonical_json(material_con_run_id(qa)))


def serializar_qa_sin_firma(qa: QaResult) -> str:
    """JSON canónico del material con qa_run_id, sin timestamp, terminado en LF."""
    marcado = _formato_corto(qa)
    return canonical_json(marcado) + "\n"


def _formato_corto(qa: QaResult) -> dict[str, Any]:
    """Forma de intercambio: sin compresión de ids; idéntica a to_dict salvo firmas."""
    return {
        "schema": qa.schema,
        "schema_version": qa.schema_version,
        "contract_version": qa.contract_version,
        "motor": qa.motor,
        "version": qa.version,
        "case_id": qa.case_id,
        "asset_id": qa.asset_id,
        "asset_hash": qa.asset_hash,
        "qa_profile": qa.qa_profile,
        "checks": [c.as_dict() for c in qa.checks],
        "resultado": qa.resultado,
        "severidad": qa.severidad,
        "razones": sorted(set(qa.razones)),
        "evidencia": sorted(set(qa.evidencia)),
        "restricciones": sorted(set(qa.restricciones)),
        "consumidores_permitidos": sorted(set(qa.consumidores_permitidos)),
        "consumidores_bloqueados": sorted(set(qa.consumidores_bloqueados)),
        "input_hashes": dict(sorted((k, str(v)) for k, v in qa.input_hashes.items())),
        "qa_run_id": qa.qa_run_id,
        "output_hash": qa.output_hash,
        "timestamp": qa.timestamp,
        "state_change": qa.state_change,
        "professional_decision": qa.professional_decision,
    }


def validar_shape_dict(resultado: dict[str, Any]) -> list[str]:
    """Valida estructura de un dict de resultado; devuelve lista de errores."""
    errores: list[str] = []
    if resultado.get("schema") != SCHEMA_RESULTADO:
        errores.append("schema != hf.geo-qa.result.v1")
    if resultado.get("schema_version") != "1.0":
        errores.append("schema_version != 1.0")
    if resultado.get("resultado") not in RESULTADOS_PERMITIDOS:
        errores.append(f"resultado invalido: {resultado.get('resultado')!r}")
    severidad = resultado.get("severidad")
    if severidad not in SEVERIDADES_VALIDAS:
        errores.append(f"severidad invalida: {severidad!r}")
    for c in resultado.get("checks", []):
        if c.get("resultado") not in RESULTADOS_CHECK_PERMITIDOS:
            errores.append(f"check {c.get('check_id')!r}: resultado de check invalido")
        if c.get("severidad") not in SEVERIDADES_VALIDAS:
            errores.append(f"check {c.get('check_id')!r}: severidad invalida")
    if not resultado.get("evidencia"):
        errores.append("evidencia vacia (obligatorio registrar evidencia)")
    return errores


def validar_invariantes(qa: QaResult) -> list[str]:
    """Valida las firmas e invariantes de determinismo de un QaResult."""
    errores: list[str] = []
    esperado_run = calcular_qa_run_id(qa)
    if qa.qa_run_id != esperado_run:
        errores.append(f"qa_run_id no coincide: {qa.qa_run_id!r} != {esperado_run!r}")
    esperado_out = calcular_output_hash(qa)
    if qa.output_hash != esperado_out:
        errores.append("output_hash no coincide con el material fijado")
    if qa.state_change:
        errores.append("state_change debe ser false")
    if qa.professional_decision is not None:
        errores.append("professional_decision debe ser null")
    errores.extend(validar_shape_dict(qa.to_dict()))
    return errores


__all__ = [
    "canonical_json",
    "material_stable",
    "material_con_run_id",
    "calcular_qa_run_id",
    "calcular_output_hash",
    "serializar_qa_sin_firma",
    "validar_shape_dict",
    "validar_invariantes",
]