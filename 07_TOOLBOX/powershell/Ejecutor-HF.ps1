param(
    [switch]$DryRun
)

Write-Host ""
Write-Host "=== HIDROFLOW EJECUTOR HARDENED ==="
Write-Host ""

# ==========================================
# CONTEXTO
# ==========================================
$Origen = Get-Location
Write-Host "Directorio inicial:" $Origen

cd D:
Set-Location "D:\HidroFlow"

$Destino = Get-Location
Write-Host "Directorio de ejecución:" $Destino
Write-Host ""

# ==========================================
# VALIDACIONES
# ==========================================
$Errores = @()

if (-not (Test-Path "D:\HidroFlow")) {
    $Errores += "No existe D:\HidroFlow"
}

if (-not (Test-Path "D:\HidroFlow\.git")) {
    $Errores += "No es repositorio Git válido"
}

if ($Errores.Count -gt 0) {
    Write-Host "❌ VALIDACIÓN FALLIDA"
    $Errores | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "✅ Validaciones OK"
Write-Host ""

# ==========================================
# CONFIGURACIÓN
# ==========================================
$BASE = "D:\HidroFlow"
$AUDIT = "$BASE\11_AUDITORIA_PRUEBAS\PRACTICA-001"
$Fecha = Get-Date -Format "yyyyMMdd_HHmmss"
$LOG = "$AUDIT\inventarios\inventario_$Fecha.txt"

New-Item -ItemType Directory -Force -Path "$AUDIT\inventarios" | Out-Null

# ==========================================
# DRY RUN
# ==========================================
if ($DryRun) {
    Write-Host "⚠️ MODO DRY-RUN ACTIVADO (no se escriben archivos)"
}

function Ejecutar {
    param($Comando)

    if ($DryRun) {
        Write-Host "[DRY] $Comando"
    } else {
        Invoke-Expression $Comando
    }
}

# ==========================================
# EJECUCIÓN
# ==========================================
Write-Host "Ejecutando bloques..."
Write-Host ""

if (-not $DryRun) {
    "PRÁCTICA-001 — Inventario HIDROFLOW HARDENED" | Out-File $LOG
    "Fecha: $(Get-Date)" | Out-File $LOG -Append
    "" | Out-File $LOG -Append
}

Ejecutar 'git status --short | Out-File $LOG -Append'
Ejecutar 'git branch --show-current | Out-File $LOG -Append'
Ejecutar 'git log --oneline -n 8 | Out-File $LOG -Append'
Ejecutar 'Get-ChildItem -Recurse "$BASE\06_EXPORTACIONES" -ErrorAction SilentlyContinue | Select FullName | Out-File $LOG -Append'
Ejecutar 'Get-ChildItem -Recurse $BASE | Where-Object { $_.Name -match "Iguana|PC_80|Geomorf" } | Select FullName | Out-File $LOG -Append'

# ==========================================
# RESULTADO
# ==========================================
Write-Host ""
Write-Host "✅ EJECUCIÓN FINALIZADA"

if (-not $DryRun) {
    Write-Host "Archivo generado en:"
    Write-Host $LOG
} else {
    Write-Host "⚠️ DRY-RUN: no se generó archivo"
}

Write-Host ""
