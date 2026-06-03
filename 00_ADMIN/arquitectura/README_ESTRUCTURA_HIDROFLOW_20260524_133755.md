# Estructura profesional HIDROFLOW

Fecha: 2026-05-24 13:38:15

## Raiz

D:\HIDROFLOW

## Principio de organizacion

- 01_APP contiene la aplicacion/repositorio principal.
- 02_CORE contiene componentes comunes, configuracion y futuros orquestadores.
- 03_MODULOS contiene los modulos tecnicos de HidroFlow.
- 04_GIS contiene geodatos base, GDB, rasters, scratch y proyectos APRX.
- 05_PROYECTOS contiene resultados por cuenca o estudio.
- 06_EXPORTACIONES contiene salidas auditables.
- 07_TOOLBOX contiene toolboxes de ArcGIS Pro.
- 08_ENV contiene configuracion de entornos.
- 09_LEGACY conserva historicos.
- 10_LOGS conserva trazabilidad de ejecuciones.

## Estado actual

El Modulo 1 de Geomorfologia queda respaldado en:

D:\HIDROFLOW\03_MODULOS\M01_Geomorfologia

El repositorio app original fue copiado desde:

C:\Users\User\Dev\HIDROFLOW\HIDROFLOW-main\HIDROFLOW

## Regla

Esta migracion es segura y por copia.

No se elimino ni movio ningun archivo original.

La migracion definitiva se realizara cuando HFGeomorfologia_Modulo1_Run_v1.py quede integrado a HidroFlow_Tools.tbx.
