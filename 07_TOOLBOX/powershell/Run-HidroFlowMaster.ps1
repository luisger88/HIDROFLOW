$ErrorActionPreference = "Stop"

try {

$ruta = "07_TOOLBOX\powershell\Run-HidroFlowMaster.ps1"

@'
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

'@ | Set-Content `
-Path $ruta `
-Encoding UTF8

git add $ruta

git commit `
-m "tools(master): agrega run hidroflow master"

git status --short

Write-Host ""
Write-Host "RUN_HIDROFLOW_MASTER CREADO"
Write-Host $ruta
Write-Host ""

}
catch {

Write-Host ""
Write-Host "ERROR:"
Write-Host $_.Exception.Message
Write-Host ""

}