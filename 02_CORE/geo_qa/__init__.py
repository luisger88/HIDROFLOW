# -*- coding: utf-8 -*-
"""
HF-GEO-QA — Puerta Operativa de Calidad Espacial V1 (OT-HF-GEO-QA-001).

Módulo aislado, determinista y sin autoridad decisional. Aplica los contratos
SIG de docs/contratos/gis (hf.geo-qa.v1 y hermanos) para evaluar productos
espaciales antes de su consumo por HF-CARTO, HF-HYDRO, watershed, expediente o
decisiones profesionales.

Garantías de diseño:
- state_change = false siempre; este módulo nunca escribe decisiones.
- professional_decision = null siempre.
- No modifica motores productivos, React, proxy, hf_geo ni el MDT.
- Resultados deterministas (hf.geo-qa.result.v1).
- Acepta rutas portables; no usa rutas absolutas en su código.
"""

from __future__ import annotations

__version__ = "1.0.0"

__all__ = ["__version__"]