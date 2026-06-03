import arcpy
import os

arcpy.env.overwriteOutput = True

# ==================================================
# PARÁMETROS (solo cambia aquí)
# ==================================================
gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"

# Eje completo ya generado por tu script exitoso
nombre_eje_completo = "EjePrincipal_Iguana_Nacimiento_PC80"
nombre_pc = "GF_Exutorio_In"

# Distancia a excluir aguas arriba del PC (m)
distancia_aguas_arriba = 450.0

# Salida recortada
nombre_salida = f"Eje_Geomorfologico_{int(distancia_aguas_arriba)}m"

# ==================================================
# Rutas
# ==================================================
eje_fc = os.path.join(gdb, nombre_eje_completo)
pc_fc  = os.path.join(gdb, nombre_pc)
out_fc = os.path.join(gdb, nombre_salida)

# ==================================================
# Proceso
# ==================================================
sr = arcpy.Describe(eje_fc).spatialReference

with arcpy.da.SearchCursor(eje_fc, ["SHAPE@"]) as sc:
    eje_geom = next(sc)[0]

with arcpy.da.SearchCursor(pc_fc, ["SHAPE@"]) as sc:
    pc_geom = next(sc)[0]

# Asegurar que el PC cae sobre el eje (snap geométrico)
pc_geom = eje_geom.snapToLine(pc_geom)

# Distancia acumulada desde el inicio (Nacimiento) hasta el PC
dist_pc = eje_geom.measureOnLine(pc_geom)  # [2](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)

# Punto final del tramo geomorfológico: PC - X
dist_fin = dist_pc - distancia_aguas_arriba

arcpy.AddMessage(f"Distancia acumulada al PC sobre el eje: {dist_pc:.2f} m")
arcpy.AddMessage(f"Recorte solicitado aguas arriba del PC: {distancia_aguas_arriba:.2f} m")
arcpy.AddMessage(f"Fin del tramo (Nacimiento → PC-X): {dist_fin:.2f} m desde el inicio")

if dist_fin <= 0:
    raise RuntimeError(
        f"No es posible recortar {distancia_aguas_arriba:.2f} m: "
        f"solo hay {dist_pc:.2f} m antes del PC sobre el eje."
    )

# Segmento: Nacimiento (0) → (PC - X)
geom_final = eje_geom.segmentAlongLine(0, dist_fin, use_percentage=False)  # [3](https://community.esri.com/t5/python-questions/arcpy-segmentalongline-full-syntax/td-p/582843)[2](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)

# Guardar salida
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

arcpy.AddMessage("✅ Resultado creado/actualizado:")
arcpy.AddMessage(out_fc)
arcpy.AddMessage(f"📏 Longitud del tramo geomorfológico: {geom_final.length:.2f} m")