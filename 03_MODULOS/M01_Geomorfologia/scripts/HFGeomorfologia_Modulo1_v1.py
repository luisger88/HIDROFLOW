# -*- coding: utf-8 -*-
# ============================================================
# HFGeomorfologia_Modulo1_v1.py
# HidroFlow — Modulo 1 Geomorfologia
# Registro inicial automatizable
# ============================================================

import arcpy
import os
import math
from datetime import datetime

arcpy.env.overwriteOutput = True

# ------------------------------------------------------------
# CONFIGURACION BASE
# ------------------------------------------------------------
GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
arcpy.env.workspace = GDB

MDT = os.path.join(GDB, "MDT_Fill_Base")
FLOWDIR = os.path.join(GDB, "FlowDir_Base")
FLOWACC = os.path.join(GDB, "FlowAcc_Base")
SLOPE = os.path.join(GDB, "Slope_Base")
STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")

# ------------------------------------------------------------
# SALIDAS VALIDADAS ACTUALES
# ------------------------------------------------------------
PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")

# ------------------------------------------------------------
# UTILIDADES DE CONTROL
# ------------------------------------------------------------
def existe(path):
    return arcpy.Exists(path)

def borrar_si_existe(path):
    if arcpy.Exists(path):
        arcpy.management.Delete(path)
        arcpy.AddMessage("BORRADO: " + os.path.basename(path))

def limpiar_contents():
    aprx = arcpy.mp.ArcGISProject("CURRENT")
    m = aprx.activeMap

    keywords = [
        "ws",
        "watersh",
        "tmp",
        "clean",
        "stream_lyr",
        "eje_principal_iguana",
        "perfil_puntos_iguana",
        "eje_single",
        "eje_dissolve",
        "tramo_inicial",
        "red_seleccionada"
    ]

    for lyr in m.listLayers():
        try:
            nombre = lyr.longName.lower()
            if any(k in nombre for k in keywords):
                m.removeLayer(lyr)
                arcpy.AddMessage("MAPA REMOVED: " + lyr.longName)
        except Exception:
            pass

def inventario():
    arcpy.AddMessage("=== RASTERS ===")
    for r in arcpy.ListRasters():
        arcpy.AddMessage("  [R] " + r)

    arcpy.AddMessage("=== FEATURE CLASSES ===")
    for fc in arcpy.ListFeatureClasses():
        arcpy.AddMessage("  [FC] " + fc)

    arcpy.AddMessage("=== TABLAS ===")
    for t in arcpy.ListTables():
        arcpy.AddMessage("  [T] " + t)

# ------------------------------------------------------------
# ESTADO ACTUAL
# ------------------------------------------------------------
def validar_estado_actual():
    requeridos = [
        MDT,
        FLOWDIR,
        FLOWACC,
        SLOPE,
        STREAMNET,
        PC_OBRA,
        PC_SNAP,
        CUENCA_R,
        CUENCA_POLY,
        RED_HIDRICA,
        RED_Z,
        CABECERA
    ]

    faltantes = []

    for item in requeridos:
        if not arcpy.Exists(item):
            faltantes.append(os.path.basename(item))

    if faltantes:
        arcpy.AddWarning("FALTAN DATASETS:")
        for f in faltantes:
            arcpy.AddWarning(" - " + f)
    else:
        arcpy.AddMessage("ESTADO VALIDADO: todos los insumos principales existen.")

# ------------------------------------------------------------
# EJECUCION ACTUAL DE CONTROL
# ------------------------------------------------------------
if __name__ == "__main__":
    arcpy.AddMessage("HidroFlow Modulo 1 Geomorfologia — Registro v1")
    arcpy.AddMessage("Fecha: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    validar_estado_actual()
    inventario()
