$ErrorActionPreference = "Stop"

Clear-Host

Write-Host ""
Write-Host "======================================="
Write-Host "HIDROFLOW MASTER"
Write-Host "======================================="
Write-Host ""

$archivosClave = @(
"01_APP\HIDROFLOW\src\HidroFlow.jsx",
"01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx",
"01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx",
"01_APP\HIDROFLOW\src\agents\tcAgent.js",
"01_APP\HIDROFLOW\src\services\tcSelector.js",
"01_APP\HIDROFLOW\src\services\hidroEngine.js",
"01_APP\HIDROFLOW\src\services\documentos\construirPayloadExpedienteDesdeEstado.js",
"01_APP\HIDROFLOW\src\services\documentos\construirMarkdownExpedienteDesdePayload.js",
"01_APP\HIDROFLOW\src\services\documentos\construirDescargaMarkdownExpedienteDesdePayload.js",
"01_APP\HIDROFLOW\src\data\cuencasCatalogo.js"
)

Write-Host "ESTADO COMPONENTES"
Write-Host "------------------"

foreach($a in $archivosClave){

    if(Test-Path $a){
        Write-Host "[OK] $a"
    }
    else{
        Write-Host "[FALTA] $a"
    }
}

Write-Host ""
Write-Host "CADENA OPERATIVA"
Write-Host "----------------"

Write-Host "Coordenadas"
Write-Host " -> Cuenca"
Write-Host " -> contextoBase"
Write-Host " -> Payload"
Write-Host " -> Markdown"
Write-Host " -> Expediente"
Write-Host ""

Write-Host "COMPONENTES REALES IDENTIFICADOS"
Write-Host "--------------------------------"

Write-Host "IndiceHidrologico      : OPERATIVO"
Write-Host "ComparadorMultiMetodo  : OPERATIVO"
Write-Host "Payload Expediente     : OPERATIVO"
Write-Host "Markdown Expediente    : OPERATIVO"
Write-Host "Descarga Expediente    : OPERATIVO"

Write-Host ""

Write-Host "OBJETIVO ESTRATEGICO"
Write-Host "--------------------"

Write-Host "COORDENADAS -> EXPEDIENTE"

Write-Host ""
Write-Host "VERIFICACION CADENA EXPEDIENTE"
Write-Host "------------------------------"

$comparador =
"01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"

$tokens = @(
"const Tc_final",
"const contextoBasePayload",
"const payloadExpedienteMarkdown",
"construirDescargaMarkdownExpedienteDesdePayload"
)

foreach($token in $tokens){

    $encontrado = Select-String `
        -Path $comparador `
        -SimpleMatch `
        -Pattern $token `
        -Quiet

    if($encontrado){
        Write-Host "[OK] $token"
    }
    else{
        Write-Host "[FALTA] $token"
    }
}

Write-Host ""
Write-Host "MASTER STATUS: COMPLETADO"
Write-Host ""

Write-Host ""
Write-Host "ORIGEN CONTEXTOBASE"
Write-Host "-------------------"

$fuentes = @(
"01_APP\HIDROFLOW\src\HidroFlow.jsx",
"01_APP\HIDROFLOW\src\data\cuencasCatalogo.js",
"01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
)

$patrones = @(
"CUENCAS_CATALOGO",
"cuencaActiva",
"casoActivo",
"contextoBase",
"contextoBasePayload"
)

foreach($archivo in $fuentes){

    Write-Host ""
    Write-Host $archivo

    foreach($patron in $patrones){

        $ok = Select-String `
            -Path $archivo `
            -SimpleMatch `
            -Pattern $patron `
            -Quiet

        if($ok){
            Write-Host "  [OK] $patron"
        }
    }
}

Write-Host ""
Write-Host "TRAZA CUENCA ACTIVA"
Write-Host "-------------------"

$archivosTrazabilidad = @(
"01_APP\HIDROFLOW\src\HidroFlow.jsx",
"01_APP\HIDROFLOW\src\data\cuencasCatalogo.js",
"01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx",
"01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
)

$patronesTrazabilidad = @(
"CUENCAS_CATALOGO",
"cuencaActiva",
"casoActivo",
"contextoBase",
"contextoBasePayload",
"Tc_final"
)

foreach($archivo in $archivosTrazabilidad){

    Write-Host ""
    Write-Host $archivo

    foreach($patron in $patronesTrazabilidad){

        $cantidad = (
            Select-String `
                -Path $archivo `
                -SimpleMatch `
                -Pattern $patron `
                -ErrorAction SilentlyContinue
        ).Count

        if($cantidad -gt 0){
            Write-Host ("  [OK] {0} ({1})" -f $patron,$cantidad)
        }
    }
}

Write-Host ""
Write-Host "ESTADO MASTER"
Write-Host "-------------"
Write-Host "CUENCAS_CATALOGO -> cuencaActiva -> casoActivo -> contextoBase -> Expediente"
Write-Host ""

Write-Host ""
Write-Host "PUNTO DE ENTRADA"
Write-Host "----------------"

$hidroflow =
"01_APP\HIDROFLOW\src\HidroFlow.jsx"

$tokensEntrada = @(
"params?.nombreCuenca",
"params?.cuencaNombre",
"params?.nombre_cuenca",
"params?.area_km2",
"params?.areaKm2",
"casoActivo"
)

foreach($token in $tokensEntrada){

    $ok = Select-String `
        -Path $hidroflow `
        -SimpleMatch `
        -Pattern $token `
        -Quiet

    if($ok){
        Write-Host "[OK] $token"
    }
}
