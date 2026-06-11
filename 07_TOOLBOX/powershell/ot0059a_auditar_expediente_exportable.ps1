$ErrorActionPreference = "Stop"

$RutaBitacora = "00_ADMIN\bitacora\OT-0059\OT-0059A_auditoria_estructura_expediente_exportable.md"
$RutaSrc = "01_APP\HIDROFLOW\src"
$Fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

$Archivos = Get-ChildItem -Path $RutaSrc -Recurse -File -Include *.js,*.jsx,*.ts,*.tsx | Where-Object {
    $_.FullName -notmatch "\\node_modules\\" -and
    $_.FullName -notmatch "\\dist\\" -and
    $_.FullName -notmatch "\\build\\"
}

$Patrones = @(
    "Copiar expediente",
    "expediente hidrológico",
    "expediente hidrologico",
    "expediente",
    "sello técnico",
    "sello tecnico",
    "consistencia cruzada",
    "Q-Tr",
    "Q Tr",
    "Q-5",
    "Q5",
    "Método Racional",
    "Metodo Racional",
    "racional",
    "undefined",
    "null",
    "NaN",
    "[object Object]"
)

$Contenido = New-Object System.Collections.Generic.List[string]

$Contenido.Add("# OT-0059A — Auditoría de estructura actual del expediente exportable")
$Contenido.Add("")
$Contenido.Add("Fecha de auditoría: $Fecha")
$Contenido.Add("")
$Contenido.Add("## Estado base")
$Contenido.Add("")
$Contenido.Add("- Rama base: main estabilizado post OT-0058.")
$Contenido.Add("- Último merge post OT-0058 observado: 696f60b.")
$Contenido.Add("- Ciclo reciente cerrado: OT-0056 Q-Tr/expediente/sello, OT-0057 consistencia cruzada exportable y OT-0058 panel visual de consistencia cruzada.")
$Contenido.Add("- Alcance de OT-0059A: auditoría documental y estructural. No se modifica motor hidrológico, fórmulas, cálculo Q-Tr, cálculo Q-5, Método Racional ni consistencia cruzada.")
$Contenido.Add("")
$Contenido.Add("## Tesis técnica")
$Contenido.Add("")
$Contenido.Add("OT-0059A inicia la consolidación del expediente hidrológico como salida técnica verificable. El objetivo no es crear PDF, Word, mapas ni exportaciones documentales complejas, sino auditar la estructura textual/exportable existente para preparar una normalización posterior del contenido en OT-0059B.")
$Contenido.Add("")
$Contenido.Add("## Archivos fuente auditados")
$Contenido.Add("")
$Contenido.Add("Total de archivos JS/JSX/TS/TSX auditados bajo ${RutaSrc}: $($Archivos.Count)")
$Contenido.Add("")

$Contenido.Add("## Inventario de coincidencias por patrón")
$Contenido.Add("")

foreach ($Patron in $Patrones) {
    $Matches = Select-String -Path $Archivos.FullName -Pattern $Patron -SimpleMatch -ErrorAction SilentlyContinue

    $Contenido.Add("### Patrón: ``$Patron``")
    $Contenido.Add("")

    if ($Matches) {
        $ResumenArchivos = $Matches | Group-Object Path | Sort-Object Count -Descending | Select-Object -First 12

        foreach ($Grupo in $ResumenArchivos) {
            $Relativo = $Grupo.Name.Replace((Get-Location).Path + "\", "")
            $Contenido.Add("- $Relativo — $($Grupo.Count) coincidencia(s)")
        }
    } else {
        $Contenido.Add("- Sin coincidencias.")
    }

    $Contenido.Add("")
}

$Contenido.Add("## Evidencia focalizada de líneas candidatas")
$Contenido.Add("")
$Contenido.Add("Se listan coincidencias limitadas para evitar salida masiva. Esta evidencia orienta la intervención posterior, pero no constituye modificación funcional.")
$Contenido.Add("")

foreach ($Patron in $Patrones) {
    $Matches = Select-String -Path $Archivos.FullName -Pattern $Patron -SimpleMatch -ErrorAction SilentlyContinue | Select-Object -First 20

    $Contenido.Add("### Evidencia para patrón: ``$Patron``")
    $Contenido.Add("")

    if ($Matches) {
        foreach ($Match in $Matches) {
            $Relativo = $Match.Path.Replace((Get-Location).Path + "\", "")
            $Linea = ($Match.Line -replace "\s+", " ").Trim()

            if ($Linea.Length -gt 220) {
                $Linea = $Linea.Substring(0, 220) + "..."
            }

            $Contenido.Add("- ${Relativo}:$($Match.LineNumber) — ``$Linea``")
        }
    } else {
        $Contenido.Add("- Sin evidencia focalizada.")
    }

    $Contenido.Add("")
}

$Contenido.Add("## Lectura técnica preliminar")
$Contenido.Add("")
$Contenido.Add("La auditoría OT-0059A debe permitir confirmar la ubicación real de la construcción textual/exportable del expediente hidrológico mínimo y sus bloques asociados: Q-Tr, Q-5, Método Racional, contraste Q-5 vs Racional, consistencia cruzada, panel visual y sello técnico.")
$Contenido.Add("")
$Contenido.Add("## Restricciones de intervención")
$Contenido.Add("")
$Contenido.Add("- No modificar hidroEngine.js.")
$Contenido.Add("- No modificar fórmulas hidrológicas.")
$Contenido.Add("- No alterar cálculo de lluvia efectiva, Q-Tr, Q-5 ni Método Racional.")
$Contenido.Add("- No abrir generación PDF, Word, mapas ni exportaciones documentales complejas en OT-0059.")
$Contenido.Add("- La intervención posterior debe limitarse a orden, claridad, trazabilidad textual y estado técnico del expediente.")
$Contenido.Add("")
$Contenido.Add("## Criterio de salida de OT-0059A")
$Contenido.Add("")
$Contenido.Add("OT-0059A se considera completa cuando quede documentado el inventario de archivos, patrones y líneas candidatas que soportan la estructura actual del expediente exportable, dejando preparada la normalización técnica de OT-0059B.")
$Contenido.Add("")

Set-Content -Path $RutaBitacora -Value $Contenido -Encoding UTF8

Write-Host ""
Write-Host "OT-0059A generada en:" -ForegroundColor Green
Write-Host $RutaBitacora -ForegroundColor Cyan
Write-Host ""
Get-Content -Path $RutaBitacora -TotalCount 80
