# -*- coding: utf-8 -*-
"""
checks/raster_georef — georreferenciación de ráster derivado.

Contrato hf.geo-qa.raster.v1@1.0. Evalúa affine, orientación north-up,
resolución, dimensiones, extensión, nodata y alineación frente al registro
técnico. Todo lo evaluado proviene de metadata/lectura controlada; este
módulo JAMÁS escribe el ráster.
"""

from __future__ import annotations

from ..models import PASS, CONDICIONAL, FAIL, ERROR, INFO, CRITICAL, WARNING, CheckResult

_GRP = "georeferenciacion"

_TOL_RES = 1e-6
_TOL_ANG = 1e-9


def _affine(ctx: dict) -> tuple | None:
    aff = ctx.get("affine")
    if not aff:
        return None
    return tuple(aff)


def affine_presente(ctx: dict) -> CheckResult:
    aff = _affine(ctx)
    if aff is None or len(aff) < 6:
        return CheckResult(
            check_id="affine_presente",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="El ráster no expone transformación affine",
            razon="Un ráster sin affine no está georreferenciado",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="affine_presente",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Affine presente (a,b,c,d,e,f)",
    )


def affine_a_positivo_oriente_este(ctx: dict) -> CheckResult:
    aff = _affine(ctx)
    if aff is None:
        return CheckResult(
            check_id="affine_a_positivo_oriente_este",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin affine; check no aplicable",
        )
    a = aff[0]
    if a <= 0:
        return CheckResult(
            check_id="affine_a_positivo_oriente_este",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Coefficient affine a={a} invalido (debe ser > 0 y apuntar al Este)",
            razon="Affine espejada horizontal: la columna avanza hacia el Oeste",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="affine_a_positivo_oriente_este",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Coefficient a>0 ({a}) orientado al Este",
    )


def affine_e_negativo_north_up(ctx: dict) -> CheckResult:
    aff = _affine(ctx)
    if aff is None:
        return CheckResult(
            check_id="affine_e_negativo_north_up",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin affine; check no aplicable",
        )
    e = aff[4]
    if e >= 0:
        return CheckResult(
            check_id="affine_e_negativo_north_up",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Coefficient affine e={e} invalido (debe ser < 0 para north-up)",
            razon="Eje de fila apunta al Sur: ráster no north-up",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="affine_e_negativo_north_up",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Coefficient e<0 ({e}) north-up correcto",
    )


def rotacion_ausente(ctx: dict) -> CheckResult:
    aff = _affine(ctx)
    if aff is None:
        return CheckResult(
            check_id="rotacion_ausente",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin affine; check no aplicable",
        )
    b = aff[1]
    d = aff[3]
    if abs(b) > _TOL_ANG or abs(d) > _TOL_ANG:
        return CheckResult(
            check_id="rotacion_ausente",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Coefficients de rotación no nulos: b={b}, d={d}",
            razon="Affine inconsistente con grilla alineada a ejes",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="rotacion_ausente",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Rotación nula (b,d ~ 0)",
    )


def resolucion_congruente(ctx: dict) -> CheckResult:
    aff = _affine(ctx)
    esperado = ctx.get("esperado") or {}
    if aff is None:
        return CheckResult(
            check_id="resolucion_congruente",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin affine; resolución no computable",
        )
    rx = abs(aff[0])
    ry = abs(aff[4])
    if rx == 0 or ry == 0:
        return CheckResult(
            check_id="resolucion_congruente",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Resolución nula: ({rx}, {ry})",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    esperada = esperado.get("res")
    if esperada:
        erx, ery = esperada
        tol = 0.05  # 5% contractual
        if abs(rx - erx) / erx > tol or abs(ry - ery) / ery > tol:
            return CheckResult(
                check_id="resolucion_congruente",
                grupo=_GRP,
                resultado=FAIL,
                severidad=ERROR,
                detalle=f"Resolución ({rx}, {ry}) difiere >5% de la registrada ({erx}, {ery})",
                consumers_blocked=("CALIDAD_SPATIAL",),
            )
        return CheckResult(
            check_id="resolucion_congruente",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Resolución ({rx:.2f}, {ry:.2f}) congruente con la registrada",
        )
    return CheckResult(
        check_id="resolucion_congruente",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Resolución derivada ({rx:.2f}, {ry:.2f}); sin referencia registrada para comparar",
    )


def dimensiones_registradas(ctx: dict) -> CheckResult:
    meta = ctx.get("meta") or {}
    esperado = ctx.get("esperado") or {}
    shape = meta.get("shape")
    esperado_shape = esperado.get("shape")
    if not shape:
        return CheckResult(
            check_id="dimensiones_registradas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="El ráster no expone shape/dimensiones",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    if esperado_shape and tuple(shape) != tuple(esperado_shape):
        return CheckResult(
            check_id="dimensiones_registradas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Shape ({shape[0]}, {shape[1]}) != registrado {tuple(esperado_shape)}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    rows, cols = shape[0], shape[1]
    if rows <= 0 or cols <= 0:
        return CheckResult(
            check_id="dimensiones_registradas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Dimensiones no positivas: ({rows}, {cols})",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="dimensiones_registradas",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Dimensiones ({rows}, {cols})",
    )


def extension_registrada(ctx: dict) -> CheckResult:
    meta = ctx.get("meta") or {}
    esperado = ctx.get("esperado") or {}
    bounds = meta.get("bounds")
    if not bounds or len(bounds) != 4:
        return CheckResult(
            check_id="extension_registrada",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="El ráster no expone bounds completos",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    oeste, sur, este, norte = bounds
    if not (oeste < este and sur < norte):
        return CheckResult(
            check_id="extension_registrada",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Bounds invalidos: {bounds!r}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    esperado_b = esperado.get("bounds")
    if esperado_b:
        tol = 1e-6
        if any(abs(y - x) > tol for x, y in zip(esperado_b, bounds)):
            return CheckResult(
                check_id="extension_registrada",
                grupo=_GRP,
                resultado=FAIL,
                severidad=ERROR,
                detalle=f"Bounds {bounds!r} != registrados {tuple(esperado_b)!r}",
                consumers_blocked=("CALIDAD_SPATIAL",),
            )
    return CheckResult(
        check_id="extension_registrada",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Extensión (w,s,e,n): ({oeste:.2f}, {sur:.2f}, {este:.2f}, {norte:.2f})",
    )


def nodata_declarado(ctx: dict) -> CheckResult:
    meta = ctx.get("meta") or {}
    esperado = ctx.get("esperado") or {}
    nodata = meta.get("nodata")
    esperado_nd = esperado.get("nodata")
    if "nodata" not in esperado or esperado_nd is None:
        return CheckResult(
            check_id="nodata_declarado",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle="Sin nodata declarado en el ráster; comportamiento por defecto documentado",
        )
    if nodata is not None and nodata != esperado_nd:
        return CheckResult(
            check_id="nodata_declarado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"NoData del ráster {nodata!r} != registrado {esperado_nd!r}",
            razon="Un NoData divergente corrompe la lectura de elevación en vacíos",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="nodata_declarado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"NoData consistente: {nodata!r}",
    )


def alineamiento_grilla(ctx: dict) -> CheckResult:
    meta = ctx.get("meta") or {}
    aff = _affine(ctx)
    bounds = meta.get("bounds")
    if aff is None or not bounds:
        return CheckResult(
            check_id="alineamiento_grilla",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin affine/bounds; alineamiento no verificable",
        )
    paso = abs(aff[0])
    if paso <= 0:
        return CheckResult(
            check_id="alineamiento_grilla",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Resolución no positiva; alineamiento no verificable",
        )
    tol = 1e-4
    desalineado = [
        v for v in (bounds[0], bounds[2], bounds[1], bounds[3]) if abs(v % paso) > tol
    ]
    if desalineado:
        return CheckResult(
            check_id="alineamiento_grilla",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Origen de grilla no exactamente alineado al paso {paso}: {desalineado!r}",
        )
    return CheckResult(
        check_id="alineamiento_grilla",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Grilla alineada al paso {paso}",
    )


def inclusion_punto_contractual(ctx: dict) -> CheckResult:
    meta = ctx.get("meta") or {}
    esperado = ctx.get("esperado") or {}
    punto = esperado.get("punto_rowcol")
    if not punto:
        return CheckResult(
            check_id="inclusion_punto_contractual",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle="Sin punto contractual en el contexto",
        )
    fila, col = punto
    shape = meta.get("shape")
    if not shape:
        return CheckResult(
            check_id="inclusion_punto_contractual",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin shape; inclusión del punto no verificable",
        )
    rows, cols = shape[0], shape[1]
    if not (0 <= fila < rows and 0 <= col < cols):
        return CheckResult(
            check_id="inclusion_punto_contractual",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Punto contractual (fila={fila}, col={col}) fuera del ráster {rows}x{cols}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="inclusion_punto_contractual",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Punto contractual dentro del ráster (fila={fila}, col={col})",
    )


def hash_registrado(ctx: dict) -> CheckResult:
    real = ctx.get("hash_real")
    esperado = ctx.get("hash_esperado")
    if not real or not esperado:
        return CheckResult(
            check_id="hash_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin hash real o registrado; integridad del archivo no verificable",
        )
    if real != esperado:
        return CheckResult(
            check_id="hash_registrado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Hash del archivo {real[:16]}.. != registrado {esperado[:16]}..",
            razon="El ráster fue alterado respecto al registro de integridad",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="hash_registrado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Hash SHA-256 coincide: {real[:16]}...",
    )


__all__ = [
    "affine_presente",
    "affine_a_positivo_oriente_este",
    "affine_e_negativo_north_up",
    "rotacion_ausente",
    "resolucion_congruente",
    "dimensiones_registradas",
    "extension_registrada",
    "nodata_declarado",
    "alineamiento_grilla",
    "inclusion_punto_contractual",
    "hash_registrado",
]