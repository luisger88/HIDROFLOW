# -*- coding: utf-8 -*-
"""
governance — compuerta de gobernanza de fuentes para comparación métrica.

Una fuente solo produce métricas si cumple: clase computacional/canónica,
estado no bloqueante, licencia conocida (nunca UNKNOWN), autoridad declarada,
CRS gobernado (EPSG simple) y referencia espacial declarada. Cualquier fallo
produce una auditoría sin métricas (INSUFFICIENT_EVIDENCE / REFERENCE_UNAVAILABLE).
"""

from __future__ import annotations

from typing import Any

from .models import (
    CLASES_NO_METRICAS,
    ESTADOS_BLOQUEANTES,
    CLASE_A_CANONICO,
    CLASE_B_COMPUTACIONAL,
)
from .transforms import es_crs_gobernado


def cumplimiento_metricas(entrada: dict[str, Any]) -> list[str]:
    """Devuelve razones de bloqueo de métricas; vacía = fuente apta."""
    errores: list[str] = []
    entrada = entrada or {}
    clase = entrada.get("clase")
    if clase in CLASES_NO_METRICAS:
        errores.append(f"clase no apta para métricas: {clase!r}")
    estado = entrada.get("estado")
    if estado in ESTADOS_BLOQUEANTES:
        errores.append(f"estado bloqueante para métricas: {estado!r}")
    licencia = entrada.get("licencia")
    if licencia == "UNKNOWN":
        errores.append("licencia UNKNOWN: procedencia no gobernada")
    if not entrada.get("autoridad"):
        errores.append("autoridad no declarada")
    crs = entrada.get("crs")
    if crs is None or str(crs).strip() == "":
        errores.append("CRS ausente")
    elif not es_crs_gobernado(crs):
        errores.append(f"vínculo CRS no gobernado: {crs!r}")
    if not entrada.get("datum"):
        errores.append("datum no declarado")
    if not entrada.get("axis_order"):
        errores.append("axis_order no declarado")
    if clase not in (CLASE_A_CANONICO, CLASE_B_COMPUTACIONAL):
        errores.append(f"clase inesperada para métricas: {clase!r}")
    return errores


def audit_gobernanza(entrada: dict[str, Any]) -> dict[str, Any]:
    """Auditoría de gobernanza de una fuente (para resultado sin métricas)."""
    errores = cumplimiento_metricas(entrada)
    return {
        "fuente_apta_para_metricas": not errores,
        "bloqueos": sorted(set(errores)),
        "estado_registro": entrada.get("estado"),
        "clase": entrada.get("clase"),
        "licencia": entrada.get("licencia"),
        "autoridad": entrada.get("autoridad"),
        "crs": entrada.get("crs"),
        "nota": "sin métricas cuando la fuente no es apta; se registra INSUFFICIENT_EVIDENCE o NOT_COMPARABLE",
    }


__all__ = ["cumplimiento_metricas", "audit_gobernanza"]