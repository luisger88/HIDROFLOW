$ErrorActionPreference = "Stop"

Write-Host "OT-0352 - Validacion CASO_ACTIVO San Antonio" -ForegroundColor Cyan

$raiz = "D:\HidroFlow"
$hidroFlow = "$raiz\01_APP\HIDROFLOW\src\HidroFlow.jsx"
$comparador = "$raiz\01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
$indice = "$raiz\01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx"
$catalogo = "$raiz\01_APP\HIDROFLOW\src\data\cuencasCatalogo.js"

$errores = @()

function CheckFile($ruta, $nombre) {
  if (!(Test-Path $ruta)) {
    $script:errores += "No existe: $nombre"
  } else {
    Write-Host "OK archivo: $nombre" -ForegroundColor Green
  }
}

function CheckContains($ruta, $texto, $descripcion) {
  $contenido = Get-Content $ruta -Raw
  if ($contenido.Contains($texto)) {
    Write-Host "OK: $descripcion" -ForegroundColor Green
  } else {
    $script:errores += "Falta: $descripcion"
  }
}

Write-Host ""
Write-Host "1. Archivos base" -ForegroundColor Cyan
CheckFile $hidroFlow "HidroFlow.jsx"
CheckFile $comparador "ComparadorMultiMetodo.jsx"
CheckFile $indice "IndiceHidrologico.jsx"
CheckFile $catalogo "cuencasCatalogo.js"

Write-Host ""
Write-Host "2. Catalogo San Antonio" -ForegroundColor Cyan
CheckContains $catalogo 'export const CUENCA_DEFAULT_ID = "san_antonio_prado";' 'CUENCA_DEFAULT_ID = san_antonio_prado'
CheckContains $catalogo 'nombre_cuenca: "Cuenca San Antonio"' 'nombre_cuenca San Antonio'

Write-Host ""
Write-Host "3. CASO_ACTIVO en HidroFlow.jsx" -ForegroundColor Cyan
CheckContains $hidroFlow 'casoActivo:{' 'casoActivo publicado'
CheckContains $hidroFlow 'tipo:"CASO_HIDROLOGICO"' 'tipo CASO_HIDROLOGICO'
CheckContains $hidroFlow 'cuenca:{' 'casoActivo.cuenca publicado'
CheckContains $hidroFlow 'params?.nombre_cuenca ??' 'nombre_cuenca usado por publicador'
CheckContains $hidroFlow 'hidrologia:{' 'casoActivo.hidrologia publicado'
CheckContains $hidroFlow 'CN_efectivo:' 'hidrologia.CN_efectivo publicado'
CheckContains $hidroFlow 'tc_metodos:' 'hidrologia.tc_metodos publicado'

Write-Host ""
Write-Host "4. Adaptadores en Comparador" -ForegroundColor Cyan
CheckContains $comparador 'const cuencaActiva = {' 'cuencaActiva existe'
CheckContains $comparador 'const hidrologiaActiva = {' 'hidrologiaActiva existe'
CheckContains $comparador 'cuencaActiva.area_km2' 'consume cuencaActiva.area_km2'
CheckContains $comparador 'cuencaActiva.pendiente_media_pct' 'consume cuencaActiva.pendiente_media_pct'
CheckContains $comparador 'hidrologiaActiva.CN' 'consume hidrologiaActiva.CN'
CheckContains $comparador 'hidrologiaActiva.CN_efectivo' 'consume hidrologiaActiva.CN_efectivo'
CheckContains $comparador 'hidrologiaActiva.AMC' 'consume hidrologiaActiva.AMC'

Write-Host ""
Write-Host "5. Indice Hidrologico" -ForegroundColor Cyan
CheckContains $indice 'contexto?.casoActivo?.cuenca?.nombre ??' 'Indice lee casoActivo.cuenca.nombre'

Write-Host ""
Write-Host "6. Resultado validacion estatica" -ForegroundColor Cyan
if ($errores.Count -gt 0) {
  Write-Host "VALIDACION FALLIDA" -ForegroundColor Red
  $errores | ForEach-Object { Write-Host "- $_" -ForegroundColor Red }
  throw "OT-0352 fallo."
}

Write-Host "VALIDACION ESTATICA OK" -ForegroundColor Green

Write-Host ""
Write-Host "7. Build HidroFlow" -ForegroundColor Cyan
Push-Location "$raiz\01_APP\HIDROFLOW"
npm run build
Pop-Location

Write-Host ""
Write-Host "8. Git status" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "9. Git diff stat" -ForegroundColor Cyan
git diff --stat

Write-Host ""
Write-Host "OT-0352 validacion terminada correctamente." -ForegroundColor Green
