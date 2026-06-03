# -*- coding: utf-8 -*-
# ============================================================
# HFGeomorfologia_Modulo1_v2.py
# HidroFlow — Módulo 1 Geomorfología
# Versión consolidada de control y validación del flujo La Iguaná
# Última actualización: 2026-05-24 00:19:02
# ============================================================

import arcpy
import os
from datetime import datetime

arcpy.env.overwriteOutput = True

# ============================================================
# CONFIGURACIÓN BASE
# ============================================================

GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
arcpy.env.workspace = GDB

NOMBRE = "Iguana"

# Rasters base
MDT = os.path.join(GDB, "MDT_Fill_Base")
FLOWDIR = os.path.join(GDB, "FlowDir_Base")
FLOWACC = os.path.join(GDB, "FlowAcc_Base")
SLOPE = os.path.join(GDB, "Slope_Base")

# Red base
STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")

# Productos principales
PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")

EJE_CONTINUO = os.path.join(GDB, "Eje_Principal_Continuo_Iguana")

PERFIL_PTS = os.path.join(GDB, "Perfil_Puntos_Iguana")
PERFIL_Z = os.path.join(GDB, "Perfil_Puntos_Z_Iguana")
PERFIL_ZM = os.path.join(GDB, "Perfil_Puntos_ZM_Iguana")
PERFIL_VAR = os.path.join(GDB, "Perfil_Puntos_VAR_Iguana")
PERFIL_QC = os.path.join(GDB, "Perfil_Puntos_QC_Iguana")
PERFIL_QUIEBRES = os.path.join(GDB, "Perfil_Puntos_QUIEBRES_Iguana")
PERFIL_SEG_QC = os.path.join(GDB, "Perfil_Puntos_SEG_QC_Iguana")

PUNTOS_QUIEBRE_QC = os.path.join(GDB, "Puntos_Quiebre_QC_Iguana")
TRAMOS_QC = os.path.join(GDB, "Tramos_Geomorf_QC_Iguana")
TRAMOS_LINEAS_QC = os.path.join(GDB, "Tramos_Geomorf_Lineas_QC_Iguana")
PARAMS = os.path.join(GDB, "Parametros_Geomorf_Iguana")

EXPORT_TABLAS = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\Exportaciones\Iguana\02_Tablas"

# ============================================================
# UTILIDADES
# ============================================================

def msg(texto):
    try:
        arcpy.AddMessage(str(texto))
    except Exception:
        pass
    print(str(texto))

def existe(path):
    return arcpy.Exists(path)

def validar_requeridos(lista):
    faltantes = []

    for path, nombre in lista:
        if not arcpy.Exists(path):
            faltantes.append(nombre)

    if faltantes:
        raise Exception("Faltan datasets requeridos: " + ", ".join(faltantes))

    msg("OK: todos los datasets requeridos existen.")

def limpiar_contents():
    try:
        aprx = arcpy.mp.ArcGISProject("CURRENT")
        m = aprx.activeMap

        keywords = [
            "ws",
            "watersh",
            "tmp",
            "clean",
            "stream_lyr",
            "ruta_lyr",
            "quiebres_lyr",
            "quiebres_qc_lyr"
        ]

        for lyr in m.listLayers():
            try:
                nombre = lyr.longName.lower()
                if any(k in nombre for k in keywords):
                    m.removeLayer(lyr)
                    msg("MAPA REMOVED: " + lyr.longName)
            except Exception:
                pass

        msg("OK: limpieza visual de temporales ejecutada.")

    except Exception as e:
        msg("Aviso: limpieza Contents no ejecutada: " + str(e))

def inventario():
    msg("=== RASTERS ===")
    for r in arcpy.ListRasters():
        msg("  [R] " + r)

    msg("=== FEATURE CLASSES ===")
    for fc in arcpy.ListFeatureClasses():
        msg("  [FC] " + fc)

    msg("=== TABLAS ===")
    for t in arcpy.ListTables():
        msg("  [T] " + t)

def resumen_parametros():
    if not arcpy.Exists(PARAMS):
        msg("No existe Parametros_Geomorf_Iguana.")
        return

    campos = [
        "AREA_KM2",
        "PERIM_KM",
        "LONG_CAUC_KM",
        "LONG_PERF_KM",
        "LONG_RED_KM",
        "DENS_DREN",
        "Z_SALIDA",
        "Z_CABECERA",
        "DESNIVEL_M",
        "PEND_MED_PCT",
        "KC_COMPAC",
        "KF_FORMA",
        "N_TRAMOS_QC",
        "N_QUIEBRES"
    ]

    with arcpy.da.SearchCursor(PARAMS, campos) as cur:
        for row in cur:
            msg("=== RESUMEN PARAMETROS GEOMORF ===")
            for c, v in zip(campos, row):
                msg(f"  {c}: {v}")

def resumen_tramos_qc():
    if not arcpy.Exists(TRAMOS_QC):
        msg("No existe Tramos_Geomorf_QC_Iguana.")
        return

    total = int(arcpy.management.GetCount(TRAMOS_QC)[0])

    long_min = None
    long_max = None

    with arcpy.da.SearchCursor(TRAMOS_QC, ["LONG_TRAMO_M"]) as cur:
        for row in cur:
            lm = row[0]
            if lm is None:
                continue
            long_min = lm if long_min is None else min(long_min, lm)
            long_max = lm if long_max is None else max(long_max, lm)

    msg("=== RESUMEN TRAMOS QC ===")
    msg("  Total tramos QC: " + str(total))
    msg("  Longitud mínima tramo m: " + str(long_min))
    msg("  Longitud máxima tramo m: " + str(long_max))

def resumen_exportaciones():
    if not os.path.exists(EXPORT_TABLAS):
        msg("No existe carpeta de exportaciones: " + EXPORT_TABLAS)
        return

    archivos = os.listdir(EXPORT_TABLAS)
    xlsx = [a for a in archivos if a.lower().endswith(".xlsx")]
    csv = [a for a in archivos if a.lower().endswith(".csv")]

    msg("=== RESUMEN EXPORTACIONES ===")
    msg("  Carpeta: " + EXPORT_TABLAS)
    msg("  XLSX: " + str(len(xlsx)))
    msg("  CSV: " + str(len(csv)))
    msg("  Total archivos: " + str(len(archivos)))

# ============================================================
# EJECUCIÓN DE CONTROL
# ============================================================

if __name__ == "__main__":

    msg("========================================")
    msg("HidroFlow Módulo 1 Geomorfología v2")
    msg("Control de estado consolidado")
    msg("Fecha ejecución: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    msg("========================================")

    validar_requeridos([
        (MDT, "MDT_Fill_Base"),
        (FLOWDIR, "FlowDir_Base"),
        (FLOWACC, "FlowAcc_Base"),
        (SLOPE, "Slope_Base"),
        (STREAMNET, "StreamNet_Strahler_150k"),
        (PC_OBRA, "PC_Obra_Iguana"),
        (PC_SNAP, "PC_Snap_Obra_Iguana"),
        (CUENCA_R, "Cuenca_R_Obra_Iguana"),
        (CUENCA_POLY, "Cuenca_Obra_Iguana"),
        (RED_HIDRICA, "Red_Hidrica_Obra_Iguana"),
        (RED_Z, "Red_Candidata_Z_Iguana"),
        (CABECERA, "Cabecera_Candidata_Iguana"),
        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
        (PERFIL_ZM, "Perfil_Puntos_ZM_Iguana"),
        (PERFIL_VAR, "Perfil_Puntos_VAR_Iguana"),
        (PERFIL_QC, "Perfil_Puntos_QC_Iguana"),
        (PERFIL_QUIEBRES, "Perfil_Puntos_QUIEBRES_Iguana"),
        (PERFIL_SEG_QC, "Perfil_Puntos_SEG_QC_Iguana"),
        (PUNTOS_QUIEBRE_QC, "Puntos_Quiebre_QC_Iguana"),
        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana"),
        (TRAMOS_LINEAS_QC, "Tramos_Geomorf_Lineas_QC_Iguana"),
        (PARAMS, "Parametros_Geomorf_Iguana")
    ])

    resumen_parametros()
    resumen_tramos_qc()
    resumen_exportaciones()
    limpiar_contents()

    msg("========================================")
    msg("FIN CONTROL HIDROFLOW MODULO 1 v2")
    msg("========================================")
