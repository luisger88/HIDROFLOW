param($LOG, $DryRun)

function Ejecutar {
    param($cmd)
    if ($DryRun) { Write-Host "[DRY] $cmd" } else { Invoke-Expression $cmd }
}

Ejecutar 'git status --short | Out-File $LOG -Append'
Ejecutar 'git branch --show-current | Out-File $LOG -Append'
Ejecutar 'git log --oneline -n 8 | Out-File $LOG -Append'
