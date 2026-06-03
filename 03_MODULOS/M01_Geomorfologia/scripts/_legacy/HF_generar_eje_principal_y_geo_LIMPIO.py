import arcpy
import os

arcpy.env.overwriteOutput = True

# ==========================================================
# PARÁMETROS (SOLO EDITA AQUÍ)
# ==========================================================
gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"

streams_fc   = os.path.join(gdb, "StreamNet_Strahler_150k_Iguana")
pc_fc        = os.path.join(gdb, "GF_Exutorio_In")
dem_raster   = os.path.join(gdb, "MDT_Fill_Base")  # DEM coherente con hidrología

campo_from = "from_node"
campo_to   = "to_node"

distancia_aguas_arriba = 450.0  # m

out_eje_pc  = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")
out_eje_geo = os.path.join(gdb, f"Eje_Geomorfologico_{int(distancia_aguas_arriba)}m")

# tolerancias para decidir "SIN CAMBIOS"
tol_len = 0.01   # metros
tol_end = 0.05   # metros (distancia entre endpoints)

scratch = arcpy.env.scratchGDB
tmp_paths = []  # para borrar todo al final


# ==========================================================
# UTILIDADES
# ==========================================================
def _unique(name):
    p = os.path.join(scratch, name)
    u = arcpy.CreateUniqueName(p, scratch)
    tmp_paths.append(u)
    return u

def _get_first_geom(fc):
    with arcpy.da.SearchCursor(fc, ["SHAPE@"]) as cur:
        return next(cur)[0]

def _field_value_sample(tbl):
    # Primer campo numérico útil (no OID/Sample_ID)
    num = [f for f in arcpy.ListFields(tbl) if f.type in ("Double", "Single", "Integer", "SmallInteger")]
    num = [f for f in num if f.name.lower() not in ("objectid", "oid", "pointid", "sample_id")]
    if not num:
        raise RuntimeError("No pude identificar el campo de valores en la tabla de Sample.")
    return num[0].name

def _same_geom(g_new, g_old):
    # comparación simple y robusta: longitud + endpoints
    if g_old is None:
        return False
    if abs(g_new.length - g_old.length) > tol_len:
        return False
    d1 = g_new.firstPoint.distanceTo(arcpy.PointGeometry(g_old.firstPoint, g_old.spatialReference))
    d2 = g_new.lastPoint.distanceTo(arcpy.PointGeometry(g_old.lastPoint, g_old.spatialReference))
    return (d1 <= tol_end and d2 <= tol_end)

def _write_single_polyline(out_fc, geom, sr):
    # Si existe, lo reemplaza
    if arcpy.Exists(out_fc):
        arcpy.management.Delete(out_fc)
    arcpy.management.CreateFeatureclass(os.path.dirname(out_fc), os.path.basename(out_fc), "POLYLINE", spatial_reference=sr)
    with arcpy.da.InsertCursor(out_fc, ["SHAPE@"]) as ic:
        ic.insertRow([geom])

def _nodo_outlet_por_dem(near_fid, sr):
    # Obtiene segmento near y decide nodo outlet por menor Z en extremos usando Sample [4](https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/sample.htm)
    oid_field = arcpy.Describe(streams_fc).OIDFieldName
    with arcpy.da.SearchCursor(streams_fc, [oid_field, campo_from, campo_to, "SHAPE@"], f"{oid_field} = {near_fid}") as cur:
        _, from_n, to_n, g = next(cur)

    p1, p2 = g.firstPoint, g.lastPoint
    pts_fc = _unique("tmp_extremos")
    arcpy.management.CreateFeatureclass(scratch, os.path.basename(pts_fc), "POINT", spatial_reference=sr)
    with arcpy.da.InsertCursor(pts_fc, ["SHAPE@"]) as ic:
        ic.insertRow([arcpy.PointGeometry(p1, sr)])
        ic.insertRow([arcpy.PointGeometry(p2, sr)])

    from arcpy.sa import Sample
    tbl = _unique("tmp_sample_dem")
    Sample(dem_raster, pts_fc, tbl)  # [4](https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/sample.htm)

    fld = _field_value_sample(tbl)
    z = [r[0] for r in arcpy.da.SearchCursor(tbl, [fld])]
    if len(z) < 2:
        return to_n  # fallback

    return from_n if z[0] < z[1] else to_n

def _ruta_max_longitud(nodo_outlet):
    # DP recursivo: mayor longitud acumulada
    oid_field = arcpy.Describe(streams_fc).OIDFieldName
    upstream = {}
    with arcpy.da.SearchCursor(streams_fc, [oid_field, campo_from, campo_to, "Shape_Length"]) as cur:
        for oid, fn, tn, sl in cur:
            upstream.setdefault(tn, []).append((fn, oid, float(sl)))

    memo = {}
    parent = {}

    def best(n):
        if n in memo:
            return memo[n]
        if n not in upstream:
            memo[n] = 0.0
            return 0.0
        b, bup, boid = 0.0, None, None
        for up, oid, sl in upstream.get(n, []):
            v = sl + best(up)
            if v > b:
                b, bup, boid = v, up, oid
        if bup is not None:
            parent[n] = (bup, boid)
        memo[n] = b
        return b

    best(nodo_outlet)

    oids = []
    n = nodo_outlet
    while n in parent:
        up, oid = parent[n]
        oids.append(oid)
        n = up
    return oids

def _disolver_oids(oids, sr):
    oid_field = arcpy.Describe(streams_fc).OIDFieldName
    lyr = "lyr_streams_sel"
    arcpy.management.MakeFeatureLayer(streams_fc, lyr)
    arcpy.management.SelectLayerByAttribute(lyr, "NEW_SELECTION", f"{oid_field} IN ({','.join(map(str, oids))})")
    out_tmp = _unique("tmp_ruta_disuelta")
    arcpy.management.Dissolve(lyr, out_tmp)
    return out_tmp


# ==========================================================
# EJECUCIÓN (LIMPIA)
# ==========================================================
try:
    # Validaciones mínimas
    if not arcpy.Exists(streams_fc):
        raise RuntimeError(f"No existe streams_fc: {streams_fc}")
    if not arcpy.Exists(pc_fc):
        raise RuntimeError(f"No existe pc_fc: {pc_fc}")
    sr = arcpy.Describe(streams_fc).spatialReference

    # 1) PC
    pc_geom = _get_first_geom(pc_fc)
    pc_pt = pc_geom.centroid

    # 2) Near para hallar segmento cercano al PC
    tmp_pc = _unique("tmp_pc")
    arcpy.management.CreateFeatureclass(scratch, os.path.basename(tmp_pc), "POINT", spatial_reference=sr)
    with arcpy.da.InsertCursor(tmp_pc, ["SHAPE@"]) as ic:
        ic.insertRow([arcpy.PointGeometry(pc_pt, sr)])

    arcpy.analysis.Near(tmp_pc, streams_fc)
    with arcpy.da.SearchCursor(tmp_pc, ["NEAR_FID"]) as cur:
        near_fid = next(cur)[0]

    # 3) Nodo outlet por DEM (si existe), si no fallback a to_node
    nodo_outlet = None
    if arcpy.Exists(dem_raster):
        arcpy.CheckOutExtension("Spatial")
        nodo_outlet = _nodo_outlet_por_dem(near_fid, sr)
        arcpy.CheckInExtension("Spatial")
    else:
        oid_field = arcpy.Describe(streams_fc).OIDFieldName
        with arcpy.da.SearchCursor(streams_fc, [oid_field, campo_to], f"{oid_field} = {near_fid}") as cur:
            _, nodo_outlet = next(cur)

    # 4) Ruta de máxima longitud
    oids = _ruta_max_longitud(nodo_outlet)
    if not oids:
        raise RuntimeError("Ruta principal vacía (no se reconstruyó ningún OID).")

    # 5) Disolver ruta
    ruta_fc = _disolver_oids(oids, sr)
    ruta_geom = _get_first_geom(ruta_fc)

    # 6) Eje completo Nacimiento → PC (geométrico)
    # Asegurar PC sobre la línea
    pc_geom_on = ruta_geom.snapToLine(pc_geom)
    dist_pc = ruta_geom.measureOnLine(pc_geom_on)
    eje_pc_geom = ruta_geom.segmentAlongLine(0, dist_pc, use_percentage=False)  # [2](https://community.esri.com/t5/python-questions/arcpy-segmentalongline-full-syntax/td-p/582843)[3](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)

    # Comparar con existente (si existe) y decidir
    eje_pc_old = _get_first_geom(out_eje_pc) if arcpy.Exists(out_eje_pc) else None
    if _same_geom(eje_pc_geom, eje_pc_old):
        arcpy.AddMessage("🟡 EjePrincipal: SIN CAMBIOS (no se sobreescribe).")
    else:
        _write_single_polyline(out_eje_pc, eje_pc_geom, sr)
        arcpy.AddMessage(f"✅ EjePrincipal actualizado: {out_eje_pc}")

    # 7) Eje geomorfológico Nacimiento → (PC - X)
    dist_fin = dist_pc - float(distancia_aguas_arriba)
    if dist_fin <= 0:
        raise RuntimeError(f"No se puede recortar {distancia_aguas_arriba} m: dist_pc={dist_pc:.2f} m")

    eje_geo_geom = ruta_geom.segmentAlongLine(0, dist_fin, use_percentage=False)  # [2](https://community.esri.com/t5/python-questions/arcpy-segmentalongline-full-syntax/td-p/582843)[3](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)
    eje_geo_old = _get_first_geom(out_eje_geo) if arcpy.Exists(out_eje_geo) else None
    if _same_geom(eje_geo_geom, eje_geo_old):
        arcpy.AddMessage("🟡 Eje_Geomorfologico: SIN CAMBIOS (no se sobreescribe).")
    else:
        _write_single_polyline(out_eje_geo, eje_geo_geom, sr)
        arcpy.AddMessage(f"✅ Eje geomorfológico actualizado: {out_eje_geo}")

    arcpy.AddMessage(f"📏 dist_pc sobre eje: {dist_pc:.2f} m | recorte: {distancia_aguas_arriba:.2f} m")

finally:
    # Limpieza de temporales (sin preguntar)
    for p in tmp_paths:
        try:
            if arcpy.Exists(p):
                arcpy.management.Delete(p)
        except Exception:
            pass