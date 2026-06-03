# ==========================================================
# HIDROFLOW - PERFIL LONGITUDINAL CONTINUO v2 (DEFINITIVO)
# ==========================================================
# Autor: AMVA - HidroFlow
# Fecha: Mayo 2026
# Incluye: eje continuo, perfil, variables, quiebres,
# segmentacion y clasificacion hidrologica
# ==========================================================

import arcpy
import os
import math

arcpy.env.overwriteOutput = True

# ----------------------------------------------------------
# PARAMETROS
# ----------------------------------------------------------
MDT = arcpy.GetParameterAsText(0)
StreamNet = arcpy.GetParameterAsText(1)
Eje_base = arcpy.GetParameterAsText(2)
Punto_control = arcpy.GetParameterAsText(3)
Dist = float(arcpy.GetParameterAsText(4))
GDB = arcpy.GetParameterAsText(5)
Sufijo = arcpy.GetParameterAsText(6)

# ----------------------------------------------------------
# RUTAS DE SALIDA
# ----------------------------------------------------------
Eje_final = os.path.join(GDB, "Eje_Continuo_" + Sufijo)
Pts_final = os.path.join(GDB, "PerfilPts_Continuo_" + Sufijo)
Tabla_tramos = os.path.join(GDB, "Tramos_Geomorf_" + Sufijo)

# ==========================================================
# 1-2. VERIFICAR EJE CONTINUO
# ==========================================================
arcpy.AddMessage("1-2. Verificando eje continuo...")

arcpy.management.CopyFeatures(Eje_base, Eje_final)

es_multipart = False
with arcpy.da.SearchCursor(Eje_final, ["SHAPE@"]) as cur:
    for row in cur:
        if row[0].isMultipart:
            es_multipart = True

if es_multipart:
    arcpy.AddMessage("   Eje multipart detectado. Extrayendo parte principal...")
    Single_temp = os.path.join("in_memory", "single_temp")
    arcpy.management.MultipartToSinglepart(Eje_final, Single_temp)

    max_len = 0
    max_oid = None
    with arcpy.da.SearchCursor(Single_temp, ["OID@", "SHAPE@LENGTH"]) as cur:
        for row in cur:
            if row[1] > max_len:
                max_len = row[1]
                max_oid = row[0]

    arcpy.management.MakeFeatureLayer(Single_temp, "single_lyr")
    arcpy.management.SelectLayerByAttribute(
        "single_lyr", "NEW_SELECTION",
        "OBJECTID = " + str(max_oid)
    )
    arcpy.management.CopyFeatures("single_lyr", Eje_final)
    arcpy.AddMessage("   Parte principal: " + str(round(max_len, 2)) + " m")
else:
    arcpy.AddMessage("   Eje ya es continuo (una sola parte).")

# ==========================================================
# 3. GENERACION DE PUNTOS
# ==========================================================
arcpy.AddMessage("3. Generando puntos cada " + str(Dist) + " m...")

Pts_temp = os.path.join("in_memory", "pts_temp")
arcpy.management.GeneratePointsAlongLines(
    Eje_final, Pts_temp, "DISTANCE", Distance=Dist
)
arcpy.management.CopyFeatures(Pts_temp, Pts_final)

n_pts = int(arcpy.management.GetCount(Pts_final).getOutput(0))
arcpy.AddMessage("   Puntos generados: " + str(n_pts))

# ==========================================================
# 4. EXTRACCION DE Z
# ==========================================================
arcpy.AddMessage("4. Extrayendo elevaciones del MDT...")

arcpy.ddd.AddSurfaceInformation(Pts_final, MDT, "Z", "BILINEAR")
arcpy.AddMessage("   Elevaciones extraidas correctamente.")

# ==========================================================
# 5. CALCULO DE MEAS
# ==========================================================
arcpy.AddMessage("5. Calculando progresiva MEAS...")

arcpy.management.AddField(Pts_final, "MEAS", "DOUBLE")

puntos = []
with arcpy.da.SearchCursor(Pts_final, ["OID@", "SHAPE@XY"]) as cur:
    for row in cur:
        puntos.append((row[0], row[1][0], row[1][1]))

meas_vals = {}
meas_acum = 0.0

for i in range(len(puntos)):
    if i > 0:
        dx = puntos[i][1] - puntos[i-1][1]
        dy = puntos[i][2] - puntos[i-1][2]
        meas_acum += math.sqrt(dx**2 + dy**2)
    meas_vals[puntos[i][0]] = meas_acum

with arcpy.da.UpdateCursor(Pts_final, ["OID@", "MEAS"]) as cur:
    for row in cur:
        row[1] = meas_vals[row[0]]
        cur.updateRow(row)

arcpy.AddMessage("   MEAS max = " + str(round(meas_acum, 2)) + " m")

# ==========================================================
# 6. VARIABLES DERIVADAS
# ==========================================================
arcpy.AddMessage("6. Calculando variables derivadas...")

for f in ["DZ", "DM", "Pend_pct", "DPEND"]:
    arcpy.management.AddField(Pts_final, f, "DOUBLE")

data = []
with arcpy.da.SearchCursor(
    Pts_final, ["MEAS", "Z"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    for row in cur:
        data.append(list(row))

results = []
for i in range(len(data)):
    if i == 0:
        results.append([None, None, None, None])
    else:
        dz = data[i][1] - data[i-1][1]
        dm = data[i][0] - data[i-1][0]
        pend = (dz / dm) * 100 if dm != 0 else 0
        dpend = None
        if i > 1 and results[i-1][2] is not None:
            dpend = pend - results[i-1][2]
        results.append([dz, dm, pend, dpend])

with arcpy.da.UpdateCursor(
    Pts_final, ["DZ", "DM", "Pend_pct", "DPEND"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    i = 0
    for row in cur:
        row[0] = results[i][0]
        row[1] = results[i][1]
        row[2] = results[i][2]
        row[3] = results[i][3]
        cur.updateRow(row)
        i += 1

arcpy.AddMessage("   Variables derivadas calculadas.")

# ==========================================================
# 7. QUIEBRES GEOMORFOLOGICOS
# ==========================================================
arcpy.AddMessage("7. Calculando quiebres geomorfologicos...")

for f in [("FLAG_DPEND", "SHORT"), ("PERSIST3", "SHORT"),
          ("QUIEBRE", "SHORT"), ("ID_TRAMO", "LONG")]:
    arcpy.management.AddField(Pts_final, f[0], f[1])

arcpy.management.CalculateField(
    Pts_final, "FLAG_DPEND",
    "1 if !DPEND! is not None and abs(!DPEND!) >= 2 else 0",
    "PYTHON3"
)

arcpy.management.CalculateField(Pts_final, "PERSIST3", "0", "PYTHON3")

rows = []
with arcpy.da.SearchCursor(
    Pts_final, ["MEAS", "FLAG_DPEND", "PERSIST3"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    for r in cur:
        rows.append(list(r))

for i in range(2, len(rows)):
    if rows[i][1] == 1 and rows[i-1][1] == 1 and rows[i-2][1] == 1:
        rows[i][2] = 1
        rows[i-1][2] = 1
        rows[i-2][2] = 1

with arcpy.da.UpdateCursor(
    Pts_final, ["MEAS", "FLAG_DPEND", "PERSIST3"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    i = 0
    for row in cur:
        row[2] = rows[i][2]
        cur.updateRow(row)
        i += 1

arcpy.management.CalculateField(
    Pts_final, "QUIEBRE",
    "1 if !PERSIST3! == 1 else 0", "PYTHON3"
)

arcpy.AddMessage("   Quiebres identificados.")

# ==========================================================
# 8. SEGMENTACION EN TRAMOS
# ==========================================================
arcpy.AddMessage("8. Segmentando en tramos...")

rows = []
with arcpy.da.SearchCursor(
    Pts_final, ["MEAS", "QUIEBRE", "ID_TRAMO"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    for r in cur:
        rows.append(list(r))

tramo = 1
for i in range(len(rows)):
    if i > 0 and rows[i][1] == 1:
        tramo += 1
    rows[i][2] = tramo

with arcpy.da.UpdateCursor(
    Pts_final, ["MEAS", "QUIEBRE", "ID_TRAMO"],
    sql_clause=(None, "ORDER BY MEAS ASC")
) as cur:
    i = 0
    for row in cur:
        row[2] = rows[i][2]
        cur.updateRow(row)
        i += 1

arcpy.AddMessage("   Total tramos: " + str(tramo))

# ==========================================================
# 9. SUMMARY STATISTICS + CLASIFICACION
# ==========================================================
arcpy.AddMessage("9. Generando tabla resumen...")

arcpy.analysis.Statistics(
    Pts_final, Tabla_tramos,
    [["Pend_pct", "MEAN"], ["MEAS", "MIN"], ["MEAS", "MAX"]],
    "ID_TRAMO"
)

arcpy.management.AddField(Tabla_tramos, "LONG_TRAMO_M", "DOUBLE")
arcpy.management.CalculateField(
    Tabla_tramos, "LONG_TRAMO_M",
    "!MAX_MEAS! - !MIN_MEAS!", "PYTHON3"
)

arcpy.management.AddField(Tabla_tramos, "CLASE_HIDRO", "TEXT", field_length=30)
arcpy.management.CalculateField(
    Tabla_tramos, "CLASE_HIDRO",
    '"Respuesta_Rapida" if abs(!MEAN_Pend_pct!) >= 10 else ("Respuesta_Media" if abs(!MEAN_Pend_pct!) >= 5 else "Respuesta_Lenta")',
    "PYTHON3"
)

arcpy.AddMessage("   Clasificacion hidrologica completada.")

# ==========================================================
# 10. CIERRE
# ==========================================================
arcpy.AddMessage("========================================")
arcpy.AddMessage("SCRIPT HIDROFLOW v2 COMPLETADO")
arcpy.AddMessage("Eje: " + Eje_final)
arcpy.AddMessage("Puntos: " + Pts_final)
arcpy.AddMessage("Tramos: " + Tabla_tramos)
arcpy.AddMessage("Total puntos: " + str(n_pts))
arcpy.AddMessage("Total tramos: " + str(tramo))
arcpy.AddMessage("MEAS max: " + str(round(meas_acum, 2)) + " m")
arcpy.AddMessage("========================================")