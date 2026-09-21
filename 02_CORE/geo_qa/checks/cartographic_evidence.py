# -*- coding: utf-8 -*-
"""
checks/cartographic_evidence — evidencia cartográfica V1 (entrada declarativa).

Contrato hf.geo-qa.carto.v1@1.0. NO aplica visión artificial: el productor
declara la presencia/estado de cada elemento. El mecanismo de orientación es
el único bloqueo duro:

    north_arrow_present=true y (north_arrow_verified=false o
    north_arrow_direction != map_north_direction)
        => FAIL_ORIENTATION CRITICAL
        => bloquea SNAP_DECISION, PF02_ADOPTION, GATE_3,
           CANONICAL_WATERSHED, CARTOGRAPHIC_REPORT
        => permite HISTORICAL_AUDIT, DIAGNOSTIC, COMPARISON, RUPTURE_EVIDENCE
"""

from __future__ import annotations

from ..models import (
    PASS,
    CONDICIONAL,
    FAIL,
    FAIL_ORIENTATION,
    INFO,
    CRITICAL,
    WARNING,
    CARTOGRAPHIC_REPORT,
    CANONICAL_WATERSHED,
    COMPARISON,
    DIAGNOSTIC,
    GATE_3,
    HISTORICAL_AUDIT,
    PF02_ADOPTION,
    RUPTURE_EVIDENCE,
    SNAP_DECISION,
    CheckResult,
)

_BLOQUEADOS = (SNAP_DECISION, PF02_ADOPTION, GATE_3, CANONICAL_WATERSHED, CARTOGRAPHIC_REPORT)
_PERMITIDOS = (HISTORICAL_AUDIT, DIAGNOSTIC, COMPARISON, RUPTURE_EVIDENCE)
_GRP_O = "orientacion"
_GRP_R = "representacion"


def _decl(ctx: dict) -> dict:
    return ctx.get("decl") or {}


def orientacion_norte(ctx: dict) -> CheckResult:
    decl = _decl(ctx)
    present = decl.get("north_arrow_present") is True
    if not present:
        return CheckResult(
            check_id="orientacion_norte",
            grupo=_GRP_O,
            resultado=PASS,
            severidad=INFO,
            detalle="Flecha norte declarada como NUNCA presente",
        )
    verified = decl.get("north_arrow_verified")
    direction = decl.get("north_arrow_direction")
    mapa = decl.get("map_north_direction", "north")
    if not verified:
        return CheckResult(
            check_id="orientacion_norte",
            grupo=_GRP_O,
            resultado=FAIL_ORIENTATION,
            severidad=CRITICAL,
            detalle="Flecha norte presente pero sin verificación de dirección",
            razon="La evidencia cartográfica no demostró la orientación del norte",
            evidence_refs=("spatial-data-registry.json", "manifiesto_gate02"),
            consumers_blocked=_BLOQUEADOS,
            consumers_allowed=_PERMITIDOS,
        )
    if direction != mapa:
        return CheckResult(
            check_id="orientacion_norte",
            grupo=_GRP_O,
            resultado=FAIL_ORIENTATION,
            severidad=CRITICAL,
            detalle=f"Flecha norte {direction!r} != norte del mapa {mapa!r}",
            razon="La representación está invertida: el norte marcado no coincide con el norte del mapa",
            evidence_refs=("spatial-data-registry.json", "manifiesto_gate02"),
            consumers_blocked=_BLOQUEADOS,
            consumers_allowed=_PERMITIDOS,
        )
    return CheckResult(
        check_id="orientacion_norte",
        grupo=_GRP_O,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Flecha norte verificada ({direction!r} == {mapa!r})",
    )


def _presente_binario(ctx: dict, check_id: str, campo: str, etiqueta: str) -> CheckResult:
    if _decl(ctx).get(campo) is True:
        return CheckResult(
            check_id=check_id,
            grupo=_GRP_R,
            resultado=PASS,
            severidad=INFO,
            detalle=f"{etiqueta} presente",
        )
    return CheckResult(
        check_id=check_id,
        grupo=_GRP_R,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle=f"{etiqueta} no declarado por el productor",
        razon="Elemento cartográfico requerido para decisiones; ausencia advierte degradación",
    )


def escala_presente(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "escala_presente", "scale_present", "Escala")


def crs_visible(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "crs_visible", "crs_visible", "Sistema de referencia visible")


def coordenadas_visibles(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "coordenadas_visibles", "coordinates_visible", "Coordenadas visibles")


def leyenda_presente(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "leyenda_presente", "legend_present", "Leyenda")


def fuente_presente(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "fuente_presente", "source_present", "Fuente de datos")


def autoridad_presente(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "autoridad_presente", "authority_present", "Autoridad responsable")


def limitaciones_presentes(ctx: dict) -> CheckResult:
    return _presente_binario(ctx, "limitaciones_presentes", "limitations_present", "Limitaciones")


def evidencia_historica_gobernada(ctx: dict) -> CheckResult:
    decl = _decl(ctx)
    if decl.get("estado") in ("HISTORICO", "HISTORICAL"):
        return CheckResult(
            check_id="evidencia_historica_gobernada",
            grupo=_GRP_O,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Evidencia histórica ({decl.get('estado')}) gobernada por FAIL_ORIENTATION",
        )
    return CheckResult(
        check_id="evidencia_historica_gobernada",
        grupo=_GRP_O,
        resultado=PASS,
        severidad=INFO,
        detalle="Evidencia cartográfica catalogada para auditoría",
    )


__all__ = [
    "orientacion_norte",
    "escala_presente",
    "crs_visible",
    "coordenadas_visibles",
    "leyenda_presente",
    "fuente_presente",
    "autoridad_presente",
    "limitaciones_presentes",
    "evidencia_historica_gobernada",
]