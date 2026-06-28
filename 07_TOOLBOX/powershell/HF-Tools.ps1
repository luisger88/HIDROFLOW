function HF-Trace {
    param(
        [string]$Simbolo
    )

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-Trace.ps1" `
    -Simbolo $Simbolo
}

function HF-Impact {
    param(
        [string]$Simbolo
    )

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-Impact.ps1" `
    -Simbolo $Simbolo
}

function HF-Patch {
    param(
        [string]$Problema
    )

    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-PATCH.ps1" `
    -Problema $Problema
}

function HF-TestExpediente {
    param(
        [string]$Caso = "TrActivoVsQp",
        [string]$Tr = ""
    )

    if ([string]::IsNullOrWhiteSpace($Tr)) {
        powershell -ExecutionPolicy Bypass `
        -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-TestExpediente.ps1" `
        -Caso $Caso
    }
    else {
        powershell -ExecutionPolicy Bypass `
        -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-TestExpediente.ps1" `
        -Caso $Caso `
        -Tr $Tr
    }
}

function HF-TestExpedienteReporte {
    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-TestExpedienteReporte.ps1"
}

function HF-ValidarExpediente {
    powershell -ExecutionPolicy Bypass `
    -File "D:\HidroFlow\07_TOOLBOX\powershell\HF-ValidarExpediente.ps1"
}
