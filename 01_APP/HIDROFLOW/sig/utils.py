from pathlib import Path

# Ruta base del proyecto HIDROFLOW
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Directorios de datos
DATA_DIR = PROJECT_ROOT / "data"
DEM_DIR = DATA_DIR / "dem"

# Modelos de elevación
MDT_PATH = DEM_DIR / "MDT_2024.tif"
MDS_PATH = DEM_DIR / "MDS_2024.tif"
