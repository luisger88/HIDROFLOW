# -*- coding: utf-8 -*-
"""
provenance — procedencia de la fuente externa.

Productor, autoridad, descarga y fecha de adquisición se desconocen por
comprobación del expediente; nunca se inventan. La única autoría afirmable es
la custodia de la copia local por HidroFlow.
"""

from __future__ import annotations

from .models import CUSTODIAN, PROV_PARTIAL, PROCEDENCIA_NO_GOBERNADA


def proveniencia() -> dict:
    return {
        "producer": None,
        "authority": None,
        "downloader": None,
        "acquisition_date": None,
        "custodian": CUSTODIAN,
        "procedencia": PROCEDENCIA_NO_GOBERNADA,
        "redistribution_allowed": False,
        "resultado": PROV_PARTIAL,
    }


__all__ = ["proveniencia"]