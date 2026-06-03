# Agentes tecnicos HidroFlow

Fecha de creacion: 2026-05-24 16:31:55

## Objetivo

Esta carpeta contiene agentes tecnicos para controlar, validar y evolucionar HidroFlow.

Los agentes no reemplazan el flujo operativo actual. Su funcion inicial es documentar, validar, comparar y preparar la transicion controlada entre motores.

## Agentes iniciales

1. Agente Open Geo Engine
2. Agente Comparador QA/QC
3. Agente Configuracion HidroFlow
4. Agente Limpieza y Trazabilidad

## Regla de arquitectura

El motor ArcPy sigue siendo el motor oficial validado.

El motor OpenGeo solo podra reemplazar bloques despues de una comparacion tecnica documentada contra ArcPy.

## Estado actual

Carpeta creada en:

D:\HIDROFLOW\02_CORE\agents

Esta etapa solo crea estructura base. No modifica Run_v1, no modifica GDB, no modifica toolbox.
