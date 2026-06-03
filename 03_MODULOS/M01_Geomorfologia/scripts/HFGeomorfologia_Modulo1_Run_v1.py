# -*- coding: utf-8 -*-
# ============================================================
# HFGeomorfologia_Modulo1_Run_v1.py
# HidroFlow - Modulo 1 Geomorfologia
# Script ejecutivo modular
# Fecha de creacion: 2026-05-24 00:45:11
# ============================================================

import arcpy
import os
import math
from collections import defaultdict, deque
from datetime import datetime

arcpy.env.overwriteOutput = True

# ============================================================
# CONFIGURACION GENERAL
# ============================================================

GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
arcpy.env.workspace = GDB

NOMBRE = "Iguana"

# Coordenadas de obra validadas
LAT_OBRA = 6.271785117145225
LON_OBRA = -75.59408755595547

# Parametros de control
DIST_PUNTOS_M = 5.0
BUFFER_SNAP_M = 50.0
TOL_NODOS_TOPO_M = 5.0
MIN_SEP_QUIEBRES_M = 50.0

# ============================================================
# INSUMOS BASE
# ============================================================

MDT = os.path.join(GDB, "MDT_Fill_Base")
FLOWDIR = os.path.join(GDB, "FlowDir_Base")
FLOWACC = os.path.join(GDB, "FlowAcc_Base")
SLOPE = os.path.join(GDB, "Slope_Base")
STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")

# ============================================================
# PRODUCTOS
# ============================================================

PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")

NODOS_TOPO = os.path.join(GDB, "Nodos_Topo_Iguana")
NODOS_CONTROL_TOPO = os.path.join(GDB, "Nodos_Control_Topo_Iguana")
EJE_RUTA = os.path.join(GDB, "Eje_Principal_Iguana")
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
REGISTRO_MD = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\Scripts\Registro_HidroFlow_Modulo1_Geomorfologia.md"

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

def borrar_si_existe(path):
    if arcpy.Exists(path):
        arcpy.management.Delete(path)
        msg("BORRADO: " + os.path.basename(path))

def validar_requeridos(lista):
    faltantes = []
    for path, nombre in lista:
        if not arcpy.Exists(path):
            faltantes.append(nombre)

    if faltantes:
        raise Exception("Faltan datasets requeridos: " + ", ".join(faltantes))

    msg("OK: insumos requeridos disponibles.")

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

        msg("OK: limpieza visual ejecutada.")

    except Exception as e:
        msg("Aviso: limpieza Contents no ejecutada: " + str(e))

def registrar_md(titulo, texto):
    fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    bloque = "\n---\n\n## " + titulo + " - " + fecha + "\n\n" + texto + "\n"

    try:
        with open(REGISTRO_MD, "a", encoding="utf-8") as f:
            f.write(bloque)
        msg("OK: registro actualizado: " + titulo)
    except Exception as e:
        msg("Aviso: no se pudo actualizar registro md: " + str(e))

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

# ============================================================
# BLOQUE 0 - VALIDACION DE INSUMOS BASE
# ============================================================

def bloque_00_validar_insumos():

    msg("========================================")
    msg("BLOQUE 00 - VALIDACION DE INSUMOS BASE")
    msg("========================================")

    validar_requeridos([
        (MDT, "MDT_Fill_Base"),
        (FLOWDIR, "FlowDir_Base"),
        (FLOWACC, "FlowAcc_Base"),
        (SLOPE, "Slope_Base"),
        (STREAMNET, "StreamNet_Strahler_150k")
    ])

    msg("BLOQUE 00 OK")


# ============================================================
# BLOQUE 01 - CREAR / REUTILIZAR PC_OBRA
# ============================================================

def bloque_01_pc_obra(reset_pc=False):

    msg("========================================")
    msg("BLOQUE 01 - PC_OBRA")
    msg("========================================")

    if arcpy.Exists(PC_OBRA) and not reset_pc:
        msg("PC_Obra_Iguana ya existe - se reutiliza.")
        return

    if arcpy.Exists(PC_OBRA) and reset_pc:
        borrar_si_existe(PC_OBRA)

    sr_wgs84 = arcpy.SpatialReference(4326)
    sr_mdt = arcpy.Describe(MDT).spatialReference

    punto_wgs = arcpy.PointGeometry(
        arcpy.Point(LON_OBRA, LAT_OBRA),
        sr_wgs84
    )

    punto_proj = punto_wgs.projectAs(sr_mdt)

    arcpy.management.CreateFeatureclass(
        GDB,
        "PC_Obra_Iguana",
        "POINT",
        spatial_reference=sr_mdt
    )

    arcpy.management.AddField(PC_OBRA, "LAT_DD", "DOUBLE")
    arcpy.management.AddField(PC_OBRA, "LON_DD", "DOUBLE")
    arcpy.management.AddField(PC_OBRA, "X_PROY", "DOUBLE")
    arcpy.management.AddField(PC_OBRA, "Y_PROY", "DOUBLE")

    with arcpy.da.InsertCursor(
        PC_OBRA,
        ["SHAPE@", "LAT_DD", "LON_DD", "X_PROY", "Y_PROY"]
    ) as cur:
        cur.insertRow([
            punto_proj,
            LAT_OBRA,
            LON_OBRA,
            punto_proj.firstPoint.X,
            punto_proj.firstPoint.Y
        ])

    msg("OK: PC_Obra_Iguana creado")
    msg("X proyectado: " + str(round(punto_proj.firstPoint.X, 3)))
    msg("Y proyectado: " + str(round(punto_proj.firstPoint.Y, 3)))



# ============================================================
# BLOQUE 02 - SNAP GEOMETRICO CONTROLADO
# ============================================================

def bloque_02_snap_geometrico_controlado(reset_snap=False):

    msg("========================================")
    msg("BLOQUE 02 - SNAP GEOMETRICO CONTROLADO")
    msg("========================================")

    if arcpy.Exists(PC_SNAP) and not reset_snap:
        msg("PC_Snap_Obra_Iguana ya existe - se reutiliza.")
        return

    if arcpy.Exists(PC_SNAP) and reset_snap:
        borrar_si_existe(PC_SNAP)

    validar_requeridos([
        (PC_OBRA, "PC_Obra_Iguana"),
        (STREAMNET, "StreamNet_Strahler_150k")
    ])

    stream_pts = os.path.join(GDB, "StreamPts_Base_tmp")
    buffer_obra = os.path.join(GDB, "Buffer_Obra_tmp")
    stream_local = os.path.join(GDB, "StreamPts_Local_tmp")

    for ds in [stream_pts, buffer_obra, stream_local]:
        borrar_si_existe(ds)

    # 1. Discretizar red en puntos cada DIST_PUNTOS_M
    arcpy.management.GeneratePointsAlongLines(
        STREAMNET,
        stream_pts,
        "DISTANCE",
        str(DIST_PUNTOS_M) + " Meters"
    )

    # 2. Buffer local alrededor del PC_Obra
    arcpy.analysis.Buffer(
        PC_OBRA,
        buffer_obra,
        str(BUFFER_SNAP_M) + " Meters"
    )

    # 3. Filtrar puntos de red dentro del buffer
    arcpy.analysis.Clip(
        stream_pts,
        buffer_obra,
        stream_local
    )

    count_local = int(arcpy.management.GetCount(stream_local)[0])

    if count_local == 0:
        raise Exception("No se encontraron puntos de red dentro del buffer de snap. Aumentar BUFFER_SNAP_M.")

    msg("Puntos locales de red encontrados: " + str(count_local))

    # 4. Leer coordenada PC
    with arcpy.da.SearchCursor(PC_OBRA, ["SHAPE@XY"]) as cur:
        for row in cur:
            pc_x, pc_y = row[0]
            break

    # 5. Buscar punto local mas cercano
    min_dist = 999999999
    best_x = None
    best_y = None

    with arcpy.da.SearchCursor(stream_local, ["SHAPE@XY"]) as cur:
        for row in cur:
            x, y = row[0]
            d = ((x - pc_x) ** 2 + (y - pc_y) ** 2) ** 0.5

            if d < min_dist:
                min_dist = d
                best_x = x
                best_y = y

    sr = arcpy.Describe(STREAMNET).spatialReference

    arcpy.management.CreateFeatureclass(
        GDB,
        "PC_Snap_Obra_Iguana",
        "POINT",
        spatial_reference=sr
    )

    arcpy.management.AddField(PC_SNAP, "DIST_PC_M", "DOUBLE")
    arcpy.management.AddField(PC_SNAP, "METODO", "TEXT", field_length=40)

    with arcpy.da.InsertCursor(
        PC_SNAP,
        ["SHAPE@", "DIST_PC_M", "METODO"]
    ) as ic:
        ic.insertRow([
            arcpy.PointGeometry(arcpy.Point(best_x, best_y), sr),
            min_dist,
            "SNAP_GEOMETRICO_LOCAL"
        ])

    msg("OK: PC_Snap_Obra_Iguana creado")
    msg("Distancia PC-Snap m: " + str(round(min_dist, 3)))

    # 6. Limpiar temporales GDB
    for ds in [stream_pts, buffer_obra, stream_local]:
        borrar_si_existe(ds)



# ============================================================
# BLOQUE 03 - WATERSHED Y CUENCA
# ============================================================

def bloque_03_watershed_cuenca(reset_cuenca=False):

    msg("========================================")
    msg("BLOQUE 03 - WATERSHED Y CUENCA")
    msg("========================================")

    validar_requeridos([
        (FLOWDIR, "FlowDir_Base"),
        (PC_SNAP, "PC_Snap_Obra_Iguana")
    ])

    # --------------------------------------------------------
    # 1. Cuenca raster
    # --------------------------------------------------------
    if arcpy.Exists(CUENCA_R) and not reset_cuenca:
        msg("Cuenca_R_Obra_Iguana ya existe - se reutiliza.")
    else:
        if arcpy.Exists(CUENCA_R) and reset_cuenca:
            borrar_si_existe(CUENCA_R)

        arcpy.gp.Watershed_sa(
            FLOWDIR,
            PC_SNAP,
            CUENCA_R
        )

        msg("OK: Cuenca_R_Obra_Iguana creada")

    # --------------------------------------------------------
    # 2. Cuenca poligono
    # --------------------------------------------------------
    if arcpy.Exists(CUENCA_POLY) and not reset_cuenca:
        msg("Cuenca_Obra_Iguana ya existe - se reutiliza.")
    else:
        if arcpy.Exists(CUENCA_POLY) and reset_cuenca:
            borrar_si_existe(CUENCA_POLY)

        arcpy.conversion.RasterToPolygon(
            CUENCA_R,
            CUENCA_POLY,
            "NO_SIMPLIFY"
        )

        msg("OK: Cuenca_Obra_Iguana creada")

    # --------------------------------------------------------
    # 3. Validacion de existencia
    # --------------------------------------------------------
    validar_requeridos([
        (CUENCA_R, "Cuenca_R_Obra_Iguana"),
        (CUENCA_POLY, "Cuenca_Obra_Iguana")
    ])

    msg("BLOQUE 03 OK")



# ============================================================
# BLOQUE 04 - RED HIDRICA RECORTADA
# ============================================================

def bloque_04_red_hidrica(reset_red=False):

    msg("========================================")
    msg("BLOQUE 04 - RED HIDRICA RECORTADA")
    msg("========================================")

    validar_requeridos([
        (STREAMNET, "StreamNet_Strahler_150k"),
        (CUENCA_POLY, "Cuenca_Obra_Iguana")
    ])

    if arcpy.Exists(RED_HIDRICA) and not reset_red:
        count = int(arcpy.management.GetCount(RED_HIDRICA)[0])
        msg("Red_Hidrica_Obra_Iguana ya existe - se reutiliza.")
        msg("Tramos red hidrica: " + str(count))
        return

    if arcpy.Exists(RED_HIDRICA) and reset_red:
        borrar_si_existe(RED_HIDRICA)

    arcpy.analysis.Clip(
        STREAMNET,
        CUENCA_POLY,
        RED_HIDRICA
    )

    count = int(arcpy.management.GetCount(RED_HIDRICA)[0])

    if count == 0:
        raise Exception("Red_Hidrica_Obra_Iguana quedo vacia. Revisar cuenca o red base.")

    msg("OK: Red_Hidrica_Obra_Iguana creada")
    msg("Tramos red hidrica: " + str(count))



# ============================================================
# BLOQUE 05 - RED CANDIDATA CON COTAS
# ============================================================

def bloque_05_red_candidata_z(reset_red_z=False):

    msg("========================================")
    msg("BLOQUE 05 - RED CANDIDATA CON COTAS")
    msg("========================================")

    validar_requeridos([
        (RED_HIDRICA, "Red_Hidrica_Obra_Iguana"),
        (MDT, "MDT_Fill_Base")
    ])

    if arcpy.Exists(RED_Z) and not reset_red_z:
        msg("Red_Candidata_Z_Iguana ya existe - se reutiliza.")
        return

    if arcpy.Exists(RED_Z) and reset_red_z:
        borrar_si_existe(RED_Z)

    arcpy.management.CopyFeatures(
        RED_HIDRICA,
        RED_Z
    )

    campos_existentes = [f.name for f in arcpy.ListFields(RED_Z)]

    campos_nuevos = [
        ("X_INI", "DOUBLE"),
        ("Y_INI", "DOUBLE"),
        ("Z_INI", "DOUBLE"),
        ("X_FIN", "DOUBLE"),
        ("Y_FIN", "DOUBLE"),
        ("Z_FIN", "DOUBLE"),
        ("LONG_M", "DOUBLE"),
        ("DZ", "DOUBLE"),
        ("SENTIDO", "TEXT")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(
                RED_Z,
                nombre,
                tipo,
                field_length=30 if tipo == "TEXT" else None
            )

    def get_z(x, y):
        val = arcpy.management.GetCellValue(MDT, f"{x} {y}").getOutput(0)
        if val in [None, "NoData"]:
            return None
        return float(str(val).replace(",", "."))

    with arcpy.da.UpdateCursor(
        RED_Z,
        ["SHAPE@", "X_INI", "Y_INI", "Z_INI", "X_FIN", "Y_FIN", "Z_FIN", "LONG_M", "DZ", "SENTIDO"]
    ) as cur:

        for row in cur:
            geom = row[0]

            p_ini = geom.firstPoint
            p_fin = geom.lastPoint

            x_ini = p_ini.X
            y_ini = p_ini.Y
            x_fin = p_fin.X
            y_fin = p_fin.Y

            z_ini = get_z(x_ini, y_ini)
            z_fin = get_z(x_fin, y_fin)

            long_m = geom.length

            if z_ini is not None and z_fin is not None:
                dz = z_fin - z_ini

                if z_ini > z_fin:
                    sentido = "INI_ALTO"
                elif z_fin > z_ini:
                    sentido = "FIN_ALTO"
                else:
                    sentido = "PLANO"
            else:
                dz = None
                sentido = "SIN_Z"

            row[1] = x_ini
            row[2] = y_ini
            row[3] = z_ini
            row[4] = x_fin
            row[5] = y_fin
            row[6] = z_fin
            row[7] = long_m
            row[8] = dz
            row[9] = sentido

            cur.updateRow(row)

    count = int(arcpy.management.GetCount(RED_Z)[0])
    msg("OK: Red_Candidata_Z_Iguana creada")
    msg("Tramos con cotas: " + str(count))



# ============================================================
# BLOQUE 06 - CABECERA CANDIDATA POR COTA MAXIMA
# ============================================================

def bloque_06_cabecera_candidata(reset_cabecera=False):

    msg("========================================")
    msg("BLOQUE 06 - CABECERA CANDIDATA")
    msg("========================================")

    validar_requeridos([
        (RED_Z, "Red_Candidata_Z_Iguana"),
        (MDT, "MDT_Fill_Base")
    ])

    if arcpy.Exists(CABECERA) and not reset_cabecera:
        msg("Cabecera_Candidata_Iguana ya existe - se reutiliza.")
        return

    if arcpy.Exists(CABECERA) and reset_cabecera:
        borrar_si_existe(CABECERA)

    max_z = -999999
    oid_max = None
    campo_max = None
    x_max = None
    y_max = None

    with arcpy.da.SearchCursor(
        RED_Z,
        ["OID@", "Z_INI", "Z_FIN", "X_INI", "Y_INI", "X_FIN", "Y_FIN"]
    ) as cur:

        for oid, z_ini, z_fin, x_ini, y_ini, x_fin, y_fin in cur:

            if z_ini is not None and z_ini > max_z:
                max_z = z_ini
                oid_max = oid
                campo_max = "INI"
                x_max = x_ini
                y_max = y_ini

            if z_fin is not None and z_fin > max_z:
                max_z = z_fin
                oid_max = oid
                campo_max = "FIN"
                x_max = x_fin
                y_max = y_fin

    if x_max is None or y_max is None:
        raise Exception("No se pudo identificar cabecera candidata.")

    sr = arcpy.Describe(RED_Z).spatialReference

    arcpy.management.CreateFeatureclass(
        GDB,
        "Cabecera_Candidata_Iguana",
        "POINT",
        spatial_reference=sr
    )

    arcpy.management.AddField(CABECERA, "Z_CAB", "DOUBLE")
    arcpy.management.AddField(CABECERA, "OID_TRAMO", "LONG")
    arcpy.management.AddField(CABECERA, "EXTREMO", "TEXT", field_length=10)

    with arcpy.da.InsertCursor(
        CABECERA,
        ["SHAPE@", "Z_CAB", "OID_TRAMO", "EXTREMO"]
    ) as cur:
        cur.insertRow([
            arcpy.PointGeometry(arcpy.Point(x_max, y_max), sr),
            max_z,
            oid_max,
            campo_max
        ])

    msg("OK: Cabecera_Candidata_Iguana creada")
    msg("OID tramo cabecera: " + str(oid_max))
    msg("Extremo: " + str(campo_max))
    msg("Z cabecera: " + str(round(max_z, 3)))



# ============================================================
# BLOQUE 07 - GRAFO TOPOLOGICO Y EJE PRINCIPAL
# ============================================================

def bloque_07_grafo_topologico_eje(reset_eje=False):

    msg("========================================")
    msg("BLOQUE 07 - GRAFO TOPOLOGICO Y EJE PRINCIPAL")
    msg("========================================")

    validar_requeridos([
        (RED_Z, "Red_Candidata_Z_Iguana"),
        (PC_SNAP, "PC_Snap_Obra_Iguana"),
        (CABECERA, "Cabecera_Candidata_Iguana")
    ])

    if arcpy.Exists(EJE_RUTA) and arcpy.Exists(NODOS_TOPO) and arcpy.Exists(NODOS_CONTROL_TOPO) and not reset_eje:
        msg("Eje_Principal_Iguana y nodos topologicos ya existen - se reutilizan.")
        return

    if reset_eje:
        for ds in [EJE_RUTA, NODOS_TOPO, NODOS_CONTROL_TOPO]:
            borrar_si_existe(ds)

    # --------------------------------------------------------
    # Leer XY de puntos de control
    # --------------------------------------------------------
    def leer_xy(fc):
        with arcpy.da.SearchCursor(fc, ["SHAPE@XY"]) as cur:
            for row in cur:
                return row[0][0], row[0][1]

    pc_x, pc_y = leer_xy(PC_SNAP)
    cab_x, cab_y = leer_xy(CABECERA)

    # --------------------------------------------------------
    # Construir nodos topologicos fusionando extremos cercanos
    # --------------------------------------------------------
    nodos = {}
    grafo = defaultdict(list)
    tramo_por_arista = {}

    contador_nodo = 1

    def dist_xy(x1, y1, x2, y2):
        return ((x1 - x2)**2 + (y1 - y2)**2) ** 0.5

    def obtener_nodo(x, y, z):
        nonlocal contador_nodo

        for nid, data in nodos.items():
            if dist_xy(x, y, data["x"], data["y"]) <= TOL_NODOS_TOPO_M:
                return nid

        nid = contador_nodo
        nodos[nid] = {
            "x": x,
            "y": y,
            "z": z
        }
        contador_nodo += 1
        return nid

    oid_field = arcpy.Describe(RED_Z).OIDFieldName

    with arcpy.da.SearchCursor(
        RED_Z,
        ["OID@", "SHAPE@", "Z_INI", "Z_FIN", "LONG_M"]
    ) as cur:

        for oid_tramo, geom, z_ini, z_fin, long_m in cur:
            p_ini = geom.firstPoint
            p_fin = geom.lastPoint

            n_ini = obtener_nodo(p_ini.X, p_ini.Y, z_ini)
            n_fin = obtener_nodo(p_fin.X, p_fin.Y, z_fin)

            grafo[n_ini].append(n_fin)
            grafo[n_fin].append(n_ini)

            tramo_por_arista[(n_ini, n_fin)] = oid_tramo
            tramo_por_arista[(n_fin, n_ini)] = oid_tramo

    msg("Grafo topologico construido")
    msg("Nodos topologicos: " + str(len(nodos)))
    msg("Tramos en grafo: " + str(len(tramo_por_arista) // 2))

    # --------------------------------------------------------
    # Buscar nodos mas cercanos a PC y cabecera
    # --------------------------------------------------------
    def nodo_mas_cercano_a_xy(x_ref, y_ref):
        mejor_nodo = None
        mejor_dist = 999999999

        for nid, data in nodos.items():
            d = dist_xy(x_ref, y_ref, data["x"], data["y"])
            if d < mejor_dist:
                mejor_dist = d
                mejor_nodo = nid

        return mejor_nodo, mejor_dist

    nodo_salida, dist_salida = nodo_mas_cercano_a_xy(pc_x, pc_y)
    nodo_cabecera, dist_cabecera = nodo_mas_cercano_a_xy(cab_x, cab_y)

    msg("Nodo salida topologico: " + str(nodo_salida) + " Dist: " + str(round(dist_salida, 3)))
    msg("Nodo cabecera topologico: " + str(nodo_cabecera) + " Dist: " + str(round(dist_cabecera, 3)))

    # --------------------------------------------------------
    # Buscar ruta BFS
    # --------------------------------------------------------
    cola = deque([nodo_salida])
    visitado = {nodo_salida}
    padre = {}

    encontrado = False

    while cola:
        actual = cola.popleft()

        if actual == nodo_cabecera:
            encontrado = True
            break

        for vecino in grafo[actual]:
            if vecino not in visitado:
                visitado.add(vecino)
                padre[vecino] = actual
                cola.append(vecino)

    if not encontrado:
        raise Exception("No se encontro ruta topologica entre salida y cabecera.")

    ruta_nodos = [nodo_cabecera]
    n = nodo_cabecera

    while n != nodo_salida:
        n = padre[n]
        ruta_nodos.append(n)

    ruta_nodos.reverse()

    tramos_ruta = []

    for i in range(len(ruta_nodos) - 1):
        a = ruta_nodos[i]
        b = ruta_nodos[i + 1]

        if (a, b) in tramo_por_arista:
            tramos_ruta.append(tramo_por_arista[(a, b)])
        else:
            raise Exception("Arista sin tramo asociado entre nodos " + str(a) + " y " + str(b))

    tramos_ruta = list(dict.fromkeys(tramos_ruta))

    msg("Ruta topologica encontrada")
    msg("Cantidad nodos ruta: " + str(len(ruta_nodos)))
    msg("Cantidad tramos ruta: " + str(len(tramos_ruta)))

    # --------------------------------------------------------
    # Crear Nodos_Topo_Iguana
    # --------------------------------------------------------
    sr = arcpy.Describe(RED_Z).spatialReference

    arcpy.management.CreateFeatureclass(
        GDB,
        "Nodos_Topo_Iguana",
        "POINT",
        spatial_reference=sr
    )

    arcpy.management.AddField(NODOS_TOPO, "ID_NODO", "LONG")
    arcpy.management.AddField(NODOS_TOPO, "Z_NODO", "DOUBLE")

    with arcpy.da.InsertCursor(
        NODOS_TOPO,
        ["SHAPE@", "ID_NODO", "Z_NODO"]
    ) as ic:
        for nid, data in nodos.items():
            geom = arcpy.PointGeometry(arcpy.Point(data["x"], data["y"]), sr)
            ic.insertRow([geom, nid, data["z"]])

    # --------------------------------------------------------
    # Crear Nodos_Control_Topo_Iguana
    # --------------------------------------------------------
    arcpy.management.CreateFeatureclass(
        GDB,
        "Nodos_Control_Topo_Iguana",
        "POINT",
        spatial_reference=sr
    )

    campos_control = [
        ("ROL", "TEXT"),
        ("ID_NODO", "LONG"),
        ("Z_NODO", "DOUBLE"),
        ("DIST_M", "DOUBLE")
    ]

    for nombre, tipo in campos_control:
        arcpy.management.AddField(
            NODOS_CONTROL_TOPO,
            nombre,
            tipo,
            field_length=30 if tipo == "TEXT" else None
        )

    with arcpy.da.InsertCursor(
        NODOS_CONTROL_TOPO,
        ["SHAPE@", "ROL", "ID_NODO", "Z_NODO", "DIST_M"]
    ) as ic:

        data = nodos[nodo_salida]
        ic.insertRow([
            arcpy.PointGeometry(arcpy.Point(data["x"], data["y"]), sr),
            "SALIDA_PC",
            nodo_salida,
            data["z"],
            dist_salida
        ])

        data = nodos[nodo_cabecera]
        ic.insertRow([
            arcpy.PointGeometry(arcpy.Point(data["x"], data["y"]), sr),
            "CABECERA",
            nodo_cabecera,
            data["z"],
            dist_cabecera
        ])

    # --------------------------------------------------------
    # Seleccionar tramos de ruta y crear eje principal
    # --------------------------------------------------------
    where = f"{oid_field} IN ({','.join(map(str, tramos_ruta))})"

    arcpy.management.MakeFeatureLayer(RED_Z, "ruta_lyr")

    arcpy.management.SelectLayerByAttribute(
        "ruta_lyr",
        "NEW_SELECTION",
        where
    )

    arcpy.management.CopyFeatures(
        "ruta_lyr",
        EJE_RUTA
    )

    msg("OK: Eje_Principal_Iguana creado con ruta topologica salida-cabecera")



# ============================================================
# BLOQUE 08 - EJE PRINCIPAL CONTINUO
# ============================================================

def bloque_08_eje_continuo(reset_eje_continuo=False):

    msg("========================================")
    msg("BLOQUE 08 - EJE PRINCIPAL CONTINUO")
    msg("========================================")

    validar_requeridos([
        (EJE_RUTA, "Eje_Principal_Iguana")
    ])

    if arcpy.Exists(EJE_CONTINUO) and not reset_eje_continuo:
        count = int(arcpy.management.GetCount(EJE_CONTINUO)[0])
        msg("Eje_Principal_Continuo_Iguana ya existe - se reutiliza.")
        msg("Features eje continuo: " + str(count))

        if count != 1:
            raise Exception("Eje_Principal_Continuo_Iguana existe pero no tiene 1 feature.")

        return

    if arcpy.Exists(EJE_CONTINUO) and reset_eje_continuo:
        borrar_si_existe(EJE_CONTINUO)

    arcpy.management.Dissolve(
        EJE_RUTA,
        EJE_CONTINUO,
        "",
        "",
        "SINGLE_PART",
        "UNSPLIT_LINES"
    )

    count = int(arcpy.management.GetCount(EJE_CONTINUO)[0])

    if count != 1:
        raise Exception("Eje_Principal_Continuo_Iguana no quedo como una sola feature.")

    msg("OK: Eje_Principal_Continuo_Iguana creado")
    msg("Features eje continuo: " + str(count))



# ============================================================
# BLOQUE 09 - PUNTOS DE PERFIL
# ============================================================

def bloque_09_perfil_puntos(reset_perfil_pts=False):

    msg("========================================")
    msg("BLOQUE 09 - PUNTOS DE PERFIL")
    msg("========================================")

    validar_requeridos([
        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana")
    ])

    if arcpy.Exists(PERFIL_PTS) and not reset_perfil_pts:
        count = int(arcpy.management.GetCount(PERFIL_PTS)[0])
        msg("Perfil_Puntos_Iguana ya existe - se reutiliza.")
        msg("Total puntos perfil: " + str(count))
        return

    if arcpy.Exists(PERFIL_PTS) and reset_perfil_pts:
        borrar_si_existe(PERFIL_PTS)

    arcpy.management.GeneratePointsAlongLines(
        EJE_CONTINUO,
        PERFIL_PTS,
        "DISTANCE",
        str(DIST_PUNTOS_M) + " Meters"
    )

    count = int(arcpy.management.GetCount(PERFIL_PTS)[0])

    if count == 0:
        raise Exception("Perfil_Puntos_Iguana quedo vacio.")

    msg("OK: Perfil_Puntos_Iguana creado")
    msg("Total puntos perfil: " + str(count))


# ============================================================
# BLOQUE 10 - EXTRAER Z A PUNTOS DE PERFIL
# ============================================================

def bloque_10_extraer_z(reset_z=False):

    msg("========================================")
    msg("BLOQUE 10 - EXTRAER Z")
    msg("========================================")

    validar_requeridos([
        (PERFIL_PTS, "Perfil_Puntos_Iguana"),
        (MDT, "MDT_Fill_Base")
    ])

    if arcpy.Exists(PERFIL_Z) and not reset_z:
        count = int(arcpy.management.GetCount(PERFIL_Z)[0])
        msg("Perfil_Puntos_Z_Iguana ya existe - se reutiliza.")
        msg("Total puntos con Z: " + str(count))
        return

    if arcpy.Exists(PERFIL_Z) and reset_z:
        borrar_si_existe(PERFIL_Z)

    # Control de environments
    arcpy.env.cellSize = MDT
    arcpy.env.snapRaster = MDT

    arcpy.sa.ExtractValuesToPoints(
        PERFIL_PTS,
        MDT,
        PERFIL_Z,
        "NONE",
        "VALUE_ONLY"
    )

    count = int(arcpy.management.GetCount(PERFIL_Z)[0])

    if count == 0:
        raise Exception("Perfil_Puntos_Z_Iguana quedo vacio.")

    msg("OK: Perfil_Puntos_Z_Iguana creado")
    msg("Total puntos con Z: " + str(count))


# ============================================================
# BLOQUE 11 - MEAS ORIENTADO PC A CABECERA
# ============================================================

def bloque_11_meas_orientado(reset_zm=False):

    msg("========================================")
    msg("BLOQUE 11 - MEAS ORIENTADO")
    msg("========================================")

    validar_requeridos([
        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
        (PERFIL_Z, "Perfil_Puntos_Z_Iguana"),
        (PC_SNAP, "PC_Snap_Obra_Iguana"),
        (CABECERA, "Cabecera_Candidata_Iguana")
    ])

    if arcpy.Exists(PERFIL_ZM) and not reset_zm:
        count = int(arcpy.management.GetCount(PERFIL_ZM)[0])
        msg("Perfil_Puntos_ZM_Iguana ya existe - se reutiliza.")
        msg("Total puntos ZM: " + str(count))
        return

    if arcpy.Exists(PERFIL_ZM) and reset_zm:
        borrar_si_existe(PERFIL_ZM)

    tmp = os.path.join(GDB, "Perfil_Puntos_ZM_tmp")

    borrar_si_existe(tmp)

    # Leer geometria del eje
    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@"]) as cur:
        for row in cur:
            eje_geom = row[0]
            break

    def leer_geom_punto(fc):
        with arcpy.da.SearchCursor(fc, ["SHAPE@"]) as cur:
            for row in cur:
                return row[0]

    pc_geom = leer_geom_punto(PC_SNAP)
    cab_geom = leer_geom_punto(CABECERA)

    m_pc = eje_geom.measureOnLine(pc_geom, False)
    m_cab = eje_geom.measureOnLine(cab_geom, False)

    m_ini = min(m_pc, m_cab)
    m_fin = max(m_pc, m_cab)
    tol = 10.0

    msg("M_PC: " + str(round(m_pc, 3)))
    msg("M_CAB: " + str(round(m_cab, 3)))

    arcpy.management.CopyFeatures(PERFIL_Z, tmp)

    campos_existentes = [f.name for f in arcpy.ListFields(tmp)]

    campos_nuevos = [
        ("M_RAW", "DOUBLE"),
        ("MEAS", "DOUBLE"),
        ("DIST_PC", "DOUBLE"),
        ("DIST_CAB", "DOUBLE"),
        ("EN_RUTA", "SHORT"),
        ("ORDEN_PERF", "LONG")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(tmp, nombre, tipo)

    def dist_geom(p1, p2):
        a = p1.firstPoint
        b = p2.firstPoint
        return ((a.X - b.X)**2 + (a.Y - b.Y)**2) ** 0.5

    datos_orden = []

    with arcpy.da.UpdateCursor(
        tmp,
        ["OID@", "SHAPE@", "M_RAW", "MEAS", "DIST_PC", "DIST_CAB", "EN_RUTA"]
    ) as cur:

        for oid, geom, m_raw, meas, dpc, dcab, en_ruta in cur:
            m = eje_geom.measureOnLine(geom, False)

            if m_cab >= m_pc:
                meas_calc = m - m_pc
            else:
                meas_calc = m_pc - m

            d_pc = dist_geom(geom, pc_geom)
            d_cab = dist_geom(geom, cab_geom)

            dentro = 1 if (m >= m_ini - tol and m <= m_fin + tol) else 0

            cur.updateRow([
                oid,
                geom,
                m,
                meas_calc,
                d_pc,
                d_cab,
                dentro
            ])

            if dentro == 1:
                datos_orden.append((oid, meas_calc))

    datos_orden.sort(key=lambda x: x[1])
    orden_dict = {}

    for i, (oid, meas_calc) in enumerate(datos_orden, start=1):
        orden_dict[oid] = i

    with arcpy.da.UpdateCursor(tmp, ["OID@", "ORDEN_PERF"]) as cur:
        for oid, orden in cur:
            if oid in orden_dict:
                cur.updateRow([oid, orden_dict[oid]])
            else:
                cur.updateRow([oid, None])

    arcpy.management.MakeFeatureLayer(tmp, "perfil_zm_lyr")

    arcpy.management.SelectLayerByAttribute(
        "perfil_zm_lyr",
        "NEW_SELECTION",
        "EN_RUTA = 1"
    )

    arcpy.management.CopyFeatures(
        "perfil_zm_lyr",
        PERFIL_ZM
    )

    count = int(arcpy.management.GetCount(PERFIL_ZM)[0])

    meas_min = 999999999
    meas_max = -999999999
    z_min = 999999999
    z_max = -999999999

    with arcpy.da.SearchCursor(PERFIL_ZM, ["MEAS", "RASTERVALU"]) as cur:
        for meas, z in cur:
            if meas is not None:
                meas_min = min(meas_min, meas)
                meas_max = max(meas_max, meas)
            if z is not None:
                z_min = min(z_min, z)
                z_max = max(z_max, z)

    borrar_si_existe(tmp)

    msg("OK: Perfil_Puntos_ZM_Iguana creado")
    msg("Total puntos ruta: " + str(count))
    msg("MEAS min: " + str(round(meas_min, 3)))
    msg("MEAS max: " + str(round(meas_max, 3)))
    msg("Z min: " + str(round(z_min, 2)))
    msg("Z max: " + str(round(z_max, 2)))



# ============================================================
# BLOQUE 12 - VARIABLES DERIVADAS DEL PERFIL
# ============================================================

def bloque_12_variables_perfil(reset_var=False):

    msg("========================================")
    msg("BLOQUE 12 - VARIABLES DERIVADAS")
    msg("========================================")

    validar_requeridos([
        (PERFIL_ZM, "Perfil_Puntos_ZM_Iguana")
    ])

    if arcpy.Exists(PERFIL_VAR) and not reset_var:
        count = int(arcpy.management.GetCount(PERFIL_VAR)[0])
        msg("Perfil_Puntos_VAR_Iguana ya existe - se reutiliza.")
        msg("Total puntos VAR: " + str(count))
        return

    if arcpy.Exists(PERFIL_VAR) and reset_var:
        borrar_si_existe(PERFIL_VAR)

    arcpy.management.CopyFeatures(
        PERFIL_ZM,
        PERFIL_VAR
    )

    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_VAR)]

    campos_nuevos = [
        ("Z_M", "DOUBLE"),
        ("DIST_INC_M", "DOUBLE"),
        ("DZ_M", "DOUBLE"),
        ("PEND_M_M", "DOUBLE"),
        ("PEND_PCT", "DOUBLE")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(PERFIL_VAR, nombre, tipo)

    datos = []

    with arcpy.da.SearchCursor(
        PERFIL_VAR,
        ["OID@", "MEAS", "RASTERVALU", "ORDEN_PERF"]
    ) as cur:
        for oid, meas, z, orden in cur:
            if meas is not None and z is not None:
                datos.append({
                    "oid": oid,
                    "meas": float(meas),
                    "z": float(z),
                    "orden": orden
                })

    datos.sort(key=lambda d: d["meas"])

    resultados = {}
    prev = None

    for d in datos:
        oid = d["oid"]
        meas = d["meas"]
        z = d["z"]

        if prev is None:
            dist_inc = 0.0
            dz = 0.0
            pend_m_m = 0.0
            pend_pct = 0.0
        else:
            dist_inc = meas - prev["meas"]
            dz = z - prev["z"]

            if dist_inc != 0:
                pend_m_m = dz / dist_inc
                pend_pct = pend_m_m * 100.0
            else:
                pend_m_m = 0.0
                pend_pct = 0.0

        resultados[oid] = {
            "Z_M": z,
            "DIST_INC_M": dist_inc,
            "DZ_M": dz,
            "PEND_M_M": pend_m_m,
            "PEND_PCT": pend_pct
        }

        prev = d

    with arcpy.da.UpdateCursor(
        PERFIL_VAR,
        ["OID@", "Z_M", "DIST_INC_M", "DZ_M", "PEND_M_M", "PEND_PCT"]
    ) as cur:
        for row in cur:
            oid = row[0]

            if oid in resultados:
                r = resultados[oid]
                row[1] = r["Z_M"]
                row[2] = r["DIST_INC_M"]
                row[3] = r["DZ_M"]
                row[4] = r["PEND_M_M"]
                row[5] = r["PEND_PCT"]
                cur.updateRow(row)

    count = int(arcpy.management.GetCount(PERFIL_VAR)[0])

    pend_min = 999999
    pend_max = -999999
    pend_sum = 0
    pend_n = 0

    with arcpy.da.SearchCursor(PERFIL_VAR, ["PEND_PCT"]) as cur:
        for row in cur:
            p = row[0]
            if p is not None:
                pend_min = min(pend_min, p)
                pend_max = max(pend_max, p)
                pend_sum += p
                pend_n += 1

    pend_prom = pend_sum / pend_n if pend_n > 0 else None

    msg("OK: Perfil_Puntos_VAR_Iguana creado")
    msg("Total puntos: " + str(count))
    msg("Pendiente min %: " + str(round(pend_min, 4)))
    msg("Pendiente max %: " + str(round(pend_max, 4)))
    msg("Pendiente promedio %: " + str(round(pend_prom, 4)))


# ============================================================
# BLOQUE 13 - PERFIL QC
# ============================================================

def bloque_13_perfil_qc(reset_qc=False):

    msg("========================================")
    msg("BLOQUE 13 - PERFIL QC")
    msg("========================================")

    validar_requeridos([
        (PERFIL_VAR, "Perfil_Puntos_VAR_Iguana")
    ])

    if arcpy.Exists(PERFIL_QC) and not reset_qc:
        count = int(arcpy.management.GetCount(PERFIL_QC)[0])
        msg("Perfil_Puntos_QC_Iguana ya existe - se reutiliza.")
        msg("Total puntos QC: " + str(count))
        return

    if arcpy.Exists(PERFIL_QC) and reset_qc:
        borrar_si_existe(PERFIL_QC)

    arcpy.management.CopyFeatures(
        PERFIL_VAR,
        PERFIL_QC
    )

    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_QC)]

    campos_nuevos = [
        ("FLAG_P50", "SHORT"),
        ("FLAG_P100", "SHORT"),
        ("CLASE_PEND", "TEXT"),
        ("PEND_SUAV_5", "DOUBLE")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(
                PERFIL_QC,
                nombre,
                tipo,
                field_length=30 if tipo == "TEXT" else None
            )

    datos = []

    with arcpy.da.SearchCursor(
        PERFIL_QC,
        ["OID@", "MEAS", "PEND_PCT"]
    ) as cur:
        for oid, meas, pend in cur:
            if meas is not None:
                datos.append({
                    "oid": oid,
                    "meas": float(meas),
                    "pend": float(pend) if pend is not None else None
                })

    datos.sort(key=lambda d: d["meas"])

    resultados = {}
    n = len(datos)

    for i, d in enumerate(datos):
        oid = d["oid"]
        p = d["pend"]

        flag_p50 = 1 if p is not None and p > 50 else 0
        flag_p100 = 1 if p is not None and p > 100 else 0

        if p is None:
            clase = "SIN_DATO"
        elif p == 0:
            clase = "PLANA"
        elif p <= 5:
            clase = "BAJA"
        elif p <= 15:
            clase = "MEDIA"
        elif p <= 30:
            clase = "ALTA"
        elif p <= 50:
            clase = "MUY_ALTA"
        elif p <= 100:
            clase = "EXTREMA"
        else:
            clase = "ANOMALIA_GT100"

        ini = max(0, i - 2)
        fin = min(n, i + 3)

        vals = [
            datos[j]["pend"]
            for j in range(ini, fin)
            if datos[j]["pend"] is not None
        ]

        pend_suav = sum(vals) / len(vals) if len(vals) > 0 else None

        resultados[oid] = {
            "FLAG_P50": flag_p50,
            "FLAG_P100": flag_p100,
            "CLASE_PEND": clase,
            "PEND_SUAV_5": pend_suav
        }

    with arcpy.da.UpdateCursor(
        PERFIL_QC,
        ["OID@", "FLAG_P50", "FLAG_P100", "CLASE_PEND", "PEND_SUAV_5"]
    ) as cur:
        for row in cur:
            oid = row[0]

            if oid in resultados:
                r = resultados[oid]
                row[1] = r["FLAG_P50"]
                row[2] = r["FLAG_P100"]
                row[3] = r["CLASE_PEND"]
                row[4] = r["PEND_SUAV_5"]
                cur.updateRow(row)

    total = int(arcpy.management.GetCount(PERFIL_QC)[0])

    flag50 = 0
    flag100 = 0
    suav_min = 999999
    suav_max = -999999
    suav_sum = 0
    suav_n = 0

    with arcpy.da.SearchCursor(
        PERFIL_QC,
        ["FLAG_P50", "FLAG_P100", "PEND_SUAV_5"]
    ) as cur:
        for f50, f100, ps in cur:
            if f50 == 1:
                flag50 += 1
            if f100 == 1:
                flag100 += 1
            if ps is not None:
                suav_min = min(suav_min, ps)
                suav_max = max(suav_max, ps)
                suav_sum += ps
                suav_n += 1

    suav_prom = suav_sum / suav_n if suav_n > 0 else None

    msg("OK: Perfil_Puntos_QC_Iguana creado")
    msg("Total puntos: " + str(total))
    msg("Pendientes > 50%: " + str(flag50))
    msg("Pendientes > 100%: " + str(flag100))
    msg("PEND_SUAV_5 min: " + str(round(suav_min, 4)))
    msg("PEND_SUAV_5 max: " + str(round(suav_max, 4)))
    msg("PEND_SUAV_5 promedio: " + str(round(suav_prom, 4)))


# ============================================================
# BLOQUE 14 - QUIEBRES GEOMORFOLOGICOS
# ============================================================

def bloque_14_quiebres(reset_quiebres=False):

    msg("========================================")
    msg("BLOQUE 14 - QUIEBRES GEOMORFOLOGICOS")
    msg("========================================")

    validar_requeridos([
        (PERFIL_QC, "Perfil_Puntos_QC_Iguana")
    ])

    if arcpy.Exists(PERFIL_QUIEBRES) and not reset_quiebres:
        count = int(arcpy.management.GetCount(PERFIL_QUIEBRES)[0])
        msg("Perfil_Puntos_QUIEBRES_Iguana ya existe - se reutiliza.")
        msg("Total puntos QUIEBRES: " + str(count))
        return

    if arcpy.Exists(PERFIL_QUIEBRES) and reset_quiebres:
        borrar_si_existe(PERFIL_QUIEBRES)

    arcpy.management.CopyFeatures(
        PERFIL_QC,
        PERFIL_QUIEBRES
    )

    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_QUIEBRES)]

    campos_nuevos = [
        ("DPEND", "DOUBLE"),
        ("ABS_DPEND", "DOUBLE"),
        ("FLAG_DPEND", "SHORT"),
        ("PERSIST3", "SHORT"),
        ("QUIEBRE", "SHORT"),
        ("TIPO_QUIEBRE", "TEXT")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(
                PERFIL_QUIEBRES,
                nombre,
                tipo,
                field_length=30 if tipo == "TEXT" else None
            )

    datos = []

    with arcpy.da.SearchCursor(
        PERFIL_QUIEBRES,
        ["OID@", "MEAS", "PEND_SUAV_5", "PEND_PCT", "FLAG_P100"]
    ) as cur:
        for oid, meas, psuav, pcruda, flag100 in cur:
            if meas is not None:
                datos.append({
                    "oid": oid,
                    "meas": float(meas),
                    "psuav": float(psuav) if psuav is not None else None,
                    "pcruda": float(pcruda) if pcruda is not None else None,
                    "flag100": int(flag100) if flag100 is not None else 0
                })

    datos.sort(key=lambda d: d["meas"])

    umbral_dpend = 10.0
    resultados = {}
    prev = None

    for d in datos:
        oid = d["oid"]
        ps = d["psuav"]

        if prev is None or ps is None or prev["psuav"] is None:
            dpend = 0.0
        else:
            dpend = ps - prev["psuav"]

        abs_dpend = abs(dpend)
        flag_dpend = 1 if abs_dpend >= umbral_dpend else 0

        resultados[oid] = {
            "DPEND": dpend,
            "ABS_DPEND": abs_dpend,
            "FLAG_DPEND": flag_dpend,
            "PERSIST3": 0,
            "QUIEBRE": 0,
            "TIPO_QUIEBRE": "NO"
        }

        prev = d

    # Persistencia en ventana de 3 puntos
    for i, d in enumerate(datos):
        oid = d["oid"]

        ini = max(0, i - 1)
        fin = min(len(datos), i + 2)

        flags = [
            resultados[datos[j]["oid"]]["FLAG_DPEND"]
            for j in range(ini, fin)
        ]

        persist3 = 1 if sum(flags) >= 2 else 0
        resultados[oid]["PERSIST3"] = persist3

    # Clasificacion final
    for d in datos:
        oid = d["oid"]
        dpend = resultados[oid]["DPEND"]
        abs_dpend = resultados[oid]["ABS_DPEND"]
        persist3 = resultados[oid]["PERSIST3"]
        flag100 = d["flag100"]

        if persist3 == 1 and abs_dpend >= umbral_dpend:
            quiebre = 1

            if dpend > 0:
                tipo = "AUMENTO_PEND"
            elif dpend < 0:
                tipo = "DISMINUCION_PEND"
            else:
                tipo = "CAMBIO_NEUTRO"

        elif flag100 == 1:
            quiebre = 1
            tipo = "ANOMALIA_PEND_GT100"

        else:
            quiebre = 0
            tipo = "NO"

        resultados[oid]["QUIEBRE"] = quiebre
        resultados[oid]["TIPO_QUIEBRE"] = tipo

    with arcpy.da.UpdateCursor(
        PERFIL_QUIEBRES,
        ["OID@", "DPEND", "ABS_DPEND", "FLAG_DPEND", "PERSIST3", "QUIEBRE", "TIPO_QUIEBRE"]
    ) as cur:
        for row in cur:
            oid = row[0]

            if oid in resultados:
                r = resultados[oid]
                row[1] = r["DPEND"]
                row[2] = r["ABS_DPEND"]
                row[3] = r["FLAG_DPEND"]
                row[4] = r["PERSIST3"]
                row[5] = r["QUIEBRE"]
                row[6] = r["TIPO_QUIEBRE"]
                cur.updateRow(row)

    total = int(arcpy.management.GetCount(PERFIL_QUIEBRES)[0])
    flag_d = 0
    persist = 0
    quiebres = 0
    aum = 0
    dis = 0
    anom = 0

    with arcpy.da.SearchCursor(
        PERFIL_QUIEBRES,
        ["FLAG_DPEND", "PERSIST3", "QUIEBRE", "TIPO_QUIEBRE"]
    ) as cur:
        for fd, per, q, tipo in cur:
            if fd == 1:
                flag_d += 1
            if per == 1:
                persist += 1
            if q == 1:
                quiebres += 1
            if tipo == "AUMENTO_PEND":
                aum += 1
            if tipo == "DISMINUCION_PEND":
                dis += 1
            if tipo == "ANOMALIA_PEND_GT100":
                anom += 1

    msg("OK: Perfil_Puntos_QUIEBRES_Iguana creado")
    msg("Total puntos: " + str(total))
    msg("FLAG_DPEND: " + str(flag_d))
    msg("PERSIST3: " + str(persist))
    msg("QUIEBRES: " + str(quiebres))
    msg("Aumentos pendiente: " + str(aum))
    msg("Disminuciones pendiente: " + str(dis))
    msg("Anomalias >100%: " + str(anom))


# ============================================================
# BLOQUE 15 - SEGMENTACION QC
# ============================================================

def bloque_15_segmentacion_qc(reset_seg_qc=False):

    msg("========================================")
    msg("BLOQUE 15 - SEGMENTACION QC")
    msg("========================================")

    validar_requeridos([
        (PERFIL_QUIEBRES, "Perfil_Puntos_QUIEBRES_Iguana")
    ])

    productos = [PERFIL_SEG_QC, PUNTOS_QUIEBRE_QC, TRAMOS_QC]

    if all(arcpy.Exists(p) for p in productos) and not reset_seg_qc:
        msg("Productos de segmentacion QC ya existen - se reutilizan.")
        msg("Perfil_Puntos_SEG_QC_Iguana: " + str(int(arcpy.management.GetCount(PERFIL_SEG_QC)[0])))
        msg("Puntos_Quiebre_QC_Iguana: " + str(int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])))
        msg("Tramos_Geomorf_QC_Iguana: " + str(int(arcpy.management.GetCount(TRAMOS_QC)[0])))
        return

    if reset_seg_qc:
        for ds in productos:
            borrar_si_existe(ds)

    # --------------------------------------------------------
    # Copiar perfil de quiebres a perfil segmentado QC
    # --------------------------------------------------------
    arcpy.management.CopyFeatures(
        PERFIL_QUIEBRES,
        PERFIL_SEG_QC
    )

    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_SEG_QC)]

    campos_nuevos = [
        ("ID_TRAMO_QC", "LONG"),
        ("ES_LIMITE_QC", "SHORT")
    ]

    for nombre, tipo in campos_nuevos:
        if nombre not in campos_existentes:
            arcpy.management.AddField(PERFIL_SEG_QC, nombre, tipo)

    # --------------------------------------------------------
    # Leer puntos ordenados por MEAS
    # --------------------------------------------------------
    datos = []

    with arcpy.da.SearchCursor(
        PERFIL_SEG_QC,
        [
            "OID@",
            "MEAS",
            "Z_M",
            "PEND_PCT",
            "PEND_SUAV_5",
            "FLAG_P50",
            "FLAG_P100",
            "QUIEBRE",
            "TIPO_QUIEBRE",
            "ABS_DPEND"
        ]
    ) as cur:

        for oid, meas, z, pend, pend_suav, flag50, flag100, quiebre, tipo_q, abs_dpend in cur:
            if meas is None:
                continue

            datos.append({
                "oid": oid,
                "meas": float(meas),
                "z": float(z) if z is not None else None,
                "pend": float(pend) if pend is not None else None,
                "pend_suav": float(pend_suav) if pend_suav is not None else None,
                "flag50": int(flag50) if flag50 is not None else 0,
                "flag100": int(flag100) if flag100 is not None else 0,
                "quiebre": int(quiebre) if quiebre is not None else 0,
                "tipo_q": tipo_q,
                "abs_dpend": float(abs_dpend) if abs_dpend is not None else 0.0
            })

    datos.sort(key=lambda d: d["meas"])

    meas_min = datos[0]["meas"]
    meas_max = datos[-1]["meas"]

    quiebres = [d for d in datos if d["quiebre"] == 1]

    # --------------------------------------------------------
    # Agrupar quiebres cercanos
    # --------------------------------------------------------
    clusters = []

    for q in quiebres:
        if not clusters:
            clusters.append([q])
        else:
            ultimo_cluster = clusters[-1]
            ultimo_q = ultimo_cluster[-1]

            if q["meas"] - ultimo_q["meas"] <= MIN_SEP_QUIEBRES_M:
                ultimo_cluster.append(q)
            else:
                clusters.append([q])

    quiebres_qc = []

    for cluster in clusters:
        mejor = max(cluster, key=lambda d: d["abs_dpend"])
        quiebres_qc.append(mejor)

    # Filtrar limites cercanos a extremos
    quiebres_qc_filtrados = []

    for q in quiebres_qc:
        if q["meas"] - meas_min < MIN_SEP_QUIEBRES_M:
            continue
        if meas_max - q["meas"] < MIN_SEP_QUIEBRES_M:
            continue
        quiebres_qc_filtrados.append(q)

    quiebres_qc = quiebres_qc_filtrados

    oids_limite_qc = set([q["oid"] for q in quiebres_qc])

    limites = [meas_min] + [q["meas"] for q in quiebres_qc] + [meas_max]
    limites = sorted(limites)

    # --------------------------------------------------------
    # Asignar ID_TRAMO_QC
    # --------------------------------------------------------
    resultados = {}

    for d in datos:
        oid = d["oid"]
        meas = d["meas"]

        id_tramo = 1

        for i in range(len(limites) - 1):
            li = limites[i]
            ls = limites[i + 1]

            if i == len(limites) - 2:
                if meas >= li and meas <= ls:
                    id_tramo = i + 1
                    break
            else:
                if meas >= li and meas < ls:
                    id_tramo = i + 1
                    break

        resultados[oid] = {
            "ID_TRAMO_QC": id_tramo,
            "ES_LIMITE_QC": 1 if oid in oids_limite_qc else 0
        }

    with arcpy.da.UpdateCursor(
        PERFIL_SEG_QC,
        ["OID@", "ID_TRAMO_QC", "ES_LIMITE_QC"]
    ) as cur:
        for row in cur:
            oid = row[0]
            if oid in resultados:
                row[1] = resultados[oid]["ID_TRAMO_QC"]
                row[2] = resultados[oid]["ES_LIMITE_QC"]
                cur.updateRow(row)

    # --------------------------------------------------------
    # Crear puntos de quiebre QC
    # --------------------------------------------------------
    arcpy.management.MakeFeatureLayer(
        PERFIL_SEG_QC,
        "quiebres_qc_lyr"
    )

    arcpy.management.SelectLayerByAttribute(
        "quiebres_qc_lyr",
        "NEW_SELECTION",
        "ES_LIMITE_QC = 1"
    )

    arcpy.management.CopyFeatures(
        "quiebres_qc_lyr",
        PUNTOS_QUIEBRE_QC
    )

    # --------------------------------------------------------
    # Construir tabla resumen por tramo QC
    # --------------------------------------------------------
    tramos = {}

    with arcpy.da.SearchCursor(
        PERFIL_SEG_QC,
        [
            "ID_TRAMO_QC",
            "MEAS",
            "Z_M",
            "PEND_PCT",
            "PEND_SUAV_5",
            "FLAG_P50",
            "FLAG_P100",
            "QUIEBRE",
            "TIPO_QUIEBRE"
        ]
    ) as cur:

        for id_tramo, meas, z, pend, pend_suav, flag50, flag100, quiebre, tipo_q in cur:
            if id_tramo is None or meas is None or z is None:
                continue

            if id_tramo not in tramos:
                tramos[id_tramo] = {
                    "meas": [],
                    "z": [],
                    "pend": [],
                    "pend_suav": [],
                    "flag50": 0,
                    "flag100": 0,
                    "quiebres": 0,
                    "tipos": []
                }

            tramos[id_tramo]["meas"].append(float(meas))
            tramos[id_tramo]["z"].append(float(z))

            if pend is not None:
                tramos[id_tramo]["pend"].append(float(pend))

            if pend_suav is not None:
                tramos[id_tramo]["pend_suav"].append(float(pend_suav))

            if flag50 == 1:
                tramos[id_tramo]["flag50"] += 1

            if flag100 == 1:
                tramos[id_tramo]["flag100"] += 1

            if quiebre == 1:
                tramos[id_tramo]["quiebres"] += 1

            if tipo_q not in [None, "NO"]:
                tramos[id_tramo]["tipos"].append(tipo_q)

    arcpy.management.CreateTable(GDB, "Tramos_Geomorf_QC_Iguana")

    campos = [
        ("ID_TRAMO", "LONG"),
        ("MEAS_INI", "DOUBLE"),
        ("MEAS_FIN", "DOUBLE"),
        ("LONG_TRAMO_M", "DOUBLE"),
        ("Z_INI", "DOUBLE"),
        ("Z_FIN", "DOUBLE"),
        ("DZ_TRAMO_M", "DOUBLE"),
        ("PEND_MEDIA", "DOUBLE"),
        ("PEND_SUAV_MEDIA", "DOUBLE"),
        ("N_PUNTOS", "LONG"),
        ("N_FLAG50", "LONG"),
        ("N_FLAG100", "LONG"),
        ("N_QUIEBRES", "LONG"),
        ("CLASE_TRAMO", "TEXT"),
        ("TIPO_DOM", "TEXT")
    ]

    for nombre, tipo in campos:
        arcpy.management.AddField(
            TRAMOS_QC,
            nombre,
            tipo,
            field_length=40 if tipo == "TEXT" else None
        )

    def clasificar_pendiente(p):
        if p is None:
            return "SIN_DATO"
        elif p <= 5:
            return "BAJA"
        elif p <= 15:
            return "MEDIA"
        elif p <= 30:
            return "ALTA"
        elif p <= 50:
            return "MUY_ALTA"
        elif p <= 100:
            return "EXTREMA"
        else:
            return "ANOMALA"

    def tipo_dominante(tipos):
        if not tipos:
            return "SIN_QUIEBRE"

        conteo = {}
        for t in tipos:
            conteo[t] = conteo.get(t, 0) + 1

        return max(conteo, key=conteo.get)

    with arcpy.da.InsertCursor(
        TRAMOS_QC,
        [
            "ID_TRAMO",
            "MEAS_INI",
            "MEAS_FIN",
            "LONG_TRAMO_M",
            "Z_INI",
            "Z_FIN",
            "DZ_TRAMO_M",
            "PEND_MEDIA",
            "PEND_SUAV_MEDIA",
            "N_PUNTOS",
            "N_FLAG50",
            "N_FLAG100",
            "N_QUIEBRES",
            "CLASE_TRAMO",
            "TIPO_DOM"
        ]
    ) as ic:

        for id_tramo in sorted(tramos.keys()):
            data = tramos[id_tramo]

            meas_ini = min(data["meas"])
            meas_fin = max(data["meas"])
            long_tramo = meas_fin - meas_ini

            pares = sorted(zip(data["meas"], data["z"]), key=lambda x: x[0])
            z_ini = pares[0][1]
            z_fin = pares[-1][1]
            dz_tramo = z_fin - z_ini

            pend_media = (
                sum(data["pend"]) / len(data["pend"])
                if len(data["pend"]) > 0 else None
            )

            pend_suav_media = (
                sum(data["pend_suav"]) / len(data["pend_suav"])
                if len(data["pend_suav"]) > 0 else None
            )

            clase = clasificar_pendiente(pend_suav_media)
            tipo_dom = tipo_dominante(data["tipos"])

            ic.insertRow([
                id_tramo,
                meas_ini,
                meas_fin,
                long_tramo,
                z_ini,
                z_fin,
                dz_tramo,
                pend_media,
                pend_suav_media,
                len(data["meas"]),
                data["flag50"],
                data["flag100"],
                data["quiebres"],
                clase,
                tipo_dom
            ])

    # Limpieza visual de layer temporal
    try:
        aprx = arcpy.mp.ArcGISProject("CURRENT")
        m = aprx.activeMap
        for lyr in m.listLayers():
            try:
                if lyr.name == "quiebres_qc_lyr":
                    m.removeLayer(lyr)
            except Exception:
                pass
    except Exception:
        pass

    total_puntos = int(arcpy.management.GetCount(PERFIL_SEG_QC)[0])
    total_quiebres_qc = int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])
    total_tramos_qc = int(arcpy.management.GetCount(TRAMOS_QC)[0])

    long_cero = 0
    menor_25 = 0
    menor_50 = 0

    with arcpy.da.SearchCursor(TRAMOS_QC, ["LONG_TRAMO_M"]) as cur:
        for row in cur:
            lm = row[0]
            if lm is None or lm == 0:
                long_cero += 1
            if lm is not None and lm < 25:
                menor_25 += 1
            if lm is not None and lm < 50:
                menor_50 += 1

    msg("OK: Segmentacion QC creada")
    msg("Quiebres QC: " + str(total_quiebres_qc))
    msg("Tramos QC: " + str(total_tramos_qc))
    msg("Total puntos: " + str(total_puntos))
    msg("Tramos longitud 0: " + str(long_cero))
    msg("Tramos < 25 m: " + str(menor_25))
    msg("Tramos < 50 m: " + str(menor_50))


# ============================================================
# BLOQUE 16 - LINEAS DE TRAMOS GEOMORFOLOGICOS QC
# ============================================================

def bloque_16_tramos_lineas_qc(reset_lineas_qc=False):

    msg("========================================")
    msg("BLOQUE 16 - LINEAS TRAMOS QC")
    msg("========================================")

    validar_requeridos([
        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
        (PC_SNAP, "PC_Snap_Obra_Iguana"),
        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana")
    ])

    if arcpy.Exists(TRAMOS_LINEAS_QC) and not reset_lineas_qc:
        count = int(arcpy.management.GetCount(TRAMOS_LINEAS_QC)[0])
        msg("Tramos_Geomorf_Lineas_QC_Iguana ya existe - se reutiliza.")
        msg("Total lineas tramos QC: " + str(count))

        if count != int(arcpy.management.GetCount(TRAMOS_QC)[0]):
            raise Exception("Numero de lineas QC no coincide con numero de tramos QC.")

        return

    if arcpy.Exists(TRAMOS_LINEAS_QC) and reset_lineas_qc:
        borrar_si_existe(TRAMOS_LINEAS_QC)

    # Leer geometria del eje
    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@"]) as cur:
        for row in cur:
            eje_geom = row[0]
            break

    # Leer punto PC
    with arcpy.da.SearchCursor(PC_SNAP, ["SHAPE@"]) as cur:
        for row in cur:
            pc_geom = row[0]
            break

    # Medida cruda del PC sobre la geometria del eje
    m_pc = eje_geom.measureOnLine(pc_geom, False)

    msg("M_PC sobre eje: " + str(round(m_pc, 3)))

    # Crear Feature Class de salida
    sr = arcpy.Describe(EJE_CONTINUO).spatialReference

    arcpy.management.CreateFeatureclass(
        GDB,
        "Tramos_Geomorf_Lineas_QC_Iguana",
        "POLYLINE",
        spatial_reference=sr
    )

    campos = [
        ("ID_TRAMO", "LONG"),
        ("MEAS_INI", "DOUBLE"),
        ("MEAS_FIN", "DOUBLE"),
        ("LONG_TRAMO_M", "DOUBLE"),
        ("Z_INI", "DOUBLE"),
        ("Z_FIN", "DOUBLE"),
        ("DZ_TRAMO_M", "DOUBLE"),
        ("PEND_MEDIA", "DOUBLE"),
        ("PEND_SUAV_MEDIA", "DOUBLE"),
        ("N_PUNTOS", "LONG"),
        ("N_FLAG50", "LONG"),
        ("N_FLAG100", "LONG"),
        ("N_QUIEBRES", "LONG"),
        ("CLASE_TRAMO", "TEXT"),
        ("TIPO_DOM", "TEXT")
    ]

    for nombre, tipo in campos:
        arcpy.management.AddField(
            TRAMOS_LINEAS_QC,
            nombre,
            tipo,
            field_length=40 if tipo == "TEXT" else None
        )

    # Crear geometria por tramo
    with arcpy.da.InsertCursor(
        TRAMOS_LINEAS_QC,
        [
            "SHAPE@",
            "ID_TRAMO",
            "MEAS_INI",
            "MEAS_FIN",
            "LONG_TRAMO_M",
            "Z_INI",
            "Z_FIN",
            "DZ_TRAMO_M",
            "PEND_MEDIA",
            "PEND_SUAV_MEDIA",
            "N_PUNTOS",
            "N_FLAG50",
            "N_FLAG100",
            "N_QUIEBRES",
            "CLASE_TRAMO",
            "TIPO_DOM"
        ]
    ) as ic:

        with arcpy.da.SearchCursor(
            TRAMOS_QC,
            [
                "ID_TRAMO",
                "MEAS_INI",
                "MEAS_FIN",
                "LONG_TRAMO_M",
                "Z_INI",
                "Z_FIN",
                "DZ_TRAMO_M",
                "PEND_MEDIA",
                "PEND_SUAV_MEDIA",
                "N_PUNTOS",
                "N_FLAG50",
                "N_FLAG100",
                "N_QUIEBRES",
                "CLASE_TRAMO",
                "TIPO_DOM"
            ]
        ) as cur:

            for row in cur:
                (
                    id_tramo,
                    meas_ini,
                    meas_fin,
                    long_tramo,
                    z_ini,
                    z_fin,
                    dz_tramo,
                    pend_media,
                    pend_suav_media,
                    n_puntos,
                    n_flag50,
                    n_flag100,
                    n_quiebres,
                    clase_tramo,
                    tipo_dom
                ) = row

                # MEAS esta orientado desde PC hacia cabecera.
                # La geometria original del eje esta orientada al reves:
                # M_CAB = 0, M_PC = longitud total.
                raw_ini = m_pc - meas_fin
                raw_fin = m_pc - meas_ini

                a = min(raw_ini, raw_fin)
                b = max(raw_ini, raw_fin)

                geom_seg = eje_geom.segmentAlongLine(a, b, False)

                ic.insertRow([
                    geom_seg,
                    id_tramo,
                    meas_ini,
                    meas_fin,
                    long_tramo,
                    z_ini,
                    z_fin,
                    dz_tramo,
                    pend_media,
                    pend_suav_media,
                    n_puntos,
                    n_flag50,
                    n_flag100,
                    n_quiebres,
                    clase_tramo,
                    tipo_dom
                ])

    count = int(arcpy.management.GetCount(TRAMOS_LINEAS_QC)[0])

    msg("OK: Tramos_Geomorf_Lineas_QC_Iguana creado")
    msg("Total lineas tramos QC: " + str(count))


# ============================================================
# BLOQUE 17 - PARAMETROS GEOMORFOLOGICOS GLOBALES
# ============================================================

def bloque_17_parametros_globales(reset_parametros=False):

    msg("========================================")
    msg("BLOQUE 17 - PARAMETROS GEOMORFOLOGICOS")
    msg("========================================")

    validar_requeridos([
        (CUENCA_POLY, "Cuenca_Obra_Iguana"),
        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
        (RED_HIDRICA, "Red_Hidrica_Obra_Iguana"),
        (PERFIL_SEG_QC, "Perfil_Puntos_SEG_QC_Iguana"),
        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana"),
        (PUNTOS_QUIEBRE_QC, "Puntos_Quiebre_QC_Iguana")
    ])

    if arcpy.Exists(PARAMS) and not reset_parametros:
        msg("Parametros_Geomorf_Iguana ya existe - se reutiliza.")

        with arcpy.da.SearchCursor(
            PARAMS,
            [
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
        ) as cur:
            for row in cur:
                msg("Area km2: " + str(round(row[0], 4)))
                msg("Perimetro km: " + str(round(row[1], 4)))
                msg("Longitud cauce km: " + str(round(row[2], 4)))
                msg("Longitud perfil km: " + str(round(row[3], 4)))
                msg("Longitud red km: " + str(round(row[4], 4)))
                msg("Densidad drenaje: " + str(round(row[5], 4)))
                msg("Z salida: " + str(round(row[6], 2)))
                msg("Z cabecera: " + str(round(row[7], 2)))
                msg("Desnivel m: " + str(round(row[8], 2)))
                msg("Pendiente media cauce %: " + str(round(row[9], 4)))
                msg("Kc: " + str(round(row[10], 4)))
                msg("Kf: " + str(round(row[11], 4)))
                msg("Tramos QC: " + str(row[12]))
                msg("Quiebres QC: " + str(row[13]))
        return

    if arcpy.Exists(PARAMS) and reset_parametros:
        borrar_si_existe(PARAMS)

    # Area y perimetro
    area_m2 = 0.0
    perim_m = 0.0

    with arcpy.da.SearchCursor(CUENCA_POLY, ["SHAPE@AREA", "SHAPE@LENGTH"]) as cur:
        for area, perim in cur:
            area_m2 += area
            perim_m += perim

    area_km2 = area_m2 / 1000000.0
    perim_km = perim_m / 1000.0

    # Longitud cauce principal
    long_cauce_m = 0.0

    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@LENGTH"]) as cur:
        for row in cur:
            long_cauce_m += row[0]

    long_cauce_km = long_cauce_m / 1000.0

    # Longitud red drenaje
    long_red_m = 0.0

    with arcpy.da.SearchCursor(RED_HIDRICA, ["SHAPE@LENGTH"]) as cur:
        for row in cur:
            long_red_m += row[0]

    long_red_km = long_red_m / 1000.0

    densidad_drenaje = long_red_km / area_km2 if area_km2 > 0 else None

    # Z salida/cabecera desde perfil QC orientado
    z_salida = None
    z_cabecera = None
    meas_min = 999999999
    meas_max = -999999999

    with arcpy.da.SearchCursor(PERFIL_SEG_QC, ["MEAS", "Z_M"]) as cur:
        for meas, z in cur:
            if meas is None or z is None:
                continue

            if meas < meas_min:
                meas_min = meas
                z_salida = z

            if meas > meas_max:
                meas_max = meas
                z_cabecera = z

    long_perfil_m = meas_max - meas_min
    long_perfil_km = long_perfil_m / 1000.0

    desnivel_m = z_cabecera - z_salida

    pend_media_cauce_pct = (
        (desnivel_m / long_perfil_m) * 100.0
        if long_perfil_m > 0 else None
    )

    kc = (
        0.28 * perim_km / math.sqrt(area_km2)
        if area_km2 > 0 else None
    )

    kf = (
        area_km2 / (long_perfil_km ** 2)
        if long_perfil_km > 0 else None
    )

    n_tramos_qc = int(arcpy.management.GetCount(TRAMOS_QC)[0])
    n_quiebres_qc = int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])

    # Crear tabla
    arcpy.management.CreateTable(GDB, "Parametros_Geomorf_Iguana")

    campos = [
        ("NOMBRE", "TEXT"),
        ("AREA_KM2", "DOUBLE"),
        ("PERIM_KM", "DOUBLE"),
        ("LONG_CAUC_KM", "DOUBLE"),
        ("LONG_PERF_KM", "DOUBLE"),
        ("LONG_RED_KM", "DOUBLE"),
        ("DENS_DREN", "DOUBLE"),
        ("Z_SALIDA", "DOUBLE"),
        ("Z_CABECERA", "DOUBLE"),
        ("DESNIVEL_M", "DOUBLE"),
        ("PEND_MED_PCT", "DOUBLE"),
        ("KC_COMPAC", "DOUBLE"),
        ("KF_FORMA", "DOUBLE"),
        ("N_TRAMOS_QC", "LONG"),
        ("N_QUIEBRES", "LONG")
    ]

    for nombre, tipo in campos:
        arcpy.management.AddField(
            PARAMS,
            nombre,
            tipo,
            field_length=50 if tipo == "TEXT" else None
        )

    with arcpy.da.InsertCursor(
        PARAMS,
        [
            "NOMBRE",
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
    ) as ic:
        ic.insertRow([
            NOMBRE,
            area_km2,
            perim_km,
            long_cauce_km,
            long_perfil_km,
            long_red_km,
            densidad_drenaje,
            z_salida,
            z_cabecera,
            desnivel_m,
            pend_media_cauce_pct,
            kc,
            kf,
            n_tramos_qc,
            n_quiebres_qc
        ])

    msg("OK: Parametros_Geomorf_Iguana creado")
    msg("Area km2: " + str(round(area_km2, 4)))
    msg("Perimetro km: " + str(round(perim_km, 4)))
    msg("Longitud cauce km: " + str(round(long_cauce_km, 4)))
    msg("Longitud perfil km: " + str(round(long_perfil_km, 4)))
    msg("Longitud red km: " + str(round(long_red_km, 4)))
    msg("Densidad drenaje: " + str(round(densidad_drenaje, 4)))
    msg("Z salida: " + str(round(z_salida, 2)))
    msg("Z cabecera: " + str(round(z_cabecera, 2)))
    msg("Desnivel m: " + str(round(desnivel_m, 2)))
    msg("Pendiente media cauce %: " + str(round(pend_media_cauce_pct, 4)))
    msg("Kc: " + str(round(kc, 4)))
    msg("Kf: " + str(round(kf, 4)))
    msg("Tramos QC: " + str(n_tramos_qc))
    msg("Quiebres QC: " + str(n_quiebres_qc))


# ============================================================
# BLOQUE 18 - EXPORTACIONES AUDITABLES
# ============================================================

def bloque_18_exportaciones(reset_export=False):

    msg("========================================")
    msg("BLOQUE 18 - EXPORTACIONES AUDITABLES")
    msg("========================================")

    if not os.path.exists(EXPORT_TABLAS):
        os.makedirs(EXPORT_TABLAS)
        msg("Carpeta creada: " + EXPORT_TABLAS)

    fecha = datetime.now().strftime("%Y%m%d_%H%M%S")

    productos = [
        PARAMS,
        TRAMOS_QC,
        TRAMOS_LINEAS_QC,
        PERFIL_SEG_QC,
        PERFIL_QC,
        PERFIL_VAR,
        PERFIL_ZM,
        PUNTOS_QUIEBRE_QC,
        CABECERA,
        PC_OBRA,
        PC_SNAP
    ]

    exportados_xlsx = 0
    exportados_csv = 0
    omitidos = 0

    for ruta in productos:
        nombre = os.path.basename(ruta)

        if not arcpy.Exists(ruta):
            msg("NO EXISTE, se omite: " + nombre)
            omitidos += 1
            continue

        xlsx = os.path.join(EXPORT_TABLAS, nombre + "_" + fecha + ".xlsx")
        csv_name = nombre + "_" + fecha + ".csv"

        try:
            arcpy.conversion.TableToExcel(
                ruta,
                xlsx
            )
            exportados_xlsx += 1
            msg("XLSX: " + os.path.basename(xlsx))
        except Exception as e:
            msg("No se pudo exportar XLSX: " + nombre + " | " + str(e))

        try:
            arcpy.conversion.TableToTable(
                ruta,
                EXPORT_TABLAS,
                csv_name
            )
            exportados_csv += 1
            msg("CSV: " + csv_name)
        except Exception as e:
            msg("No se pudo exportar CSV: " + nombre + " | " + str(e))

    msg("Exportacion XLSX: " + str(exportados_xlsx))
    msg("Exportacion CSV: " + str(exportados_csv))
    msg("Omitidos: " + str(omitidos))
    msg("Carpeta exportacion: " + EXPORT_TABLAS)


# ============================================================
# BLOQUES PENDIENTES DE INTEGRAR
# ============================================================
#
# bloque_01_crear_pc_obra()
# bloque_02_snap_geometrico_controlado()
# bloque_03_watershed_cuenca()
# bloque_04_red_hidrica()
# bloque_05_red_candidata_z()
# bloque_06_cabecera_candidata()
# bloque_07_grafo_topologico_eje()
# bloque_08_perfil_puntos()
# bloque_09_extraer_z()
# bloque_10_meas_orientado()
# bloque_11_variables()
# bloque_12_qc()
# bloque_13_quiebres()
# bloque_14_segmentacion_qc()
# bloque_15_tramos_lineas_qc()
# bloque_16_parametros_globales()
# bloque_17_exportaciones()
# bloque_18_registro_final()
#

# ============================================================
# EJECUCION
# ============================================================

def main():

    msg("========================================")
    msg("HidroFlow Modulo 1 Geomorfologia - RUN v1")
    msg("Fecha ejecucion: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    msg("========================================")

    bloque_00_validar_insumos()
    bloque_01_pc_obra(reset_pc=False)
    bloque_02_snap_geometrico_controlado(reset_snap=False)
    bloque_03_watershed_cuenca(reset_cuenca=False)
    bloque_04_red_hidrica(reset_red=False)
    bloque_05_red_candidata_z(reset_red_z=False)
    bloque_06_cabecera_candidata(reset_cabecera=False)
    bloque_07_grafo_topologico_eje(reset_eje=False)
    bloque_08_eje_continuo(reset_eje_continuo=False)
    bloque_09_perfil_puntos(reset_perfil_pts=False)
    bloque_10_extraer_z(reset_z=False)
    bloque_11_meas_orientado(reset_zm=False)
    bloque_12_variables_perfil(reset_var=False)
    bloque_13_perfil_qc(reset_qc=False)
    bloque_14_quiebres(reset_quiebres=False)
    bloque_15_segmentacion_qc(reset_seg_qc=False)
    bloque_16_tramos_lineas_qc(reset_lineas_qc=False)
    bloque_17_parametros_globales(reset_parametros=False)
    bloque_18_exportaciones(reset_export=False)

    limpiar_contents()

    registrar_md(
        "RUN v1 probado con Bloques 00-18",
        "Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta exportaciones auditables, consolidando el flujo del Modulo 1 desde insumos base hasta productos tabulares externos."
    )

    msg("========================================")
    msg("FIN RUN v1 - BLOQUES 00-18")
    msg("========================================")

if __name__ == "__main__":
    main()