# -*- coding: utf-8 -*-
# ============================================================
# HFGeomorfologiav1.py
# Modulo 1 — Geomorfologia por Cuenca
# Consume rasters _Base (ya calculados)
# HidroFlow v3.1 | AMVA
# ============================================================

import arcpy
import os
import math
import time

arcpy.env.overwriteOutput = True
arcpy.CheckOutExtension("Spatial")

# ------------------------------------------------------------
# PARAMETROS
# ------------------------------------------------------------
MDE       = arcpy.GetParameterAsText(0)           # MDT_Fill_Base
Latitud   = float(arcpy.GetParameterAsText(1).replace(",", "."))
Longitud  = float(arcpy.GetParameterAsText(2).replace(",", "."))
Nombre    = arcpy.GetParameterAsText(3)           # Nombre quebrada = sufijo
GDB       = arcpy.GetParameterAsText(4)           # Workspace salida
Umbral    = arcpy.GetParameterAsText(5)
Dist      = arcpy.GetParameterAsText(6)
Snap_dist = arcpy.GetParameterAsText(7)

# Defaults
Umbral    = int(Umbral) if Umbral else 150000
Dist      = float(Dist) if Dist else 5.0
Snap_dist = float(Snap_dist) if Snap_dist else 30.0

# ------------------------------------------------------------
# RASTERS BASE (ya existen, no se recalculan)
# ------------------------------------------------------------
FlowDir_Base = os.path.join(GDB, "FlowDir_Base")
FlowAcc_Base = os.path.join(GDB, "FlowAcc_Base")
Slope_Base   = os.path.join(GDB, "Slope_Base")
StreamNet_Base = os.path.join(GDB, "StreamNet_Strahler_150k")

# Verificar que existan
for rb, nombre_rb in [(MDE, "MDT_Fill_Base"),
                       (FlowDir_Base, "FlowDir_Base"),
                       (FlowAcc_Base, "FlowAcc_Base"),
                       (Slope_Base, "Slope_Base"),
                       (StreamNet_Base, "StreamNet_Strahler_150k")]:
    if not arcpy.Exists(rb):
        arcpy.AddError("FALTA RASTER BASE: " + nombre_rb)
        raise SystemExit

# ------------------------------------------------------------
# RUTAS DE SALIDA POR CUENCA
# ------------------------------------------------------------
# Fase 2 — Cuenca
PC_out       = os.path.join(GDB, "PC_" + Nombre)
PC_snap      = os.path.join(GDB, "PC_Snap_" + Nombre)
Cuenca_raster = os.path.join(GDB, "Cuenca_R_" + Nombre)
Cuenca_out   = os.path.join(GDB, "Cuenca_" + Nombre)
MDT_Cuenca   = os.path.join(GDB, "MDT_Cuenca_" + Nombre)
Slope_Cuenca = os.path.join(GDB, "Slope_Cuenca_" + Nombre)
Red_Hidrica  = os.path.join(GDB, "Red_Hidrica_" + Nombre)

# Fase 3 — Eje principal
Eje_Base     = os.path.join(GDB, "Eje_Base_" + Nombre)

# Fase 4 — Perfil + Parametros
Eje_Continuo = os.path.join(GDB, "Eje_Continuo_" + Nombre)
PerfilPts    = os.path.join(GDB, "PerfilPts_Continuo_" + Nombre)
Tramos_Geom  = os.path.join(GDB, "Tramos_Geomorf_" + Nombre)
Params_Geom  = os.path.join(GDB, "Parametros_Geomorf_" + Nombre)

# Carpeta exportaciones
gdb_padre  = os.path.dirname(GDB)
export_dir = os.path.join(gdb_padre, "Exportaciones", Nombre)
if not os.path.exists(export_dir):
    os.makedirs(export_dir)

inicio = time.time()

# ============================================================
# FASE 2 — DELIMITACION DE CUENCA
# ============================================================
arcpy.AddMessage("=" * 50)
arcpy.AddMessage("MODULO 1 — GEOMORFOLOGIA POR CUENCA")
arcpy.AddMessage("Quebrada: " + Nombre)
arcpy.AddMessage("Lat: " + str(Latitud) + "  Lon: " + str(Longitud))
arcpy.AddMessage("=" * 50)

try:
    # 2.1 Crear punto de control desde Lat/Lon
    arcpy.AddMessage("2.1 Creando punto de control...")
    t1 = time.time()
    sr_wgs84 = arcpy.SpatialReference(4326)  # WGS84
    sr_mdt   = arcpy.Describe(MDE).spatialReference
    arcpy.AddMessage("    SRC MDT: " + sr_mdt.name)

    pt = arcpy.PointGeometry(arcpy.Point(Longitud, Latitud), sr_wgs84)
    pt_proj = pt.projectAs(sr_mdt)

    arcpy.management.CreateFeatureclass(
        GDB, "PC_" + Nombre, "POINT", spatial_reference=sr_mdt)
    with arcpy.da.InsertCursor(PC_out, ["SHAPE@"]) as cur:
        cur.insertRow([pt_proj])

    arcpy.AddMessage("    -> " + os.path.basename(PC_out) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")
    arcpy.AddMessage("    Coords proyectadas: " +
                     str(round(pt_proj.firstPoint.X, 2)) + ", " +
                     str(round(pt_proj.firstPoint.Y, 2)))

    # 2.2 Snap Pour Point
    arcpy.AddMessage("2.2 Snap Pour Point (dist=" +
                     str(Snap_dist) + " m)...")
    t1 = time.time()
    facc_raster = arcpy.sa.Raster(FlowAcc_Base)
    snap_result = arcpy.sa.SnapPourPoint(PC_out, facc_raster,
                                          Snap_dist)
    snap_result.save(PC_snap)
    del facc_raster
    arcpy.AddMessage("    -> " + os.path.basename(PC_snap) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

    # 2.3 Watershed
    arcpy.AddMessage("2.3 Delimitando cuenca...")
    t1 = time.time()
    fdir_raster = arcpy.sa.Raster(FlowDir_Base)
    ws_result = arcpy.sa.Watershed(fdir_raster, snap_result)
    ws_result.save(Cuenca_raster)
    del fdir_raster, snap_result
    arcpy.AddMessage("    -> " + os.path.basename(Cuenca_raster) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

    # 2.4 Convertir cuenca a poligono
    arcpy.AddMessage("2.4 Convirtiendo cuenca a poligono...")
    t1 = time.time()
    arcpy.conversion.RasterToPolygon(
        Cuenca_raster, Cuenca_out, "SIMPLIFY", "Value")
    arcpy.AddMessage("    -> " + os.path.basename(Cuenca_out) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

    # 2.5 Clip MDT a cuenca
    arcpy.AddMessage("2.5 Recortando MDT a cuenca...")
    t1 = time.time()
    arcpy.management.Clip(MDE, "", MDT_Cuenca, Cuenca_out,
                          "", "ClippingGeometry")
    arcpy.AddMessage("    -> " + os.path.basename(MDT_Cuenca) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

    # 2.6 Clip Slope a cuenca
    arcpy.AddMessage("2.6 Recortando Slope a cuenca...")
    t1 = time.time()
    arcpy.management.Clip(Slope_Base, "", Slope_Cuenca, Cuenca_out,
                          "", "ClippingGeometry")
    arcpy.AddMessage("    -> " + os.path.basename(Slope_Cuenca) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

    # 2.7 Clip red hidrica a cuenca
    arcpy.AddMessage("2.7 Recortando red hidrica a cuenca...")
    t1 = time.time()
    arcpy.analysis.Clip(StreamNet_Base, Cuenca_out, Red_Hidrica)
    arcpy.AddMessage("    -> " + os.path.basename(Red_Hidrica) +
                     " (" + str(round(time.time() - t1, 1)) + " s)")

except Exception as e:
    arcpy.AddError("ERROR en Fase 2: " + str(e))
    raise

# ============================================================
# CIERRE FASE 2
# ============================================================
elapsed = round(time.time() - inicio, 1)
arcpy.AddMessage("=" * 50)
arcpy.AddMessage("FASE 2 COMPLETADA (" + str(elapsed) + " s)")
arcpy.AddMessage("  Punto control: " + os.path.basename(PC_out))
arcpy.AddMessage("  Snap:          " + os.path.basename(PC_snap))
arcpy.AddMessage("  Cuenca raster: " + os.path.basename(Cuenca_raster))
arcpy.AddMessage("  Cuenca vector: " + os.path.basename(Cuenca_out))
arcpy.AddMessage("  MDT cuenca:    " + os.path.basename(MDT_Cuenca))
arcpy.AddMessage("  Slope cuenca:  " + os.path.basename(Slope_Cuenca))
arcpy.AddMessage("  Red hidrica:   " + os.path.basename(Red_Hidrica))
arcpy.AddMessage("  Exportar:      " + export_dir)
arcpy.AddMessage("=" * 50)

# ============================================================
# FASE 3 — EJE PRINCIPAL (proxima iteracion)
# ============================================================

# ============================================================
# FASE 4 — PARAMETROS + PERFIL (proxima iteracion)
# ============================================================

arcpy.CheckInExtension("Spatial")