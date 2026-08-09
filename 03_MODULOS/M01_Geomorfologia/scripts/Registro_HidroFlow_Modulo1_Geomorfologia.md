# Registro oficial — HidroFlow Módulo 1 Geomorfología

Fecha de registro: 2026-05-23 20:58:35

## Objetivo

Construir de forma reproducible, auditable y controlada el eje principal geomorfológico de una cuenca a partir de coordenadas reales de obra, red hídrica derivada del MDT, cuenca generada desde el punto de control y criterio altimétrico de cabecera.

## Principio crítico

El eje principal NO se selecciona únicamente por mayor longitud.

Debe cumplir simultáneamente:

1. Nacer desde PC_Snap_Obra_Iguana.
2. Estar contenido en Red_Hidrica_Obra_Iguana.
3. Mantener continuidad hidráulica.
4. Conectar hacia la cabecera candidata de mayor cota.
5. Representar la quebrada La Iguaná real.
6. Excluir tributarios laterales aunque sean largos.

## Estado validado actual

### Rasters base

- MDT_Fill_Base
- FlowDir_Base
- FlowAcc_Base
- Slope_Base
- Cuenca_R_Obra_Iguana

### Feature Classes validadas

- StreamNet_Strahler_150k
- Eje_Continuo_Cabecera_PC80
- PC_Obra_Iguana
- PC_Snap_Obra_Iguana
- Cuenca_Obra_Iguana
- Red_Hidrica_Obra_Iguana
- Red_Candidata_Z_Iguana
- Cabecera_Candidata_Iguana

## Coordenadas de obra usadas

Latitud: 6.271785117145225  
Longitud: -75.59408755595547

## Cabecera candidata detectada

OID tramo: 1  
Extremo: INI  
Z máxima: 2820.99 m  
X: 4706508.44  
Y: 2258031.07  

## Flujo validado

1. Crear PC_Obra_Iguana desde coordenadas geográficas.
2. Mostrar red hídrica y validar visualmente.
3. Generar snap geométrico controlado sobre la red.
4. Crear PC_Snap_Obra_Iguana.
5. Generar watershed con control de salida.
6. Crear Cuenca_R_Obra_Iguana.
7. Convertir a Cuenca_Obra_Iguana.
8. Recortar StreamNet_Strahler_150k a Red_Hidrica_Obra_Iguana.
9. Crear Red_Candidata_Z_Iguana.
10. Calcular cotas extremas Z_INI y Z_FIN por tramo.
11. Detectar cabecera candidata de mayor cota.
12. Crear Cabecera_Candidata_Iguana.
13. Construir ruta continua entre PC_Snap_Obra_Iguana y Cabecera_Candidata_Iguana.
14. Generar Eje_Principal_Iguana definitivo.
15. Generar Perfil_Puntos_Iguana cada 5 m solo después de validar el eje.

## Reglas de limpieza

Después de cada fase:

- Limpiar GDB de temporales.
- Limpiar Contents de capas temporales.
- Verificar inventario.
- No avanzar con residuos.
- No confundir layer visual con dataset real.

## Regla de oro

Raster visible no equivale a raster válido.  
Layer en Contents no equivale a dataset persistente en GDB.  
Código en consola no equivale a script institucional.



---

## Actualización de avance — 2026-05-23 22:00:27

### Hito cerrado: eje principal topológico y puntos de perfil

Se corrigió el criterio de selección del eje principal. El eje ya no se define por mayor longitud aislada, sino por ruta topológica entre el punto de salida hidráulico y la cabecera altimétrica candidata.

### Productos validados

- Eje_Principal_Iguana
- Eje_Principal_Continuo_Iguana
- Perfil_Puntos_Iguana

### Resultado de generación de puntos

- Perfil_Puntos_Iguana generado sobre Eje_Principal_Continuo_Iguana.
- Distancia entre puntos: 5 m.
- Total puntos generados: 3104.

### Criterio definitivo usado

1. Crear Red_Candidata_Z_Iguana con cotas extremas por tramo.
2. Detectar Cabecera_Candidata_Iguana por mayor cota.
3. Crear Nodos_Topo_Iguana fusionando extremos por tolerancia.
4. Identificar nodo de salida en PC_Snap_Obra_Iguana.
5. Identificar nodo de cabecera en Cabecera_Candidata_Iguana.
6. Calcular ruta topológica salida–cabecera.
7. Crear Eje_Principal_Iguana.
8. Disolver a Eje_Principal_Continuo_Iguana.
9. Generar Perfil_Puntos_Iguana cada 5 m.

### Validación de ruta

- Nodo salida topológico: 170.
- Cota salida aproximada: 1511.3723 m.
- Nodo cabecera topológico: 1.
- Cota cabecera aproximada: 2820.988 m.
- Cantidad nodos en ruta: 36.
- Cantidad tramos en ruta: 35.

### Regla fijada

El eje principal válido es la ruta hidráulicamente continua desde PC_Snap_Obra_Iguana hasta Cabecera_Candidata_Iguana. No se acepta selección por longitud máxima si no garantiza conectividad y cabecera real.



---

## Actualización de avance — 2026-05-23 22:38:48

### Hito cerrado: perfil longitudinal con control de calidad

Se generaron y validaron los productos derivados del perfil longitudinal sobre el eje principal topológico correcto:

- Perfil_Puntos_ZM_Iguana
- Perfil_Puntos_VAR_Iguana
- Perfil_Puntos_QC_Iguana

### Perfil orientado

El perfil fue orientado desde PC_Snap_Obra_Iguana hacia Cabecera_Candidata_Iguana.

Resultados de control:

- Total puntos: 3104
- MEAS mínimo: 3.75 m
- MEAS máximo: 15518.75 m
- Z mínima: 1511.36 m
- Z máxima: 2819.27 m

### Variables calculadas

En Perfil_Puntos_VAR_Iguana se calcularon:

- Z_M
- DIST_INC_M
- DZ_M
- PEND_M_M
- PEND_PCT

Resumen:

- Pendiente mínima: 0.0 %
- Pendiente máxima: 214.2676 %
- Pendiente promedio: 8.4273 %

### Control de calidad

En Perfil_Puntos_QC_Iguana se generaron:

- FLAG_P50
- FLAG_P100
- CLASE_PEND
- PEND_SUAV_5

Resumen QC:

- Pendientes > 50 %: 78
- Pendientes > 100 %: 6
- PEND_SUAV_5 mínima: 0.0 %
- PEND_SUAV_5 máxima: 119.5049 %
- PEND_SUAV_5 promedio: 8.4302 %

### Regla técnica

El perfil crudo se conserva para auditoría.  
El perfil QC se utiliza para interpretación geomorfológica y detección de quiebres.  
Los valores extremos no se eliminan; se clasifican y se marcan mediante flags.



---

## Actualización de avance — 2026-05-23 23:32:10

### Hito cerrado: segmentación geomorfológica QC

Se generó la segmentación geomorfológica final del eje principal topológico de la quebrada La Iguaná.

### Productos generados

- Perfil_Puntos_SEG_QC_Iguana
- Puntos_Quiebre_QC_Iguana
- Tramos_Geomorf_QC_Iguana
- Tramos_Geomorf_Lineas_QC_Iguana

### Criterio de depuración

La segmentación inicial con 17 quiebres generó tramos inválidos o demasiado cortos.  
Por ello se aplicó un criterio QC de agrupamiento de quiebres cercanos:

- Distancia mínima entre límites geomorfológicos: 50 m.
- En cada grupo de quiebres se conservó el punto con mayor ABS_DPEND.
- Se descartaron límites demasiado cercanos al inicio o al final del perfil.

### Resultado QC

- Quiebres QC: 3
- Tramos QC: 4
- Total puntos en perfil: 3104
- Tramos con longitud 0: 0
- Tramos menores de 25 m: 0
- Tramos menores de 50 m: 0
- Líneas espaciales de tramo: 4

### Productos finales de esta etapa

La tabla Tramos_Geomorf_QC_Iguana constituye el resumen tabular final de la segmentación.  
La capa Tramos_Geomorf_Lineas_QC_Iguana constituye la representación espacial final de los tramos geomorfológicos.

### Regla técnica

Los quiebres detectados son señales geomorfológicas.  
No todo punto de quiebre debe convertirse automáticamente en límite de tramo.  
Los límites finales de tramo deben cumplir una separación mínima y producir segmentos con longitud geomorfológicamente interpretable.



---

## Actualización de avance — 2026-05-23 23:44:13

### Hito cerrado: parámetros geomorfológicos globales

Se generó la tabla Parametros_Geomorf_Iguana como resumen global de cuenca, red y cauce principal.

### Producto generado

- Parametros_Geomorf_Iguana

### Resultados principales

- Área de cuenca: 46.8516 km²
- Perímetro de cuenca: 47.5900 km
- Longitud del cauce principal: 15.5240 km
- Longitud efectiva del perfil: 15.5150 km
- Longitud total de red drenaje recortada: 127.1283 km
- Densidad de drenaje: 2.7134 km/km²
- Cota de salida: 1511.36 m
- Cota de cabecera: 2819.27 m
- Desnivel total: 1307.91 m
- Pendiente media del cauce: 8.4300 %
- Coeficiente de compacidad Kc: 1.9468
- Factor de forma Kf: 0.1946
- Tramos geomorfológicos QC: 4
- Quiebres geomorfológicos QC: 3

### Interpretación técnica

Los resultados son coherentes con una cuenca alargada, de fuerte gradiente altitudinal y red de drenaje densa.  
La longitud del cauce principal y la longitud efectiva del perfil presentan diferencia mínima, lo cual valida la consistencia geométrica del eje principal continuo.  
La pendiente media calculada a partir del desnivel y la longitud efectiva del perfil es coherente con la pendiente promedio derivada del perfil longitudinal QC.

### Regla técnica

La tabla Parametros_Geomorf_Iguana constituye el resumen global oficial del Módulo 1 para la cuenca de La Iguaná.  
Los productos Tramos_Geomorf_QC_Iguana y Tramos_Geomorf_Lineas_QC_Iguana constituyen el soporte detallado de segmentación.  
El perfil QC conserva trazabilidad hacia los productos crudos y hacia el eje principal topológico.



---

## Actualización de avance — 2026-05-23 23:58:50

### Hito cerrado: exportación auditable del Módulo 1

Se exportaron los productos oficiales del Módulo 1 en formatos Excel y CSV, para respaldo, auditoría e interoperabilidad.

### Carpeta de exportación

D:\Distrito_de_Medellin\Modelo_D_Terreno\Exportaciones\Iguana\02_Tablas

### Marca temporal de exportación

20260523_234806

### Productos exportados

- Parametros_Geomorf_Iguana
- Tramos_Geomorf_QC_Iguana
- Tramos_Geomorf_Lineas_QC_Iguana
- Perfil_Puntos_SEG_QC_Iguana
- Perfil_Puntos_QC_Iguana
- Perfil_Puntos_VAR_Iguana
- Perfil_Puntos_ZM_Iguana
- Puntos_Quiebre_QC_Iguana
- Cabecera_Candidata_Iguana
- PC_Obra_Iguana
- PC_Snap_Obra_Iguana

Cada producto fue exportado en formato XLSX y CSV.

### Estado de formalización

El Módulo 1 ya cuenta con:

- Datos persistentes en MDT_Terreno_Base.gdb.
- Registro técnico físico en Registro_HidroFlow_Modulo1_Geomorfologia.md.
- Script base inicial HFGeomorfologia_Modulo1_v1.py.
- Exportaciones auditables en carpeta externa.

### Regla técnica

La exportación externa no reemplaza la GDB.  
La GDB conserva la trazabilidad operativa.  
Las exportaciones constituyen respaldo auditable e interoperable.



---

## Actualización de avance — 2026-05-24 00:36:33

### Hito cerrado: prueba del script de control consolidado v2

Se ejecutó correctamente el script:

D:\Distrito_de_Medellin\Modelo_D_Terreno\Scripts\HFGeomorfologia_Modulo1_v2.py

### Función del script v2

El script v2 valida el estado consolidado del Módulo 1 de Geomorfología, verifica la existencia de los datasets principales, resume los parámetros geomorfológicos, resume la segmentación QC, verifica exportaciones auditables y ejecuta limpieza visual de temporales en Contents.

### Resultado de prueba

- Todos los datasets requeridos existen.
- Parametros_Geomorf_Iguana fue leído correctamente.
- Tramos_Geomorf_QC_Iguana fue leído correctamente.
- La carpeta de exportaciones fue verificada.
- La limpieza visual de temporales fue ejecutada.
- El control finalizó sin errores.

### Resumen validado

- Área de cuenca: 46.8516 km².
- Perímetro: 47.5900 km.
- Longitud cauce principal: 15.5240 km.
- Longitud perfil: 15.5150 km.
- Longitud red drenaje: 127.1283 km.
- Densidad de drenaje: 2.7134 km/km².
- Z salida: 1511.36 m.
- Z cabecera: 2819.27 m.
- Desnivel: 1307.91 m.
- Pendiente media cauce: 8.43 %.
- Kc: 1.9468.
- Kf: 0.1946.
- Tramos QC: 4.
- Quiebres QC: 3.
- Exportaciones verificadas: 11 XLSX y 11 CSV.

### Estado

HFGeomorfologia_Modulo1_v2.py queda aprobado como script de control consolidado del Módulo 1.

### Próximo desarrollo

Construir HFGeomorfologia_Modulo1_Run_v1.py como script ejecutivo completo para reconstruir el flujo desde parámetros de entrada hasta exportaciones auditables.


---

## RUN v1 creado y probado parcialmente — 2026-05-24 00:46:47

Se creó la versión ejecutiva modular HFGeomorfologia_Modulo1_Run_v1.py con bloque 00 de validación de insumos base. Este script será la base para integrar el flujo completo del Módulo 1.

---

## RUN v1 creado y probado parcialmente — 2026-05-24 00:55:38

Se creó la versión ejecutiva modular HFGeomorfologia_Modulo1_Run_v1.py con bloque 00 de validación de insumos base. Este script será la base para integrar el flujo completo del Módulo 1.

---

## RUN v1 probado con Bloque 00 y Bloque 01 — 2026-05-24 00:58:11

Se ejecutï¿½ HFGeomorfologia_Modulo1_Run_v1.py con validaciï¿½n de insumos base y reutilizaciï¿½n/control de PC_Obra_Iguana. El Bloque 01 quedï¿½ incorporado formalmente al flujo main().

---

## RUN v1 probado con Bloque 00 y Bloque 01 - 2026-05-24 01:00:10

Se ejecutï¿½ HFGeomorfologia_Modulo1_Run_v1.py con validaciï¿½n de insumos base y reutilizaciï¿½n/control de PC_Obra_Iguana. El Bloque 01 quedï¿½ incorporado formalmente al flujo main().

---

## RUN v1 probado con Bloque 00 y Bloque 01 - 2026-05-24 01:03:01

Se ejecut- HFGeomorfologia_Modulo1_Run_v1.py con validaci-n de insumos base y reutilizaci-n/control de PC_Obra_Iguana. El Bloque 01 qued- incorporado formalmente al flujo main().

---

## RUN v1 probado con Bloques 00-02 - 2026-05-24 01:04:53

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py con validacion de insumos base, reutilizacion/control de PC_Obra_Iguana y reutilizacion/control de PC_Snap_Obra_Iguana mediante snap geometrico controlado.

---

## RUN v1 probado con Bloques 00-03 - 2026-05-24 01:07:36

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py con validacion de insumos base, PC_Obra, PC_Snap y cuenca raster/poligono. Los productos existentes se reutilizaron sin recalculo.

---

## RUN v1 probado con Bloques 00-04 - 2026-05-24 01:09:13

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py con validacion de insumos base, PC_Obra, PC_Snap, cuenca raster/poligono y red hidrica recortada. Los productos existentes se reutilizaron sin recalculo.

---

## RUN v1 probado con Bloques 00-05 - 2026-05-24 01:10:55

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Red_Candidata_Z_Iguana. Los productos existentes se reutilizaron sin recalculo.

---

## RUN v1 probado con Bloques 00-06 - 2026-05-24 01:12:33

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Cabecera_Candidata_Iguana. Los productos existentes se reutilizaron sin recalculo.

---

## RUN v1 probado con Bloques 00-07 - 2026-05-24 01:14:43

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta grafo topologico y Eje_Principal_Iguana. Los productos existentes se reutilizaron sin recalculo cuando ya estaban disponibles.

---

## RUN v1 probado con Bloques 00-08 - 2026-05-24 01:16:50

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Eje_Principal_Continuo_Iguana. El eje continuo fue validado como una sola feature.

---

## RUN v1 probado con Bloques 00-09 - 2026-05-24 01:18:46

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_Iguana. Los puntos del perfil se reutilizaron o generaron sobre Eje_Principal_Continuo_Iguana.

---

## RUN v1 probado con Bloques 00-10 - 2026-05-24 01:20:19

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_Z_Iguana. La extraccion de elevaciones se reutilizo o genero desde MDT_Fill_Base.

---

## RUN v1 probado con Bloques 00-11 - 2026-05-24 01:22:00

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_ZM_Iguana con MEAS orientado desde PC_Snap_Obra_Iguana hacia Cabecera_Candidata_Iguana.

---

## RUN v1 probado con Bloques 00-12 - 2026-05-24 01:23:38

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_VAR_Iguana, calculando variables derivadas del perfil longitudinal ordenadas por MEAS.

---

## RUN v1 probado con Bloques 00-13 - 2026-05-24 01:25:11

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_QC_Iguana, incorporando flags de pendiente y pendiente suavizada PEND_SUAV_5.

---

## RUN v1 probado con Bloques 00-14 - 2026-05-24 01:27:17

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Perfil_Puntos_QUIEBRES_Iguana, reutilizando o generando deteccion de quiebres geomorfologicos con PEND_SUAV_5.

---

## RUN v1 probado con Bloques 00-15 - 2026-05-24 01:29:16

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta segmentacion QC, incluyendo Perfil_Puntos_SEG_QC_Iguana, Puntos_Quiebre_QC_Iguana y Tramos_Geomorf_QC_Iguana.

---

## RUN v1 probado con Bloques 00-16 - 2026-05-24 01:30:54

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Tramos_Geomorf_Lineas_QC_Iguana, generando/reutilizando la representacion espacial de los tramos geomorfologicos QC.

---

## RUN v1 probado con Bloques 00-17 - 2026-05-24 01:32:41

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta Parametros_Geomorf_Iguana, integrando el resumen global de cuenca, cauce, red, tramos QC y quiebres QC.

---

## RUN v1 probado con Bloques 00-18 - 2026-05-24 01:35:05

Se ejecuto HFGeomorfologia_Modulo1_Run_v1.py hasta exportaciones auditables, consolidando el flujo del Modulo 1 desde insumos base hasta productos tabulares externos.

---

## Hito: Fundación Curva Hipsométrica — 2026-07-31

### Script creado

`HFGeomorfologia_CurvaHipsometrica_v1.py` — 6 bloques que computan la curva hipsométrica completa desde el MDT y la cuenca existentes.

### Flujo del script

1. **Recorte**: MDT_Fill_Base recortado a Cuenca_Obra_Iguana → MDT_Recortado_Iguana
2. **Reclasificación**: franjas altimétricas cada 50 m → MDT_Reclasif_Hipsom_Iguana
3. **Tabulate Area**: área (m²) por franja altimétrica → Tabla_Area_Hipsom_Iguana
4. **Curva**: área acumulada descendente, fracción de área y altura → Curva_Hipsometrica_Iguana
5. **Integral**: método de trapecios sobre curva normalizada → clasificación ciclo de Davis
6. **Exportación**: XLSX + CSV a carpeta de exportaciones

### Productos generados (si se ejecuta en ArcGIS Pro)

- `Curva_Hipsometrica_Iguana` (tabla GDB)
- `Parametros_Hipsom_Iguana` (tabla GDB con integral, ciclo, rango)
- Exportaciones XLSX/CSV en `02_Tablas`

### Pendiente de ejecución

El script requiere ArcGIS Pro con licencia Spatial Analyst y acceso a la GDB `MDT_Terreno_Base.gdb`. No ha sido ejecutado desde este entorno.
