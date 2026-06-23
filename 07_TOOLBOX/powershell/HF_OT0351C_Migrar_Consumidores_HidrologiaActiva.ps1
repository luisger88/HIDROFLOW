$ErrorActionPreference = "Stop"

$archivo = "D:\HidroFlow\01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
$backup = "$archivo.bak_OT0351C_migrar_consumidores_hidrologiaActiva"

Write-Host "OT-0351C - Migrar consumidores hacia hidrologiaActiva" -ForegroundColor Cyan

if (!(Test-Path $archivo)) {
  throw "No existe el archivo: $archivo"
}

Copy-Item $archivo $backup -Force
Write-Host "Backup creado: $backup" -ForegroundColor DarkGray

$texto = Get-Content $archivo -Raw

if ($texto -notmatch "const\s+hidrologiaActiva\s*=") {
  throw "No existe hidrologiaActiva. Ejecuta primero OT-0351B."
}

# Proteger el bloque del adaptador para evitar autorreemplazos dentro de hidrologiaActiva.
$inicio = $texto.IndexOf("const hidrologiaActiva =")
if ($inicio -lt 0) {
  throw "No se encontró el inicio literal de hidrologiaActiva."
}

$fin = $texto.IndexOf("};", $inicio)
if ($fin -lt 0) {
  throw "No se encontró el cierre de hidrologiaActiva."
}

$fin = $fin + 2

$antes = $texto.Substring(0, $fin)
$despues = $texto.Substring($fin)

# Lista ordenada de reemplazos. No usar hashtable: PowerShell trata claves como case-insensitive.
$reemplazos = @(
  @{ buscar = "contextoBase?.CN_efectivo"; reemplazar = "hidrologiaActiva.CN_efectivo" }
  @{ buscar = "contextoBase.CN_efectivo";  reemplazar = "hidrologiaActiva.CN_efectivo" }
  @{ buscar = "contextoBase?.cn_efectivo"; reemplazar = "hidrologiaActiva.CN_efectivo" }
  @{ buscar = "contextoBase.cn_efectivo";  reemplazar = "hidrologiaActiva.CN_efectivo" }

  @{ buscar = "contextoBase?.CN_base"; reemplazar = "hidrologiaActiva.CN_base" }
  @{ buscar = "contextoBase.CN_base";  reemplazar = "hidrologiaActiva.CN_base" }

  @{ buscar = "contextoBase?.AMC";       reemplazar = "hidrologiaActiva.AMC" }
  @{ buscar = "contextoBase.AMC";        reemplazar = "hidrologiaActiva.AMC" }
  @{ buscar = "contextoBase?.amcActual"; reemplazar = "hidrologiaActiva.AMC" }
  @{ buscar = "contextoBase.amcActual";  reemplazar = "hidrologiaActiva.AMC" }
  @{ buscar = "contextoBase?.amc";       reemplazar = "hidrologiaActiva.AMC" }
  @{ buscar = "contextoBase.amc";        reemplazar = "hidrologiaActiva.AMC" }

  @{ buscar = "contextoBase?.S_mm"; reemplazar = "hidrologiaActiva.S_mm" }
  @{ buscar = "contextoBase.S_mm";  reemplazar = "hidrologiaActiva.S_mm" }
  @{ buscar = "contextoBase?.s_mm"; reemplazar = "hidrologiaActiva.S_mm" }
  @{ buscar = "contextoBase.s_mm";  reemplazar = "hidrologiaActiva.S_mm" }

  @{ buscar = "contextoBase?.Ia_mm"; reemplazar = "hidrologiaActiva.Ia_mm" }
  @{ buscar = "contextoBase.Ia_mm";  reemplazar = "hidrologiaActiva.Ia_mm" }
  @{ buscar = "contextoBase?.ia_mm"; reemplazar = "hidrologiaActiva.Ia_mm" }
  @{ buscar = "contextoBase.ia_mm";  reemplazar = "hidrologiaActiva.Ia_mm" }

  @{ buscar = "contextoBase?.porcentaje_impermeable"; reemplazar = "hidrologiaActiva.porcentaje_impermeable" }
  @{ buscar = "contextoBase.porcentaje_impermeable";  reemplazar = "hidrologiaActiva.porcentaje_impermeable" }

  @{ buscar = "contextoBase?.tc_metodos"; reemplazar = "hidrologiaActiva.tc_metodos" }
  @{ buscar = "contextoBase.tc_metodos";  reemplazar = "hidrologiaActiva.tc_metodos" }

  @{ buscar = "contextoBase?.tc_min"; reemplazar = "hidrologiaActiva.tc_min" }
  @{ buscar = "contextoBase.tc_min";  reemplazar = "hidrologiaActiva.tc_min" }

  # CN simple se deja al final para no tocar CN_base ni CN_efectivo antes de tiempo.
  @{ buscar = "contextoBase?.CN"; reemplazar = "hidrologiaActiva.CN" }
  @{ buscar = "contextoBase.CN";  reemplazar = "hidrologiaActiva.CN" }
)

$total = 0

foreach ($par in $reemplazos) {
  $buscar = $par.buscar
  $reemplazar = $par.reemplazar

  $conteo = ([regex]::Matches($despues, [regex]::Escape($buscar))).Count

  if ($conteo -gt 0) {
    Write-Host ("Reemplazos {0}: {1}" -f $buscar, $conteo) -ForegroundColor Yellow
    $despues = $despues.Replace($buscar, $reemplazar)
    $total += $conteo
  }
}

$textoFinal = $antes + $despues

Set-Content $archivo $textoFinal -Encoding UTF8

Write-Host ""
Write-Host ("Total reemplazos aplicados: {0}" -f $total) -ForegroundColor Green

Write-Host ""
Write-Host "Compilando HidroFlow..." -ForegroundColor Cyan

Push-Location "D:\HidroFlow\01_APP\HIDROFLOW"
npm run build
Pop-Location

Write-Host ""
Write-Host "Resumen git:" -ForegroundColor Cyan
git diff --stat
