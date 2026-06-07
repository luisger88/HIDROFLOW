param(
    [switch]$DryRun,
    [string[]]$Modulo,
    [string]$Practica = "PRACTICA-001"
)

Write-Host "=== HIDROFLOW EJECUTOR V2 ==="
Write-Host ""

# ==========================================
# CONTEXTO
# ==========================================
$Origen = Get-Location
Write-Host "Directorio inicial:" $Origen

cd D:
Set-Location "D:\HidroFlow"

$BASE = "D:\HidroFlow"
$AUDIT = "$BASE\11_AUDITORIA_PRUEBAS\$Practica"

$Fecha = Get-Date -Format "yyyyMMdd_HHmmss"
$LOG = "$AUDIT\inventarios\inventario_V2_$Fecha.txt"

New-Item -ItemType Directory -Force -Path "$AUDIT\inventarios" | Out-Null

Write-Host "Directorio de ejecución:" (Get-Location)
Write-Host "Práctica:" $Practica
Write-Host ""

# ==========================================
# DRY RUN
# ==========================================
if ($DryRun) {
    Write-Host "⚠️ DRY-RUN ACTIVADO"
}

# ==========================================
# MAPA DE MÓDULOS
# ==========================================
$MAPA = @{
    "git"            = "$BASE\07_TOOLBOX\powershell\modulos\modulo.git.ps1"
    "exportaciones"  = "$BASE\07_TOOLBOX\powershell\modulos\modulo.exportaciones.ps1"
    "iguana"         = "$BASE\07_TOOLBOX\powershell\modulos\modulo.iguana.ps1"
}

# Si no se especifica módulo → ejecutar todos
if (-not $Modulo) {
    $Modulo = $MAPA.Keys
}

Write-Host "Módulos seleccionados:" ($Modulo -join ", ")
Write-Host ""

# ==========================================
# EJECUCIÓN MODULAR
# ==========================================
foreach ($m in $Modulo) {
    
    if ($MAPA.ContainsKey($m)) {

        Write-Host "→ Ejecutando módulo:" $m

        if ($m -eq "git") {
            & $MAPA[$m] $LOG $DryRun
        } else {
            & $MAPA[$m] $BASE $LOG $DryRun
        }

    } else {
        Write-Host "⚠️ Módulo no reconocido:" $m
    }
}

# ==========================================
# RESULTADO
# ==========================================
Write-Host ""
Write-Host "✅ EJECUTOR V2 FINALIZADO"

if ($DryRun) {
    Write-Host "⚠️ DRY-RUN: sin archivo"
} else {
    Write-Host "Archivo generado en:"
    Write-Host $LOG
}

Write-Host ""
