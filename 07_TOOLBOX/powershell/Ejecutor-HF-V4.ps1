param(
    [switch]$DryRun,
    [string]$Modulo = "",
    [string]$Practica = "PRACTICA-001"
)

Write-Host ""
Write-Host "=== HIDROFLOW EJECUTOR V4 ==="
Write-Host ""

# ============================================================
# 00. CONTEXTO OPERATIVO
# ============================================================

$Origen = Get-Location
Write-Host "Directorio inicial:" $Origen

cd D:
Set-Location "D:\HidroFlow"

$Destino = Get-Location

$BASE = "D:\HidroFlow"
$Fecha = Get-Date -Format "yyyyMMdd_HHmmss"

$AUDIT = "$BASE\11_AUDITORIA_PRUEBAS\$Practica"
$INV_DIR = "$AUDIT\inventarios"
$BIT_DIR = "$BASE\00_ADMIN\bitacora\$Practica"

$LOG = "$INV_DIR\inventario_V4_$Fecha.txt"
$BITACORA = "$BIT_DIR\bitacora_V4_$Fecha.md"

Write-Host "Directorio de ejecución:" $Destino
Write-Host "Práctica:" $Practica
Write-Host ""

# ============================================================
# 01. FITNESS FUNCTIONS / VALIDACIONES
# ============================================================

$Errores = @()

if (-not (Test-Path $BASE)) {
    $Errores += "No existe ruta base: $BASE"
}

if (-not (Test-Path "$BASE\.git")) {
    $Errores += "No existe repositorio Git válido en: $BASE"
}

if (-not (Test-Path "$BASE\07_TOOLBOX\powershell\modulos")) {
    $Errores += "No existe carpeta de módulos: $BASE\07_TOOLBOX\powershell\modulos"
}

if ($Errores.Count -gt 0) {
    Write-Host "❌ VALIDACIÓN FALLIDA"
    $Errores | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "✅ Validaciones OK"
Write-Host ""

# ============================================================
# 02. CONFIGURACIÓN DE MÓDULOS
# ============================================================

$MAPA = [ordered]@{
    "git"            = "$BASE\07_TOOLBOX\powershell\modulos\modulo.git.ps1"
    "exportaciones"  = "$BASE\07_TOOLBOX\powershell\modulos\modulo.exportaciones.ps1"
    "iguana"         = "$BASE\07_TOOLBOX\powershell\modulos\modulo.iguana.ps1"
}

# ============================================================
# 03. NORMALIZACIÓN ROBUSTA DE MÓDULOS
# Acepta:
# - sin módulo
# - -Modulo git
# - -Modulo git,exportaciones,iguana
# - -Modulo "git,exportaciones,iguana"
# ============================================================

$ModulosNormalizados = @()

if ([string]::IsNullOrWhiteSpace($Modulo)) {

    $ModulosNormalizados = @($MAPA.Keys)

} else {

    $partes = $Modulo.Split(",", [System.StringSplitOptions]::RemoveEmptyEntries)

    foreach ($p in $partes) {
        $valor = $p.Trim().ToLower()
        if (-not [string]::IsNullOrWhiteSpace($valor)) {
            $ModulosNormalizados += $valor
        }
    }
}

# Eliminar duplicados conservando orden
$ModuloFinal = @()

foreach ($m in $ModulosNormalizados) {
    if ($ModuloFinal -notcontains $m) {
        $ModuloFinal += $m
    }
}

Write-Host "Módulos seleccionados:" ($ModuloFinal -join ", ")
Write-Host ""

# ============================================================
# 04. DRY RUN
# ============================================================

if ($DryRun) {
    Write-Host "⚠️ DRY-RUN ACTIVADO"
    Write-Host "No se generará inventario ni bitácora."
    Write-Host ""
}

# ============================================================
# 05. PREPARACIÓN DE SALIDAS
# ============================================================

if (-not $DryRun) {
    New-Item -ItemType Directory -Force -Path $INV_DIR | Out-Null
    New-Item -ItemType Directory -Force -Path $BIT_DIR | Out-Null

    "HIDROFLOW — INVENTARIO V4" | Out-File $LOG -Encoding UTF8
    "Fecha: $(Get-Date)" | Out-File $LOG -Encoding UTF8 -Append
    "Práctica: $Practica" | Out-File $LOG -Encoding UTF8 -Append
    "Directorio inicial: $Origen" | Out-File $LOG -Encoding UTF8 -Append
    "Directorio de ejecución: $Destino" | Out-File $LOG -Encoding UTF8 -Append
    "Módulos seleccionados: $($ModuloFinal -join ', ')" | Out-File $LOG -Encoding UTF8 -Append
    "" | Out-File $LOG -Encoding UTF8 -Append
}

# ============================================================
# 06. EJECUCIÓN MODULAR
# ============================================================

$ModulosEjecutados = @()
$ModulosNoReconocidos = @()
$ModulosNoEncontrados = @()

foreach ($m in $ModuloFinal) {

    if ($MAPA.Contains($m)) {

        $RutaModulo = $MAPA[$m]

        if (-not (Test-Path $RutaModulo)) {
            Write-Host "⚠️ Módulo configurado pero no encontrado:" $m
            Write-Host "   Ruta esperada:" $RutaModulo
            $ModulosNoEncontrados += $m
            continue
        }

        Write-Host "→ Ejecutando módulo:" $m
        $ModulosEjecutados += $m

        if ($m -eq "git") {
            & $RutaModulo $LOG $DryRun
        } else {
            & $RutaModulo $BASE $LOG $DryRun
        }

    } else {
        Write-Host "⚠️ Módulo no reconocido:" $m
        $ModulosNoReconocidos += $m
    }
}

# ============================================================
# 07. BITÁCORA AUTOMÁTICA
# ============================================================

if (-not $DryRun) {

    $Rama = ""
    $Head = ""

    try {
        $Rama = git branch --show-current
    } catch {
        $Rama = "NO_DISPONIBLE"
    }

    try {
        $Head = git rev-parse --short HEAD
    } catch {
        $Head = "NO_DISPONIBLE"
    }

@"
# HIDROFLOW — Bitácora automática V4

## Identificación

- Fecha: $(Get-Date)
- Práctica: $Practica
- Ejecutor: Ejecutor-HF-V4.ps1
- Directorio inicial: $Origen
- Directorio de ejecución: $Destino

## Git

- Rama: $Rama
- HEAD: $Head

## Módulos

- Solicitados: $($ModuloFinal -join ', ')
- Ejecutados: $($ModulosEjecutados -join ', ')
- No reconocidos: $($ModulosNoReconocidos -join ', ')
- No encontrados: $($ModulosNoEncontrados -join ', ')

## Salidas

- Inventario: $LOG
- Bitácora: $BITACORA

## Estado

Ejecución completada por Ejecutor-HF-V4.

## Nota arquitectónica

Esta bitácora fue generada automáticamente para preservar trazabilidad operativa de HidroFlow.
No modifica fórmulas hidrológicas, motor, UI ni productos geomorfológicos.
"@ | Out-File $BITACORA -Encoding UTF8
}

# ============================================================
# 08. RESULTADO
# ============================================================

Write-Host ""
Write-Host "✅ EJECUTOR V4 FINALIZADO"

if ($DryRun) {
    Write-Host "⚠️ DRY-RUN: sin archivo"
} else {
    Write-Host "Inventario generado en:"
    Write-Host $LOG
    Write-Host ""
    Write-Host "Bitácora generada en:"
    Write-Host $BITACORA
}

Write-Host ""
