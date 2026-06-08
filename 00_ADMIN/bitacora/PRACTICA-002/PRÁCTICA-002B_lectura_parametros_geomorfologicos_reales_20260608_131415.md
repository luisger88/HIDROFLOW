# PRÁCTICA-002B — Lectura controlada de parámetros geomorfológicos reales

Fecha: 06/08/2026 13:14:15
Rama: practica-002b-lectura-parametros-geomorfologicos-reales

## 1. Propósito

Leer de forma controlada la materia prima real de parámetros geomorfológicos exportados para Iguana antes de crear cualquier plantilla canónica nueva.

Decisión operativa: no se crea plantilla canónica hasta inspeccionar el CSV real existente.

## 2. Archivo CSV seleccionado

```text
D:\HidroFlow\06_EXPORTACIONES\Iguana\02_Tablas\Parametros_Geomorf_Iguana_20260524_013443.csv
Length: 413
LastWriteTime: 05/24/2026 01:34:44
```

## 3. Delimitador detectado

```text
Delimitador: ;
Primera línea: OID_;NOMBRE;AREA_KM2;PERIM_KM;LONG_CAUC_KM;LONG_PERF_KM;LONG_RED_KM;DENS_DREN;Z_SALIDA;Z_CABECERA;DESNIVEL_M;PEND_MED_PCT;KC_COMPAC;KF_FORMA;N_TRAMOS_QC;N_QUIEBRES
```

## 4. Primeras líneas crudas

```text
OID_;NOMBRE;AREA_KM2;PERIM_KM;LONG_CAUC_KM;LONG_PERF_KM;LONG_RED_KM;DENS_DREN;Z_SALIDA;Z_CABECERA;DESNIVEL_M;PEND_MED_PCT;KC_COMPAC;KF_FORMA;N_TRAMOS_QC;N_QUIEBRES
1;Iguana;46,851602999999642;47,590000000022350;15,524027406751557;15,515000000000818;127,128278741639463;2,713424314246845;1511,358032226562500;2819,270507812500000;1307,912475585937500;8,429986951890871;1,946755941500344;0,194634979985145;4;3
```

## 5. Columnas detectadas

```text
OID_
NOMBRE
AREA_KM2
PERIM_KM
LONG_CAUC_KM
LONG_PERF_KM
LONG_RED_KM
DENS_DREN
Z_SALIDA
Z_CABECERA
DESNIVEL_M
PEND_MED_PCT
KC_COMPAC
KF_FORMA
N_TRAMOS_QC
N_QUIEBRES
```

## 6. Primera fila parseada

```text
OID_ = 1
NOMBRE = Iguana
AREA_KM2 = 46,851602999999642
PERIM_KM = 47,590000000022350
LONG_CAUC_KM = 15,524027406751557
LONG_PERF_KM = 15,515000000000818
LONG_RED_KM = 127,128278741639463
DENS_DREN = 2,713424314246845
Z_SALIDA = 1511,358032226562500
Z_CABECERA = 2819,270507812500000
DESNIVEL_M = 1307,912475585937500
PEND_MED_PCT = 8,429986951890871
KC_COMPAC = 1,946755941500344
KF_FORMA = 0,194634979985145
N_TRAMOS_QC = 4
N_QUIEBRES = 3
```

## 7. Lectura arquitectónica preliminar

El contrato canónico debe derivarse de la estructura real del CSV, no de una plantilla inventada. La siguiente decisión debe mapear columnas reales hacia nombres canónicos del motor HidroFlow.

## 8. Estado Git final

?? "00_ADMIN/bitacora/PRACTICA-002/PR\303\201CTICA-002B_lectura_parametros_geomorfologicos_reales_20260608_131415.md"
