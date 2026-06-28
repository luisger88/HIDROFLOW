param(
    [Parameter(Mandatory)]
    [string]$Nombre,

    [string]$Proyecto = "HIDROFLOW",

    [switch]$Commit
)

$ErrorActionPreference = "Stop"

try {

    $rutaBitacora = "00_ADMIN\bitacora\OT-0365"

    New-Item -ItemType Directory -Force -Path $rutaBitacora | Out-Null

    $rutaArchivo = Join-Path `
        $rutaBitacora `
        "OT-0365A_construccion_agentes_ia.md"

@"
# OT-0365A — Construcción de Agentes IA

## Nombre

$Nombre

## Proyecto

$Proyecto

## Objetivo

Capturar patrones repetitivos de trabajo y convertirlos en herramientas reutilizables.

## Regla fundamental

Si una tarea se repite tres veces:

- crear archivo
- abrir editor
- copiar plantilla
- completar estructura
- guardar
- documentar

la tarea deja de ejecutarse manualmente.

Debe convertirse en herramienta.

## Agente

$Nombre

Fecha:

$(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Estado:

ABIERTO
"@ | Set-Content `
    $rutaArchivo `
    -Encoding UTF8

    Write-Host ""
    Write-Host "AGENTE IA DOCUMENTADO"
    Write-Host $rutaArchivo

    if ($Commit) {

        git add $rutaArchivo

        git commit `
        -m "docs(agentes): registra agente ia $Nombre"

    }

}
catch {

    Write-Host ""
    Write-Host "ERROR:"
    Write-Host $_.Exception.Message

    exit 1
}
