# OT-0121B — Complemento contractual de campos y restricciones del bloque Identificación

## Contexto

Durante la validación contractual documental del bloque ## 1. Identificación, el script detectó que el contrato base de OT-0120 no mencionaba literalmente todos los campos permitidos, campos prohibidos y restricciones sensibles que deben quedar congelados antes de una futura delegación parcial al helper.

Este documento complementa el contrato sin implementar código funcional.

## Campos permitidos explícitos

`js
cuencaNombre
area_km2
fuente
estacion_idf
estacionIDF
estacion
nombre_estacion
idf.nombre
idf.estacion
pendiente_media_pct
longitud_cauce_km
`",
",


`js
hidrogramas
metodo_racional
q_tr_activo_estado
resultados Q-5
filasMorfologiaQt
filasDictamenFormaQt
filasRiesgoTemporalQt
sintesisRiesgoTemporalQt
validadores finales
portapapeles
`",
",


`	ext
Q-5
Método Racional
diagnóstico Q(t)
diagnóstico temporal Q(t)
validadores finales
portapapeles
`",
",


`	ext
## 1. Identificación
Cuenca:
Área:
Fuente de contexto:
Estación IDF:
Pendiente media:
Longitud cauce principal:
`",
",


`	ext
Cuenca activa
—
HidroFlow
SAN CRISTOBAL
`",
",


`	ext
undefined
null
NaN
[object Object]
`",
",


Este complemento no autoriza:

- crear función auxiliar todavía,
- modificar ComparadorMultiMetodo.jsx,
- modificar el helper,
- reemplazar 	extoExpediente,
- modificar botón,
- modificar portapapeles,
- tocar Q-5,
- tocar Método Racional,
- tocar diagnóstico Q(t),
- tocar validadores finales,
- modificar motor,
- recalcular Q(t),
- modificar Qp, tPico ni volumen,
- exportar archivos.

## Regla final

El contrato del bloque ## 1. Identificación queda limitado a campos documentales contextuales y no autoriza consumo ni modificación de hidrogramas, metodo_racional, q_tr_activo_estado, esultados Q-5, ilasMorfologiaQt, ilasDictamenFormaQt, ilasRiesgoTemporalQt, sintesisRiesgoTemporalQt, alidadores finales ni portapapeles.

## Dictamen

Este complemento deja explícitos los campos y restricciones que el script contractual debe validar antes de cualquier implementación funcional futura.
