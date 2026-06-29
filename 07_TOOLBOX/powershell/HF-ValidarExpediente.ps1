param(
    [string]$Raiz = "D:\HidroFlow",
    [string]$App = "D:\HidroFlow\01_APP\HIDROFLOW"
)

$fallos = 0

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "HF-VALIDAR EXPEDIENTE" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Paso 1/3 — Validando bateria multi-Tr..." -ForegroundColor Yellow

powershell -ExecutionPolicy Bypass `
-File "$Raiz\07_TOOLBOX\powershell\HF-TestExpediente.ps1" `
-Caso "MultiTr"

if ($LASTEXITCODE -ne 0) {
    Write-Host "FAIL: HF-TestExpediente MultiTr fallo." -ForegroundColor Red
    $fallos++
}
else {
    Write-Host "PASS: HF-TestExpediente MultiTr aprobado." -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 2/3 — Generando reporte Markdown..." -ForegroundColor Yellow

powershell -ExecutionPolicy Bypass `
-File "$Raiz\07_TOOLBOX\powershell\HF-TestExpedienteReporte.ps1"

if ($LASTEXITCODE -ne 0) {
    Write-Host "FAIL: HF-TestExpedienteReporte fallo." -ForegroundColor Red
    $fallos++
}
else {
    Write-Host "PASS: Reporte Markdown generado." -ForegroundColor Green
}

Write-Host ""
Write-Host "Paso 3/3 — Ejecutando build Vite..." -ForegroundColor Yellow

Push-Location $App

npm run build

$codigoBuild = $LASTEXITCODE

Pop-Location

if ($codigoBuild -ne 0) {
    Write-Host "FAIL: npm run build fallo." -ForegroundColor Red
    $fallos++
}
else {
    Write-Host "PASS: npm run build aprobado." -ForegroundColor Green
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "RESUMEN HF-VALIDAR EXPEDIENTE" -ForegroundColor Yellow
Write-Host "===================================" -ForegroundColor Cyan

if ($fallos -eq 0) {
    Write-Host "PASS: Expediente validado integralmente." -ForegroundColor Green
    exit 0
}

Write-Host "FAIL: Validacion integral con $fallos fallo(s)." -ForegroundColor Red
exit 1
