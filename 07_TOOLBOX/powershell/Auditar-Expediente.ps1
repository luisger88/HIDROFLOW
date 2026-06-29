$ErrorActionPreference = "Stop"

try {

$bloques = @(
    "CUENCA",
    "IDF",
    "LLUVIA",
    "CN",
    "TC",
    "HIDROGRAMAS",
    "QTR"
)

$resultado = @()

foreach ($bloque in $bloques) {

    $archivo = Get-ChildItem `
    "00_ADMIN\bitacora\OT-0123" `
    -Filter "OT-0123B$bloque*.md" `
    -ErrorAction SilentlyContinue `
    | Select-Object -First 1

    if (-not $archivo) {

        $resultado += [PSCustomObject]@{
            Bloque = $bloque
            Estado = "NO EXISTE"
        }

        continue
    }

    $texto = Get-Content $archivo.FullName -Raw

    $pendientes = ([regex]::Matches(
        $texto,
        'Pendiente',
        'IgnoreCase'
    )).Count

    $estado = if ($pendientes -eq 0) {
        "COMPLETO"
    }
    else {
        "$pendientes VACIOS"
    }

    $resultado += [PSCustomObject]@{
        Bloque = $bloque
        Estado = $estado
    }
}

$rutaSalida =
"00_ADMIN\bitacora\OT-0123\OT-0123C_inventario_vacios_expediente.md"

$lineas = @()

$lineas += "# OT-0123C — Inventario automático de vacíos"
$lineas += ""
$lineas += "Generado automáticamente."
$lineas += ""
$lineas += "| Bloque | Estado |"
$lineas += "|---------|---------|"

foreach($r in $resultado){

    $lineas += "| $($r.Bloque) | $($r.Estado) |"

}

$lineas | Set-Content `
$rutaSalida `
-Encoding UTF8

git add $rutaSalida

git commit `
-m "docs(expediente): actualiza inventario automatico vacios"

git status --short

Write-Host ""
Write-Host "INVENTARIO GENERADO"
Write-Host $rutaSalida
Write-Host ""

}
catch {

Write-Host ""
Write-Host "ERROR:"
Write-Host $_.Exception.Message
Write-Host ""

exit 1

}
