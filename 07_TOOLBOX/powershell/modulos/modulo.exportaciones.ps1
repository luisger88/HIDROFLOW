param($BASE, $LOG, $DryRun)

function Ejecutar {
    param($cmd)
    if ($DryRun) { Write-Host "[DRY] $cmd" } else { Invoke-Expression $cmd }
}

Ejecutar 'Get-ChildItem -Recurse "$BASE\06_EXPORTACIONES" -ErrorAction SilentlyContinue | Select FullName | Out-File $LOG -Append'
