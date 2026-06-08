# PRÁCTICA-001B — Auditoría de rutas internas en scripts geomorfológicos

Fecha: 06/07/2026 18:30:31
Repositorio: D:\HidroFlow

## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:3:# HFGeomorfologia_Modulo1_Run_v1.py
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:4:# HidroFlow - Modulo 1 Geomorfologia
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:5:# Script ejecutivo modular
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:6:# Fecha de creacion: 2026-05-24 00:45:11
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:7:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:13:from datetime import datetime
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:14:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:15:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:16:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:17:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:19:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:20:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:21:GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:22:arcpy.env.workspace = GDB
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:23:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:24:NOMBRE = "Iguana"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:30:# Parametros de control
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:31:DIST_PUNTOS_M = 5.0
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:32:BUFFER_SNAP_M = 50.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:33:TOL_NODOS_TOPO_M = 5.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:34:MIN_SEP_QUIEBRES_M = 50.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:38:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:39:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:40:MDT = os.path.join(GDB, "MDT_Fill_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:41:FLOWDIR = os.path.join(GDB, "FlowDir_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:42:FLOWACC = os.path.join(GDB, "FlowAcc_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:43:SLOPE = os.path.join(GDB, "Slope_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:44:STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:45:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:46:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:48:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:49:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:50:PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:51:PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:52:CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:53:CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:54:RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:55:RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:56:CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:57:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:58:NODOS_TOPO = os.path.join(GDB, "Nodos_Topo_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:59:NODOS_CONTROL_TOPO = os.path.join(GDB, "Nodos_Control_Topo_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:60:EJE_RUTA = os.path.join(GDB, "Eje_Principal_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:61:EJE_CONTINUO = os.path.join(GDB, "Eje_Principal_Continuo_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:62:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:63:PERFIL_PTS = os.path.join(GDB, "Perfil_Puntos_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:64:PERFIL_Z = os.path.join(GDB, "Perfil_Puntos_Z_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:65:PERFIL_ZM = os.path.join(GDB, "Perfil_Puntos_ZM_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:66:PERFIL_VAR = os.path.join(GDB, "Perfil_Puntos_VAR_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:67:PERFIL_QC = os.path.join(GDB, "Perfil_Puntos_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:68:PERFIL_QUIEBRES = os.path.join(GDB, "Perfil_Puntos_QUIEBRES_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:69:PERFIL_SEG_QC = os.path.join(GDB, "Perfil_Puntos_SEG_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:70:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:71:PUNTOS_QUIEBRE_QC = os.path.join(GDB, "Puntos_Quiebre_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:72:TRAMOS_QC = os.path.join(GDB, "Tramos_Geomorf_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:73:TRAMOS_LINEAS_QC = os.path.join(GDB, "Tramos_Geomorf_Lineas_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:74:PARAMS = os.path.join(GDB, "Parametros_Geomorf_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:75:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:76:EXPORT_TABLAS = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\Exportaciones\Iguana\02_Tablas"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:77:REGISTRO_MD = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\Scripts\Registro_HidroFlow_Modulo1_Geomorfologia.md"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:78:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:93:def borrar_si_existe(path):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:94:    if arcpy.Exists(path):
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:95:        arcpy.management.Delete(path)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:96:        msg("BORRADO: " + os.path.basename(path))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:97:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:132:                pass
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:133:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:134:        msg("OK: limpieza visual ejecutada.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:135:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:136:    except Exception as e:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:137:        msg("Aviso: limpieza Contents no ejecutada: " + str(e))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:138:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:139:def registrar_md(titulo, texto):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:154:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:155:    msg("=== FEATURE CLASSES ===")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:156:    for fc in arcpy.ListFeatureClasses():
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:157:        msg("  [FC] " + fc)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:158:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:183:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:184:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:185:# BLOQUE 01 - CREAR / REUTILIZAR PC_OBRA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:186:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:187:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:188:def bloque_01_pc_obra(reset_pc=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:189:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:190:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:191:    msg("BLOQUE 01 - PC_OBRA")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:192:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:193:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:194:    if arcpy.Exists(PC_OBRA) and not reset_pc:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:195:        msg("PC_Obra_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:196:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:197:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:198:    if arcpy.Exists(PC_OBRA) and reset_pc:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:199:        borrar_si_existe(PC_OBRA)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:200:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:201:    sr_wgs84 = arcpy.SpatialReference(4326)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:209:    punto_proj = punto_wgs.projectAs(sr_mdt)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:210:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:211:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:212:        GDB,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:213:        "PC_Obra_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:214:        "POINT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:215:        spatial_reference=sr_mdt
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:216:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:217:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:218:    arcpy.management.AddField(PC_OBRA, "LAT_DD", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:219:    arcpy.management.AddField(PC_OBRA, "LON_DD", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:220:    arcpy.management.AddField(PC_OBRA, "X_PROY", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:221:    arcpy.management.AddField(PC_OBRA, "Y_PROY", "DOUBLE")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:222:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:223:    with arcpy.da.InsertCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:224:        PC_OBRA,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:225:        ["SHAPE@", "LAT_DD", "LON_DD", "X_PROY", "Y_PROY"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:226:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:233:        ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:234:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:235:    msg("OK: PC_Obra_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:236:    msg("X proyectado: " + str(round(punto_proj.firstPoint.X, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:237:    msg("Y proyectado: " + str(round(punto_proj.firstPoint.Y, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:240:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:241:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:242:# BLOQUE 02 - SNAP GEOMETRICO CONTROLADO
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:243:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:244:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:245:def bloque_02_snap_geometrico_controlado(reset_snap=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:246:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:247:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:248:    msg("BLOQUE 02 - SNAP GEOMETRICO CONTROLADO")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:249:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:250:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:251:    if arcpy.Exists(PC_SNAP) and not reset_snap:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:252:        msg("PC_Snap_Obra_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:253:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:254:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:255:    if arcpy.Exists(PC_SNAP) and reset_snap:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:256:        borrar_si_existe(PC_SNAP)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:257:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:258:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:259:        (PC_OBRA, "PC_Obra_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:260:        (STREAMNET, "StreamNet_Strahler_150k")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:261:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:262:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:263:    stream_pts = os.path.join(GDB, "StreamPts_Base_tmp")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:264:    buffer_obra = os.path.join(GDB, "Buffer_Obra_tmp")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:265:    stream_local = os.path.join(GDB, "StreamPts_Local_tmp")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:266:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:267:    for ds in [stream_pts, buffer_obra, stream_local]:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:269:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:270:    # 1. Discretizar red en puntos cada DIST_PUNTOS_M
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:271:    arcpy.management.GeneratePointsAlongLines(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:272:        STREAMNET,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:273:        stream_pts,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:276:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:277:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:278:    # 2. Buffer local alrededor del PC_Obra
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:279:    arcpy.analysis.Buffer(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:280:        PC_OBRA,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:281:        buffer_obra,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:282:        str(BUFFER_SNAP_M) + " Meters"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:283:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:284:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:290:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:291:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:292:    count_local = int(arcpy.management.GetCount(stream_local)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:293:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:294:    if count_local == 0:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:295:        raise Exception("No se encontraron puntos de red dentro del buffer de snap. Aumentar BUFFER_SNAP_M.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:296:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:297:    msg("Puntos locales de red encontrados: " + str(count_local))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:298:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:299:    # 4. Leer coordenada PC
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:300:    with arcpy.da.SearchCursor(PC_OBRA, ["SHAPE@XY"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:301:        for row in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:302:            pc_x, pc_y = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:320:    sr = arcpy.Describe(STREAMNET).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:321:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:322:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:323:        GDB,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:324:        "PC_Snap_Obra_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:325:        "POINT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:326:        spatial_reference=sr
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:327:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:328:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:329:    arcpy.management.AddField(PC_SNAP, "DIST_PC_M", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:330:    arcpy.management.AddField(PC_SNAP, "METODO", "TEXT", field_length=40)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:331:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:332:    with arcpy.da.InsertCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:333:        PC_SNAP,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:334:        ["SHAPE@", "DIST_PC_M", "METODO"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:335:    ) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:337:            arcpy.PointGeometry(arcpy.Point(best_x, best_y), sr),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:338:            min_dist,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:339:            "SNAP_GEOMETRICO_LOCAL"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:340:        ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:341:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:342:    msg("OK: PC_Snap_Obra_Iguana creado")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:343:    msg("Distancia PC-Snap m: " + str(round(min_dist, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:344:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:345:    # 6. Limpiar temporales GDB
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:346:    for ds in [stream_pts, buffer_obra, stream_local]:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:347:        borrar_si_existe(ds)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:350:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:351:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:352:# BLOQUE 03 - WATERSHED Y CUENCA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:353:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:354:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:355:def bloque_03_watershed_cuenca(reset_cuenca=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:356:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:357:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:358:    msg("BLOQUE 03 - WATERSHED Y CUENCA")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:359:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:360:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:361:    validar_requeridos([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:362:        (FLOWDIR, "FlowDir_Base"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:363:        (PC_SNAP, "PC_Snap_Obra_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:364:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:365:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:366:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:367:    # 1. Cuenca raster
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:368:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:369:    if arcpy.Exists(CUENCA_R) and not reset_cuenca:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:370:        msg("Cuenca_R_Obra_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:371:    else:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:372:        if arcpy.Exists(CUENCA_R) and reset_cuenca:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:373:            borrar_si_existe(CUENCA_R)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:374:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:375:        arcpy.gp.Watershed_sa(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:376:            FLOWDIR,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:377:            PC_SNAP,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:378:            CUENCA_R
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:379:        )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:380:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:381:        msg("OK: Cuenca_R_Obra_Iguana creada")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:382:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:383:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:384:    # 2. Cuenca poligono
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:385:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:386:    if arcpy.Exists(CUENCA_POLY) and not reset_cuenca:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:387:        msg("Cuenca_Obra_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:388:    else:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:389:        if arcpy.Exists(CUENCA_POLY) and reset_cuenca:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:390:            borrar_si_existe(CUENCA_POLY)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:391:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:392:        arcpy.conversion.RasterToPolygon(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:393:            CUENCA_R,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:394:            CUENCA_POLY,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:395:            "NO_SIMPLIFY"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:396:        )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:397:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:398:        msg("OK: Cuenca_Obra_Iguana creada")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:399:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:400:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:402:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:403:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:404:        (CUENCA_R, "Cuenca_R_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:405:        (CUENCA_POLY, "Cuenca_Obra_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:406:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:407:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:422:    validar_requeridos([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:423:        (STREAMNET, "StreamNet_Strahler_150k"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:424:        (CUENCA_POLY, "Cuenca_Obra_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:425:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:426:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:427:    if arcpy.Exists(RED_HIDRICA) and not reset_red:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:428:        count = int(arcpy.management.GetCount(RED_HIDRICA)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:429:        msg("Red_Hidrica_Obra_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:430:        msg("Tramos red hidrica: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:436:    arcpy.analysis.Clip(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:437:        STREAMNET,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:438:        CUENCA_POLY,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:439:        RED_HIDRICA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:440:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:441:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:442:    count = int(arcpy.management.GetCount(RED_HIDRICA)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:443:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:444:    if count == 0:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:445:        raise Exception("Red_Hidrica_Obra_Iguana quedo vacia. Revisar cuenca o red base.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:446:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:447:    msg("OK: Red_Hidrica_Obra_Iguana creada")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:472:        borrar_si_existe(RED_Z)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:473:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:474:    arcpy.management.CopyFeatures(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:475:        RED_HIDRICA,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:476:        RED_Z
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:493:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:494:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:495:            arcpy.management.AddField(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:496:                RED_Z,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:497:                nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:501:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:502:    def get_z(x, y):
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:503:        val = arcpy.management.GetCellValue(MDT, f"{x} {y}").getOutput(0)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:504:        if val in [None, "NoData"]:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:505:            return None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:552:            cur.updateRow(row)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:553:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:554:    count = int(arcpy.management.GetCount(RED_Z)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:555:    msg("OK: Red_Candidata_Z_Iguana creada")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:556:    msg("Tramos con cotas: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:559:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:560:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:561:# BLOQUE 06 - CABECERA CANDIDATA POR COTA MAXIMA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:562:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:563:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:564:def bloque_06_cabecera_candidata(reset_cabecera=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:565:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:566:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:567:    msg("BLOQUE 06 - CABECERA CANDIDATA")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:568:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:569:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:573:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:574:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:575:    if arcpy.Exists(CABECERA) and not reset_cabecera:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:576:        msg("Cabecera_Candidata_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:577:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:578:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:579:    if arcpy.Exists(CABECERA) and reset_cabecera:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:580:        borrar_si_existe(CABECERA)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:581:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:582:    max_z = -999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:608:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:609:    if x_max is None or y_max is None:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:610:        raise Exception("No se pudo identificar cabecera candidata.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:611:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:612:    sr = arcpy.Describe(RED_Z).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:613:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:614:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:615:        GDB,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:616:        "Cabecera_Candidata_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:617:        "POINT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:618:        spatial_reference=sr
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:619:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:620:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:621:    arcpy.management.AddField(CABECERA, "Z_CAB", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:622:    arcpy.management.AddField(CABECERA, "OID_TRAMO", "LONG")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:623:    arcpy.management.AddField(CABECERA, "EXTREMO", "TEXT", field_length=10)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:624:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:625:    with arcpy.da.InsertCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:626:        CABECERA,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:627:        ["SHAPE@", "Z_CAB", "OID_TRAMO", "EXTREMO"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:628:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:634:        ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:635:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:636:    msg("OK: Cabecera_Candidata_Iguana creada")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:637:    msg("OID tramo cabecera: " + str(oid_max))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:638:    msg("Extremo: " + str(campo_max))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:639:    msg("Z cabecera: " + str(round(max_z, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:640:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:641:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:642:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:643:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:644:# BLOQUE 07 - GRAFO TOPOLOGICO Y EJE PRINCIPAL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:645:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:646:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:647:def bloque_07_grafo_topologico_eje(reset_eje=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:648:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:649:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:650:    msg("BLOQUE 07 - GRAFO TOPOLOGICO Y EJE PRINCIPAL")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:651:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:652:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:653:    validar_requeridos([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:654:        (RED_Z, "Red_Candidata_Z_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:655:        (PC_SNAP, "PC_Snap_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:656:        (CABECERA, "Cabecera_Candidata_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:657:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:658:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:659:    if arcpy.Exists(EJE_RUTA) and arcpy.Exists(NODOS_TOPO) and arcpy.Exists(NODOS_CONTROL_TOPO) and not reset_eje:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:660:        msg("Eje_Principal_Iguana y nodos topologicos ya existen - se reutilizan.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:661:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:662:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:663:    if reset_eje:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:664:        for ds in [EJE_RUTA, NODOS_TOPO, NODOS_CONTROL_TOPO]:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:665:            borrar_si_existe(ds)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:666:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:673:                return row[0][0], row[0][1]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:674:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:675:    pc_x, pc_y = leer_xy(PC_SNAP)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:676:    cab_x, cab_y = leer_xy(CABECERA)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:677:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:678:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:729:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:730:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:731:    # Buscar nodos mas cercanos a PC y cabecera
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:732:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:733:    def nodo_mas_cercano_a_xy(x_ref, y_ref):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:743:        return mejor_nodo, mejor_dist
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:744:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:745:    nodo_salida, dist_salida = nodo_mas_cercano_a_xy(pc_x, pc_y)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:746:    nodo_cabecera, dist_cabecera = nodo_mas_cercano_a_xy(cab_x, cab_y)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:747:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:748:    msg("Nodo salida topologico: " + str(nodo_salida) + " Dist: " + str(round(dist_salida, 3)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:749:    msg("Nodo cabecera topologico: " + str(nodo_cabecera) + " Dist: " + str(round(dist_cabecera, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:750:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:751:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:752:    # Buscar ruta BFS
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:753:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:754:    cola = deque([nodo_salida])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:755:    visitado = {nodo_salida}
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:756:    padre = {}
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:757:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:761:        actual = cola.popleft()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:762:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:763:        if actual == nodo_cabecera:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:764:            encontrado = True
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:765:            break
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:772:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:773:    if not encontrado:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:774:        raise Exception("No se encontro ruta topologica entre salida y cabecera.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:775:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:776:    ruta_nodos = [nodo_cabecera]
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:777:    n = nodo_cabecera
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:778:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:779:    while n != nodo_salida:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:780:        n = padre[n]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:781:        ruta_nodos.append(n)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:805:    sr = arcpy.Describe(RED_Z).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:806:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:807:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:808:        GDB,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:809:        "Nodos_Topo_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:810:        "POINT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:812:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:813:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:814:    arcpy.management.AddField(NODOS_TOPO, "ID_NODO", "LONG")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:815:    arcpy.management.AddField(NODOS_TOPO, "Z_NODO", "DOUBLE")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:816:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:817:    with arcpy.da.InsertCursor(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:826:    # Crear Nodos_Control_Topo_Iguana
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:827:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:828:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:829:        GDB,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:830:        "Nodos_Control_Topo_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:831:        "POINT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:841:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:842:    for nombre, tipo in campos_control:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:843:        arcpy.management.AddField(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:844:            NODOS_CONTROL_TOPO,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:845:            nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:853:    ) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:854:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:855:        data = nodos[nodo_salida]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:856:        ic.insertRow([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:857:            arcpy.PointGeometry(arcpy.Point(data["x"], data["y"]), sr),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:858:            "SALIDA_PC",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:859:            nodo_salida,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:860:            data["z"],
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:861:            dist_salida
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:862:        ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:863:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:864:        data = nodos[nodo_cabecera]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:865:        ic.insertRow([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:866:            arcpy.PointGeometry(arcpy.Point(data["x"], data["y"]), sr),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:867:            "CABECERA",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:868:            nodo_cabecera,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:869:            data["z"],
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:870:            dist_cabecera
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:871:        ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:872:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:873:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:874:    # Seleccionar tramos de ruta y crear eje principal
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:875:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:876:    where = f"{oid_field} IN ({','.join(map(str, tramos_ruta))})"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:877:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:878:    arcpy.management.MakeFeatureLayer(RED_Z, "ruta_lyr")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:879:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:880:    arcpy.management.SelectLayerByAttribute(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:881:        "ruta_lyr",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:882:        "NEW_SELECTION",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:884:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:885:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:886:    arcpy.management.CopyFeatures(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:887:        "ruta_lyr",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:888:        EJE_RUTA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:889:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:890:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:891:    msg("OK: Eje_Principal_Iguana creado con ruta topologica salida-cabecera")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:892:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:893:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:894:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:895:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:896:# BLOQUE 08 - EJE PRINCIPAL CONTINUO
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:897:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:898:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:899:def bloque_08_eje_continuo(reset_eje_continuo=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:900:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:901:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:902:    msg("BLOQUE 08 - EJE PRINCIPAL CONTINUO")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:903:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:904:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:905:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:906:        (EJE_RUTA, "Eje_Principal_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:907:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:908:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:909:    if arcpy.Exists(EJE_CONTINUO) and not reset_eje_continuo:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:910:        count = int(arcpy.management.GetCount(EJE_CONTINUO)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:911:        msg("Eje_Principal_Continuo_Iguana ya existe - se reutiliza.")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:912:        msg("Features eje continuo: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:913:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:914:        if count != 1:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:915:            raise Exception("Eje_Principal_Continuo_Iguana existe pero no tiene 1 feature.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:916:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:917:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:918:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:919:    if arcpy.Exists(EJE_CONTINUO) and reset_eje_continuo:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:920:        borrar_si_existe(EJE_CONTINUO)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:921:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:922:    arcpy.management.Dissolve(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:923:        EJE_RUTA,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:924:        EJE_CONTINUO,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:925:        "",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:926:        "",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:929:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:930:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:931:    count = int(arcpy.management.GetCount(EJE_CONTINUO)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:932:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:933:    if count != 1:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:934:        raise Exception("Eje_Principal_Continuo_Iguana no quedo como una sola feature.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:935:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:936:    msg("OK: Eje_Principal_Continuo_Iguana creado")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:937:    msg("Features eje continuo: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:938:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:939:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:940:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:941:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:942:# BLOQUE 09 - PUNTOS DE PERFIL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:943:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:944:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:945:def bloque_09_perfil_puntos(reset_perfil_pts=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:946:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:947:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:948:    msg("BLOQUE 09 - PUNTOS DE PERFIL")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:949:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:950:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:951:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:952:        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:953:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:954:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:955:    if arcpy.Exists(PERFIL_PTS) and not reset_perfil_pts:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:956:        count = int(arcpy.management.GetCount(PERFIL_PTS)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:957:        msg("Perfil_Puntos_Iguana ya existe - se reutiliza.")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:958:        msg("Total puntos perfil: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:959:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:960:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:961:    if arcpy.Exists(PERFIL_PTS) and reset_perfil_pts:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:962:        borrar_si_existe(PERFIL_PTS)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:963:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:964:    arcpy.management.GeneratePointsAlongLines(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:965:        EJE_CONTINUO,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:966:        PERFIL_PTS,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:967:        "DISTANCE",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:968:        str(DIST_PUNTOS_M) + " Meters"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:969:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:970:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:971:    count = int(arcpy.management.GetCount(PERFIL_PTS)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:972:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:973:    if count == 0:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:974:        raise Exception("Perfil_Puntos_Iguana quedo vacio.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:975:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:976:    msg("OK: Perfil_Puntos_Iguana creado")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:977:    msg("Total puntos perfil: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:978:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:979:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:980:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:981:# BLOQUE 10 - EXTRAER Z A PUNTOS DE PERFIL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:982:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:983:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:989:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:990:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:991:        (PERFIL_PTS, "Perfil_Puntos_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:992:        (MDT, "MDT_Fill_Base")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:993:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:994:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:995:    if arcpy.Exists(PERFIL_Z) and not reset_z:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:996:        count = int(arcpy.management.GetCount(PERFIL_Z)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:997:        msg("Perfil_Puntos_Z_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:998:        msg("Total puntos con Z: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:999:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1000:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1001:    if arcpy.Exists(PERFIL_Z) and reset_z:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1002:        borrar_si_existe(PERFIL_Z)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1003:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1004:    # Control de environments
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1005:    arcpy.env.cellSize = MDT
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1006:    arcpy.env.snapRaster = MDT
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1007:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1008:    arcpy.sa.ExtractValuesToPoints(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1009:        PERFIL_PTS,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1010:        MDT,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1011:        PERFIL_Z,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1012:        "NONE",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1013:        "VALUE_ONLY"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1014:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1015:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1016:    count = int(arcpy.management.GetCount(PERFIL_Z)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1017:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1018:    if count == 0:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1019:        raise Exception("Perfil_Puntos_Z_Iguana quedo vacio.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1020:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1021:    msg("OK: Perfil_Puntos_Z_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1022:    msg("Total puntos con Z: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1023:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1024:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1025:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1026:# BLOQUE 11 - MEAS ORIENTADO PC A CABECERA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1027:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1028:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1034:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1035:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1036:        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1037:        (PERFIL_Z, "Perfil_Puntos_Z_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1038:        (PC_SNAP, "PC_Snap_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1039:        (CABECERA, "Cabecera_Candidata_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1040:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1041:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1042:    if arcpy.Exists(PERFIL_ZM) and not reset_zm:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1043:        count = int(arcpy.management.GetCount(PERFIL_ZM)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1044:        msg("Perfil_Puntos_ZM_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1045:        msg("Total puntos ZM: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1046:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1047:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1048:    if arcpy.Exists(PERFIL_ZM) and reset_zm:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1049:        borrar_si_existe(PERFIL_ZM)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1050:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1051:    tmp = os.path.join(GDB, "Perfil_Puntos_ZM_tmp")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1052:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1053:    borrar_si_existe(tmp)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1054:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1055:    # Leer geometria del eje
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1056:    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1057:        for row in cur:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1058:            eje_geom = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1059:            break
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1060:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1064:                return row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1065:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1066:    pc_geom = leer_geom_punto(PC_SNAP)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1067:    cab_geom = leer_geom_punto(CABECERA)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1068:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1069:    m_pc = eje_geom.measureOnLine(pc_geom, False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1070:    m_cab = eje_geom.measureOnLine(cab_geom, False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1071:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1072:    m_ini = min(m_pc, m_cab)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1077:    msg("M_CAB: " + str(round(m_cab, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1078:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1079:    arcpy.management.CopyFeatures(PERFIL_Z, tmp)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1080:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1081:    campos_existentes = [f.name for f in arcpy.ListFields(tmp)]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1092:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1093:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1094:            arcpy.management.AddField(tmp, nombre, tipo)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1095:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1096:    def dist_geom(p1, p2):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1107:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1108:        for oid, geom, m_raw, meas, dpc, dcab, en_ruta in cur:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1109:            m = eje_geom.measureOnLine(geom, False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1110:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1111:            if m_cab >= m_pc:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1145:                cur.updateRow([oid, None])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1146:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1147:    arcpy.management.MakeFeatureLayer(tmp, "perfil_zm_lyr")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1148:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1149:    arcpy.management.SelectLayerByAttribute(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1150:        "perfil_zm_lyr",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1151:        "NEW_SELECTION",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1152:        "EN_RUTA = 1"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1153:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1154:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1155:    arcpy.management.CopyFeatures(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1156:        "perfil_zm_lyr",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1157:        PERFIL_ZM
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1158:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1159:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1160:    count = int(arcpy.management.GetCount(PERFIL_ZM)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1161:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1162:    meas_min = 999999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1165:    z_max = -999999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1166:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1167:    with arcpy.da.SearchCursor(PERFIL_ZM, ["MEAS", "RASTERVALU"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1168:        for meas, z in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1169:            if meas is not None:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1176:    borrar_si_existe(tmp)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1177:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1178:    msg("OK: Perfil_Puntos_ZM_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1179:    msg("Total puntos ruta: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1180:    msg("MEAS min: " + str(round(meas_min, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1186:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1187:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1188:# BLOQUE 12 - VARIABLES DERIVADAS DEL PERFIL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1189:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1190:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1191:def bloque_12_variables_perfil(reset_var=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1192:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1193:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1196:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1197:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1198:        (PERFIL_ZM, "Perfil_Puntos_ZM_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1199:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1200:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1201:    if arcpy.Exists(PERFIL_VAR) and not reset_var:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1202:        count = int(arcpy.management.GetCount(PERFIL_VAR)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1203:        msg("Perfil_Puntos_VAR_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1204:        msg("Total puntos VAR: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1205:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1206:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1207:    if arcpy.Exists(PERFIL_VAR) and reset_var:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1208:        borrar_si_existe(PERFIL_VAR)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1209:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1210:    arcpy.management.CopyFeatures(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1211:        PERFIL_ZM,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1212:        PERFIL_VAR
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1213:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1214:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1215:    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_VAR)]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1216:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1217:    campos_nuevos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1225:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1226:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1227:            arcpy.management.AddField(PERFIL_VAR, nombre, tipo)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1228:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1229:    datos = []
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1230:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1231:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1232:        PERFIL_VAR,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1233:        ["OID@", "MEAS", "RASTERVALU", "ORDEN_PERF"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1234:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1279:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1280:    with arcpy.da.UpdateCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1281:        PERFIL_VAR,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1282:        ["OID@", "Z_M", "DIST_INC_M", "DZ_M", "PEND_M_M", "PEND_PCT"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1283:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1294:                cur.updateRow(row)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1295:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1296:    count = int(arcpy.management.GetCount(PERFIL_VAR)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1297:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1298:    pend_min = 999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1301:    pend_n = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1302:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1303:    with arcpy.da.SearchCursor(PERFIL_VAR, ["PEND_PCT"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1304:        for row in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1305:            p = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1312:    pend_prom = pend_sum / pend_n if pend_n > 0 else None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1313:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1314:    msg("OK: Perfil_Puntos_VAR_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1315:    msg("Total puntos: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1316:    msg("Pendiente min %: " + str(round(pend_min, 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1320:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1321:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1322:# BLOQUE 13 - PERFIL QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1323:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1324:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1325:def bloque_13_perfil_qc(reset_qc=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1326:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1327:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1328:    msg("BLOQUE 13 - PERFIL QC")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1329:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1330:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1331:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1332:        (PERFIL_VAR, "Perfil_Puntos_VAR_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1333:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1334:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1335:    if arcpy.Exists(PERFIL_QC) and not reset_qc:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1336:        count = int(arcpy.management.GetCount(PERFIL_QC)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1337:        msg("Perfil_Puntos_QC_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1338:        msg("Total puntos QC: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1339:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1340:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1341:    if arcpy.Exists(PERFIL_QC) and reset_qc:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1342:        borrar_si_existe(PERFIL_QC)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1343:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1344:    arcpy.management.CopyFeatures(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1345:        PERFIL_VAR,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1346:        PERFIL_QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1347:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1348:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1349:    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_QC)]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1350:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1351:    campos_nuevos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1358:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1359:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1360:            arcpy.management.AddField(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1361:                PERFIL_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1362:                nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1363:                tipo,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1368:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1369:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1370:        PERFIL_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1371:        ["OID@", "MEAS", "PEND_PCT"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1372:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1427:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1428:    with arcpy.da.UpdateCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1429:        PERFIL_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1430:        ["OID@", "FLAG_P50", "FLAG_P100", "CLASE_PEND", "PEND_SUAV_5"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1431:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1441:                cur.updateRow(row)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1442:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1443:    total = int(arcpy.management.GetCount(PERFIL_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1444:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1445:    flag50 = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1451:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1452:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1453:        PERFIL_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1454:        ["FLAG_P50", "FLAG_P100", "PEND_SUAV_5"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1455:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1467:    suav_prom = suav_sum / suav_n if suav_n > 0 else None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1468:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1469:    msg("OK: Perfil_Puntos_QC_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1470:    msg("Total puntos: " + str(total))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1471:    msg("Pendientes > 50%: " + str(flag50))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1487:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1488:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1489:        (PERFIL_QC, "Perfil_Puntos_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1490:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1491:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1492:    if arcpy.Exists(PERFIL_QUIEBRES) and not reset_quiebres:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1493:        count = int(arcpy.management.GetCount(PERFIL_QUIEBRES)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1494:        msg("Perfil_Puntos_QUIEBRES_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1495:        msg("Total puntos QUIEBRES: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1496:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1497:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1498:    if arcpy.Exists(PERFIL_QUIEBRES) and reset_quiebres:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1499:        borrar_si_existe(PERFIL_QUIEBRES)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1500:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1501:    arcpy.management.CopyFeatures(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1502:        PERFIL_QC,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1503:        PERFIL_QUIEBRES
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1504:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1505:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1506:    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_QUIEBRES)]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1507:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1508:    campos_nuevos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1517:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1518:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1519:            arcpy.management.AddField(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1520:                PERFIL_QUIEBRES,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1521:                nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1522:                tipo,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1527:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1528:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1529:        PERFIL_QUIEBRES,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1530:        ["OID@", "MEAS", "PEND_SUAV_5", "PEND_PCT", "FLAG_P100"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1531:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1614:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1615:    with arcpy.da.UpdateCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1616:        PERFIL_QUIEBRES,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1617:        ["OID@", "DPEND", "ABS_DPEND", "FLAG_DPEND", "PERSIST3", "QUIEBRE", "TIPO_QUIEBRE"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1618:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1630:                cur.updateRow(row)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1631:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1632:    total = int(arcpy.management.GetCount(PERFIL_QUIEBRES)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1633:    flag_d = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1634:    persist = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1639:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1640:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1641:        PERFIL_QUIEBRES,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1642:        ["FLAG_DPEND", "PERSIST3", "QUIEBRE", "TIPO_QUIEBRE"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1643:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1656:                anom += 1
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1657:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1658:    msg("OK: Perfil_Puntos_QUIEBRES_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1659:    msg("Total puntos: " + str(total))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1660:    msg("FLAG_DPEND: " + str(flag_d))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1677:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1678:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1679:        (PERFIL_QUIEBRES, "Perfil_Puntos_QUIEBRES_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1680:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1681:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1682:    productos = [PERFIL_SEG_QC, PUNTOS_QUIEBRE_QC, TRAMOS_QC]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1683:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1684:    if all(arcpy.Exists(p) for p in productos) and not reset_seg_qc:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1685:        msg("Productos de segmentacion QC ya existen - se reutilizan.")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1686:        msg("Perfil_Puntos_SEG_QC_Iguana: " + str(int(arcpy.management.GetCount(PERFIL_SEG_QC)[0])))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1687:        msg("Puntos_Quiebre_QC_Iguana: " + str(int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1688:        msg("Tramos_Geomorf_QC_Iguana: " + str(int(arcpy.management.GetCount(TRAMOS_QC)[0])))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1689:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1690:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1694:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1695:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1696:    # Copiar perfil de quiebres a perfil segmentado QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1697:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1698:    arcpy.management.CopyFeatures(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1699:        PERFIL_QUIEBRES,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1700:        PERFIL_SEG_QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1701:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1702:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1703:    campos_existentes = [f.name for f in arcpy.ListFields(PERFIL_SEG_QC)]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1704:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1705:    campos_nuevos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1710:    for nombre, tipo in campos_nuevos:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1711:        if nombre not in campos_existentes:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1712:            arcpy.management.AddField(PERFIL_SEG_QC, nombre, tipo)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1713:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1714:    # --------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1718:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1719:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1720:        PERFIL_SEG_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1721:        [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1722:            "OID@",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1827:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1828:    with arcpy.da.UpdateCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1829:        PERFIL_SEG_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1830:        ["OID@", "ID_TRAMO_QC", "ES_LIMITE_QC"]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1831:    ) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1840:    # Crear puntos de quiebre QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1841:    # --------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1842:    arcpy.management.MakeFeatureLayer(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1843:        PERFIL_SEG_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1844:        "quiebres_qc_lyr"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1845:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1846:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1847:    arcpy.management.SelectLayerByAttribute(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1848:        "quiebres_qc_lyr",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1849:        "NEW_SELECTION",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1851:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1852:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1853:    arcpy.management.CopyFeatures(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1854:        "quiebres_qc_lyr",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1855:        PUNTOS_QUIEBRE_QC
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1862:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1863:    with arcpy.da.SearchCursor(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1864:        PERFIL_SEG_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1865:        [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1866:            "ID_TRAMO_QC",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1913:                tramos[id_tramo]["tipos"].append(tipo_q)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1914:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1915:    arcpy.management.CreateTable(GDB, "Tramos_Geomorf_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1916:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1917:    campos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1934:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1935:    for nombre, tipo in campos:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1936:        arcpy.management.AddField(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1937:            TRAMOS_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:1938:            nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2044:        pass
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2045:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2046:    total_puntos = int(arcpy.management.GetCount(PERFIL_SEG_QC)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2047:    total_quiebres_qc = int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2048:    total_tramos_qc = int(arcpy.management.GetCount(TRAMOS_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2049:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2050:    long_cero = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2082:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2083:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2084:        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2085:        (PC_SNAP, "PC_Snap_Obra_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2086:        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2087:    ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2088:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2089:    if arcpy.Exists(TRAMOS_LINEAS_QC) and not reset_lineas_qc:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2090:        count = int(arcpy.management.GetCount(TRAMOS_LINEAS_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2091:        msg("Tramos_Geomorf_Lineas_QC_Iguana ya existe - se reutiliza.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2092:        msg("Total lineas tramos QC: " + str(count))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2093:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2094:        if count != int(arcpy.management.GetCount(TRAMOS_QC)[0]):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2095:            raise Exception("Numero de lineas QC no coincide con numero de tramos QC.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2096:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2100:        borrar_si_existe(TRAMOS_LINEAS_QC)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2101:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2102:    # Leer geometria del eje
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2103:    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2104:        for row in cur:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2105:            eje_geom = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2106:            break
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2107:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2108:    # Leer punto PC
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2109:    with arcpy.da.SearchCursor(PC_SNAP, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2110:        for row in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2111:            pc_geom = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2112:            break
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2113:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2114:    # Medida cruda del PC sobre la geometria del eje
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2115:    m_pc = eje_geom.measureOnLine(pc_geom, False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2116:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2117:    msg("M_PC sobre eje: " + str(round(m_pc, 3)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2118:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2119:    # Crear Feature Class de salida
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2120:    sr = arcpy.Describe(EJE_CONTINUO).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2121:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2122:    arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2123:        GDB,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2124:        "Tramos_Geomorf_Lineas_QC_Iguana",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2125:        "POLYLINE",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2146:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2147:    for nombre, tipo in campos:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2148:        arcpy.management.AddField(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2149:            TRAMOS_LINEAS_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2150:            nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2216:                ) = row
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2217:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2218:                # MEAS esta orientado desde PC hacia cabecera.
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2219:                # La geometria original del eje esta orientada al reves:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2220:                # M_CAB = 0, M_PC = longitud total.
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2221:                raw_ini = m_pc - meas_fin
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2225:                b = max(raw_ini, raw_fin)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2226:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2227:                geom_seg = eje_geom.segmentAlongLine(a, b, False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2228:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2229:                ic.insertRow([
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2246:                ])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2247:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2248:    count = int(arcpy.management.GetCount(TRAMOS_LINEAS_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2249:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2250:    msg("OK: Tramos_Geomorf_Lineas_QC_Iguana creado")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2263:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2264:    validar_requeridos([
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2265:        (CUENCA_POLY, "Cuenca_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2266:        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2267:        (RED_HIDRICA, "Red_Hidrica_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2268:        (PERFIL_SEG_QC, "Perfil_Puntos_SEG_QC_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2269:        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2270:        (PUNTOS_QUIEBRE_QC, "Puntos_Quiebre_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2283:                "LONG_RED_KM",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2284:                "DENS_DREN",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2285:                "Z_SALIDA",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2286:                "Z_CABECERA",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2287:                "DESNIVEL_M",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2288:                "PEND_MED_PCT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2297:                msg("Perimetro km: " + str(round(row[1], 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2298:                msg("Longitud cauce km: " + str(round(row[2], 4)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2299:                msg("Longitud perfil km: " + str(round(row[3], 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2300:                msg("Longitud red km: " + str(round(row[4], 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2301:                msg("Densidad drenaje: " + str(round(row[5], 4)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2302:                msg("Z salida: " + str(round(row[6], 2)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2303:                msg("Z cabecera: " + str(round(row[7], 2)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2304:                msg("Desnivel m: " + str(round(row[8], 2)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2305:                msg("Pendiente media cauce %: " + str(round(row[9], 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2317:    perim_m = 0.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2318:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2319:    with arcpy.da.SearchCursor(CUENCA_POLY, ["SHAPE@AREA", "SHAPE@LENGTH"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2320:        for area, perim in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2321:            area_m2 += area
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2328:    long_cauce_m = 0.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2329:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2330:    with arcpy.da.SearchCursor(EJE_CONTINUO, ["SHAPE@LENGTH"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2331:        for row in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2332:            long_cauce_m += row[0]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2345:    densidad_drenaje = long_red_km / area_km2 if area_km2 > 0 else None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2346:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2347:    # Z salida/cabecera desde perfil QC orientado
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2348:    z_salida = None
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2349:    z_cabecera = None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2350:    meas_min = 999999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2351:    meas_max = -999999999
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2352:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2353:    with arcpy.da.SearchCursor(PERFIL_SEG_QC, ["MEAS", "Z_M"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2354:        for meas, z in cur:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2355:            if meas is None or z is None:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2358:            if meas < meas_min:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2359:                meas_min = meas
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2360:                z_salida = z
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2361:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2362:            if meas > meas_max:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2363:                meas_max = meas
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2364:                z_cabecera = z
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2365:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2366:    long_perfil_m = meas_max - meas_min
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2367:    long_perfil_km = long_perfil_m / 1000.0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2368:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2369:    desnivel_m = z_cabecera - z_salida
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2370:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2371:    pend_media_cauce_pct = (
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2372:        (desnivel_m / long_perfil_m) * 100.0
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2373:        if long_perfil_m > 0 else None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2374:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2375:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2380:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2381:    kf = (
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2382:        area_km2 / (long_perfil_km ** 2)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2383:        if long_perfil_km > 0 else None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2384:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2385:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2386:    n_tramos_qc = int(arcpy.management.GetCount(TRAMOS_QC)[0])
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2387:    n_quiebres_qc = int(arcpy.management.GetCount(PUNTOS_QUIEBRE_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2388:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2389:    # Crear tabla
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2390:    arcpy.management.CreateTable(GDB, "Parametros_Geomorf_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2391:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2392:    campos = [
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2398:        ("LONG_RED_KM", "DOUBLE"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2399:        ("DENS_DREN", "DOUBLE"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2400:        ("Z_SALIDA", "DOUBLE"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2401:        ("Z_CABECERA", "DOUBLE"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2402:        ("DESNIVEL_M", "DOUBLE"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2403:        ("PEND_MED_PCT", "DOUBLE"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2409:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2410:    for nombre, tipo in campos:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2411:        arcpy.management.AddField(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2412:            PARAMS,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2413:            nombre,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2426:            "LONG_RED_KM",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2427:            "DENS_DREN",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2428:            "Z_SALIDA",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2429:            "Z_CABECERA",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2430:            "DESNIVEL_M",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2431:            "PEND_MED_PCT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2441:            perim_km,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2442:            long_cauce_km,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2443:            long_perfil_km,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2444:            long_red_km,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2445:            densidad_drenaje,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2446:            z_salida,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2447:            z_cabecera,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2448:            desnivel_m,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2449:            pend_media_cauce_pct,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2458:    msg("Perimetro km: " + str(round(perim_km, 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2459:    msg("Longitud cauce km: " + str(round(long_cauce_km, 4)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2460:    msg("Longitud perfil km: " + str(round(long_perfil_km, 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2461:    msg("Longitud red km: " + str(round(long_red_km, 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2462:    msg("Densidad drenaje: " + str(round(densidad_drenaje, 4)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2463:    msg("Z salida: " + str(round(z_salida, 2)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2464:    msg("Z cabecera: " + str(round(z_cabecera, 2)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2465:    msg("Desnivel m: " + str(round(desnivel_m, 2)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2466:    msg("Pendiente media cauce %: " + str(round(pend_media_cauce_pct, 4)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2472:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2473:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2474:# BLOQUE 18 - EXPORTACIONES AUDITABLES
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2475:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2476:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2477:def bloque_18_exportaciones(reset_export=False):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2478:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2479:    msg("========================================")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2480:    msg("BLOQUE 18 - EXPORTACIONES AUDITABLES")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2481:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2482:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2483:    if not os.path.exists(EXPORT_TABLAS):
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2484:        os.makedirs(EXPORT_TABLAS)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2485:        msg("Carpeta creada: " + EXPORT_TABLAS)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2486:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2487:    fecha = datetime.now().strftime("%Y%m%d_%H%M%S")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2491:        TRAMOS_QC,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2492:        TRAMOS_LINEAS_QC,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2493:        PERFIL_SEG_QC,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2494:        PERFIL_QC,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2495:        PERFIL_VAR,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2496:        PERFIL_ZM,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2497:        PUNTOS_QUIEBRE_QC,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2498:        CABECERA,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2499:        PC_OBRA,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2500:        PC_SNAP
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2501:    ]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2502:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2503:    exportados_xlsx = 0
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2504:    exportados_csv = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2505:    omitidos = 0
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2506:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2513:            continue
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2514:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2515:        xlsx = os.path.join(EXPORT_TABLAS, nombre + "_" + fecha + ".xlsx")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2516:        csv_name = nombre + "_" + fecha + ".csv"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2517:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2518:        try:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2519:            arcpy.conversion.TableToExcel(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2520:                ruta,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2521:                xlsx
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2522:            )
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2523:            exportados_xlsx += 1
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2524:            msg("XLSX: " + os.path.basename(xlsx))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2525:        except Exception as e:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2526:            msg("No se pudo exportar XLSX: " + nombre + " | " + str(e))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2527:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2528:        try:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2529:            arcpy.conversion.TableToTable(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2530:                ruta,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2531:                EXPORT_TABLAS,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2532:                csv_name
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2533:            )
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2534:            exportados_csv += 1
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2535:            msg("CSV: " + csv_name)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2536:        except Exception as e:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2537:            msg("No se pudo exportar CSV: " + nombre + " | " + str(e))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2538:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2539:    msg("Exportacion XLSX: " + str(exportados_xlsx))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2540:    msg("Exportacion CSV: " + str(exportados_csv))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2541:    msg("Omitidos: " + str(omitidos))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2542:    msg("Carpeta exportacion: " + EXPORT_TABLAS)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2543:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2544:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2547:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2548:#
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2549:# bloque_01_crear_pc_obra()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2550:# bloque_02_snap_geometrico_controlado()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2551:# bloque_03_watershed_cuenca()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2552:# bloque_04_red_hidrica()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2553:# bloque_05_red_candidata_z()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2554:# bloque_06_cabecera_candidata()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2555:# bloque_07_grafo_topologico_eje()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2556:# bloque_08_perfil_puntos()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2557:# bloque_09_extraer_z()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2558:# bloque_10_meas_orientado()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2563:# bloque_15_tramos_lineas_qc()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2564:# bloque_16_parametros_globales()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2565:# bloque_17_exportaciones()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2566:# bloque_18_registro_final()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2567:#
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2568:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2569:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2570:# EJECUCION
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2571:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2572:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2575:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2576:    msg("HidroFlow Modulo 1 Geomorfologia - RUN v1")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2577:    msg("Fecha ejecucion: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2578:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2579:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2580:    bloque_00_validar_insumos()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2581:    bloque_01_pc_obra(reset_pc=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2582:    bloque_02_snap_geometrico_controlado(reset_snap=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2583:    bloque_03_watershed_cuenca(reset_cuenca=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2584:    bloque_04_red_hidrica(reset_red=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2585:    bloque_05_red_candidata_z(reset_red_z=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2586:    bloque_06_cabecera_candidata(reset_cabecera=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2587:    bloque_07_grafo_topologico_eje(reset_eje=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2588:    bloque_08_eje_continuo(reset_eje_continuo=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2589:    bloque_09_perfil_puntos(reset_perfil_pts=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2590:    bloque_10_extraer_z(reset_z=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2591:    bloque_11_meas_orientado(reset_zm=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2592:    bloque_12_variables_perfil(reset_var=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2593:    bloque_13_perfil_qc(reset_qc=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2594:    bloque_14_quiebres(reset_quiebres=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2595:    bloque_15_segmentacion_qc(reset_seg_qc=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2596:    bloque_16_tramos_lineas_qc(reset_lineas_qc=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2597:    bloque_17_parametros_globales(reset_parametros=False)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2598:    bloque_18_exportaciones(reset_export=False)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2599:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2600:    limpiar_contents()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2602:    registrar_md(
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2603:        "RUN v1 probado con Bloques 00-18",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2604:        "Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta exportaciones auditables, consolidando el flujo del Modulo 1 desde insumos base hasta productos tabulares externos."
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2605:    )
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_Run_v1.py:2606:


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:11:from datetime import datetime
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:12:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:13:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:14:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:15:# ------------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:16:# CONFIGURACION BASE
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:17:# ------------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:18:GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:19:arcpy.env.workspace = GDB
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:20:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:21:MDT = os.path.join(GDB, "MDT_Fill_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:22:FLOWDIR = os.path.join(GDB, "FlowDir_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:23:FLOWACC = os.path.join(GDB, "FlowAcc_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:24:SLOPE = os.path.join(GDB, "Slope_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:25:STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:26:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:27:# ------------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:28:# SALIDAS VALIDADAS ACTUALES
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:29:# ------------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:30:PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:31:PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:32:CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:33:CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:34:RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:35:RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:36:CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:37:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:38:# ------------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:44:def borrar_si_existe(path):
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:45:    if arcpy.Exists(path):
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:46:        arcpy.management.Delete(path)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:47:        arcpy.AddMessage("BORRADO: " + os.path.basename(path))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:48:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:57:        "clean",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:58:        "stream_lyr",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:59:        "eje_principal_iguana",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:60:        "perfil_puntos_iguana",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:61:        "eje_single",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:62:        "eje_dissolve",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:63:        "tramo_inicial",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:64:        "red_seleccionada"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:80:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:81:    arcpy.AddMessage("=== FEATURE CLASSES ===")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:82:    for fc in arcpy.ListFeatureClasses():
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:83:        arcpy.AddMessage("  [FC] " + fc)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:84:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:97:        SLOPE,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:98:        STREAMNET,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:99:        PC_OBRA,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:100:        PC_SNAP,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:101:        CUENCA_R,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:102:        CUENCA_POLY,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:103:        RED_HIDRICA,
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:104:        RED_Z,
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:105:        CABECERA
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:106:    ]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:107:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:120:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:121:# ------------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:122:# EJECUCION ACTUAL DE CONTROL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:123:# ------------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v1.py:124:if __name__ == "__main__":


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:11:from datetime import datetime
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:12:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:13:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:14:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:15:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:17:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:18:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:19:GDB = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:20:arcpy.env.workspace = GDB
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:21:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:22:NOMBRE = "Iguana"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:23:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:24:# Rasters base
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:25:MDT = os.path.join(GDB, "MDT_Fill_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:26:FLOWDIR = os.path.join(GDB, "FlowDir_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:27:FLOWACC = os.path.join(GDB, "FlowAcc_Base")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:28:SLOPE = os.path.join(GDB, "Slope_Base")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:29:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:30:# Red base
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:31:STREAMNET = os.path.join(GDB, "StreamNet_Strahler_150k")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:32:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:33:# Productos principales
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:34:PC_OBRA = os.path.join(GDB, "PC_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:35:PC_SNAP = os.path.join(GDB, "PC_Snap_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:36:CUENCA_R = os.path.join(GDB, "Cuenca_R_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:37:CUENCA_POLY = os.path.join(GDB, "Cuenca_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:38:RED_HIDRICA = os.path.join(GDB, "Red_Hidrica_Obra_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:39:RED_Z = os.path.join(GDB, "Red_Candidata_Z_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:40:CABECERA = os.path.join(GDB, "Cabecera_Candidata_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:41:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:42:EJE_CONTINUO = os.path.join(GDB, "Eje_Principal_Continuo_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:43:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:44:PERFIL_PTS = os.path.join(GDB, "Perfil_Puntos_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:45:PERFIL_Z = os.path.join(GDB, "Perfil_Puntos_Z_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:46:PERFIL_ZM = os.path.join(GDB, "Perfil_Puntos_ZM_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:47:PERFIL_VAR = os.path.join(GDB, "Perfil_Puntos_VAR_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:48:PERFIL_QC = os.path.join(GDB, "Perfil_Puntos_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:49:PERFIL_QUIEBRES = os.path.join(GDB, "Perfil_Puntos_QUIEBRES_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:50:PERFIL_SEG_QC = os.path.join(GDB, "Perfil_Puntos_SEG_QC_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:51:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:52:PUNTOS_QUIEBRE_QC = os.path.join(GDB, "Puntos_Quiebre_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:53:TRAMOS_QC = os.path.join(GDB, "Tramos_Geomorf_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:54:TRAMOS_LINEAS_QC = os.path.join(GDB, "Tramos_Geomorf_Lineas_QC_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:55:PARAMS = os.path.join(GDB, "Parametros_Geomorf_Iguana")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:56:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:57:EXPORT_TABLAS = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\Exportaciones\Iguana\02_Tablas"
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:58:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:59:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:108:                pass
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:109:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:110:        msg("OK: limpieza visual de temporales ejecutada.")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:111:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:112:    except Exception as e:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:113:        msg("Aviso: limpieza Contents no ejecutada: " + str(e))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:114:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:115:def inventario():
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:119:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:120:    msg("=== FEATURE CLASSES ===")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:121:    for fc in arcpy.ListFeatureClasses():
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:122:        msg("  [FC] " + fc)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:123:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:138:        "LONG_RED_KM",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:139:        "DENS_DREN",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:140:        "Z_SALIDA",
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:141:        "Z_CABECERA",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:142:        "DESNIVEL_M",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:143:        "PEND_MED_PCT",
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:159:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:160:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:161:    total = int(arcpy.management.GetCount(TRAMOS_QC)[0])
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:162:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:163:    long_min = None
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:177:    msg("  Longitud máxima tramo m: " + str(long_max))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:178:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:179:def resumen_exportaciones():
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:180:    if not os.path.exists(EXPORT_TABLAS):
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:181:        msg("No existe carpeta de exportaciones: " + EXPORT_TABLAS)
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:182:        return
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:183:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:184:    archivos = os.listdir(EXPORT_TABLAS)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:185:    xlsx = [a for a in archivos if a.lower().endswith(".xlsx")]
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:186:    csv = [a for a in archivos if a.lower().endswith(".csv")]
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:187:
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:188:    msg("=== RESUMEN EXPORTACIONES ===")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:189:    msg("  Carpeta: " + EXPORT_TABLAS)
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:190:    msg("  XLSX: " + str(len(xlsx)))
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:191:    msg("  CSV: " + str(len(csv)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:192:    msg("  Total archivos: " + str(len(archivos)))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:193:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:194:# ============================================================
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:195:# EJECUCIÓN DE CONTROL
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:196:# ============================================================
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:197:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:201:    msg("HidroFlow Módulo 1 Geomorfología v2")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:202:    msg("Control de estado consolidado")
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:203:    msg("Fecha ejecución: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:204:    msg("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:205:
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:210:        (SLOPE, "Slope_Base"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:211:        (STREAMNET, "StreamNet_Strahler_150k"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:212:        (PC_OBRA, "PC_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:213:        (PC_SNAP, "PC_Snap_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:214:        (CUENCA_R, "Cuenca_R_Obra_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:215:        (CUENCA_POLY, "Cuenca_Obra_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:216:        (RED_HIDRICA, "Red_Hidrica_Obra_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:217:        (RED_Z, "Red_Candidata_Z_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:218:        (CABECERA, "Cabecera_Candidata_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:219:        (EJE_CONTINUO, "Eje_Principal_Continuo_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:220:        (PERFIL_ZM, "Perfil_Puntos_ZM_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:221:        (PERFIL_VAR, "Perfil_Puntos_VAR_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:222:        (PERFIL_QC, "Perfil_Puntos_QC_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:223:        (PERFIL_QUIEBRES, "Perfil_Puntos_QUIEBRES_Iguana"),
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:224:        (PERFIL_SEG_QC, "Perfil_Puntos_SEG_QC_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:225:        (PUNTOS_QUIEBRE_QC, "Puntos_Quiebre_QC_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:226:        (TRAMOS_QC, "Tramos_Geomorf_QC_Iguana"),
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:231:    resumen_parametros()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:232:    resumen_tramos_qc()
> 03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:233:    resumen_exportaciones()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:234:    limpiar_contents()
  03_MODULOS\M01_Geomorfologia\scripts\_activos\HFGeomorfologia_Modulo1_v2.py:235:


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:2:import os
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:3:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:4:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:5:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:6:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:7:# PARÁMETROS (AJUSTA SOLO ESTO)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:8:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:9:gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:10:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:11:# Eje completo del cauce principal (línea) - AJUSTA al nombre real que estés usando como "cauce principal completo"
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:12:eje_fc = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:13:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:14:# Punto(s) de control (tiene duplicado)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:15:pc_fc  = os.path.join(gdb, "GF_Exutorio_In")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:16:pc_where = "ID_PC = 'PC_CR80'"  # clave para evitar el punto duplicado
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:17:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:18:# Superficie para decidir nacimiento por cota (MDT 1m)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:19:mdt_raster = os.path.join(gdb, "MDT_Fill_Base")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:20:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:21:# Cuenca (para nombrar automáticamente) - usa el polígono de cuenca en tu GDB
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:22:cuenca_fc = os.path.join(gdb, "Watersh_Iguana_PC_CR80_Poly")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:23:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:24:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:28:    """Deja un tag corto, sin espacios raros, listo para nombres de FC."""
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:29:    name = os.path.basename(name)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:30:    for t in ["Watersh_", "Watershed_", "_Poly", ".shp", ".gdb"]:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:31:        name = name.replace(t, "")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:32:    name = name.replace(" ", "_").replace("-", "_")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:33:    return name
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:34:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:35:CUENCA_ID = _clean_tag(cuenca_fc)       # ej: Iguana_PC_CR80
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:36:PC_ID = "PC_CR80"
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:37:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:38:out_name = f"EjePrincipal_PC_a_Nacimiento_{CUENCA_ID}_{PC_ID}"
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:39:out_fc = os.path.join(gdb, out_name)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:40:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:41:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:42:# LECTURA GEOMETRÍAS
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:43:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:44:sr = arcpy.Describe(eje_fc).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:45:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:46:with arcpy.da.SearchCursor(eje_fc, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:47:    row = next(cur, None)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:48:    if not row:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:49:        raise RuntimeError(f"No hay geometría en {eje_fc}")
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:50:    eje = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:51:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:52:pc_geom = None
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:58:    raise RuntimeError(f"No encontré el PC con {pc_where} en {pc_fc}")
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:59:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:60:# Snap del PC a la línea
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:61:pc_snap = eje.snapToLine(pc_geom)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:62:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:63:# Distancia del PC medida desde el inicio del eje (según orientación del eje)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:64:m_pc = eje.measureOnLine(pc_snap)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:65:L_total = eje.length
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:66:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:67:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:70:# 2) Fallback: por posición (si PC está más cerca del final, el inicio es nacimiento)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:71:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:72:p_ini = arcpy.PointGeometry(eje.firstPoint, sr)
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:73:p_fin = arcpy.PointGeometry(eje.lastPoint, sr)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:74:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:75:nacimiento_es_inicio = None
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:82:    x2, y2 = p_fin.centroid.X, p_fin.centroid.Y
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:83:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:84:    z1 = float(arcpy.management.GetCellValue(mdt_raster, f"{x1} {y1}").getOutput(0))
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:85:    z2 = float(arcpy.management.GetCellValue(mdt_raster, f"{x2} {y2}").getOutput(0))
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:86:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:87:    nacimiento_es_inicio = (z1 >= z2)  # más alto = nacimiento
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:97:if nacimiento_es_inicio:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:98:    # nacimiento = inicio; segmento desde inicio hasta PC
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:99:    seg_pc_nac = eje.segmentAlongLine(0, m_pc, use_percentage=False)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:100:    long_pc_nac = seg_pc_nac.length
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:101:else:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:102:    # nacimiento = final; segmento desde PC hasta final
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:103:    seg_pc_nac = eje.segmentAlongLine(m_pc, L_total, use_percentage=False)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:104:    long_pc_nac = seg_pc_nac.length
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:105:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:106:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:107:# SALIDA (feature class)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:108:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:109:if arcpy.Exists(out_fc):
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:110:    arcpy.management.Delete(out_fc)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:111:
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:112:arcpy.management.CopyFeatures(seg_pc_nac, out_fc)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:113:
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:114:print("✅ Segmento PC→Nacimiento generado:")
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:115:print(out_fc)
  03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:116:print(f"📏 Longitud PC→Nacimiento: {long_pc_nac:.2f} m  ({long_pc_nac/1000.0:.3f} km)")
> 03_MODULOS\M01_Geomorfologia\scripts\EjePrincipal_PC_a_Nacimiento.py:117:print(f"ℹ️ CUENCA_ID={CUENCA_ID} | PC_ID={PC_ID} | nacimiento_es_inicio={nacimiento_es_inicio}")


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:2:import os
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:3:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:4:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:5:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:6:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:7:# PARÁMETROS (SOLO EDITA AQUÍ)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:8:# ==========================================================
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:9:gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:10:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:11:streams_fc   = os.path.join(gdb, "StreamNet_Strahler_150k_Iguana")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:12:pc_fc        = os.path.join(gdb, "GF_Exutorio_In")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:13:dem_raster   = os.path.join(gdb, "MDT_Fill_Base")  # DEM coherente con hidrología
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:14:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:15:campo_from = "from_node"
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:18:distancia_aguas_arriba = 450.0  # m
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:19:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:20:out_eje_pc  = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:21:out_eje_geo = os.path.join(gdb, f"Eje_Geomorfologico_{int(distancia_aguas_arriba)}m")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:22:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:23:# tolerancias para decidir "SIN CAMBIOS"
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:25:tol_end = 0.05   # metros (distancia entre endpoints)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:26:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:27:scratch = arcpy.env.scratchGDB
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:28:tmp_paths = []  # para borrar todo al final
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:29:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:33:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:34:def _unique(name):
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:35:    p = os.path.join(scratch, name)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:36:    u = arcpy.CreateUniqueName(p, scratch)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:37:    tmp_paths.append(u)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:38:    return u
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:60:    return (d1 <= tol_end and d2 <= tol_end)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:61:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:62:def _write_single_polyline(out_fc, geom, sr):
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:63:    # Si existe, lo reemplaza
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:64:    if arcpy.Exists(out_fc):
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:65:        arcpy.management.Delete(out_fc)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:66:    arcpy.management.CreateFeatureclass(os.path.dirname(out_fc), os.path.basename(out_fc), "POLYLINE", spatial_reference=sr)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:67:    with arcpy.da.InsertCursor(out_fc, ["SHAPE@"]) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:68:        ic.insertRow([geom])
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:69:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:76:    p1, p2 = g.firstPoint, g.lastPoint
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:77:    pts_fc = _unique("tmp_extremos")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:78:    arcpy.management.CreateFeatureclass(scratch, os.path.basename(pts_fc), "POINT", spatial_reference=sr)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:79:    with arcpy.da.InsertCursor(pts_fc, ["SHAPE@"]) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:80:        ic.insertRow([arcpy.PointGeometry(p1, sr)])
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:132:    oid_field = arcpy.Describe(streams_fc).OIDFieldName
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:133:    lyr = "lyr_streams_sel"
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:134:    arcpy.management.MakeFeatureLayer(streams_fc, lyr)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:135:    arcpy.management.SelectLayerByAttribute(lyr, "NEW_SELECTION", f"{oid_field} IN ({','.join(map(str, oids))})")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:136:    out_tmp = _unique("tmp_ruta_disuelta")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:137:    arcpy.management.Dissolve(lyr, out_tmp)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:138:    return out_tmp
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:139:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:140:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:141:# ==========================================================
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:142:# EJECUCIÓN (LIMPIA)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:143:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:144:try:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:156:    # 2) Near para hallar segmento cercano al PC
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:157:    tmp_pc = _unique("tmp_pc")
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:158:    arcpy.management.CreateFeatureclass(scratch, os.path.basename(tmp_pc), "POINT", spatial_reference=sr)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:159:    with arcpy.da.InsertCursor(tmp_pc, ["SHAPE@"]) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:160:        ic.insertRow([arcpy.PointGeometry(pc_pt, sr)])
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:184:    ruta_geom = _get_first_geom(ruta_fc)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:185:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:186:    # 6) Eje completo Nacimiento → PC (geométrico)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:187:    # Asegurar PC sobre la línea
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:188:    pc_geom_on = ruta_geom.snapToLine(pc_geom)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:189:    dist_pc = ruta_geom.measureOnLine(pc_geom_on)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:190:    eje_pc_geom = ruta_geom.segmentAlongLine(0, dist_pc, use_percentage=False)  # [2](https://community.esri.com/t5/python-questions/arcpy-segmentalongline-full-syntax/td-p/582843)[3](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:191:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:192:    # Comparar con existente (si existe) y decidir
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:193:    eje_pc_old = _get_first_geom(out_eje_pc) if arcpy.Exists(out_eje_pc) else None
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:194:    if _same_geom(eje_pc_geom, eje_pc_old):
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:195:        arcpy.AddMessage("🟡 EjePrincipal: SIN CAMBIOS (no se sobreescribe).")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:196:    else:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:197:        _write_single_polyline(out_eje_pc, eje_pc_geom, sr)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:198:        arcpy.AddMessage(f"✅ EjePrincipal actualizado: {out_eje_pc}")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:199:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:200:    # 7) Eje geomorfológico Nacimiento → (PC - X)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:201:    dist_fin = dist_pc - float(distancia_aguas_arriba)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:202:    if dist_fin <= 0:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:203:        raise RuntimeError(f"No se puede recortar {distancia_aguas_arriba} m: dist_pc={dist_pc:.2f} m")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:204:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:205:    eje_geo_geom = ruta_geom.segmentAlongLine(0, dist_fin, use_percentage=False)  # [2](https://community.esri.com/t5/python-questions/arcpy-segmentalongline-full-syntax/td-p/582843)[3](https://gis.stackexchange.com/questions/427127/use-m-value-with-polyline-segmentalongline)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:206:    eje_geo_old = _get_first_geom(out_eje_geo) if arcpy.Exists(out_eje_geo) else None
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:207:    if _same_geom(eje_geo_geom, eje_geo_old):
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:208:        arcpy.AddMessage("🟡 Eje_Geomorfologico: SIN CAMBIOS (no se sobreescribe).")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:209:    else:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:210:        _write_single_polyline(out_eje_geo, eje_geo_geom, sr)
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:211:        arcpy.AddMessage(f"✅ Eje geomorfológico actualizado: {out_eje_geo}")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:212:
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:213:    arcpy.AddMessage(f"📏 dist_pc sobre eje: {dist_pc:.2f} m | recorte: {distancia_aguas_arriba:.2f} m")
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:214:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:215:finally:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:218:        try:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:219:            if arcpy.Exists(p):
> 03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:220:                arcpy.management.Delete(p)
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:221:        except Exception:
  03_MODULOS\M01_Geomorfologia\scripts\HF_generar_eje_principal_y_geo_LIMPIO.py:222:            pass


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:1:# ==========================================================
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:2:# HIDROFLOW - PERFIL LONGITUDINAL CONTINUO v2 (DEFINITIVO)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:3:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:4:# Autor: AMVA - HidroFlow
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:5:# Fecha: Mayo 2026
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:6:# Incluye: eje continuo, perfil, variables, quiebres,
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:7:# segmentacion y clasificacion hidrologica
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:8:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:12:import math
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:13:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:14:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:15:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:16:# ----------------------------------------------------------
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:19:MDT = arcpy.GetParameterAsText(0)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:20:StreamNet = arcpy.GetParameterAsText(1)
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:21:Eje_base = arcpy.GetParameterAsText(2)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:22:Punto_control = arcpy.GetParameterAsText(3)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:23:Dist = float(arcpy.GetParameterAsText(4))
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:24:GDB = arcpy.GetParameterAsText(5)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:25:Sufijo = arcpy.GetParameterAsText(6)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:26:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:27:# ----------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:28:# RUTAS DE SALIDA
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:29:# ----------------------------------------------------------
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:30:Eje_final = os.path.join(GDB, "Eje_Continuo_" + Sufijo)
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:31:Pts_final = os.path.join(GDB, "PerfilPts_Continuo_" + Sufijo)
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:32:Tabla_tramos = os.path.join(GDB, "Tramos_Geomorf_" + Sufijo)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:33:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:34:# ==========================================================
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:35:# 1-2. VERIFICAR EJE CONTINUO
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:36:# ==========================================================
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:37:arcpy.AddMessage("1-2. Verificando eje continuo...")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:38:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:39:arcpy.management.CopyFeatures(Eje_base, Eje_final)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:40:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:41:es_multipart = False
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:42:with arcpy.da.SearchCursor(Eje_final, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:43:    for row in cur:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:44:        if row[0].isMultipart:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:46:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:47:if es_multipart:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:48:    arcpy.AddMessage("   Eje multipart detectado. Extrayendo parte principal...")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:49:    Single_temp = os.path.join("in_memory", "single_temp")
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:50:    arcpy.management.MultipartToSinglepart(Eje_final, Single_temp)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:51:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:52:    max_len = 0
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:58:                max_oid = row[0]
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:59:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:60:    arcpy.management.MakeFeatureLayer(Single_temp, "single_lyr")
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:61:    arcpy.management.SelectLayerByAttribute(
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:62:        "single_lyr", "NEW_SELECTION",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:63:        "OBJECTID = " + str(max_oid)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:64:    )
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:65:    arcpy.management.CopyFeatures("single_lyr", Eje_final)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:66:    arcpy.AddMessage("   Parte principal: " + str(round(max_len, 2)) + " m")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:67:else:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:68:    arcpy.AddMessage("   Eje ya es continuo (una sola parte).")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:69:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:70:# ==========================================================
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:74:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:75:Pts_temp = os.path.join("in_memory", "pts_temp")
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:76:arcpy.management.GeneratePointsAlongLines(
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:77:    Eje_final, Pts_temp, "DISTANCE", Distance=Dist
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:78:)
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:79:arcpy.management.CopyFeatures(Pts_temp, Pts_final)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:80:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:81:n_pts = int(arcpy.management.GetCount(Pts_final).getOutput(0))
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:82:arcpy.AddMessage("   Puntos generados: " + str(n_pts))
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:83:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:95:arcpy.AddMessage("5. Calculando progresiva MEAS...")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:96:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:97:arcpy.management.AddField(Pts_final, "MEAS", "DOUBLE")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:98:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:99:puntos = []
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:125:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:126:for f in ["DZ", "DM", "Pend_pct", "DPEND"]:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:127:    arcpy.management.AddField(Pts_final, f, "DOUBLE")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:128:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:129:data = []
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:170:for f in [("FLAG_DPEND", "SHORT"), ("PERSIST3", "SHORT"),
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:171:          ("QUIEBRE", "SHORT"), ("ID_TRAMO", "LONG")]:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:172:    arcpy.management.AddField(Pts_final, f[0], f[1])
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:173:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:174:arcpy.management.CalculateField(
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:175:    Pts_final, "FLAG_DPEND",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:176:    "1 if !DPEND! is not None and abs(!DPEND!) >= 2 else 0",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:178:)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:179:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:180:arcpy.management.CalculateField(Pts_final, "PERSIST3", "0", "PYTHON3")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:181:
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:182:rows = []
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:204:        i += 1
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:205:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:206:arcpy.management.CalculateField(
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:207:    Pts_final, "QUIEBRE",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:208:    "1 if !PERSIST3! == 1 else 0", "PYTHON3"
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:253:)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:254:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:255:arcpy.management.AddField(Tabla_tramos, "LONG_TRAMO_M", "DOUBLE")
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:256:arcpy.management.CalculateField(
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:257:    Tabla_tramos, "LONG_TRAMO_M",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:258:    "!MAX_MEAS! - !MIN_MEAS!", "PYTHON3"
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:259:)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:260:
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:261:arcpy.management.AddField(Tabla_tramos, "CLASE_HIDRO", "TEXT", field_length=30)
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:262:arcpy.management.CalculateField(
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:263:    Tabla_tramos, "CLASE_HIDRO",
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:264:    '"Respuesta_Rapida" if abs(!MEAN_Pend_pct!) >= 10 else ("Respuesta_Media" if abs(!MEAN_Pend_pct!) >= 5 else "Respuesta_Lenta")',
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:273:arcpy.AddMessage("========================================")
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:274:arcpy.AddMessage("SCRIPT HIDROFLOW v2 COMPLETADO")
> 03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:275:arcpy.AddMessage("Eje: " + Eje_final)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:276:arcpy.AddMessage("Puntos: " + Pts_final)
  03_MODULOS\M01_Geomorfologia\scripts\HFPerfilLongitudinalv1.py:277:arcpy.AddMessage("Tramos: " + Tabla_tramos)


## Script: D:\HidroFlow\03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py

### Coincidencias de rutas, GDB, exportación y geometría

  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:2:import os
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:3:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:4:arcpy.env.overwriteOutput = True
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:5:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:6:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:7:# PARÁMETROS
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:8:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:9:gdb = r"D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb"
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:10:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:11:eje_fc = os.path.join(gdb, "EjePrincipal_Iguana_Nacimiento_PC80")
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:12:pc_fc  = os.path.join(gdb, "GF_Exutorio_In")
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:13:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:14:distancia_aguas_arriba = 450.0  # metros
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:15:out_fc = os.path.join(gdb, "Eje_Geomorfologico_450m")
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:16:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:17:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:18:# LECTURA
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:19:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:20:sr = arcpy.Describe(eje_fc).spatialReference
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:21:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:22:with arcpy.da.SearchCursor(eje_fc, ["SHAPE@"]) as cur:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:23:    eje_geom = next(cur)[0]
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:24:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:25:with arcpy.da.SearchCursor(pc_fc, ["SHAPE@"]) as cur:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:26:    pc_geom = next(cur)[0]
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:27:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:28:# Asegurar que el PC esté sobre el eje
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:29:pc_geom = eje_geom.snapToLine(pc_geom)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:30:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:31:# ===============================
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:32:# MEDICIÓN Y RECORTE
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:33:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:34:dist_pc = eje_geom.measureOnLine(pc_geom)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:35:dist_fin = dist_pc - distancia_aguas_arriba
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:36:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:41:    )
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:42:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:43:geom_final = eje_geom.segmentAlongLine(
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:44:    0, dist_fin, use_percentage=False
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:45:)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:46:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:47:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:48:# SALIDA
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:49:# ===============================
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:50:if arcpy.Exists(out_fc):
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:51:    arcpy.management.Delete(out_fc)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:52:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:53:arcpy.management.CreateFeatureclass(
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:54:    os.path.dirname(out_fc),
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:55:    os.path.basename(out_fc),
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:56:    "POLYLINE",
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:57:    spatial_reference=sr
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:58:)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:59:
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:60:with arcpy.da.InsertCursor(out_fc, ["SHAPE@"]) as ic:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:61:    ic.insertRow([geom_final])
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:62:
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:63:print("✅ Recorte geomorfológico generado correctamente")
> 03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:64:print(out_fc)
  03_MODULOS\M01_Geomorfologia\scripts\recorte_geomorfologico.py:65:print(f"📏 Longitud: {geom_final.length:.2f} m")


