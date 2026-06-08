# PRÁCTICA-001F — Configuración local portable y manifiesto de proyecto

## 1. Propósito

Definir la arquitectura de configuración local portable de HidroFlow y el manifiesto mínimo por fuente hídrica, de forma que el proyecto pueda operar desde cualquier máquina sin depender permanentemente de rutas absolutas rígidas.

## 2. Principio rector

HidroFlow debe separar código versionado, configuración local, datos pesados externos, productos por fuente hídrica y exportaciones canónicas.

El repositorio debe poder clonarse o moverse a otra máquina y reconfigurarse mediante archivos locales o variables de entorno, sin modificar código fuente.

## 3. Raíz portable del sistema

La raíz actual del proyecto es:

```text
D:\HidroFlow
```

Pero el contrato debe permitir que esta raíz sea variable.

Variable conceptual:

```text
HF_ROOT
```

Ejemplos válidos futuros:

```text
D:\HidroFlow
E:\HidroFlow
C:\Users\<usuario>\HidroFlow
/home/<usuario>/HidroFlow
```

## 4. Configuración local portable

Se propone un archivo local de configuración, no versionado o versionado solo como plantilla:

```text
.hidroflow.local.json
.hidroflow.local.example.json
```

El archivo real local debe contener rutas propias de cada máquina. La plantilla example debe documentar la estructura esperada.

## 5. Variables conceptuales mínimas

```text
HF_ROOT
HF_PROYECTOS
HF_EXPORTACIONES
HF_TOOLBOX
HF_MODULOS
HF_MDT
HF_GDB_RECTORA
HF_BACKEND_GEOMORFOLOGIA
```

Estas variables no implican implementación inmediata. Son nombres contractuales para diseñar portabilidad.

## 6. Estructura portable esperada

```text
<HF_ROOT>
├── 00_ADMIN
├── 01_APP
├── 03_MODULOS
├── 05_PROYECTOS
├── 06_EXPORTACIONES
├── 07_TOOLBOX
└── .hidroflow.local.json
```

## 7. Manifiesto por fuente hídrica

Cada fuente hídrica debe tener una carpeta propia dentro de 05_PROYECTOS.

Ruta conceptual:

```text
<HF_ROOT>\05_PROYECTOS\<NOMBRE_FUENTE_HIDRICA>
```

Ejemplo actual:

```text
D:\HidroFlow\05_PROYECTOS\Iguana
```

Archivo propuesto por fuente hídrica:

```text
manifesto.proyecto.json
```

## 8. Campos mínimos del manifiesto de proyecto

```json
{
  "nombre_fuente_hidrica": "Iguana",
  "codigo_proyecto": "IGUANA_PC80",
  "ruta_proyecto": "<HF_ROOT>/05_PROYECTOS/Iguana",
  "ruta_exportaciones": "<HF_ROOT>/06_EXPORTACIONES/Iguana",
  "ruta_mdt": "<RUTA_LOCAL_MDT>",
  "ruta_gdb_rectora": "<RUTA_LOCAL_GDB>",
  "backend_geomorfologia": "arcpy",
  "sistema_referencia_trabajo": "MAGNA-SIRGAS_2018_Origen-Nacional",
  "estado": "diagnostico",
  "fecha_creacion": "YYYY-MM-DD"
}
```

## 9. Regla sobre datos pesados

Los datos pesados como MDT, GDB, rasters, proyectos ArcGIS y productos intermedios voluminosos no deben asumirse como parte obligatoria del repositorio Git.

Deben referenciarse mediante configuración local, manifiestos o rutas parametrizadas.

## 10. Regla sobre HidroFlow App

HidroFlow App no debe consumir directamente una GDB externa local.

La App debe consumir una capa canónica exportada, validada, versionable y trazable.

## 11. Backend geomorfológico

El backend actual validado es ArcGIS Pro / ArcPy.

La configuración debe permitir declarar el backend usado:

```text
backend_geomorfologia = arcpy | abierto
```

## 12. Validaciones mínimas futuras

```text
Existe HF_ROOT
Existe 05_PROYECTOS
Existe 06_EXPORTACIONES
Existe ruta_mdt
Existe ruta_gdb_rectora si backend = arcpy
Existe carpeta de fuente hidrica o puede crearse
Existe manifiesto de proyecto o puede generarse
Existen exportaciones canónicas mínimas antes de alimentar HidroFlow App
```

## 13. Decisión preliminar

La portabilidad de HidroFlow debe resolverse mediante configuración local portable y manifiestos de proyecto por fuente hídrica.

No se deben endurecer rutas absolutas dentro del motor, la App o los scripts futuros.

## 14. Próximo paso

Diseñar la plantilla .hidroflow.local.example.json y el manifiesto base manifesto.proyecto.json para la fuente hídrica Iguana.
