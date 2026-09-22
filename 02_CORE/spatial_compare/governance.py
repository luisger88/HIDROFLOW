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


def cumplimiento_metricas_limitadas(
    entrada: dict[str, Any], assessment: dict[str, Any]
) -> dict[str, Any]:
    """Compuerta independiente de contraste territorial LIMITADO post-assessment.

    Habilita métricas restringidas para una fuente externa evaluada
    (CONDITIONALLY_APT_FOR_COMPARISON): solo si el assessment está firmado,
    coherente con el registry, con QAs sin FAIL/FAIL_ORIENTATION, CRS
    formalmente verificado y cobertura de ventana verificada. El máximo que
    emite es PARTIALLY_COMPARABLE; nunca habilita la compuerta plena
    `cumplimiento_metricas` (métricas territoriales plenas).
    """
    bloqueos: list[str] = []
    ent = entrada or {}
    s = assessment or {}
    if s.get("schema") != "hf.spatial-source-assessment.v1":
        bloqueos.append("assessment schema != hf.spatial-source-assessment.v1")
    if s.get("schema_version") != "1.0":
        bloqueos.append("assessment schema_version != 1.0")
    aid = str(s.get("assessment_id") or "")
    if len(aid) != 16 or any(c not in "0123456789abcdef" for c in aid.lower()):
        bloqueos.append("assessment_id del assessment no es un hex de 16")
    elif aid != str(ent.get("assessment_id") or ""):
        bloqueos.append("assessment_id inconsistente entre registry y assessment")
    estado = ent.get("estado")
    if estado != "CONDITIONALLY_APT_FOR_COMPARISON":
        bloqueos.append(f"estado del registry no habilita contraste condicional: {estado!r}")
    apt = s.get("aptitud") or {}
    if apt.get("apto_para_metricas_plenas"):
        bloqueos.append("assessment habilita métricas plenas; el contraste limitado no aplica")
    if not apt.get("apto_para_comparacion"):
        bloqueos.append("assessment no habilita la comparación condicional")
    quorum = (s.get("qa") or {}).get("quorum") or {}
    if quorum.get("FAIL") or quorum.get("FAIL_ORIENTATION"):
        bloqueos.append("QA previo con FAIL/FAIL_ORIENTATION en el quorum")
    escal_ok = any(
        e.get("estado") == "CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION"
        and e.get("veredicto") == "PASS"
        for e in (apt.get("escalones") or [])
    )
    if not escal_ok:
        bloqueos.append("escalón CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION no es PASS")
    crs = s.get("crs") or {}
    if crs.get("crs_canonico") != "EPSG:9377" or not crs.get("always_xy"):
        bloqueos.append("assessment CRS no es EPSG:9377 always_xy")
    cov = s.get("cobertura") or {}
    if int(cov.get("n_lineas_ventana") or 0) < 1:
        bloqueos.append("assessment sin líneas de fuente en la ventana")
    if float(cov.get("pct_extension_sobre_ventana") or 0.0) <= 0.0:
        bloqueos.append("assessment sin cobertura de ventana verificada")
    res = s.get("resolucion") or {}
    if res.get("resultado_emitible_max") != "PARTIALLY_COMPARABLE":
        bloqueos.append("assessment no limita el resultado a PARTIALLY_COMPARABLE")
    if res.get("state_change") is not False:
        bloqueos.append("assessment con state_change distinto de false")
    if res.get("professional_decision") is not None:
        bloqueos.append("assessment con decisión profesional emitida")
    if not s.get("restricciones"):
        bloqueos.append("assessment sin restricciones declaradas")
    return {
        "habilitado": not bloqueos,
        "bloqueos": sorted(set(bloqueos)),
        "resultado_maximo": "PARTIALLY_COMPARABLE",
        "assessment_id": aid,
        "assessment_ref": ent.get("assessment_ref") or "",
        "quorum": {
            "PASS": quorum.get("PASS"),
            "CONDICIONAL": quorum.get("CONDICIONAL"),
            "FAIL": quorum.get("FAIL"),
            "FAIL_ORIENTATION": quorum.get("FAIL_ORIENTATION"),
        },
        "n_restricciones": len(s.get("restricciones") or []),
    }


__all__ = ["cumplimiento_metricas", "audit_gobernanza", "cumplimiento_metricas_limitadas"]