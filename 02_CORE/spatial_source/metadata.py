# -*- coding: utf-8 -*-
"""
metadata — metadatos técnicos de la fuente (GPKG tables + marcas técnicas).

Sólo se registran hechos legibles del archivo. Nunca se inventan productor,
autoridad, descarga ni fecha de adquisición (quedan en provenance/licensing).
"""

from __future__ import annotations

from datetime import datetime, timezone


def metadata_tecnica(gpkg) -> dict:
    contenido = gpkg.contenido
    geometria = gpkg.geometria
    mtime = datetime.fromtimestamp(
        gpkg.ruta.stat().st_mtime, tz=timezone.utc
    ).isoformat(timespec="seconds")
    return {
        "formato": "GeoPackage",
        "application_id": gpkg.application_id,
        "user_version": gpkg.user_version,
        "capa": gpkg.capa,
        "columna_geometria": geometria.get("column_name"),
        "data_type": contenido.get("data_type"),
        "identifier": contenido.get("identifier"),
        "descripcion": contenido.get("description") or "",
        "last_change": contenido.get("last_change"),
        "geometry_type_name": geometria.get("geometry_type_name"),
        "dimensiones": {
            "z": int(geometria.get("z") or 0),
            "m": int(geometria.get("m") or 0),
        },
        "bounds_nativos_m": {
            "minx": contenido.get("min_x"),
            "miny": contenido.get("min_y"),
            "maxx": contenido.get("max_x"),
            "maxy": contenido.get("max_y"),
        },
        "srs_id_capa": contenido.get("srs_id"),
        "columnas": gpkg.nombres_columnas,
        "fecha_tecnica_copia": mtime,
    }


__all__ = ["metadata_tecnica"]