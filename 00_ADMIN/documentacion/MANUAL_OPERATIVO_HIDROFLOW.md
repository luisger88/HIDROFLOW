# Manual operativo HidroFlow

## 1. Propósito

Este manual documentará la operación diaria de HidroFlow, incluyendo comandos, flujo Git, bitácoras, Pull Requests, sincronización post-merge, validación de build y manejo de advertencias.

## 2. Comando obligatorio post-merge

El comando operativo post-merge debe entregarse siempre completo:

```powershell
cd D:
Set-Location "D:\HidroFlow"
. "D:\HidroFlow\07_TOOLBOX\powershell\hidroflow-git-tools.ps1"
Sincronizar-MainPostMerge
```

## 3. Regla operativa reforzada

No se deben entregar comandos recortados, rutas truncadas ni nombres de archivo incompletos. Todo comando HidroFlow debe ser completo, ejecutable y auditable.
