# -*- coding: utf-8 -*-
"""
checks/spatial_reference — registro de referencia espacial y orden de ejes.

Contrato hf.geo-qa.ref.v1@1.0. Evalúa CRS legible (proj), datum, unidades,
orden de ejes implícito (always_xy = EPSG 4326/42xx usan lat-lon; coordenadas
proyectadas como UTM usan x_easting_y_northing) y ausencia de coordenadas
no finitas o fuera de dominio.
"""

from __future__ import annotations

import math

from ..models import PASS, CONDICIONAL, FAIL, ERROR, INFO, CRITICAL, WARNING, CheckResult

_PERP = "referencia_espacial"

_VALID_AXIS = {"lon_lat", "lat_lon", "x_easting_y_northing", "y_northing_x_easting"}


def _proj(crs: str):
    try:
        from pyproj import CRS  # noqa: PLC0415

        return CRS.from_string(crs)
    except Exception:  # noqa: BLE001
        return None


def crs_presente(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    if not crs:
        return CheckResult(
            check_id="crs_presente",
            grupo=_PERP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="El activo no declara un sistema de referencia espacial (crs ausente en el registro)",
            razon="Un producto espacial sin CRS no es interpretable ni comparable",
            evidence_refs=("spatial-data-registry.json",),
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="crs_presente",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"CRS declarado: {crs}",
        evidence_refs=("spatial-data-registry.json",),
    )


def crs_legible(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    if not crs:
        return CheckResult(
            check_id="crs_legible",
            grupo=_PERP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS ausente; no se puede verificar legibilidad",
        )
    proj = _proj(str(crs))
    if proj is None:
        return CheckResult(
            check_id="crs_legible",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"El CRS declarado {crs!r} no es parseable por proj",
            razon="Un CRS ilegible invalida cualquier georreferenciación posterior",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    autoridad, codigo = proj.to_authority() or (None, None)
    return CheckResult(
        check_id="crs_legible",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"CRS legible: EPSG:{codigo} ({proj.name})",
        evidence_refs=("spatial-data-registry.json",),
    )


def datum_consistente(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    if not crs:
        return CheckResult(
            check_id="datum_consistente",
            grupo=_PERP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS ausente; datum no verificable",
        )
    declarado = (ctx.get("registro") or {}).get("datum")
    proj = _proj(str(crs))
    base = None
    if proj is not None:
        base = str((proj.datum or proj).name or "") or None
    if declarado and base:
        decl_l = declarado.lower()
        base_l = base.lower()
        equivalente = (
            decl_l in base_l
            or base_l in decl_l
            or ("wgs84" in decl_l and "1984" in base_l)
            or ("1984" in decl_l and "wgs84" in base_l)
        )
        if equivalente:
            return CheckResult(
                check_id="datum_consistente",
                grupo=_PERP,
                resultado=PASS,
                severidad=INFO,
                detalle=f"Datum declarado {declarado!r} consistente con {base!r}",
            )
        return CheckResult(
            check_id="datum_consistente",
            grupo=_PERP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Datum declarado {declarado!r} vs derivado {base!r}: sin equivalencia textual",
            razon="La equivalencia de datum exige definición formal; se advierte sin fallar",
        )
    if base:
        return CheckResult(
            check_id="datum_consistente",
            grupo=_PERP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Datum no declarado explícitamente; derivado {base!r}",
        )
    return CheckResult(
        check_id="datum_consistente",
        grupo=_PERP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Datum no declarable desde el CRS proporcionado",
    )


def unidades_declaradas(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    proj = _proj(str(crs)) if crs else None
    if proj is None:
        return CheckResult(
            check_id="unidades_declaradas",
            grupo=_PERP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS ausente o ilegible; unidades no derivables",
        )
    if proj.is_projected:
        unidades = "metros"
    else:
        unidades = "grados"
    declarado = (ctx.get("registro") or {}).get("unidades")
    if declarado and declarado.lower() != unidades:
        return CheckResult(
            check_id="unidades_declaradas",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Unidades registradas {declarado!r} no coinciden con CRS derivado {unidades!r}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="unidades_declaradas",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Unidades del CRS: {unidades}",
    )


def axis_order_implicito(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    proj = _proj(str(crs)) if crs else None
    if proj is None:
        return CheckResult(
            check_id="axis_order_implicito",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="CRS ausente o ilegible; orden de ejes ambiguo",
            razon="Sin CRS no existe orden de ejes definido",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    if proj.is_projected:
        esperado = "x_easting_y_northing"
        desc = "eje Este (x) antes del eje Norte (y)"
    else:
        esperado = "lon_lat"
        desc = "longitud antes de latitud"
    return CheckResult(
        check_id="axis_order_implicito",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Orden de ejes esperado por CRS: {esperado} ({desc})",
    )


def always_xy_consistente(ctx: dict) -> CheckResult:
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    proj = _proj(str(crs)) if crs else None
    if proj is None:
        return CheckResult(
            check_id="always_xy_consistente",
            grupo=_PERP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS ausente o ilegible; convención always_xy no verificable",
        )
    if proj.is_projected:
        esperado = "x_easting_y_northing"
    else:
        esperado = "lon_lat"
    declarado = (ctx.get("registro") or {}).get("axis_order")
    if declarado is not None and declarado not in _VALID_AXIS:
        return CheckResult(
            check_id="always_xy_consistente",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"axis_order registrado invalido: {declarado!r}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    declarado = declarado or esperado
    if declarado != esperado:
        return CheckResult(
            check_id="always_xy_consistente",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=(
                f"Orden de ejes declarado {declarado!r} != esperado por CRS {esperado!r}; "
                "el intercambio de ejes invalida coordenadas"
            ),
            razon="always_xy roto: la interpretación x/y sería invertida",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="always_xy_consistente",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Convención always_xy consistente ({esperado})",
    )


def transformacion_registrada(ctx: dict) -> CheckResult:
    registro = ctx.get("registro") or {}
    transformaciones = registro.get("transformaciones") or registro.get("transformacion") or []
    if ctx.get("requiere_transformacion") and not transformaciones:
        return CheckResult(
            check_id="transformacion_registrada",
            grupo=_PERP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="El activo requiere transformación espacial pero no declara ninguna",
            razon="Transformación requerida no registrada: la desviación es inauditable",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    if transformaciones:
        return CheckResult(
            check_id="transformacion_registrada",
            grupo=_PERP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Transformaciones declaradas: {', '.join(str(t) for t in transformaciones)}",
        )
    return CheckResult(
        check_id="transformacion_registrada",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin transformación requerida para este activo (native o derivado ya declarado)",
    )


def coordenadas_finitas(ctx: dict) -> CheckResult:
    coords = ctx.get("coords") or (ctx.get("registro") or {}).get("coordenadas")
    if not coords:
        return CheckResult(
            check_id="coordenadas_finitas",
            grupo=_PERP,
            resultado=PASS,
            severidad=INFO,
            detalle="Sin coordenadas en el contexto del check",
        )
    for p in coords:
        x = p[0]
        y = p[1]
        if not (math.isfinite(x) and math.isfinite(y)):
            return CheckResult(
                check_id="coordenadas_finitas",
                grupo=_PERP,
                resultado=FAIL,
                severidad=CRITICAL,
                detalle=f"Coordenadas no finitas: {p!r}",
                consumers_blocked=("CALIDAD_SPATIAL",),
            )
    crs = (ctx.get("registro") or {}).get("crs") or ctx.get("crs")
    proj = _proj(str(crs)) if crs else None
    if proj is not None and not proj.is_projected:
        minutos = [(p[0], p[1]) for p in coords if math.isfinite(p[0]) and math.isfinite(p[1])]
        for lon, lat in minutos:
            if not (-180 <= lon <= 180 and -90 <= lat <= 90):
                return CheckResult(
                    check_id="coordenadas_finitas",
                    grupo=_PERP,
                    resultado=FAIL,
                    severidad=ERROR,
                    detalle=f"Coordenada fuera de rango geográfico: ({lon}, {lat})",
                    consumers_blocked=("CALIDAD_SPATIAL",),
                )
    return CheckResult(
        check_id="coordenadas_finitas",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{len(coords)} coordenada(s) finita(s)",
    )


def inclusion_extension_declarada(ctx: dict) -> CheckResult:
    registro = ctx.get("registro") or {}
    extension = registro.get("extension") or ctx.get("extension")
    coords = ctx.get("coords")
    if not extension or not coords:
        return CheckResult(
            check_id="inclusion_extension_declarada",
            grupo=_PERP,
            resultado=PASS,
            severidad=INFO,
            detalle="Sin extensión o sin coordenadas en el contexto; check no aplicable",
        )
    try:
        oeste = float(extension["west"] if "west" in extension else extension["minx"])
        sur = float(extension["south"] if "south" in extension else extension["miny"])
        este = float(extension["east"] if "east" in extension else extension["maxx"])
        norte = float(extension["north"] if "north" in extension else extension["maxy"])
    except (KeyError, TypeError, ValueError):
        return CheckResult(
            check_id="inclusion_extension_declarada",
            grupo=_PERP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Extensión declarada incoherente: {extension!r}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    for x, y in coords:
        if not (oeste <= x <= este and sur <= y <= norte):
            return CheckResult(
                check_id="inclusion_extension_declarada",
                grupo=_PERP,
                resultado=FAIL,
                severidad=ERROR,
                detalle=f"Coordenada ({x}, {y}) fuera de la extensión declarada",
                consumers_blocked=("CALIDAD_SPATIAL",),
            )
    return CheckResult(
        check_id="inclusion_extension_declarada",
        grupo=_PERP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{len(coords)} coordenada(s) dentro de la extensión declarada",
    )


__all__ = [
    "crs_presente",
    "crs_legible",
    "datum_consistente",
    "unidades_declaradas",
    "axis_order_implicito",
    "always_xy_consistente",
    "transformacion_registrada",
    "coordenadas_finitas",
    "inclusion_extension_declarada",
]