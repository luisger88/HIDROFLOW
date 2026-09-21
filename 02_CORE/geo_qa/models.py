# -*- coding: utf-8 -*-
"""
models — vocabulario canónico de HF-GEO-QA V1.

Fuente normativa: DOCTRINA 77 (DO-77-COMMIT-v1), Perfect Moment 55 (PM-55-v1)
y OT-HF-GEO-QA-001. Define los únicos resultados y severidades válidos del
contrato hf.geo-qa.result.v1@1.0.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

# ---------------------------------------------------------------- resultados
PASS = "PASS"
CONDICIONAL = "CONDICIONAL"
FAIL = "FAIL"
FAIL_ORIENTATION = "FAIL_ORIENTATION"
INTERNALLY_VALIDATED = "INTERNALLY_VALIDATED"
INTERNALLY_VALIDATED_WITH_RESTRICTIONS = "INTERNALLY_VALIDATED_WITH_RESTRICTIONS"

RESULTADOS_PERMITIDOS = frozenset(
    {
        PASS,
        CONDICIONAL,
        FAIL,
        FAIL_ORIENTATION,
        INTERNALLY_VALIDATED,
        INTERNALLY_VALIDATED_WITH_RESTRICTIONS,
    }
)

# Nucles: cada check puede terminar en PASS, CONDICIONAL, FAIL o
# FAIL_ORIENTATION. Los INTERNALLY_VALIDATED* solo aplican como resultado
# global de perfil (nivel perfil), nunca como resultado de un check aislado.
RESULTADOS_CHECK_PERMITIDOS = frozenset({PASS, CONDICIONAL, FAIL, FAIL_ORIENTATION})

# ---------------------------------------------------------------- severidades
INFO = "INFO"
WARNING = "WARNING"
ERROR = "ERROR"
CRITICAL = "CRITICAL"

SEVERIDADES = {"INFO": 0, "WARNING": 1, "ERROR": 2, "CRITICAL": 3}
SEVERIDADES_VALIDAS = frozenset(SEVERIDADES)

# ------------------------------------------------------------ contratos y motor
SCHEMA_RESULTADO = "hf.geo-qa.result.v1"
SCHEMA_VERSION = "1.0"
CONTRATO = "hf.geo-qa.v1@1.0"
MOTOR = "HF_GEO_QA_RUNNER"

# ---------------------------------------------------------------- restricciones fijas
RESTRICCION_TERRITORIAL = "TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED"

# ------------------------------------------------------- consumidores conocidos
CALIDAD_SPATIAL = "CALIDAD_SPATIAL"
DEM = "DEM"
HIDROGRAFIA = "HIDROGRAFIA"
SNAP_DECISION = "SNAP_DECISION"
PF02_ADOPTION = "PF02_ADOPTION"
GATE_2 = "GATE_2"
GATE_3 = "GATE_3"
CANONICAL_WATERSHED = "CANONICAL_WATERSHED"
TERRITORIAL_COMPETENCE = "TERRITORIAL_COMPETENCE"
CARTOGRAPHIC_REPORT = "CARTOGRAPHIC_REPORT"
HYDRO_CONSUMPTION = "HYDRO_CONSUMPTION"
DECISION_PROFESIONAL = "DECISION_PROFESIONAL"
PROPOSED_CELL_SELECTION = "PROPOSED_CELL_SELECTION"
HISTORICAL_AUDIT = "HISTORICAL_AUDIT"
DIAGNOSTIC = "DIAGNOSTIC"
COMPARISON = "COMPARISON"
RUPTURE_EVIDENCE = "RUPTURE_EVIDENCE"
EXPEDIENTE = "EXPEDIENTE"

# Columna CANONICAL_WATERSHED / competencia: siempre bloqueada mientras no se
# demuestre competencia territorial (regla de contrato).
CONSUMIDORES_BLOQUEADOS_RED = frozenset(
    {EXPEDIENTE, DECISION_PROFESIONAL, CANONICAL_WATERSHED, TERRITORIAL_COMPETENCE}
)
CONSUMIDORES_PERMITIDOS_RED = frozenset({DIAGNOSTIC, COMPARISON, HISTORICAL_AUDIT})


@dataclass(frozen=True)
class CheckResult:
    """Resultado atómico de un check (nivel check)."""

    check_id: str
    grupo: str
    resultado: str
    severidad: str
    detalle: str = ""
    razon: str = ""
    evidence_refs: tuple[str, ...] = ()
    consumers_affected: tuple[str, ...] = ()
    consumers_allowed: tuple[str, ...] = ()
    consumers_blocked: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if self.resultado not in RESULTADOS_CHECK_PERMITIDOS:
            raise ValueError(f"resultado de check invalido: {self.resultado!r}")
        if self.severidad not in SEVERIDADES_VALIDAS:
            raise ValueError(f"severidad invalida: {self.severidad!r}")

    def as_dict(self) -> dict[str, Any]:
        return {
            "check_id": self.check_id,
            "grupo": self.grupo,
            "resultado": self.resultado,
            "severidad": self.severidad,
            "detalle": self.detalle,
            "razon": self.razon,
            "evidence_refs": sorted(set(self.evidence_refs)),
            "consumers_affected": sorted(set(self.consumers_affected)),
            "consumers_allowed": sorted(set(self.consumers_allowed)),
            "consumers_blocked": sorted(set(self.consumers_blocked)),
        }


@dataclass
class QaResult:
    """Resultado global de una ejecución de perfil QA (nivel perfil)."""

    case_id: str
    asset_id: str
    asset_hash: str
    qa_profile: str
    checks: list[CheckResult]
    resultado: str
    razones: list[str]
    evidencia: list[str]
    restricciones: list[str]
    consumidores_permitidos: list[str]
    consumidores_bloqueados: list[str]
    severidad: str = WARNING
    contract_version: str = CONTRATO
    schema: str = SCHEMA_RESULTADO
    schema_version: str = SCHEMA_VERSION
    motor: str = MOTOR
    version: str = ""
    input_hashes: dict[str, str] = field(default_factory=dict)
    qa_run_id: str = ""
    output_hash: str = ""
    timestamp: str = ""
    state_change: bool = False
    professional_decision: Any = None

    def __post_init__(self) -> None:
        if self.resultado not in RESULTADOS_PERMITIDOS:
            raise ValueError(f"resultado global invalido: {self.resultado!r}")
        if self.qa_profile not in {"snap_decision", "raster_georef", "cartographic_evidence", "vector_geometry", "network_internal", "gate02_diagnostic"}:
            # Se tolera dentro del registry reservado; validación estricta en registry.
            pass

    def to_dict(self) -> dict[str, Any]:
        return {
            "schema": self.schema,
            "schema_version": self.schema_version,
            "contract_version": self.contract_version,
            "motor": self.motor,
            "version": self.version,
            "case_id": self.case_id,
            "asset_id": self.asset_id,
            "asset_hash": self.asset_hash,
            "qa_profile": self.qa_profile,
            "checks": [c.as_dict() for c in self.checks],
            "resultado": self.resultado,
            "severidad": self.severidad,
            "razones": sorted(set(self.razones)),
            "evidencia": sorted(set(self.evidencia)),
            "restricciones": sorted(set(self.restricciones)),
            "consumidores_permitidos": sorted(set(self.consumidores_permitidos)),
            "consumidores_bloqueados": sorted(set(self.consumidores_bloqueados)),
            "input_hashes": dict(sorted((k, str(v)) for k, v in self.input_hashes.items())),
            "qa_run_id": self.qa_run_id,
            "output_hash": self.output_hash,
            "timestamp": self.timestamp,
            "state_change": self.state_change,
            "professional_decision": self.professional_decision,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]):
        checks = [CheckResult(**c) for c in data.pop("checks")]
        return cls(checks=checks, **data)


__all__ = [
    "PASS",
    "CONDICIONAL",
    "FAIL",
    "FAIL_ORIENTATION",
    "INTERNALLY_VALIDATED",
    "INTERNALLY_VALIDATED_WITH_RESTRICTIONS",
    "RESULTADOS_PERMITIDOS",
    "RESULTADOS_CHECK_PERMITIDOS",
    "INFO",
    "WARNING",
    "ERROR",
    "CRITICAL",
    "SEVERIDADES",
    "SEVERIDADES_VALIDAS",
    "SCHEMA_RESULTADO",
    "SCHEMA_VERSION",
    "CONTRATO",
    "MOTOR",
    "RESTRICCION_TERRITORIAL",
    "SNAP_DECISION",
    "PF02_ADOPTION",
    "GATE_2",
    "GATE_3",
    "CANONICAL_WATERSHED",
    "TERRITORIAL_COMPETENCE",
    "CARTOGRAPHIC_REPORT",
    "HYDRO_CONSUMPTION",
    "DECISION_PROFESIONAL",
    "PROPOSED_CELL_SELECTION",
    "HISTORICAL_AUDIT",
    "DIAGNOSTIC",
    "COMPARISON",
    "RUPTURE_EVIDENCE",
    "EXPEDIENTE",
    "CONSUMIDORES_BLOQUEADOS_RED",
    "CONSUMIDORES_PERMITIDOS_RED",
    "CheckResult",
    "QaResult",
]