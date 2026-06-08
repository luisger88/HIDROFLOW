# PRÁCTICA-001D — Radar independencia ArcGIS Pro y parametrización por coordenadas

## 1. Nota en radar

El Módulo 1 de Geomorfología no debe depender permanentemente de ArcGIS Pro como única vía operativa.

Debe evolucionar hacia una arquitectura parametrizable que reciba coordenadas de usuario y ejecute el flujo completo desde punto de control hasta productos geomorfológicos consumibles por HidroFlow App.

## 2. Estado actual reconocido

El flujo actual del Módulo 1 está automatizado mediante Python/ArcPy y ArcGIS Pro.

La GDB rectora actual es:

```text
D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb
```

La dependencia actual incluye ArcPy, FileGDB, Spatial Analyst, Watershed, RasterToPolygon, ExtractValuesToPoints, GeneratePointsAlongLines, Dissolve y demás herramientas de ArcGIS Pro.

## 3. Objetivo arquitectónico

Configurar el Módulo 1 para que reciba como entrada mínima:

```text
latitud_usuario
longitud_usuario
sistema_referencia_entrada
identificador_cuenca
nombre_proyecto
```

Y ejecute el proceso:

```text
coordenadas usuario
→ PC_Obra
→ PC_Snap
→ Watershed / Cuenca
→ Red hídrica recortada
→ Cabecera candidata
→ Eje principal
→ Perfil longitudinal
→ Parámetros geomorfológicos
→ Exportaciones canónicas
→ HidroFlow App
```

## 4. Principio de transición

La transición no debe romper el flujo ArcPy validado.

Primero debe formalizarse un contrato canónico de entradas y salidas. Luego se podrá implementar una alternativa con librerías abiertas.

## 5. Posible arquitectura futura abierta

La independencia futura de ArcGIS Pro puede evaluarse con una pila abierta compuesta por:

```text
rasterio
geopandas
shapely
pyproj
networkx
whitebox
pyflwdir
pandas
```

## 6. Decisión preliminar

ArcGIS Pro / ArcPy se mantiene como backend geomorfológico validado mientras se define y prueba una ruta abierta equivalente.

La independencia de ArcGIS Pro queda como objetivo explícito de arquitectura, no como estado actual.

## 7. Próximo paso

Diseñar el contrato de entrada parametrizable para coordenadas de usuario y el contrato de salida canónico para HidroFlow App.
