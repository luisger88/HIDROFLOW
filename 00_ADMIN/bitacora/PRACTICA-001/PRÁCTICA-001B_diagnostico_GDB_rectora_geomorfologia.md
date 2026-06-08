# PRÁCTICA-001B — Diagnóstico de GDB rectora geomorfológica

## 1. Corrección arquitectónica

La geodatabase:

```text
D:\HidroFlow\01_DEM_HIDRO\00_BASE\red_hidrica_aaron.gdb
```

no corresponde a la GDB de productos geomorfológicos derivados de Iguaná.

Se reconoce como red hídrica externa/base visual asociada al Área Metropolitana del Valle de Aburrá, usada como referencia visual o insumo auxiliar, no como repositorio rector del Módulo 1.

## 2. GDB rectora real

La GDB rectora real del Módulo 1 de Geomorfología es:

```text
D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb
```

Esta ruta fue confirmada por existencia física en disco, inspección ArcPy y coincidencia con las rutas internas de HFGeomorfologia_Modulo1_Run_v1.py.

## 3. Productos espaciales confirmados

La GDB rectora contiene productos derivados críticos:

```text
Cabecera_Candidata_Iguana
Cuenca_Obra_Iguana
Eje_Continuo_Cabecera_PC80
Eje_Principal_Continuo_Iguana
Eje_Principal_Iguana
Nodos_Control_Ruta_Iguana
Nodos_Control_Topo_Iguana
Nodos_Red_Iguana
Nodos_Topo_Iguana
PC_Obra_Iguana
PC_Snap_Obra_Iguana
Perfil_Puntos_Iguana
Perfil_Puntos_QC_Iguana
Perfil_Puntos_QUIEBRES_Iguana
Perfil_Puntos_SEG_Iguana
Perfil_Puntos_SEG_QC_Iguana
Perfil_Puntos_VAR_Iguana
Perfil_Puntos_ZM_Iguana
Perfil_Puntos_Z_Iguana
Puntos_Quiebre_Iguana
Puntos_Quiebre_QC_Iguana
Red_Candidata_Z_Iguana
Red_Hidrica_Obra_Iguana
StreamNet_Strahler_150k
Tramos_Geomorf_Lineas_QC_Iguana
```

Sistema de referencia observado:

```text
MAGNA-SIRGAS_2018_Origen-Nacional
```

## 4. Rasters confirmados

```text
Cuenca_R_Obra_Iguana
FlowAcc_Base
FlowDir_Base
MDT_Fill_Base
Slope_Base
```

Estos insumos soportan la cadena MDT → FlowDir → FlowAcc → Watershed → Cuenca → Red → Eje → Perfil.

## 5. Tablas confirmadas

```text
Parametros_Geomorf_Iguana: 1 registro
Tabla_Aristas_Iguana: 187 registros
Tramos_Geomorf_Iguana: 18 registros
Tramos_Geomorf_QC_Iguana: 4 registros
```

Campos principales de Parametros_Geomorf_Iguana:

```text
NOMBRE, AREA_KM2, PERIM_KM, LONG_CAUC_KM, LONG_PERF_KM, LONG_RED_KM, DENS_DREN, Z_SALIDA, Z_CABECERA, DESNIVEL_M, PEND_MED_PCT, KC_COMPAC, KF_FORMA, N_TRAMOS_QC, N_QUIEBRES
```

## 6. Estado de automatización

El Módulo 1 sí fue automatizado mediante Python/ArcPy. El flujo está organizado por bloques funcionales: PC_Obra, PC_Snap, Watershed y Cuenca, Red hídrica recortada, Cabecera candidata, Grafo topológico, Eje principal, Eje continuo, Perfil longitudinal, Extracción Z, Variables de perfil, QC geomorfológico, Tramos, Parámetros geomorfológicos y Exportaciones.

## 7. Dependencia ArcGIS Pro

El flujo no es todavía independiente de ArcGIS Pro. Depende de arcpy, arcpy.sa, arcpy.management, arcpy.analysis, arcpy.conversion, FileGDB, Spatial Analyst, Watershed, RasterToPolygon, ExtractValuesToPoints, GeneratePointsAlongLines y Dissolve.

## 8. Brecha documental y de GitHub

Aunque el módulo existe operativamente, no quedó suficientemente documentado ni versionado dentro de GitHub como contrato formal.

Faltan: contrato canónico geomorfológico, manifiesto de GDB rectora, inventario oficial de campos, relación GDB externa → exportaciones → HidroFlow App, reglas de actualización para nuevo punto de control y estrategia de independencia futura de ArcGIS Pro.

## 9. Contrato canónico preliminar

La fuente geomorfológica debe dividirse en dos capas: capa espacial rectora y capa tabular exportable.

### 9.1 Capa espacial rectora

```text
D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb
```

Productos mínimos: PC_Obra_Iguana, PC_Snap_Obra_Iguana, Cuenca_Obra_Iguana, Cabecera_Candidata_Iguana, Eje_Principal_Continuo_Iguana, Perfil_Puntos_QC_Iguana y Tramos_Geomorf_QC_Iguana.

### 9.2 Capa tabular exportable

```text
D:\HidroFlow\06_EXPORTACIONES\Iguana\02_Tablas
```

Productos mínimos: Parametros_Geomorf_Iguana_*.csv, PC_Obra_Iguana_*.csv, PC_Snap_Obra_Iguana_*.csv, Cabecera_Candidata_Iguana_*.csv, Perfil_Puntos_QC_Iguana_*.csv y Tramos_Geomorf_QC_Iguana_*.csv.

## 10. Decisión arquitectónica preliminar

La GDB externa MDT_Terreno_Base.gdb queda reconocida como fuente espacial rectora del Módulo 1 para Iguaná PC_80. Las exportaciones tabulares en D:\HidroFlow\06_EXPORTACIONES\Iguana\02_Tablas quedan reconocidas como fuente tabular consumible por HidroFlow App.

## 11. Próximo paso

Construir un contrato canónico geomorfológico que relacione GDB rectora externa → productos espaciales mínimos → tablas exportadas → cuencasCatalogo.js / contexto HidroFlow → motor hidrológico → Índice / Comparador / Expediente.
