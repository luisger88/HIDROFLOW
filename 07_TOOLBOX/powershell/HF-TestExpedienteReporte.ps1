param(
    [string]$Carpeta = "D:\HidroFlow\10_LOGS\hf-test-expediente",
    [string]$Salida = "D:\HidroFlow\10_LOGS\hf-test-expediente\HF-TestExpediente-reporte.md"
)

$esperados = @{
    "25"  = "17,13"
    "50"  = "18,87"
    "100" = "20,62"
}

function PrimeraLinea {
    param(
        [string]$Texto,
        [string]$Patron
    )

    return (
        ($Texto -split "`r?`n") |
        Where-Object { $_ -match $Patron } |
        Select-Object -First 1
    )
}

function Numero {
    param(
        [string]$Linea
    )

    if ([string]::IsNullOrWhiteSpace($Linea)) {
        return ""
    }

    if ($Linea -match ":\s*([0-9]+([,.][0-9]+)?)") {
        return $Matches[1]
    }

    if ($Linea -match "([0-9]+([,.][0-9]+)?)") {
        return $Matches[1]
    }

    return ""
}

function Convertir-CeldaMarkdown {
    param(
        [object]$Valor
    )

    if ($null -eq $Valor) {
        return ""
    }

    return ([string]$Valor).Replace("|", "/")
}

$resultados = @()

foreach ($trEsperado in @("25", "50", "100")) {

    $ruta = Join-Path $Carpeta "Tr$trEsperado.txt"

    if (-not (Test-Path $ruta)) {
        $resultados += [PSCustomObject]@{
            Caso = "Tr=$trEsperado"
            Tr = $trEsperado
            QTr = ""
            Qp = ""
            Ratio = ""
            Estado = ""
            Resultado = "FAIL"
            Detalle = "No existe archivo de prueba: $ruta"
        }

        continue
    }

    $texto = Get-Content -Path $ruta -Raw

    $tr = Numero (PrimeraLinea -Texto $texto -Patron "Tr activo:")
    $qtr = Numero (PrimeraLinea -Texto $texto -Patron "Caudal de diseño Q-Tr:")
    $qp = Numero (PrimeraLinea -Texto $texto -Patron "^\s*Qp:")
    $ratio = Numero (PrimeraLinea -Texto $texto -Patron "Ratio Vol Q-5 / Vol esperado:")
    $estadoLinea = PrimeraLinea -Texto $texto -Patron "^\s*Estado:\s*consistente"

    $qEsperado = $esperados[$trEsperado]

    $okTr = $tr -eq $trEsperado
    $okQTr = $qtr -eq $qEsperado
    $okQp = $qp -eq $qEsperado
    $okRatio = $ratio -eq "1.000000" -or $ratio -eq "1,000000"
    $okEstado = -not [string]::IsNullOrWhiteSpace($estadoLinea)

    $detalle = @()

    if (-not $okTr) {
        $detalle += "Tr esperado=$trEsperado detectado=$tr"
    }

    if (-not $okQTr) {
        $detalle += "Q-Tr esperado=$qEsperado detectado=$qtr"
    }

    if (-not $okQp) {
        $detalle += "Qp esperado=$qEsperado detectado=$qp"
    }

    if (-not $okRatio) {
        $detalle += "Ratio esperado=1.000000 detectado=$ratio"
    }

    if (-not $okEstado) {
        $detalle += "Estado consistente no detectado"
    }

    $ok = $okTr -and $okQTr -and $okQp -and $okRatio -and $okEstado

    $resultados += [PSCustomObject]@{
        Caso = "Tr=$trEsperado"
        Tr = $tr
        QTr = $qtr
        Qp = $qp
        Ratio = $ratio
        Estado = if ($okEstado) { "consistente" } else { "" }
        Resultado = if ($ok) { "PASS" } else { "FAIL" }
        Detalle = ($detalle -join "; ")
    }
}

New-Item -ItemType Directory -Path (Split-Path $Salida -Parent) -Force | Out-Null

$fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$lineas = @()
$lineas += "# Reporte HF-TestExpediente"
$lineas += ""
$lineas += "## Metadatos"
$lineas += ""
$lineas += "- Fecha de generacion: $fecha"
$lineas += "- Carpeta de evidencias: $Carpeta"
$lineas += "- Archivo de salida: $Salida"
$lineas += ""
$lineas += "## Resultados"
$lineas += ""
$lineas += "| Caso | Tr | Q-Tr | Qp Q-5 | Ratio | Estado | Resultado | Detalle |"
$lineas += "|---|---:|---:|---:|---:|---|---|---|"

foreach ($r in $resultados) {
    $lineas += "| $(Convertir-CeldaMarkdown $r.Caso) | $(Convertir-CeldaMarkdown $r.Tr) | $(Convertir-CeldaMarkdown $r.QTr) | $(Convertir-CeldaMarkdown $r.Qp) | $(Convertir-CeldaMarkdown $r.Ratio) | $(Convertir-CeldaMarkdown $r.Estado) | $(Convertir-CeldaMarkdown $r.Resultado) | $(Convertir-CeldaMarkdown $r.Detalle) |"
}

$fallos = ($resultados | Where-Object { $_.Resultado -ne "PASS" }).Count

$lineas += ""
$lineas += "## Resumen"
$lineas += ""

if ($fallos -eq 0) {
    $lineas += "Resultado global: **PASS**"
}
else {
    $lineas += "Resultado global: **FAIL**"
    $lineas += "Fallos detectados: $fallos"
}

Set-Content -Path $Salida -Value ($lineas -join "`r`n") -Encoding UTF8

Write-Host ""
Write-Host "Reporte Markdown generado:" -ForegroundColor Green
Write-Host $Salida

if ($fallos -eq 0) {
    Write-Host "PASS: Reporte multi-Tr aprobado." -ForegroundColor Green
    exit 0
}

Write-Host "FAIL: Reporte multi-Tr con $fallos fallo(s)." -ForegroundColor Red
exit 1

