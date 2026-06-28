param(
    [string]$Caso = "TrActivoVsQp"
)

try {
    $texto = Get-Clipboard -Raw
}
catch {
    Write-Host "ERROR: No fue posible leer el portapapeles." -ForegroundColor Red
    exit 1
}

if ([string]::IsNullOrWhiteSpace($texto)) {
    Write-Host "ERROR: Portapapeles vacio. Copia primero el expediente." -ForegroundColor Red
    exit 1
}

function Obtener-Primera-Linea {
    param(
        [string]$Patron
    )

    return (
        ($texto -split "`r?`n") |
        Where-Object { $_ -match $Patron } |
        Select-Object -First 1
    )
}

function Extraer-Numero {
    param(
        [string]$Linea
    )

    if ([string]::IsNullOrWhiteSpace($Linea)) {
        return $null
    }

    if ($Linea -match ":\s*([0-9]+([,.][0-9]+)?)") {
        return $Matches[1]
    }

    if ($Linea -match "([0-9]+([,.][0-9]+)?)") {
        return $Matches[1]
    }

    return $null
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "HF-TEST EXPEDIENTE" -ForegroundColor Yellow
Write-Host "Caso: $Caso"
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$lineaTr = Obtener-Primera-Linea "Tr activo:"
$lineaQTr = Obtener-Primera-Linea "Caudal de diseño Q-Tr:"
$lineaQp = Obtener-Primera-Linea "^\s*Qp:"
$lineaRatio = Obtener-Primera-Linea "Ratio Vol Q-5 / Vol esperado:"
$lineaEstado = Obtener-Primera-Linea "^\s*Estado:\s*consistente"

$tr = Extraer-Numero $lineaTr
$qtr = Extraer-Numero $lineaQTr
$qp = Extraer-Numero $lineaQp
$ratio = Extraer-Numero $lineaRatio

Write-Host "Lectura detectada:"
Write-Host "Tr activo : $tr"
Write-Host "Q-Tr      : $qtr"
Write-Host "Qp Q-5    : $qp"
Write-Host "Ratio     : $ratio"
Write-Host "Estado    : $lineaEstado"
Write-Host ""

if ($Caso -ne "TrActivoVsQp") {
    Write-Host "FAIL: Caso no catalogado: $Caso" -ForegroundColor Red
    exit 1
}

$esperado = @{
    "25"  = "17,13"
    "50"  = "18,87"
    "100" = "20,62"
}

if ([string]::IsNullOrWhiteSpace($tr)) {
    Write-Host "FAIL: No se detecto Tr activo." -ForegroundColor Red
    exit 1
}

if (-not $esperado.ContainsKey($tr)) {
    Write-Host "FAIL: Tr activo no catalogado: $tr" -ForegroundColor Red
    exit 1
}

$qEsperado = $esperado[$tr]

$okQTr = $qtr -eq $qEsperado
$okQp = $qp -eq $qEsperado
$okRatio = $ratio -eq "1.000000" -or $ratio -eq "1,000000"
$okEstado = -not [string]::IsNullOrWhiteSpace($lineaEstado)

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
