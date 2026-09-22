# -*- coding: utf-8 -*-
"""
result — serialización canónica y firmas del assessment de fuente.

Contrato `hf.spatial-source-assessment.v1`. Firma determinista:

  assessment_id = SHORT( sha256( material_stable ) )  # 16 hex
  output_hash   = sha256( canonical_json(doc completo) )

El *material estable* excluye los elementos volátiles (fecha de ejecución,
assessment_id, evidencia física y firmas) para que la re-ejecución sobre la
misma fuente produzca idéntica firma aunque el registro ya esté persistido.

Este módulo no depende de portability.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field

from .models import (
    ASSESSMENT_TYPE,
    CONTRACT_VERSION,
    MOTOR,
    MOTOR_VERSION,
    OT,
    SCHEMA,
    SCHEMA_VERSION,
    canonical_json,
    sha256_texto,
)

# Campos que nunca participan del material estable.
CAMPOS_VOLATILES = ("fecha_utc", "assessment_id", "evidencia", "firmas")


@dataclass
class AssessmentResult:
    """Resultado completo de un assessment de fuente externa."""

    schema: str = SCHEMA
    schema_version: str = SCHEMA_VERSION
    motor: str = MOTOR
    version: str = MOTOR_VERSION
    ot: str = OT
    caso_id: str = ""
    assessment_type: str = ASSESSMENT_TYPE
    assessment_id: str = ""
    state_change: bool = False
    professional_decision: object = None
    fecha_utc: str = ""
    # -- secciones deterministas --
    identificacion: dict = field(default_factory=dict)
    hashes: dict = field(default_factory=dict)
    metadata_tecnica: dict = field(default_factory=dict)
    crs: dict = field(default_factory=dict)
    cobertura: dict = field(default_factory=dict)
    proveniencia: dict = field(default_factory=dict)
    licenciamiento: dict = field(default_factory=dict)
    qa: dict = field(default_factory=dict)
    restricciones: list = field(default_factory=list)
    aptitud: dict = field(default_factory=dict)
    resolucion: dict = field(default_factory=dict)
    motores: dict = field(default_factory=dict)
    # -- no participan del material --
    evidencia: dict = field(default_factory=dict)
    firmas: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "schema": self.schema,
            "schema_version": self.schema_version,
            "contract": CONTRACT_VERSION,
            "ot": self.ot,
            "caso_id": self.caso_id,
            "assessment_type": self.assessment_type,
            "assessment_id": self.assessment_id,
            "state_change": self.state_change,
            "professional_decision": self.professional_decision,
            "fecha_utc": self.fecha_utc,
            "identificacion": self.identificacion,
            "hashes": self.hashes,
            "metadata_tecnica": self.metadata_tecnica,
            "crs": self.crs,
            "cobertura": self.cobertura,
            "proveniencia": self.proveniencia,
            "licenciamiento": self.licenciamiento,
            "qa": self.qa,
            "restricciones": self.restricciones,
            "aptitud": self.aptitud,
            "resolucion": self.resolucion,
            "motores": self.motores,
            "evidencia": self.evidencia,
            "firmas": self.firmas,
        }

    @classmethod
    def from_dict(cls, doc: dict) -> "AssessmentResult":
        obj = cls()
        for k, v in doc.items():
            if hasattr(obj, k):
                setattr(obj, k, v)
        return obj

    def material_stable(self) -> dict:
        """Copia del documento sin campos volátiles."""
        doc = self.to_dict()
        for campo in CAMPOS_VOLATILES:
            doc.pop(campo, None)
        return doc


def calcular_assessment_id(res: AssessmentResult) -> str:
    """SHA-256 del material estable, truncado a 16 hex."""
    material = canonical_json(res.material_stable())
    return sha256_texto(material)[:16]


def calcular_output_hash(res: AssessmentResult) -> str:
    """SHA-256 del documento completo (material estable + assessment_id);
    las firmas no participan para evitar auto-referencia."""
    doc = res.to_dict()
    doc["assessment_id"] = res.assessment_id or calcular_assessment_id(res)
    doc["firmas"] = {}
    return sha256_texto(canonical_json(doc))


def serializar_sin_firma(res: AssessmentResult) -> str:
    """Documento canónico sin firmas (assessment_id vacío, firmas vacías)."""
    doc = res.to_dict()
    doc["assessment_id"] = ""
    doc["firmas"] = {}
    return canonical_json(doc)


def serializar_firmado(res: AssessmentResult) -> str:
    """Documento canónico firmado (assessment_id y output_hash presentes)."""
    doc = res.to_dict()
    doc["assessment_id"] = res.assessment_id or calcular_assessment_id(res)
    doc["firmas"] = {
        "output_hash": res.firmas.get("output_hash")
        or calcular_output_hash(res),
        "algoritmo": "sha256",
    }
    return canonical_json(doc)


# ---------------------------------------------------------------------------
# Invariantes del resultado (análogo a spatial_compare.result.validar_invariantes).
# ---------------------------------------------------------------------------

_HEX16 = re.compile(r"^[0-9a-f]{16}$")
_HEX64 = re.compile(r"^[0-9a-f]{64}$")


def validar_invariantes(res: AssessmentResult) -> list[str]:
    """Devuelve lista de errores de invariante (vacía si todo correcto)."""
    errores: list[str] = []
    if res.schema != SCHEMA:
        errores.append(f"schema inválido: {res.schema!r}")
    if res.assessment_type != ASSESSMENT_TYPE:
        errores.append(f"assessment_type inválido: {res.assessment_type!r}")
    if res.assessment_id and not _HEX16.match(res.assessment_id):
        errores.append(f"assessment_id no es 16 hex: {res.assessment_id!r}")
    if res.state_change is not False:
        errores.append("state_change debe ser false")
    if res.professional_decision is not None:
        errores.append("professional_decision debe ser null")
    if res.aptitud.get("resultado") not in _APTITUD_VALIDAS:
        errores.append(f"aptitud fuera del vocabulario: {res.aptitud.get('resultado')!r}")
    if not res.crs.get("resultado"):
        errores.append("crs sin resultado")
    if not res.cobertura.get("resultado"):
        errores.append("cobertura sin resultado")
    if res.licenciamiento.get("license_status") != "LICENSE_UNKNOWN":
        errores.append("licencia de la fuente debe permanecer UNKNOWN (no inventada)")
    return errores


_APTITUD_VALIDAS = {
    "NO_EVALUADA",
    "NOT_APT_FOR_COMPARISON",
    "CONDITIONALLY_APT_FOR_COMPARISON",
    "APT_FOR_TERRITORIAL_COMPARISON",
}


__all__ = [
    "AssessmentResult", "calcular_assessment_id", "calcular_output_hash",
    "serializar_sin_firma", "serializar_firmado", "validar_invariantes",
    "CAMPOS_VOLATILES",
]