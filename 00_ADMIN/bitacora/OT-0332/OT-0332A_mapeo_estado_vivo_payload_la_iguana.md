# OT-0332 — Mapeo estado vivo hacia payload La Iguaná

## Objetivo

Identificar la fuente real de cada campo del contrato `expediente.js`, sin programar ensamblador todavía.

## Mapa inicial

| Campo payload | Fuente detectada | Estado |
|---|---|---|
| cuenca.nombre | `params` desde `getCuencaById(CUENCA_DEFAULT_ID)` en `HidroFlow.jsx` | Detectado |
| geomorfometria.areaKm2 | `contextoBase?.area_km2` en `ComparadorMultiMetodo.jsx` | Detectado |
| lluviaYAbstraccion.peTotalMm | `contextoBase?.lluvia_efectiva_total_mm` | Detectado |
| controlConsistencia.volumenEsperadoTeoricoM3 | `areaKm2 * peTotalMm * 1000` | Detectado |
| tiempoConcentracion.tcSugeridoMinutos | `Tc_final` en `ComparadorMultiMetodo.jsx` | Detectado |
| tiempoConcentracion.metodosValidos | `metodosTc` publicado vía `setTcState` | Detectado |
| hidrografiaQ5.caudalPicoM3s | `Qp / qp / Qpico / caudalPico` | Detectado |
| hidrografiaQ5.tiempoPicoMinutos | `Tp / tp / tPico / tiempoPico` | Detectado |
| hidrografiaQ5.volumenIntegradoM3 | `volumen / volTotal / volumenTotal` | Detectado |
| contrasteRacional.caudalPicoM3s | `contextoBase.metodo_racional.resultados` | Detectado |
| diagnosticoQt.filasMorfologicas | `filasMorfologiaQt` desde `contextoBase.hidrogramas` | Detectado |
| escenarioQTrActivo.periodoRetornoTrAnios | `q_tr_activo` / contexto asociado | Parcial |
| lluviaYAbstraccion.parametrosIDF | `stn` / `ESTACIONES_EPM[stn]` | Parcial |
| lluviaYAbstraccion.condicionAMC | `amcActual` | Parcial |
| lluviaYAbstraccion.cnBase | `cnBase` | Parcial |

## Decisión

El siguiente paso real es crear un ensamblador puro:

`src/services/documentos/construirPayloadExpedienteDesdeEstado.js`

No se toca motor, UI, sellos, restricciones ni `.cursorrules`.
