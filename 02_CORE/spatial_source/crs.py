# -*- coding: utf-8 -*-
"""
crs — análisis y formalización externa del CRS declarado en el GeoPackage.

El GPKG declara srs_id=100000 con WKT `MAGNA_SIRGAS_Origen_Nacional` y
organization NONE, pero el WKT porta `AUTHORITY["EPSG","9377"]`. pyproj
resuelve el WKT como ESRI:103599 y el objeto oficial EPSG:9377 (realización
MAGNA-SIRGAS 2018) no es byte-igual al del archivo: se registra esa diferencia
en vez de afirmar una igualdad que no existe.

Resultado: CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION (parámetros y código
externos verificables) con transparencia sobre la discrepancia de datum/realización.
"""

from __future__ import annotations

import re

from pyproj import CRS, Transformer

from .models import (
    CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION,
    CRS_UNDECLARED,
    CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION,
)

_PARAMETROS_PROYECCION = ("lat_0", "lon_0", "k", "x_0", "y_0", "ellps", "units")

D03 = (-75.59408755595547, 6.271785117145225)  # lon,lat geodésico (EPSG:4326)


def _recta_axis_order(crs: CRS) -> str:
    return "x_easting_y_northing" if crs.is_projected else "lon_lat"


def _parametros(crs: CRS) -> dict:
    d = crs.to_dict()
    return {k: d.get(k) for k in _PARAMETROS_PROYECCION}


def _ppm(a: float, b: float) -> float:
    if abs(a) < 1e-12:
        return 0.0
    return abs(a - b) / abs(a) * 1e6


def analizar_crs(gpkg) -> dict:
    srs = gpkg.srs
    wkt = srs.get("definition") or ""
    org = srs.get("organization")
    ocid = srs.get("organization_coordsys_id")

    # -- CRS declarado --
    m = re.search(r'AUTHORITY\["EPSG",\s*"(\d+)"\]', wkt)
    epsg_wkt = m.group(1) if m else None
    if org == "EPSG" and ocid:
        crs_declarado = f"EPSG:{ocid}"
    elif org == "NONE" and epsg_wkt:
        crs_declarado = f"EPSG:{epsg_wkt}"
    else:
        crs_declarado = None

    try:
        c1 = CRS.from_wkt(wkt)
    except Exception:  # noqa: BLE001
        c1 = None

    if crs_declarado is None or c1 is None:
        return {
            "srs_id": srs.get("srs_id"),
            "organization": org,
            "organization_coordsys_id": ocid,
            "srs_name": srs.get("srs_name"),
            "crs_declarado": crs_declarado,
            "crs_canonico": None,
            "resultado": CRS_UNDECLARED if crs_declarado is None
            else CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION,
            "pyproj_autoridad": None,
            "detalle": "CRS no legible o sin autoridad externa",
        }

    pyproj_autoridad = c1.to_authority()
    axis_order = _recta_axis_order(c1)
    unidades = "metros" if c1.is_projected else "grados"
    datum_nombre = str(c1.datum.name or "") if c1.datum is not None else ""
    datum_autoridad = None
    try:
        datum_autoridad = c1.datum.to_authority() if c1.datum is not None else None
    except Exception:  # noqa: BLE001
        pass

    # -- formalización externa: comparar contra el objeto oficial declarado --
    parametros_iguales = None
    objeto_epsoficial_igual = None
    oficial = None
    try:
        oficial = CRS.from_user_input(crs_declarado)
        parametros_off = _parametros(oficial)
        parametros_iguales = _parametros(c1) == parametros_off
        objeto_epsoficial_igual = bool(c1.equals(oficial))
    except Exception:  # noqa: BLE001
        pass

    if parametros_iguales:
        resultado = CRS_VERIFIED_WITH_EXTERNAL_FORMALIZATION
    else:
        resultado = CRS_DECLARED_WITHOUT_EXTERNAL_FORMALIZATION

    # -- transformaciones (names) y roundtrip D-03 --
    tr_nat_4326 = Transformer.from_crs(c1, "EPSG:4326", always_xy=True)
    tr_4326_nat = Transformer.from_crs("EPSG:4326", c1, always_xy=True)
    tr_nat_utm = Transformer.from_crs(c1, "EPSG:32618", always_xy=True)
    tr_utm_nat = Transformer.from_crs("EPSG:32618", c1, always_xy=True)

    n_x, n_y = tr_4326_nat.transform(*D03)
    ida_x, ida_y = tr_nat_4326.transform(n_x, n_y)
    ppm_4326 = max(_ppm(D03[0], ida_x), _ppm(D03[1], ida_y))

    u_x, u_y = tr_nat_utm.transform(n_x, n_y)
    r_x, r_y = tr_utm_nat.transform(u_x, u_y)
    ppm_32618 = max(_ppm(n_x, r_x), _ppm(n_y, r_y))

    return {
        "srs_id": srs.get("srs_id"),
        "organization": org,
        "organization_coordsys_id": ocid,
        "srs_name": srs.get("srs_name"),
        "crs_declarado": crs_declarado,
        "crs_canonico": crs_declarado,
        "resultado": resultado,
        "pyproj_autoridad": list(pyproj_autoridad) if pyproj_autoridad else None,
        "objeto_oficial_igual": objeto_epsoficial_igual,
        "parametros_proyeccion_iguales": parametros_iguales,
        "datum": {
            "nombre": datum_nombre,
            "autoridad": datum_autoridad if isinstance(datum_autoridad, tuple)
            else None,
        },
        "unidades": unidades,
        "axis_order": axis_order,
        "always_xy": True,
        "transformaciones": [
            "MAGNA-SIRGAS Origen Nacional -> EPSG:4326 (always_xy, pyproj)",
            "MAGNA-SIRGAS Origen Nacional -> EPSG:32618 (always_xy, pyproj)",
        ],
        "roundtrip": {
            "d03_geodesico_4326": {"lon": D03[0], "lat": D03[1]},
            "d03_nativo": {"x": round(n_x, 3), "y": round(n_y, 3)},
            "d03_utm_32618": {"x": round(u_x, 3), "y": round(u_y, 3)},
            "ppm_roundtrip_4326": round(ppm_4326, 3),
            "ppm_roundtrip_32618": round(ppm_32618, 3),
        },
        "detalle": (
            f"CRS declarado {crs_declarado}; pyproj resuelve el WKT como "
            f"{pyproj_autoridad}; parámetros de proyección {'coinciden' if parametros_iguales else 'NO coinciden'} "
            f"con el objeto oficial; objeto oficial 'byte-igual': {objeto_epsoficial_igual} "
            "(la realización oficial EPSG usa datum MAGNA-SIRGAS 2018)"
        ),
    }


__all__ = ["analizar_crs"]