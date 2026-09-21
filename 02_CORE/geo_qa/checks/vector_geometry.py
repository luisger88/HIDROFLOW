# -*- coding: utf-8 -*-
"""
checks/vector_geometry — geometría vectorial FeatureCollection.

Contrato hf.geo-qa.vector.v1@1.0. Valida estructura GeoJSON, tipos de
geometría, validez OGC (shapely), autocruces, coordenadas finitas, CRS
declarado y duplicados. No importa portability.
"""

from __future__ import annotations

import json
import math

from ..models import PASS, CONDICIONAL, FAIL, ERROR, INFO, CRITICAL, WARNING, CheckResult

_GRP = "geometria"


def _coords_fc(fc: dict):
    salida: list[tuple] = []
    for feat in fc.get("features", []):
        geom = feat.get("geometry") or {}
        t = geom.get("type")
        c = geom.get("coordinates")
        if c is None:
            continue
        if t in ("Point",):
            salida.append(tuple(c[:2]))
        elif t in ("LineString", "MultiPoint"):
            for p in c:
                salida.append(tuple(p[:2]))
        elif t in ("Polygon", "MultiLineString"):
            for ring in c:
                for p in ring:
                    salida.append(tuple(p[:2]))
        elif t in ("MultiPolygon",):
            for poly in c:
                for ring in poly:
                    for p in ring:
                        salida.append(tuple(p[:2]))
    return salida


def _shapely_geoms(fc: dict):
    from shapely.geometry import shape  # noqa: PLC0415

    geoms = []
    for feat in fc.get("features", []):
        geom = feat.get("geometry")
        if geom is None:
            geoms.append(None)
            continue
        geoms.append(shape(geom))
    return geoms


def geojson_valido(ctx: dict) -> CheckResult:
    fc = ctx.get("fc")
    if fc is None:
        return CheckResult(
            check_id="geojson_valido",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="El activo no se pudo cargar como FeatureCollection",
            razon="Rechazado upstream: serialización JSON/GeoJSON inválida",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    if not isinstance(fc, dict):
        return CheckResult(
            check_id="geojson_valido",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="El activo no es un objeto JSON/GeoJSON",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="geojson_valido",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="GeoJSON legible",
    )


def feature_collection_valida(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    if fc.get("type") != "FeatureCollection":
        return CheckResult(
            check_id="feature_collection_valida",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"type {fc.get('type')!r} != 'FeatureCollection'",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    features = fc.get("features")
    if not isinstance(features, list):
        return CheckResult(
            check_id="feature_collection_valida",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="features ausente o no es lista",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    for i, feat in enumerate(features):
        if not isinstance(feat, dict) or "properties" not in feat:
            return CheckResult(
                check_id="feature_collection_valida",
                grupo=_GRP,
                resultado=FAIL,
                severidad=ERROR,
                detalle=f"feature {i} sin properties",
                consumers_blocked=("CALIDAD_SPATIAL",),
            )
    return CheckResult(
        check_id="feature_collection_valida",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"FeatureCollection con {len(features)} feature(s)",
    )


def geometrias_no_vacias(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    vacias = 0
    for i, geom in enumerate(_shapely_geoms(fc)):
        if geom is not None and geom.is_empty:
            vacias += 1
    if vacias:
        return CheckResult(
            check_id="geometrias_no_vacias",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"{vacias} geometría(s) vacía(s)",
            razon="Geometrías vacías corrompen análisis espaciales",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="geometrias_no_vacias",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin geometrías vacías",
    )


def tipos_permitidos(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    permitidos = set(ctx.get("tipos_permitidos") or [])
    if not permitidos:
        permitidos = {"Point", "LineString", "Polygon", "MultiPoint", "MultiLineString", "MultiPolygon"}
    vistos: set[str] = set()
    for feat in fc.get("features", []):
        t = (feat.get("geometry") or {}).get("type")
        vistos.add(t)
    raros = sorted(vistos - permitidos - {None})
    if raros:
        return CheckResult(
            check_id="tipos_permitidos",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Tipos de geometría no permitidos: {raros}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    if not vistos:
        return CheckResult(
            check_id="tipos_permitidos",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="Conjunto vacío de geometrías",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="tipos_permitidos",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Tipos permitidos: {sorted(vistos)}",
    )


def coordenadas_finitas(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    coords = _coords_fc(fc)
    if not coords:
        return CheckResult(
            check_id="coordenadas_finitas",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin coordenadas extraíbles",
        )
    malos = [p for p in coords if not (math.isfinite(p[0]) and math.isfinite(p[1]))]
    if malos:
        return CheckResult(
            check_id="coordenadas_finitas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"{len(malos)} coordenada(s) no finita(s)",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="coordenadas_finitas",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{len(coords)} coordenada(s) finita(s)",
    )


def geometrias_validas(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    invalidas = []
    for i, geom in enumerate(_shapely_geoms(fc)):
        if geom is None or geom.is_empty:
            continue
        if not geom.is_valid:
            invalidas.append(i)
    if invalidas:
        severidad = CRITICAL if ctx.get("consumo") == "red" else ERROR
        return CheckResult(
            check_id="geometrias_validas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=severidad,
            detalle=f"Geometría(s) inválida(s) OGC: features {invalidas[:10]}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="geometrias_validas",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Todas las geometrías son válidas OGC",
    )


def autointersecciones_ausentes(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    cruces = []
    for i, geom in enumerate(_shapely_geoms(fc)):
        if geom is None or geom.is_empty:
            continue
        if geom.geom_type in ("LineString", "MultiLineString", "LinearRing"):
            if not geom.is_simple:
                cruces.append(i)
    if cruces:
        return CheckResult(
            check_id="autointersecciones_ausentes",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Líneas con autointersecciones: features {cruces[:10]}",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="autointersecciones_ausentes",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin autointersecciones",
    )


def duplicados_geometricos(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    vistos: set[str] = set()
    dups = 0
    for feat in fc.get("features", []):
        geom = feat.get("geometry")
        clave = json.dumps(geom, sort_keys=True) if geom else "null"
        if clave in vistos:
            dups += 1
        vistos.add(clave)
    if dups:
        return CheckResult(
            check_id="duplicados_geometricos",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"{dups} geometría(s) duplicada(s) en la colección",
        )
    return CheckResult(
        check_id="duplicados_geometricos",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin geometrías duplicadas",
    )


def crs_declarado(ctx: dict) -> CheckResult:
    crs = (ctx.get("fc") or {}).get("crs") or {}
    if not crs:
        return CheckResult(
            check_id="crs_declarado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="FeatureCollection sin bloque crs; CRS implícito y no auditable",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    nombre = (crs.get("properties") or {}).get("name") if isinstance(crs, dict) else None
    if not nombre:
        return CheckResult(
            check_id="crs_declarado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="Bloque crs presente pero sin name",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    return CheckResult(
        check_id="crs_declarado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"CRS declarado: {nombre}",
    )


def bounds_finitos(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    coords = _coords_fc(fc)
    if not coords:
        return CheckResult(
            check_id="bounds_finitos",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin coordenadas; bounds no computables",
        )
    if not all(math.isfinite(x) and math.isfinite(y) for x, y in coords):
        return CheckResult(
            check_id="bounds_finitos",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle="Bounds infinitos/NaN",
            consumers_blocked=("CALIDAD_SPATIAL",),
        )
    xs = [p[0] for p in coords]
    ys = [p[1] for p in coords]
    return CheckResult(
        check_id="bounds_finitos",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Bounds finitos (w={min(xs):.4f}, s={min(ys):.4f}, e={max(xs):.4f}, n={max(ys):.4f})",
    )


def topologia_minima_coincidente(ctx: dict) -> CheckResult:
    """Check opcional: extremos de líneas compartidos a tolerancia geométrica."""
    fc = ctx.get("fc") or {}
    geoms = _shapely_geoms(fc)
    lineas = [g for g in geoms if g is not None and g.geom_type in ("LineString",)]
    extremos: dict[tuple, int] = {}
    for g in lineas:
        for x, y in (g.coords[0], g.coords[-1]):
            k = (round(float(x), 6), round(float(y), 6))
            extremos[k] = extremos.get(k, 0) + 1
    compartidos = sum(1 for v in extremos.values() if v > 1)
    total = len(lineas) * 2
    if total and compartidos == 0:
        return CheckResult(
            check_id="topologia_minima_coincidente",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Ningún extremo de línea comparte nodo con otro extremo",
            razon="Topología fragmentada a nivel de extremos; la continuidad no es afirmable a partir del vector",
        )
    return CheckResult(
        check_id="topologia_minima_coincidente",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{compartidos} extremo(s) con nodo compartido",
    )


__all__ = [
    "geojson_valido",
    "feature_collection_valida",
    "geometrias_no_vacias",
    "tipos_permitidos",
    "coordenadas_finitas",
    "geometrias_validas",
    "autointersecciones_ausentes",
    "duplicados_geometricos",
    "crs_declarado",
    "bounds_finitos",
    "topologia_minima_coincidente",
]