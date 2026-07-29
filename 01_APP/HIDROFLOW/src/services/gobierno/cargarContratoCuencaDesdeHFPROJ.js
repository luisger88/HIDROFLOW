import { crearContratoCuencaVacio } from "../../data/contratoCuenca.js";

function numeroValido(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

function esObjeto(val) { return val !== null && typeof val === "object" && !Array.isArray(val); }

export function cargarContratoCuencaDesdeHFPROJ(proyecto) {
  if (!proyecto) return null;

  // Detectar schema HFPROJ_v1
  if (proyecto.schema !== "HFPROJ_v1") {
    // Compatibilidad hacia atras: construir desde campos legacy
    return construirDesdeLegacy(proyecto);
  }

  const c = proyecto.contratoCuenca;
  if (!c) return null;

  const contrato = crearContratoCuencaVacio();

  // Validar y copiar cada dominio
  if (esObjeto(c.cuenca)) {
    contrato.cuenca.nombre = c.cuenca.nombre ?? null;
    contrato.cuenca.id = c.cuenca.id ?? null;
    contrato.cuenca.lat_salida = numeroValido(c.cuenca.lat_salida);
    contrato.cuenca.lon_salida = numeroValido(c.cuenca.lon_salida);
    contrato.cuenca.area_km2 = numeroValido(c.cuenca.area_km2);
    contrato.cuenca.longitud_cauce_km = numeroValido(c.cuenca.longitud_cauce_km);
    contrato.cuenca.desnivel_m = numeroValido(c.cuenca.desnivel_m);
    contrato.cuenca.cota_mayor_cauce_msnm = numeroValido(c.cuenca.cota_mayor_cauce_msnm);
    contrato.cuenca.cota_menor_cauce_msnm = numeroValido(c.cuenca.cota_menor_cauce_msnm);
    contrato.cuenca.pendiente_cauce_pct = numeroValido(c.cuenca.pendiente_cauce_pct);
    contrato.cuenca.perimetro_km = numeroValido(c.cuenca.perimetro_km);
  }

  if (esObjeto(c.geomorfometria)) {
    contrato.geomorfometria.area_km2 = numeroValido(c.geomorfometria.area_km2) ?? contrato.cuenca.area_km2;
    contrato.geomorfometria.longitud_cauce_km = numeroValido(c.geomorfometria.longitud_cauce_km) ?? contrato.cuenca.longitud_cauce_km;
    contrato.geomorfometria.desnivel_m = numeroValido(c.geomorfometria.desnivel_m) ?? contrato.cuenca.desnivel_m;
    contrato.geomorfometria.pendiente_cauce_pct = numeroValido(c.geomorfometria.pendiente_cauce_pct) ?? contrato.cuenca.pendiente_cauce_pct;
    contrato.geomorfometria.cota_salida_msnm = numeroValido(c.geomorfometria.cota_salida_msnm) ?? contrato.cuenca.cota_menor_cauce_msnm;
    contrato.geomorfometria.cota_alta_msnm = numeroValido(c.geomorfometria.cota_alta_msnm) ?? contrato.cuenca.cota_mayor_cauce_msnm;
  }

  if (esObjeto(c.cn)) {
    contrato.cn.cnBase = numeroValido(c.cn.cnBase);
    contrato.cn.cnAjustado = numeroValido(c.cn.cnAjustado);
    contrato.cn.cnEfectivo = numeroValido(c.cn.cnEfectivo);
    contrato.cn.amc = c.cn.amc ?? null;
    contrato.cn.porcentajeImpermeable = numeroValido(c.cn.porcentajeImpermeable);
    contrato.cn.S_mm = numeroValido(c.cn.S_mm);
    contrato.cn.Ia_mm = numeroValido(c.cn.Ia_mm);
    contrato.cn.trazabilidad = c.cn.trazabilidad ?? null;
  }

  if (esObjeto(c.tc)) {
    contrato.tc.Tc_final_min = numeroValido(c.tc.Tc_final_min);
    contrato.tc.tc_h = numeroValido(c.tc.tc_h);
    contrato.tc.metodosTc = c.tc.metodosTc ?? null;
    contrato.tc.metodoPonderacion = c.tc.metodoPonderacion ?? "seleccionarTc(hidrograma)";
    contrato.tc.metodosValidos = Array.isArray(c.tc.metodosValidos) ? c.tc.metodosValidos : [];
    contrato.tc.metodosExcluidos = Array.isArray(c.tc.metodosExcluidos) ? c.tc.metodosExcluidos : ["SCS-Ranser"];
  }

  if (esObjeto(c.qtr)) {
    contrato.qtr.tr_diseno_activo = numeroValido(c.qtr.tr_diseno_activo);
    contrato.qtr.estado = c.qtr.estado ?? null;
    contrato.qtr.caudalDisenoM3s = numeroValido(c.qtr.caudalDisenoM3s);
    contrato.qtr.estacion_idf = c.qtr.estacion_idf ?? null;
    contrato.qtr.metodo_idf = c.qtr.metodo_idf ?? null;
    contrato.qtr.q_tr_activo = c.qtr.q_tr_activo ?? null;
    contrato.qtr.q_tr_multiescenario = c.qtr.q_tr_multiescenario ?? null;
    contrato.qtr.faltantes = Array.isArray(c.qtr.faltantes) ? c.qtr.faltantes : [];
  }

  if (esObjeto(c.hidrogramas)) {
    contrato.hidrogramas.resultados = Array.isArray(c.hidrogramas.resultados) ? c.hidrogramas.resultados : [];
    contrato.hidrogramas.resumen = Array.isArray(c.hidrogramas.resumen) ? c.hidrogramas.resumen : [];
    contrato.hidrogramas.principal = c.hidrogramas.principal ?? null;
    contrato.hidrogramas.lluvia_efectiva_total_mm = numeroValido(c.hidrogramas.lluvia_efectiva_total_mm);
    contrato.hidrogramas.peTotalMm = numeroValido(c.hidrogramas.peTotalMm);
    contrato.hidrogramas.volumenEsperadoM3 = numeroValido(c.hidrogramas.volumenEsperadoM3);
    contrato.hidrogramas.qSeriesPublicadas = c.hidrogramas.qSeriesPublicadas ?? false;
  }

  if (esObjeto(c.diagnosticos)) {
    contrato.diagnosticos.morfologiaQt = c.diagnosticos.morfologiaQt ?? null;
    contrato.diagnosticos.filasMorfologicas = Array.isArray(c.diagnosticos.filasMorfologicas) ? c.diagnosticos.filasMorfologicas : [];
    contrato.diagnosticos.filasForma = Array.isArray(c.diagnosticos.filasForma) ? c.diagnosticos.filasForma : [];
    contrato.diagnosticos.filasRiesgo = Array.isArray(c.diagnosticos.filasRiesgo) ? c.diagnosticos.filasRiesgo : [];
    contrato.diagnosticos.sintesisRiesgo = c.diagnosticos.sintesisRiesgo ?? null;
    contrato.diagnosticos.esAdoptivo = c.diagnosticos.esAdoptivo ?? false;
  }

  if (esObjeto(c.expediente)) {
    contrato.expediente.generado = c.expediente.generado ?? false;
    contrato.expediente.entregable = c.expediente.entregable ?? null;
    contrato.expediente.estadoGuard = c.expediente.estadoGuard ?? null;
    contrato.expediente.faltantes = Array.isArray(c.expediente.faltantes) ? c.expediente.faltantes : [];
    contrato.expediente.seccionesActivas = Array.isArray(c.expediente.seccionesActivas) ? c.expediente.seccionesActivas : [];
  }

  if (esObjeto(c.persistencia)) {
    contrato.persistencia.endpoint = c.persistencia.endpoint ?? null;
    contrato.persistencia.ultimoEnvio = c.persistencia.ultimoEnvio ?? null;
    contrato.persistencia.estado = c.persistencia.estado ?? null;
    contrato.persistencia.expedienteId = c.persistencia.expedienteId ?? null;
  }

  return contrato;
}

function construirDesdeLegacy(proyecto) {
  const contrato = crearContratoCuencaVacio();

  // Campos legacy de geografia
  if (proyecto.geografia?.puntoControl) {
    const pc = proyecto.geografia.puntoControl;
    contrato.cuenca.nombre = pc.nombre ?? null;
    contrato.cuenca.lat_salida = numeroValido(pc.lat);
    contrato.cuenca.lon_salida = numeroValido(pc.lon);
  }

  // Expediente legacy
  if (proyecto.expediente) {
    contrato.expediente.entregable = proyecto.expediente;
    contrato.expediente.generado = true;
  }

  return contrato;
}
