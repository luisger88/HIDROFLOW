# -*- coding: utf-8 -*-
"""
licensing — estado de licenciamiento de la fuente externa.

No constan términos de licencia: se registra UNKNOWN con redistribution
denegada (criterio conservador) y se deriva la restricción de uso.
"""

from __future__ import annotations

from .models import (
    LICENSE_STATUS_UNKNOWN,
    LICENSE_UNKNOWN_RESTRICTS_USE,
    LICENSE_UNKNOWN,
)


def licenciamiento() -> dict:
    return {
        "license": LICENSE_UNKNOWN,
        "license_status": LICENSE_STATUS_UNKNOWN,
        "redistribution_allowed": False,
        "resultado": LICENSE_UNKNOWN_RESTRICTS_USE,
        "nota": (
            "sin términos verificables de licencia; uso conservador: contraste "
            "y auditoría, sin métricas territoriales ni adopción"
        ),
    }


__all__ = ["licenciamiento"]