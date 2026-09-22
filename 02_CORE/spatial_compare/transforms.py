# -*- coding: utf-8 -*-
"""
transforms — selección de CRS y transformaciones estrictamente en memoria.

Reglas (hf.spatial-reference.v1 + hf.spatial-comparison.result.v1):
- Nunca se altera el archivo fuente: la transformación opera en memoria.
- CRS ausente o desconocido (vínculo SRID interno sin organización formal)
  bloquea la transformación métrica.
- Se registran motor, versión, always_xy, origen/destino, datum y método.
"""

from __future__ import annotations

import math
import re
from typing import Any

from .models import SpatialCompareError, TransformationRecord

_EPSG_RE = re.compile(r"^EPSG:(\d+)$")

DATUM_POR_EPSG = {
    "4326": "WGS84",
    "32618": "WGS84",
    "9377": "MAGNA-SIRGAS",
    "3116": "MAGNA-SIRGAS",
}


def crs_epsg_gobernado(crs: Any) -> str | None:
    """Normaliza un EPSG gobernado; devuelve None si no es EPSG válido.

    El código debe ser resolvible por pyproj: un EPSG inexistente (p. ej.
    EPSG:9999) o un SRID interno sin organización formal no está gobernado.
    La validación es en memoria y no modifica ninguna fuente.
    """
    if not isinstance(crs, str):
        return None
    m = _EPSG_RE.match(crs.strip())
    if not m:
        return None
    epsg = f"EPSG:{m.group(1)}"
    try:
        import pyproj  # import bajo demanda

        pyproj.CRS.from_epsg(int(m.group(1)))
    except Exception:
        return None
    return epsg


def es_crs_gobernado(crs: Any) -> bool:
    return crs_epsg_gobernado(crs) is not None


def transformar_lineas(
    geoms: list[Any],
    origen_epsg: str,
    destino_epsg: str,
    always_xy: bool = True,
) -> tuple[list[Any], TransformationRecord]:
    """Reproyecta LineStrings en memoria; devuelve (geoms, TransformationRecord).

    Lanza SpatialCompareError si el CRS no está gobernado o la transformación
    produce coordenadas no finitas.
    """
    origen = crs_epsg_gobernado(origen_epsg)
    destino = crs_epsg_gobernado(destino_epsg)
    if origen is None:
        raise SpatialCompareError(f"CRS de origen no gobernado: {origen_epsg!r}")
    if destino is None:
        raise SpatialCompareError(f"CRS de destino no gobernado: {destino_epsg!r}")

    import pyproj  # import bajo demanda; dependencia del motor

    transformador = pyproj.Transformer.from_crs(origen, destino, always_xy=always_xy)
    salida: list[Any] = []
    for g in geoms:
        if g.geom_type == "LineString":
            lineas = [g]
        elif g.geom_type == "MultiLineString":
            lineas = list(g.geoms)
        else:
            raise SpatialCompareError(f"geometría no soportada para transformar: {g.geom_type}")
        for ln in lineas:
            coords = [transformador.transform(x, y) for x, y in ln.coords]
            for x, y in coords:
                if not (x == x and y == y):  # NaN check
                    raise SpatialCompareError("coordenadas no finitas tras transformar")
            salida.append(LineString_crear(coords))

    advertencias: list[str] = []
    datum_o = DATUM_POR_EPSG.get(origen.split(":")[1], "no declarado en el motor")
    datum_d = DATUM_POR_EPSG.get(destino.split(":")[1], "no declarado en el motor")
    if datum_o != datum_d:
        advertencias.append(
            f"cambio de datum {datum_o} -> {datum_d}; precisión sujeto a la transformación de pyproj"
        )
    if always_xy:
        advertencias.append("always_xy=True fuerza X=Easting, Y=Northing")

    record = TransformationRecord(
        motor="pyproj",
        version=pyproj.__version__,
        always_xy=always_xy,
        origen=origen,
        destino=destino,
        datum_origen=datum_o,
        datum_destino=datum_d,
        metodo=f"pyproj.Transformer.from_crs({origen}, {destino}, always_xy={always_xy})",
        advertencias=tuple(advertencias),
    )
    return salida, record


def _construir_linestring(coords: list[tuple[float, float]]) -> Any:
    from shapely.geometry import LineString  # import bajo demanda

    return LineString(coords)


LineString_crear = _construir_linestring


def transformar_puntos(
    puntos: list[Any],
    origen_epsg: str,
    destino_epsg: str,
    always_xy: bool = True,
) -> tuple[list[Any], TransformationRecord]:
    """Reproyecta Points en memoria (misma semántica que transformar_lineas)."""
    origen = crs_epsg_gobernado(origen_epsg)
    destino = crs_epsg_gobernado(destino_epsg)
    if origen is None:
        raise SpatialCompareError(f"CRS de origen no gobernado: {origen_epsg!r}")
    if destino is None:
        raise SpatialCompareError(f"CRS de destino no gobernado: {destino_epsg!r}")

    import pyproj  # import bajo demanda

    transformador = pyproj.Transformer.from_crs(origen, destino, always_xy=always_xy)
    salida: list[Any] = []
    for g in puntos:
        if g.geom_type not in ("Point", "MultiPoint"):
            raise SpatialCompareError(f"geometría no soportada para transformar: {g.geom_type}")
        geoms = list(g.geoms) if g.geom_type == "MultiPoint" else [g]
        for pt in geoms:
            x, y = transformador.transform(pt.x, pt.y)
            if not (x == x and y == y):
                raise SpatialCompareError("coordenadas no finitas tras transformar")
            salida.append(Point_crear(x, y))

    advertencias: list[str] = []
    datum_o = DATUM_POR_EPSG.get(origen.split(":")[1], "no declarado en el motor")
    datum_d = DATUM_POR_EPSG.get(destino.split(":")[1], "no declarado en el motor")
    if datum_o != datum_d:
        advertencias.append(
            f"cambio de datum {datum_o} -> {datum_d}; precisión sujeto a la transformación de pyproj"
        )
    if always_xy:
        advertencias.append("always_xy=True fuerza X=Easting, Y=Northing")

    record = TransformationRecord(
        motor="pyproj",
        version=pyproj.__version__,
        always_xy=always_xy,
        origen=origen,
        destino=destino,
        datum_origen=datum_o,
        datum_destino=datum_d,
        metodo=f"pyproj.Transformer.from_crs({origen}, {destino}, always_xy={always_xy})",
        advertencias=tuple(advertencias),
    )
    return salida, record


def _construir_punto(x: float, y: float) -> Any:
    from shapely.geometry import Point  # import bajo demanda

    return Point(x, y)


Point_crear = _construir_punto


def registro_transformacion_dict(record: TransformationRecord) -> dict[str, Any]:
    return record.as_dict()


def reducir_xyz_xy(geoms: list[Any]) -> tuple[list[Any], dict[str, Any]]:
    """Reduce LineString/MultiLineString (posible dimensión Z) a LineString XY.

    Solo operación en memoria: descarta la dimensión Z del material de lectura,
    conserva el orden de vértices y rechaza coordenadas no finitas. No modifica
    el archivo fuente.
    """
    n_con_z = 0
    n_vertices = 0
    salida: list[Any] = []
    for g in geoms:
        lineas = list(g.geoms) if g.geom_type == "MultiLineString" else [g]
        for ln in lineas:
            if ln.geom_type != "LineString":
                raise SpatialCompareError(f"geometría no soportada en reducir_xyz_xy: {ln.geom_type}")
            coords = [(float(c[0]), float(c[1])) for c in ln.coords]
            for x, y in coords:
                if not (math.isfinite(x) and math.isfinite(y)):
                    raise SpatialCompareError("coordenadas no finitas en reducir_xyz_xy")
            if ln.has_z:
                n_con_z += 1
            n_vertices += len(coords)
            if len(coords) >= 2:
                salida.append(LineString_crear(coords))
    resumen = {
        "metodo": "reducir_xyz_xy",
        "n_geometrias_entrada": len(geoms),
        "n_con_z": n_con_z,
        "n_vertices": n_vertices,
        "n_salida_xy": len(salida),
        "unidad": "n",
    }
    return salida, resumen


def registro_reduccion_z(resumen: dict[str, Any]) -> dict[str, Any]:
    """Registro determinista de la reducción Z->XY para evidencia/métricas."""
    return {
        "transformacion": "reduccion_z_a_xy",
        "origen": "dimensionalidad nativa del archivo (posible Z)",
        "destino": "LineString XY en el CRS nativo",
        "en_memoria": True,
        "n_geometrias_entrada": resumen.get("n_geometrias_entrada"),
        "n_con_z": resumen.get("n_con_z"),
        "n_vertices": resumen.get("n_vertices"),
        "n_salida_xy": resumen.get("n_salida_xy"),
        "unidad": "n",
    }


def bounds_en_crs(
    ventana: tuple[float, float, float, float],
    origen_epsg: str,
    destino_epsg: str,
    pad_m: float = 10.0,
) -> tuple[float, float, float, float]:
    """Envolvente en `destino_epsg` de los vértices de un rectángulo 2D dado en
    `origen_epsg`, expandida con `pad_m`. Todo en memoria."""
    origen = crs_epsg_gobernado(origen_epsg)
    destino = crs_epsg_gobernado(destino_epsg)
    if origen is None:
        raise SpatialCompareError(f"CRS de origen no gobernado: {origen_epsg!r}")
    if destino is None:
        raise SpatialCompareError(f"CRS de destino no gobernado: {destino_epsg!r}")
    if len(ventana) != 4:
        raise SpatialCompareError("ventana debe ser (minx, miny, maxx, maxy)")
    minx, miny, maxx, maxy = (float(v) for v in ventana)
    if origen == destino:
        return (minx - pad_m, miny - pad_m, maxx + pad_m, maxy + pad_m)
    import pyproj  # import bajo demanda

    tr = pyproj.Transformer.from_crs(origen, destino, always_xy=True)
    xs: list[float] = []
    ys: list[float] = []
    for x, y in ((minx, miny), (maxx, miny), (minx, maxy), (maxx, maxy)):
        nx, ny = tr.transform(x, y)
        if not (math.isfinite(nx) and math.isfinite(ny)):
            raise SpatialCompareError("coordenadas no finitas en bounds_en_crs")
        xs.append(nx)
        ys.append(ny)
    return (min(xs) - pad_m, min(ys) - pad_m, max(xs) + pad_m, max(ys) + pad_m)


__all__ = [
    "crs_epsg_gobernado",
    "es_crs_gobernado",
    "transformar_lineas",
    "transformar_puntos",
    "registro_transformacion_dict",
    "reducir_xyz_xy",
    "registro_reduccion_z",
    "bounds_en_crs",
    "DATUM_POR_EPSG",
]