import arcpy
import os

arcpy.env.overwriteOutput = True

# ===============================
# PARÁMETROS (AJUSTA SOLO ESTO)
# ===============================
gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"

# Eje completo del cauce principal (línea) - AJUSTA al nombre real que estés usando como "cauce principal completo"
eje_fc = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")

# Punto(s) de control (tiene duplicado)
pc_fc  = os.path.join(gdb, "GF_Exutorio_In")
pc_where = "ID_PC = 'PC_CR80'"  # clave para evitar el punto duplicado

# Superficie para decidir nacimiento por cota (MDT 1m)
mdt_raster = os.path.join(gdb, "MDT_Fill_Base")

# Cuenca (para nombrar automáticamente) - usa el polígono de cuenca en tu GDB
cuenca_fc = os.path.join(gdb, "Watersh_Iguana_PC_CR80_Poly")

# ===============================
# HELPERS (nombres automáticos)
# ===============================
def _clean_tag(name: str) -> str:
    """Deja un tag corto, sin espacios raros, listo para nombres de FC."""
    name = os.path.basename(name)
    for t in ["Watersh_", "Watershed_", "_Poly", ".shp", ".gdb"]:
        name = name.replace(t, "")
    name = name.replace(" ", "_").replace("-", "_")
    return name

CUENCA_ID = _clean_tag(cuenca_fc)       # ej: Iguana_PC_CR80
PC_ID = "PC_CR80"

out_name = f"EjePrincipal_PC_a_Nacimiento_{CUENCA_ID}_{PC_ID}"
out_fc = os.path.join(gdb, out_name)

# ===============================
# LECTURA GEOMETRÍAS
# ===============================
sr = arcpy.Describe(eje_fc).spatialReference

with arcpy.da.SearchCursor(eje_fc, ["SHAPE@"]) as cur:
    row = next(cur, None)
    if not row:
        raise RuntimeError(f"No hay geometría en {eje_fc}")
    eje = row[0]

pc_geom = None
with arcpy.da.SearchCursor(pc_fc, ["SHAPE@"], where_clause=pc_where) as cur:
    row = next(cur, None)
    if row:
        pc_geom = row[0]
if pc_geom is None:
    raise RuntimeError(f"No encontré el PC con {pc_where} en {pc_fc}")

# Snap del PC a la línea
pc_snap = eje.snapToLine(pc_geom)

# Distancia del PC medida desde el inicio del eje (según orientación del eje)
m_pc = eje.measureOnLine(pc_snap)
L_total = eje.length

# ===============================
# DETERMINAR NACIMIENTO (extremo aguas arriba)
# 1) Preferente: por elevación en MDT (extremo más alto = nacimiento)
# 2) Fallback: por posición (si PC está más cerca del final, el inicio es nacimiento)
# ===============================
p_ini = arcpy.PointGeometry(eje.firstPoint, sr)
p_fin = arcpy.PointGeometry(eje.lastPoint, sr)

nacimiento_es_inicio = None

try:
    # Muestreo directo de valor raster en un punto (sin crear FC intermedias)
    # ArcPy permite GetCellValue para raster en coordenada
    # (esto evita herramientas adicionales)
    x1, y1 = p_ini.centroid.X, p_ini.centroid.Y
    x2, y2 = p_fin.centroid.X, p_fin.centroid.Y

    z1 = float(arcpy.management.GetCellValue(mdt_raster, f"{x1} {y1}").getOutput(0))
    z2 = float(arcpy.management.GetCellValue(mdt_raster, f"{x2} {y2}").getOutput(0))

    nacimiento_es_inicio = (z1 >= z2)  # más alto = nacimiento

except Exception:
    # Fallback robusto: asume PC cerca del outlet; el nacimiento queda al lado más largo
    # Si el PC está más cerca del final, el inicio suele ser nacimiento
    nacimiento_es_inicio = (m_pc > (L_total / 2.0))

# ===============================
# CONSTRUIR SEGMENTO PC→NACIMIENTO y LONGITUD
# ===============================
if nacimiento_es_inicio:
    # nacimiento = inicio; segmento desde inicio hasta PC
    seg_pc_nac = eje.segmentAlongLine(0, m_pc, use_percentage=False)
    long_pc_nac = seg_pc_nac.length
else:
    # nacimiento = final; segmento desde PC hasta final
    seg_pc_nac = eje.segmentAlongLine(m_pc, L_total, use_percentage=False)
    long_pc_nac = seg_pc_nac.length

# ===============================
# SALIDA (feature class)
# ===============================
if arcpy.Exists(out_fc):
    arcpy.management.Delete(out_fc)

arcpy.management.CopyFeatures(seg_pc_nac, out_fc)

print("✅ Segmento PC→Nacimiento generado:")
print(out_fc)
print(f"📏 Longitud PC→Nacimiento: {long_pc_nac:.2f} m  ({long_pc_nac/1000.0:.3f} km)")
print(f"ℹ️ CUENCA_ID={CUENCA_ID} | PC_ID={PC_ID} | nacimiento_es_inicio={nacimiento_es_inicio}")
