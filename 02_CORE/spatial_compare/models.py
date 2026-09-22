# -*- coding: utf-8 -*-
"""
models — vocabulario canónico de HF-SPATIAL-COMPARE V1.

Fuente normativa: OT-HF-SPATIAL-COMPARE-001 y
hf.spatial-comparison.result.v1@1.0. Define los únicos resultados, perfiles,
clasificaciones y consumidores válidos del contrato de comparación espacial.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

# ---------------------------------------------------------------- resultados
COMPARABLE = "COMPARABLE"
PARTIALLY_COMPARABLE = "PARTIALLY_COMPARABLE"
NOT_COMPARABLE = "NOT_COMPARABLE"
CORRESPONDENCE_OBSERVED = "CORRESPONDENCE_OBSERVED"
DIVERGENCE_OBSERVED = "DIVERGENCE_OBSERVED"
INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"
REFERENCE_UNAVAILABLE = "REFERENCE_UNAVAILABLE"
TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED = "TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED"
CANDIDATE_WITH_EVIDENCE = "CANDIDATE_WITH_EVIDENCE"
INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE = "INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE"

RESULTADOS_EMITIBLES = frozenset(
    {
        COMPARABLE,
        PARTIALLY_COMPARABLE,
        NOT_COMPARABLE,
        CORRESPONDENCE_OBSERVED,
        DIVERGENCE_OBSERVED,
        INSUFFICIENT_EVIDENCE,
        REFERENCE_UNAVAILABLE,
        TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED,
        CANDIDATE_WITH_EVIDENCE,
        INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE,
    }
)

# Jamás emitidos: un motor aislado sin autoridad no puede adoptar ni acreditar.
RESULTADOS_PROHIBIDOS = frozenset(
    {
        "TRUE_NETWORK",
        "CORRECT_CHANNEL",
        "ADOPTED_SEGMENT",
        "ADOPTED_CELL",
        "TERRITORIALLY_COMPETENT",
    }
)

# ------------------------------------------------------- clasificaciones de run
COMPUTATIONAL_INTERNAL_COMPARISON = "COMPUTATIONAL_INTERNAL_COMPARISON"
TERRITORIAL_CONTRAST_AUDIT = "TERRITORIAL_CONTRAST_AUDIT"
DIAGNOSTIC_COMPARISON = "DIAGNOSTIC_COMPARISON"

CLASIFICACIONES_VALIDAS = frozenset(
    {COMPUTATIONAL_INTERNAL_COMPARISON, TERRITORIAL_CONTRAST_AUDIT, DIAGNOSTIC_COMPARISON}
)

# ---------------------------------------------------------------- confianza
ALTA = "ALTA"
MEDIA = "MEDIA"
BAJA = "BAJA"
CONFIANZAS_VALIDAS = frozenset({ALTA, MEDIA, BAJA})

# ------------------------------------------------------------ contratos y motor
SCHEMA_RESULTADO = "hf.spatial-comparison.result.v1"
SCHEMA_VERSION = "1.0"
CONTRATO = "hf.spatial-comparison.v1@1.0"
MOTOR = "HF_SPATIAL_COMPARE_RUNNER"

COMPARISON_CRS = "EPSG:32618"
CORREDOR_RADIOS_M = (30, 60, 90, 136)

# ------------------------------------------------------------------- perfiles
COMPARE_VECTOR_NETWORKS_V1 = "COMPARE_VECTOR_NETWORKS_V1"
COMPARE_POINT_TO_NETWORKS_V1 = "COMPARE_POINT_TO_NETWORKS_V1"
COMPARE_SEGMENT_CORRESPONDENCE_V1 = "COMPARE_SEGMENT_CORRESPONDENCE_V1"
COMPARE_NETWORK_TO_TERRAIN_V1 = "COMPARE_NETWORK_TO_TERRAIN_V1"
REGISTER_VISUAL_REFERENCE_V1 = "REGISTER_VISUAL_REFERENCE_V1"
COMPARE_D03_CANDIDATES_V1 = "COMPARE_D03_CANDIDATES_V1"

PERFIL_IDS_ESPERADOS = (
    COMPARE_VECTOR_NETWORKS_V1,
    COMPARE_POINT_TO_NETWORKS_V1,
    COMPARE_SEGMENT_CORRESPONDENCE_V1,
    COMPARE_NETWORK_TO_TERRAIN_V1,
    REGISTER_VISUAL_REFERENCE_V1,
    COMPARE_D03_CANDIDATES_V1,
)
PERFIL_IDS_ESPERADOS_SET = frozenset(PERFIL_IDS_ESPERADOS)

# ----------------------------------------------------------------- QA previo
QA_VECTOR_GEOMETRY_V1 = "QA_VECTOR_GEOMETRY_V1"
QA_NETWORK_INTERNAL_V1 = "QA_NETWORK_INTERNAL_V1"
QA_RASTER_GEOREFERENCE_V1 = "QA_RASTER_GEOREFERENCE_V1"
QA_SPATIAL_REFERENCE_V1 = "QA_SPATIAL_REFERENCE_V1"
QA_CARTOGRAPHIC_EVIDENCE_V1 = "QA_CARTOGRAPHIC_EVIDENCE_V1"

# ------------------------------------------------------- consumidores conocidos
HF_CARTO = "HF_CARTO"
HF_GEO_QA = "HF_GEO_QA"
HF_UNCERTAINTY = "HF_UNCERTAINTY"
CALIDAD_SPATIAL = "CALIDAD_SPATIAL"
DIAGNOSTIC = "DIAGNOSTIC"
HISTORICAL_AUDIT = "HISTORICAL_AUDIT"
COMPARISON = "COMPARISON"
TERRITORIAL_CONTRAST_AUDIT = "TERRITORIAL_CONTRAST_AUDIT"
PF02_ADOPTION = "PF02_ADOPTION"
GATE_3 = "GATE_3"
CANONICAL_WATERSHED = "CANONICAL_WATERSHED"
HYDRO_CONSUMPTION = "HYDRO_CONSUMPTION"
DECISION_PROFESIONAL = "DECISION_PROFESIONAL"
EXPEDIENTE = "EXPEDIENTE"
TERRITORIAL_COMPETENCE = "TERRITORIAL_COMPETENCE"

CONSUMIDORES_PERMITIDOS_DEF = frozenset(
    {
        HF_CARTO,
        HF_GEO_QA,
        HF_UNCERTAINTY,
        CALIDAD_SPATIAL,
        DIAGNOSTIC,
        HISTORICAL_AUDIT,
        COMPARISON,
        TERRITORIAL_CONTRAST_AUDIT,
    }
)
CONSUMIDORES_BLOQUEADOS_DEF = frozenset(
    {
        PF02_ADOPTION,
        GATE_3,
        CANONICAL_WATERSHED,
        HYDRO_CONSUMPTION,
        DECISION_PROFESIONAL,
        EXPEDIENTE,
        TERRITORIAL_COMPETENCE,
    }
)

# ----------------------------------------------------------- clases de activos
CLASE_A_CANONICO = "A_CANONICO"
CLASE_B_COMPUTACIONAL = "B_COMPUTACIONAL"
CLASE_C_REFERENCIAL = "C_REFERENCIAL"
CLASE_C_REFERENCIAL_VISUAL = "C_REFERENCIAL_VISUAL"
CLASE_EVIDENCIA = "EVIDENCIA"

CLASES_NO_METRICAS = frozenset({CLASE_C_REFERENCIAL_VISUAL, CLASE_EVIDENCIA, CLASE_C_REFERENCIAL})
ESTADOS_BLOQUEANTES = frozenset(
    {"HISTORICO", "RECHAZADO", "FAIL", "FAIL_ORIENTATION", "SIN_GOBERNANZA", "NO_GOBERNADA"}
)

# ------------------------------------------------------------------- tolerancias
PF01 = {"nombre": "PF-01", "rango_m": "0-30", "exige_acta": False}
PF02 = {"nombre": "PF-02", "rango_m": "30-136", "exige_acta": True}
PF03 = {"nombre": "PF-03", "rango_m": ">136", "exige_acta": True}
TOLERANCIAS_PF_DEF = (PF01, PF02, PF03)

# ------------------------------------------------------------------- excepción
class SpatialCompareError(Exception):
    """Error controlado del motor de comparación espacial."""


@dataclass(frozen=True)
class MetricRecord:
    """Métrica pura determinista con unidad y limitaciones declaradas."""

    id: str
    nombre: str
    unidad: str
    valor: Any
    determinismo: str = "determinista"
    limitaciones: str = ""
    fuente: str = ""

    def as_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "nombre": self.nombre,
            "unidad": self.unidad,
            "valor": self.valor,
            "determinismo": self.determinismo,
            "limitaciones": self.limitaciones,
            "fuente": self.fuente,
        }


@dataclass(frozen=True)
class TransformationRecord:
    """Registro obligatorio de la transformación espacial en memoria."""

    motor: str
    version: str
    always_xy: bool
    origen: str
    destino: str
    datum_origen: str
    datum_destino: str
    metodo: str
    advertencias: tuple[str, ...] = ()
    precision: str = "depende de la librería geodésica y la fuente"

    def as_dict(self) -> dict[str, Any]:
        return {
            "motor": self.motor,
            "version": self.version,
            "always_xy": self.always_xy,
            "origen": self.origen,
            "destino": self.destino,
            "datum_origen": self.datum_origen,
            "datum_destino": self.datum_destino,
            "metodo": self.metodo,
            "advertencias": sorted(set(self.advertencias)),
            "precision": self.precision,
        }


@dataclass(frozen=True)
class SourceRef:
    """Referencia gobernada a un activo espacial usado en la comparación."""

    asset_id: str
    nombre: str
    clase: str
    ruta: str
    hash_sha256: str
    crs_declarado: str | None
    crs_operativo_registro: str | None
    estado_registro: str
    autoridad: str | None
    licencia: str | None

    def as_dict(self) -> dict[str, Any]:
        return {
            "asset_id": self.asset_id,
            "nombre": self.nombre,
            "clase": self.clase,
            "ruta": self.ruta,
            "hash_sha256": self.hash_sha256,
            "crs_declarado": self.crs_declarado,
            "crs_operativo_registro": self.crs_operativo_registro,
            "estado_registro": self.estado_registro,
            "autoridad": self.autoridad,
            "licencia": self.licencia,
        }


@dataclass
class ComparisonResult:
    """Resultado global de una ejecución de perfil de comparación (run)."""

    question_id: str
    case_id: str
    comparison_profile: str
    classification: str
    source: SourceRef
    target: SourceRef | None
    comparison_crs: str
    transformation_record: TransformationRecord
    overlap_extent: dict[str, Any]
    tolerances: list[dict[str, Any]]
    metrics: list[MetricRecord]
    corridors: dict[str, Any]
    assumptions: list[str]
    limitations: list[str]
    divergences: list[str]
    correspondences: list[str]
    unmatched_segments: list[str]
    evidence_refs: list[str]
    qa_prereq: dict[str, Any]
    governance: dict[str, Any]
    result: str
    confidence: str
    allowed_interpretations: list[str]
    forbidden_interpretations: list[str]
    consumers_allowed: list[str]
    consumers_blocked: list[str]
    razones: list[str]
    contract_version: str = CONTRATO
    schema: str = SCHEMA_RESULTADO
    schema_version: str = SCHEMA_VERSION
    motor: str = MOTOR
    version: str = ""
    input_hashes: dict[str, str] = field(default_factory=dict)
    comparison_run_id: str = ""
    output_hash: str = ""
    timestamp: str = ""
    state_change: bool = False
    professional_decision: Any = None

    def __post_init__(self) -> None:
        if self.result in RESULTADOS_PROHIBIDOS:
            raise ValueError(f"resultado prohibido no emitible: {self.result!r}")
        if self.result not in RESULTADOS_EMITIBLES:
            raise ValueError(f"resultado invalido: {self.result!r}")
        if self.classification not in CLASIFICACIONES_VALIDAS:
            raise ValueError(f"clasificacion invalida: {self.classification!r}")
        if self.confidence not in CONFIANZAS_VALIDAS:
            raise ValueError(f"confidence invalida: {self.confidence!r}")

    def to_dict(self) -> dict[str, Any]:
        return {
            "schema": self.schema,
            "schema_version": self.schema_version,
            "contract_version": self.contract_version,
            "motor": self.motor,
            "version": self.version,
            "comparison_run_id": self.comparison_run_id,
            "question_id": self.question_id,
            "case_id": self.case_id,
            "comparison_profile": self.comparison_profile,
            "classification": self.classification,
            "source": self.source.as_dict(),
            "target": self.target.as_dict() if self.target else None,
            "comparison_crs": self.comparison_crs,
            "transformation_record": self.transformation_record.as_dict(),
            "qa_prereq": dict(sorted(self.qa_prereq.items())),
            "overlap_extent": dict(sorted(self.overlap_extent.items())),
            "tolerances": [dict(sorted(t.items())) for t in self.tolerances],
            "metrics": [m.as_dict() for m in self.metrics],
            "corridors": dict(sorted(self.corridors.items())),
            "assumptions": sorted(set(self.assumptions)),
            "limitations": sorted(set(self.limitations)),
            "divergences": sorted(set(self.divergences)),
            "correspondences": sorted(set(self.correspondences)),
            "unmatched_segments": sorted(set(self.unmatched_segments)),
            "evidence_refs": sorted(set(self.evidence_refs)),
            "governance": dict(sorted(self.governance.items())),
            "consumers_allowed": sorted(set(self.consumers_allowed)),
            "consumers_blocked": sorted(set(self.consumers_blocked)),
            "allowed_interpretations": sorted(set(self.allowed_interpretations)),
            "forbidden_interpretations": sorted(set(self.forbidden_interpretations)),
            "result": self.result,
            "confidence": self.confidence,
            "razones": sorted(set(self.razones)),
            "input_hashes": dict(sorted((k, str(v)) for k, v in self.input_hashes.items())),
            "output_hash": self.output_hash,
            "timestamp": self.timestamp,
            "state_change": self.state_change,
            "professional_decision": self.professional_decision,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> "ComparisonResult":
        metrics = [MetricRecord(**m) for m in data.pop("metrics")]
        source = SourceRef(**data.pop("source"))
        target_data = data.pop("target")
        target = SourceRef(**target_data) if target_data else None
        tr = TransformationRecord(**data.pop("transformation_record"))
        return cls(
            metrics=metrics,
            source=source,
            target=target,
            transformation_record=tr,
            **data,
        )


__all__ = [
    "COMPARABLE",
    "PARTIALLY_COMPARABLE",
    "NOT_COMPARABLE",
    "CORRESPONDENCE_OBSERVED",
    "DIVERGENCE_OBSERVED",
    "INSUFFICIENT_EVIDENCE",
    "REFERENCE_UNAVAILABLE",
    "TERRITORIAL_COMPETENCE_NOT_DEMONSTRATED",
    "CANDIDATE_WITH_EVIDENCE",
    "INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE",
    "RESULTADOS_EMITIBLES",
    "RESULTADOS_PROHIBIDOS",
    "COMPUTATIONAL_INTERNAL_COMPARISON",
    "TERRITORIAL_CONTRAST_AUDIT",
    "DIAGNOSTIC_COMPARISON",
    "CLASIFICACIONES_VALIDAS",
    "ALTA",
    "MEDIA",
    "BAJA",
    "CONFIANZAS_VALIDAS",
    "SCHEMA_RESULTADO",
    "SCHEMA_VERSION",
    "CONTRATO",
    "MOTOR",
    "COMPARISON_CRS",
    "CORREDOR_RADIOS_M",
    "COMPARE_VECTOR_NETWORKS_V1",
    "COMPARE_POINT_TO_NETWORKS_V1",
    "COMPARE_SEGMENT_CORRESPONDENCE_V1",
    "COMPARE_NETWORK_TO_TERRAIN_V1",
    "REGISTER_VISUAL_REFERENCE_V1",
    "COMPARE_D03_CANDIDATES_V1",
    "PERFIL_IDS_ESPERADOS",
    "PERFIL_IDS_ESPERADOS_SET",
    "QA_VECTOR_GEOMETRY_V1",
    "QA_NETWORK_INTERNAL_V1",
    "QA_RASTER_GEOREFERENCE_V1",
    "QA_SPATIAL_REFERENCE_V1",
    "QA_CARTOGRAPHIC_EVIDENCE_V1",
    "HF_CARTO",
    "HF_GEO_QA",
    "HF_UNCERTAINTY",
    "CALIDAD_SPATIAL",
    "DIAGNOSTIC",
    "HISTORICAL_AUDIT",
    "COMPARISON",
    "TERRITORIAL_CONTRAST_AUDIT",
    "PF02_ADOPTION",
    "GATE_3",
    "CANONICAL_WATERSHED",
    "HYDRO_CONSUMPTION",
    "DECISION_PROFESIONAL",
    "EXPEDIENTE",
    "TERRITORIAL_COMPETENCE",
    "CONSUMIDORES_PERMITIDOS_DEF",
    "CONSUMIDORES_BLOQUEADOS_DEF",
    "CLASE_A_CANONICO",
    "CLASE_B_COMPUTACIONAL",
    "CLASE_C_REFERENCIAL",
    "CLASE_C_REFERENCIAL_VISUAL",
    "CLASE_EVIDENCIA",
    "CLASES_NO_METRICAS",
    "ESTADOS_BLOQUEANTES",
    "PF01",
    "PF02",
    "PF03",
    "TOLERANCIAS_PF_DEF",
    "SpatialCompareError",
    "MetricRecord",
    "TransformationRecord",
    "SourceRef",
    "ComparisonResult",
]