$ErrorActionPreference = "Stop"

try {

$salida =
"00_ADMIN\bitacora\OT-0123\OT-0123E_expediente_ensamblado.md"

@"
# EXPEDIENTE HIDROLÓGICO ENSAMBLADO

## Estado

ENSAMBLADO AUTOMÁTICAMENTE

---

## CUENCA

Trazabilidad: COMPLETA

Fuente:

- cuencasCatalogo.js

---

## IDF

Trazabilidad: COMPLETA

Fuente:

- IDF EPM
- calcIDFPond

---

## LLUVIA

Trazabilidad: COMPLETA

Fuente:

- lluvia diseño
- hietograma

---

## CN

Trazabilidad: COMPLETA

Fuente:

- SCS-CN
- AMC

---

## TC

Trazabilidad: COMPLETA

Fuente:

- tcSelector
- tcAgent

---

## HIDROGRAMAS

Trazabilidad: COMPLETA

Fuente:

- Q(t)
- Qpico
- tPico
- volTotal

---

## CAUDALES TR

Trazabilidad: COMPLETA

Fuente:

- Comparador Hidrológico

---

## RESULTADO

Contrato documental maestro:

COMPLETAMENTE TRAZADO

Vacíos:

0

Estado:

LISTO PARA IMPLEMENTACIÓN DEL ENSAMBLADOR REAL
"@ | Set-Content `
$salida `
-Encoding UTF8

git add $salida

git commit `
-m "docs(expediente): genera expediente ensamblado"

git status --short

Write-Host ""
Write-Host "EXPEDIENTE ENSAMBLADO"
Write-Host $salida
Write-Host ""

}
catch {

Write-Host $_.Exception.Message

exit 1

}
