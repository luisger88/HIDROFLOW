# PRÁCTICA-001E — Entrada portable y parametrizable del Módulo 1

## 1. Propósito

Definir el contrato de entrada portable y parametrizable del Módulo 1 de Geomorfología, de forma que HidroFlow pueda operar desde cualquier máquina, recibir un MDT como insumo principal, generar una carpeta de proyecto por fuente hídrica y producir salidas geomorfológicas canónicas consumibles por HidroFlow App.

## 2. Principio de portabilidad

HidroFlow no debe depender permanentemente de rutas absolutas rígidas como única forma de operación.

El sistema debe poder ejecutarse desde cualquier máquina donde exista una estructura equivalente del proyecto, resolviendo rutas mediante configuración local, variables de entorno o parámetros de ejecución.

## 3. Raíz portable del proyecto

La raíz actual del proyecto es:

```text
D:\HidroFlow
```

Pero el contrato debe permitir que esta raíz sea variable en otra máquina.

Variable conceptual:

```text
HF_ROOT
```

## 4. Carpeta base de proyectos

La carpeta base de proyectos ya existe en la estructura global de HidroFlow:

```text
D:\HidroFlow\05_PROYECTOS
```

El Módulo 1 debe generar o reutilizar una carpeta de proyecto por fuente hídrica:

```text
<HF_ROOT>\05_PROYECTOS\<NOMBRE_FUENTE_HIDRICA>
```

Ejemplo actual:

```text
D:\HidroFlow\05_PROYECTOS\Iguana
```

## 5. Carpeta base de exportaciones

La carpeta base de exportaciones debe resolverse de forma portable:

```text
<HF_ROOT>\06_EXPORTACIONES\<NOMBRE_FUENTE_HIDRICA>
```

Ejemplo actual:

```text
D:\HidroFlow\06_EXPORTACIONES\Iguana
```

## 6. Entrada obligatoria del Módulo 1

El contrato de entrada no debe depender de una latitud o longitud manual como verdad técnica final.

La entrada mínima debe ser:

```text
nombre_fuente_hidrica
ruta_mdt
ruta_base_proyectos
ruta_base_exportaciones
sistema_referencia_trabajo
criterio_punto_control
backend_geomorfologia
```

## 7. Coordenadas operativas derivadas

Las coordenadas operativas deben ser derivadas, validadas y persistidas por el proceso geomorfológico.

Productos derivados:

```text
PC_Obra
PC_Snap
coordenada_control_derivada
coordenada_snap_derivada
cota_salida_derivada
cabecera_candidata_derivada
```

El MDT, la red hídrica, el snap y las reglas geomorfológicas deben producir las coordenadas técnicas utilizadas por el contrato.

## 8. Flujo objetivo del Módulo 1

```text
MDT
→ preparación hidrológica
→ punto de control operativo
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

## 9. Backend actual y backend futuro

El backend actual validado es ArcGIS Pro / ArcPy.

La arquitectura futura debe permitir evaluar un backend abierto equivalente, sin romper el flujo ArcPy validado.

Backend conceptual:

```text
backend_geomorfologia = arcpy | abierto
```

## 10. Regla de arquitectura global

Antes de tomar una decisión estructural, se debe revisar el proyecto global existente.

Raíces que deben revisarse:

```text
00_ADMIN
03_MODULOS
05_PROYECTOS
06_EXPORTACIONES
07_TOOLBOX
D:\Distrito_de_Medellin\Modelo_D_Terreno
```

## 11. Decisión preliminar

El Módulo 1 debe evolucionar hacia una entrada portable, parametrizable y orientada por fuente hídrica.

La App HidroFlow no debe quedar amarrada a rutas absolutas ni a una única máquina.

## 12. Próximo paso

Diseñar el archivo de configuración local portable y el manifiesto de proyecto por fuente hídrica.
