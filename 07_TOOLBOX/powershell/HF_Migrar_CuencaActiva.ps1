$archivo = "D:\HidroFlow\01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"

$texto = Get-Content $archivo -Raw

$texto = $texto.Replace(
    "contextoBase.area_km2",
    "cuencaActiva.area_km2"
)

$texto = $texto.Replace(
    "contextoBase.longitud_cauce_km",
    "cuencaActiva.longitud_cauce_km"
)

$texto = $texto.Replace(
    "contextoBase.pendiente_media_pct",
    "cuencaActiva.pendiente_media_pct"
)

Set-Content $archivo $texto -Encoding UTF8

Write-Host "Parche aplicado correctamente."
