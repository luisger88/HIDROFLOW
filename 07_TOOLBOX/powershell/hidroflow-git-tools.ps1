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
