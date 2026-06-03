@'
@echo off
chcp 65001 > nul
title HidroFlow - App Web

REM ============================================================
REM Run_HidroFlow_App.bat
REM Lanzador seguro de la aplicacion HidroFlow
REM ============================================================

set "HIDROFLOW_APP=D:\HIDROFLOW\01_APP\HIDROFLOW"

echo ========================================
echo HIDROFLOW - APP WEB
echo ========================================
echo.
echo Carpeta app:
echo %HIDROFLOW_APP%
echo.

cd /d "%HIDROFLOW_APP%"

if not exist "package.json" (
    echo ERROR: No se encontro package.json en la carpeta de la app.
    echo Ruta revisada: %HIDROFLOW_APP%
    pause
    exit /b 1
)

echo Validando Node.js...
node -v
if errorlevel 1 (
    echo ERROR: Node.js no esta disponible en PATH.
    pause
    exit /b 1
)

echo.
echo Validando npm...
call npm -v
if errorlevel 1 (
    echo ERROR: npm no esta disponible en PATH.
    pause
    exit /b 1
)

echo.
if not exist "node_modules" (
    echo node_modules no existe. Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERROR: fallo npm install.
        pause
        exit /b 1
    )
) else (
    echo node_modules existe. Se reutilizan dependencias.
)

echo.
echo ========================================
echo Lanzando HidroFlow App...
echo ========================================
echo.
echo Si Vite inicia correctamente, se mostrara una URL local.
echo.
call npm run dev

echo.
echo La aplicacion finalizo o el servidor fue detenido.
pause
'@ | Set-Content -Path "D:\HIDROFLOW\02_CORE\run\Run_HidroFlow_App.bat" -Encoding ASCII

Write-Host "OK: Run_HidroFlow_App.bat reparado"
Get-Item "D:\HIDROFLOW\02_CORE\run\Run_HidroFlow_App.bat" | Select-Object FullName, Length, LastWriteTime