# -*- coding: utf-8 -*-
"""
metrics — métricas puras deterministas de comparación espacial.

Convenciones:
- Unidades métricas fijas (metros, fracciones, grados según campo `unidad`).
- Implementación sin numpy: usa shapely y math puro para garantizar
  determinismo entre ejecuciones y entornos.
- Toda métrica devuelve un dict con clave `unidad` y `valor` escalar.
- Coordenadas no finitas lanzan SpatialCompareError (bloqueo de métrica).
"""

from __future__ import annotations

import math
from typing import Any

from shapely.geometry import Point, box
from shapely.ops import nearest_points, unary_union
from shapely.strtree import STRtree

from .models import SpatialCompareError


def _finita(v: float) -> bool:
    return math.isfinite(v)


def percentil(orden: list[float], p: float) -> float:
    """Percentil por interpolación lineal (R-7); entrada ya ordenada."""
    n = len(orden)
    if n == 0:
        raise SpatialCompareError("percentil sobre lista vacía")
    idx = (n - 1) * p / 100.0
    lo = int(math.floor(idx))
    hi = int(math.ceil(idx))
    if lo == hi:
        return orden[lo]
    vlo = orden[lo]
    vhi = orden[hi]
    return vlo + (vhi - vlo) * (idx - lo)


def resumen_distancias(distancias: list[float]) -> dict[str, Any]:
    """Resumen determinista de una lista de distancias en metros."""
    if not distancias:
        raise SpatialCompareError("resumen de distancias sobre lista vacía")
    vmin = min(distancias)
    vmax = max(distancias)
    media = sum(distancias) / len(distancias)
    orden = sorted(distancias)
    return {
        "n": len(distancias),
        "min_m": round(vmin, 3),
        "media_m": round(media, 3),
        "mediana_m": round(percentil(orden, 50.0), 3),
        "p90_m": round(percentil(orden, 90.0), 3),
        "p95_m": round(percentil(orden, 95.0), 3),
        "p99_m": round(percentil(orden, 99.0), 3),
        "max_m": round(vmax, 3),
        "unidad": "m",
    }


def _finito_all(lines: list[Any]) -> None:
    for g in lines:
        for v in g.bounds:
            if isinstance(v, float) and not _finita(v):
                raise SpatialCompareError("coordenadas no finitas en métrica")


def longitud_total(lines: list[Any]) -> dict[str, Any]:
    _finito_all(lines)
    union = unary_union(lines) if len(lines) > 1 else lines[0]
    return {"longitud_m": round(union.length, 3), "unidad": "m"}


def cobertura_comun(lines_a: list[Any], lines_b: list[Any]) -> dict[str, Any]:
    """Cobertura común de las dos redes por envolvente (bbox) y por área."""
    _finito_all(lines_a)
    _finito_all(lines_b)
    env_a = box(*unary_union(lines_a).envelope.bounds) if lines_a else None
    env_b = box(*unary_union(lines_b).envelope.bounds) if lines_b else None
    if env_a is None or env_b is None:
        raise SpatialCompareError("cobertura común requiere ambas redes no vacías")
    area_a = env_a.area
    area_b = env_b.area
    inter = env_a.intersection(env_b).area
    uni = env_a.union(env_b).area
    return {
        "area_a_m2": round(area_a, 3),
        "area_b_m2": round(area_b, 3),
        "area_interseccion_m2": round(inter, 3),
        "iou_envolventes": round(inter / uni, 3) if uni > 0 else 0.0,
        "pct_cobertura_b_en_a": round(100.0 * inter / area_a, 3) if area_a > 0 else 0.0,
        "pct_cobertura_a_en_b": round(100.0 * inter / area_b, 3) if area_b > 0 else 0.0,
        "unidad": "m2/fraccion",
    }


def hausdorff(a_lines: list[Any], b_lines: list[Any]) -> dict[str, Any]:
    """Hausdorff no dirigido (shapely) y dirigido por muestreo determinista de
    vértices (todos los vértices bajo el tope; aproximación documentada arriba)."""
    _finito_all(a_lines)
    _finito_all(b_lines)
    ua = _union(a_lines)
    ub = _union(b_lines)
    no_dir = ua.hausdorff_distance(ub)
    pts_a = _puntos_muestra(ua)
    pts_b = _puntos_muestra(ub)
    ab = max((Point(p).distance(ub) for p in pts_a), default=0.0)
    ba = max((Point(p).distance(ua) for p in pts_b), default=0.0)
    ab_r = round(float(ab), 3)
    ba_r = round(float(ba), 3)
    no_r = round(float(no_dir), 3)
    return {
        "hausdorff_no_dirigido_m": no_r,
        "hausdorff_dirigido_A_B_m": ab_r,
        "hausdorff_dirigido_B_A_m": ba_r,
        "hausdorff_max_m": round(max(no_r, ab_r, ba_r), 3),
        "unidad": "m",
    }


def _union(lines: list[Any]):
    _finito_all(lines)
    return unary_union(lines) if len(lines) > 1 else lines[0]


def _puntos_muestra(g: Any, tope: int = 200000) -> list[tuple[float, float]]:
    """Vértices deterministas (espaciado uniforme sobre el tope) de una unión."""
    lista: list[tuple[float, float]] = []
    for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
        if ln.geom_type == "LineString":
            lista.extend(ln.coords)
    if len(lista) <= tope:
        return lista
    paso = len(lista) / tope
    return [lista[int(i * paso)] for i in range(tope)]


def longitud_coincidente(a_geoms: list[Any], b_geoms: list[Any], tolerancia_m: float) -> dict[str, Any]:
    """Longitud de A dentro del corredor de tolerancia de B."""
    ua = _union(a_geoms)
    ub = _union(b_geoms)
    zona_b = ub.buffer(tolerancia_m)
    dentro = ua.intersection(zona_b).length
    return {
        "tolerancia_m": tolerancia_m,
        "longitud_coincidente_m": round(dentro, 3),
        "pct_de_fuente": round(100.0 * dentro / ua.length, 3) if ua.length > 0 else 0.0,
        "unidad": "m/%",
    }


def pct_dentro_corredor(a_geoms: list[Any], b_geoms: list[Any], radio_m: float) -> dict[str, Any]:
    return longitud_coincidente(a_geoms, b_geoms, radio_m)


def orientacion_local(
    a_geoms: list[Any],
    b_geoms: list[Any],
    paso_muestreo: int = 5,
) -> dict[str, Any]:
    """Diferencia angular local A vs B en muestras deterministas de segmentos."""
    diffs: list[float] = []
    ub = _union(b_geoms)
    if ub.is_empty:
        raise SpatialCompareError("red B vacía para orientación local")
    for g in a_geoms:
        for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
            coords = list(ln.coords)
            for i in range(0, len(coords) - 1, paso_muestreo):
                ax, ay = coords[i]
                bx, by = coords[i + 1]
                ang_a = _angulo_segmento(ax, ay, bx, by)
                mid = Point((ax + bx) / 2.0, (ay + by) / 2.0)
                np = nearest_points(mid, ub)[1]
                ang_b = _angulo_cercano(np, b_geoms)
                if ang_b is not None:
                    dif_abs = abs(ang_a - ang_b)
                    diffs.append(round(min(dif_abs, 180.0 - dif_abs), 3))
    if not diffs:
        raise SpatialCompareError("sin muestras de orientación local")
    orden = sorted(diffs)
    return {
        "n_muestras": len(diffs),
        "diferencia_angular_mediana_deg": round(percentil(orden, 50.0), 3),
        "diferencia_angular_p90_deg": round(percentil(orden, 90.0), 3),
        "diferencia_angular_max_deg": round(orden[-1], 3),
        "unidad": "deg",
    }


def _angulo_segmento(x1: float, y1: float, x2: float, y2: float) -> float:
    rad = math.atan2(y2 - y1, x2 - x1)
    deg = math.degrees(rad)
    return deg % 180.0


def _angulo_cercano(np, lines_b: list[Any]) -> float | None:
    """Ángulo del segmento más cercano del punto np en la red B."""
    mejor: float | None = None
    mejor_dist = math.inf
    for g in lines_b:
        for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
            d = np.distance(ln)
            if d < mejor_dist:
                mejor_dist = d
                mejor = _angulo_de_linestring_cercana(np, ln)
    return mejor


def _angulo_de_linestring_cercana(np, ln) -> float | None:
    coords = list(ln.coords)
    if len(coords) < 2:
        return None
    proy = ln.project(np)
    # segmento que contiene la proyección
    acum = 0.0
    for i in range(len(coords) - 1):
        largo = math.hypot(coords[i + 1][0] - coords[i][0], coords[i + 1][1] - coords[i][1])
        if largo <= 0:
            continue
        if proy <= acum + largo or i == len(coords) - 2:
            x1, y1 = coords[i]
            x2, y2 = coords[i + 1]
            return _angulo_segmento(x1, y1, x2, y2)
        acum += largo
    return None


def nodos_cercanos(
    pts_a: list[tuple[float, float]], pts_b: list[tuple[float, float]], tolerancia_m: float
) -> dict[str, Any]:
    """Fracción de vértices de A con algún vértice de B a <= tolerancia."""
    geom_b = [Point(p) for p in pts_b]
    tree = STRtree(geom_b)
    apoyados = 0
    for p in pts_a:
        pt = Point(p)
        ids = tree.query(pt)
        cer = False
        for i in ids:
            if geom_b[int(i)].distance(pt) <= tolerancia_m:
                cer = True
                break
        if cer:
            apoyados += 1
    n_a = len(pts_a)
    return {
        "fraccion_soportada_pct": round(100.0 * apoyados / n_a, 3) if n_a else 0.0,
        "n_a": n_a,
        "n_b": len(pts_b),
        "unidad": "%",
    }


def continuidad(a_geoms: list[Any]) -> dict[str, Any]:
    """Número de componentes conectados de la red A (unión)."""
    ua = _union(a_geoms)
    if ua.geom_type == "MultiLineString":
        comp = len(ua.geoms)
    elif ua.geom_type == "LineString":
        comp = 1
    elif ua.is_empty:
        comp = 0
    else:
        comp = 1
    return {"componentes": comp, "unidad": "n"}


def divergencias(
    features_a: list[Any], b_geoms: list[Any], radio_m: float, pct_umbral: float = 50.0
) -> dict[str, Any]:
    """Features de A cuya longitud dentro del corredor de B < umbral."""
    ub = _union(b_geoms)
    zona = ub.buffer(radio_m)
    out: list[dict[str, Any]] = []
    for i, g in enumerate(features_a):
        total = g.length
        if total <= 0:
            continue
        dentro = g.intersection(zona).length
        pct = 100.0 * dentro / total
        if pct < pct_umbral:
            out.append({"indice": i, "pct_dentro": round(pct, 3), "longitud_m": round(total, 3)})
    return {
        "n_divergentes": len(out),
        "n_total": len(features_a),
        "divergentes": out,
        "radio_m": radio_m,
        "umbral_pct": pct_umbral,
        "unidad": "n",
    }


def segmentos_sin_homologo(
    features_a: list[Any], b_geoms: list[Any], radio_m: float, pct_umbral: float = 50.0
) -> dict[str, Any]:
    d = divergencias(features_a, b_geoms, radio_m, pct_umbral)
    return {
        "n_sin_homologo": d["n_divergentes"],
        "indices": [x["indice"] for x in d["divergentes"]],
        "unidad": "n",
    }


def distancia_punto_red(punto, lines: list[Any]) -> dict[str, Any]:
    """Distancia mínima de un punto a una red (metros) + índice de feature."""
    _finito_all(lines)
    mejor = math.inf
    mejor_i = -1
    for i, g in enumerate(lines):
        d = punto.distance(g)
        if d < mejor:
            mejor = d
            mejor_i = i
    return {"distancia_minima_m": round(mejor, 3), "feature_index": mejor_i, "unidad": "m"}


def distancias_punto_red_percentiles(
    punto, lines: list[Any], tope_vertices: int = 400000
) -> dict[str, Any]:
    """Percentiles de distancia vértice-red desde el punto (determinista)."""
    distancias: list[float] = []
    for g in lines:
        for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
            for c in ln.coords:
                distancias.append(punto.distance(Point(c)))
    return resumen_distancias(distancias)


def iou_corredores(a_geoms: list[Any], b_geoms: list[Any], radio_m: float) -> dict[str, Any]:
    """IoU de los corredores (buffer) de A y B."""
    ua = _union(a_geoms)
    ub = _union(b_geoms)
    ba = ua.buffer(radio_m)
    bb = ub.buffer(radio_m)
    inter = ba.intersection(bb).area
    uni = ba.union(bb).area
    return {
        "radio_m": radio_m,
        "iou_corredores": round(inter / uni, 3) if uni > 0 else 0.0,
        "unidad": "fraccion",
    }


__all__ = [
    "percentil",
    "resumen_distancias",
    "longitud_total",
    "cobertura_comun",
    "hausdorff",
    "longitud_coincidente",
    "pct_dentro_corredor",
    "orientacion_local",
    "nodos_cercanos",
    "continuidad",
    "divergencias",
    "segmentos_sin_homologo",
    "distancia_punto_red",
    "distancias_punto_red_percentiles",
    "iou_corredores",
]