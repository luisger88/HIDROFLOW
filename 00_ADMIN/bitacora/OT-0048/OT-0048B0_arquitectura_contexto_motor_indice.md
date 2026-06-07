# OT-0048B0 — Arquitectura de alimentación del motor e Índice Hidrológico

## Decisión de arquitectura

HidroFlow debe operar con una cadena clara de alimentación de datos:

Módulo 1 Geomorfología
→ Exportaciones controladas
→ Contrato canónico de cuenca
→ Motor HidroFlow
→ Contexto exportable
→ Índice Hidrológico / Comparador / Expediente.

## Problema

Durante OT-0048 se detectó que el Índice Hidrológico estaba intentando mostrar información que sí existía en otros módulos, pero no llegaba de forma consistente al panel lector.

También se identificó el riesgo de tomar datos desde múltiples puntos de la aplicación sin una estructura formal, lo cual generaría ruido técnico futuro.

## Fuente primaria

La fuente primaria de parámetros geomorfológicos es el Módulo 1 Geomorfología.

Los productos exportados se encuentran en rutas como:

D:\HidroFlow\06_EXPORTACIONES\Iguana\02_Tablas

Allí se almacenan tablas y archivos derivados como parámetros geomorfológicos y punto de control.

## Contrato canónico de cuenca

La aplicación debe normalizar esos insumos en un contrato único de cuenca con campos como:

- id.
- nombre_cuenca.
- punto_control.
- area_km2.
- perimetro_km.
- longitud_cauce_km.
- longitud_cuenca_km.
- pendiente_media_pct.
- cota_max_msnm.
- cota_min_msnm.
- cota_salida_msnm.
- lat_salida.
- lon_salida.
- CN.
- CN_base.
- AMC.
- estacion_idf_activa.
- periodos_retorno.

## Motor HidroFlow

El motor HidroFlow no debe leer datos desde el Índice, el expediente, archivos sueltos ni la interfaz.

El motor debe consumir únicamente el contexto de cuenca normalizado, actualmente representado operativamente por params y el catálogo de cuencas.

## Contexto exportable

Los módulos de cálculo deben publicar resultados al contexto exportable:

- lluvia efectiva total.
- volumen esperado.
- hidrogramas Q-5.
- Método Racional.
- tiempos de concentración.
- Tr global activo.
- sello técnico.
- validaciones.

## Índice Hidrológico

El Índice Hidrológico es un lector vivo del contexto.

No debe recalcular, duplicar fórmulas ni inventar valores.

Debe mostrar información del contexto y declarar explícitamente si un dato está pendiente de publicación.

## Expediente hidrológico

El expediente consume el mismo contexto exportable.

El expediente no debe construirse con datos distintos a los que ve el Índice y el Comparador.

## Regla operativa

Antes de despertar nuevos bloques del Índice, debe verificarse que los datos provengan de:

1. contrato canónico de cuenca;
2. params normalizados;
3. contexto exportable publicado por módulos.

No se permiten lecturas ad hoc desde múltiples rutas sin contrato.

## Aplicación inmediata

La siguiente corrección técnica debe conectar el contexto vivo al Índice Hidrológico desde HidroFlowLayout.jsx, para que el Índice reciba contextoComparador y deje de operar desconectado del motor.

## Estado

Arquitectura definida para guiar OT-0048 y las siguientes OT del Índice Hidrológico.
