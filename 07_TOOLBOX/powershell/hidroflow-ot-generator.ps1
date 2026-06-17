function Nueva-OTDocumentalHidroFlow {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern("^\d{4}$")]
    [string]$NumeroOT,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$SlugOT,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$TituloOT,

    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Objetivo,

    [string]$ProximoFrente = "",

    [string[]]$Restricciones = @(
      "No modificar motor.",
      "No modificar UI.",
      "No modificar textoExpediente.",
      "No modificar ComparadorMultiMetodo.jsx.",
      "No modificar construirExpedienteHidrologicoMinimo.js."
    )
  )

  $ot = "OT-$NumeroOT"
  $baseDir = Join-Path "00_ADMIN\bitacora" $ot

  New-Item -ItemType Directory -Force -Path $baseDir | Out-Null

  $slugSeguro = $SlugOT.ToLowerInvariant() -replace "[^a-z0-9\-]", "-"
  $slugSeguro = $slugSeguro -replace "-+", "-"
  $slugSeguro = $slugSeguro.Trim("-")

  if ([string]::IsNullOrWhiteSpace($slugSeguro)) {
    throw "SlugOT no produjo un nombre seguro."
  }

  $rutaA = Join-Path $baseDir "$($ot)A_apertura_$slugSeguro.md"
  $rutaC = Join-Path $baseDir "$($ot)C_cierre_$slugSeguro.md"

  if ([string]::IsNullOrWhiteSpace($ProximoFrente)) {
    $proximoTexto = "Pendiente de definir."
  }
  else {
    $proximoTexto = $ProximoFrente
  }

  $lineasA = @(
    "# $($ot)A — $TituloOT",
    "",
    "## Objetivo",
    "",
    $Objetivo,
    "",
    "## Alcance",
    "",
    "Esta OT fue generada mediante Nueva-OTDocumentalHidroFlow como estructura documental mínima.",
    "",
    "No implementa cambios funcionales por sí misma.",
    "",
    "## Restricciones",
    ""
  )

  foreach ($restriccion in $Restricciones) {
    $lineasA += "- $restriccion"
  }

  $lineasA += @(
    "",
    "## Próximo frente recomendado",
    "",
    $proximoTexto
  )

  $lineasC = @(
    "# $($ot)C — Cierre $TituloOT",
    "",
    "## Resultado",
    "",
    "Se creó la estructura documental mínima para la OT.",
    "",
    "## Evidencia principal",
    "",
    "Documento de apertura:",
    "",
    "```text",
    $rutaA,
    "```",
    "",
    "## Alcance mantenido",
    "",
    "No se modificó código funcional.",
    "",
    "## Decisión",
    "",
    "Cualquier avance posterior debe realizarse mediante una OT explícita."
  )

  $lineasA | Set-Content -Path $rutaA -Encoding UTF8
  $lineasC | Set-Content -Path $rutaC -Encoding UTF8

  Write-Output "OT_DOCUMENTAL_GENERADA_OK"
  Write-Output "Apertura: $rutaA"
  Write-Output "Cierre: $rutaC"
  Write-Output ""
  Write-Output "Comandos Git sugeridos:"
  Write-Output "git add `"$rutaA`" `"$rutaC`""
  Write-Output "git commit -m `"docs(tools): documenta $slugSeguro`""
}
