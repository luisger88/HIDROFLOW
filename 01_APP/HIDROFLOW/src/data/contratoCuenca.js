export const CONTRATO_CUENCA_V1 = {
  version: "1.0.0",
  fuente: "contratoCuenca",
  descripcion: "Fuente unica de verdad para todos los dominios hidrologicos de una cuenca activa",

  cuenca: {
    nombre: null,
    id: null,
    lat_salida: null,
    lon_salida: null,
    area_km2: null,
    longitud_cauce_km: null,
    desnivel_m: null,
    cota_mayor_cauce_msnm: null,
    cota_menor_cauce_msnm: null,
    pendiente_cauce_pct: null,
    perimetro_km: null
  },

  geomorfometria: {
    area_km2: null,
    longitud_cauce_km: null,
    desnivel_m: null,
    pendiente_cauce_pct: null,
    cota_salida_msnm: null,
    cota_alta_msnm: null
  },

  cn: {
    cnBase: null,
    cnAjustado: null,
    cnEfectivo: null,
    amc: null,
    porcentajeImpermeable: null,
    S_mm: null,
    Ia_mm: null,
    trazabilidad: null
  },

  tc: {
    Tc_final_min: null,
    tc_h: null,
    metodosTc: null,
    metodoPonderacion: null,
    metodosValidos: [],
    metodosExcluidos: []
  },

  qtr: {
    tr_diseno_activo: null,
    estado: null,
    caudalDisenoM3s: null,
    estacion_idf: null,
    metodo_idf: null,
    q_tr_activo: null,
    q_tr_multiescenario: null,
    faltantes: []
  },

  hidrogramas: {
    resultados: [],
    resumen: [],
    principal: null,
    lluvia_efectiva_total_mm: null,
    peTotalMm: null,
    volumenEsperadoM3: null,
    qSeriesPublicadas: false
  },

  diagnosticos: {
    morfologiaQt: null,
    filasMorfologicas: [],
    filasForma: [],
    filasRiesgo: [],
    filasDictamenFormaQt: [],
    filasRiesgoTemporalQt: [],
    sintesisRiesgo: null,
    esAdoptivo: false
  },

  expediente: {
    generado: false,
    entregable: null,
    estadoGuard: null,
    faltantes: [],
    seccionesActivas: []
  },

  persistencia: {
    endpoint: null,
    ultimoEnvio: null,
    estado: null,
    expedienteId: null
  }
};

export const crearContratoCuencaVacio = () => JSON.parse(JSON.stringify(CONTRATO_CUENCA_V1));
