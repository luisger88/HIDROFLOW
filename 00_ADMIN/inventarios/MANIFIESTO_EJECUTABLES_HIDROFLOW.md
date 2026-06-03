@'

\# Manifiesto de ejecutables HidroFlow



Fecha: 2026-05-24



\## Objetivo



Este documento identifica los scripts ejecutables actuales de HidroFlow y define con que interprete deben ejecutarse.



La regla principal es:



\- Scripts sin arcpy -> Python normal.

\- Scripts con arcpy -> Python de ArcGIS Pro.



\---



\## 1. Ejecutables con Python normal



\### Configuracion



```powershell

python "D:\\HIDROFLOW\\02\_CORE\\config\\hidroflow\_config.py"

