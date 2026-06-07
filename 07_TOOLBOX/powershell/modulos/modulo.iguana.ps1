param($BASE, $LOG, $DryRun)

function Ejecutar {
    param($cmd)
    if ($DryRun) { Write-Host "[DRY] $cmd" } else { Invoke-Expression $cmd }
}

Ejecutar 'Get-ChildItem -Recurse $BASE | Where-Object { $_.Name -match "Iguana|PC_80|Geomorf" } | Select FullName | Out-File $LOG -Append'
