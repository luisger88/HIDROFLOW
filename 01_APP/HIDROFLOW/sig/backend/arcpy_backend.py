# sig/backend/arcpy_backend.py

import arcpy
from arcpy import env
from arcpy.sa import *


class ArcPyBackend:
    """
    Backend SIG basado en ArcPy / ArcToolbox.
    Implementa el flujo DSM → Cuenca → Morfometría base.
    """

    def __init__(self, workspace=None):
        self.workspace = workspace or env.workspace
        env.workspace = self.workspace
        env.overwriteOutput = True

    def delimitar_cuenca(self, outlet: dict) -> dict:
        """
        Delimita la cuenca a partir de un punto de salida
        y retorna métricas geométricas básicas.
        """

        # -------------------------
        # 1. DEM / DSM de entrada
        # -------------------------
        dsm = "dsm.tif"  # ← configurable después

        # A. Fill
        dsm_fill = Fill(dsm)

        # B. Flow Direction (D8)
        flow_dir = FlowDirection(dsm_fill, "D8")

        # C. Flow Accumulation
        flow_acc = FlowAccumulation(flow_dir)

        # -------------------------
        # 2. Red de drenaje
        # -------------------------
        umbral_celdas = 1000  # parámetro configurable
        cauces = Con(flow_acc > umbral_celdas, 1)

        # -------------------------
        # 3. Punto de salida
        # -------------------------
        # Se asume que el punto ya fue creado como feature class
        pour_point_fc = "pour_point.shp"

        # -------------------------
        # 4. Watershed
        # -------------------------
        cuenca_raster = Watershed(flow_dir, pour_point_fc)

        # -------------------------
        # 5. Raster → Polígono
        # -------------------------
        cuenca_vector = "cuenca.shp"
        arcpy.RasterToPolygon_conversion(
            cuenca_raster, cuenca_vector, "NO_SIMPLIFY"
        )

        # -------------------------
        # 6. Geometría básica
        # -------------------------
        arcpy.CalculateGeometryAttributes_management(
            cuenca_vector,
            [
                ["AREA_KM2", "AREA"],
                ["PERIM_KM", "PERIMETER_LENGTH"]
            ],
            area_unit="KILOMETERS"
        )

        with arcpy.da.SearchCursor(
            cuenca_vector,
            ["AREA_KM2", "PERIM_KM"]
        ) as cursor:
            area_km2, perimetro_km = next(cursor)

        # -------------------------
        # 7. Cotas
        # -------------------------
        minmax = ZonalStatisticsAsTable(
            cuenca_vector, "FID",
            dsm_fill, "cotas.dbf",
            statistics_type="MIN_MAX"
        )

        with arcpy.da.SearchCursor(
            minmax, ["MIN", "MAX"]
        ) as cursor:
            cota_min, cota_max = next(cursor)

        # -------------------------
        # 8. Pendiente media
        # -------------------------
        slope = Slope(dsm_fill, "PERCENT_RISE")

        slope_stats = ZonalStatisticsAsTable(
            cuenca_vector, "FID",
            slope, "pendiente.dbf",
            statistics_type="MEAN"
        )

        with arcpy.da.SearchCursor(
            slope_stats, ["MEAN"]
        ) as cursor:
            pendiente_media = next(cursor)[0]

        # -------------------------
        # 9. Orden de red (Strahler)
        # -------------------------
        stream_link = StreamLink(cauces, flow_dir)
        stream_order = StreamOrder(stream_link, flow_dir, "STRAHLER")

        max_order = int(
            arcpy.GetRasterProperties_management(
                stream_order, "MAXIMUM"
            ).getOutput(0)
        )

        # -------------------------
        # 10. Longitud total de cauces
        # -------------------------
        cauces_vec = "cauces.shp"
        arcpy.RasterToPolyline_conversion(cauces, cauces_vec)

        longitud_total = 0.0
        with arcpy.da.SearchCursor(cauces_vec, ["SHAPE@LENGTH"]) as cursor:
            for row in cursor:
                longitud_total += row[0]

        longitud_cauces_km = longitud_total / 1000.0

        # -------------------------
        # 11. Resultado contractual
        # -------------------------
        return {
            "area_km2": area_km2,
            "perimetro_km": perimetro_km,
            "cota_max_msnm": cota_max,
            "cota_min_msnm": cota_min,
            "pendiente_media_pct": pendiente_media,
            "longitud_cauces_km": longitud_cauces_km,
            "orden_max_strahler": max_order
        }