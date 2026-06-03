@'
@echo off
chcp 65001 > nul
title HidroFlow - Ejecutador Principal

REM ============================================================
REM Run_HidroFlow.bat
REM HidroFlow - Ejecutador principal
REM ============================================================

set HIDROFLOW_ROOT=D:\HIDROFLOW
set PYTHON_NORMAL=python
set PYTHON_ARCGIS=C:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe

set CONFIG_DIR=%HIDROFLOW_ROOT%\02_CORE\config
set AGENTES_DIR=%HIDROFLOW_ROOT%\02_CORE\agentes
set MODULO1_RUN=%HIDROFLOW_ROOT%\03_MODULOS\M01_Geomorfologia\scripts\HFGeomorfologia_Modulo1_Run_v1.py
set EXPORT_IGUANA=%HIDROFLOW_ROOT%\06_EXPORTACIONES\Iguana
set TOOLBOX_DIR=%HIDROFLOW_ROOT%\07_TOOLBOX

:MENU
cls
echo ========================================
echo HIDROFLOW - EJECUTADOR PRINCIPAL
echo ========================================
echo.
echo Raiz: %HIDROFLOW_ROOT%
echo.
echo 1. Validar configuracion HidroFlow
echo 2. Ejecutar Agente Open Geo Engine
echo 3. Ejecutar Agente QA/QC Comparador
echo 4. Ejecutar Agente Configuracion HidroFlow
echo 5. Ejecutar Agente Limpieza y Trazabilidad
echo 6. Ejecutar Modulo 1 Geomorfologia - ArcPy Engine
echo 7. Abrir carpeta de exportaciones Iguana
echo 8. Abrir carpeta raiz HidroFlow
echo 9. Abrir carpeta Toolbox
echo 0. Salir
echo.
set /p opcion=Seleccione una opcion: 

if "%opcion%"=="1" goto VALIDAR_CONFIG
if "%opcion%"=="2" goto AGENTE_OPENGEO
if "%opcion%"=="3" goto AGENTE_QAQC
if "%opcion%"=="4" goto AGENTE_CONFIG
if "%opcion%"=="5" goto AGENTE_LIMPIEZA
if "%opcion%"=="6" goto MODULO1
if "%opcion%"=="7" goto ABRIR_EXPORT
if "%opcion%"=="8" goto ABRIR_RAIZ
if "%opcion%"=="9" goto ABRIR_TOOLBOX
if "%opcion%"=="0" goto SALIR

echo.
echo Opcion no valida.
pause
goto MENU

:VALIDAR_CONFIG
cls
echo ========================================
echo VALIDAR CONFIGURACION HIDROFLOW
echo ========================================
echo.
%PYTHON_NORMAL% "%CONFIG_DIR%\validar_hidroflow_config.py"
echo.
pause
goto MENU

:AGENTE_OPENGEO
cls
echo ========================================
echo AGENTE OPEN GEO ENGINE
echo ========================================
echo.
%PYTHON_NORMAL% "%AGENTES_DIR%\agent_opengeo_engine.py"
echo.
pause
goto MENU

:AGENTE_QAQC
cls
echo ========================================
echo AGENTE QA/QC COMPARADOR
echo ========================================
echo.
%PYTHON_NORMAL% "%AGENTES_DIR%\agent_qa_qc_comparator.py"
echo.
pause
goto MENU

:AGENTE_CONFIG
cls
echo ========================================
echo AGENTE CONFIGURACION HIDROFLOW
echo ========================================
echo.
%PYTHON_NORMAL% "%AGENTES_DIR%\agent_configuracion_hidroflow.py"
echo.
pause
goto MENU

:AGENTE_LIMPIEZA
cls
echo ========================================
echo AGENTE LIMPIEZA Y TRAZABILIDAD
echo ========================================
echo.
%PYTHON_NORMAL% "%AGENTES_DIR%\agent_limpieza_trazabilidad.py"
echo.
pause
goto MENU

:MODULO1
cls
echo ========================================
echo MODULO 1 GEOMORFOLOGIA - ARCPY ENGINE
echo ========================================
echo.
echo Ejecutando con Python de ArcGIS Pro:
echo "%PYTHON_ARCGIS%"
echo.
"%PYTHON_ARCGIS%" "%MODULO1_RUN%"
echo.
pause
goto MENU

:ABRIR_EXPORT
start "" "%EXPORT_IGUANA%"
goto MENU

:ABRIR_RAIZ
start "" "%HIDROFLOW_ROOT%"
goto MENU

:ABRIR_TOOLBOX
start "" "%TOOLBOX_DIR%"
goto MENU

:SALIR
echo.
echo Cerrando HidroFlow.
exit /b 0
'@ | Set-Content -Path "D:\HIDROFLOW\02_CORE\run\Run_HidroFlow.bat" -Encoding ASCII

Write-Host "OK: Run_HidroFlow.bat actualizado"
Write-Host "D:\HIDROFLOW\02_CORE\run\Run_HidroFlow.bat"