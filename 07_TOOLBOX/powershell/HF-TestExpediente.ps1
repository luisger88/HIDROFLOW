param(
    [string]$Caso = "TrActivoVsQp"
)

$texto = Get-Clipboard -Raw

if ([string]::IsNullOrWhiteSpace($texto)) {
    Write-Host "ERROR: El portapapeles esta vacio o no contiene texto plano." -ForegroundColor Red
    Write-Host ""
    Write-Host "Accion requerida:" -ForegroundColor Yellow
    Write-Host "1. En HidroFlow, seleccionar Tr=25, 50 o 100."
    Write-Host "2. Presionar Copiar expediente hidrologico minimo."
    Write-Host "3. Ejecutar nuevamente HF-TestExpediente."
    exit 1
}

function Obtener-ValorLinea {
    param(
        [string]$Texto,
        [string]$Patron
    )

    $linea = ($Texto -split "`r?`n") |
        Where-Object { $_ -match $Patron } |
        Select-Object -First 1

    if (-not $linea) {
        return $null
    }

    return $linea
}

function Extraer-Numero {
    param(
        [string]$Linea
    )

    if ([string]::IsNullOrWhiteSpace($Linea)) {
        return $null
    }

    $m = [regex]::Match(
        $Linea,
        "([0-9]+([,.][0-9]+)?)"
    )

    if (-not $m.Success) {
        return $null
    }

    return $m.Value
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "HF-TEST EXPEDIENTE" -ForegroundColor Yellow
Write-Host "Caso: $Caso"
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$lineaTr =
    Obtener-ValorLinea `
        $texto `
        "Tr activo:"

$lineaQTr =
    Obtener-ValorLinea `
        $texto `
        "Caudal de diseño Q-Tr:"

$lineaQp =
    Obtener-ValorLinea `
        $texto `
        "^Qp:"

$lineaRatio =
    Obtener-ValorLinea `
        $texto `
        "Ratio Vol Q-5 / Vol esperado:"

$lineaEstadoConsistente =
    Obtener-ValorLinea `
        $texto `
        "^Estado:\s*consistente"

$tr =
    Extraer-Numero `
        $lineaTr

$qtr =
    Extraer-Numero `
        $lineaQTr

$qp =
    Extraer-Numero `
        $lineaQp

$ratio =
    Extraer-Numero `
        $lineaRatio

Write-Host "Lectura detectada:"
Write-Host "Tr activo : $tr"
Write-Host "Q-Tr      : $qtr"
Write-Host "Qp Q-5    : $qp"
Write-Host "Ratio     : $ratio"
Write-Host "Estado    : $lineaEstadoConsistente"
Write-Host ""

$esperado = @{
    "25"  = "17,13"
    "50"  = "18,87"
    "100" = "20,62"
}

if ($Caso -eq "TrActivoVsQp") {

    if ([string]::IsNullOrWhiteSpace($tr)) {
        Write-Host "FAIL: No se detecto Tr activo en el expediente copiado." -ForegroundColor Red
        exit 1
    }

    if (-not $esperado.ContainsKey($tr)) {
        Write-Host "FAIL: Tr activo no catalogado para esta prueba: $tr" -ForegroundColor Red
        exit 1
    }

    $qEsperado =
        $esperado[$tr]

    $okQTr =
        $qtr -eq $qEsperado

    $okQp =
        $qp -eq $qEsperado

    $okRatio =
        $ratio -eq "1.000000" -or
        $ratio -eq "1,000000"

    $okEstado =
        -not [string]::IsNullOrWhiteSpace($lineaEstadoConsistente)

    Write-Host "Validacion esperada:"
    Write-Host "Tr=$tr -> Q esperado=$qEsperado"
    Write-Host ""

    if ($okQTr -and $okQp -and $okRatio -and $okEstado) {
        Write-Host "PASS: Expediente sincronizado Tr activo <-> Q-Tr <-> Q-5." -ForegroundColor Green
        exit 0
    }

    Write-Host "FAIL: Expediente no sincronizado." -ForegroundColor Red
    Write-Host ""

    if (-not $okQTr) {
        Write-Host "- Q-Tr esperado: $qEsperado ; detectado: $qtr" -ForegroundColor Red
    }

    if (-not $okQp) {
        Write-Host "- Qp esperado: $qEsperado ; detectado: $qp" -ForegroundColor Red
    }

    if (-not $okRatio) {
        Write-Host "- Ratio esperado: 1.000000 ; detectado: $ratio" -ForegroundColor Red
    }

    if (-not $okEstado) {
        Write-Host "- Estado consistente no detectado." -ForegroundColor Red
    }

    exit 1
}

Write-Host "Caso no catalogado: $Caso" -ForegroundColor Red
exit 1
