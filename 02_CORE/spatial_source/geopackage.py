# -*- coding: utf-8 -*-
"""
geopackage — acceso read-only a un GeoPackage de características.

- Apertura SQLite en modo ro (uri) + PRAGMA query_only (candado doble) para
  metadatos (gpkg_contents, gpkg_geometry_columns, gpkg_spatial_ref_sys).
- Lectura de geometrías POR FILA vía fiona (lee el blob GPKG aunque el WKB
  interno traiga envolvente no estándar) y shapely.geometry.shape; atributos
  como diccionario plano. Estadísticas agregadas y capa_h1 deterministas.
- capa_h1 hashea líneas canónicas `fid|attrs|hex(blob_geom)` sin copiar el
  binario total en memoria: es un hash de contenido de la capa.

Regla: jamás se escriben índices, VACUUM, UPDATE/INSERT/DELETE ni se muta
gpkg_spatial_ref_sys. El árbol rtree se ignora.
"""

from __future__ import annotations

import binascii
import sqlite3
from hashlib import sha256
from pathlib import Path

import fiona
from shapely.geometry import shape

from .models import sha256_texto  # noqa: F401  (re-export para conveniencia)


class GeoPackageError(RuntimeError):
    pass


def _uri_ro(ruta: Path) -> str:
    return "file:" + str(ruta.resolve()).replace("\\", "/") + "?mode=ro"


class GeoPackageSource:
    """Capa de lectura de un GeoPackage de features (única capa)."""

    def __init__(self, ruta: Path):
        self.ruta = Path(ruta)
        if not self.ruta.is_file():
            raise GeoPackageError(f"fuente ausente: {self.ruta}")
        self._con = sqlite3.connect(_uri_ro(self.ruta), uri=True)
        self._con.execute("PRAGMA query_only = ON")
        self._con.row_factory = sqlite3.Row
        self._tablas_features = self._detectar_tablas()
        if not self._tablas_features:
            raise GeoPackageError("GeoPackage sin tabla de características")
        if len(self._tablas_features) > 1:
            raise GeoPackageError(
                f"GeoPackage multifeature no soportado: {self._tablas_features}"
            )
        self.capa = self._tablas_features[0]
        self._cargar_metadatos()

    # ------------------------------------------------------------------ open

    def close(self) -> None:
        try:
            self._con.close()
        except sqlite3.Error:
            pass

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        self.close()

    def _detectar_tablas(self) -> list[str]:
        cur = self._con.execute(
            "SELECT table_name FROM gpkg_contents WHERE data_type='features' ORDER BY table_name"
        )
        return [r["table_name"] for r in cur.fetchall()]

    def _cargar_metadatos(self) -> None:
        cur = self._con.execute("SELECT * FROM gpkg_contents WHERE table_name=?", (self.capa,))
        self.contenido = dict(cur.fetchone())
        cur = self._con.execute(
            "SELECT * FROM gpkg_geometry_columns WHERE table_name=?", (self.capa,)
        )
        self.geometria = dict(cur.fetchone())
        cur = self._con.execute(
            "SELECT srs_name, srs_id, organization, organization_coordsys_id, "
            "definition, description FROM gpkg_spatial_ref_sys WHERE srs_id=?",
            (self.contenido["srs_id"],),
        )
        fila = cur.fetchone()
        if fila is None:
            raise GeoPackageError("srs_id sin definición en gpkg_spatial_ref_sys")
        self.srs = dict(fila)
        self.columnas = self._con.execute(f'PRAGMA table_info("{self.capa}")').fetchall()
        self.nombres_columnas = [c[1] for c in self.columnas]
        if "fid" not in self.nombres_columnas:
            raise GeoPackageError("capa sin columna fid")
        self.col_geom = self.geometria.get("column_name") or "geom"
        if self.col_geom not in self.nombres_columnas:
            raise GeoPackageError(f"columna de geometría ausente: {self.col_geom}")
        self.conteo = self._con.execute(
            f'SELECT COUNT(*) AS n FROM "{self.capa}"'
        ).fetchone()["n"]
        try:
            self.application_id = self._con.execute("PRAGMA application_id").fetchone()[0]
        except sqlite3.Error:
            self.application_id = None
        try:
            self.user_version = self._con.execute("PRAGMA user_version").fetchone()[0]
        except sqlite3.Error:
            self.user_version = None

    # ---------------------------------------------------------------- acceso

    def _campos_atributo(self):
        return [c for c in self.nombres_columnas if c not in ("fid", self.col_geom)]

    def iter_features(self):
        """Itera (fid, propiedades dict, geometría shapely). Geometría None si NULL."""
        with fiona.open(str(self.ruta), layer=self.capa) as c:
            for f in c:
                g = None
                if f.get("geometry") is not None:
                    try:
                        g = shape(dict(f["geometry"]))
                    except Exception:  # noqa: BLE001 - defensa contra blob corrupto
                        g = None
                yield (f["id"], dict(f["properties"] or {}), g)

    def capa_h1(self) -> str:
        """SHA-256 de líneas canónicas `fid|attrs|hex(blob_geom)` (streaming)."""
        digest = sha256()
        cur = self._con.execute(f'SELECT * FROM "{self.capa}" ORDER BY fid')
        cols = self._campos_atributo()
        for fila in cur:
            bits = [str(fila["fid"])]
            bits.extend(str(fila[c]) for c in cols)
            geom = fila[self.col_geom]
            bits.append(binascii.hexlify(bytes(geom)).decode("ascii") if geom else "NULL")
            digest.update("|".join(bits).encode("utf-8"))
            digest.update(b"\n")
        return digest.hexdigest()

    def estadisticas_capa(self) -> dict:
        """Estadísticas agregadas deterministas (atributos + geometría)."""
        nombres = ("SegmentID", "Order", "Length")
        presentes = [c for c in self._campos_atributo() if c in nombres]
        nulls = {c: 0 for c in presentes}
        segment_ids: set[int] = set()
        dup_segmentos = 0
        ordenes: set[int] = set()
        longitudes_attr = 0.0
        longitud_geom = 0.0
        n_geom = 0
        n_none = 0
        n_vacias = 0
        n_multilinestring = 0
        tipos_geometricos: set[str] = set()
        extremos: dict[tuple, int] = {}
        for _fid, props, g in self.iter_features():
            if g is None:
                n_none += 1
            else:
                n_geom += 1
                tipos_geometricos.add(g.geom_type)
                if g.is_empty:
                    n_vacias += 1
                if g.geom_type == "MultiLineString":
                    n_multilinestring += 1
                try:
                    longitud_geom += float(g.length)
                except (TypeError, ValueError):
                    pass
                partes = g.geoms if g.geom_type.startswith("Multi") else [g]
                for linea in partes:
                    coords = list(linea.coords)
                    if not coords:
                        continue
                    k0 = (round(float(coords[0][0]), 6), round(float(coords[0][1]), 6))
                    k1 = (round(float(coords[-1][0]), 6), round(float(coords[-1][1]), 6))
                    extremos[k0] = extremos.get(k0, 0) + 1
                    if k1 != k0:
                        extremos[k1] = extremos.get(k1, 0) + 1
            for c in presentes:
                v = props.get(c)
                if v is None:
                    nulls[c] += 1
            seg = props.get("SegmentID")
            if seg is not None:
                try:
                    si = int(seg)
                except (TypeError, ValueError):
                    si = None
                if si is not None:
                    if si in segment_ids:
                        dup_segmentos += 1
                    segment_ids.add(si)
            ord_ = props.get("Order")
            if ord_ is not None:
                try:
                    ordenes.add(int(ord_))
                except (TypeError, ValueError):
                    pass
            lg = props.get("Length")
            if lg is not None:
                try:
                    longitudes_attr += float(lg)
                except (TypeError, ValueError):
                    pass
        return {
            "conteo": self.conteo,
            "n_geom": n_geom,
            "n_geom_nulas": n_none,
            "n_geom_vacias": n_vacias,
            "n_multilinestring": n_multilinestring,
            "tipos_geometricos": sorted(tipos_geometricos),
            "segment_ids_unicos": len(segment_ids),
            "segment_ids_duplicados": dup_segmentos,
            "ordenes_distintos": sorted(ordenes),
            "longitud_attr_total_m": round(longitudes_attr, 3),
            "longitud_geom_total_m": round(longitud_geom, 3),
            "nulls_por_atributo": nulls,
            "extremos_totales": sum(extremos.values()),
            "extremos_compartidos": sum(1 for v in extremos.values() if v > 1),
        }


__all__ = ["GeoPackageSource", "GeoPackageError"]