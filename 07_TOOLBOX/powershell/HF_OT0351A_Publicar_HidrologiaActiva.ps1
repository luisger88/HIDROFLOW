$ErrorActionPreference = "Stop"

$archivo = "D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx"
$backup = "$archivo.bak_OT0351A_hidrologia"

Write-Host "OT-0351A - Publicar casoActivo.hidrologia" -ForegroundColor Cyan

if (!(Test-Path $archivo)) {
  throw "No existe el archivo: $archivo"
}

Copy-Item $archivo $backup -Force
Write-Host "Backup creado: $backup" -ForegroundColor DarkGray

$texto = Get-Content $archivo -Raw

if ($texto -match "casoActivo:\s*\{[\s\S]*?hidrologia\s*:") {
  Write-Host "casoActivo.hidrologia ya existe. No se aplica parche duplicado." -ForegroundColor Yellow
}
else {
  $regex = [regex]'(?s)(casoActivo:\s*\{.*?cuenca:\s*\{.*?longitud_cauce_km:\s*.*?null\s*\r?\n\s*\})(\s*\r?\n\s*\},)'

  if (-not $regex.IsMatch($texto)) {
    throw "No se encontró el bloque casoActivo.cuenca para insertar hidrologia. No se modificó el archivo."
  }

  $bloqueHidrologia = @"

  hidrologia:{
    CN: cnBase,

    CN_base:
      params?.cnBase ??
      params?.CN ??
      cnBase,

    CN_efectivo:
      params?.CN_efectivo ??
      params?.cnEfectivo ??
      cnBase,

    AMC:
      params?.AMC ??
      params?.amcActual ??
      params?.amc ??
      "II",

    S_mm:
      Number(
        (
          25400 /
            Number(params?.CN_efectivo ?? params?.cnEfectivo ?? cnBase) -
          254
        ).toFixed(2)
      ),

    Ia_mm:
      Number(
        (
          0.2 *
          (
            25400 /
              Number(params?.CN_efectivo ?? params?.cnEfectivo ?? cnBase) -
            254
          )
        ).toFixed(2)
      ),

    porcentaje_impermeable:
      Number.isFinite(Number(params?.porcentajeImpermeable))
        ? Number(params.porcentajeImpermeable)
        : 60,

    tc_min:
      getTcState()?.Tc_final ?? null,

    tc_metodos:
      calcTc(params)
  }
"@

  $texto = $regex.Replace(
    $texto,
    {
      param($m)

      $m.Groups[1].Value + "," + $bloqueHidrologia + $m.Groups[2].Value
    },
    1
  )

  Set-Content $archivo $texto -Encoding UTF8

  Write-Host "Parche OT-0351A aplicado: casoActivo.hidrologia publicado." -ForegroundColor Green
}

Write-Host ""
Write-Host "Compilando HidroFlow..." -ForegroundColor Cyan

Push-Location "D:\HidroFlow\01_APP\HIDROFLOW"
npm run build
Pop-Location

Write-Host ""
Write-Host "Resumen git:" -ForegroundColor Cyan
git diff --stat
