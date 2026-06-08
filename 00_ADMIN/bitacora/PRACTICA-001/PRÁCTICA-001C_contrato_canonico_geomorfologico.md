# PRÁCTICA-001C — Contrato canónico geomorfológico

## 1. Propósito

Definir el contrato canónico que debe conectar los productos del Módulo 1 de Geomorfología con HidroFlow App, evitando ambigüedad entre GDB externa, exportaciones tabulares, catálogo de cuencas, motor hidrológico, Índice, Comparador y Expediente.

## 2. Fuente espacial rectora

```text
D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb
```

Sistema de referencia observado:

```text
MAGNA-SIRGAS_2018_Origen-Nacional
```

## 3. Productos espaciales mínimos

```text
PC_Obra_Iguana
PC_Snap_Obra_Iguana
Cuenca_Obra_Iguana
Cabecera_Candidata_Iguana
Eje_Principal_Continuo_Iguana
Perfil_Puntos_QC_Iguana
Tramos_Geomorf_QC_Iguana
Parametros_Geomorf_Iguana
```

## 4. Fuente tabular exportable

```text
D:\HidroFlow\06_EXPORTACIONES\Iguana\02_Tablas
```

## 5. Tablas mínimas exportables

```text
Parametros_Geomorf_Iguana_*.csv
PC_Obra_Iguana_*.csv
PC_Snap_Obra_Iguana_*.csv
Cabecera_Candidata_Iguana_*.csv
Perfil_Puntos_QC_Iguana_*.csv
Tramos_Geomorf_QC_Iguana_*.csv
```

## 6. Campos obligatorios iniciales

### 6.1 Parametros_Geomorf

```text
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

## 7. Dependencia actual

El contrato reconoce que el Módulo 1 opera actualmente sobre Python/ArcPy y ArcGIS Pro. La independencia de ArcGIS Pro queda como objetivo futuro, no como condición ya cumplida.

## 8. Decisión preliminar

La App HidroFlow no debe consumir directamente la GDB externa. La App debe consumir una capa tabular/canónica exportada, validada y trazable.

## 9. Próximo paso

Definir el mapeo campo por campo entre Parametros_Geomorf_Iguana, cuencasCatalogo.js y el contexto hidrológico exportable.
