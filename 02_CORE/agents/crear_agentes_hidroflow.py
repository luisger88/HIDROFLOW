# -*- coding: utf-8 -*-
# ============================================================
# crear_agentes_hidroflow.py
# HidroFlow - Creacion base de agentes tecnicos
# ============================================================

from pathlib import Path
from datetime import datetime

agents_dir = Path(r"D:\HIDROFLOW\02_CORE\agents")
agents_dir.mkdir(parents=True, exist_ok=True)

fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# ============================================================
# __init__.py
# ============================================================

(agents_dir / "__init__.py").write_text(
    "# -*- coding: utf-8 -*-\n# Paquete de agentes tecnicos HidroFlow\n",
    encoding="utf-8"
)

# ============================================================
# README_AGENTS_HIDROFLOW.md
# ============================================================

(agents_dir / "README_AGENTS_HIDROFLOW.md").write_text(
f"""# Agentes tecnicos HidroFlow

Fecha de creacion: {fecha}

## Objetivo

Esta carpeta contiene agentes tecnicos para controlar, validar y evolucionar HidroFlow.

Los agentes no reemplazan el flujo operativo actual. Su funcion inicial es documentar, validar, comparar y preparar la transicion controlada entre motores.

## Agentes iniciales

1. Agente Open Geo Engine
2. Agente Comparador QA/QC
3. Agente Configuracion HidroFlow
4. Agente Limpieza y Trazabilidad

## Regla de arquitectura

El motor ArcPy sigue siendo el motor oficial validado.

El motor OpenGeo solo podra reemplazar bloques despues de una comparacion tecnica documentada contra ArcPy.

## Estado actual

Carpeta creada en:

D:\\HIDROFLOW\\02_CORE\\agents

Esta etapa solo crea estructura base. No modifica Run_v1, no modifica GDB, no modifica toolbox.
""",
    encoding="utf-8"
)

# ============================================================
# agent_opengeo_engine.py
# ============================================================

(agents_dir / "agent_opengeo_engine.py").write_text(
'''# -*- coding: utf-8 -*-
# ============================================================
# agent_opengeo_engine.py
# HidroFlow - Agente Open Geo Engine
# ============================================================

from datetime import datetime


class AgenteOpenGeoEngine:
    def __init__(self):
        self.nombre = "Agente Open Geo Engine"
        self.estado = "diseno_inicial"
        self.librerias_candidatas = [
            "rasterio",
            "geopandas",
            "shapely",
            "pyproj",
            "pandas",
            "networkx",
            "pyflwdir",
            "whitebox"
        ]

        self.bloques_criticos = [
            "Snap geometrico controlado",
            "Watershed y cuenca",
            "RasterToPolygon",
            "Red hidrica recortada",
            "Extraccion Z",
            "Grafo topologico",
            "Perfil longitudinal",
            "Segmentacion QC",
            "Parametros geomorfologicos"
        ]

    def resumen(self):
        print("========================================")
        print(self.nombre)
        print("Estado:", self.estado)
        print("Fecha:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print("----------------------------------------")
        print("Librerias candidatas:")
        for lib in self.librerias_candidatas:
            print(" -", lib)
        print("----------------------------------------")
        print("Bloques criticos:")
        for b in self.bloques_criticos:
            print(" -", b)
        print("========================================")

    def equivalencias_preliminares(self):
        return {
            "FeatureClass": "GeoDataFrame / GeoPackage",
            "Raster": "rasterio Dataset",
            "ExtractValuesToPoints": "rasterio.sample",
            "RasterToPolygon": "rasterio.features.shapes",
            "Clip": "geopandas.clip / shapely intersection",
            "Dissolve": "geopandas.dissolve",
            "Grafo topologico": "networkx",
            "Watershed": "pyflwdir / whitebox",
            "TableToExcel": "pandas.to_excel",
            "TableToCSV": "pandas.to_csv"
        }


if __name__ == "__main__":
    agente = AgenteOpenGeoEngine()
    agente.resumen()

    print("Equivalencias preliminares:")
    for k, v in agente.equivalencias_preliminares().items():
        print(k, "->", v)
''',
    encoding="utf-8"
)

# ============================================================
# agent_qa_qc_comparator.py
# ============================================================

(agents_dir / "agent_qa_qc_comparator.py").write_text(
'''# -*- coding: utf-8 -*-
# ============================================================
# agent_qa_qc_comparator.py
# HidroFlow - Agente Comparador QA/QC
# ============================================================

from datetime import datetime


class AgenteQAQCComparador:
    def __init__(self):
        self.nombre = "Agente Comparador QA/QC"
        self.estado = "diseno_inicial"

        self.productos_referencia = [
            "PC_Snap_Obra_Iguana",
            "Cuenca_Obra_Iguana",
            "Red_Hidrica_Obra_Iguana",
            "Eje_Principal_Continuo_Iguana",
            "Perfil_Puntos_SEG_QC_Iguana",
            "Tramos_Geomorf_QC_Iguana",
            "Tramos_Geomorf_Lineas_QC_Iguana",
            "Parametros_Geomorf_Iguana"
        ]

        self.metricas_comparacion = [
            "area_cuenca",
            "perimetro_cuenca",
            "longitud_cauce",
            "longitud_red",
            "z_salida",
            "z_cabecera",
            "desnivel",
            "pendiente_media",
            "numero_quiebres_qc",
            "numero_tramos_qc"
        ]

    def resumen(self):
        print("========================================")
        print(self.nombre)
        print("Estado:", self.estado)
        print("Fecha:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print("----------------------------------------")
        print("Productos de referencia:")
        for p in self.productos_referencia:
            print(" -", p)
        print("----------------------------------------")
        print("Metricas de comparacion:")
        for m in self.metricas_comparacion:
            print(" -", m)
        print("========================================")


if __name__ == "__main__":
    agente = AgenteQAQCComparador()
    agente.resumen()
''',
    encoding="utf-8"
)

# ============================================================
# agent_configuracion_hidroflow.py
# ============================================================

(agents_dir / "agent_configuracion_hidroflow.py").write_text(
'''# -*- coding: utf-8 -*-
# ============================================================
# agent_configuracion_hidroflow.py
# HidroFlow - Agente Configuracion
# ============================================================

import sys
from pathlib import Path

CONFIG_DIR = Path(r"D:\\HIDROFLOW\\02_CORE\\config")
sys.path.append(str(CONFIG_DIR))

from hidroflow_config import cargar_config


class AgenteConfiguracionHidroFlow:
    def __init__(self):
        self.nombre = "Agente Configuracion HidroFlow"
        self.config = cargar_config()

    def validar_claves_basicas(self):
        claves = [
            "raiz_hidroflow",
            "gdb_oficial_actual",
            "modulo1_run_actual",
            "modulo1_run_nuevo",
            "toolbox_nueva_sugerida"
        ]

        print("========================================")
        print(self.nombre)
        print("Validacion de claves basicas")
        print("----------------------------------------")

        for clave in claves:
            valor = self.config.get(clave)
            existe = Path(valor).exists() if valor else False
            print(clave, "->", valor, "| existe:", existe)

        print("========================================")


if __name__ == "__main__":
    agente = AgenteConfiguracionHidroFlow()
    agente.validar_claves_basicas()
''',
    encoding="utf-8"
)

# ============================================================
# agent_limpieza_trazabilidad.py
# ============================================================

(agents_dir / "agent_limpieza_trazabilidad.py").write_text(
'''# -*- coding: utf-8 -*-
# ============================================================
# agent_limpieza_trazabilidad.py
# HidroFlow - Agente Limpieza y Trazabilidad
# ============================================================

class AgenteLimpiezaTrazabilidad:
    def __init__(self):
        self.nombre = "Agente Limpieza y Trazabilidad"

        self.productos_protegidos_modulo1 = [
            "PC_Obra_Iguana",
            "PC_Snap_Obra_Iguana",
            "Cuenca_R_Obra_Iguana",
            "Cuenca_Obra_Iguana",
            "Red_Hidrica_Obra_Iguana",
            "Red_Candidata_Z_Iguana",
            "Cabecera_Candidata_Iguana",
            "Eje_Principal_Continuo_Iguana",
            "Perfil_Puntos_SEG_QC_Iguana",
            "Tramos_Geomorf_QC_Iguana",
            "Tramos_Geomorf_Lineas_QC_Iguana",
            "Parametros_Geomorf_Iguana"
        ]

        self.patrones_temporales = [
            "tmp",
            "clean",
            "lyr",
            "scratch",
            "Watersh_Flow",
            "StreamPts_Base_tmp",
            "Buffer_Obra_tmp",
            "StreamPts_Local_tmp"
        ]

    def resumen(self):
        print("========================================")
        print(self.nombre)
        print("----------------------------------------")
        print("Productos protegidos Modulo 1:")
        for p in self.productos_protegidos_modulo1:
            print(" -", p)
        print("----------------------------------------")
        print("Patrones temporales:")
        for p in self.patrones_temporales:
            print(" -", p)
        print("========================================")


if __name__ == "__main__":
    agente = AgenteLimpiezaTrazabilidad()
    agente.resumen()
''',
    encoding="utf-8"
)

print("========================================")
print("OK: agentes HidroFlow creados")
print("Carpeta:", agents_dir)
print("----------------------------------------")
print("__init__.py")
print("README_AGENTS_HIDROFLOW.md")
print("agent_opengeo_engine.py")
print("agent_qa_qc_comparator.py")
print("agent_configuracion_hidroflow.py")
print("agent_limpieza_trazabilidad.py")
print("========================================")
