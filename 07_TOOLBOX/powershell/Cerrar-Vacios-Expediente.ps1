$ErrorActionPreference = "Stop"

try {

    $carpeta = "00_ADMIN\bitacora\OT-0123"

    $archivos = Get-ChildItem `
        $carpeta `
        -Filter "OT-0123B*.md"

    $vacios = @()

    foreach ($archivo in $archivos) {

        $contenido = Get-Content `
            $archivo.FullName `
            -Raw

        $coincidencias = [regex]::Matches(
            $contenido,
            "Pendiente",
            "IgnoreCase"
        )

        $vacios += [PSCustomObject]@{
            Archivo = $archivo.Name
            Vacios  = $coincidencias.Count
        }
    }

    $salida =
        "00_ADMIN\bitacora\OT-0123\OT-0123C_inventario_vacios_expediente.md"

    $md = @()

    $md += "# OT-0123C — Inventario automático de vacíos"
    $md += ""
    $md += "Fecha:"
    $md += ""
    $md += (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    $md += ""
    $md += "| Archivo | Vacíos detectados |"
    $md += "|----------|----------|"

    foreach ($fila in $vacios) {

        $md += "| $($fila.Archivo) | $($fila.Vacios) |"

    }

    $total =
        ($vacios | Measure-Object Vacios -Sum).Sum

    $md += ""
    $md += "## Resumen"
    $md += ""
    $md += "Vacíos totales detectados: $total"

    $md | Set-Content `
        $salida `
        -Encoding UTF8

    git add $salida

    git commit `
        -m "docs(expediente): actualiza consolidado automatico vacios"

    Write-Host ""
    Write-Host "INVENTARIO ACTUALIZADO"
    Write-Host ""
    Write-Host "Vacíos detectados: $total"
    Write-Host ""

}
catch {

    Write-Host ""
    Write-Host "ERROR:"
    Write-Host $_.Exception.Message
    Write-Host ""

    exit 1
}
