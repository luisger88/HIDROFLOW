$ErrorActionPreference = "Stop"

$archivo = "D:\HidroFlow\01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
$backup = "$archivo.bak_OT0351B_hidrologiaActiva"

Write-Host "OT-0351B - Crear adaptador hidrologiaActiva" -ForegroundColor Cyan

if (!(Test-Path $archivo)) {
  throw "No existe el archivo: $archivo"
}

Copy-Item $archivo $backup -Force
Write-Host "Backup creado: $backup" -ForegroundColor DarkGray

$texto = Get-Content $archivo -Raw

if ($texto -match "const\s+hidrologiaActiva\s*=") {
  Write-Host "hidrologiaActiva ya existe. No se aplica parche duplicado." -ForegroundColor Yellow
}
else {
  $regex = [regex]'(?s)(const\s+cuencaActiva\s*=\s*\{.*?\};)'

  if (-not $regex.IsMatch($texto)) {
    throw "No se encontró el bloque const cuencaActiva = { ... }; No se modificó el archivo."
  }

  $bloque = @"

const hidrologiaActiva = {
  CN:
    contextoBase?.casoActivo?.hidrologia?.CN ??
    contextoBase?.CN,

  CN_base:
    contextoBase?.casoActivo?.hidrologia?.CN_base ??
    contextoBase?.CN_base ??
    contextoBase?.CN,

  CN_efectivo:
    contextoBase?.casoActivo?.hidrologia?.CN_efectivo ??
    contextoBase?.CN_efectivo ??
    contextoBase?.cn_efectivo ??
    contextoBase?.CN,

  AMC:
    contextoBase?.casoActivo?.hidrologia?.AMC ??
    contextoBase?.AMC ??
    contextoBase?.amcActual ??
    contextoBase?.amc,

  S_mm:
    contextoBase?.casoActivo?.hidrologia?.S_mm ??
    contextoBase?.S_mm ??
    contextoBase?.s_mm,

  Ia_mm:
    contextoBase?.casoActivo?.hidrologia?.Ia_mm ??
    contextoBase?.Ia_mm ??
    contextoBase?.ia_mm,

  porcentaje_impermeable:
    contextoBase?.casoActivo?.hidrologia?.porcentaje_impermeable ??
    contextoBase?.porcentaje_impermeable,

  tc_min:
    contextoBase?.casoActivo?.hidrologia?.tc_min ??
    contextoBase?.q_tr_activo_estado?.q_tr_activo?.tc_min ??
    contextoBase?.q_tr_activo_estado?.tc_min ??
    contextoBase?.tc_min,

  tc_metodos:
    contextoBase?.casoActivo?.hidrologia?.tc_metodos ??
    contextoBase?.tc_metodos ??
    []
};
"@

  $texto = $regex.Replace(
    $texto,
    {
      param($m)
      $m.Groups[1].Value + $bloque
    },
    1
  )

  Set-Content $archivo $texto -Encoding UTF8

  Write-Host "Parche OT-0351B aplicado: hidrologiaActiva creado." -ForegroundColor Green
}

Write-Host ""
Write-Host "Compilando HidroFlow..." -ForegroundColor Cyan

Push-Location "D:\HidroFlow\01_APP\HIDROFLOW"
npm run build
Pop-Location

Write-Host ""
Write-Host "Resumen git:" -ForegroundColor Cyan
git diff --stat
