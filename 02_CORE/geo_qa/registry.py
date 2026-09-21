# -*- coding: utf-8 -*-
"""
registry — registro de perfiles QA y validación del catálogo (Q1).

Q1: exactamente seis perfiles registrados con estructura de contrato válida.
El registry no ejecuta checks: solo cataloga y valida que cada check
obligatorio tenga implementación (registro funcional lazo con checks/__init__).
"""

from __future__ import annotations

from .checks import IMPL_POR_CHECK
from .profiles import PERFILES


def _existe_impl(perfil_id: str, check_id: str) -> bool:
    return (perfil_id, check_id) in IMPL_POR_CHECK

PERFIL_IDS_ESPERADOS = (
    "spatial_reference",
    "raster_georef",
    "cartographic_evidence",
    "vector_geometry",
    "network_internal",
    "gate02_diagnostic",
)

PERFIL_IDS_ESPERADOS_SET = frozenset(PERFIL_IDS_ESPERADOS)

CAMPOS_OBLIGATORIOS = (
    "id",
    "nombre",
    "version",
    "objetivo",
    "activos_aplicables",
    "grupos",
    "checks_obligatorios",
    "checks_opcionales",
    "resultado_maximo",
    "forma_global",
    "consumidores_permitidos",
    "consumidores_bloqueados",
    "severidad_cierre",
    "reglas_globales",
)

FORMAS_GLOBALES_VALIDAS = frozenset({"simple", "carto", "red", "diagnostico"})


def listar() -> list[dict]:
    return [PERFILES[i] for i in PERFIL_IDS_ESPERADOS]


def obtener(perfil_id: str) -> dict:
    try:
        return PERFILES[perfil_id]
    except KeyError:
        raise KeyError(f"perfil QA desconocido: {perfil_id!r}") from None


def implementacion_por_perfil(perfil_id: str) -> list[str]:
    """Lista de check_ids (obligatorios+opcionales) con implementación concreta."""
    perfil = obtener(perfil_id)
    return [
        cid
        for cid in perfil["checks_obligatorios"] + perfil["checks_opcionales"]
        if _existe_impl(perfil_id, cid)
    ]


def sin_implementacion(perfil_id: str) -> list[str]:
    return [
        cid
        for cid in obtener(perfil_id)["checks_obligatorios"] + obtener(perfil_id)["checks_opcionales"]
        if not _existe_impl(perfil_id, cid)
    ]


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
    check_ids_vistos: set[str] = set()
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
        if perfil.get("forma_global") not in FORMAS_GLOBALES_VALIDAS:
            errores.append(f"perfil {perfil_id!r}: forma_global invalida")
        # Nota: check_ids pueden repetirse entre perfiles con implementación propia
        # por dominio; la unicidad exige la clave compuesta (perfil, check_id).
        faltan_impl = sin_implementacion(perfil_id)
        if faltan_impl:
            errores.append(f"perfil {perfil_id!r}: checks sin implementacion: {faltan_impl}")
    return errores


__all__ = [
    "listar",
    "obtener",
    "validar_registry",
    "PERFIL_IDS_ESPERADOS",
    "PERFIL_IDS_ESPERADOS_SET",
]