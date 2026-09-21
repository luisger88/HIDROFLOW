# -*- coding: utf-8 -*-
"""
checks — implementaciones puras de los checks QA V1.

Los checks NO importan deps/portability: reciben un dict `ctx` con todos los
datos ya leídos por runner.py y devuelven un CheckResult. Esto mantiene el
núcleo determinista, embebible y sin acoplamiento a la base del caso.
"""

from __future__ import annotations

from . import cartographic_evidence as _ce
from . import gate02_diagnostic as _gd
from . import network_internal as _ni
from . import raster_georef as _rg
from . import spatial_reference as _sr
from . import vector_geometry as _vg

# Mapa (perfil_id, check_id) -> función. Cada perfil usa su propia implementación,
# evitando colisiones de nombres homónimos entre dominios.
IMPL_POR_CHECK: dict[tuple[str, str], object] = {}

for _perfil, _mod in (
    ("spatial_reference", _sr),
    ("raster_georef", _rg),
    ("cartographic_evidence", _ce),
    ("vector_geometry", _vg),
    ("network_internal", _ni),
    ("gate02_diagnostic", _gd),
):
    for _nombre in dir(_mod):
        if _nombre.startswith("_"):
            continue
        _funcion = getattr(_mod, _nombre)
        if callable(_funcion):
            IMPL_POR_CHECK[(_perfil, _nombre)] = _funcion

# Acceso plano por check_id (primera coincidencia) para herramientas externas.
IMPL_POR_CHECK_FLAT: dict[str, object] = {}
for (_perfil, _cid), _funcion in IMPL_POR_CHECK.items():
    IMPL_POR_CHECK_FLAT.setdefault(_cid, _funcion)

__all__ = ["IMPL_POR_CHECK", "IMPL_POR_CHECK_FLAT"]