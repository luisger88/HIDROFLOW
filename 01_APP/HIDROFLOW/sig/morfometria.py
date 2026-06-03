# sig/morfometria.py

import math


def calcular_morfometria(cuenca_geom: dict) -> dict:
    """
    Calcula los parámetros morfométricos de la cuenca a partir
    de su geometría básica.

    Parámetros
    ----------
    cuenca_geom : dict
        Diccionario con información geométrica de la cuenca.

    Retorna
    -------
    dict
        Resultados morfométricos estructurados.
    """

    area = cuenca_geom["area_km2"]
    perimetro = cuenca_geom["perimetro_km"]
    longitud_cauces = cuenca_geom["longitud_cauces_km"]

    # --- Cálculos fundamentales ---
    cg = indice_gravelius(area, perimetro)
    dd = densidad_drenaje(longitud_cauces, area)

    return {
        "cuenca": {
            "area_km2": area,
            "perimetro_km": perimetro,
            "cota_max_msnm": cuenca_geom["cota_max_msnm"],
            "cota_min_msnm": cuenca_geom["cota_min_msnm"],
            "pendiente_media_pct": cuenca_geom["pendiente_media_pct"]
        },
        "red_drenaje": {
            "longitud_total_km": longitud_cauces,
            "densidad_drenaje": dd,
            "orden_max_strahler": cuenca_geom["orden_max_strahler"]
        },
        "forma": {
            "gravelius": cg
        }
    }


def indice_gravelius(area_km2: float, perimetro_km: float) -> float:
    """
    Índice de Gravelius (Cg).

    Cg = P / (2 * sqrt(pi * A))

    Valores cercanos a 1 indican cuencas circulares.
    Valores altos indican cuencas elongadas.
    """
    if area_km2 <= 0:
        raise ValueError("El área debe ser mayor que cero.")

    return perimetro_km / (2 * math.sqrt(math.pi * area_km2))


def densidad_drenaje(longitud_cauces_km: float, area_km2: float) -> float:
    """
    Densidad de drenaje (Dd).

    Dd = L / A

    Donde:
    L = longitud total de cauces
    A = área de la cuenca
    """
    if area_km2 <= 0:
        raise ValueError("El área debe ser mayor que cero.")

    return longitud_cauces_km / area_km2
