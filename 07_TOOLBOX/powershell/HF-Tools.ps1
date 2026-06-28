function HF-Trace {
    param([string]$Simbolo)

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-Trace.ps1" `
    -Simbolo $Simbolo
}

function HF-Impact {
    param([string]$Simbolo)

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-Impact.ps1" `
    -Simbolo $Simbolo
}

function HF-Patch {
    param([string]$Problema)

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-PATCH.ps1" `
    -Problema $Problema
}