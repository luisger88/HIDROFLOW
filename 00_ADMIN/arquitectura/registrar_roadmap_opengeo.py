# -*- coding: utf-8 -*-
from pathlib import Path
from datetime import datetime

roadmap = Path(r"D:\HIDROFLOW\00_ADMIN\arquitectura\ROADMAP_OPERATIVIDAD_ARCPY_OPENGEO.md")

contenido = f"""# Roadmap de operatividad HidroFlow: ArcPy y Open Geo Engine

Fecha: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## Decisión arquitectónica

HidroFlow debe operar inicialmente con ArcPy como motor oficial validado y, en una segunda fase, evolucionar hacia un motor abierto que no dependa de ArcGIS Pro.

## Estado actual

El script:

D:\\HIDROFLOW\\03_MODULOS\\M01_Geomorfologia\\scripts\\HFGeomorfologia_Modulo1_Run_v1.py

fue ejecutado correctamente con Python de ArcGIS Pro:

C:\\Program Files\\ArcGIS\\Pro\\bin\\Python\\envs\\arcgispro-py3\\python.exe

El flujo llegó hasta Bloques 00-18, con exportaciones XLSX y CSV generadas correctamente.

## Limitación actual

El Run_v1 depende de ArcPy.  
No puede ejecutarse con Python normal porque ArcPy solo está disponible dentro del entorno Python de ArcGIS Pro.

## Estrategia futura

Se manejarán dos motores:

1. ArcGIS Engine
   - Usa arcpy.
   - Requiere ArcGIS Pro.
   - Es el motor oficial actual validado.

2. Open Geo Engine
   - Usa librerías abiertas.
   - No debe depender de ArcGIS Pro.
   - Debe reproducir progresivamente los resultados del motor ArcPy.

## Librerías candidatas Open Geo

- rasterio
- geopandas
- shapely
- pyproj
- fiona
- pandas
- networkx
- pyflwdir
- whitebox

## Equivalencias técnicas

ArcPy FeatureClass -> GeoPackage / Shapefile / GeoDataFrame  
ArcPy Raster -> rasterio Dataset  
ExtractValuesToPoints -> rasterio.sample  
RasterToPolygon -> rasterio.features.shapes  
Dissolve / Clip -> geopandas / shapely  
Grafo topológico -> networkx  
Watershed / FlowDir -> pyflwdir o whitebox  
TableToExcel / TableToTable -> pandas  

## Regla de transición

No se modifica el Run_v1 validado hasta crear y probar una versión configurada.

Orden recomendado:

1. Mantener HFGeomorfologia_Modulo1_Run_v1.py como motor ArcPy validado.
2. Crear HFGeomorfologia_Modulo1_Run_v1_config.py leyendo hidroflow_paths.json.
3. Crear engine_arcpy.py para encapsular funciones ArcPy.
4. Crear engine_opengeo.py para alternativas abiertas.
5. Comparar resultados ArcPy vs OpenGeo en la cuenca Iguana.
6. Solo después declarar independencia parcial o total de ArcGIS Pro.

## Criterio de aceptación

El motor OpenGeo solo será aceptado cuando reproduzca, dentro de tolerancias definidas, los productos validados del Módulo 1:

- PC_Snap_Obra_Iguana
- Cuenca_Obra_Iguana
- Red_Hidrica_Obra_Iguana
- Eje_Principal_Continuo_Iguana
- Perfil_Puntos_SEG_QC_Iguana
- Tramos_Geomorf_QC_Iguana
- Parametros_Geomorf_Iguana

## Nota

La independencia de ArcGIS Pro es una meta estratégica, no un cambio inmediato.  
El motor ArcPy sigue siendo el motor oficial validado del Módulo 1 mientras se desarrolla y valida el motor abierto.
"""

roadmap.write_text(contenido, encoding="utf-8")

print("OK: roadmap ArcPy/OpenGeo creado")
print(roadmap)