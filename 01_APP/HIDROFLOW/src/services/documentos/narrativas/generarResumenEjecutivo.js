import { texto, numero } from "./_utilsNarrativas";

export function generarResumenEjecutivo(payload = {}, contratoCuenca = null) {
  const c = contratoCuenca;

  const nombreCuenca = c?.cuenca?.nombre
    || payload?.identificacion?.nombreCuenca
    || payload?.cuenca?.nombre
    || "NO DETECTADO";

  const areaKm2 = c?.cuenca?.area_km2
    ?? payload?.identificacion?.areaKm2
    ?? payload?.geomorfometria?.areaKm2;

  const trActivo = c?.qtr?.tr_diseno_activo
    ?? payload?.escenarioQTrActivo?.periodoRetornoTrAnios;

  const caudalDiseno = c?.qtr?.caudalDisenoM3s
    ?? payload?.escenarioQTrActivo?.caudalDisenoM3s;

  const tc = c?.tc?.Tc_final_min
    ?? payload?.tiempoConcentracion?.tcSugeridoMinutos;

  const cnEfectivo = c?.cn?.cnEfectivo
    ?? payload?.lluviaYAbstraccion?.cnEfectivo;

  const cnBase = c?.cn?.cnBase
    ?? payload?.lluviaYAbstraccion?.cnBase;

  const amc = c?.cn?.amc
    ?? payload?.lluviaYAbstraccion?.condicionAMC;

  const pctImp = c?.cn?.porcentajeImpermeable
    ?? payload?.lluviaYAbstraccion?.porcentajeImpermeable;

  const peTotal = c?.hidrogramas?.lluvia_efectiva_total_mm
    ?? payload?.lluviaYAbstraccion?.peTotalMm;

  const qp = c?.hidrogramas?.principal?.Qpico
    ?? c?.hidrogramas?.resultados?.[0]?.Qp
    ?? payload?.hidrografiaQ5?.caudalPicoM3s;

  const tp = c?.hidrogramas?.principal?.tPico
    ?? c?.hidrogramas?.resultados?.[0]?.Tp
    ?? payload?.hidrografiaQ5?.tiempoPicoMinutos;

  const vol = c?.hidrogramas?.principal?.volTotal
    ?? c?.hidrogramas?.resultados?.[0]?.volumen
    ?? payload?.hidrografiaQ5?.volumenIntegradoM3;

  const metodoPrincipal = c?.hidrogramas?.principal?.metodo
    ?? c?.hidrogramas?.resultados?.[0]?.metodo
    ?? payload?.hidrografiaQ5?.metodoPrincipal;

  const estacionIDF = c?.qtr?.estacion_idf
    ?? payload?.lluviaYAbstraccion?.estacionIDF;

  const numMetodos = c?.hidrogramas?.resultados?.length
    ?? payload?.hidrografiaQ5?.metodosComparados?.length
    ?? 0;

  const volumenEsperado = c?.hidrogramas?.volumenEsperadoM3
    ?? payload?.controlConsistencia?.volumenEsperadoTeoricoM3;

  const ratio = c?.hidrogramas?.volumenEsperadoM3 && vol
    ? vol / c.hidrogramas.volumenEsperadoM3
    : payload?.controlConsistencia?.ratioVolumetrico;

  return `
Resumen ejecutivo:

El expediente consolida la informacion hidrologica exportable del escenario evaluado para la cuenca ${texto(nombreCuenca)} (Area: ${numero(areaKm2, 4)} km2), estacion IDF ${texto(estacionIDF)}.

Parametros hidrologicos base:
  CN efectivo: ${numero(cnEfectivo, 1)} (CN base: ${numero(cnBase, 1)}, AMC ${texto(amc)}, ${numero(pctImp, 0)}% impermeable)
  Tc sugerido: ${numero(tc, 2)} min
  Tr activo: ${numero(trActivo, 0)} anos
  Lluvia efectiva total: ${numero(peTotal, 2)} mm
  Volumen esperado (Pe x Area): ${numero(volumenEsperado, 2)} m3

Resultado hidrologico principal (metodo ${texto(metodoPrincipal)}):
  Qp = ${numero(qp, 3)} m3/s
  Tp = ${numero(tp, 0)} min
  Volumen integrado = ${numero(vol, 2)} m3

Control de consistencia:
  Relacion Vol Q5 / Vol esperado = ${numero(ratio, 4)}
  Metodos comparados: ${numMetodos}

Conclusion ejecutiva:
  El hidrograma principal ${texto(metodoPrincipal)} presenta un caudal pico de ${numero(qp, 3)} m3/s con tiempo al pico de ${numero(tp, 0)} min para un periodo de retorno de ${numero(trActivo, 0)} anos.${ratio !== null && ratio !== undefined ? ` El balance de masa (relacion ${Number(ratio).toFixed(2)}x) indica ${Math.abs(ratio - 1) < 0.1 ? 'alta coherencia fisica' : Math.abs(ratio - 1) < 0.3 ? 'coherencia aceptable' : 'requiere revision'} entre el volumen esperado y el volumen integrado.` : ''}
`.trim();
}
