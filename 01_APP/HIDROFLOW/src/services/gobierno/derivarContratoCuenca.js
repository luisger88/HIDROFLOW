import { crearContratoCuencaVacio } from "../../data/contratoCuenca";

function numeroSeguro(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

function textoSeguro(valor) {
  return valor === undefined || valor === null ? null : String(valor);
}

export function derivarContratoCuenca({
  params = {},
  trActivo = 25,
  periodosRetorno = [],
  puntoControl = null,
  contextoInstitucional = {},
  expediente = null,
  contextoBase = {},
  Tc_final = null,
  metodosTc = null,
  CNact = null,
  hidros = null,
  lluvEfect = null,
  qTrMultiEscenario = null,
  qTrActivo = null,
  filasMorfologiaQt = [],
  filasDictamenFormaQt = [],
  filasRiesgoTemporalQt = [],
  sintesisRiesgoTemporalQt = null
} = {}) {

  const contrato = crearContratoCuencaVacio();

  // --- CUENCA ---
  contrato.cuenca.nombre =
    params?.nombre_cuenca ??
    params?.nombreCuenca ??
    contextoBase?.cuenca?.nombre ??
    contextoBase?.cuencaActiva?.nombre ??
    null;

  contrato.cuenca.lat_salida = numeroSeguro(params?.lat_salida ?? params?.lat);
  contrato.cuenca.lon_salida = numeroSeguro(params?.lon_salida ?? params?.lon);
  contrato.cuenca.area_km2 = numeroSeguro(params?.area ?? params?.area_km2 ?? contextoBase?.area_km2);
  contrato.cuenca.longitud_cauce_km = numeroSeguro(params?.longitud_cauce ?? params?.longitud_cauce_km);
  contrato.cuenca.desnivel_m = numeroSeguro(
    params?.desnivel ?? params?.desnivel_m ??
    (numeroSeguro(params?.cota_mayor_cauce) !== null && numeroSeguro(params?.cota_menor_cauce) !== null
      ? numeroSeguro(params.cota_mayor_cauce) - numeroSeguro(params.cota_menor_cauce)
      : null)
  );
  contrato.cuenca.cota_mayor_cauce_msnm = numeroSeguro(params?.cota_mayor_cauce ?? params?.cota_max);
  contrato.cuenca.cota_menor_cauce_msnm = numeroSeguro(params?.cota_menor_cauce ?? params?.cota_min);
  contrato.cuenca.pendiente_cauce_pct = numeroSeguro(params?.pendiente ?? params?.pendiente_media_pct ?? params?.pendiente_cauce_pct);
  contrato.cuenca.perimetro_km = numeroSeguro(params?.perimetro);
  contrato.cuenca.id = textoSeguro(params?.id ?? params?.punto_control);

  // --- GEOMORFOMETRIA ---
  contrato.geomorfometria.area_km2 = contrato.cuenca.area_km2;
  contrato.geomorfometria.longitud_cauce_km = contrato.cuenca.longitud_cauce_km;
  contrato.geomorfometria.desnivel_m = contrato.cuenca.desnivel_m;
  contrato.geomorfometria.pendiente_cauce_pct = contrato.cuenca.pendiente_cauce_pct;
  contrato.geomorfometria.cota_salida_msnm = contrato.cuenca.cota_menor_cauce_msnm;
  contrato.geomorfometria.cota_alta_msnm = contrato.cuenca.cota_mayor_cauce_msnm;

  // --- CN ---
  contrato.cn.cnBase = numeroSeguro(params?.cnBase ?? params?.CN ?? params?.cn_base ?? 75);
  contrato.cn.amc = textoSeguro(params?.amcActual ?? params?.AMC ?? params?.amc ?? "II");
  contrato.cn.porcentajeImpermeable = numeroSeguro(params?.porcentajeImpermeable ?? params?.porcentaje_impermeable ?? 60);
  if (CNact !== null && CNact !== undefined) {
    contrato.cn.cnEfectivo = numeroSeguro(CNact);
    const cnEf = typeof CNact === "number" ? CNact : Number(CNact);
    if (Number.isFinite(cnEf) && cnEf > 0) {
      const S = 25400 / cnEf - 254;
      contrato.cn.S_mm = +S.toFixed(2);
      contrato.cn.Ia_mm = +(0.2 * S).toFixed(2);
    }
  }
  contrato.cn.cnAjustado = numeroSeguro(params?.cnAjustado ?? params?.CN_ajustado);

  // --- Tc ---
  contrato.tc.Tc_final_min = numeroSeguro(Tc_final);
  contrato.tc.metodosTc = metodosTc || null;
  if (contrato.tc.Tc_final_min !== null) {
    contrato.tc.tc_h = +(contrato.tc.Tc_final_min / 60).toFixed(4);
  }
  contrato.tc.metodosValidos = Array.isArray(metodosTc) ? metodosTc : [];
  contrato.tc.metodoPonderacion = "seleccionarTc(hidrograma)";
  contrato.tc.metodosExcluidos = ["SCS-Ranser"];

  // --- Q-Tr ---
  contrato.qtr.tr_diseno_activo = trActivo;
  contrato.qtr.q_tr_activo = qTrActivo || null;
  if (qTrActivo) {
    contrato.qtr.estado = textoSeguro(qTrActivo?.estado ?? "no_publicado");
    contrato.qtr.caudalDisenoM3s = numeroSeguro(qTrActivo?.Q ?? qTrActivo?.q ?? qTrActivo?.caudal ?? qTrActivo?.caudalDisenoM3s);
    contrato.qtr.estacion_idf = textoSeguro(qTrActivo?.estacion_idf ?? qTrActivo?.estacionIDF);
    contrato.qtr.metodo_idf = textoSeguro(qTrActivo?.metodo_idf ?? qTrActivo?.metodoIDF);
  }
  contrato.qtr.q_tr_multiescenario = qTrMultiEscenario || null;
  contrato.qtr.faltantes = qTrActivo?.faltantes ?? [];

  // --- HIDROGRAMAS ---
  if (Array.isArray(hidros) && hidros.length > 0) {
    contrato.hidrogramas.resultados = hidros.map(h => ({
      metodo: h?.metodo ?? "Metodo Q-5",
      Qpico: numeroSeguro(h?.Qpico),
      tPico: numeroSeguro(h?.tPico),
      volTotal: numeroSeguro(h?.volTotal),
      Qp: numeroSeguro(h?.Qpico),
      Tp: numeroSeguro(h?.tPico),
      volumen: numeroSeguro(h?.volTotal),
      qSeriesLength: h?.qSeries?.length ?? 0
    }));
  } else if (Array.isArray(contextoBase?.hidrogramas?.resultados) && contextoBase.hidrogramas.resultados.length > 0) {
    contrato.hidrogramas.resultados = contextoBase.hidrogramas.resultados.map(h => ({
      metodo: h?.metodo ?? h?.nombre ?? "Metodo Q-5",
      Qpico: numeroSeguro(h?.Qpico ?? h?.Qp),
      tPico: numeroSeguro(h?.tPico ?? h?.Tp),
      volTotal: numeroSeguro(h?.volTotal ?? h?.volumen),
      Qp: numeroSeguro(h?.Qp ?? h?.Qpico),
      Tp: numeroSeguro(h?.Tp ?? h?.tPico),
      volumen: numeroSeguro(h?.volumen ?? h?.volTotal),
      qSeriesLength: h?.qSeries?.length ?? 0
    }));
  }
  const lluviaEfectivaTotalMm = numeroSeguro(contextoBase?.lluvia_efectiva_total_mm);
  contrato.hidrogramas.lluvia_efectiva_total_mm = lluviaEfectivaTotalMm;
  contrato.hidrogramas.peTotalMm = lluviaEfectivaTotalMm;
  if (lluviaEfectivaTotalMm !== null && contrato.cuenca.area_km2 !== null) {
    contrato.hidrogramas.volumenEsperadoM3 = lluviaEfectivaTotalMm * contrato.cuenca.area_km2 * 1000;
  }
  contrato.hidrogramas.principal = hidros?.[0] ? {
    metodo: hidros[0]?.metodo,
    Qpico: numeroSeguro(hidros[0]?.Qpico),
    tPico: numeroSeguro(hidros[0]?.tPico),
    volTotal: numeroSeguro(hidros[0]?.volTotal)
  } : (Array.isArray(contextoBase?.hidrogramas?.resultados) && contextoBase.hidrogramas.resultados.length > 0 ? {
    metodo: contextoBase.hidrogramas.resultados[0]?.metodo ?? contextoBase.hidrogramas.resultados[0]?.nombre,
    Qpico: numeroSeguro(contextoBase.hidrogramas.resultados[0]?.Qpico ?? contextoBase.hidrogramas.resultados[0]?.Qp),
    tPico: numeroSeguro(contextoBase.hidrogramas.resultados[0]?.tPico ?? contextoBase.hidrogramas.resultados[0]?.Tp),
    volTotal: numeroSeguro(contextoBase.hidrogramas.resultados[0]?.volTotal ?? contextoBase.hidrogramas.resultados[0]?.volumen)
  } : null);
  contrato.hidrogramas.resumen = Array.isArray(contextoBase?.hidrogramas_resumen)
    ? contextoBase.hidrogramas_resumen.map(r => ({
        metodo: r?.metodo,
        Qp: numeroSeguro(r?.Qp),
        Tp: numeroSeguro(r?.Tp),
        volumen: numeroSeguro(r?.volumen),
        puntos: r?.puntos ?? null
      }))
    : [];
  contrato.hidrogramas.qSeriesPublicadas = Array.isArray(hidros) &&
    hidros.some(h => Array.isArray(h?.qSeries) && h.qSeries.length > 0);

  // --- DIAGNOSTICOS ---
  contrato.diagnosticos.filasMorfologicas = Array.isArray(filasMorfologiaQt) ? filasMorfologiaQt : [];
  contrato.diagnosticos.filasForma = Array.isArray(filasDictamenFormaQt) ? filasDictamenFormaQt : [];
  contrato.diagnosticos.filasRiesgo = Array.isArray(filasRiesgoTemporalQt) ? filasRiesgoTemporalQt : [];
  contrato.diagnosticos.filasDictamenFormaQt = contrato.diagnosticos.filasForma;
  contrato.diagnosticos.filasRiesgoTemporalQt = contrato.diagnosticos.filasRiesgo;
  contrato.diagnosticos.sintesisRiesgo =
    textoSeguro(sintesisRiesgoTemporalQt) ??
    (Array.isArray(filasRiesgoTemporalQt) && filasRiesgoTemporalQt.length > 0
      ? "diagnostico temporal disponible (" + filasRiesgoTemporalQt.length + " metodos)"
      : null);
  contrato.diagnosticos.esAdoptivo = false;
  if (filasMorfologiaQt?.length > 0) {
    contrato.diagnosticos.morfologiaQt = {
      total: filasMorfologiaQt.length,
      aptas: filasMorfologiaQt.filter(f => f?.estado !== "sin metrica" && f?.Qp !== null).length
    };
  }

  // --- EXPEDIENTE ---
  contrato.expediente.generado = expediente !== null && expediente !== undefined;
  contrato.expediente.entregable = expediente || null;
  contrato.expediente.estadoGuard = contrato.hidrogramas.resultados?.length > 0
    ? "Q5_datos_disponibles"
    : "Q5_sin_datos";

  // --- PERSISTENCIA ---
  contrato.persistencia.endpoint = "http://localhost:4000/api/proyecto/activo";

  return contrato;
}
