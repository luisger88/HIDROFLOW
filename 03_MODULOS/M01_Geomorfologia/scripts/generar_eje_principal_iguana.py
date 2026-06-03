# ==========================================================
# EJE PRINCIPAL LA IGUANÁ
# Nacimiento geomorfológico → PC_80
# Método: máxima longitud acumulada aguas arriba
# ==========================================================

import arcpy
import os
import math

arcpy.env.overwriteOutput = True

# ----------------------------------------------------------
# CONFIGURACIÓN EXACTA (TU ENTORNO)
# ----------------------------------------------------------
gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"

# RED HÍDRICA CORRECTA (NO Feature Dataset)
streams_fc = os.path.join(gdb, "StreamNet_Strahler_150k_Iguana")

# PUNTO DE CONTROL (PC_80)
exutorio_fc = os.path.join(gdb, "GF_Exutorio_In")

# DEM HIDROLÓGICO CORRECTO
dem_raster = os.path.join(gdb, "MDT_Fill_Base")

# SALIDA
out_fc = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")

campo_from = "from_node"
campo_to   = "to_node"

usar_dem = arcpy.Exists(dem_raster)
partir_en_exutorio = True

# ----------------------------------------------------------
def dist(p1, p2):
    return math.hypot(p1.X - p2.X, p1.Y - p2.Y)

# ----------------------------------------------------------
# 1. LEER PUNTO DE CONTROL
# ----------------------------------------------------------
with arcpy.da.SearchCursor(exutorio_fc, ["SHAPE@"]) as sc:
    pc_geom = next(sc)[0]

pc_pt = pc_geom.centroid
sr = arcpy.Describe(streams_fc).spatialReference
scratch = arcpy.env.scratchGDB

# ----------------------------------------------------------
# 2. SEGMENTO MÁS CERCANO AL PC
# ----------------------------------------------------------
tmp_pc = os.path.join(scratch, "tmp_pc")
arcpy.management.CreateFeatureclass(scratch, "tmp_pc", "POINT", spatial_reference=sr)

with arcpy.da.InsertCursor(tmp_pc, ["SHAPE@"]) as ic:
    ic.insertRow([arcpy.PointGeometry(pc_pt, sr)])

arcpy.analysis.Near(tmp_pc, streams_fc)

with arcpy.da.SearchCursor(tmp_pc, ["NEAR_FID"]) as sc:
    near_fid = next(sc)[0]

oid_field = arcpy.Describe(streams_fc).OIDFieldName

# ----------------------------------------------------------
# 3. DEFINIR NODO DE SALIDA (AGUAS ABAJO)
# ----------------------------------------------------------
with arcpy.da.SearchCursor(
    streams_fc,
    [oid_field, campo_from, campo_to, "SHAPE@"],
    f"{oid_field} = {near_fid}"
) as sc:
    oid_seg, from_n, to_n, geom_seg = next(sc)

p_ini = geom_seg.firstPoint
p_fin = geom_seg.lastPoint

if usar_dem:
    from arcpy.sa import Sample
    tmp_pts = os.path.join(scratch, "tmp_extremos")
    arcpy.management.CreateFeatureclass(scratch, "tmp_extremos", "POINT", spatial_reference=sr)

    with arcpy.da.InsertCursor(tmp_pts, ["SHAPE@"]) as ic:
        ic.insertRow([arcpy.PointGeometry(p_ini, sr)])
        ic.insertRow([arcpy.PointGeometry(p_fin, sr)])

    tbl = os.path.join(scratch, "tmp_mdt")
    Sample(dem_raster, tmp_pts, tbl)

    campos = [f.name for f in arcpy.ListFields(tbl)
              if f.type in ("Double", "Single", "Integer")]

    with arcpy.da.SearchCursor(tbl, [campos[0]]) as sc:
        z_ini = next(sc)[0]
        z_fin = next(sc)[0]

    nodo_outlet = from_n if z_ini < z_fin else to_n
else:
    nodo_outlet = to_n

# ----------------------------------------------------------
# 4. CONECTIVIDAD AGUAS ARRIBA
# ----------------------------------------------------------
upstream = {}

with arcpy.da.SearchCursor(
    streams_fc,
    [oid_field, campo_from, campo_to, "Shape_Length"]
) as sc:
    for oid, fn, tn, sl in sc:
        upstream.setdefault(tn, []).append((fn, oid, sl))

# ----------------------------------------------------------
# 5. MÁXIMA LONGITUD ACUMULADA
# ----------------------------------------------------------
memo = {}
parent = {}

def mejor_longitud(nodo):
    if nodo in memo:
        return memo[nodo]
    if nodo not in upstream:
        memo[nodo] = 0
        return 0

    best = 0
    best_up = None
    best_oid = None

    for up, oid, sl in upstream[nodo]:
        val = sl + mejor_longitud(up)
        if val > best:
            best = val
            best_up = up
            best_oid = oid

    if best_up is not None:
        parent[nodo] = (best_up, best_oid)

    memo[nodo] = best
    return best

mejor_longitud(nodo_outlet)

# ----------------------------------------------------------
# 6. RECONSTRUIR RUTA
# ----------------------------------------------------------
oid_ruta = []
n = nodo_outlet

while n in parent:
    up, oid = parent[n]
    oid_ruta.append(oid)
    n = up

# ----------------------------------------------------------
# 7. EXPORTAR EJE PRINCIPAL
# ----------------------------------------------------------
lyr = "lyr_streams"
arcpy.management.MakeFeatureLayer(streams_fc, lyr)
arcpy.management.SelectLayerByAttribute(
    lyr,
    "NEW_SELECTION",
    f"{oid_field} IN ({','.join(map(str, oid_ruta))})"
)

tmp_sel = os.path.join(scratch, "tmp_eje")
arcpy.management.CopyFeatures(lyr, tmp_sel)

if arcpy.Exists(out_fc):
    arcpy.management.Delete(out_fc)

arcpy.management.Dissolve(tmp_sel, out_fc)

# ----------------------------------------------------------
# 8. AJUSTAR EXACTAMENTE AL PC
# ----------------------------------------------------------
if partir_en_exutorio:
    tmp_split = os.path.join(scratch, "tmp_split")
    arcpy.management.SplitLineAtPoint(out_fc, tmp_pc, tmp_split, "2 Meters")
    arcpy.management.CopyFeatures(tmp_split, out_fc)

print("✅ Eje principal generado correctamente:")
print(out_fc)
