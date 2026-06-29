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


$tabla = switch ($Nombre.ToUpper()) {

"CUENCA" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| area_km2 | Sí | cuencasCatalogo.js | area_km2 | Alimenta EXPEDIENTE.cuenca |
| perimetro_km | Sí | cuencasCatalogo.js | perimetro_km | Alimenta EXPEDIENTE.cuenca |
| longitudCauce_km | Sí | cuencasCatalogo.js | longitudCauce_km | Alimenta EXPEDIENTE.caucePrincipal |
| pendienteCuenca_pct | Pendiente | Revisar | Revisar | |
| pendienteCauce_pct | Pendiente | Revisar | Revisar | |
"@
}

"IDF" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| estacionIdf | Sí | Modulo IDF | estacionSeleccionada | Alimenta EXPEDIENTE.lluvia |
| metodoIdf | Sí | Modulo IDF | metodoIdf | Alimenta EXPEDIENTE.lluvia |
| parametroK | Sí | IDF EPM | k | Alimenta EXPEDIENTE.lluvia |
| parametroN | Sí | IDF EPM | n | Alimenta EXPEDIENTE.lluvia |
| parametroC | Sí | IDF EPM | c | Alimenta EXPEDIENTE.lluvia |
| periodosRetorno | Sí | Configuración IDF | periodosRetorno | Alimenta EXPEDIENTE.lluvia |
| intensidades | Sí | calcIDFPond | intensidades | Alimenta EXPEDIENTE.lluvia |
"@
}

"LLUVIA" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| lluviaDiseno | Pendiente | Revisar | Revisar | |
| hietograma | Pendiente | Revisar | Revisar | |
| duracion | Pendiente | Revisar | Revisar | |
| bloqueAlterno | Pendiente | Revisar | Revisar | |
"@
}

"CN" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| cnBase | Sí | SCS-CN | cnBase | |
| cnAjustado | Sí | AMC | cnAjustado | |
| amc | Sí | AMC | condicionAMC | |
| impermeabilidad | Sí | CN mixto | impermeabilidad | |
| lluviaEfectiva | Sí | SCS-CN | lluviaEfectiva | |
"@
}

"TC" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| tcAdoptado | Sí | tcSelector | tcFinal | |
| metodosTc | Sí | tcAgent | metodosTc | |
| rangoTc | Sí | tcAgent | rangoTc | |
| criterioSeleccion | Pendiente | Revisar | Revisar | |
"@
}

"HIDROGRAMAS" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| metodo | Sí | Hidrogramas | metodo | |
| qp | Sí | Hidrogramas | Qpico | |
| tp | Sí | Hidrogramas | tPico | |
| volumen | Sí | Hidrogramas | volTotal | |
"@
}

"QTR" {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
| Tr2.33 | Pendiente | Revisar | Revisar | |
| Tr5 | Pendiente | Revisar | Revisar | |
| Tr10 | Pendiente | Revisar | Revisar | |
| Tr25 | Pendiente | Revisar | Revisar | |
| Tr50 | Pendiente | Revisar | Revisar | |
| Tr100 | Pendiente | Revisar | Revisar | |
"@
}

default {
@"
| Variable expediente | Existe | Origen | Variable origen | Observaciones |
|----------|----------|----------|----------|----------|
"@
}

}


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

