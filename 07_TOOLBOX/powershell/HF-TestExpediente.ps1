param(
    [string]$Caso = "TrActivoVsQp",
    [string]$Tr = "",
    [string]$Carpeta = "D:\HidroFlow\10_LOGS\hf-test-expediente"
)

function Obtener-Primera-Linea {
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

function Evaluar-Expediente {
    param(
        [string]$Texto,
        [string]$Etiqueta = "clipboard"
    )

    if ([string]::IsNullOrWhiteSpace($Texto)) {
        Write-Host "FAIL: Texto vacio para $Etiqueta." -ForegroundColor Red
        return $false
    }

    $lineaTr = Obtener-Primera-Linea -Texto $Texto -Patron "Tr activo:"
    $lineaQTr = Obtener-Primera-Linea -Texto $Texto -Patron "Caudal de diseño Q-Tr:"
    $lineaQp = Obtener-Primera-Linea -Texto $Texto -Patron "^\s*Qp:"
    $lineaRatio = Obtener-Primera-Linea -Texto $Texto -Patron "Ratio Vol Q-5 / Vol esperado:"
    $lineaEstado = Obtener-Primera-Linea -Texto $Texto -Patron "^\s*Estado:\s*consistente"

    $tr = Extraer-Numero $lineaTr
    $qtr = Extraer-Numero $lineaQTr
    $qp = Extraer-Numero $lineaQp
    $ratio = Extraer-Numero $lineaRatio

    $esperado = @{
        "25"  = "17,13"
        "50"  = "18,87"
        "100" = "20,62"
    }

    Write-Host ""
    Write-Host "-----------------------------------" -ForegroundColor Cyan
    Write-Host "CASO: $Etiqueta" -ForegroundColor Yellow
    Write-Host "-----------------------------------" -ForegroundColor Cyan
    Write-Host "Tr activo : $tr"
    Write-Host "Q-Tr      : $qtr"
    Write-Host "Qp Q-5    : $qp"
    Write-Host "Ratio     : $ratio"
    Write-Host "Estado    : $lineaEstado"
    Write-Host ""

    if ([string]::IsNullOrWhiteSpace($tr)) {
        Write-Host "FAIL: No se detecto Tr activo." -ForegroundColor Red
        return $false
    }

    if (-not $esperado.ContainsKey($tr)) {
        Write-Host "FAIL: Tr activo no catalogado: $tr" -ForegroundColor Red
        return $false
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
        return $true
    }

    Write-Host "FAIL: Expediente no sincronizado." -ForegroundColor Red

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

    return $false
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "HF-TEST EXPEDIENTE" -ForegroundColor Yellow
Write-Host "Caso: $Caso"
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

if ($Caso -eq "TrActivoVsQp") {

    $texto = Get-Clipboard -Raw

    $ok = Evaluar-Expediente `
        -Texto $texto `
        -Etiqueta "Clipboard"

    if ($ok) {
        exit 0
    }

    exit 1
}

if ($Caso -eq "RegistrarTr") {

    if ([string]::IsNullOrWhiteSpace($Tr)) {
        Write-Host "FAIL: Debes indicar -Tr 25, 50 o 100." -ForegroundColor Red
        exit 1
    }

    if ($Tr -notin @("25", "50", "100")) {
        Write-Host "FAIL: Tr no permitido para esta bateria: $Tr" -ForegroundColor Red
        exit 1
    }

    $texto = Get-Clipboard -Raw

    if ([string]::IsNullOrWhiteSpace($texto)) {
        Write-Host "FAIL: Portapapeles vacio. Copia primero el expediente." -ForegroundColor Red
        exit 1
    }

    $lineaTrRegistro =
        Obtener-Primera-Linea `
            -Texto $texto `
            -Patron "Tr activo:"

    $trDetectado =
        Extraer-Numero `
            -Linea $lineaTrRegistro

    if ($trDetectado -ne $Tr) {
        Write-Host "FAIL: El expediente copiado no corresponde al Tr solicitado." -ForegroundColor Red
        Write-Host "Tr solicitado : $Tr"
        Write-Host "Tr detectado  : $trDetectado"
        exit 1
    }

    $ok =
        Evaluar-Expediente `
            -Texto $texto `
            -Etiqueta "Pre-registro Tr=$Tr"

    if (-not $ok) {
        Write-Host "FAIL: No se registra Tr=$Tr porque el expediente no pasa validacion." -ForegroundColor Red
        exit 1
    }

    New-Item `
        -ItemType Directory `
        -Path $Carpeta `
        -Force | Out-Null

    $ruta =
        Join-Path `
            $Carpeta `
            "Tr$Tr.txt"

    Set-Content `
        -Path $ruta `
        -Value $texto `
        -Encoding UTF8

    Write-Host "PASS: Expediente registrado para Tr=$Tr en:" -ForegroundColor Green
    Write-Host $ruta

    exit 0
}

if ($Caso -eq "MultiTr") {

    $casos = @("25", "50", "100")
    $fallos = 0

    foreach ($t in $casos) {

        $ruta =
            Join-Path `
                $Carpeta `
                "Tr$t.txt"

        if (-not (Test-Path $ruta)) {
            Write-Host "FAIL: No existe archivo de prueba para Tr=$t" -ForegroundColor Red
            Write-Host $ruta
            $fallos++
            continue
        }

        $texto =
            Get-Content `
                -Path $ruta `
                -Raw

        $ok =
            Evaluar-Expediente `
                -Texto $texto `
                -Etiqueta "Tr=$t"

        if (-not $ok) {
            $fallos++
        }
    }

    Write-Host ""
    Write-Host "===================================" -ForegroundColor Cyan
    Write-Host "RESUMEN MULTI-TR" -ForegroundColor Yellow
    Write-Host "===================================" -ForegroundColor Cyan

    if ($fallos -eq 0) {
        Write-Host "PASS: Bateria multi-Tr aprobada." -ForegroundColor Green
        exit 0
    }

    Write-Host "FAIL: Bateria multi-Tr con $fallos fallo(s)." -ForegroundColor Red
    exit 1
}

Write-Host "FAIL: Caso no catalogado: $Caso" -ForegroundColor Red
exit 1

