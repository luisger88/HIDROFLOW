import arcpy
import os

arcpy.env.overwriteOutput = True

# ===============================
# PARÁMETROS
# ===============================
gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"

eje_fc = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")
pc_fc  = os.path.join(gdb, "GF_Exutorio_In")

distancia_aguas_arriba = 450.0  # metros
out_fc = os.path.join(gdb, "Eje_Geomorfologico_450m")

# ===============================
# LECTURA
# ===============================
sr = arcpy.Describe(eje_fc).spatialReference

with arcpy.da.SearchCursor(eje_fc, ["SHAPE@"]) as cur:
    eje_geom = next(cur)[0]

with arcpy.da.SearchCursor(pc_fc, ["SHAPE@"]) as cur:
    pc_geom = next(cur)[0]

# Asegurar que el PC esté sobre el eje
pc_geom = eje_geom.snapToLine(pc_geom)

# ===============================
# MEDICIÓN Y RECORTE
# ===============================
dist_pc = eje_geom.measureOnLine(pc_geom)
dist_fin = dist_pc - distancia_aguas_arriba

if dist_fin <= 0:
    raise RuntimeError(
        f"No hay {distancia_aguas_arriba} m aguas arriba del PC "
        f"(solo {dist_pc:.2f} m disponibles)"
    )

geom_final = eje_geom.segmentAlongLine(
    0, dist_fin, use_percentage=False
)

# ===============================
# SALIDA
# ===============================
if arcpy.Exists(out_fc):
    arcpy.management.Delete(out_fc)

arcpy.management.CreateFeatureclass(
    os.path.dirname(out_fc),
    os.path.basename(out_fc),
    "POLYLINE",
    spatial_reference=sr
)

with arcpy.da.InsertCursor(out_fc, ["SHAPE@"]) as ic:
    ic.insertRow([geom_final])

print("✅ Recorte geomorfológico generado correctamente")
print(out_fc)
print(f"📏 Longitud: {geom_final.length:.2f} m")