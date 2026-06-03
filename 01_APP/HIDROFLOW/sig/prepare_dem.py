# sig/prepare_dem.py

import arcpy
from arcpy import env
from arcpy.sa import *
from pathlib import Path


# -------------------------------------------------------------------
# 1. Configuración de rutas (PORTABLES)
# -------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATA_DIR = PROJECT_ROOT / "data"
DEM_DIR = DATA_DIR / "dem"
OUT_DIR = DEM_DIR / "processed"

OUT_DIR.mkdir(exist_ok=True)

MDT_PATH = DEM_DIR / "MDT_2024_MEDELLIN.tif"

DEM_FILL = OUT_DIR / "MDT_2024_MEDELLIN_FILL.tif"
FLOW_DIR = OUT_DIR / "MDT_2024_MEDELLIN_FLOWDIR.tif"
FLOW_ACC = OUT_DIR / "MDT_2024_MEDELLIN_FLOWACC.tif"


# -------------------------------------------------------------------
# 2. Configuración ArcPy
# -------------------------------------------------------------------

env.workspace = str(OUT_DIR)
env.overwriteOutput = True

arcpy.CheckOutExtension("Spatial")


# -------------------------------------------------------------------
# 3. Proceso SIG GLOBAL (UNA SOLA VEZ)
# -------------------------------------------------------------------

print(">>> Preparación DEM hidrológico global")

# A. Fill (relleno de sumideros)
print(" - Ejecutando Fill (sinks)...")
dem_filled = Fill(str(MDT_PATH))
dem_filled.save(str(DEM_FILL))

# B. Flow Direction (D8)
print(" - Calculando Flow Direction (D8)...")
flow_dir = FlowDirection(dem_filled, "D8")
flow_dir.save(str(FLOW_DIR))

# C. Flow Accumulation
print(" - Calculando Flow Accumulation...")
flow_acc = FlowAccumulation(flow_dir)
flow_acc.save(str(FLOW_ACC))


# -------------------------------------------------------------------
# 4. Verificación básica
# -------------------------------------------------------------------

print(">>> Verificación espacial")

desc = arcpy.Describe(str(DEM_FILL))

print(f"Sistema de referencia  : {desc.spatialReference.name}")
print(f"Extensión DEM corregido : {desc.extent}")
print(f"Tamaño celda           : {desc.meanCellWidth}")

print(">>> DEM hidrológico global preparado correctamente")