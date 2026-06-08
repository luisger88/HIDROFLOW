# PRÁCTICA-002A — Consolidación de verdad geomorfológica para consumo del motor

Fecha: 06/08/2026 12:47:06
Rama: practica-002a-consolidacion-verdad-geomorfologica-motor

## 1. Propósito

Consolidar la verdad geomorfológica existente como materia prima canónica del motor HidroFlow, evitando repetir inventarios ya documentados y filtrando evidencia que genera ruido operativo o acoplamiento innecesario.

HidroFlow debe producir para lo que fue creado: transformar parámetros geomorfológicos confiables en insumos hidrológicos trazables, auditables y consumibles por el motor, el índice, el comparador y el expediente.

## 2. Antecedente inmediato

La PRÁCTICA-002A-0 auditó inventarios existentes y confirmó que ya existe documentación previa suficiente sobre GDB rectora, inventario espacial geomorfológico y contrato canónico preliminar.

Por tanto, PRÁCTICA-002A no debe crear otro inventario desde cero.

## 3. Evidencia reutilizable

Se consideran evidencia reutilizable los documentos y líneas ya depuradas que identifican productos geomorfológicos reales, especialmente:

```text
PRÁCTICA-001B_diagnostico_GDB_rectora_geomorfologia.md
PRÁCTICA-001B_inventario_espacial_geomorfologico_LIMPIO_20260607_180118.md
PRÁCTICA-001C_contrato_canonico_geomorfologico.md
PRÁCTICA-002A-0_auditoria_segura_inventarios_existentes_*.md
```

## 4. Evidencia degradada o descartada para fines prácticos

Por decisión arquitectónica, no se utilizará como fuente práctica principal:

```text
PRÁCTICA-001B_contenido_gdb_red_hidrica_aaron_20260607_181751.md
```

Motivo:

```text
Genera ruido documental.
No debe orientar la verdad madura del motor.
No aporta como contrato consumible por HidroFlow App.
```

También se degrada la GDB local rígida a referencia histórica o respaldo técnico, no a contrato vivo:

```text
D:\Distrito_de_Medellin\Modelo_D_Terreno\MDT_Terreno_Base\MDT_Terreno_Base.gdb
```

La GDB puede conservarse como origen técnico o respaldo de trazabilidad, pero no como dependencia madura directa del motor ni de la App.

## 5. Verdad madura esperada

La verdad geomorfológica madura para HidroFlow debe residir en una capa portable, validable y consumible:

```text
05_PROYECTOS/<Fuente_Hidrica>/manifesto.proyecto.json
06_EXPORTACIONES/<Fuente_Hidrica>/
parametros_geomorfologicos_canonicos.json
parametros_geomorfologicos_canonicos.csv
```

Esta capa debe ser la frontera entre el Módulo 1 de Geomorfología y el motor HidroFlow.

## 6. Contrato motor-consumidor

El motor HidroFlow no debe consumir objetos espaciales crudos ni depender directamente de ArcGIS Pro, FileGDB o rutas locales.

El motor debe consumir parámetros geomorfológicos normalizados y validados mediante un contrato explícito.

Campos candidatos iniciales del contrato:

```text
area_km2
perimetro_km
longitud_cauce_km
longitud_perfil_km
longitud_red_km
densidad_drenaje_km_km2
cota_salida_msnm
cota_cabecera_msnm
desnivel_m
pendiente_media_pct
kc_compacidad
kf_forma
n_tramos_qc
n_quiebres
```

## 7. Consumidores HidroFlow

Los parámetros geomorfológicos canónicos deben alimentar de forma trazable:

```text
motor hidrológico
Tiempo de concentración Tc
SCS-CN
Método Racional
Índice Hidrológico
Comparador Multi-Método
Expediente hidrológico
```

## 8. Fitness functions mínimas

La verdad geomorfológica no será declarada madura si no pasa validaciones automáticas mínimas:

```text
Existe manifiesto de proyecto.
Existe archivo canónico de parámetros.
area_km2 > 0.
longitud_cauce_km > 0.
cota_cabecera_msnm > cota_salida_msnm.
desnivel_m > 0.
pendiente_media_pct > 0.
No hay null en campos obligatorios.
No hay NaN.
Unidades explícitas.
Fuente y fecha de generación registradas.
```

## 9. Lectura arquitectónica

Se establece una frontera clara:

```text
Módulo 1 Geomorfología produce.
Capa canónica valida y normaliza.
Motor HidroFlow consume.
Índice, Comparador y Expediente auditan y visualizan.
```

Esta separación reduce acoplamiento, mejora portabilidad, facilita pruebas y permite evolución controlada.

## 10. Decisión

PRÁCTICA-002A consolida la dirección arquitectónica: HidroFlow maduro debe consumir verdad geomorfológica canónica, no GDB rígida ni documentos históricos ruidosos.

La siguiente fase debe diseñar o materializar el contrato vivo de parámetros geomorfológicos canónicos y sus validaciones automáticas.

## 11. Próximo paso

Abrir una práctica posterior para crear la plantilla canónica de parámetros geomorfológicos y sus fitness functions.

