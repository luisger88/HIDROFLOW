# -*- coding: utf-8 -*-
"""
deps — gestión de paths de importación para el runner y el CLI.

El motor se aísla de los motores productivos; únicamente RUNNER y CLI necesitan
importar el resolver (02_CORE/portability), que no expone __init__. Se insertan
las raíces en sys.path en tiempo de ejecución. Los módulos puros (metrics,
transforms, corridors, governance) NUNCA importan deps: reciben todo por
contexto. Este módulo no contiene rutas absolutas literales.
"""

from __future__ import annotations

import sys
from pathlib import Path

_CORE = Path(__file__).resolve().parents[1]
_PORTABILITY = _CORE / "portability"


def _instalar_core() -> None:
    raiz = str(_CORE)
    if raiz not in sys.path:
        sys.path.insert(0, raiz)


def _instalar_portability() -> None:
    raiz = str(_PORTABILITY)
    if raiz not in sys.path:
        sys.path.insert(0, raiz)


def importar_resolver():
    """Devuelve el módulo `resolver` de portability (import bajo demanda)."""
    _instalar_portability()
    import resolver  # noqa: PLC0415

    return resolver


def importar_generador():
    """Devuelve el módulo `generar_integridad` de portability."""
    _instalar_portability()
    import generar_integridad as gen  # noqa: PLC0415

    return gen


def instalar_core() -> None:
    _instalar_core()
    _instalar_portability()


__all__ = ["importar_resolver", "importar_generador", "instalar_core"]