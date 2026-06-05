function Ver-EstadoHidroFlow {
  Write-Host ""
  Write-Host "Rama actual:" -ForegroundColor Cyan
  git branch --show-current

  Write-Host ""
  Write-Host "Estado:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Log reciente:" -ForegroundColor Cyan
  git log --oneline -5
}

function Confirmar-Bitacora {
  param(
    [Parameter(Mandatory=$true)]
    [string]$Archivo,

    [Parameter(Mandatory=$true)]
    [string]$Mensaje
  )

  Write-Host ""
  Write-Host "Validando bitacora:" $Archivo -ForegroundColor Cyan

  if (-not (Test-Path -LiteralPath $Archivo)) {
    Write-Host "ERROR: No existe el archivo." -ForegroundColor Red
    return
  }

  Write-Host ""
  Write-Host "Ultimas lineas:" -ForegroundColor Cyan
  Get-Content -LiteralPath $Archivo | Select-Object -Last 8

  Write-Host ""
  Write-Host "Estado antes de add:" -ForegroundColor Cyan
  git status --short

  git add -- $Archivo

  Write-Host ""
  Write-Host "Estado staged:" -ForegroundColor Cyan
  git status --short

  git commit -m $Mensaje
  git push

  Write-Host ""
  Write-Host "Estado final:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Log reciente:" -ForegroundColor Cyan
  git log --oneline -5
}

function Confirmar-CambioFuncional {
  param(
    [Parameter(Mandatory=$true)]
    [string]$Archivo,

    [Parameter(Mandatory=$true)]
    [string]$Mensaje
  )

  Write-Host ""
  Write-Host "Validando cambio funcional:" $Archivo -ForegroundColor Cyan

  if (-not (Test-Path -LiteralPath $Archivo)) {
    Write-Host "ERROR: No existe el archivo." -ForegroundColor Red
    return
  }

  Write-Host ""
  Write-Host "Estado antes de add:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Resumen diff:" -ForegroundColor Cyan
  git diff --stat -- $Archivo

  git add -- $Archivo

  Write-Host ""
  Write-Host "Estado staged:" -ForegroundColor Cyan
  git status --short

  git commit -m $Mensaje
  git push

  Write-Host ""
  Write-Host "Estado final:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Log reciente:" -ForegroundColor Cyan
  git log --oneline -5
}

function Nueva-Bitacora {
  param(
    [Parameter(Mandatory=$true)]
    [string]$Archivo,

    [Parameter(Mandatory=$true)]
    [string]$Contenido,

    [Parameter(Mandatory=$true)]
    [string]$Mensaje
  )

  $carpeta = Split-Path -Path $Archivo -Parent

  if (-not (Test-Path -LiteralPath $carpeta)) {
    New-Item -ItemType Directory -Path $carpeta -Force | Out-Null
  }

  Set-Content -Path $Archivo -Encoding UTF8 -Value $Contenido

  Confirmar-Bitacora -Archivo $Archivo -Mensaje $Mensaje
}

function Sincronizar-MainPostMerge {
  param(
    [string]$RutaApp = "01_APP\HIDROFLOW"
  )

  Write-Host ""
  Write-Host "Sincronizando main local con origin/main..." -ForegroundColor Cyan

  git checkout main
  if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: No se pudo cambiar a main." -ForegroundColor Red
    return
  }

  git pull origin main
  if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: No se pudo actualizar main desde origin/main." -ForegroundColor Red
    return
  }

  Write-Host ""
  Write-Host "Estado despues de pull:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Log reciente en main:" -ForegroundColor Cyan
  git log --oneline -5

  Write-Host ""
  Write-Host "Ejecutando build post-merge..." -ForegroundColor Cyan

  Push-Location $RutaApp
  npm run build
  $buildExitCode = $LASTEXITCODE
  Pop-Location

  if ($buildExitCode -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Build post-merge fallido." -ForegroundColor Red
    return
  }

  Write-Host ""
  Write-Host "Build post-merge aprobado." -ForegroundColor Green

  Write-Host ""
  Write-Host "Estado final:" -ForegroundColor Cyan
  git status --short

  Write-Host ""
  Write-Host "Log final:" -ForegroundColor Cyan
  git log --oneline -5

  Write-Host ""
  Write-Host "main estabilizado post-merge si el estado final esta limpio." -ForegroundColor Green
}
