# -*- coding: utf-8 -*-
"""
registry — registro de perfiles de comparación y validación del catálogo.

Reglas de cobertura C1 del catálogo:
- exactamente seis perfiles registrados con estructura de contrato válida.
- cada perfil declara objetivo, QA previo, métricas obligatorias, resultado
  máximo, consumidores e interpretaciones (permitidas/prohibidas).
"""

from __future__ import annotations

from .models import PERFIL_IDS_ESPERADOS, PERFIL_IDS_ESPERADOS_SET
from .profiles import IMPL_POR_PERFIL, PERFILES

CAMPOS_OBLIGATORIOS = (
    "id",
    "nombre",
    "version",
    "objetivo",
    "tipo",
    "fuentes",
    "qa_previo",
    "metricas_obligatorias",
    "tolerancias_default",
    "resultado_maximo",
    "clasificaciones_permitidas",
    "confianza_default",
    "consumidores_permitidos",
    "consumidores_bloqueados",
    "interpretaciones_prohibidas",
    "reglas",
)

TIPOS_VALIDOS = frozenset(
    {"network_network", "point_network", "segment_correspondence", "terrain", "visual_reference", "candidates"}
)


def listar() -> list[dict]:
    return [PERFILES[i] for i in PERFIL_IDS_ESPERADOS]


def obtener(perfil_id: str) -> dict:
    try:
        return PERFILES[perfil_id]
    except KeyError:
        raise KeyError(f"perfil de comparación desconocido: {perfil_id!r}") from None


def tiene_impl(perfil_id: str) -> bool:
    return perfil_id in IMPL_POR_PERFIL


def validar_registry() -> list[str]:
    """Devuelve lista de errores de estructura del catálogo (vacía = válido)."""
    errores: list[str] = []
    ids = set(PERFILES)
    if ids != PERFIL_IDS_ESPERADOS_SET:
        faltan = sorted(PERFIL_IDS_ESPERADOS_SET - ids)
        sobra = sorted(ids - PERFIL_IDS_ESPERADOS_SET)
        if faltan:
            errores.append(f"perfiles faltantes: {faltan}")
        if sobra:
            errores.append(f"perfiles no previstos: {sobra}")
    for perfil_id in PERFIL_IDS_ESPERADOS:
        perfil = PERFILES.get(perfil_id)
        if not isinstance(perfil, dict):
            errores.append(f"perfil {perfil_id!r} no es dict")
            continue
        for campo in CAMPOS_OBLIGATORIOS:
            if campo not in perfil:
                errores.append(f"perfil {perfil_id!r}: falta campo {campo!r}")
        if perfil.get("id") != perfil_id:
            errores.append(f"perfil {perfil_id!r}: id incoherente")
        if perfil.get("tipo") not in TIPOS_VALIDOS:
            errores.append(f"perfil {perfil_id!r}: tipo invalido {perfil.get('tipo')!r}")
        if perfil_id not in IMPL_POR_PERFIL:
            errores.append(f"perfil {perfil_id!r}: sin ejecutor registrado")
    return errores


__all__ = [
    "listar",
    "obtener",
    "tiene_impl",
    "validar_registry",
    "CAMPOS_OBLIGATORIOS",
    "TIPOS_VALIDOS",
]