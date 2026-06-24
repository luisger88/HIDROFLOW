param(
    [string]$Nombre
)

if ([string]::IsNullOrWhiteSpace($Nombre)) {
    throw "Debe indicar Nombre."
}

$ruta = "00_ADMIN\bitacora\OT-0123\OT-0123B$Nombre.md"

@"
# OT-0123B$Nombre

## Objetivo

Auditar trazabilidad documental.

No modificar código.

No implementar.

Solo identificar origen de datos.

---

## Variables obligatorias

| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|

---

## Regla de auditoría

Para cada variable identificar:

1. Dónde nace.
2. Cómo se llama realmente.
3. Quién la consume.
4. A qué campo del expediente alimenta.

---

## Criterio de cierre

Todas las variables auditadas tienen origen documentado.
"@ | Set-Content $ruta -Encoding UTF8

Write-Host ""
Write-Host "Creado:"
Write-Host $ruta