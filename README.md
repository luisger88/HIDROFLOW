# HIDROFLOW

Plataforma hidrológica senior para análisis, modelación y trazabilidad técnica de cuencas urbanas y naturales.

## Ruta local oficial

D:\HidroFlow

## Arquitectura base

00_ADMIN          Administración, bitácoras y control técnico
01_APP            Aplicación HidroFlow
01_DEM_HIDRO      Insumos DEM/ráster locales no versionados
02_CORE           Núcleo lógico e hidrológico reusable
03_MODULOS        Módulos técnicos especializados
04_GIS            Insumos y productos GIS locales no versionados
05_PROYECTOS      Configuración de proyectos hidrológicos
06_EXPORTACIONES  Salidas generadas no versionadas
07_TOOLBOX        Herramientas, scripts y automatizaciones
08_ENV            Ambientes y secretos locales
09_LEGACY         Material histórico no activo
10_LOGS           Logs locales

## Regla operativa

omp no manda.
El Auditor Jefe manda.

El agente local inspecciona, diagnostica y propone. Solo modifica cuando la orden sea explícita, acotada y trazable.

## Estado actual

Línea base limpia para continuar HidroFlow desde arquitectura profesional local y GitHub saneado.
