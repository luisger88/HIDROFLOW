# -*- coding: utf-8 -*-
"""
coverage — cobertura de la fuente sobre la ventana de interés del caso.

Ventana: cuadrado de 2*radio_m en torno al punto de interés (D-03) en
EPSG:32618. Se reportan métricas de envolvente (rápidas) y de trabajo de línea
efectivo (líneas cuya envolvente transformada toca la ventana, con buffer 1 m).

La transformación nativa -> EPSG:32618 se hace en memoria con pyproj
(always_xy), nunca se escribe sobre la fuente. Todo es determinista.
"""

from __future__ import annotations

from pyproj import Transformer
from shapely.geometry import LineString, MultiLineString, box
from shapely.ops import unary_union

from .models import COBER_COMPLETA, COBER_INSUFICIENTE, COBER_PARCIAL


def _crs_nativo(gpkg):
    from pyproj import CRS

    wkt = gpkg.srs.get("definition")
    if not wkt or wkt == "undefined":
        raise ValueError("definición CRS nativa no disponible")
    return CRS.from_wkt(wkt)


def _transformar_geometrias(geoms, origen, destino):
    tr = Transformer.from_crs(origen, destino, always_xy=True)
    salida = []
    for g in geoms:
        if g is None or g.is_empty:
            salida.append(g)
            continue
        partes = []
        sub = g.geoms if g.geom_type.startswith("Multi") else [g]
        for linea in sub:
            coords = list(linea.coords)
            if not coords:
                partes.append([])
                continue
            px, py = tr.transform([c[0] for c in coords], [c[1] for c in coords])
            partes.append(list(zip(px, py)))
        if g.geom_type.startswith("Multi"):
            salida.append(MultiLineString([p for p in partes if p]))
        else:
            salida.append(LineString(partes[0]))
    return salida


def cobertura_ventana(gpkg, d03_utm: tuple[float, float], radio_m: float = 1000.0) -> dict:
    """Devuelve métricas de cobertura de la fuente sobre la ventana D-03."""
    cx, cy = float(d03_utm[0]), float(d03_utm[1])
    ventana = box(cx - radio_m, cy - radio_m, cx + radio_m, cy + radio_m)

    nativo = None
    try:
        nativo = _crs_nativo(gpkg)
        tr_nat_utm = Transformer.from_crs(nativo, "EPSG:32618", always_xy=True)
    except Exception:  # noqa: BLE001
        return {
            "extension_nativa": {"minx": 0.0, "miny": 0.0, "maxx": 0.0, "maxy": 0.0},
            "ventana_utm_32618": {
                "minx": cx - radio_m, "miny": cy - radio_m,
                "maxx": cx + radio_m, "maxy": cy + radio_m,
            },
            "pct_extension_sobre_ventana": 0.0,
            "iou_extension": 0.0,
            "pct_lineas_ventana_buffer1m": 0.0,
            "n_features_ventana": 0,
            "resultado": "COBERTURA_INSUFICIENTE_DE_VENTANA",
            "nota": "CRS nativo ilegible: cobertura no calculable",
        }

    minx = gpkg.contenido.get("min_x")
    miny = gpkg.contenido.get("min_y")
    maxx = gpkg.contenido.get("max_x")
    maxy = gpkg.contenido.get("max_y")
    if None in (minx, miny, maxx, maxy):
        # Capa sin datos: contenidos del GeoPackage sin envolvente.
        return {
            "extension_nativa": {"minx": 0.0, "miny": 0.0, "maxx": 0.0, "maxy": 0.0},
            "ventana_utm_32618": {
                "minx": cx - radio_m, "miny": cy - radio_m,
                "maxx": cx + radio_m, "maxy": cy + radio_m,
            },
            "pct_extension_sobre_ventana": 0.0,
            "iou_extension": 0.0,
            "pct_lineas_ventana_buffer1m": 0.0,
            "n_features_ventana": 0,
            "resultado": "COBERTURA_INSUFICIENTE_DE_VENTANA",
            "nota": "capa sin datos: sin envolvente ni líneas que contrastar",
        }
    minx = float(minx)
    miny = float(miny)
    maxx = float(maxx)
    maxy = float(maxy)
    px, py = tr_nat_utm.transform([minx, minx, maxx, maxx], [miny, maxy, miny, maxy])
    env_utm = box(min(px), min(py), max(px), max(py))

    int_ext = ventana.intersection(env_utm)
    pct_extension = int_ext.area / ventana.area if ventana.area else 0.0
    union_ext = ventana.union(env_utm)
    iou_extension = int_ext.area / union_ext.area if union_ext.area else 0.0

    # ---- selección por envolvente transformada (vectorizada) ----
    minxs, minys, maxxs, maxys = [], [], [], []
    geoms = []
    for _fid, _props, g in gpkg.iter_features():
        if g is None or g.is_empty:
            continue
        geoms.append(g)
        b = g.bounds
        minxs.append(b[0])
        minys.append(b[1])
        maxxs.append(b[2])
        maxys.append(b[3])
    if minxs:
        px0, py0 = tr_nat_utm.transform(minxs, minys)
        px1, py1 = tr_nat_utm.transform(maxxs, maxys)
        mask = [
            (px0[i] <= cx + radio_m and px1[i] >= cx - radio_m
             and py0[i] <= cy + radio_m and py1[i] >= cy - radio_m)
            for i in range(len(geoms))
        ]
        candidatos = [geoms[i] for i in range(len(geoms)) if mask[i]]
    else:
        candidatos = []

    utm = _transformar_geometrias(candidatos, nativo, "EPSG:32618")
    intersectan = [g for g in utm if g is not None and g.intersects(ventana)]

    if intersectan:
        cubierta = unary_union([g.buffer(1.0) for g in intersectan]).intersection(ventana)
        area_lineas = cubierta.area
    else:
        area_lineas = 0.0
    pct_lineas = area_lineas / ventana.area if ventana.area else 0.0

    if pct_extension < 0.2:
        resultado = COBER_INSUFICIENTE
    elif pct_lineas >= 0.9 and pct_extension >= 0.95:
        resultado = COBER_COMPLETA
    else:
        resultado = COBER_PARCIAL

    return {
        "ventana_referencia": "D-03",
        "radio_m": float(radio_m),
        "d03_utm_32618": [cx, cy],
        "extension_nativa": {"minx": minx, "miny": miny, "maxx": maxx, "maxy": maxy},
        "extension_utm_32618": {
            "minx": float(env_utm.bounds[0]),
            "miny": float(env_utm.bounds[1]),
            "maxx": float(env_utm.bounds[2]),
            "maxy": float(env_utm.bounds[3]),
        },
        "ventana_utm_32618": {
            "minx": float(ventana.bounds[0]),
            "miny": float(ventana.bounds[1]),
            "maxx": float(ventana.bounds[2]),
            "maxy": float(ventana.bounds[3]),
        },
        "pct_extension_sobre_ventana": round(pct_extension, 6),
        "iou_extension": round(iou_extension, 6),
        "n_lineas_ventana": len(intersectan),
        "pct_lineas_ventana_buffer1m": round(pct_lineas, 6),
        "resultado": resultado,
        "nota": (
            "cobertura por envolvente y por línea efectiva (buffer 1 m) sobre "
            "la ventana de interés del caso; proyectada en memoria a EPSG:32618"
        ),
    }


__all__ = ["cobertura_ventana", "COBER_COMPLETA", "COBER_INSUFICIENTE", "COBER_PARCIAL"]