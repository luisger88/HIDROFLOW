# -*- coding: utf-8 -*-
"""
runner — puntos de entrada del motor spatial_source (OT-HF-SPATIAL-SOURCE-001).

Flujos:
- evaluar: evalúa la fuente y devuelve el resultado firmado SIN persistir
  (modo evaluación).
- registrar: evalúa, persiste documentos, sincroniza el registro, emite el
  run post-assessment y regenera la integridad serialmente.
"""

from __future__ import annotations

from pathlib import Path

from . import __version__
from .assessment import correr_assessment
from .deps import importar_resolver
from .evidence import correr_y_registrar


def repo_root() -> Path:
    return Path(__file__).resolve().parents[1]


def evaluar(ruta_fuente=None, caso_raiz=None, parsear_invariantes=True):
    resolver = importar_resolver()
    raiz = resolver.resolver_raiz_caso(caso_raiz)
    return correr_assessment(
        ruta_fuente=ruta_fuente, caso_raiz=raiz,
        parsear_invariantes=parsear_invariantes,
    )


def registrar(ruta_fuente=None, caso_raiz=None, regenerar=True) -> dict:
    return correr_y_registrar(
        ruta_fuente=ruta_fuente, caso_raiz=caso_raiz, regenerar=regenerar
    )


def resumen(res) -> dict:
    return {
        "ot": res.ot,
        "assessment_type": res.assessment_type,
        "assessment_id": res.assessment_id,
        "output_hash": res.firmas.get("output_hash"),
        "source_id": res.identificacion.get("source_id"),
        "aptitud": res.aptitud.get("resultado"),
        "apto_para_comparacion": res.aptitud.get("apto_para_comparacion"),
        "crs": res.crs.get("crs_declarado"),
        "crs_resultado": res.crs.get("resultado"),
        "cobertura": res.cobertura.get("resultado"),
        "pct_lineas_ventana": res.cobertura.get("pct_lineas_ventana_buffer1m"),
        "license_status": res.licenciamiento.get("license_status"),
        "qa_ok": res.qa.get("ok"),
        "tot_checks": res.qa.get("tot_checks"),
        "quorum": res.qa.get("quorum"),
        "state_change": res.state_change,
        "professional_decision": res.professional_decision,
        "version": res.version,
    }


__all__ = ["repo_root", "evaluar", "registrar", "resumen", "correr_assessment"]